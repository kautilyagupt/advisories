const FALLBACK_STORIES = [
  {
    title: 'Ransomware crews disrupt a major hospital network in North America',
    category: 'Ransomware',
    region: 'North America',
    source: 'BleepingComputer',
    summary: 'A regional hospital was forced to divert emergency services after attackers encrypted clinical systems and demanded a payment to restore access.',
    whyItMatters: 'The incident highlights how downtime in healthcare can quickly turn into a safety issue, especially when patient records and scheduling systems are locked out.',
    impact: 'High',
    riskClass: 'risk-high',
    takeaway: 'Hospitals are widening their incident response plans and backup validation work.'
  },
  {
    title: 'Google patches a Chrome zero-day already used in targeted attacks',
    category: 'Vulnerability',
    region: 'Global',
    source: 'Google Chrome Releases',
    summary: 'Security teams are advising rapid upgrades after Chrome released a fix for a browser flaw that attackers were exploiting in the wild.',
    whyItMatters: 'A browser zero-day can become a fast path into corporate systems, especially when employees click links or open documents from trusted-looking sources.',
    impact: 'High',
    riskClass: 'risk-high',
    takeaway: 'Browser patching is now a top-level priority for IT teams and home users.'
  },
  {
    title: 'EU regulators tighten breach disclosure rules for critical sectors',
    category: 'Policy',
    region: 'Europe',
    source: 'European Commission',
    summary: 'New guidance gives regulators stronger leverage to demand quicker reporting and clearer remediation plans from companies handling essential services.',
    whyItMatters: 'This change raises the pressure on boards and CISOs to prove they can detect incidents fast and communicate clearly to regulators and customers.',
    impact: 'Medium',
    riskClass: 'risk-medium',
    takeaway: 'Compliance teams should expect sharper deadlines and more scrutiny around breach handling.'
  },
  {
    title: 'Mobile operator in South Asia confirms data leak affecting millions of users',
    category: 'Data Breach',
    region: 'Asia Pacific',
    source: 'Reuters',
    summary: 'A telecom provider reported that customer contact details and account metadata were exposed through an unsecured database and later circulated online.',
    whyItMatters: 'Leakages like this often fuel phishing and impersonation campaigns, turning a single exposure into a wider wave of social engineering attacks.',
    impact: 'High',
    riskClass: 'risk-high',
    takeaway: 'Customers should expect SIM swap warnings and more targeted phishing attempts in the next few days.'
  },
  {
    title: 'Open-source AI package is used in a supply-chain attack chain',
    category: 'Supply Chain',
    region: 'Global',
    source: 'GitHub Security',
    summary: 'Researchers identified a malicious version of a popular development library that was designed to steal credentials from developers and CI systems.',
    whyItMatters: 'Software supply-chain compromises can spread far beyond one organization, making dependency hygiene a core security practice rather than a luxury.',
    impact: 'Medium',
    riskClass: 'risk-medium',
    takeaway: 'Engineering teams should rotate tokens and review dependency updates more aggressively.'
  },
  {
    title: 'Critical Linux kernel patch addresses privilege escalation flaw',
    category: 'Vulnerability',
    region: 'Global',
    source: 'The Hacker News',
    summary: 'A newly disclosed flaw could let attackers gain elevated privileges on certain systems if the patch is not applied quickly.',
    whyItMatters: 'Kernel-level issues are especially important because they can be abused across multiple services once a host is compromised.',
    impact: 'Medium',
    riskClass: 'risk-medium',
    takeaway: 'Server operators should prioritize patch windows during the coming week.'
  }
];

const FEED_URLS = [
  'https://feeds.feedburner.com/TheHackersNews',
  'https://www.bleepingcomputer.com/feed/',
  'https://www.securityweek.com/rss.xml'
];

let stories = [...FALLBACK_STORIES];
let activeFilter = 'All';

function formatDate() {
  return new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());
}

function detectCategory(title) {
  const text = title.toLowerCase();
  if (/ransom|encrypt|malware|attack/i.test(text)) return 'Ransomware';
  if (/breach|leak|data/i.test(text)) return 'Data Breach';
  if (/policy|regulat|compliance|eu|law/i.test(text)) return 'Policy';
  if (/supply|dependency|open-source|package|chain/i.test(text)) return 'Supply Chain';
  return 'Vulnerability';
}

