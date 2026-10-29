import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, FastForward } from 'lucide-react';

interface AudioTourPlayerProps {
  text: string;
  title: string;
  location: string;
  language?: string;
  listenNowLabel?: string;
  pauseLabel?: string;
  resumeLabel?: string;
  audioTourLabel?: string;
}

export const AudioTourPlayer: React.FC<AudioTourPlayerProps> = ({
  text,
  title,
  location,
  language = 'en',
  listenNowLabel = 'Listen Now',
  pauseLabel = 'Pause',
  resumeLabel = 'Resume',
  audioTourLabel = 'Audio Tour Guide',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState<number>(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // When text or language changes, stop previous utterance
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [text, language]);

  const handlePlay = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speed;
    utterance.pitch = 1;
    utterance.volume = isMuted ? 0 : 1;

    // Set utterance language
    const langMap: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      bn: 'bn-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      mr: 'mr-IN',
      gu: 'gu-IN',
      pa: 'pa-IN',
      ur: 'ur-IN',
      fr: 'fr-FR',
      es: 'es-ES',
      de: 'de-DE',
      ja: 'ja-JP',
    };
    utterance.lang = langMap[language] || 'en-IN';

    // Try to pick matching language voice
    const voices = window.speechSynthesis.getVoices();
    const targetPrefix = language.toLowerCase();
    const matchedVoice =
      voices.find((v) => v.lang.toLowerCase().startsWith(targetPrefix)) ||
      voices.find((v) => v.lang.includes('en-IN') || v.lang.includes('en-US'));

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleRestart = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setTimeout(() => {
      handlePlay();
    }, 100);
  };

  const toggleSpeed = () => {
    const nextSpeed = speed === 1.0 ? 1.25 : speed === 1.25 ? 1.5 : 1.0;
    setSpeed(nextSpeed);
    if (isPlaying) {
      handleRestart();
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (utteranceRef.current) {
      utteranceRef.current.volume = nextMuted ? 0 : 1;
    }
  };

  if (!supported) return null;

  return (
    <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-teal-500/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 border border-teal-400/30 shrink-0">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-teal-300">
                {audioTourLabel}
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h4 className="font-semibold text-sm sm:text-base text-white">
              {title}
            </h4>
            <p className="text-xs text-slate-400">📍 {location}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={toggleSpeed}
            title="Playback Speed"
            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-teal-200 transition"
          >
            {speed}x
          </button>

          <button
            onClick={handleRestart}
            title="Restart Narration"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-semibold text-sm transition shadow-md active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-slate-950" />
                <span>{pauseLabel}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{isPaused ? resumeLabel : listenNowLabel}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
