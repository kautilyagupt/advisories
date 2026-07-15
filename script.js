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
    takeaway: 'Hospitals are widening their incident response plans and backup validation work.',
    referenceLink: 'https://www.bleepingcomputer.com/'
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
    takeaway: 'Browser patching is now a top-level priority for IT teams and home users.',
    referenceLink: 'https://chromereleases.googleblog.com/'
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
    takeaway: 'Compliance teams should expect sharper deadlines and more scrutiny around breach handling.',
    referenceLink: 'https://ec.europa.eu/'
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
    takeaway: 'Customers should expect SIM swap warnings and more targeted phishing attempts in the next few days.',
    referenceLink: 'https://www.reuters.com/'
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
    takeaway: 'Engineering teams should rotate tokens and review dependency updates more aggressively.',
    referenceLink: 'https://github.blog/tag/security/'
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
    takeaway: 'Server operators should prioritize patch windows during the coming week.',
    referenceLink: 'https://thehackernews.com/'
  }
];

const ADVISORY_SOURCES = [
  { name: 'NIST', link: 'https://www.nist.gov/news-events/news' },
  { name: 'OWASP', link: 'https://owasp.org/news/' },
  { name: 'CISA', link: 'https://www.cisa.gov/news-events/alerts' },
  { name: 'MITRE', link: 'https://www.mitre.org/news' },
  { name: 'ENISA', link: 'https://www.enisa.europa.eu/news' },
  { name: 'US-CERT', link: 'https://www.us-cert.gov/ncas/alerts' },
  { name: 'NCSC UK', link: 'https://www.ncsc.gov.uk/news' },
  { name: 'ANSSI', link: 'https://www.ssi.gouv.fr/en/news/' },
  { name: 'JPCERT/CC', link: 'https://www.jpcert.or.jp/english/news/' },
  { name: 'AusCERT', link: 'https://www.auscert.org.au/' },
  { name: 'CERT-IN', link: 'https://www.cert-in.org.in/' },
  { name: 'CERT Canada', link: 'https://www.cyber.gc.ca/en/' },
  { name: 'CERT NZ', link: 'https://www.cert.govt.nz/' },
  { name: 'CERT Australia', link: 'https://www.cyber.gov.au/acsc/view-all-content/advisories' },
  { name: 'KISA', link: 'https://www.kisa.or.kr/eng/' },
  { name: 'Brazil CERT', link: 'https://www.cert.br/' },
  { name: 'CERT France', link: 'https://www.cert.ssi.gouv.fr/' },
  { name: 'CERT Germany', link: 'https://www.bsi.bund.de/EN/Topics/Cyber-Security/cyber-security_node.html' },
  { name: 'CERT India', link: 'https://www.cert-in.org.in/' },
  { name: 'CNSS', link: 'https://www.whitehouse.gov/nsci/' },
  { name: 'NIST NVD', link: 'https://nvd.nist.gov/' },
  { name: 'MITRE CVE', link: 'https://cve.mitre.org/' },
  { name: 'Microsoft Security Response Center', link: 'https://msrc.microsoft.com/' },
  { name: 'Google Security Blog', link: 'https://security.googleblog.com/' },
  { name: 'Apple Security Updates', link: 'https://support.apple.com/en-us/HT201222' },
  { name: 'Cisco Talos', link: 'https://blog.talosintelligence.com/' },
  { name: 'Palo Alto Networks Unit 42', link: 'https://unit42.paloaltonetworks.com/' },
  { name: 'Mandiant', link: 'https://www.mandiant.com/resources' },
  { name: 'CrowdStrike', link: 'https://www.crowdstrike.com/blog/' },
  { name: 'Kaspersky Securelist', link: 'https://securelist.com/' },
  { name: 'Trend Micro Zero Day Initiative', link: 'https://www.zerodayinitiative.com/blog/' },
  { name: 'IBM X-Force', link: 'https://www.ibm.com/security/security-intelligence' },
  { name: 'Symantec Threat Intelligence', link: 'https://symantec-enterprise-blogs.security.com/' },
  { name: 'McAfee Labs', link: 'https://www.mcafee.com/enterprise/en-us/threat-center.html' },
  { name: 'Secureworks', link: 'https://www.secureworks.com/research' },
  { name: 'Akamai Security Intelligence', link: 'https://www.akamai.com/us/en/resources/security-intelligence-report.jsp' },
  { name: 'F5 Labs', link: 'https://www.f5.com/labs' },
  { name: 'Rapid7', link: 'https://www.rapid7.com/research/' },
  { name: 'Qualys Security Labs', link: 'https://blog.qualys.com/' },
  { name: 'Tenable', link: 'https://www.tenable.com/blog' },
  { name: 'Avast Threat Labs', link: 'https://blog.avast.com/' },
  { name: 'Sophos Labs', link: 'https://news.sophos.com/' },
  { name: 'Malwarebytes Labs', link: 'https://blog.malwarebytes.com/' },
  { name: 'Recorded Future', link: 'https://www.recordedfuture.com/blog/' },
  { name: 'DarkReading', link: 'https://www.darkreading.com/' },
  { name: 'Threatpost', link: 'https://threatpost.com/' },
  { name: 'Krebs on Security', link: 'https://krebsonsecurity.com/' },
  { name: 'CSO Online', link: 'https://www.csoonline.com/' },
  { name: 'Infosecurity Magazine', link: 'https://www.infosecurity-magazine.com/' },
  { name: 'SC Magazine', link: 'https://www.scmagazine.com/' },
  { name: 'The Register Security', link: 'https://www.theregister.com/security/' },
  { name: 'ZDNet Security', link: 'https://www.zdnet.com/topic/security/' },
  { name: 'Ars Technica Security', link: 'https://arstechnica.com/security/' },
  { name: 'Wired Security', link: 'https://www.wired.com/category/security/' },
  { name: 'TechCrunch Security', link: 'https://techcrunch.com/tag/security/' },
  { name: 'CyberScoop', link: 'https://www.cyberscoop.com/' },
  { name: 'Reuters Security', link: 'https://www.reuters.com/world/technology/' },
  { name: 'Bloomberg Cybersecurity', link: 'https://www.bloomberg.com/technology' },
  { name: 'Financial Times Cyber', link: 'https://www.ft.com/technology' },
  { name: 'NATO CCDCOE', link: 'https://www.ccdcoe.org/news/' },
  { name: 'Europol EC3', link: 'https://www.europol.europa.eu/activities-services/services-support/cybercrime' },
  { name: 'INTERPOL Cybercrime', link: 'https://www.interpol.int/en/Crimes/Cybercrime' },
  { name: 'Mozilla Security Blog', link: 'https://blog.mozilla.org/security/' },
  { name: 'Samsung Security', link: 'https://news.samsung.com/global/tag/security' },
  { name: 'Oracle Security Alerts', link: 'https://www.oracle.com/security-alerts/' },
  { name: 'Adobe Security Bulletins', link: 'https://helpx.adobe.com/security.html' },
  { name: 'SAP Security Notes', link: 'https://support.sap.com/en/solution-thought-leadership/innovation/reports/security-notes.html' },
  { name: 'VMware Security Advisories', link: 'https://www.vmware.com/security/advisories.html' },
  { name: 'Juniper PSIRT', link: 'https://www.juniper.net/us/en/products-services/security/psirt/' },
  { name: 'Red Hat Security', link: 'https://www.redhat.com/en/blog/category/security' },
  { name: 'SUSE Security', link: 'https://www.suse.com/security/' },
  { name: 'Debian Security', link: 'https://www.debian.org/security/' },
  { name: 'Ubuntu Security Notices', link: 'https://ubuntu.com/security/notices' },
  { name: 'Fedora Magazine Security', link: 'https://fedoramagazine.org/tag/security/' },
  { name: 'OpenSSF', link: 'https://openssf.org/news/' },
  { name: 'CERT Poland', link: 'https://www.cert.pl/' },
  { name: 'CERT Czech Republic', link: 'https://www.nic.cz/en/' },
  { name: 'CERT Slovakia', link: 'https://www.cert.sk/' },
  { name: 'CERT Estonia', link: 'https://www.ria.ee/en/cyber-security/' },
  { name: 'CERT Latvia', link: 'https://cert.lv/' },
  { name: 'CERT Lithuania', link: 'https://www.cert.lt/' },
  { name: 'CERT Spain', link: 'https://www.incibe.es/en/' },
  { name: 'CERT Italy', link: 'https://www.cert-agid.gov.it/' },
  { name: 'CERT Netherlands', link: 'https://www.ncsc.nl/' },
  { name: 'CERT Sweden', link: 'https://www.cert.se/' },
  { name: 'CERT Norway', link: 'https://www.nstdata.no/' },
  { name: 'CERT Denmark', link: 'https://enisa.europa.eu/topics/csirt-cert-services' },
  { name: 'Singapore CSA', link: 'https://www.csa.gov.sg/news' },
  { name: 'HKCERT', link: 'https://www.hkcert.org/' },
  { name: 'Malaysia MyCERT', link: 'https://www.mycert.org.my/' },
  { name: 'Thailand ThaiCERT', link: 'https://www.thaicert.or.th/' },
  { name: 'Indonesia ID-CERT', link: 'https://www.id-cert.or.id/' },
  { name: 'Philippines CERT', link: 'https://www.cert.gov.ph/' },
  { name: 'South Africa CERT', link: 'https://www.gov.za/about-government/government-programmes/cybersecurity' },
  { name: 'Saudi NCA', link: 'https://www.nca.gov.sa/en/' },
  { name: 'UAE NESA', link: 'https://www.nesa.gov.ae/' },
  { name: 'Mexico CNS', link: 'https://www.gob.mx/cns' },
  { name: 'Chile CERT', link: 'https://www.certchile.gob.cl/' },
  { name: 'Argentina CERT', link: 'https://www.argentina.gob.ar/seguridadinformatica' },
  { name: 'Colombia CERT', link: 'https://www.cert.gov.co/' },
  { name: 'Peru CERT', link: 'https://www.certperu.gob.pe/' },
  { name: 'Israel NCD', link: 'https://www.gov.il/en/departments/national_cyber_directorate' },
  { name: 'Japan NISC', link: 'https://www.nisc.go.jp/eng/index.html' },
  { name: 'Korea NIS', link: 'https://www.nis.go.kr/eng' },
  { name: 'Russia CERT', link: 'https://www.cert.ru/' },
  { name: 'China CNCERT', link: 'https://www.cert.org.cn/' },
  { name: 'Pakistan NCC', link: 'https://ncc.gov.pk/' },
  { name: 'Vietnam VNCERT', link: 'https://www.vncert.gov.vn/' },
  { name: 'Taiwan TWNIC', link: 'https://www.twnic.tw/' },
  { name: 'New Zealand NCSC', link: 'https://www.ncsc.govt.nz/' },
  { name: 'Australia ACSC', link: 'https://www.cyber.gov.au/' },
  { name: 'Africa Cybersecurity Experts', link: 'https://www.africacybersecurity.org/' },
  { name: 'Latin America CERT', link: 'https://www.lacnic.net/' },
  { name: 'GOVCERT.CH', link: 'https://www.govcert.ch/' },
  { name: 'CERT Belgium', link: 'https://www.cert.be/' },
  { name: 'CERT Finland', link: 'https://www.cert.fi/' },
  { name: 'CERT Portugal', link: 'https://www.cert.pt/' },
  { name: 'CERT Ireland', link: 'https://www.cert.gov.ie/' },
  { name: 'CERT Greece', link: 'https://www.cert.gr/' },
  { name: 'CERT Turkey', link: 'https://www.btk.gov.tr/' },
  { name: 'CERT Romania', link: 'https://www.cert.ro/' },
  { name: 'CERT Bulgaria', link: 'https://www.cert.bg/' }
];

