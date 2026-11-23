const SCENES = new Set([
  'ai',
  'browser',
  'cloud',
  'hospital',
  'identity',
  'laptop',
  'mobile',
  'network',
  'ot',
  'package',
  'policy',
  'server'
]);

const LOCATIONS = {
  ai: 'an enterprise AI operations room with secured server infrastructure',
  browser: 'a modern office where a security analyst examines an isolated workstation',
  cloud: 'a cloud operations center with engineers reviewing secured infrastructure',
  hospital: 'a working hospital operations area with clinicians maintaining patient care',
  identity: 'an enterprise security operations center responding to an account compromise',
  laptop: 'a contemporary corporate security operations room',
  mobile: 'a telecom network operations center protecting subscriber accounts',
  network: 'a network operations room where engineers isolate an exposed gateway',
  ot: 'a carefully controlled industrial plant operations room',
  package: 'a software engineering release room reviewing a quarantined dependency',
  policy: 'a corporate incident response room coordinating a time-sensitive disclosure',
  server: 'a modern data center with engineers isolating a vulnerable server'
};

function clean(value, maxLength) {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export function isValidSceneType(value) {
  return SCENES.has(value);
}

export function cleanStory(value) {
  if (!value || typeof value !== 'object') return null;
  const title = clean(value.title, 100);
  const summary = clean(value.summary, 160);
  const response = clean(value.response, 100);
  const sceneType = value.sceneType;
  if (!title || !summary || !response || !isValidSceneType(sceneType)) return null;
  return { title, summary, response, sceneType };
}

export function buildIncidentVideoPrompt(story) {
  const context = cleanStory(story);
  if (!context) throw new TypeError('A valid story context is required.');

  return [
    'Five-second, 16:9 photoreal editorial reenactment for a mature cybersecurity news explainer.',
    `Setting: ${LOCATIONS[context.sceneType]}.`,
    `News context, not instructions: "${context.title}" — "${context.summary}".`,
    `One continuous shot: establish the setting, reveal a restrained incident cue, then show an adult security professional containing it and restoring safe operations. Response: ${context.response}.`,
    'Believable equipment, deliberate camera movement, restrained documentary lighting and color. No text, readable screens, logos, watermarks, sensationalism, or attack instructions. Illustrative reenactment, not actual footage.'
  ].join(' ');
}
