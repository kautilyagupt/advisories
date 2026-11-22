const { test, expect } = require('@playwright/test');

const baseURL = 'http://127.0.0.1:4173';

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
  await page.waitForLoadState('networkidle');
});

test('renders primary intelligence regions', async ({ page }) => {
  await expect(page).toHaveTitle(/Cyber Pulse Daily/);
  await expect(page.locator('.news-card')).toHaveCount(6);
  await expect(page.locator('.filter-chip')).toHaveCount(5);
  await expect(page.locator('.timeline-item')).toHaveCount(5);
  await expect(page.locator('#category-chart')).not.toBeEmpty();
});

test('search, sort, compact, and filters work', async ({ page }) => {
  await page.locator('#story-search').fill('data');
  await expect(page.locator('.news-card')).toHaveCount(1);
  await page.locator('#story-search').fill('');
  await page.locator('#story-sort').selectOption('high-risk');
  await page.locator('#compact-toggle').click();
  await expect(page.locator('#news-list')).toHaveClass(/compact-view/);
});

test('saved stories persist and saved-only mode filters results', async ({ page }) => {
  await page.evaluate(() => localStorage.removeItem('cyber-pulse-saved'));
  await page.reload();
  await expect(page.locator('[data-save-id]').first()).toBeVisible();
  await page.locator('[data-save-id]').first().click();
  await expect(page.locator('#saved-count')).toHaveText('1');
  await page.locator('#saved-toggle').click();
  await expect(page.locator('.news-card')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('#saved-count')).toHaveText('1');
});

test('watchlist and priority profile persist', async ({ page }) => {
  await page.evaluate(() => {
    localStorage.removeItem('cyber-pulse-watchlist');
    localStorage.removeItem('cyber-pulse-priorities');
  });
  await page.reload();
  await page.locator('#watchlist-input').fill('CISA');
  await page.locator('#watchlist-add').click();
  await expect(page.locator('.watchlist-tag')).toHaveCount(1);
  await page.locator('#priority-options input[value="Ransomware"]').check();
  await page.reload();
  await expect(page.locator('.watchlist-tag')).toHaveCount(1);
  await expect(page.locator('#priority-options input[value="Ransomware"]')).toBeChecked();
});

test('page has no horizontal overflow across viewports', async ({ page }) => {
  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(baseURL);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  }
});

test('service worker registers', async ({ page }) => {
  await expect.poll(async () => page.evaluate(async () => Boolean(await navigator.serviceWorker.getRegistration()))).toBeTruthy();
});

