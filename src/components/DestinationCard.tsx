import React, { useState } from 'react';
import { Destination } from '../types/travel';
import { MapPin, Heart, BookOpen, Utensils, Award, ExternalLink, Volume2, Square } from 'lucide-react';
import { TranslationDictionary } from '../i18n/translations';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (dest: Destination) => void;
  isWishlisted: boolean;
  onToggleWishlist: (dest: Destination) => void;
  language?: string;
  t: TranslationDictionary;
  isSpeaking?: boolean;
  onToggleSpeak?: (dest: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onSelect,
  isWishlisted,
  onToggleWishlist,
  language = 'en',
  t,
  isSpeaking = false,
  onToggleSpeak,
}) => {
  const [imageError, setImageError] = useState(false);

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'Historical':
        return 'bg-blue-500/10 text-blue-700 border-blue-300';
      case 'Nature':
        return 'bg-emerald-500/10 text-emerald-700 border-emerald-300';
      case 'Spiritual':
        return 'bg-purple-500/10 text-purple-700 border-purple-300';
      case 'Temple':
        return 'bg-amber-500/10 text-amber-700 border-amber-300';
      case 'Wildlife':
        return 'bg-teal-500/10 text-teal-700 border-teal-300';
      case 'Adventure':
        return 'bg-orange-500/10 text-orange-700 border-orange-300';
      case 'Beach':
        return 'bg-cyan-500/10 text-cyan-700 border-cyan-300';
      case 'Cultural':
        return 'bg-rose-500/10 text-rose-700 border-rose-300';
      default:
        return 'bg-slate-500/10 text-slate-700 border-slate-300';
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'Historical':
        return t.historical;
      case 'Nature':
        return t.nature;
      case 'Spiritual':
        return t.spiritual;
      case 'Cultural':
        return t.cultural;
      default:
        return cat;
    }
  };

  const handleOpenMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    const query = encodeURIComponent(
      destination.mapQuery || `${destination.name} ${destination.city || destination.state} India`
    );
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  const rawCategory = Array.isArray(destination.category)
    ? (destination.category[0] || 'Temple')
    : (destination.category || 'Historical');

  return (
    <div
      onClick={() => onSelect(destination)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
    >
      {/* Image Area */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
        {!imageError ? (
          <img
            src={destination.image}
            alt={destination.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-slate-800 to-teal-900 text-teal-200 p-4 text-center">
            <span className="text-3xl mb-1">🏛️</span>
            <span className="font-semibold text-sm">{destination.name}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md shadow-sm ${getCategoryTheme(
                rawCategory
              )} bg-white/90`}
            >
              {getCategoryLabel(rawCategory)}
            </span>
            {destination.unescoHeritage && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/90 text-slate-950 backdrop-blur-md flex items-center gap-1 shadow-sm">
                <Award className="w-3 h-3" />
                UNESCO
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(destination);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition shadow-md active:scale-90 ${
              isWishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-black/40 text-white/90 hover:bg-black/60 hover:text-white'
            }`}
            title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Overlay Labels */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="text-xs font-medium text-teal-200 flex items-center gap-1 drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-teal-300" />
            {destination.city ? `${destination.city}, ${destination.state}` : destination.state}
          </p>
          <h3 className="text-lg sm:text-xl font-bold font-serif leading-tight drop-shadow-sm group-hover:text-teal-200 transition">
            {destination.name}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
        {/* Short snippets */}
        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {destination.description ||
              destination.introduction ||
              (typeof destination.history === 'object' && destination.history
                ? destination.history.details
                : destination.history)}
          </p>

          <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
            <div className="flex items-start gap-1.5">
              <span className="font-semibold text-slate-700 shrink-0">📍 {t.placesToExplore}:</span>
              <span className="text-slate-600 line-clamp-1">
                {Array.isArray(destination.attractions)
                  ? destination.attractions.join(', ')
                  : destination.attractions}
              </span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="font-semibold text-slate-700 shrink-0 flex items-center gap-1">
                <Utensils className="w-3 h-3 text-amber-600" /> {t.localFood}:
              </span>
              <span className="text-slate-600 line-clamp-1">
                {destination.food ||
                  (Array.isArray(destination.localFood)
                    ? destination.localFood.join(', ')
                    : destination.localFood)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => onSelect(destination)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm transition shadow-sm active:scale-95"
          >
            <BookOpen className="w-4 h-4" />
            <span>{language === 'hi' ? 'पूरी कहानी देखें' : t.discoverStory}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSpeak?.(destination);
            }}
            className={`p-2.5 rounded-xl border transition flex items-center justify-center active:scale-95 ${
              isSpeaking
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-sm animate-pulse'
                : 'border-slate-200 hover:border-teal-400 hover:bg-teal-50 text-slate-700 hover:text-teal-700'
            }`}
            title={
              isSpeaking
                ? (language === 'hi' ? 'आवाज़ रोकें (Stop)' : 'Stop Narration')
                : (language === 'hi' ? 'कहानी सुनें (Hindi Voice)' : 'Listen Story (Voice Narration)')
            }
            aria-label="Voice Narration"
          >
            {isSpeaking ? (
              <Square className="w-4 h-4 fill-current text-slate-950" />
            ) : (
              <Volume2 className="w-4 h-4 text-teal-600" />
            )}
          </button>

          <button
            onClick={handleOpenMaps}
            className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 hover:text-teal-700 transition"
            title={language === 'hi' ? 'Google Maps पर देखें' : t.openGoogleMaps}
            aria-label="Google Maps"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
