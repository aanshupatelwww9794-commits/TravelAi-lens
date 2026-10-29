import React from 'react';
import { Search, X, Mic, Sparkles, MapPin, Landmark, Mountain, Sun, UtensilsCrossed, Waves, Compass } from 'lucide-react';
import { CATEGORIES, REGIONS } from '../data/destinations';
import { TranslationDictionary } from '../i18n/translations';
import { LanguageSelector } from './LanguageSelector';

interface HeroBannerProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedRegion: string;
  onSelectRegion: (reg: string) => void;
  totalCount: number;
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  t: TranslationDictionary;
  onExploreGhats?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedRegion,
  onSelectRegion,
  totalCount,
  currentLanguage,
  onLanguageChange,
  t,
  onExploreGhats,
}) => {
  const popularKeywords = [
    'Varanasi',
    'Thawe Mandir',
    'Ayodhya',
    'Mathura',
    'Hampi',
    'Munnar',
    'Konark',
    'Bodh Gaya',
    'Kaziranga',
    'Rann of Kutch',
    'Spiti Valley',
    'Andaman'
  ];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'Historical':
        return <Landmark className="w-3.5 h-3.5" />;
      case 'Nature':
        return <Mountain className="w-3.5 h-3.5" />;
      case 'Spiritual':
        return <Sun className="w-3.5 h-3.5" />;
      case 'Temple':
        return <Landmark className="w-3.5 h-3.5" />;
      case 'Wildlife':
        return <Compass className="w-3.5 h-3.5" />;
      case 'Adventure':
        return <Mountain className="w-3.5 h-3.5" />;
      case 'Beach':
        return <Waves className="w-3.5 h-3.5" />;
      case 'Cultural':
        return <UtensilsCrossed className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const getCategoryLabel = (id: string) => {
    switch (id) {
      case 'Historical':
        return t.historical;
      case 'Nature':
        return t.nature;
      case 'Spiritual':
        return t.spiritual;
      case 'Cultural':
        return t.cultural;
      case 'Temple':
        return 'Temples';
      case 'Wildlife':
        return 'Wildlife';
      case 'Adventure':
        return 'Adventure';
      case 'Beach':
        return 'Beaches';
      case 'All':
        return t.allCategories;
      default:
        return id;
    }
  };

  const handleVoiceSearch = () => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      const speechLocale = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'bn' ? 'bn-IN' : currentLanguage === 'ta' ? 'ta-IN' : currentLanguage === 'te' ? 'te-IN' : 'en-IN';
      recognition.lang = speechLocale;
      recognition.start();
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onSearchChange(transcript);
      };
    } else {
      alert('Voice recognition is not supported in this browser. Please type in the search bar.');
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 text-white pt-8 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        {/* Top Language Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            variant="hero"
          />
        </div>

        {/* Hero Brand Section matching specification */}
        <div className="hero-brand">
          <div className="brand-badge">
            ✨ Travel Lens AI
            <span>🇮🇳 INDIA</span>
          </div>

          <h1 className="brand-title">
            🌍 Travel Lens AI
          </h1>

          <p className="brand-tagline">
            Don't just visit a place, discover its story.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative flex items-center shadow-2xl rounded-2xl bg-slate-800/90 border border-slate-700 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-400/20 transition-all p-1.5">
            <div className="pl-3.5 text-slate-400">
              <Search className="w-5 h-5 text-teal-400" />
            </div>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent px-3 py-2.5 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition mr-1"
                title={t.resetFilters}
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleVoiceSearch}
              className="p-2 text-slate-400 hover:text-teal-300 rounded-xl hover:bg-slate-700 transition mr-1 hidden sm:block"
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Keywords */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-xs text-slate-400">
            <span className="font-medium text-slate-500">{t.popularLabel}:</span>
            {popularKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => onSearchChange(kw)}
                className="px-2.5 py-1 rounded-full bg-slate-800/60 hover:bg-teal-900/40 border border-slate-700/60 hover:border-teal-500/40 text-slate-300 hover:text-teal-300 transition text-[11px]"
              >
                {kw}
              </button>
            ))}
          </div>

          {/* Explore Varanasi Ghats Quick CTA matching prompt */}
          <div className="pt-2.5 flex items-center justify-center">
            <button
              onClick={() => {
                if (onExploreGhats) {
                  onExploreGhats();
                } else if (typeof (window as any).showVaranasiGhats === 'function') {
                  (window as any).showVaranasiGhats();
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 border border-amber-300/60 transition-all active:scale-95 cursor-pointer"
            >
              <Waves className="w-4 h-4 text-slate-950" />
              <span>Explore Varanasi Ghats</span>
              <span className="bg-slate-950/20 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                Trail
              </span>
            </button>
          </div>
        </div>

        {/* Categories & Regions Filter */}
        <div className="pt-2 flex flex-col items-center gap-4">
          {/* Category Dropdown and Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-xl shadow-xs">
              <label htmlFor="category" className="text-xs font-semibold text-slate-300 whitespace-nowrap flex items-center gap-1.5">
                <span>🏷️</span>
                <span className="hidden sm:inline">Category:</span>
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value)}
                className="bg-slate-900/90 text-teal-300 border border-slate-700 hover:border-teal-400 rounded-lg px-2.5 py-1 text-xs font-semibold cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-400"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {getCategoryLabel(cat.id)}
                  </option>
                ))}
              </select>
            </div>

            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-xs font-semibold transition-all active:scale-95 ${
                    active
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md shadow-teal-500/20'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700'
                  }`}
                >
                  {getCategoryIcon(cat.id)}
                  <span>{getCategoryLabel(cat.id)}</span>
                </button>
              );
            })}
          </div>

          {/* Region Tabs */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-400 flex-wrap justify-center">
            <span className="px-2.5 py-1 text-slate-500 font-medium hidden sm:inline flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" /> {t.regionLabel}:
            </span>
            {REGIONS.map((reg) => (
              <button
                key={reg}
                onClick={() => onSelectRegion(reg)}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  selectedRegion === reg
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                {reg === 'All' ? t.allRegions : reg}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
