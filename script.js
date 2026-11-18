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
  },
  {
    title: 'Agentic AI tools expand the attack surface for enterprise workflows',
    category: 'Agent & AI Threats',
    region: 'Global',
    source: 'MITRE ATLAS',
    summary: 'Security researchers are examining prompt injection, tool misuse, and sensitive data exposure across autonomous AI agents connected to enterprise systems.',
    whyItMatters: 'AI agents can turn an isolated model flaw into real-world actions across email, repositories, cloud infrastructure, and customer systems.',
    impact: 'High',
    riskClass: 'risk-high',
    takeaway: 'Apply least privilege, human approval gates, and continuous monitoring to AI agent tool access.',
    referenceLink: 'https://atlas.mitre.org/'
  },
  {
    title: 'Identity providers face rising session-token theft campaigns',
    category: 'Identity & Phishing',
    region: 'Global',
    source: 'CISA',
    summary: 'Adversaries are bypassing traditional passwords by stealing authenticated sessions and abusing phishing-resistant identity workflows.',
    whyItMatters: 'Compromised session tokens can grant immediate access without triggering repeated sign-in controls.',
    impact: 'High',
    riskClass: 'risk-high',
    takeaway: 'Prioritize phishing-resistant MFA, short-lived sessions, and anomalous sign-in detection.',
    referenceLink: 'https://www.cisa.gov/topics/identity-and-access-management'
  },
  {
    title: 'Cloud misconfiguration exposes production secrets at scale',
    category: 'Cloud Security',
    region: 'North America',
    source: 'OWASP',
    summary: 'Exposed management interfaces and overly broad service permissions continue to create pathways to cloud workloads and secrets.',
    whyItMatters: 'One configuration weakness can provide attackers with broad lateral movement across applications and data stores.',
    impact: 'Medium',
    riskClass: 'risk-medium',
    takeaway: 'Audit permissions continuously and enforce secrets rotation with infrastructure policy checks.',
    referenceLink: 'https://owasp.org/www-project-cloud-native-application-security-top-10/'
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
let searchQuery = '';
let sortMode = 'featured';
let refreshTimer = null;
let lastRefreshTime = null;
let sourcesExpanded = false;
let savedOnly = false;
let compactMode = false;
let savedStoryIds = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem('cyber-pulse-saved') || '[]');
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    return new Set();
  }
})();
let watchlist = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem('cyber-pulse-watchlist') || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
})();
let priorityProfile = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem('cyber-pulse-priorities') || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
})();

let feedHealth = {
  success: 0,
  failed: 0,
  lastCheck: null
};

let quizState = {
  questions: [],
  index: 0,
  score: 0,
  answered: false,
  topicResults: {},
  missedTopics: []
};

let quizDifficulty = 'hard';

let videoBrief = {
  stories: [],
  index: 0,
  playing: false,
  muted: false,
  timer: null
};

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
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata'
  }).format(date);
}

function formatShortDate(value) {
  if (!value) return 'Latest update';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Latest update';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(date);
}

function detectCategory(title) {
  const text = title.toLowerCase();
  if (/agentic|agent ai|llm|prompt injection|model abuse|ai threat/i.test(text)) return 'Agent & AI Threats';
  if (/ransom|encrypt|malware/i.test(text)) return 'Ransomware';
  if (/breach|leak|exposed|stolen data/i.test(text)) return 'Data Breach';
  if (/phish|social engineer|identity|credential|session/i.test(text)) return 'Identity & Phishing';
  if (/cloud|kubernetes|container|saas/i.test(text)) return 'Cloud Security';
  if (/iot|ot|industrial|scada|critical infrastructure/i.test(text)) return 'OT & Critical Infrastructure';
  if (/policy|regulat|compliance|law|sanction/i.test(text)) return 'Policy';
  if (/supply|dependency|open-source|package|chain/i.test(text)) return 'Supply Chain';
  if (/nation state|espionage|apt|cyberwar|geopolit/i.test(text)) return 'Nation-State';
  if (/attack|exploit|vulnerab|zero-day|patch/i.test(text)) return 'Vulnerability';
  return 'Threat Intelligence';
}

function detectRegion(title) {
  const text = title.toLowerCase();
  if (/europe|eu|uk|germany|france|italy/i.test(text)) return 'Europe';
  if (/north america|us|usa|canada|america/i.test(text)) return 'North America';
  if (/asia|india|japan|korea|china|singapore/i.test(text)) return 'Asia Pacific';
  return 'Global';
}

function calculatePriorityScore(story) {
  let score = story.impact === 'High' ? 75 : story.impact === 'Medium' ? 55 : 35;
  const text = `${story.title} ${story.summary}`.toLowerCase();
  if (/zero-day|actively exploited|critical|ransomware|breach/i.test(text)) score += 12;
  if (/patch now|emergency|known exploited/i.test(text)) score += 8;
  if (cveMatches(text).length) score += 5;
  if (priorityProfile.includes(story.category)) score += 10;
  return Math.min(score, 100);
}

function getWatchlistMatches(story) {
  if (!watchlist.length) return [];
  const text = `${story.title} ${story.summary} ${story.category} ${story.source}`.toLowerCase();
  return watchlist.filter((keyword) => text.includes(keyword.toLowerCase()));
}

