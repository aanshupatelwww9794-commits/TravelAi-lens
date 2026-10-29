import React from 'react';
import { Destination } from '../types/travel';
import { Heart, X, Trash2, MapPin, ExternalLink, Calendar, BookOpen, Share2 } from 'lucide-react';

import { TranslationDictionary } from '../i18n/translations';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Destination[];
  onRemove: (destId: string | number) => void;
  onClear: () => void;
  onSelectDestination: (dest: Destination) => void;
  onPlanTripFromWishlist: () => void;
  t: TranslationDictionary;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemove,
  onClear,
  onSelectDestination,
  onPlanTripFromWishlist,
  t,
}) => {
  if (!isOpen) return null;

  const handleCopyList = () => {
    if (wishlist.length === 0) return;
    const text = `🇮🇳 My Incredible India Bucket List (TravelLens AI):\n\n` +
      wishlist.map((d, i) => `${i + 1}. ${d.name} (${d.city || d.state}) - Must Eat: ${d.food || (Array.isArray(d.localFood) ? d.localFood.join(', ') : '')}`).join('\n');
    navigator.clipboard.writeText(text);
    alert('Wishlist copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-base">{t.savedBucketList}</h3>
              <p className="text-xs text-slate-400">
                {wishlist.length} {t.placesSaved}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {wishlist.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-400 mx-auto flex items-center justify-center">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">{t.savedBucketList}</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                {t.emptyBucketList}
              </p>
            </div>
          ) : (
            wishlist.map((dest) => (
              <div
                key={dest.id}
                className="group relative bg-white rounded-2xl p-3.5 border border-slate-200 hover:border-teal-400 shadow-xs flex items-center gap-3 transition"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onSelectDestination(dest);
                  }}
                />

                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => {
                  onClose();
                  onSelectDestination(dest);
                }}>
                  <h4 className="font-bold text-sm text-slate-900 truncate group-hover:text-teal-700 transition">
                    {dest.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
                    {dest.city ? `${dest.city}, ${dest.state}` : dest.state}
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {dest.category}
                  </span>
                </div>

                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => onRemove(dest.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {wishlist.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-200 space-y-2 shrink-0">
            <button
              onClick={() => {
                onClose();
                onPlanTripFromWishlist();
              }}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.createItineraryAI}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyList}
                className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{t.copyList}</span>
              </button>

              <button
                onClick={onClear}
                className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-500 text-xs font-semibold transition"
              >
                {t.clearAll}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
