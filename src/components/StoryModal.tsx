import React, { useState, useEffect } from 'react';
import { Destination, DeepStoryData, ItineraryData } from '../types/travel';
import { AudioTourPlayer } from './AudioTourPlayer';
import {
  X,
  MapPin,
  ExternalLink,
  BookOpen,
  Utensils,
  Compass,
  Sparkles,
  Award,
  Heart,
  Calendar,
  Clock,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Share2,
  Play,
  Square,
  Volume2,
  Loader2
} from 'lucide-react';

import { TranslationDictionary } from '../i18n/translations';
import { playTravelStory, stopTravelStory } from '../utils/speech';

interface StoryModalProps {
  destination: Destination | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (dest: Destination) => void;
  onOpenConciergeWithDestination: (destName: string) => void;
  onExploreGhats?: () => void;
  language?: string;
  t: TranslationDictionary;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  destination,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onOpenConciergeWithDestination,
  onExploreGhats,
  language = 'en',
  t,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'attractions' | 'food' | 'ai' | 'logistics'>('history');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [deepStory, setDeepStory] = useState<DeepStoryData | null>(null);
  const [loadingDeepStory, setLoadingDeepStory] = useState<boolean>(false);
  const [customItinerary, setCustomItinerary] = useState<ItineraryData | null>(null);
  const [loadingItinerary, setLoadingItinerary] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [translatedDetails, setTranslatedDetails] = useState<{
    name: string;
    city: string;
    history: string;
    attractions: string;
    food: string;
  } | null>(null);
  const [loadingTranslation, setLoadingTranslation] = useState<boolean>(false);
  const [voiceNarrationLang, setVoiceNarrationLang] = useState<string>(language === 'hi' ? 'hi' : 'en');
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);

  // Sync voiceNarrationLang when language changes
  useEffect(() => {
    setVoiceNarrationLang(language === 'hi' ? 'hi' : 'en');
  }, [language]);

  // Clean up narration on modal unmount
  useEffect(() => {
    return () => {
      stopTravelStory();
    };
  }, []);

  useEffect(() => {
    if (destination) {
      setSelectedImage(destination.image || destination.images?.[0]?.url || destination.gallery?.[0] || '');
      setActiveTab('history');
      setDeepStory(null);
      setCustomItinerary(null);
      setTranslatedDetails(null);

      // If user selected non-English, translate story fields matching showTranslatedDetails
      if (language && language !== 'en') {
        setLoadingTranslation(true);
        const historyText = typeof destination.history === 'object' && destination.history
          ? (destination.history.details || '')
          : (destination.history || '');
        const foodText = destination.food || (Array.isArray(destination.localFood)
          ? destination.localFood.map((f) => (typeof f === 'object' ? f.name : f)).join(', ')
          : '');
        const originalText = [
          destination.name,
          destination.city || destination.state,
          historyText,
          Array.isArray(destination.attractions) ? destination.attractions.join(', ') : (destination.attractions || ''),
          foodText,
        ];

        fetch('/api/lens/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: originalText.join('\n'),
            targetLang: language,
            context: `${destination.name} in ${destination.city || destination.state}, India`,
          }),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.translatedText) {
              const parts = data.translatedText.split('\n');
              setTranslatedDetails({
                name: parts[0] || destination.name,
                city: parts[1] || destination.city || destination.state,
                history: parts[2] || destination.history,
                attractions: parts[3] || (Array.isArray(destination.attractions) ? destination.attractions.join(', ') : destination.attractions),
                food: parts[4] || destination.food || (Array.isArray(destination.localFood) ? destination.localFood.join(', ') : ''),
              });
            }
          })
          .catch((e) => console.error(e))
          .finally(() => setLoadingTranslation(false));
      }
    }
  }, [destination, language]);

  if (!destination) return null;

  const handleFetchDeepStory = async () => {
    if (deepStory || loadingDeepStory) return;
    setLoadingDeepStory(true);
    try {
      const res = await fetch('/api/lens/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: destination.name,
          category: destination.category,
          city: `${destination.city}, ${destination.state}`,
          language,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setDeepStory(data.data);
      }
    } catch (err) {
      console.error('Failed to load deep story', err);
    } finally {
      setLoadingDeepStory(false);
    }
  };

  const handleGenerateItinerary = async (days: number = 2) => {
    setLoadingItinerary(true);
    try {
      const res = await fetch('/api/lens/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: `${destination.name}, ${destination.city}`,
          days,
          travelStyle: 'Heritage & Food',
          language,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCustomItinerary(data.data);
      }
    } catch (err) {
      console.error('Failed to generate itinerary', err);
    } finally {
      setLoadingItinerary(false);
    }
  };

  const handleOpenMaps = () => {
    const query = encodeURIComponent(
      destination.mapQuery || `${destination.name} ${destination.city || destination.state} India`
    );
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  const handleShare = () => {
    const shareText = `Explore ${destination.name} on TravelLens AI - Discover India's stories, food and heritage!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div id="details" className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col my-auto">
        {/* Modal Top Bar */}
        <div className="relative h-64 sm:h-72 w-full shrink-0 bg-slate-900">
          <img
            src={selectedImage || destination.image}
            alt={destination.name}
            className="w-full h-full object-cover object-center transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />

          {/* Top Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md">
                {destination.category}
              </span>
              {destination.unescoHeritage && (
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md">
                  <Award className="w-3.5 h-3.5" />
                  UNESCO Heritage
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition shadow-md"
                title="Share Destination"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleWishlist(destination)}
                className={`p-2.5 rounded-full backdrop-blur-md transition shadow-md ${
                  isWishlisted ? 'bg-rose-500 text-white' : 'bg-black/50 hover:bg-black/70 text-white'
                }`}
                title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition shadow-md hover:rotate-90"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Image Caption if present */}
          {destination.images && (
            <div className="absolute top-4 left-4 z-10">
              {destination.images.find((img) => img.url === selectedImage)?.caption && (
                <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-teal-300 text-[11px] font-semibold border border-teal-500/30 shadow-md">
                  📷 {destination.images.find((img) => img.url === selectedImage)?.caption}
                </span>
              )}
            </div>
          )}

          {/* Destination Title & Quick Details */}
          <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-teal-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 mb-1">
                <MapPin className="w-4 h-4 text-teal-400" />
                {destination.city}, {destination.state} ({destination.region} India)
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight text-white drop-shadow-md">
                {destination.name}
              </h2>
            </div>

            {/* Gallery thumbnails with captions */}
            {((destination.images && destination.images.length > 1) || (destination.gallery && destination.gallery.length > 1)) && (
              <div className="flex items-center gap-2 self-start sm:self-end">
                {(destination.images ? destination.images.map((img) => img.url) : destination.gallery || []).map((imgUrl, idx) => {
                  const caption = destination.images?.[idx]?.caption;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      title={caption || `Photo ${idx + 1}`}
                      className={`w-12 h-10 rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === imgUrl ? 'border-teal-400 scale-105 shadow-md' : 'border-white/50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={caption || "Thumbnail"} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Audio Tour Player Ribbon */}
        <div className="px-4 sm:px-6 pt-4 pb-2 bg-slate-50 border-b border-slate-200">
          <AudioTourPlayer
            text={
              language === 'hi'
                ? `${translatedDetails?.name || destination.name}. ${translatedDetails?.city || destination.city}. ${translatedDetails?.history || destination.history}. Ghoomne ki jagahen: ${translatedDetails?.attractions || destination.attractions}. Yahan ka mashhoor khana: ${translatedDetails?.food || destination.food}.`
                : `${destination.name}. ${destination.city}. ${destination.history}. Places to explore: ${destination.attractions}. Local food: ${destination.food}.`
            }
            title={translatedDetails?.name || destination.name}
            location={`${translatedDetails?.city || destination.city}, ${destination.state}`}
            language={language}
            listenNowLabel={t.listenNow}
            pauseLabel={t.pause}
            resumeLabel={t.resume}
            audioTourLabel={t.audioTour}
          />
        </div>

        {/* Dedicated Voice Narration Controls */}
        <div className="voice-controls px-4 sm:px-6 py-2.5 bg-gradient-to-r from-amber-50/70 via-white to-teal-50/60 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <label htmlFor="voiceLanguage" className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'hi' ? 'वॉयस नैरेशन:' : 'Voice Narration:'}</span>
            </label>
            <select
              id="voiceLanguage"
              value={voiceNarrationLang}
              onChange={(e) => setVoiceNarrationLang(e.target.value)}
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-800 rounded-lg px-2.5 py-1 text-xs font-medium shadow-2xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option value="en">English Narration</option>
              <option value="hi">हिंदी में सुनें</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (!destination) return;
                setIsPlayingVoice(true);
                playTravelStory(destination, voiceNarrationLang, {
                  onEnd: () => setIsPlayingVoice(false),
                  onError: () => setIsPlayingVoice(false),
                });
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition shadow-2xs active:scale-95 ${
                isPlayingVoice
                  ? 'bg-amber-500 text-slate-950 font-bold animate-pulse'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isPlayingVoice ? (language === 'hi' ? 'चल रहा है...' : 'Playing...') : '▶ Play Story'}</span>
            </button>

            <button
              onClick={() => {
                stopTravelStory();
                setIsPlayingVoice(false);
              }}
              className="px-3 py-1.5 rounded-lg font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center gap-1.5 transition shadow-2xs active:scale-95"
            >
              <Square className="w-3 h-3 fill-current" />
              <span>⏹ Stop</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 border-b border-slate-200 bg-white overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'history'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.storyAndHistory}</span>
          </button>

          <button
            onClick={() => setActiveTab('attractions')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'attractions'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{t.placesToExplore}</span>
          </button>

          <button
            onClick={() => setActiveTab('food')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'food'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>{t.localFood}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('ai');
              if (!deepStory && !loadingDeepStory) {
                handleFetchDeepStory();
              }
            }}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'ai'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{t.aiDeepLens}</span>
          </button>

          <button
            onClick={() => setActiveTab('logistics')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'logistics'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>{t.mapAndVisitTips}</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: History & Background */}
          {activeTab === 'history' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    {t.eraFounded}
                  </span>
                  <span className="font-bold text-slate-800 text-sm">
                    {destination.builtYearOrEra || 'Ancient Period'}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    {t.bestTimeToVisit}
                  </span>
                  <span className="font-bold text-slate-800 text-sm">
                    {destination.bestTime || (destination.bestSeason ? destination.bestSeason.split('(')[0] : 'Oct - Mar')}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    {t.recommendedDuration}
                  </span>
                  <span className="font-bold text-slate-800 text-sm">
                    {destination.idealDuration || '2 - 3 Days'}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    {t.regionLabel}
                  </span>
                  <span className="font-bold text-slate-800 text-sm">
                    {destination.region}
                  </span>
                </div>
              </div>

              {/* Main History (matches original prompt content) */}
              <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-amber-950 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                    {language === 'hi' ? 'ऐतिहासिक कहानी' : t.historicalBackground}
                  </h3>
                  {loadingTranslation && (
                    <span className="text-[11px] text-teal-700 flex items-center gap-1 font-medium animate-pulse">
                      <Sparkles className="w-3 h-3" /> Translating story...
                    </span>
                  )}
                </div>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  {translatedDetails?.history ||
                    (typeof destination.history === 'object' && destination.history
                      ? destination.history.details
                      : destination.history)}
                </p>
                {typeof destination.history === 'object' && destination.history?.dynasty && (
                  <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-amber-800">
                    <span className="font-semibold">Dynasty:</span> <span>{destination.history.dynasty}</span>
                    <span className="text-amber-400">•</span>
                    <span className="font-semibold">Ruler:</span> <span>{destination.history.ruler}</span>
                    <span className="text-amber-400">•</span>
                    <span className="font-semibold">Period:</span> <span>{destination.history.period}</span>
                  </div>
                )}
              </div>

              {/* Sacred Tradition & Legend if present */}
              {destination.legend && (
                <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-300/80 rounded-2xl p-5 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                    <h3 className="font-serif font-bold text-base sm:text-lg text-amber-950">
                      {language === 'hi' ? 'पौराणिक कथा व परंपरा' : 'Sacred Tradition & Legend'}
                    </h3>
                  </div>
                  <p className="text-slate-800 leading-relaxed text-sm sm:text-base italic">
                    "{destination.legend}"
                  </p>
                </div>
              )}

              {/* Multiple Stories & Folklore (e.g. Kakanmath Temple) */}
              {destination.stories && destination.stories.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                    <span>📜</span>
                    <span>Local Folklore & Heritage Stories</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {destination.stories.map((st) => (
                      <div key={st.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1.5">
                        <div className="flex items-center justify-between gap-1">
                          <h5 className="font-bold text-xs sm:text-sm text-slate-800">{st.title}</h5>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                            {st.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-4 hover:line-clamp-none transition">
                          {st.story}
                        </p>
                        {st.historicalStatus && (
                          <p className="text-[10px] text-slate-500 italic pt-1">
                            ℹ️ {st.historicalStatus}
                          </p>
                        )}
                        <div className="pt-2 flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (typeof (window as any).playKakanmathStory === 'function') {
                                (window as any).playKakanmathStory(st.id);
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-semibold transition flex items-center gap-1 active:scale-95 cursor-pointer shadow-xs"
                          >
                            <span>🔊 Listen to Story</span>
                          </button>
                          <button
                            onClick={() => {
                              if (typeof (window as any).stopKakanmathStory === 'function') {
                                (window as any).stopKakanmathStory();
                              }
                            }}
                            className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] font-semibold transition active:scale-95 cursor-pointer"
                          >
                            <span>⏹ Stop</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Varanasi Ghats Special Feature */}
              {destination.name.toLowerCase().includes('varanasi') && onExploreGhats && (
                <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-teal-950 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md border border-amber-700/50">
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-amber-500/30">
                      🌊 Ghats of Kashi Trail
                    </span>
                    <h4 className="font-serif font-bold text-base sm:text-lg text-amber-50">
                      Explore All 8 Sacred Riverfront Ghats
                    </h4>
                    <p className="text-xs text-amber-200/90 max-w-xl">
                      Discover Dashashwamedh, Assi, Manikarnika, Harishchandra, Panchganga, Kedar, Scindia, and Tulsi Ghats with audio guide & maps.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onExploreGhats();
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shrink-0 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <span>View 8 Ghats Trail</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Attractions Section in main view */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-teal-600" />
                    {language === 'hi' ? 'घूमने की जगहें' : t.placesToExplore}
                  </h3>
                  <button
                    onClick={() => setActiveTab('attractions')}
                    className="text-xs text-teal-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View all</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {Array.isArray(destination.attractions) ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {destination.attractions.map((att) => (
                      <span
                        key={att}
                        className="px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs sm:text-sm font-medium"
                      >
                        📍 {att}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {translatedDetails?.attractions || destination.attractions}
                  </p>
                )}
              </div>

              {/* Food Section in main view */}
              <div className="bg-amber-50/40 border border-amber-200/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-amber-950 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-amber-600" />
                    {language === 'hi' ? 'मशहूर स्थानीय खाना' : t.localFood}
                  </h3>
                  <button
                    onClick={() => setActiveTab('food')}
                    className="text-xs text-amber-800 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Food trail</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {Array.isArray(destination.localFood) ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {destination.localFood.map((dish, idx) => {
                      const name = typeof dish === 'object' ? dish.name : dish;
                      const desc = typeof dish === 'object' ? dish.description : undefined;
                      return (
                        <span
                          key={idx}
                          title={desc}
                          className="px-3 py-1.5 rounded-xl bg-amber-100/70 border border-amber-300 text-amber-950 text-xs sm:text-sm font-medium"
                        >
                          🍲 {name}{desc ? ` (${desc})` : ''}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {translatedDetails?.food || destination.food}
                  </p>
                )}
              </div>

              {/* Festivals & Traditions if present */}
              {destination.festivals && destination.festivals.length > 0 && (
                <div className="bg-purple-50/60 border border-purple-200/80 rounded-2xl p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-purple-950 font-bold text-sm sm:text-base font-serif">
                    <span>🎉 Festivals & Traditions</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {destination.festivals.map((fest) => (
                      <span
                        key={fest}
                        className="px-3 py-1.5 rounded-xl bg-purple-100/80 border border-purple-300 text-purple-900 text-xs sm:text-sm font-semibold shadow-2xs"
                      >
                        🎊 {fest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Travel Tips if present */}
              {destination.travelTips && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                    <span>🧳 Travel Tips</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                    {destination.travelTips}
                  </p>
                </div>
              )}

              {/* Nearby Places if present */}
              {destination.nearbyPlaces && destination.nearbyPlaces.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
                    <Compass className="w-4 h-4 text-teal-600" />
                    <span>{language === 'hi' ? 'आस-पास के दर्शनीय स्थल' : 'Nearby Places & Excursions'}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {destination.nearbyPlaces.map((np) => (
                      <span
                        key={np}
                        className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-2xs"
                      >
                        🚗 {np}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Map Section in main view matching details.append(..., map) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <span>{language === 'hi' ? 'मानचित्र व स्थान' : 'Destination Map & Location'}</span>
                  </h3>
                  <button
                    onClick={handleOpenMaps}
                    className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                <div className="w-full h-52 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                  <iframe
                    title={`${destination.name} Map`}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      destination.mapQuery || `${destination.name}, ${destination.city || destination.state}, India`
                    )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  />
                </div>
              </div>

              {/* Quick action to explore AI Deep Lens */}
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-teal-800 font-bold text-sm sm:text-base">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <span>Uncover Hidden Legends with TravelLens AI</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Discover secret trivia, sunrise sensory walkthroughs, and custom heritage itineraries.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('ai');
                    handleFetchDeepStory();
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 shrink-0 shadow-sm"
                >
                  <span>Explore AI Story</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Places to Explore (Attractions) */}
          {activeTab === 'attractions' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-1 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-teal-600" />
                  {language === 'hi' ? 'घूमने की जगहें' : t.placesToExplore}
                </h3>
                <p className="text-slate-600 text-sm">
                  {translatedDetails?.attractions || destination.attractions}
                </p>
              </div>

              {/* Formatted list if available */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {destination.attractionList && destination.attractionList.length > 0 ? (
                  destination.attractionList.map((attraction, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-teal-400 hover:shadow-sm transition flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">{attraction}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Recommended monument & photography stop</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm">
                    {translatedDetails?.attractions || destination.attractions}
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">Want to map out your day?</h5>
                    <p className="text-xs text-slate-600">Open exact monument coordinates on Google Maps</p>
                  </div>
                </div>
                <button
                  onClick={handleOpenMaps}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition shrink-0"
                >
                  <span>{language === 'hi' ? 'Google Maps पर देखें' : t.openGoogleMaps}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Local Food & Culinary Heritage */}
          {activeTab === 'food' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-1 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-amber-600" />
                  {language === 'hi' ? '🍛 स्थानीय खानपान' : t.localFood} - {translatedDetails?.name || destination.name}
                </h3>
                <p className="text-slate-600 text-sm">
                  {translatedDetails?.food || destination.food}
                </p>
              </div>

              {/* Food list */}
              {destination.foodList && destination.foodList.length > 0 ? (
                <div className="grid grid-cols-1 gap-3.5">
                  {destination.foodList.map((dish, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🍛</span>
                          <h4 className="font-bold text-slate-800 text-base">{dish.name}</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600">{dish.description}</p>
                      </div>
                      {dish.mustTryAt && (
                        <div className="sm:text-right shrink-0">
                          <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider block">
                            Iconic Spot
                          </span>
                          <span className="text-xs font-semibold text-slate-700">
                            {dish.mustTryAt}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-slate-700 text-sm">
                  {destination.food}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: AI Deep Lens (Gemini Powered) */}
          {activeTab === 'ai' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {loadingDeepStory ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
                  <p className="font-medium text-slate-700 text-sm">
                    Consulting TravelLens AI for deep folklore, architecture, and secret trivia...
                  </p>
                  <p className="text-xs text-slate-400">Grounded with Indian historical chronicles</p>
                </div>
              ) : deepStory ? (
                <div className="space-y-5">
                  {/* Headline */}
                  <div className="border-l-4 border-amber-500 pl-4 py-1">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                      AI Heritage Chronicle
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                      {deepStory.title}
                    </h4>
                  </div>

                  {/* Poetic Tale */}
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {deepStory.historicalTale}
                  </div>

                  {/* Secret Trivia */}
                  {deepStory.secretTrivia && deepStory.secretTrivia.length > 0 && (
                    <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-3">
                      <h5 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        Lesser-Known Secrets & Historical Trivia
                      </h5>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                        {deepStory.secretTrivia.map((fact, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Sensory Walkthrough */}
                  {deepStory.sensoryExperience && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1.5">
                      <h5 className="font-bold text-teal-900 text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-teal-600" />
                        Sensory Walkthrough (Sunrise / Twilight)
                      </h5>
                      <p className="text-xs sm:text-sm text-teal-950/80 leading-relaxed italic">
                        "{deepStory.sensoryExperience}"
                      </p>
                    </div>
                  )}

                  {/* Cultural Etiquette */}
                  {deepStory.culturalEtiquette && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <h5 className="font-semibold text-slate-800 text-xs sm:text-sm">
                        Respect & Cultural Etiquette for Visitors
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {deepStory.culturalEtiquette.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-2xl space-y-3">
                  <p className="text-sm text-slate-600">
                    Ready to discover the hidden stories, architecture, and legends of {destination.name}?
                  </p>
                  <button
                    onClick={handleFetchDeepStory}
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition shadow-sm"
                  >
                    Generate Deep Story with Gemini
                  </button>
                </div>
              )}

              {/* Itinerary Generator for this Destination */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      Generate Personalized Itinerary
                    </h4>
                    <p className="text-xs text-slate-500">
                      Hour-by-hour plan with secret sunrise spots and local meals
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleGenerateItinerary(2)}
                      disabled={loadingItinerary}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition active:scale-95 disabled:opacity-50"
                    >
                      {loadingItinerary ? 'Generating...' : '2-Day Plan'}
                    </button>
                    <button
                      onClick={() => handleGenerateItinerary(3)}
                      disabled={loadingItinerary}
                      className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-semibold transition active:scale-95 disabled:opacity-50"
                    >
                      {loadingItinerary ? 'Generating...' : '3-Day Plan'}
                    </button>
                  </div>
                </div>

                {customItinerary && (
                  <div className="space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-700">{customItinerary.summary}</p>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {customItinerary.estimatedBudgetPerDayINR}/day
                      </span>
                    </div>

                    <div className="space-y-3">
                      {customItinerary.days.map((day) => (
                        <div key={day.dayNumber} className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                          <h5 className="font-bold text-teal-800 text-xs uppercase tracking-wider">
                            Day {day.dayNumber}: {day.theme}
                          </h5>
                          <div className="space-y-2">
                            {day.slots.map((slot, sIdx) => (
                              <div key={sIdx} className="text-xs text-slate-600 pl-2 border-l-2 border-teal-300">
                                <span className="font-bold text-slate-800">{slot.time}</span> — {slot.activity}
                                <p className="text-slate-500 mt-0.5">{slot.description}</p>
                                <p className="text-amber-700 font-medium mt-0.5">🍴 Food: {slot.foodRecommendation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Chat trigger */}
              <div className="pt-2 text-center">
                <button
                  onClick={() => {
                    onClose();
                    onOpenConciergeWithDestination(destination.name);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-teal-700 hover:text-teal-800 hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Have specific questions about {destination.name}? Chat with AI Heritage Concierge &rarr;
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: Logistics & Maps */}
          {activeTab === 'logistics' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  Location & Directions
                </h4>
                <p className="text-slate-600 text-sm">
                  {destination.name} is situated in {destination.city}, {destination.state}.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-slate-800 text-sm block">
                      Google Maps Navigation
                    </span>
                    <span className="text-xs text-slate-500">
                      Open exact route, street view, and nearby heritage highlights
                    </span>
                  </div>
                  <button
                    onClick={handleOpenMaps}
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition shrink-0 shadow-sm"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Travel Season & Tips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <span>Best Time to Visit</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {destination.bestSeason || 'October to March offers mild weather and pleasant walking conditions.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                    <Clock className="w-4 h-4 text-teal-600" />
                    <span>Recommended Duration</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {destination.idealDuration || '2 - 3 Days'} allows comfortable exploration of monuments, food trails, and sunrise vistas.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Bar matching prompt action */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            {t.poweredBy}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenMaps}
              className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition"
            >
              <span>{t.openGoogleMaps}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition"
            >
              {t.done}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