function getConfidenceLabel(story) {
  const text = `${story.title} ${story.summary}`.toLowerCase();
  if (/confirmed|patched|advisory|cve/i.test(text)) return 'High confidence';
  if (/reportedly|researcher|investigating/i.test(text)) return 'Developing';
  return 'Corroborate';
}

function createStoryFromFeed(item, index) {
  const title = item.title || `Cybersecurity update ${index + 1}`;
  const category = detectCategory(title);
  const summary = item.description ? item.description.replace(/<[^>]+>/g, '').trim().slice(0, 220) : `A new development in ${category.toLowerCase()} security is drawing attention from defenders worldwide.`;
  const source = item._sourceName || item.source || item.author || 'Live feed';
  const link = item.link || item.guid || item.url || 'https://thehackernews.com/';
  const story = {
    title,
    category,
    region: detectRegion(title),
    source,
    summary,
    whyItMatters: 'This story matters because it can affect organizations, consumers, and security teams in the coming days.',
    impact: /ransom|breach|leak|actively exploited|zero-day|critical/i.test(title.toLowerCase()) ? 'High' : 'Medium',
    riskClass: /ransom|breach|leak|actively exploited|zero-day|critical/i.test(title.toLowerCase()) ? 'risk-high' : 'risk-medium',
    takeaway: 'Security teams should review their monitoring, patching, and communication plans promptly.',
    referenceLink: link,
    publishedAt: item.pubDate || item.publishedAt || item.date || null,
    provenance: 'Live RSS',
    cves: cveMatches(`${title} ${summary}`)
  };
  story.priorityScore = calculatePriorityScore(story);
  story.confidence = getConfidenceLabel(story);
  return story;
}

function readCachedStories() {
  try {
    const cached = JSON.parse(localStorage.getItem('cyber-pulse-live-stories' ) || 'null');
    if (Array.isArray(cached) && cached.length) return cached;
  } catch {
    // Ignore malformed local cache and use curated fallback stories.
  }
  return null;
}

function cacheLiveStories(nextStories) {
  try {
    localStorage.setItem('cyber-pulse-live-stories', JSON.stringify(nextStories));
  } catch {
    // Storage may be unavailable in private or restricted browsers.
  }
}