function detectRegion(title) {
  const text = title.toLowerCase();
  if (/europe|eu|uk|germany|france|italy/i.test(text)) return 'Europe';
  if (/north america|us|usa|canada|america/i.test(text)) return 'North America';
  if (/asia|india|japan|korea|china|singapore/i.test(text)) return 'Asia Pacific';
  return 'Global';
}

function createStoryFromFeed(item, index) {
  const title = item.title || `Cybersecurity update ${index + 1}`;
  const category = detectCategory(title);
  const summary = item.description ? item.description.replace(/<[^>]+>/g, '').trim().slice(0, 220) : `A new development in ${category.toLowerCase()} security is drawing attention from defenders worldwide.`;

  return {
    title,
    category,
    region: detectRegion(title),
    source: item.author || 'Live feed',
    summary,
    whyItMatters: 'This story matters because it can affect organizations, consumers, and security teams in the coming days.',
    impact: /ransom|breach|leak|attack/i.test(title.toLowerCase()) ? 'High' : 'Medium',
    riskClass: /ransom|breach|leak|attack/i.test(title.toLowerCase()) ? 'risk-high' : 'risk-medium',
    takeaway: 'Security teams should review their monitoring, patching, and communication plans promptly.'
  };
}

async function loadLiveStories() {
  try {
    const results = await Promise.allSettled(
      FEED_URLS.map((url) =>
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`).then((response) => {
          if (!response.ok) throw new Error('Feed request failed');
          return response.json();
        })
      )
    );

    const feedItems = results
      .filter((result) => result.status === 'fulfilled' && result.value?.items)
      .flatMap((result) => result.value.items)
      .slice(0, 8);

    if (feedItems.length) {
      stories = feedItems.map(createStoryFromFeed).slice(0, 6);
    }
  } catch (error) {
    stories = [...FALLBACK_STORIES];
  }
}

function renderHeader() {
  document.getElementById('date-badge').textContent = formatDate();
  document.getElementById('story-count').textContent = stories.length;
  document.getElementById('risk-level').textContent = stories.some((story) => story.impact === 'High') ? 'High' : 'Medium';
  document.getElementById('digest-title').textContent = 'Today’s 5-minute summary';
  document.getElementById('digest-summary').textContent =
    'The biggest themes today are rapid incident response, patch urgency, and stronger reporting rules around the world.';
}

function renderFilters() {
  const filters = ['All', ...new Set(stories.map((story) => story.category))];
  const filterContainer = document.getElementById('filters');
  filterContainer.innerHTML = filters
    .map((filter) => {
      const isActive = filter === activeFilter;
      return `<button class="filter-chip ${isActive ? 'active' : ''}" data-filter="${filter}">${filter}</button>`;
    })
    .join('');
}

function getVisibleStories() {
  return activeFilter === 'All' ? stories : stories.filter((story) => story.category === activeFilter);
}

function renderNews() {
  const list = document.getElementById('news-list');
  const visibleStories = getVisibleStories();

  if (!visibleStories.length) {
    list.innerHTML = '<article class="news-card"><h3>No stories match this filter yet.</h3></article>';
    return;
  }

  list.innerHTML = visibleStories
    .map(
      (story) => `
        <article class="news-card">
          <div class="news-top">
            <div class="news-meta">
              <span class="category-pill">${story.category}</span>
              <span class="source">${story.region} • ${story.source}</span>
            </div>
            <span class="${story.riskClass}">${story.impact} impact</span>
          </div>
          <h3>${story.title}</h3>
          <p class="summary-text">${story.summary}</p>
          <div class="story-grid">
            <div class="story-box">
              <strong>Why it matters</strong>
              <span>${story.whyItMatters}</span>
            </div>
            <div class="story-box">
              <strong>What to watch</strong>
              <span>${story.takeaway}</span>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

async function init() {
  renderHeader();
  renderFilters();
  renderNews();
  await loadLiveStories();
  renderHeader();
  renderFilters();
  renderNews();

  document.getElementById('filters').addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;

    activeFilter = button.dataset.filter;
    renderFilters();
    renderNews();
  });
}

document.addEventListener('DOMContentLoaded', init);
