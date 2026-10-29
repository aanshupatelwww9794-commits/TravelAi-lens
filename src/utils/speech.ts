import { Destination } from '../types/travel';

// =====================================
// ANVESHA AI - INDIAN VOICE GUIDE
// =====================================

export let indianVoices: SpeechSynthesisVoice[] = [];

export function loadIndianVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  indianVoices = window.speechSynthesis.getVoices();
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadIndianVoices();
  window.speechSynthesis.onvoiceschanged = loadIndianVoices;
}

// Find the best available voice
export function getIndianVoice(language: string, gender: string): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();

  // Prefer Indian voices for the selected language.
  const indianLanguageVoices = voices.filter((voice) =>
    voice.lang.toLowerCase() === language.toLowerCase()
  );

  // Some devices use different regional language codes.
  const regionalVoices = voices.filter((voice) =>
    voice.lang.toLowerCase().startsWith(
      language.split('-')[0].toLowerCase()
    )
  );

  const candidates =
    indianLanguageVoices.length
      ? indianLanguageVoices
      : regionalVoices;

  if (!candidates.length) {
    return null;
  }

  // Browsers generally do not expose a reliable voice-gender field.
  // These name hints are only best-effort guesses.
  const femaleHints = [
    'female', 'woman', 'heera', 'priya',
    'neerja', 'lekha', 'google हिन्दी', 'swara', 'samantha', 'zira'
  ];

  const maleHints = [
    'male', 'man', 'ravi', 'amit',
    'hemant', 'rahul', 'david', 'prabhat', 'rishi'
  ];

  const hints = gender === 'female'
    ? femaleHints
    : maleHints;

  const matchedVoice = candidates.find((voice) => {
    const name = voice.name.toLowerCase();
    return hints.some((hint) => name.includes(hint));
  });

  return matchedVoice || candidates[0];
}

// Play a destination story - Anvesha AI
export function speakPlace(
  name: string,
  placesList?: Destination[],
  callbacks?: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err?: any) => void;
  }
) {
  if (typeof window === 'undefined') return;

  const places: Destination[] =
    placesList ||
    (window as any).places ||
    (window as any).destinations ||
    [];

  const place =
    places.find((p: any) => p.name === name) ||
    places.find(
      (p: any) =>
        (p.name && p.name.toLowerCase() === String(name).toLowerCase()) ||
        String(p.id) === String(name)
    );

  if (!place) return;

  if (!("speechSynthesis" in window)) {
    try {
      alert("Voice is not supported in this browser.");
    } catch {
      console.warn("Voice is not supported in this browser.");
    }
    return;
  }

  window.speechSynthesis.cancel();

  const langEl = document.getElementById("language") as HTMLSelectElement | null;
  const genderEl = document.getElementById("voiceGender") as HTMLSelectElement | null;

  const language = langEl ? langEl.value : "en-IN";
  const gender = genderEl ? genderEl.value : "female";

  const historyText =
    typeof place.history === 'object' && place.history
      ? (place.history as any).details || ''
      : (place.history || '');

  const descText = place.description || (place as any).introduction || '';
  const legendText = place.legend || (Array.isArray((place as any).stories) ? (place as any).stories[1]?.story || (place as any).stories[0]?.story : '') || '';
  const mysteryText = (place as any).mystery || '';

  const text = `
    Welcome to Travel Lens AI. Don't just visit a place, discover its story.
    You are exploring ${place.name}.
    ${descText}
    ${historyText}
    ${legendText}
    ${mysteryText}
  `;

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();

  // Prefer an Indian English or Hindi voice.
  const matchingVoices = voices.filter((voice) =>
    voice.lang.toLowerCase() === language.toLowerCase()
  );

  // Gender cannot be reliably detected from browser voice metadata.
  // Use an available Indian voice; do not assume pitch creates gender.
  const voice =
    matchingVoices[0] ||
    voices.find((v) =>
      v.lang.toLowerCase().startsWith(language.split("-")[0].toLowerCase())
    );

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = language;
  }

  utterance.rate = 0.88;
  utterance.pitch = 1;
  utterance.volume = 1;

  utterance.onstart = () => {
    callbacks?.onStart?.();
  };

  utterance.onend = () => {
    callbacks?.onEnd?.();
  };

  utterance.onerror = (event) => {
    if (event.error === 'interrupted' || event.error === 'canceled') {
      callbacks?.onEnd?.();
      return;
    }
    console.warn("Voice notice:", event.error);
    callbacks?.onError?.(event);
  };

  window.speechSynthesis.speak(utterance);
  return utterance;
}

