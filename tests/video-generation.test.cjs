const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { test } = require('node:test');

const root = path.resolve(__dirname, '..');
const env = {
  RUNWAYML_API_SECRET: 'test-runway-secret',
  TURNSTILE_SITE_KEY: 'test-site-key',
  TURNSTILE_SECRET_KEY: 'test-turnstile-secret'
};

async function loadModule(relativePath) {
  return import(pathToFileURL(path.join(root, relativePath)).href);
}

function request(pathname, body, origin = 'https://briefing.example') {
  return new Request(`https://briefing.example${pathname}`, {
    method: 'POST',
    headers: {
      origin,
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

test('configuration endpoint exposes only the public Turnstile key when fully configured', async () => {
  const { onRequestGet } = await loadModule('functions/api/video/config.js');
  const response = await onRequestGet({ env });
  assert.deepEqual(await response.json(), {
    configured: true,
    turnstileSiteKey: 'test-site-key'
  });

  const unconfigured = await onRequestGet({ env: {} });
  assert.deepEqual(await unconfigured.json(), {
    configured: false,
    turnstileSiteKey: null
  });
});

test('Runway prompts preserve story context without passing through markup or control text', async () => {
  const { buildIncidentVideoPrompt, cleanStory } = await loadModule('functions/_shared/video-prompt.mjs');
  const story = cleanStory({
    title: 'VPN zero-day exploited <script>alert(1)</script>',
    summary: 'Attackers exploited exposed gateways.\nKeep this story realistic.',
    response: 'Patch the affected gateway and inspect nearby systems.',
    sceneType: 'network'
  });
  const prompt = buildIncidentVideoPrompt(story);

  assert.match(prompt, /VPN zero-day exploited/);
  assert.match(prompt, /exposed gateways\. Keep this story realistic\./);
  assert.match(prompt, /Patch the affected gateway/);
  assert.doesNotMatch(prompt, /<script>|<\/script>/);
  assert.ok(prompt.length <= 1000);
  assert.ok(buildIncidentVideoPrompt({
    title: 'T'.repeat(100),
    summary: 'S'.repeat(160),
    response: 'R'.repeat(100),
    sceneType: 'hospital'
  }).length <= 1000);
});

test('generation submits only a verified, bounded five-second Gen-4.5 request', async () => {
  const { onRequestPost } = await loadModule('functions/api/video/generate.js');
  const calls = [];
  const originalFetch = global.fetch;
  global.fetch = async (url, options) => {
    calls.push({ url: String(url), options });
    if (String(url).includes('siteverify')) {
      return Response.json({ success: true, hostname: 'briefing.example' });
    }
    return Response.json({ id: '01234567-89ab-cdef-0123-456789abcdef', estimatedCost: { credits: 60 } });
  };

  try {
    const response = await onRequestPost({
      request: request('/api/video/generate', {
        turnstileToken: 'one-use-test-token',
        story: {
          title: 'Hospital ransomware disrupts care',
          summary: 'A hospital isolated encrypted clinical systems.',
          response: 'Restore verified clinical backups.',
          sceneType: 'hospital'
        }
      }),
      env
    });
    const body = await response.json();
    const runwayCall = calls[1];
    const runwayBody = JSON.parse(runwayCall.options.body);

    assert.equal(response.status, 202);
    assert.equal(body.estimatedCostUsd, 0.6);
    assert.equal(runwayCall.url, 'https://api.dev.runwayml.com/v1/text_to_video');
    assert.equal(runwayCall.options.headers.authorization, 'Bearer test-runway-secret');
    assert.equal(runwayCall.options.headers['x-runway-version'], '2024-11-06');
    assert.equal(runwayBody.model, 'gen4.5');
    assert.equal(runwayBody.duration, 5);
    assert.equal(runwayBody.ratio, '1280:720');
    assert.match(runwayBody.promptText, /Hospital ransomware disrupts care/);
  } finally {
    global.fetch = originalFetch;
  }
});

test('generation rejects invalid story fields before running the security challenge', async () => {
  const { onRequestPost } = await loadModule('functions/api/video/generate.js');
  const originalFetch = global.fetch;
  let fetchCalled = false;
  global.fetch = async () => {
    fetchCalled = true;
    throw new Error('Unexpected upstream request');
  };

  try {
    const response = await onRequestPost({
      request: request('/api/video/generate', {
        turnstileToken: 'test-token',
        story: {
          title: 'Unsupported scene',
          summary: 'This story has an invalid scene type.',
          response: 'Take action.',
          sceneType: 'untrusted'
        }
      }),
      env
    });
    assert.equal(response.status, 400);
    assert.equal(fetchCalled, false);
  } finally {
    global.fetch = originalFetch;
  }
});

test('generation rejects cross-origin requests before contacting third parties', async () => {
  const { onRequestPost } = await loadModule('functions/api/video/generate.js');
  const originalFetch = global.fetch;
  let fetchCalled = false;
  global.fetch = async () => {
    fetchCalled = true;
    throw new Error('Unexpected upstream request');
  };

  try {
    const response = await onRequestPost({
      request: request('/api/video/generate', {}, 'https://attacker.example'),
      env
    });
    assert.equal(response.status, 403);
    assert.equal(fetchCalled, false);
  } finally {
    global.fetch = originalFetch;
  }
});

test('generation does not reach Runway when Turnstile verification fails', async () => {
  const { onRequestPost } = await loadModule('functions/api/video/generate.js');
  const calls = [];
  const originalFetch = global.fetch;
  global.fetch = async (url) => {
    calls.push(String(url));
    return Response.json({ success: false });
  };

  try {
    const response = await onRequestPost({
      request: request('/api/video/generate', {
        turnstileToken: 'invalid-token',
        story: {
          title: 'Cloud secret leaked',
          summary: 'An exposed key enabled access.',
          response: 'Rotate the secret and audit access.',
          sceneType: 'cloud'
        }
      }),
      env
    });
    assert.equal(response.status, 403);
    assert.equal(calls.length, 1);
    assert.match(calls[0], /siteverify/);
  } finally {
    global.fetch = originalFetch;
  }
});

test('task status returns a secure video URL and final charge without provider internals', async () => {
  const { onRequestGet } = await loadModule('functions/api/video/tasks/[taskId].js');
  const originalFetch = global.fetch;
  global.fetch = async (url, options) => {
    assert.match(String(url), /\/v1\/tasks\/01234567-89ab-cdef-0123-456789abcdef$/);
    assert.equal(options.headers.authorization, 'Bearer test-runway-secret');
    return Response.json({
      id: '01234567-89ab-cdef-0123-456789abcdef',
      status: 'SUCCEEDED',
      output: ['https://cdn.runway.example/generated.mp4'],
      cost: { credits: 59 }
    });
  };

  try {
    const response = await onRequestGet({
      request: new Request('https://briefing.example/api/video/tasks/01234567-89ab-cdef-0123-456789abcdef'),
      params: { taskId: '01234567-89ab-cdef-0123-456789abcdef' },
      env
    });
    assert.deepEqual(await response.json(), {
      status: 'SUCCEEDED',
      videoUrl: 'https://cdn.runway.example/generated.mp4',
      costCredits: 59
    });
  } finally {
    global.fetch = originalFetch;
  }
});