const FEED_SOURCES = [
  { name: 'The Hacker News', url: 'https://feeds.feedburner.com/TheHackersNews' },
  { name: 'BleepingComputer', url: 'https://www.bleepingcomputer.com/feed/' },
  { name: 'SecurityWeek', url: 'https://www.securityweek.com/rss.xml' },
  { name: 'CISA Alerts', url: 'https://www.cisa.gov/sites/default/files/rss/feeds/alerts.xml' },
  { name: 'Cisco Talos', url: 'https://blog.talosintelligence.com/feed.xml' },
  { name: 'Dark Reading', url: 'https://www.darkreading.com/rss_simple.asp' },
  { name: 'Kaspersky', url: 'https://www.kaspersky.com/blog/feed/' }
];

let stories = [...FALLBACK_STORIES];
let activeFilter = 'All';
let refreshTimer = null;
let lastRefreshTime = null;

function formatDate() {
  return new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());
}

function formatTime(date) {
  if (!date) return 'Updating…';
  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
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

  const source = item._sourceName || item.source || item.author || 'Live feed';
  const link = item.link || item.guid || item.url || 'https://thehackernews.com/';

  return {
    title,
    category,
    region: detectRegion(title),
    source,
    summary,
    whyItMatters: 'This story matters because it can affect organizations, consumers, and security teams in the coming days.',
    impact: /ransom|breach|leak|attack/i.test(title.toLowerCase()) ? 'High' : 'Medium',
    riskClass: /ransom|breach|leak|attack/i.test(title.toLowerCase()) ? 'risk-high' : 'risk-medium',
    takeaway: 'Security teams should review their monitoring, patching, and communication plans promptly.',
    referenceLink: link
  };
}

