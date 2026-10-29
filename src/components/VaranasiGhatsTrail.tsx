import React from 'react';
import { varanasiGhats } from '../data/varanasiGhats';
import { VaranasiGhat } from '../types/travel';
import { Waves, BookOpen, Volume2, MapPin, Compass } from 'lucide-react';
import { speakText, stopTravelStory } from '../utils/speech';

interface VaranasiGhatsTrailProps {
  onSelectGhat: (ghat: VaranasiGhat, index: number) => void;
  language?: string;
}

export const VaranasiGhatsTrail: React.FC<VaranasiGhatsTrailProps> = ({
  onSelectGhat,
  language = 'en',
}) => {
  const [activeVoiceIndex, setActiveVoiceIndex] = React.useState<number | null>(null);

  const handleQuickListen = (ghat: VaranasiGhat, index: number, e: React.MouseEvent) => {
    e.stopPropagation();

    if (activeVoiceIndex === index) {
      stopTravelStory();
      setActiveVoiceIndex(null);
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setActiveVoiceIndex(index);
      const textToSpeak = `${ghat.name}. ${ghat.story}. ${ghat.significance}`;
      const langCode = language === 'hi' ? 'hi-IN' : 'en-IN';

      speakText(textToSpeak, langCode, {
        onEnd: () => setActiveVoiceIndex(null),
        onError: () => setActiveVoiceIndex(null),
      });
    }
  };

  return (
    <section className="py-8 space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-900 to-teal-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
          <Waves className="w-64 h-64 text-amber-300" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Waves className="w-3.5 h-3.5 text-amber-400" />
            <span>Sacred Riverfront Heritage</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight text-amber-50">
            Varanasi Ghats Heritage Trail
          </h2>

          <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed">
            Spanning over 80 ghats along the sacred crescent curve of the River Ganges, explore 8 of the most historic, philosophical, and architectural riverfront steps of Kashi.
          </p>
        </div>
      </div>

      {/* Ghats Grid (matches card and container structure) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {varanasiGhats.map((ghat, index) => {
          const isSpeaking = activeVoiceIndex === index;
          return (
            <div
              key={ghat.name}
              className="card group bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Ghat Image */}
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={ghat.image}
                  alt={ghat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md text-[11px] font-semibold text-amber-200 border border-amber-400/30">
                    {ghat.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-bold font-serif leading-tight text-white group-hover:text-amber-200 transition">
                    {ghat.name}
                  </h3>
                  <p className="text-xs text-amber-200/90 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-300 shrink-0" />
                    Varanasi
                  </p>
                </div>
              </div>

              {/* Card Content */}
              <div className="card-content p-4 flex-1 flex flex-col justify-between gap-3 text-slate-700">
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {ghat.story}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectGhat(ghat, index)}
                    className="flex-1 py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Discover Ghat Story</span>
                  </button>

                  <button
                    onClick={(e) => handleQuickListen(ghat, index, e)}
                    className={`p-2 rounded-xl border transition active:scale-95 ${
                      isSpeaking
                        ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse font-bold'
                        : 'border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-600 hover:text-amber-700'
                    }`}
                    title={isSpeaking ? 'Stop Narration' : 'Listen to Story'}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
