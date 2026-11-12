import { useT, type Lang } from '../i18n/LanguageContext';

/** Fixed PL/EN switch in the bottom-right corner (opposite the social rail). */
const LanguageToggle = () => {
  const { lang, setLang } = useT();
  const langs: Lang[] = ['en', 'pl'];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center rounded-full border border-green-500/25 bg-black/80 p-1 font-mono text-xs">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative px-3 py-1.5 rounded-full uppercase tracking-wider transition-colors ${
            lang === l ? 'text-black' : 'text-gray-400 hover:text-green-300'
          }`}
        >
          {lang === l && <span className="absolute inset-0 rounded-full bg-green-400" />}
          <span className="relative z-10">{l}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