async function loadLiveStories() {
  try {
    const results = await Promise.allSettled(
      FEED_SOURCES.map((feed) =>
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`).then((response) => {
          if (!response.ok) throw new Error('Feed request failed');
          return response.json();
        }).then((data) => ({ ...data, _sourceName: feed.name }))
      )
    );

    const sourceGroups = results
      .filter((result) => result.status === 'fulfilled' && result.value?.items?.length)
      .map((result) => ({
        sourceName: result.value._sourceName,
        items: result.value.items.slice(0, 4).map((item) => ({ ...item, _sourceName: result.value._sourceName }))
      }));

    const mergedItems = [];
    let round = 0;

    while (mergedItems.length < 6 && sourceGroups.some((group) => group.items[round])) {
      sourceGroups.forEach((group) => {
        const item = group.items[round];
        if (item && mergedItems.length < 6) mergedItems.push(item);
      });
      round += 1;
    }

    if (mergedItems.length) {
      stories = mergedItems.map(createStoryFromFeed);
      lastRefreshTime = new Date();
    }
  } catch (error) {
    stories = [...FALLBACK_STORIES];
  }
}

function renderHeader() {
  document.getElementById('date-badge').textContent = formatDate();
  document.getElementById('story-count').textContent = stories.length;
  document.getElementById('source-count').textContent = ADVISORY_SOURCES.length;
  document.getElementById('last-refresh').textContent = formatTime(lastRefreshTime);
  document.getElementById('risk-level').textContent = stories.some((story) => story.impact === 'High') ? 'High' : 'Medium';
  document.getElementById('digest-title').textContent = 'Today’s 5-minute summary';
  document.getElementById('digest-summary').textContent =
    `This briefing refreshes hourly across ${ADVISORY_SOURCES.length} trusted advisory sources worldwide.`;
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
          <a class="read-more-link" href="${story.referenceLink}" target="_blank" rel="noopener noreferrer">Read the full report ↗</a>
        </article>
      `
    )
    .join('');
}

function renderSources() {
  const list = document.getElementById('source-list');
  if (!list) return;

  list.innerHTML = ADVISORY_SOURCES.map((source) => `
      <a class="source-pill" href="${source.link}" target="_blank" rel="noopener noreferrer">${source.name}</a>
    `).join('');
}

function scheduleRefresh() {
  if (refreshTimer) clearInterval(refreshTimer);
  refreshTimer = setInterval(async () => {
    await loadLiveStories();
    renderHeader();
    renderFilters();
    renderNews();
    renderSources();
  }, 60 * 60 * 1000);
}

async function init() {
  renderHeader();
  renderFilters();
  renderNews();
  renderSources();
  await loadLiveStories();
  renderHeader();
  renderFilters();
  renderNews();
  renderSources();
  scheduleRefresh();

  document.getElementById('filters').addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;

    activeFilter = button.dataset.filter;
    renderFilters();
    renderNews();
  });
}

document.addEventListener('DOMContentLoaded', init);
