import React from 'react';
import { Camera, Compass, Heart, Calendar, Sparkles } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { TranslationDictionary } from '../i18n/translations';

interface HeaderProps {
  onOpenPhotoLens: () => void;
  onOpenTripPlanner: () => void;
  onOpenConcierge: () => void;
  onOpenWishlist: () => void;
  wishlistCount: number;
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  t: TranslationDictionary;
  db2Status?: {
    configured: boolean;
    connected: boolean;
    source: 'ibm_db2' | 'fallback_local_cache';
  };
  onOpenDb2Status?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPhotoLens,
  onOpenTripPlanner,
  onOpenConcierge,
  onOpenWishlist,
  wishlistCount,
  currentLanguage,
  onLanguageChange,
  t,
  db2Status,
  onOpenDb2Status,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-900/95 border-b border-slate-800 text-white transition-all shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-18 py-2.5 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-teal-500 to-emerald-400 p-0.5 shadow-md flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-teal-400 animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-teal-200 to-amber-300 bg-clip-text text-transparent">
                {t.appName}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                India 🇮🇳
              </span>

              {db2Status && onOpenDb2Status && (
                <button
                  onClick={onOpenDb2Status}
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border transition flex items-center gap-1 cursor-pointer ${
                    db2Status.connected
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                  }`}
                  title={
                    db2Status.connected
                      ? 'IBM Db2 Connected (Live Relational SQL)'
                      : 'IBM Db2: Local Cache Mode (Click for setup instructions)'
                  }
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${db2Status.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span>{db2Status.connected ? 'Db2 Live' : 'Db2 Mode'}</span>
                </button>
              )}
            </div>
            <p className="text-xs text-slate-400 hidden md:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls & Language Selector */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Language Box matching requested markup */}
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            variant="header"
          />

          <button
            onClick={onOpenPhotoLens}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-teal-300 text-xs sm:text-sm font-medium transition active:scale-95 shadow-sm"
            title="Scan or upload a monument or food photo to discover its history"
          >
            <Camera className="w-4 h-4 text-teal-400" />
            <span className="hidden lg:inline">{t.aiPhotoLens}</span>
            <span className="lg:hidden">Lens</span>
          </button>

          <button
            onClick={onOpenTripPlanner}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-amber-300 text-xs sm:text-sm font-medium transition active:scale-95 shadow-sm"
            title="Generate custom day-by-day travel itineraries"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">{t.tripPlanner}</span>
            <span className="lg:hidden">Plan</span>
          </button>

          <button
            onClick={onOpenConcierge}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white text-xs sm:text-sm font-medium transition active:scale-95 shadow-md shadow-teal-900/30"
            title="Chat with Indian Heritage & Travel AI Concierge"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">{t.aiGuide}</span>
          </button>

          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-rose-400 transition active:scale-95"
            title={t.savedBucketList}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center border-2 border-slate-900">
                {wishlistCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
