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
  await expect(page.locator('.story-chapters button')).toHaveCount(4);
  await expect(page.locator('#video-mute')).toHaveCount(0);
  await expect(page.locator('#video-voice')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#video-duration')).toHaveText('One continuous lesson');
  await expect(page.locator('#video-stage')).toHaveAttribute('aria-label', /instructor-led whiteboard lesson/i);
  const stage = await page.locator('#whiteboard-art').boundingBox();
  expect(stage.width / stage.height).toBeCloseTo(16 / 9, 1);
  await page.locator('[data-chapter="1"]').click();
  await expect(page.locator('#cartoon-kicker')).toHaveText('THE INCIDENT');
  await expect(page.locator('.board-phase.is-current')).toHaveAttribute('data-phase', '1');
  await expect(page.locator('.board-phase.is-active')).toHaveCount(2);
  await page.locator('#video-play').click();
  await expect(page.locator('#video-stage')).toHaveClass(/is-playing/);
  await page.locator('[data-chapter="3"]').click();
  await expect(page.locator('#cartoon-kicker')).toHaveText('WHAT TO DO');
  await expect(page.locator('.board-phase.is-active')).toHaveCount(4);
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
      return [scene, issue, getWhiteboardImpactType(scene), getWhiteboardResponseType(scene, issue)];
    });
  });
  expect(illustrations).toEqual([
    ['hospital', 'ransomware', 'care', 'backup'],
    ['mobile', 'breach', 'account', 'protect'],
    ['browser', 'vulnerability', 'device', 'patch'],
    ['server', 'vulnerability', 'services', 'patch'],
    ['policy', 'policy', 'deadline', 'report'],
    ['ai', 'breach', 'data', 'protect'],
    ['network', 'vulnerability', 'network', 'patch'],
    ['server', 'breach', 'services', 'protect'],
    ['laptop', 'default', 'network', 'patch'],
    ['ai', 'ai', 'data', 'guardrails'],
    ['server', 'vulnerability', 'services', 'patch']
  ]);
});

