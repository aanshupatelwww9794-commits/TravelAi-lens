import React, { useState } from 'react';
import { VaranasiGhat } from '../types/travel';
import { speakText, stopTravelStory } from '../utils/speech';
import {
  X,
  MapPin,
  ExternalLink,
  Volume2,
  VolumeX,
  BookOpen,
  Compass,
  Sparkles,
  Waves
} from 'lucide-react';

interface GhatStoryModalProps {
  ghat: VaranasiGhat | null;
  onClose: () => void;
  language?: string;
}

export const GhatStoryModal: React.FC<GhatStoryModalProps> = ({
  ghat,
  onClose,
  language = 'en',
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!ghat) return null;

  const handleSpeak = () => {
    if (isSpeaking) {
      stopTravelStory();
      setIsSpeaking(false);
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSpeaking(true);
      const textToSpeak = `${ghat.name}. ${ghat.story}. ${ghat.significance}. ${ghat.experience}`;
      const langCode = language === 'hi' ? 'hi-IN' : 'en-IN';
      
      speakText(textToSpeak, langCode, {
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } else {
      alert('Voice narration is not supported by this browser.');
    }
  };

  const handleOpenMaps = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent(ghat.location),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div
        id="details"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col my-auto max-h-[90vh]"
      >
        {/* Header Banner */}
        <div className="relative h-44 sm:h-56 w-full bg-slate-900 overflow-hidden shrink-0">
          <img
            src={ghat.image || 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800'}
            alt={ghat.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => {
              stopTravelStory();
              onClose();
            }}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition active:scale-95"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Ghat Meta */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/80 backdrop-blur-md text-[11px] font-semibold text-white uppercase tracking-wider mb-1.5">
              <Waves className="w-3 h-3" />
              {ghat.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif leading-tight drop-shadow-md">
              {ghat.name}
            </h2>
            <p className="text-xs sm:text-sm text-teal-200 flex items-center gap-1 mt-1 drop-shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-teal-300 shrink-0" />
              {ghat.location}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-slate-800">
          {/* Quick Voice & Map Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-teal-50 border border-amber-200/80">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSpeak}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-xs active:scale-95 ${
                  isSpeaking
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-teal-700 hover:bg-teal-800 text-white'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? 'Stop Narration' : 'Listen to Story'}</span>
              </button>
            </div>

            <button
              onClick={handleOpenMaps}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 flex items-center gap-1.5 transition shadow-xs active:scale-95"
            >
              <span>Open Ghat in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

          {/* Section 1: Story & History */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-600" />
              Story & History
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {ghat.story}
            </p>
          </div>

          {/* Section 2: Religious Significance */}
          <div className="space-y-2 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60">
            <h3 className="font-serif font-bold text-base sm:text-lg text-amber-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Religious Significance
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {ghat.significance}
            </p>
          </div>

          {/* Section 3: What to Discover */}
          <div className="space-y-2 bg-teal-50/50 p-4 rounded-2xl border border-teal-200/60">
            <h3 className="font-serif font-bold text-base sm:text-lg text-teal-950 flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-700" />
              What to Discover
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {ghat.experience}
            </p>
          </div>

          {/* Section 4: Live Map */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Ghat Riverfront Location
            </span>
            <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
              <iframe
                title={`${ghat.name} Map`}
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(ghat.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Sacred River Ganga • Varanasi, India
          </span>
          <button
            onClick={() => {
              stopTravelStory();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
