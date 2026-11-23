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

export async function onRequestGet({ request, env, params }) {
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) {
    return json({ error: 'Request origin was rejected.' }, 403);
  }
  if (!env.RUNWAYML_API_SECRET) {
    return json({ error: 'AI video generation is not configured on this site.' }, 503);
  }

  const taskId = params.taskId;
  if (typeof taskId !== 'string' || !/^[a-f0-9-]{16,64}$/i.test(taskId)) {
    return json({ error: 'The video task ID is invalid.' }, 400);
  }

  let response;
  try {
    response = await fetch(`${RUNWAY_API}/v1/tasks/${encodeURIComponent(taskId)}`, {
      headers: {
        authorization: `Bearer ${env.RUNWAYML_API_SECRET}`,
        'x-runway-version': RUNWAY_VERSION
      }
    });
  } catch {
    return json({ error: 'Runway could not be reached while checking the video.' }, 502);
  }

  if (!response.ok) {
    return json({
      error: response.status === 404
        ? 'Runway no longer has this video task.'
        : 'Runway could not return the current video status.'
    }, response.status === 404 ? 404 : 502);
  }

  let task;
  try {
    task = await response.json();
  } catch {
    return json({ error: 'Runway returned an unreadable task status.' }, 502);
  }
  if (!task || typeof task !== 'object' || typeof task.status !== 'string') {
    return json({ error: 'Runway returned an invalid task status.' }, 502);
  }

  const result = { status: task.status };
  if (Number.isFinite(task.progress)) result.progress = task.progress;
  if (task.status === 'SUCCEEDED' && Array.isArray(task.output) && typeof task.output[0] === 'string') {
    result.videoUrl = task.output[0];
    result.costCredits = Number.isFinite(task.cost?.credits) ? task.cost.credits : null;
  }
  if (task.status === 'FAILED') result.error = 'Runway could not generate this scene. You can try again.';
  return json(result);
}
