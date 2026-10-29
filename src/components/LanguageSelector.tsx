import React from 'react';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  variant?: 'header' | 'hero' | 'compact';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  variant = 'header',
}) => {
  return (
    <div className={`language-box flex items-center gap-2 ${variant === 'hero' ? 'bg-slate-800/90 border border-slate-700/80 px-3.5 py-2 rounded-2xl shadow-md' : 'bg-slate-800/80 border border-slate-700 px-2.5 py-1.5 rounded-xl'}`}>
      <label
        htmlFor="headerLanguageSelect"
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 cursor-pointer select-none whitespace-nowrap"
      >
        <span role="img" aria-label="Globe" className="text-sm">🌐</span>
        <span className="hidden sm:inline">Choose Language:</span>
      </label>

      <div className="relative inline-flex items-center">
        <select
          id="headerLanguageSelect"
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="appearance-none bg-slate-900/90 text-teal-300 border border-slate-700 hover:border-teal-400 rounded-lg px-2.5 py-1 pr-6 text-xs font-semibold cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-400 transition"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी (Hindi)</option>
          <option value="bn">বাংলা (Bengali)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="mr">मराठी (Marathi)</option>
          <option value="gu">ગુજરાતી (Gujarati)</option>
          <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
          <option value="ur">اردو (Urdu)</option>
          <option value="fr">Français (French)</option>
          <option value="es">Español (Spanish)</option>
          <option value="de">Deutsch (German)</option>
          <option value="ja">日本語 (Japanese)</option>
        </select>
        <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
          ▼
        </div>
      </div>
    </div>
  );
};
