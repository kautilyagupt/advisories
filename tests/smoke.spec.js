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

test('latest video briefing supports playback controls', async ({ page }) => {
  await expect(page.locator('#video-briefing')).toBeVisible();
  await expect(page.locator('#video-story-title')).not.toHaveText('Preparing today’s briefing…');
  await page.locator('#video-play').click();
  await expect(page.locator('#video-stage')).toHaveClass(/is-playing/);
  await page.locator('#video-mute').click();
  await expect(page.locator('#video-mute')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#video-play').click();
  await expect(page.locator('#video-stage')).not.toHaveClass(/is-playing/);
});
