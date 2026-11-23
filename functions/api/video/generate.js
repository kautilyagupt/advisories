import { buildIncidentVideoPrompt, cleanStory } from '../../_shared/video-prompt.mjs';

const RUNWAY_API = 'https://api.dev.runwayml.com';
const RUNWAY_VERSION = '2024-11-06';

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

function isSameOrigin(request) {
  return request.headers.get('Origin') === new URL(request.url).origin;
}

async function verifyTurnstile(token, request, secret) {
  const form = new URLSearchParams({
    secret,
    response: token
  });
  const clientIp = request.headers.get('CF-Connecting-IP');
  if (clientIp) form.set('remoteip', clientIp);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: form
  });
  if (!response.ok) return false;
  const result = await response.json();
  return result.success === true && result.hostname === new URL(request.url).hostname;
}

export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return json({ error: 'Request origin was rejected.' }, 403);
  if (!env.RUNWAYML_API_SECRET || !env.TURNSTILE_SECRET_KEY || !env.TURNSTILE_SITE_KEY) {
    return json({ error: 'AI video generation is not configured on this site.' }, 503);
  }
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) {
    return json({ error: 'A JSON request is required.' }, 415);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 8000) return json({ error: 'The request is too large.' }, 413);

  let body;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 8000) return json({ error: 'The request is too large.' }, 413);
    body = JSON.parse(rawBody);
  } catch {
    return json({ error: 'The request body is not valid JSON.' }, 400);
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ error: 'A story request is required.' }, 400);
  }

  const story = cleanStory(body.story);
  if (!story || typeof body.turnstileToken !== 'string' || body.turnstileToken.length > 2048) {
    return json({ error: 'A valid news story and security check are required.' }, 400);
  }

  let challengePassed = false;
  try {
    challengePassed = await verifyTurnstile(body.turnstileToken, request, env.TURNSTILE_SECRET_KEY);
  } catch {
    return json({ error: 'The security check could not be verified. Please try again.' }, 502);
  }
  if (!challengePassed) return json({ error: 'The security check expired or was not accepted. Please try again.' }, 403);

  let runwayResponse;
  try {
    runwayResponse = await fetch(`${RUNWAY_API}/v1/text_to_video`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.RUNWAYML_API_SECRET}`,
        'content-type': 'application/json',
        'x-runway-version': RUNWAY_VERSION
      },
      body: JSON.stringify({
        model: 'gen4.5',
        promptText: buildIncidentVideoPrompt(story),
        ratio: '1280:720',
        duration: 5
      })
    });
  } catch {
    return json({ error: 'Runway could not be reached. No video task was confirmed.' }, 502);
  }

  if (!runwayResponse.ok) {
    const status = runwayResponse.status === 401 || runwayResponse.status === 403
      ? 'The Runway account rejected its server key.'
      : runwayResponse.status === 429
        ? 'The Runway project reached a generation limit. Check its credits and usage limits.'
        : runwayResponse.status >= 500
          ? 'Runway is temporarily unavailable. Try again later.'
          : 'Runway rejected this video request.';
    return json({ error: status }, runwayResponse.status === 429 ? 429 : 502);
  }

  let task;
  try {
    task = await runwayResponse.json();
  } catch {
    return json({ error: 'Runway returned an unreadable task response.' }, 502);
  }
  if (!task || typeof task !== 'object' || typeof task.id !== 'string' || !task.id) {
    return json({ error: 'Runway did not return a video task ID.' }, 502);
  }

  const estimatedCredits = Number(task.estimatedCost?.credits);
  return json({
    taskId: task.id,
    estimatedCostCredits: Number.isFinite(estimatedCredits) ? estimatedCredits : null,
    estimatedCostUsd: Number.isFinite(estimatedCredits) ? estimatedCredits / 100 : null
  }, 202);
}