async function loadLiveStories() {
  document.getElementById('last-refresh').textContent = 'Updating…';

  try {
    const results = await Promise.allSettled(
      FEED_SOURCES.map(async (feed) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        try {
          const response = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`,
            { signal: controller.signal }
          );
          if (!response.ok) throw new Error('Feed request failed');
          const data = await response.json();
          return { ...data, _sourceName: feed.name };
        } finally {
          clearTimeout(timeout);
        }
      })
    );

    const sourceGroups = results
      .filter((result) => result.status === 'fulfilled' && result.value?.items?.length)
      .map((result) => ({
        sourceName: result.value._sourceName,
        items: result.value.items.slice(0, 4).map((item) => ({ ...item, _sourceName: result.value._sourceName }))
      }));

    const mergedItems = [];
    let round = 0;
    while (mergedItems.length < 12 && sourceGroups.some((group) => group.items[round])) {
      for (const group of sourceGroups) {
        const item = group.items[round];
        if (item && mergedItems.length < 12) mergedItems.push(item);
      }
      round += 1;
    }

    const uniqueItems = [];
    const seenTitles = new Set();
    for (const item of mergedItems) {
      const normalizedTitle = (item.title || '').trim().toLowerCase();
      if (normalizedTitle && !seenTitles.has(normalizedTitle)) {
        seenTitles.add(normalizedTitle);
        uniqueItems.push(item);
      }
      if (uniqueItems.length === 6) break;
    }

    feedHealth.success = results.filter((result) => result.status === 'fulfilled').length;
    feedHealth.failed = results.length - feedHealth.success;
    feedHealth.lastCheck = new Date();

    if (uniqueItems.length) {
      stories = uniqueItems.map(createStoryFromFeed);
      cacheLiveStories(stories);
      lastRefreshTime = new Date();
      document.getElementById('last-refresh').textContent = `${formatTime(lastRefreshTime)} IST • ${feedHealth.success}/${results.length} sources live`;
    } else {
      const cachedStories = readCachedStories();
      if (cachedStories?.length) stories = cachedStories;
      document.getElementById('last-refresh').textContent = cachedStories?.length ? 'Fallback • Last known good' : 'Fallback briefing';
    }
  } catch (error) {
    const cachedStories = readCachedStories();
    stories = cachedStories && cachedStories.length ? cachedStories : [...FALLBACK_STORIES];
    lastRefreshTime = new Date();
    document.getElementById('last-refresh').textContent = cachedStories?.length ? 'Fallback • Last known good' : 'Fallback briefing';
  }
}

function renderHeader() {
  document.getElementById('date-badge').textContent = formatDate();
  document.getElementById('story-count').textContent = stories.length;
  document.getElementById('source-count').textContent = ADVISORY_SOURCES.length;
  document.getElementById('last-refresh').textContent = formatTime(lastRefreshTime) + ' IST';
  const highImpactCount = stories.filter((story) => story.impact === 'High').length;
  const highImpact = document.getElementById('high-impact-count');
  if (highImpact) highImpact.textContent = highImpactCount;
  const urgentStory = stories.find((story) => story.impact === 'High') || stories[0];
  if (urgentStory) {
    document.getElementById('urgent-title').textContent = urgentStory.title;
  }
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
      return `<button class="filter-chip ${isActive ? 'active' : ''}" data-filter="${escapeHtml(filter)}" aria-pressed="${isActive}">${escapeHtml(filter)}</button>`;
    })
    .join('');
}

function getVisibleStories() {
  let visible = activeFilter === 'All'
    ? [...stories]
    : stories.filter((story) => story.category === activeFilter);

  if (searchQuery) {
    visible = visible.filter((story) =>
      `${story.title} ${story.summary} ${story.category} ${story.region} ${story.source}`
        .toLowerCase()
        .includes(searchQuery)
    );
  }

  if (savedOnly) {
    visible = visible.filter((story) => savedStoryIds.has(getStoryId(story)));
  }

  if (sortMode === 'high-risk') {
    const rank = { High: 0, Medium: 1, Low: 2 };
    visible.sort((a, b) => (rank[a.impact] ?? 3) - (rank[b.impact] ?? 3));
  } else if (sortMode === 'title') {
    visible.sort((a, b) => a.title.localeCompare(b.title));
  }

  return visible;
}

function getBriefingStories() {
  if (typeof getVisibleStories === 'function') {
    const visible = getVisibleStories();
    if (visible.length) return visible.slice(0, 6);
  }
  return stories.length ? stories.slice(0, 6) : [...FALLBACK_STORIES].slice(0, 6);
}

function syncVideoBriefing() {
  const previousStory = videoBrief.stories[videoBrief.index];
  videoBrief.stories = getBriefingStories();
  const previousIndex = previousStory
    ? videoBrief.stories.findIndex((story) => getStoryId(story) === getStoryId(previousStory))
    : -1;
  videoBrief.index = previousIndex >= 0 ? previousIndex : 0;
  renderVideoSlide();
  if (videoBrief.playing) scheduleVideoAdvance();
}

function renderNews() {
  const list = document.getElementById('news-list');
  const visibleStories = getVisibleStories();
  const resultCount = document.getElementById('result-count');
  if (resultCount) {
    resultCount.textContent = `${visibleStories.length} ${visibleStories.length === 1 ? 'story' : 'stories'} shown`;
  }

  if (!visibleStories.length) {
    list.innerHTML = '<article class="news-card"><h3>No stories match this filter yet.</h3></article>';
    return;
  }

  list.innerHTML = visibleStories
    .map((story) => {
      const storyId = getStoryId(story);
      const isSaved = savedStoryIds.has(storyId);
      const cves = [...new Set(story.cves?.length ? story.cves : cveMatches(`${story.title} ${story.summary}`))];
      const priority = story.impact === 'High' ? 'Immediate action' : story.impact === 'Medium' ? 'Scheduled review' : 'Monitor';
      const watchlistMatches = getWatchlistMatches(story);
      const confidenceLabel = story.confidence || getConfidenceLabel(story);
      const score = story.priorityScore ?? calculatePriorityScore(story);
      return `
        <article class="news-card" data-story-id="${escapeHtml(storyId)}">
          <div class="news-top">
            <div class="news-meta">
              <span class="category-pill">${escapeHtml(story.category)}</span>
              <span class="source">${escapeHtml(story.region)} • ${escapeHtml(story.source)}</span>
              ${cves.length ? `<span class="cve-pill">${escapeHtml(cves.slice(0, 2).join(', '))}</span>` : ''}
              ${watchlistMatches.length ? `<span class="watchlist-hit">Watchlist: ${escapeHtml(watchlistMatches.slice(0, 2).join(', '))}</span>` : ''}
            </div>
            <div class="card-actions">
              <span class="priority-label ${story.riskClass}">${priority}</span>
              <span class="score-pill">Score ${score}</span>
              <button class="save-story" type="button" data-save-id="${escapeHtml(storyId)}" aria-pressed="${isSaved}">${isSaved ? 'Saved' : 'Save'}</button>
            </div>
          </div>
          <h3>${escapeHtml(story.title)}</h3>
          <div class="provenance-row">
            <span>${escapeHtml(story.provenance || 'Editorial briefing')}</span>
            <span>${escapeHtml(confidenceLabel)}</span>
            <time>${escapeHtml(formatShortDate(story.publishedAt))}</time>
          </div>
          <p class="summary-text">${escapeHtml(story.summary)}</p>
          <div class="story-grid">
            <div class="story-box">
              <strong>Why it matters</strong>
              <span>${escapeHtml(story.whyItMatters)}</span>
            </div>
            <div class="story-box">
              <strong>Recommended action</strong>
              <span>${escapeHtml(story.takeaway)}</span>
            </div>
          </div>
          <div class="metadata-row">
            <div class="metadata-item">
              <strong>Published</strong>
              <span>${formatShortDate(story.publishedAt || story.pubDate)}</span>
            </div>
            <div class="metadata-item">
              <strong>Confidence</strong>
              <span class="confidence-label">${escapeHtml(confidenceLabel)}</span>
            </div>
            <div class="metadata-item">
              <strong>Watchlist matches</strong>
              <span class="watchlist-matches">${escapeHtml(watchlistMatches.join(', ') || 'None')}</span>
            </div>
            <div class="metadata-item">
              <strong>Score</strong>
              <span class="score-badge" style="background-position: ${100 - score}% 50%;">${score}</span>
            </div>
          </div>
          <a class="read-more-link" href="${safeLink(story.referenceLink)}" target="_blank" rel="noopener noreferrer">Open primary source ↗</a>
        </article>
      `;
    })
    .join('');
}

function renderCharts() {
  const categoryCounts = stories.reduce((counts, story) => {
    counts[story.category] = (counts[story.category] || 0) + 1;
    return counts;
  }, {});

  const sortedCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const maxCount = Math.max(...sortedCategories.map(([, count]) => count), 1);
  document.getElementById('category-chart').innerHTML = sortedCategories.map(([category, count]) => `
    <div class="chart-row">
      <span class="chart-label">${escapeHtml(category)}</span>
      <div class="chart-track"><span style="width:${Math.max(12, (count / maxCount) * 100)}%"></span></div>
      <strong>${count}</strong>
    </div>
  `).join('');

  const regionCounts = stories.reduce((counts, story) => {
    counts[story.region] = (counts[story.region] || 0) + 1;
    return counts;
  }, {});
  const regionEntries = Object.entries(regionCounts).slice(0, 5);
  const total = regionEntries.reduce((sum, [, count]) => sum + count, 0);
  const colors = ['#38bdf8', '#818cf8', '#34d399', '#f59e0b', '#fb7185'];
  let cursor = 0;
  const stops = regionEntries.map(([, count], index) => {
    const start = cursor;
    cursor += (count / total) * 100;
    return `${colors[index]} ${start}% ${cursor}%`;
  });

  const donut = document.getElementById('region-chart');
  donut.style.setProperty('--donut', stops.length ? `conic-gradient(${stops.join(', ')})` : 'conic-gradient(#334155 0 100%)');
  document.getElementById('region-total').textContent = String(total);
  document.getElementById('region-legend').innerHTML = regionEntries.map(([region, count], index) => `
    <span><i style="background:${colors[index]}"></i>${escapeHtml(region)} <b>${count}</b></span>
  `).join('');
}

function renderSources() {
  const list = document.getElementById('source-list');
  if (!list) return;

  list.innerHTML = ADVISORY_SOURCES.map((source) => `
      <a class="source-pill" href="${safeLink(source.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.name)}</a>
    `).join('');
  list.classList.toggle('collapsed', !sourcesExpanded);
  list.setAttribute('aria-expanded', String(sourcesExpanded));
  const toggle = document.getElementById('toggle-sources');
  if (toggle) {
    toggle.textContent = sourcesExpanded ? 'Show less trusted publishers' : 'Show all trusted publishers';
    toggle.setAttribute('aria-expanded', String(sourcesExpanded));
  }
}

function renderAdvisoryTimeline() {
  const timeline = document.getElementById('advisory-timeline');
  if (!timeline) return;

  const ranked = [...stories]
    .sort((a, b) => (calculatePriorityScore(b) - calculatePriorityScore(a)))
    .slice(0, 5);

  timeline.innerHTML = ranked.map((story) => {
    const score = calculatePriorityScore(story);
    return `
      <div class="timeline-item">
        <span class="timeline-node ${story.riskClass}"></span>
        <div>
          <time>${escapeHtml(formatShortDate(story.publishedAt))}</time>
          <strong>${escapeHtml(story.title)}</strong>
          <span>${escapeHtml(story.source)} • Score ${score}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderWatchlist() {
  const tags = document.getElementById('watchlist-tags');
  const matches = document.getElementById('watchlist-matches');
  const count = document.getElementById('watchlist-count');
  if (!tags || !matches || !count) return;

  tags.innerHTML = watchlist.map((keyword) => `
    <button class="watchlist-tag" type="button" data-remove-watchlist="${escapeHtml(keyword)}" aria-label="Remove ${escapeHtml(keyword)}">
      ${escapeHtml(keyword)} <span aria-hidden="true">×</span>
    </button>
  `).join('');

  const matchingStories = stories.filter((story) => getWatchlistMatches(story).length);
  count.textContent = `${matchingStories.length} ${matchingStories.length === 1 ? 'match' : 'matches'}`;
  matches.innerHTML = matchingStories.slice(0, 4).map((story) => `
    <a href="${safeLink(story.referenceLink)}" target="_blank" rel="noopener noreferrer">
      <span>${escapeHtml(story.category)}</span>
      <strong>${escapeHtml(story.title)}</strong>
    </a>
  `).join('') || '<p class="empty-watchlist">Add a vendor, CVE, sector, or technology keyword.</p>';
}

function toggleSources() {
  sourcesExpanded = !sourcesExpanded;
  renderSources();
}

function scheduleRefresh() {
  if (refreshTimer) clearInterval(refreshTimer);
  refreshTimer = setInterval(async () => {
    await loadLiveStories();
    renderHeader();
    renderFilters();
    renderNews();
    renderSources();
    renderCharts();
    renderAdvisoryTimeline();
    renderWatchlist();
    syncVideoBriefing();
  }, 60 * 60 * 1000);
}

async function init() {
  renderHeader();
  renderFilters();
  renderNews();
  renderSources();
  renderCharts();
  renderAdvisoryTimeline();
  renderWatchlist();
  videoBrief.stories = getBriefingStories();
  renderVideoSlide();
  await loadLiveStories();
  renderHeader();
  renderFilters();
  renderNews();
  renderSources();
  renderCharts();
  syncVideoBriefing();
  scheduleRefresh();

  document.getElementById('filters').addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;

    activeFilter = button.dataset.filter;
    renderFilters();
    renderNews();
    syncVideoBriefing();
  });

  const search = document.getElementById('story-search');
  if (search) {
    search.addEventListener('input', (event) => {
      searchQuery = event.target.value.trim().toLowerCase();
      renderNews();
      syncVideoBriefing();
    });
  }

  const sort = document.getElementById('story-sort');
  if (sort) {
    sort.addEventListener('change', (event) => {
      sortMode = event.target.value;
      renderNews();
      syncVideoBriefing();
    });
  }

  const savedToggle = document.getElementById('saved-toggle');
  if (savedToggle) {
    savedToggle.addEventListener('click', () => {
      savedOnly = !savedOnly;
      savedToggle.setAttribute('aria-pressed', String(savedOnly));
      savedToggle.classList.toggle('active', savedOnly);
      renderNews();
      syncVideoBriefing();
    });
  }

  const compactToggle = document.getElementById('compact-toggle');
  if (compactToggle) {
    compactToggle.addEventListener('click', () => {
      compactMode = !compactMode;
      compactToggle.setAttribute('aria-pressed', String(compactMode));
      compactToggle.classList.toggle('active', compactMode);
      document.getElementById('news-list').classList.toggle('compact-view', compactMode);
    });
  }

  document.getElementById('print-brief')?.addEventListener('click', () => window.print());

  document.getElementById('urgent-jump')?.addEventListener('click', () => {
    document.getElementById('briefing').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.getElementById('news-list').addEventListener('click', (event) => {
    const saveButton = event.target.closest('[data-save-id]');
    if (!saveButton) return;

    const storyId = saveButton.dataset.saveId;
    if (savedStoryIds.has(storyId)) savedStoryIds.delete(storyId);
    else savedStoryIds.add(storyId);

    localStorage.setItem('cyber-pulse-saved', JSON.stringify([...savedStoryIds]));
    document.getElementById('saved-count').textContent = String(savedStoryIds.size);
    renderNews();
  });

  document.getElementById('saved-count').textContent = String(savedStoryIds.size);

  const toggle = document.getElementById('toggle-sources');
  if (toggle) {
    toggle.addEventListener('click', toggleSources);
  }

  const watchlistInput = document.getElementById('watchlist-input');
  const addWatchlist = () => {
    const keyword = watchlistInput?.value.trim();
    if (!keyword) return;
    const normalized = keyword.toLowerCase();
    if (!watchlist.some((item) => item.toLowerCase() === normalized)) {
      watchlist.push(keyword);
      localStorage.setItem('cyber-pulse-watchlist', JSON.stringify(watchlist));
      watchlistInput.value = '';
      renderWatchlist();
      renderNews();
    }
  };
  document.getElementById('watchlist-add')?.addEventListener('click', addWatchlist);
  watchlistInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') addWatchlist();
  });
  document.getElementById('watchlist-tags')?.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-remove-watchlist]');
    if (!removeButton) return;
    watchlist = watchlist.filter((item) => item !== removeButton.dataset.removeWatchlist);
    localStorage.setItem('cyber-pulse-watchlist', JSON.stringify(watchlist));
    renderWatchlist();
    renderNews();
  });

  const priorityOptions = document.getElementById('priority-options');
  priorityOptions?.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = priorityProfile.includes(checkbox.value);
  });
  priorityOptions?.addEventListener('change', () => {
    priorityProfile = [...priorityOptions.querySelectorAll('input:checked')].map((input) => input.value);
    localStorage.setItem('cyber-pulse-priorities', JSON.stringify(priorityProfile));
    renderHeader();
    renderFilters();
    renderNews();
    renderAdvisoryTimeline();
  });

  document.getElementById('copy-brief')?.addEventListener('click', async (event) => {
    const topStories = [...stories]
      .sort((a, b) => calculatePriorityScore(b) - calculatePriorityScore(a))
      .slice(0, 5);
    const brief = `Cyber Pulse Daily — ${formatDate()}\n\n${topStories.map((story, index) => `${index + 1}. ${story.title} — ${story.impact} impact (${story.source})`).join('\n')}`;
    try {
      await navigator.clipboard.writeText(brief);
      event.target.textContent = 'Brief copied';
      setTimeout(() => { event.target.textContent = 'Copy executive brief'; }, 1800);
    } catch {
      event.target.textContent = 'Copy unavailable';
    }
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  const manualRefresh = document.getElementById('manual-refresh');
  if (manualRefresh) {
    manualRefresh.addEventListener('click', async () => {
      manualRefresh.disabled = true;
      manualRefresh.textContent = 'Refreshing…';
      await loadLiveStories();
      renderHeader();
      renderFilters();
      renderNews();
      renderSources();
      renderCharts();
      renderAdvisoryTimeline();
      renderWatchlist();
      manualRefresh.disabled = false;
      manualRefresh.textContent = 'Refresh now';
    });
  }

  document.getElementById('start-quiz')?.addEventListener('click', startQuiz);
  document.getElementById('restart-quiz')?.addEventListener('click', startQuiz);

  document.getElementById('quiz-options')?.addEventListener('click', (event) => {
    const option = event.target.closest('[data-answer]');
    if (!option || quizState.answered) return;

    quizState.answered = true;
    const question = quizState.questions[quizState.index];
    const selected = option.dataset.answer;
    const correct = selected === question.answer;
    const topicResult = quizState.topicResults[question.topic] || { correct: 0, total: 0 };
    topicResult.total += 1;
    if (correct) {
      quizState.score += 1;
      topicResult.correct += 1;
    }
    quizState.topicResults[question.topic] = topicResult;

    document.querySelectorAll('.quiz-option').forEach((button) => {
      button.disabled = true;
      if (button.dataset.answer === question.answer) button.classList.add('correct');
      if (button === option && !correct) button.classList.add('incorrect');
    });

    const feedback = document.getElementById('quiz-feedback');
    feedback.className = `quiz-feedback ${correct ? 'success' : 'error'}`;
    feedback.innerHTML = `<strong>${correct ? 'Correct' : 'Review this point'}</strong><span>${escapeHtml(correct ? 'Your understanding matches the briefing.' : `The better answer is: ${question.answer}`)}</span>`;
    document.getElementById('quiz-explanation').hidden = false;
    document.getElementById('next-question').disabled = false;
  });

  document.getElementById('quiz-explanation')?.addEventListener('click', () => {
    const question = quizState.questions[quizState.index];
    const feedback = document.getElementById('quiz-feedback');
    feedback.innerHTML += `<span class="answer-explanation"><b>Explanation:</b> ${escapeHtml(question.explanation)}</span>`;
  });

  document.getElementById('next-question')?.addEventListener('click', () => {
    if (!quizState.answered) return;
    quizState.index += 1;
    if (quizState.index >= quizState.questions.length) finishQuiz();
    else renderQuizQuestion();
  });

  document.getElementById('review-misses')?.addEventListener('click', () => {
    if (!quizState.missedTopics.length) {
      activeFilter = 'All';
    } else {
      activeFilter = quizState.missedTopics[0];
    }
    renderFilters();
    renderNews();
    document.getElementById('briefing').scrollIntoView({ behavior: 'smooth' });
  });

  updateQuizStartStats();

  document.getElementById('video-play')?.addEventListener('click', () => {
    if (videoBrief.playing) {
      stopVideoBrief();
    } else {
      if (!videoBrief.stories.length) videoBrief.stories = getBriefingStories();
      if (videoBrief.index >= videoBrief.stories.length) videoBrief.index = 0;
      startVideoBrief();
    }
  });

  document.getElementById('video-mute')?.addEventListener('click', (event) => {
    videoBrief.muted = !videoBrief.muted;
    event.currentTarget.setAttribute('aria-pressed', String(videoBrief.muted));
    event.currentTarget.textContent = videoBrief.muted ? '🔇' : '🔊';
    if (videoBrief.muted) stopNarration();
    else if (videoBrief.playing) renderVideoSlide();
  });

  document.getElementById('video-prev')?.addEventListener('click', () => {
    videoBrief.index = Math.max(0, videoBrief.index - 1);
    renderVideoSlide();
  });

  document.getElementById('video-next')?.addEventListener('click', () => {
    nextVideoSlide(false);
  });

  const difficultySelect = document.getElementById('quiz-difficulty');
  if (difficultySelect) {
    difficultySelect.value = quizDifficulty;
    difficultySelect.addEventListener('change', (event) => {
      quizDifficulty = event.target.value;
      localStorage.setItem('cyber-pulse-quiz-difficulty', quizDifficulty);
    });
  }
}

document.addEventListener('DOMContentLoaded', init);

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function safeLink(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : 'https://thehackernews.com/';
  } catch {
    return 'https://thehackernews.com/';
  }
}

