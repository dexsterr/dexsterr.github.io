import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'pl';

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (s: string) => string;
}

const LanguageCtx = createContext<Ctx>({ lang: 'en', setLang: () => {}, t: (s) => s });

/**
 * Polish overrides keyed by the exact English source string. `t(x)` returns the
 * Polish value when lang is 'pl' (falling back to the English source if a key is
 * missing), and the English source as-is when lang is 'en'. This keeps the JSX
 * readable (English stays inline) and localises by wrapping strings in t().
 */
const PL: Record<string, string> = {
  // nav
  Home: 'Start',
  Work: 'Projekty',
  About: 'O mnie',
  Contact: 'Kontakt',

  // hero
  "Hi, I'm": 'Cześć, jestem',
  '21 years old • Passionate about digital security': '21 lat • Pasjonat cyberbezpieczeństwa',
  'Cybersecurity student and active SOC Analyst focused on threat detection, incident response, and Blue Team operations.':
    'Student cyberbezpieczeństwa i aktywny analityk SOC skupiony na wykrywaniu zagrożeń, reagowaniu na incydenty i operacjach Blue Team.',
  'View Work': 'Zobacz projekty',
  'About Me': 'O mnie',
  Projects: 'Projekty',
  Certs: 'Certyfikaty',
  'SOC Analyst': 'Analityk SOC',
  'Blue Team': 'Blue Team',
  SCROLL: 'PRZEWIŃ',

  // typing roles
  'Cybersecurity Junior': 'Junior Cyberbezpieczeństwa',
  Student: 'Student',
  'Aspiring Hacker': 'Przyszły Haker',

  // portfolio
  Selected: 'Wybrane',
  "A collection of cybersecurity projects and tools I've developed to enhance digital security and demonstrate my skills.":
    'Zbiór projektów i narzędzi z zakresu cyberbezpieczeństwa, które stworzyłem, aby wzmacniać bezpieczeństwo cyfrowe i pokazać swoje umiejętności.',
  'View Code': 'Zobacz kod',
  'If you want to see more of my projects, the link is here:':
    'Jeżeli chcesz zobaczyć więcej moich projektów, link znajduje się tutaj:',
  'GitHub Profile': 'Profil GitHub',
  'Distributed Agent Management System (C2)': 'Rozproszony system zarządzania agentami (C2)',
  'A comprehensive Command & Control dashboard built with Node.js. Automates the deployment of agents, manages dynamic SOCKS5 proxy routing to evade detection, and provides real-time telemetry and secure session management.':
    'Rozbudowany panel Command & Control zbudowany w Node.js. Automatyzuje wdrażanie agentów, zarządza dynamicznym routingiem proxy SOCKS5 w celu unikania wykrycia oraz zapewnia telemetrię w czasie rzeczywistym i bezpieczne zarządzanie sesjami.',
  'Automated Market Arbitrage System': 'Zautomatyzowany system arbitrażu rynkowego',
  'An event-driven, high-frequency automation framework. Performs rapid market data analysis, parses complex metadata via Regex, and executes trades autonomously with robust error handling and network latency optimization.':
    'Sterowany zdarzeniami, wysokoczęstotliwościowy framework automatyzacji. Przeprowadza błyskawiczną analizę danych rynkowych, parsuje złożone metadane z użyciem Regex i autonomicznie wykonuje transakcje z solidną obsługą błędów i optymalizacją opóźnień sieciowych.',
  'Web Application Penetration Testing Tool': 'Narzędzie do testów penetracyjnych aplikacji webowych',
  'An automated tool for detecting common web vulnerabilities including SQL injection, XSS, CSRF, LFI, RFI, Directory Traversal, and missing HTTP security headers.':
    'Zautomatyzowane narzędzie wykrywające typowe podatności webowe: SQL injection, XSS, CSRF, LFI, RFI, Directory Traversal oraz brakujące nagłówki bezpieczeństwa HTTP.',
  'Network Security Scanner': 'Skaner bezpieczeństwa sieci',
  'A concise network vulnerability scanner built with Python. Detects open ports, services, and potential security issues, identifies devices, and alerts on ARP spoofing.':
    'Zwięzły skaner podatności sieciowych napisany w Pythonie. Wykrywa otwarte porty, usługi i potencjalne problemy bezpieczeństwa, identyfikuje urządzenia i ostrzega o atakach ARP spoofing.',
  'Encrypted Password Manager': 'Szyfrowany menedżer haseł',
  'A secure password manager with AES encryption, master password protection, and secure password generation, requiring user authentication.':
    'Bezpieczny menedżer haseł z szyfrowaniem AES, ochroną hasłem głównym i bezpiecznym generowaniem haseł, wymagający uwierzytelnienia użytkownika.',
  'Security Event Analysis Automation Tool': 'Narzędzie do automatyzacji analizy zdarzeń bezpieczeństwa',
  'SOC analyst toolkit that automates IOC investigation, phishing email analysis, brand monitoring, and threat validation to improve incident response times.':
    'Zestaw narzędzi analityka SOC automatyzujący badanie IOC, analizę phishingu, monitoring marki i walidację zagrożeń, aby skrócić czas reakcji na incydenty.',

  // about
  Me: 'mnie',
  'Passionate cybersecurity enthusiast dedicated to protecting digital assets':
    'Pasjonat cyberbezpieczeństwa oddany ochronie zasobów cyfrowych',
  'My Story': 'Moja historia',
  'Ambitious 21-year-old cybersecurity student and active SOC Analyst. Dedicated to continuous learning in threat detection and incident response, with a strong focus on developing my career in a Blue Team environment. Experienced in utilizing security tools and platforms such as ElasticSearch, Splunk, SecureVisio, Windows Defender, and Wazuh to maintain robust security postures.':
    'Ambitny 21-letni student cyberbezpieczeństwa i aktywny analityk SOC. Oddany ciągłej nauce w zakresie wykrywania zagrożeń i reagowania na incydenty, z silnym naciskiem na rozwój kariery w środowisku Blue Team. Doświadczony w korzystaniu z narzędzi i platform bezpieczeństwa takich jak ElasticSearch, Splunk, SecureVisio, Windows Defender i Wazuh w celu utrzymania wysokiego poziomu bezpieczeństwa.',
  'Courses & Certifications': 'Kursy i certyfikaty',
  'Skills & Expertise': 'Umiejętności i kompetencje',
  'Professional Experience': 'Doświadczenie zawodowe',
  'Target Position': 'Stanowisko docelowe',
  'Building on my current L1 SOC role, I am actively developing toward Level 2 responsibilities: deeper incident investigation, advanced SIEM correlation and tuning, and stronger threat detection in a Blue Team environment. I study and certify continuously to grow into a full L2 SOC Analyst position.':
    'Bazując na obecnej roli analityka SOC L1, aktywnie rozwijam się w kierunku obowiązków poziomu 2: głębszego badania incydentów, zaawansowanej korelacji i strojenia SIEM oraz skuteczniejszego wykrywania zagrożeń w środowisku Blue Team. Nieustannie uczę się i certyfikuję, aby wejść na pełne stanowisko analityka SOC L2.',
  'Trecom · 2026 – Present · Remote': 'Trecom · 2026 – obecnie · Zdalnie',
  'Monitor and analyze security events and incidents using SIEM platforms.':
    'Monitorowanie i analiza zdarzeń oraz incydentów bezpieczeństwa z użyciem platform SIEM.',
  'Analyze and escalate security alerts to reduce incident response time.':
    'Analiza i eskalacja alertów bezpieczeństwa w celu skrócenia czasu reakcji na incydenty.',
  'Investigate security incidents and generate detailed technical reports.':
    'Badanie incydentów bezpieczeństwa i tworzenie szczegółowych raportów technicznych.',
  'Tune SIEM correlation rules to minimize false positives and improve threat detection.':
    'Strojenie reguł korelacji SIEM w celu minimalizacji fałszywych alarmów i poprawy wykrywania zagrożeń.',
  'Conduct proactive cybersecurity operations within a Blue Team environment.':
    'Prowadzenie proaktywnych działań z zakresu cyberbezpieczeństwa w środowisku Blue Team.',
  'Cybersecurity Internship': 'Staż – cyberbezpieczeństwo',
  'PGE Energia Ciepła · 2026 · Remote': 'PGE Energia Ciepła · 2026 · Zdalnie',
  'Analyzed system logs using ElasticSearch to identify and report security anomalies.':
    'Analiza logów systemowych w ElasticSearch w celu identyfikacji i raportowania anomalii bezpieczeństwa.',
  'Managed and triaged security tickets and alerts through Freescout, improving workflow efficiency.':
    'Zarządzanie i triage zgłoszeń oraz alertów bezpieczeństwa przez Freescout, zwiększając efektywność pracy.',
  'IT Infrastructure Support Specialist': 'Specjalista wsparcia infrastruktury IT',
  'Capgemini Polska · 2025 – 2026 · On-site': 'Capgemini Polska · 2025 – 2026 · Stacjonarnie',
  'Delivered Level 1 technical support for local and remote users, resolving hardware and software issues efficiently.':
    'Świadczenie wsparcia technicznego poziomu 1 dla użytkowników lokalnych i zdalnych, sprawne rozwiązywanie problemów sprzętowych i programowych.',
  'Administered user accounts and devices via Active Directory and Microsoft Intune.':
    'Administracja kontami i urządzeniami użytkowników przez Active Directory i Microsoft Intune.',
  'Resolved infrastructure alerts, maintaining optimal service availability and minimizing downtime.':
    'Rozwiązywanie alertów infrastrukturalnych, utrzymanie optymalnej dostępności usług i minimalizacja przestojów.',

  // skills
  'Computer disassembly': 'Składanie i rozbieranie komputerów',
  'Threats incidents SIEM': 'Zagrożenia, incydenty, SIEM',
  'Security SQL fundamentals': 'Podstawy bezpieczeństwa SQL',
  'Version Control Git': 'Kontrola wersji Git',
  'Protocols basic configs': 'Protokoły, podstawowe konfiguracje',
  'Python/JS/HTML/CSS': 'Python/JS/HTML/CSS',
  'Communication Team Collab': 'Komunikacja i praca zespołowa',
  'Cybersecurity Basics': 'Podstawy cyberbezpieczeństwa',
  'Linux (CLI/Hardening)': 'Linux (CLI/utwardzanie)',
  'Ticketing via servicecentral': 'Zgłoszenia przez ServiceCentral',
  'ElasticSearch Log Analysis': 'Analiza logów ElasticSearch',
  'Alert Triage & Ticketing': 'Triage alertów i zgłoszenia',

  // contact
  "Let's": 'Napisz',
  'talk.': 'do mnie.',
  'Interested in collaborating or have questions about cybersecurity? Feel free to reach out.':
    'Chcesz nawiązać współpracę albo masz pytania o cyberbezpieczeństwo? Śmiało napisz.',
  'Cybersecurity · SOC Analyst · Blue Team': 'Cyberbezpieczeństwo · Analityk SOC · Blue Team',
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('oc_lang');
      if (saved === 'pl' || saved === 'en') return saved;
    } catch { /* ignore */ }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('oc_lang', lang); } catch { /* ignore */ }
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const t = (s: string) => (lang === 'pl' ? PL[s] ?? s : s);

  return <LanguageCtx.Provider value={{ lang, setLang, t }}>{children}</LanguageCtx.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useT = () => useContext(LanguageCtx);