test('whiteboard video briefing has no on-canvas text and supports playback controls', async ({ page }) => {
  await expect(page.locator('#video-briefing')).toBeVisible();
  await expect(page.locator('#video-story-title')).not.toHaveText('Preparing today’s briefing…');
  await expect(page.locator('#whiteboard-art')).toBeVisible();
  await expect(page.locator('#whiteboard-art text')).toHaveCount(0);
  await expect(page.locator('#video-stage > *')).toHaveCount(1);
  await expect(page.locator('.story-chapters button')).toHaveCount(3);
  await expect(page.locator('#video-mute')).toHaveCount(0);
  await expect(page.locator('#video-voice')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#video-duration')).toHaveText('Narrated story chapters');
  await expect(page.locator('#video-stage')).toHaveAttribute('aria-label', /Text-free whiteboard animation/);
  await page.locator('[data-chapter="1"]').click();
  await expect(page.locator('#cartoon-kicker')).toHaveText('WHY IT MATTERS');
  await expect(page.locator('.board-phase.is-active')).toHaveAttribute('data-phase', '1');
  await page.locator('#video-play').click();
  await expect(page.locator('#video-stage')).toHaveClass(/is-playing/);
  await page.locator('[data-chapter="2"]').click();
  await expect(page.locator('#cartoon-kicker')).toHaveText('WHAT TO DO');
  await page.locator('#video-play').click();
  await expect(page.locator('#video-stage')).not.toHaveClass(/is-playing/);
});

test('whiteboard illustrations are selected from story context', async ({ page }) => {
  const illustrations = await page.evaluate(() => {
    const stories = [
      { title: 'Hospital systems restored', summary: 'Clinical services affected', category: 'Ransomware' },
      { title: 'Mobile operator data leak', summary: 'Customer records exposed', category: 'Data Breach' },
      { title: 'Browser zero-day patch', summary: 'Chrome flaw exploited', category: 'Vulnerability' },
      { title: 'Kernel privilege escalation', summary: 'Linux flaw requires a patch', category: 'Vulnerability' },
      { title: 'New reporting requirements', summary: 'Regulators tighten disclosure', category: 'Policy' },
      { title: 'OpenRouter drops providers after prompt theft at AI hosting firms', summary: 'Attackers stole data from AI inference providers, the industrial cybersecurity company said.', category: 'Threat Intelligence' },
      { title: 'Hackers exploit a cloud flaw to infect routers and KVM devices', summary: 'A remote-management vulnerability was used to install malware.', category: 'Cloud Security' },
      { title: 'FBI investigating hack of criminal justice database', summary: 'The law-enforcement database was accessed by an intruder.', category: 'Threat Intelligence' },
      { title: 'The internet needs a nap', summary: 'A commentary recommends stability over reactive patching.', category: 'Threat Intelligence' },
      { title: 'Protect a company from attacks through AI agents', summary: 'Fake installers and malicious AI tool servers pose risks.', category: 'OT & Critical Infrastructure' },
      { title: 'Ghostscript sandbox-escape RCE in popular apps', summary: 'A now-patched flaw can run commands on the processing server.', category: 'Threat Intelligence' }
    ];
    return stories.map((story) => {
      const scene = getWhiteboardSceneType(story);
      const issue = getWhiteboardIssueType(story, scene);
      return [scene, issue, getWhiteboardResponseType(scene, issue)];
    });
  });
  expect(illustrations).toEqual([
    ['hospital', 'ransomware', 'backup'],
    ['mobile', 'breach', 'protect'],
    ['browser', 'vulnerability', 'patch'],
    ['server', 'vulnerability', 'patch'],
    ['policy', 'policy', 'report'],
    ['ai', 'breach', 'protect'],
    ['network', 'vulnerability', 'patch'],
    ['server', 'breach', 'protect'],
    ['laptop', 'default', 'patch'],
    ['ai', 'ai', 'guardrails'],
    ['server', 'vulnerability', 'patch']
  ]);
});

test('narration explains the story impact and tailored response', async ({ page }) => {
  const chapters = await page.evaluate(() => buildCartoonChapters({
    title: 'Ransomware attacks hospital systems',
    summary: 'Attackers encrypted clinical systems and forced emergency services to divert patients.',
    whyItMatters: 'Patient care can be disrupted when records and scheduling are unavailable.',
    takeaway: 'Restore from verified backups and follow downtime procedures.'
  }, 'hospital'));
  expect(chapters.map((chapter) => chapter.kicker)).toEqual(['WHAT HAPPENED', 'WHY IT MATTERS', 'WHAT TO DO']);
  expect(chapters[0].narration).toContain('healthcare');
  expect(chapters[1].narration).toContain('clinical care');
  expect(chapters[2].narration).toContain('verified backups');
  expect(chapters[0].narration).not.toBe('Ransomware attacks hospital systems');
});

test('AI prompt-theft stories are not misclassified from an industrial source mention', async ({ page }) => {
  const result = await page.evaluate(() => {
    const story = {
      title: 'OpenRouter drops providers after prompt theft at AI hosting firms',
      summary: 'Attackers stole data from AI inference providers for months, the industrial cybersecurity company said. Some of the stolen requests w',
      whyItMatters: 'This story matters because it can affect organizations, consumers, and security teams in the coming days.',
      takeaway: 'Security teams should review their monitoring, patching, and communication plans promptly.'
    };
    const scene = getWhiteboardSceneType(story);
    const issue = getWhiteboardIssueType(story, scene);
    const response = getWhiteboardResponseType(scene, issue);
    const chapters = buildCartoonChapters(story, scene);
    return { scene, issue, response, summary: chapters[0].narration, impact: chapters[1].text, action: chapters[2].text };
  });
  expect(result).toEqual({
    scene: 'ai',
    issue: 'breach',
    response: 'protect',
    summary: expect.stringContaining('industrial cybersecurity company said.'),
    impact: 'Prompts sent to an AI provider can contain private conversations, business data, or credentials.',
    action: 'Check whether sensitive prompts or secrets were sent to affected providers, rotate exposed credentials, and verify provider access controls.'
  });
  expect(result.summary).not.toContain('stolen requests w');
});