function getStoryId(story) {
  return `${story.title}|${story.source}`;
}

function cveMatches(value) {
  return String(value || '').match(/CVE-\d{4}-\d{4,7}/gi) || [];
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  if (!question) {
    finishQuiz();
    return;
  }
  quizState.answered = false;
  document.getElementById('quiz-topic').textContent = question.topic;
  document.getElementById('quiz-counter').textContent = `Question ${quizState.index + 1} of ${quizState.questions.length}`;
  document.getElementById('quiz-question').textContent = question.prompt;
  document.getElementById('quiz-progress-label').textContent = `${quizState.index + 1} / ${quizState.questions.length}`;
  document.getElementById('quiz-progress-bar').style.width = `${((quizState.index + 1) / quizState.questions.length) * 100}%`;
  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('quiz-feedback').className = 'quiz-feedback';
  document.getElementById('quiz-explanation').hidden = true;
  document.getElementById('next-question').disabled = true;
  document.getElementById('next-question').textContent = quizState.index === quizState.questions.length - 1 ? 'View results' : 'Next question';
  document.getElementById('quiz-options').innerHTML = question.options.map((option, index) => `
    <button class="quiz-option" type="button" data-answer="${escapeHtml(option)}">
      <span>${String.fromCharCode(65 + index)}</span>
      <strong>${escapeHtml(option)}</strong>
    </button>
  `).join('');
}