test('narration explains the story impact and tailored response', async ({ page }) => {
  const chapters = await page.evaluate(() => buildCartoonChapters({
    title: 'Ransomware attacks hospital systems',
    summary: 'Attackers encrypted clinical systems and forced emergency services to divert patients.',
    whyItMatters: 'Patient care can be disrupted when records and scheduling are unavailable.',
    takeaway: 'Restore from verified backups and follow downtime procedures.'
  }, 'hospital'));
  expect(chapters.map((chapter) => chapter.kicker)).toEqual(['THE CONTEXT', 'THE INCIDENT', 'WHY IT MATTERS', 'WHAT TO DO']);
  expect(chapters[0].narration).toContain('hospital’s digital systems');
  expect(chapters[1].narration).toContain('The disruption begins at the clinical systems.');
  expect(chapters[1].narration).toContain('Ransomware attacks hospital systems');
  expect(chapters[2].narration).toContain('clinical care');
  expect(chapters[3].narration).toContain('verified backups');
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
    return { scene, issue, response, summary: chapters[1].narration, impact: chapters[2].text, action: chapters[3].text };
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

test('narration captions follow chapters outside the text-free drawing', async ({ page }) => {
  const captions = page.locator('#video-caption-live');
  await expect(captions).toBeVisible();
  await expect(page.locator('#whiteboard-art text')).toHaveCount(0);
  await expect(captions).toContainText(await page.locator('#cartoon-message').textContent());

  await page.locator('[data-chapter="1"]').click();
  await expect(page.locator('.board-phase.is-current')).toHaveAttribute('data-phase', '1');
  await expect(page.locator('.board-phase.is-active')).toHaveCount(2);
  await expect(captions).toContainText(await page.locator('#cartoon-message').textContent());
  await expect(page.locator('#video-progress-track')).toHaveAttribute('role', 'progressbar');
  await expect(page.locator('#video-progress-track')).not.toHaveAttribute('aria-valuenow', '0');

  await page.locator('#video-captions-toggle').click();
  await expect(captions).toBeHidden();
  await expect(page.locator('#video-captions-toggle')).toHaveAttribute('aria-pressed', 'false');
  await page.locator('#video-captions-toggle').click();
  await expect(captions).toBeVisible();

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('[data-chapter="3"]').click();
  await expect(page.locator('.board-phase.is-current')).toHaveAttribute('data-phase', '3');
  await expect(page.locator('.board-phase.is-current [data-draw-step="1"]')).toHaveCSS('animation-name', 'none');
});

test('silent playback builds a scene continuously and advances to the next story', async ({ page }) => {
  const progression = await page.evaluate(() => {
    videoBrief.stories = [
      { title: 'Ransomware disrupts hospital systems', summary: 'Attackers encrypted clinical systems.', category: 'Ransomware' },
      { title: 'Router remote management vulnerability', summary: 'A flaw in router software is exploited.', category: 'Vulnerability' }
    ];
    videoBrief.index = 0;
    videoBrief.voiceEnabled = false;
    videoBrief.playing = true;
    videoBrief.chapters = buildCartoonChapters(videoBrief.stories[0], 'hospital');
    showCartoonChapter(0);
    const activeLayers = [];
    for (let chapterIndex = 0; chapterIndex < 4; chapterIndex += 1) {
      if (chapterIndex) advanceCartoonChapter();
      activeLayers.push(document.querySelectorAll('.board-phase.is-active').length);
    }
    advanceCartoonChapter();
    const nextStory = {
      index: videoBrief.index,
      scene: document.getElementById('whiteboard-art').dataset.sceneType,
      phase: document.querySelector('.board-phase.is-current').dataset.phase
    };
    stopVideoBrief();
    return { activeLayers, nextStory };
  });
  expect(progression.activeLayers).toEqual([1, 2, 3, 4]);
  expect(progression.nextStory).toEqual({ index: 1, scene: 'network', phase: '0' });
});

test('one continuous scene remains visible while each chapter is revealed', async ({ page }) => {
  const start = await page.evaluate(() => {
    videoBrief.playing = false;
    videoBrief.voiceEnabled = false;
    videoBrief.stories = [{ title: 'Router vulnerability exploited', summary: 'Attackers target exposed network devices.', category: 'Vulnerability' }];
    videoBrief.index = 0;
    renderVideoSlide();
    return {
      camera: document.getElementById('story-camera').getAttribute('transform'),
      gesture: document.getElementById('instructor-gesture').getAttribute('transform')
    };
  });
  await page.locator('[data-chapter="1"]').click();
  const next = await page.evaluate(() => ({
    camera: document.getElementById('story-camera').getAttribute('transform'),
    gesture: document.getElementById('instructor-gesture').getAttribute('transform'),
    phaseCount: document.querySelectorAll('.board-phase.is-active').length,
    previousPhaseOpacity: Number(getComputedStyle(document.querySelector('.board-phase[data-phase="0"]')).opacity)
  }));

  expect(next.camera).toBe(start.camera);
  expect(next.gesture).not.toBe(start.gesture);
  expect(next.phaseCount).toBe(2);
  expect(next.previousPhaseOpacity).toBeGreaterThan(0.1);
});

test('playback animates only the route for the current beat', async ({ page }) => {
  const routes = await page.evaluate(() => {
    videoBrief.playing = false;
    videoBrief.voiceEnabled = false;
    videoBrief.stories = [{ title: 'Router vulnerability exploited', summary: 'Attackers target exposed network devices.', category: 'Vulnerability' }];
    videoBrief.index = 0;
    renderVideoSlide();
    showCartoonChapter(2);
    document.getElementById('video-stage').classList.add('is-playing');
    return {
      routes: [1, 2, 3].map((phase) => getComputedStyle(
        document.querySelector(`.board-phase[data-phase="${phase}"] .flow-path`)
      ).animationName),
      pointer: getComputedStyle(document.getElementById('instructor-pointer')).animationName
    };
  });

  expect(routes.routes).toEqual(['none', 'data-flow', 'none']);
  expect(routes.pointer).toBe('instructor-pointer-draw');
});

test('full scene supports 100 narrative checkpoints across 25 stories', async ({ page }) => {
  const reviews = await page.evaluate(() => {
    const cases = [
      [{ title: 'Prompt data stolen at AI providers', summary: 'Attackers stole data from AI inference providers for months.', category: 'Data Breach' }, 'ai'],
      [{ title: 'Router remote management vulnerability', summary: 'A flaw in router software is being exploited.', category: 'Vulnerability' }, 'network'],
      [{ title: 'Ransomware disrupts hospital systems', summary: 'Attackers encrypted clinical systems and interrupted care.', category: 'Ransomware' }, 'hospital'],
      [{ title: 'Phishing campaign targets employee accounts', summary: 'Messages impersonate a trusted service to steal sign-in details.', category: 'Phishing' }, 'identity'],
      [{ title: 'Chrome zero-day exploited in attacks', summary: 'A browser flaw is being used to compromise devices.', category: 'Vulnerability' }, 'browser'],
      [{ title: 'Compromised open-source package', summary: 'A malicious dependency affects downstream software.', category: 'Supply Chain' }, 'package'],
      [{ title: 'Cloud secret leaked from production', summary: 'An exposed cloud key allowed unauthorized access.', category: 'Cloud Security' }, 'cloud'],
      [{ title: 'Factory network intrusion reported', summary: 'A cyber incident affected an industrial control network.', category: 'OT Security' }, 'ot'],
      [{ title: 'Mobile subscriber records exposed', summary: 'Customer details were accessed without authorization.', category: 'Telecom' }, 'mobile'],
      [{ title: 'New incident disclosure deadline announced', summary: 'Regulators clarified the reporting window.', category: 'Policy' }, 'policy'],
      [{ title: 'Server RCE flaw exploited in attacks', summary: 'The vulnerability allows remote command execution.', category: 'Threat Intelligence' }, 'server'],
      [{ title: 'Criminal justice database breach confirmed', summary: 'An intruder accessed sensitive records.', category: 'Threat Intelligence' }, 'server'],
      [{ title: 'AI agent tool server serves malicious updates', summary: 'A poisoned tool can misuse connected data.', category: 'AI Security' }, 'ai'],
      [{ title: 'VPN appliance zero-day actively exploited', summary: 'Attackers target exposed network gateways.', category: 'Vulnerability' }, 'network'],
      [{ title: 'Hospital patient portal outage disrupts appointments', summary: 'Clinical access is unavailable during recovery.', category: 'Healthcare' }, 'hospital'],
      [{ title: 'Dependency malware reaches production builds', summary: 'A compromised package affected downstream releases.', category: 'Supply Chain' }, 'package'],
      [{ title: 'Cloud API key leak exposes production services', summary: 'An exposed credential enabled unauthorized access.', category: 'Cloud Security' }, 'cloud'],
      [{ title: 'SCADA intrusion reported at a power utility', summary: 'Operators isolated systems after detecting an intrusion.', category: 'Critical Infrastructure' }, 'ot'],
      [{ title: 'Stolen identity session tokens used in attacks', summary: 'Attackers impersonated authenticated employees.', category: 'Identity' }, 'identity'],
      [{ title: 'Linux kernel privilege flaw under active exploitation', summary: 'A kernel weakness can grant elevated access.', category: 'Vulnerability' }, 'server'],
      [{ title: 'Employee endpoint hardening guidance updated', summary: 'Security teams received new device controls.', category: 'Guidance' }, 'laptop'],
      [{ title: 'Telecom subscriber data leak triggers investigation', summary: 'Customer records were exposed in a breach.', category: 'Telecom' }, 'mobile'],
      [{ title: 'AI prompt logs exposed by inference service', summary: 'Private prompts were accessible to unauthorized users.', category: 'AI Security' }, 'ai'],
      [{ title: 'Incident reporting deadline shortened', summary: 'A new disclosure window applies to covered organizations.', category: 'Policy' }, 'policy'],
      [{ title: 'Enterprise database accessed by intruder', summary: 'Investigators confirmed unauthorized access to records.', category: 'Threat Intelligence' }, 'server']
    ];
    const results = [];
    const beatTargets = [{ x: 410, y: 325 }, { x: 615, y: 260 }, { x: 820, y: 390 }, { x: 615, y: 260 }];
    for (const [story, expectedScene] of cases) {
      videoBrief.stories = [story];
      videoBrief.index = 0;
      renderVideoSlide();
      const scene = getWhiteboardSceneType(story);
      const issue = getWhiteboardIssueType(story, scene);
      const response = getWhiteboardResponseType(scene, issue);
      for (let phaseIndex = 0; phaseIndex < 4; phaseIndex += 1) {
        showCartoonChapter(phaseIndex);
        const phase = document.querySelector('.board-phase.is-current');
        const activePhases = document.querySelectorAll('.board-phase.is-active');
        const chapter = videoBrief.chapters[phaseIndex];
        results.push({
          phase: phase.getAttribute('data-phase'),
          activePhaseCount: activePhases.length,
          focus: document.getElementById('whiteboard-art').dataset.focus,
          scene,
          expectedScene,
          setting: document.querySelector('.setting-icon').getAttribute('href'),
          expectedSetting: `#setting-${scene === 'hospital' ? 'clinical' : scene === 'ot' ? 'industrial' : ['network', 'cloud', 'server'].includes(scene) ? 'operations' : 'office'}`,
          actor: document.querySelector('.board-phase[data-phase="0"] .actor-icon').getAttribute('href'),
          expectedActor: `#actor-${scene === 'hospital' ? 'clinician' : scene === 'ot' ? 'operator' : 'analyst'}`,
          subject: document.querySelector('.board-phase .subject-icon').getAttribute('href'),
          incidentPlacement: ['x', 'y', 'width', 'height'].map((attribute) => document.querySelector('.incident-symbol').getAttribute(attribute)),
          responsePlacement: ['x', 'y', 'width', 'height'].map((attribute) => document.querySelector('.response-symbol').getAttribute(attribute)),
          issue: [...document.querySelectorAll('.board-phase.is-active .incident-symbol')].pop()?.getAttribute('href') || null,
          impact: [...document.querySelectorAll('.board-phase.is-active .impact-symbol')].pop()?.getAttribute('href') || null,
          response: [...document.querySelectorAll('.board-phase.is-active .response-symbol')].pop()?.getAttribute('href') || null,
          camera: document.getElementById('story-camera').getAttribute('transform'),
          expectedCamera: 'translate(0 0) scale(1)',
          pointerTarget: document.getElementById('instructor-pointer').getAttribute('d').split(' L').pop().split(' ').map(Number),
          expectedPointerTarget: [beatTargets[phaseIndex].x, beatTargets[phaseIndex].y],
          incidentResolved: document.querySelector('.board-phase[data-phase="1"]').classList.contains('is-resolved'),
          expectedIssue: phaseIndex >= 1 ? `#issue-${issue}` : null,
          expectedImpact: phaseIndex >= 2 ? `#impact-${getWhiteboardImpactType(scene)}` : null,
          expectedResponse: phaseIndex >= 3 ? `#response-${response}` : null,
          captionMatches: document.getElementById('video-caption-live').textContent.includes(chapter.text),
          textFree: document.querySelectorAll('#whiteboard-art text').length === 0,
          focusRingCount: document.querySelectorAll('#whiteboard-art .focus-ring').length,
          drawSteps: [...phase.querySelectorAll('[data-draw-step]')].map((element) => element.dataset.drawStep)
        });
      }
    }
    return results;
  });

  expect(reviews).toHaveLength(100);
  for (const [index, review] of reviews.entries()) {
    const phase = index % 4;
    expect(review.phase).toBe(String(phase));
    expect(review.activePhaseCount).toBe(phase + 1);
    expect(review.focus).toBe(String(phase));
    expect(review.scene).toBe(review.expectedScene);
    expect(review.setting).toBe(review.expectedSetting);
    expect(review.actor).toBe(review.expectedActor);
    expect(review.subject).toBe(`#subject-${review.expectedScene}`);
    expect(review.responsePlacement).toEqual(review.incidentPlacement);
    expect(review.issue).toBe(review.expectedIssue);
    expect(review.impact).toBe(review.expectedImpact);
    expect(review.response).toBe(review.expectedResponse);
    expect(review.camera).toBe(review.expectedCamera);
    expect(review.pointerTarget).toEqual(review.expectedPointerTarget);
    expect(review.incidentResolved).toBe(phase === 3);
    expect(review.captionMatches).toBe(true);
    expect(review.textFree).toBe(true);
    expect(review.focusRingCount).toBe(0);
    expect(review.drawSteps).toContain('0');
    if (phase > 0) expect(review.drawSteps).toContain('1');
  }
});
