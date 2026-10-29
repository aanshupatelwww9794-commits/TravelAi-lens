import React, { useState } from 'react';
import { initialDestinations } from '../data/destinations';
import { ItineraryData } from '../types/travel';
import { Calendar, Sparkles, Loader2, X, Clock, MapPin, Copy, Check, Utensils, AlertCircle } from 'lucide-react';

interface AITripPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillDestination?: string;
  language?: string;
}

export const AITripPlannerModal: React.FC<AITripPlannerModalProps> = ({
  isOpen,
  onClose,
  prefillDestination,
  language = 'en',
}) => {
  const [destination, setDestination] = useState(prefillDestination || 'Varanasi, Uttar Pradesh');
  const [days, setDays] = useState(2);
  const [travelStyle, setTravelStyle] = useState('Heritage & History');
  const [budget, setBudget] = useState('Moderate');
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const travelStyles = [
    'Heritage & History',
    'Foodie & Street Food Crawl',
    'Spiritual & Peaceful',
    'Photography & Sunrise Spots',
    'Nature & Mountain Adventure',
    'Budget Explorer'
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    setLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const res = await fetch('/api/lens/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          days,
          travelStyle,
          budget,
          language,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setItinerary(data.data);
      } else {
        throw new Error(data.error || 'Failed to generate itinerary');
      }
    } catch (err: any) {
      console.error(err);
      setError('Unable to generate itinerary right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyItinerary = () => {
    if (!itinerary) return;
    let text = `🇮🇳 TravelLens AI Itinerary: ${destination} (${days} Days - ${travelStyle})\n\n`;
    text += `Overview: ${itinerary.summary}\nEstimated Budget: ${itinerary.estimatedBudgetPerDayINR}/day\n\n`;

    itinerary.days.forEach((day) => {
      text += `DAY ${day.dayNumber}: ${day.theme}\n`;
      day.slots.forEach((s) => {
        text += `• ${s.time}: ${s.activity}\n  ${s.description}\n  Food: ${s.foodRecommendation}\n`;
      });
      text += '\n';
    });

    text += `Transit Tip: ${itinerary.localTransportTip}\n`;
    text += `Travel Tip: ${itinerary.safetyAndComfort}\n`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col my-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-1.5">
                <span>AI Trip Planner</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-400 text-slate-950">
                  Custom Itinerary
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Craft hour-by-hour journeys across Incredible India
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
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          <form onSubmit={handleGenerate} className="space-y-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Destination */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Destination / City
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Taj Mahal, Varanasi, Udaipur, Kerala"
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Days */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Trip Duration
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 5].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDays(d)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition ${
                        days === d
                          ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {d} {d === 1 ? 'Day' : 'Days'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Travel Vibe
                </label>
                <select
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-teal-500"
                >
                  {travelStyles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Budget Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Budget', 'Moderate', 'Luxury'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition ${
                        budget === b
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-sm transition shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Planning Your Journey...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Itinerary</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Generated Itinerary Output */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {itinerary && (
            <div className="space-y-6 animate-in fade-in">
              {/* Summary Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 via-sky-50 to-emerald-50 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
                    Curated Journey Overview
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">
                    {itinerary.summary}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Est. {itinerary.estimatedBudgetPerDayINR}/day
                  </span>
                  <button
                    onClick={handleCopyItinerary}
                    className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 transition"
                    title="Copy Itinerary"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Day Cards */}
              <div className="space-y-4">
                {itinerary.days.map((day) => (
                  <div
                    key={day.dayNumber}
                    className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden"
                  >
                    <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
                      <h4 className="font-bold text-sm flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-teal-400 text-slate-950 text-xs font-extrabold flex items-center justify-center">
                          {day.dayNumber}
                        </span>
                        <span>Day {day.dayNumber}: {day.theme}</span>
                      </h4>
                    </div>

                    <div className="p-4 space-y-3.5">
                      {day.slots.map((slot, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-teal-800 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-teal-600" />
                              {slot.time}
                            </span>
                            <span className="font-semibold text-slate-800 text-right">
                              {slot.activity}
                            </span>
                          </div>

                          <p className="text-slate-600 leading-relaxed pt-1">
                            {slot.description}
                          </p>

                          {slot.foodRecommendation && (
                            <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 flex items-center gap-1.5 text-amber-800 font-medium">
                              <Utensils className="w-3 h-3 text-amber-600 shrink-0" />
                              <span>Food: {slot.foodRecommendation}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Transit & Safety */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-950 flex items-center gap-1">
                    🚕 Local Transport Advice
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {itinerary.localTransportTip}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200 space-y-1">
                  <span className="font-bold text-teal-950 flex items-center gap-1">
                    🛡️ Safety & Travel Tips
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {itinerary.safetyAndComfort}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