function startQuiz() {
  const sourceStories = getVisibleStories();
  quizState = {
    questions: buildQuizQuestions(sourceStories),
    index: 0,
    score: 0,
    answered: false,
    topicResults: {},
    missedTopics: []
  };
  document.getElementById('quiz-start').hidden = true;
  document.getElementById('quiz-results').hidden = true;
  document.getElementById('quiz-content').hidden = false;
  renderQuizQuestion();
}

function readQuizProgress() {
  try {
    const progress = JSON.parse(localStorage.getItem('cyber-pulse-quiz') || '{}');
    return {
      bestScore: Number(progress.bestScore) || 0,
      sessions: Number(progress.sessions) || 0,
      topicAccuracy: progress.topicAccuracy || {}
    };
  } catch {
    return { bestScore: 0, sessions: 0, topicAccuracy: {} };
  }
}

function saveQuizProgress(progress) {
  try {
    localStorage.setItem('cyber-pulse-quiz', JSON.stringify(progress));
  } catch {
    // Progress persistence is optional in restricted browsers.
  }
}

function finishQuiz() {
  const total = quizState.questions.length;
  const percent = total ? Math.round((quizState.score / total) * 100) : 0;
  const progress = readQuizProgress();
  progress.sessions += 1;
  progress.bestScore = Math.max(progress.bestScore, percent);
  Object.entries(quizState.topicResults).forEach(([topic, result]) => {
    const previous = progress.topicAccuracy[topic] || { correct: 0, total: 0 };
    progress.topicAccuracy[topic] = { correct: previous.correct + result.correct, total: previous.total + result.total };
  });
  saveQuizProgress(progress);
  document.getElementById('quiz-content').hidden = true;
  document.getElementById('quiz-results').hidden = false;
  document.getElementById('quiz-score').textContent = `${percent}%`;
  document.getElementById('quiz-progress-label').textContent = 'Complete';
  document.getElementById('quiz-progress-bar').style.width = '100%';
  document.getElementById('quiz-score-ring').style.setProperty('--score', `${percent * 3.6}deg`);
  document.getElementById('quiz-result-title').textContent = percent >= 80 ? 'Strong understanding' : percent >= 60 ? 'Good foundation — review the gaps' : 'A review pass will help';
  quizState.missedTopics = Object.entries(quizState.topicResults).filter(([, result]) => result.correct / result.total < 0.7).map(([topic]) => topic);
  document.getElementById('quiz-review-summary').textContent = quizState.missedTopics.length ? `Recommended review: ${quizState.missedTopics.join(', ')}.` : 'You answered confidently across the topics covered.';
  document.getElementById('quiz-topic-results').innerHTML = Object.entries(quizState.topicResults).map(([topic, result]) => `<div><span>${escapeHtml(topic)}</span><strong>${result.correct}/${result.total}</strong></div>`).join('');
  updateQuizStartStats();
}

