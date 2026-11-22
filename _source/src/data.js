// Dane wyciągnięte 1:1 ze starego portfolio (dexsterr.github.io, src/pages + i18n). Nic nie dopisane od siebie.
export const LINKS = {
  github: 'https://github.com/dexsterr',
  linkedin: 'https://www.linkedin.com/in/oskar-chudoba-474849340/',
  thm: 'https://tryhackme.com/p/0dexster',
  mail: 'oskarchudoba@gmail.com',
};

export const UI = {
  pl: {
    nav: ['Start', 'Profil', 'Doświadczenie', 'Projekty', 'Certyfikaty', 'Kontakt'],
    kick: 'CYBERBEZPIECZEŃSTWO · ANALITYK SOC · BLUE TEAM',
    hello: 'Cześć, jestem',
    lead: 'Student cyberbezpieczeństwa i aktywny analityk SOC skupiony na wykrywaniu zagrożeń, reagowaniu na incydenty i operacjach Blue Team.',
    roles: ['Analityk SOC L1', 'Blue Team', 'Junior Cyberbezpieczeństwa', 'Student'],
    view: 'Zobacz projekty', contact: 'Kontakt', scroll: 'PRZEWIŃ',
    story: 'Moja historia',
    storyT: 'Ambitny 21-letni student cyberbezpieczeństwa i aktywny analityk SOC. Oddany ciągłej nauce w zakresie wykrywania zagrożeń i reagowania na incydenty, z silnym naciskiem na rozwój kariery w środowisku Blue Team. Doświadczony w korzystaniu z narzędzi i platform bezpieczeństwa takich jak ElasticSearch, Splunk, SecureVisio, Windows Defender i Wazuh.',
    stats: [['6', 'projektów'], ['8', 'kursów i certyfikatów'], ['3', 'firmy'], ['21', 'lat']],
    exp: 'Doświadczenie',
    code: 'Kod na GitHub', more: 'Więcej projektów', certs: 'Kursy i certyfikaty', skills: 'Umiejętności',
    lets: 'Napisz', talk: 'do mnie.',
    contactT: 'Chcesz nawiązać współpracę albo masz pytania o cyberbezpieczeństwo? Śmiało napisz.',
    copied: 'skopiowano', sound: 'Dźwięk', on: 'wł.', off: 'wył.', proj: 'PROJEKT', video: 'podgląd',
    target: 'Stanowisko docelowe', now: 'obecnie',
  },
  en: {
    nav: ['Home', 'Profile', 'Experience', 'Work', 'Certs', 'Contact'],
    kick: 'CYBERSECURITY · SOC ANALYST · BLUE TEAM',
    hello: "Hi, I'm",
    lead: 'Cybersecurity student and active SOC Analyst focused on threat detection, incident response, and Blue Team operations.',
    roles: ['SOC Analyst L1', 'Blue Team', 'Cybersecurity Junior', 'Student'],
    view: 'View Work', contact: 'Contact', scroll: 'SCROLL',
    story: 'My Story',
    storyT: 'Ambitious 21-year-old cybersecurity student and active SOC Analyst. Dedicated to continuous learning in threat detection and incident response, with a strong focus on developing my career in a Blue Team environment. Experienced in utilizing security tools and platforms such as ElasticSearch, Splunk, SecureVisio, Windows Defender, and Wazuh.',
    stats: [['6', 'projects'], ['8', 'courses & certs'], ['3', 'companies'], ['21', 'years old']],
    exp: 'Experience',
    code: 'View Code', more: 'More projects', certs: 'Courses & Certifications', skills: 'Skills',
    lets: "Let's", talk: 'talk.',
    contactT: 'Interested in collaborating or have questions about cybersecurity? Feel free to reach out.',
    copied: 'copied', sound: 'Sound', on: 'on', off: 'off', proj: 'PROJECT', video: 'preview',
    target: 'Target Position', now: 'present',
  },
};

