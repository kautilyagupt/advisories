function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

export async function onRequestGet({ env }) {
  const configured = Boolean(
    env.RUNWAYML_API_SECRET &&
    env.TURNSTILE_SITE_KEY &&
    env.TURNSTILE_SECRET_KEY
  );

  return json({
    configured,
    turnstileSiteKey: configured ? env.TURNSTILE_SITE_KEY : null
  });
}