function updateQuizStartStats() {
  const progress = readQuizProgress();
  document.getElementById('quiz-best-score').textContent = progress.sessions ? `${progress.bestScore}%` : '—';
  document.getElementById('quiz-sessions').textContent = String(progress.sessions);
  const weakest = Object.entries(progress.topicAccuracy).map(([topic, result]) => ({ topic, accuracy: result.total ? result.correct / result.total : 0 })).sort((a, b) => a.accuracy - b.accuracy)[0];
  document.getElementById('quiz-topic-focus').textContent = weakest ? weakest.topic : 'All topics';
}

function shuffled(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function buildQuizQuestions(sourceStories) {
  const pool = sourceStories.length ? sourceStories : FALLBACK_STORIES;
  const shuffledPool = shuffled(pool).slice(0, 5);

  if (quizDifficulty === 'expert') {
    return shuffledPool.map(buildExpertQuestion);
  }

  if (quizDifficulty === 'hard') {
    return shuffledPool.map((story) => Math.random() > 0.45 ? buildHardQuestion(story) : buildReadingTrapQuestion(story));
  }

  const questions = [];
  shuffledPool.forEach((story) => {
    const category = story.category || 'Threat Intelligence';
    const correctAction = story.takeaway || 'Apply monitoring, containment, and recovery procedures.';
    questions.push({
      topic: category,
      sourceTitle: story.title,
      prompt: `Based on “${story.title}”, what is the most appropriate priority?`,
      options: shuffled([
        `${story.impact || 'Medium'} impact: ${story.impact === 'High' ? 'take immediate action' : 'schedule a prompt review'}`,
        'Ignore it until another source confirms the story',
        'Treat it as unrelated to cybersecurity operations',
        'Only review it during the next annual audit'
      ]),
      answer: `${story.impact || 'Medium'} impact: ${story.impact === 'High' ? 'take immediate action' : 'schedule a prompt review'}`,
      explanation: `The story is assessed as ${story.impact || 'Medium'} impact because ${story.whyItMatters || 'it may affect security operations and users.'}`
    });
  });
  return questions;
}

function buildReadingTrapQuestion(story) {
  const options = [
    story.summary,
    'The story only confirms that every organization mentioned was compromised.',
    'The story proves that the issue is harmless and requires no monitoring.',
    'The article reports a new general-productivity feature rather than a security event.'
  ];
  return {
    topic: story.category || 'Threat Intelligence',
    sourceTitle: story.title,
    prompt: `Which statement is supported by “${story.title}”?`,
    options: shuffled(options),
    answer: story.summary,
    explanation: `Supported evidence: ${story.summary}`
  };
}

function buildHardQuestion(story) {
  const category = story.category || 'Threat Intelligence';
  const isHigh = story.impact === 'High';
  return {
    topic: category,
    sourceTitle: story.title,
    prompt: `A defender sees: “${story.title}” Which response most accurately balances urgency and evidence?`,
    options: shuffled([
      isHigh
        ? 'Immediately contain exposed assets, verify telemetry, notify the response lead, and apply the primary-source remediation while continuing impact assessment.'
        : 'Validate exposure against asset inventory, prioritize a focused patch or control review, and raise urgency only if evidence expands.',
      'Wait for a second unrelated incident before taking any protective action.',
      'Disable all endpoint monitoring to avoid false positives.',
      'Assume the headline proves a compromise and wipe every affected system without preserving evidence.'
    ]),
    answer: isHigh
      ? 'Immediately contain exposed assets, verify telemetry, notify the response lead, and apply the primary-source remediation while continuing impact assessment.'
      : 'Validate exposure against asset inventory, prioritize a focused patch or control review, and raise urgency only if evidence expands.',
    explanation: `High-confidence response requires proportional action: ${story.takeaway || 'review monitoring and remediation plans.'} Evidence should guide containment scope.`
  };
}

function buildExpertQuestion(story) {
  const category = story.category || 'Threat Intelligence';
  const cves = cveMatches(`${story.title} ${story.summary}`);
  return {
    topic: category,
    sourceTitle: story.title,
    prompt: `Which next step is the strongest before assigning enterprise-wide emergency status to “${story.title}”?`,
    options: shuffled([
      `Correlate the primary advisory, affected versions or assets, exploitation evidence, and ${cves.length ? cves.join(', ') : 'available indicators'} before defining scope and urgency.`,
      'Emergency status should be assigned solely from headline severity.',
      'No validation is needed if the story appears on multiple websites.',
      'The incident owner should first collect employee passwords for comparison.'
    ]),
    answer: `Correlate the primary advisory, affected versions or assets, exploitation evidence, and ${cves.length ? cves.join(', ') : 'available indicators'} before defining scope and urgency.`,
    explanation: 'A defensible security decision combines primary-source verification, asset applicability, exploit status, and evidence preservation before escalation.'
  };
}

function stopNarration() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function speakBriefing(text) {
  if (videoBrief.muted || !('speechSynthesis' in window)) return;
  stopNarration();
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find((voice) => /en-(US|GB|IN)/i.test(voice.lang)) || voices[0];
  if (preferred) utterance.voice = preferred;
  utterance.rate = 0.92;
  utterance.onend = () => {
    if (!videoBrief.playing) return;
    if (videoBrief.timer) clearTimeout(videoBrief.timer);
    videoBrief.timer = setTimeout(() => nextVideoSlide(true), 700);
  };
  window.speechSynthesis.speak(utterance);
}

function renderVideoSlide() {
  const storiesToShow = videoBrief.stories;
  if (!storiesToShow.length) {
    document.getElementById('video-story-title').textContent = 'No stories are available yet';
    document.getElementById('video-caption').textContent = 'Refresh the briefing or change filters to generate a new video brief.';
    return;
  }
  videoBrief.index = Math.max(0, Math.min(videoBrief.index, storiesToShow.length - 1));
  const story = storiesToShow[videoBrief.index];
  const stage = document.getElementById('video-stage');
  stage.classList.remove('slide-enter');
  void stage.offsetWidth;
  stage.classList.add('slide-enter');
  document.getElementById('video-number').textContent = `Story ${videoBrief.index + 1} of ${storiesToShow.length}`;
  document.getElementById('video-category').textContent = story.category;
  document.getElementById('video-story-title').textContent = story.title;
  document.getElementById('video-caption').textContent = story.summary;
  document.getElementById('video-action').innerHTML = `<strong>Recommended action</strong><span>${escapeHtml(story.takeaway)}</span>`;
  document.getElementById('video-slide-counter').textContent = `${videoBrief.index + 1} / ${storiesToShow.length}`;
  document.getElementById('video-progress').style.width = `${((videoBrief.index + 1) / storiesToShow.length) * 100}%`;
  if (videoBrief.playing) speakBriefing(`${story.category}. ${story.title}. ${story.summary}. Recommended action: ${story.takeaway}`);
}

function stopVideoBrief() {
  videoBrief.playing = false;
  if (videoBrief.timer) clearTimeout(videoBrief.timer);
  stopNarration();
  document.getElementById('video-stage')?.classList.remove('is-playing');
  document.getElementById('video-play').textContent = '▶ Play briefing';
}

function scheduleVideoAdvance() {
  if (videoBrief.timer) clearTimeout(videoBrief.timer);
  if (!videoBrief.playing) return;
  videoBrief.timer = setTimeout(() => nextVideoSlide(true), 16000);
}

function nextVideoSlide(autoAdvance = false) {
  if (videoBrief.index < videoBrief.stories.length - 1) {
    videoBrief.index += 1;
    renderVideoSlide();
  } else if (videoBrief.playing) {
    stopVideoBrief();
    document.getElementById('video-play').textContent = '↻ Replay briefing';
  }
  if (videoBrief.playing && !autoAdvance) scheduleVideoAdvance();
}

function startVideoBrief() {
  videoBrief.stories = getBriefingStories();
  if (!videoBrief.stories.length) return;
  if (!videoBrief.playing) videoBrief.playing = true;
  else {
    stopVideoBrief();
    return;
  }
  if (videoBrief.index >= videoBrief.stories.length) videoBrief.index = 0;
  renderVideoSlide();
  document.getElementById('video-stage')?.classList.add('is-playing');
  document.getElementById('video-play').textContent = 'Ⅱ Pause briefing';
  scheduleVideoAdvance();
}