export const EXP = [
  { role: 'SOC Analyst L2', org: { pl: 'Stanowisko docelowe', en: 'Target Position' }, target: true,
    pts: { pl: ['Bazując na obecnej roli analityka SOC L1, aktywnie rozwijam się w kierunku obowiązków poziomu 2: głębszego badania incydentów, zaawansowanej korelacji i strojenia SIEM oraz skuteczniejszego wykrywania zagrożeń.'],
           en: ['Building on my current L1 SOC role, I am actively developing toward Level 2 responsibilities: deeper incident investigation, advanced SIEM correlation and tuning, and stronger threat detection.'] } },
  { role: 'SOC Analyst L1', org: { pl: 'Trecom · 2026 – obecnie · Zdalnie', en: 'Trecom · 2026 – Present · Remote' }, logo: 'trecom.png',
    pts: { pl: ['Monitorowanie i analiza zdarzeń oraz incydentów bezpieczeństwa z użyciem platform SIEM.', 'Analiza i eskalacja alertów bezpieczeństwa w celu skrócenia czasu reakcji na incydenty.', 'Badanie incydentów bezpieczeństwa i tworzenie szczegółowych raportów technicznych.', 'Strojenie reguł korelacji SIEM w celu minimalizacji fałszywych alarmów.'],
           en: ['Monitor and analyze security events and incidents using SIEM platforms.', 'Analyze and escalate security alerts to reduce incident response time.', 'Investigate security incidents and generate detailed technical reports.', 'Tune SIEM correlation rules to minimize false positives and improve threat detection.'] } },
  { role: { pl: 'Staż – cyberbezpieczeństwo', en: 'Cybersecurity Internship' }, org: { pl: 'PGE Energia Ciepła · 2026 · Zdalnie', en: 'PGE Energia Ciepła · 2026 · Remote' }, logo: 'pge.svg',
    pts: { pl: ['Analiza logów systemowych w ElasticSearch w celu identyfikacji i raportowania anomalii bezpieczeństwa.', 'Zarządzanie i triage zgłoszeń oraz alertów bezpieczeństwa przez Freescout.'],
           en: ['Analyzed system logs using ElasticSearch to identify and report security anomalies.', 'Managed and triaged security tickets and alerts through Freescout.'] } },
  { role: { pl: 'Specjalista wsparcia infrastruktury IT', en: 'IT Infrastructure Support Specialist' }, org: { pl: 'Capgemini Polska · 2025 – 2026 · Stacjonarnie', en: 'Capgemini Polska · 2025 – 2026 · On-site' }, logo: 'capgemini.png',
    pts: { pl: ['Wsparcie techniczne poziomu 1 dla użytkowników lokalnych i zdalnych.', 'Administracja kontami i urządzeniami przez Active Directory i Microsoft Intune.', 'Rozwiązywanie alertów infrastrukturalnych i minimalizacja przestojów.'],
           en: ['Delivered Level 1 technical support for local and remote users.', 'Administered user accounts and devices via Active Directory and Microsoft Intune.', 'Resolved infrastructure alerts, minimizing downtime.'] } },
];

export const PROJECTS = [
  { id: 'c2', title: { pl: 'Rozproszony system zarządzania agentami (C2)', en: 'Distributed Agent Management System (C2)' },
    desc: { pl: 'Panel Command & Control w Node.js. Automatyzuje wdrażanie agentów, zarządza dynamicznym routingiem proxy SOCKS5 oraz zapewnia telemetrię w czasie rzeczywistym i bezpieczne zarządzanie sesjami.',
            en: 'A Command & Control dashboard built with Node.js. Automates agent deployment, manages dynamic SOCKS5 proxy routing, and provides real-time telemetry and secure session management.' },
    tech: ['Node.js', 'Socket.IO', 'Discord API', 'OPSEC'], code: 'https://github.com/dexsterr/Node.js-Botnet-C2-Dashboard-PoC-' },
  { id: 'arb', title: { pl: 'Zautomatyzowany system arbitrażu rynkowego', en: 'Automated Market Arbitrage System' },
    desc: { pl: 'Sterowany zdarzeniami framework automatyzacji. Błyskawiczna analiza danych rynkowych, parsowanie metadanych przez Regex i autonomiczne transakcje z obsługą błędów i optymalizacją opóźnień sieciowych.',
            en: 'An event-driven, high-frequency automation framework. Rapid market data analysis, Regex metadata parsing, and autonomous trades with robust error handling and network latency optimization.' },
    tech: ['Node.js', 'Data Parsing', 'Automation', 'Network Optimization'], code: 'https://github.com/dexsterr/automated-market-arbitrage-bot' },
  { id: 'web', title: { pl: 'Narzędzie do testów penetracyjnych aplikacji webowych', en: 'Web Application Penetration Testing Tool' },
    desc: { pl: 'Wykrywa typowe podatności webowe: SQL injection, XSS, CSRF, LFI, RFI, Directory Traversal oraz brakujące nagłówki bezpieczeństwa HTTP.',
            en: 'Detects common web vulnerabilities including SQL injection, XSS, CSRF, LFI, RFI, Directory Traversal, and missing HTTP security headers.' },
    tech: ['Python', 'Requests', 'BeautifulSoup'], code: 'https://github.com/dexsterr/Web-Application-Penetration-Testing-Tool', video: 'pentest.mp4' },
  { id: 'net', title: { pl: 'Skaner bezpieczeństwa sieci', en: 'Network Security Scanner' },
    desc: { pl: 'Skaner podatności sieciowych w Pythonie. Wykrywa otwarte porty, usługi i potencjalne problemy, identyfikuje urządzenia i ostrzega o atakach ARP spoofing.',
            en: 'A network vulnerability scanner built with Python. Detects open ports, services, and potential issues, identifies devices, and alerts on ARP spoofing.' },
    tech: ['Python', 'Nmap', 'Scapy', 'Tkinter'], code: 'https://github.com/dexsterr/network-security-scanner', video: 'scanner.mp4' },
  { id: 'vault', title: { pl: 'Szyfrowany menedżer haseł', en: 'Encrypted Password Manager' },
    desc: { pl: 'Menedżer haseł z szyfrowaniem AES, ochroną hasłem głównym i bezpiecznym generowaniem haseł, wymagający uwierzytelnienia użytkownika.',
            en: 'A password manager with AES encryption, master password protection, and secure password generation, requiring user authentication.' },
    tech: ['Python', 'Cryptography', 'SQLite'], code: 'https://github.com/dexsterr/encrypted-password-manager', video: 'vault.mp4' },
  { id: 'ioc', title: { pl: 'Automatyzacja analizy zdarzeń bezpieczeństwa', en: 'Security Event Analysis Automation Tool' },
    desc: { pl: 'Zestaw narzędzi analityka SOC: badanie IOC, analiza phishingu, monitoring marki i walidacja zagrożeń, aby skrócić czas reakcji na incydenty.',
            en: 'SOC analyst toolkit that automates IOC investigation, phishing email analysis, brand monitoring, and threat validation to improve incident response times.' },
    tech: ['Python', 'IOC', 'Automation', 'Threat Intelligence'], code: 'https://github.com/dexsterr/Security-Event-Analysis-Automation-Tool', video: 'events.mp4' },
];

