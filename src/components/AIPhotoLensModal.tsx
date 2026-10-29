import React, { useState, useRef } from 'react';
import { PhotoAnalysisData } from '../types/travel';
import { Camera, Upload, X, Sparkles, Loader2, MapPin, Landmark, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';

interface AIPhotoLensModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectIdentifiedDestination?: (destName: string) => void;
}

export const AIPhotoLensModal: React.FC<AIPhotoLensModalProps> = ({ isOpen, onClose, onSelectIdentifiedDestination }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<PhotoAnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // Sample presets for quick testing
  const samplePresets = [
    {
      title: 'Hampi Stone Chariot',
      image: 'https://images.unsplash.com/photo-1600100397608-f010e9e0f0d5?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Taj Mahal Marble Inlay',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Varanasi Ghats at Dawn',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Jaipur Hawa Mahal Lattice',
      image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, or WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSelectedImage(result);
      analyzePhoto(result, file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = async (preset: { title: string; image: string }) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedImage(preset.image);

      // Fetch sample image and convert to base64
      const res = await fetch(preset.image);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        analyzePhoto(base64, blob.type || 'image/jpeg');
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      console.error(e);
      // Fallback
      analyzePhoto('', 'image/jpeg');
    }
  };

  const analyzePhoto = async (base64Data: string, mimeType: string) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const res = await fetch('/api/lens/analyze-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Data, mimeType }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setAnalysis(data.data);
      } else {
        throw new Error(data.error || 'Failed to analyze image');
      }
    } catch (err: any) {
      console.error('Error analyzing image:', err);
      setError('Could not complete photo analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setAnalysis(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col my-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-1.5">
                <span>AI Photo Lens</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-teal-400 text-slate-950">
                  Visual AI
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Identify monuments, temples & delicacies from any photo
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
          {!selectedImage ? (
            <div className="space-y-6">
              {/* Drop / Upload Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl p-8 text-center cursor-pointer hover:bg-teal-50/30 transition group flex flex-col items-center justify-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-600 group-hover:scale-110 transition-transform flex items-center justify-center border border-teal-200">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm sm:text-base">
                    Upload a monument, temple, or food photo
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Drag and drop or click to browse (JPG, PNG, WebP)
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Presets */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Or test with iconic Indian landmarks:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {samplePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPreset(preset)}
                      className="group relative rounded-xl overflow-hidden aspect-video border border-slate-200 hover:border-teal-500 text-left shadow-xs transition active:scale-95"
                    >
                      <img
                        src={preset.image}
                        alt={preset.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                        <span className="text-[11px] font-semibold text-white leading-tight">
                          {preset.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Preview image and reset */}
              <div className="relative rounded-2xl overflow-hidden max-h-64 bg-slate-900 border border-slate-200 shadow-sm flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Scanned photo"
                  className="max-h-64 w-full object-contain"
                />
                <button
                  onClick={handleReset}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Choose Another</span>
                </button>
              </div>

              {/* Status or Analysis */}
              {loading ? (
                <div className="p-8 text-center space-y-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <Loader2 className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
                  <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                    Gemini AI is analyzing the architecture and landmark...
                  </h4>
                  <p className="text-xs text-slate-500">
                    Scanning architectural elements, dynastic stone carvings, and cultural records
                  </p>
                </div>
              ) : error ? (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              ) : analysis ? (
                <div className="space-y-4 animate-in fade-in">
                  {/* Identified Header */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200">
                    <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
                      Identified Landmark / Subject
                    </span>
                    <h3 className="text-xl font-bold font-serif text-slate-900">
                      {analysis.identifiedName}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      {analysis.location} •{' '}
                      <span className="text-teal-700 font-bold">{analysis.category}</span>
                    </p>
                  </div>

                  {/* Architecture & Era */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-700 flex items-center gap-1">
                        <Landmark className="w-3.5 h-3.5 text-amber-600" />
                        Architectural Style / Heritage
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        {analysis.architecturalOrStyleHighlights}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-700 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        Historical Era / Dynasty
                      </span>
                      <p className="text-slate-600 leading-relaxed">{analysis.historicalEra}</p>
                    </div>
                  </div>

                  {/* Fascinating Story */}
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                    <h5 className="font-bold text-amber-950 text-xs sm:text-sm flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      Fascinating Legend & Story
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {analysis.fascinatingStory}
                    </p>
                  </div>

                  {/* Visitor Tip */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                    <span className="text-teal-600 font-bold shrink-0">💡 Visitor Tip:</span>
                    <span>{analysis.visitorTip}</span>
                  </div>
                </div>
              ) : null}
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