// Stop narration
export function stopVoice() {
  if (typeof window !== 'undefined' && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

// Display voices available on the device
export function showAvailableVoices() {
  if (typeof window === 'undefined' || !("speechSynthesis" in window)) {
    try {
      alert("Your browser does not support voice narration.");
    } catch {
      console.warn("Your browser does not support voice narration.");
    }
    return;
  }

  const voices = window.speechSynthesis.getVoices();

  const indianVoicesList = voices.filter((voice) =>
    /en-IN|hi-IN/i.test(voice.lang)
  );

  const langSelect = document.getElementById("language") as HTMLSelectElement | null;
  const genderSelect = document.getElementById("voiceGender") as HTMLSelectElement | null;
  const targetLang = langSelect ? langSelect.value : "en-IN";
  const targetGender = genderSelect ? (genderSelect.value as 'female' | 'male') : "female";

  const sampleText = targetLang.startsWith("hi")
    ? "नमस्ते! ट्रेवल लेंस एआई में आपका स्वागत है। किसी जगह पर केवल मत जाइए, उसकी कहानी जानिए।"
    : "Welcome to Travel Lens AI. Don't just visit a place, discover its story.";

  speakText(sampleText, targetLang, {
    gender: targetGender,
    rate: 0.88,
  });

  const notif = document.getElementById("voiceStatusNotification");
  if (notif) {
    const listDisplay = (indianVoicesList.length > 0 ? indianVoicesList : voices.slice(0, 4))
      .map((v) => `• ${v.name} (${v.lang})`)
      .join("\n");

    notif.innerHTML = `
      <div class="mt-2 p-3 bg-slate-900 text-white rounded-xl border border-teal-500/40 text-xs shadow-lg animate-in fade-in">
        <p class="font-bold text-teal-300">🎙️ Travel Lens AI Voice Guide: ${targetLang} (${targetGender === 'female' ? 'Indian Female' : 'Indian Male'})</p>
        <p class="text-[11px] text-slate-300 mt-1 whitespace-pre-line max-h-24 overflow-y-auto">${listDisplay || 'Default system voice'}</p>
      </div>
    `;
    setTimeout(() => {
      if (notif) notif.innerHTML = '';
    }, 7000);
  }

  if (!indianVoicesList.length) {
    try {
      alert(
        "Indian voices are not currently available. " +
        "Check your device's text-to-speech settings."
      );
    } catch {
      console.warn("Indian voices are not currently available.");
    }
    return;
  }

  const message = indianVoicesList
    .map((voice) => `${voice.name} (${voice.lang})`)
    .join("\n");

  try {
    alert("Available Indian voices:\n\n" + message);
  } catch {
    console.log("Available Indian voices:\n\n" + message);
  }
}

export function getTravelStoryText(place: Destination, language: string = 'en'): string {
  const city = place.city || place.state;
  const attractions = Array.isArray(place.attractions)
    ? place.attractions.join(', ')
    : (place.attractions || '');
  const food = place.food || (Array.isArray(place.localFood) ? place.localFood.map((f: any) => typeof f === 'object' ? f.name : f).join(', ') : (place.localFood || ''));
  const historyText = typeof place.history === 'object' && place.history ? (place.history as any).details : (place.history || '');

  if (language === 'hi') {
    return `${place.name}. ${city}. ${historyText}. \nGhoomne ki jagahen: ${attractions}. \nYahan ka mashhoor khana: ${food}.`;
  }
  return `${place.name}. ${city}. ${historyText}. \nPlaces to explore: ${attractions}. \nLocal food: ${food}.`;
}

// TravelLens AI - Hindi & English Voice Narration
export function speakText(
  text: string,
  language: string = 'hi-IN',
  options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    gender?: 'female' | 'male';
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err?: any) => void;
  }
): SpeechSynthesisUtterance | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return null;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);

  let selectedGender = options?.gender;
  if (!selectedGender && typeof document !== 'undefined') {
    const genderEl = document.getElementById('voiceGender') as HTMLSelectElement | null;
    if (genderEl && (genderEl.value === 'female' || genderEl.value === 'male')) {
      selectedGender = genderEl.value as 'female' | 'male';
    }
  }

  speech.lang = language;
  speech.rate = options?.rate ?? 0.88;
  speech.pitch = options?.pitch ?? (selectedGender === 'female' ? 1.08 : selectedGender === 'male' ? 0.92 : 1);
  speech.volume = options?.volume ?? 1;

  if (options?.onStart) speech.onstart = options.onStart;
  if (options?.onEnd) speech.onend = options.onEnd;
  speech.onerror = (e) => {
    if (e.error === 'interrupted' || e.error === 'canceled') {
      options?.onEnd?.();
      return;
    }
    options?.onError?.(e);
  };

  const matchedVoice = getIndianVoice(language, selectedGender || 'female');
  if (matchedVoice) {
    speech.voice = matchedVoice;
    speech.lang = matchedVoice.lang;
  }

  window.speechSynthesis.speak(speech);
  return speech;
}

// Read the selected destination's story
export function playTravelStory(
  place: Destination,
  language: string = 'en',
  options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err?: any) => void;
  }
) {
  return speakPlace(place.name, undefined, options);
}

// Stop narration
export function stopTravelStory() {
  stopVoice();
}