export const CERTS = [
  { name: 'CompTIA Cybersecurity Analyst (CySA+)', by: 'CompTIA', y: '2026', link: 'https://cp.certmetrics.com/CompTIA/en/public/verify/credential/015a14279ba44ec4ba0d83eaaead232d' },
  { name: 'Microsoft SC-200: Security Operations Analyst Associate', by: 'Microsoft', y: '2026', link: 'https://learn.microsoft.com/en-gb/users/oskarchudoba-9307/credentials/ec125e97a8013f64' },
  { name: 'Security Analyst Level 1 (SAL1)', by: 'TryHackMe', y: '2026', link: 'https://assets.tryhackme.com/certification-certificate/6a64c1b37d9eef287cebcac0.pdf' },
  { name: 'CompTIA Security+', by: 'CompTIA', y: '2025', link: 'https://www.credly.com/badges/32023631-a420-4515-81d1-75b17e20b890/linked_in_profile' },
  { name: 'Google Cybersecurity Certificate', by: 'Google', y: '2025', link: 'https://www.coursera.org/account/accomplishments/specialization/12DQ0E8D3N3N' },
  { name: 'Git Fundamentals Course', by: 'Boot.dev', y: '2025', link: 'https://www.youtube.com/watch?v=rH3zE7VlIMs' },
  { name: 'Python Course', by: 'Bro Code', y: '2025', link: 'https://www.youtube.com/watch?v=ix9cRaBkVe0' },
  { name: 'IT Technician Vocational Qualification', by: 'EE.08 / INF.02', y: '2024' },
];

export const SKILLS = {
  pl: ['Zagrożenia, incydenty, SIEM', 'Analiza logów ElasticSearch', 'Triage alertów i zgłoszenia', 'Splunk', 'Wazuh', 'SecureVisio', 'Windows Defender', 'Linux (CLI/utwardzanie)', 'Podstawy bezpieczeństwa SQL', 'Protokoły, konfiguracje', 'Python/JS/HTML/CSS', 'Kontrola wersji Git', 'Active Directory', 'Microsoft Intune', 'Składanie komputerów', 'Komunikacja i praca zespołowa'],
  en: ['Threats, incidents, SIEM', 'ElasticSearch Log Analysis', 'Alert Triage & Ticketing', 'Splunk', 'Wazuh', 'SecureVisio', 'Windows Defender', 'Linux (CLI/Hardening)', 'Security SQL fundamentals', 'Protocols, basic configs', 'Python/JS/HTML/CSS', 'Version Control Git', 'Active Directory', 'Microsoft Intune', 'Computer disassembly', 'Communication & Team Collab'],
};
