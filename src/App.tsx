import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { initialDestinations, kakanmathTemple, thaweMandir } from './data/destinations';
import { Destination } from './types/travel';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { DestinationCard } from './components/DestinationCard';
import { StoryModal } from './components/StoryModal';
import { AIPhotoLensModal } from './components/AIPhotoLensModal';
import { AITripPlannerModal } from './components/AITripPlannerModal';
import { AIChatDrawer } from './components/AIChatDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { getTranslation } from './i18n/translations';
import { Sparkles, Compass, RefreshCw, Award, Utensils, Volume2, Waves } from 'lucide-react';
import {
  speakText,
  playTravelStory,
  stopTravelStory,
  getIndianVoice,
  speakPlace,
  stopVoice,
  showAvailableVoices,
  loadIndianVoices,
  indianVoices,
} from './utils/speech';
import { varanasiGhats } from './data/varanasiGhats';
import { VaranasiGhat } from './types/travel';
import { VaranasiGhatsTrail } from './components/VaranasiGhatsTrail';
import { GhatStoryModal } from './components/GhatStoryModal';
import { Db2StatusModal } from './components/Db2StatusModal';

export default function App() {
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [speakingDestinationId, setSpeakingDestinationId] = useState<string | number | null>(null);
  const [activeView, setActiveView] = useState<'destinations' | 'ghats'>('destinations');
  const [selectedGhat, setSelectedGhat] = useState<VaranasiGhat | null>(null);

  // IBM Db2 Live Status State
  const [db2Status, setDb2Status] = useState<{
    configured: boolean;
    connected: boolean;
    source: 'ibm_db2' | 'fallback_local_cache';
    message: string;
    serverTime?: string;
    serverName?: string;
    latencyMs?: number;
    error?: string;
  }>({
    configured: false,
    connected: false,
    source: 'fallback_local_cache',
    message: 'Checking IBM Db2 status...',
  });
  const [isDb2ModalOpen, setIsDb2ModalOpen] = useState(false);

  // Multi-Language State (persisted in localStorage)
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    try {
      return localStorage.getItem('travellens_language') || 'en';
    } catch {
      return 'en';
    }
  });

  const t = useMemo(() => getTranslation(currentLanguage), [currentLanguage]);

  const handleLanguageChange = (lang: string) => {
    stopTravelStory();
    setSpeakingDestinationId(null);
    setCurrentLanguage(lang);
    try {
      localStorage.setItem('travellens_language', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  // Modals and Drawers
  const [isPhotoLensOpen, setIsPhotoLensOpen] = useState(false);
  const [isTripPlannerOpen, setIsTripPlannerOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [conciergeContext, setConciergeContext] = useState<string>('');
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Wishlist persisted in localStorage
  const [wishlist, setWishlist] = useState<Destination[]>(() => {
    try {
      const saved = localStorage.getItem('travellens_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('travellens_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Fetch IBM Db2 status and live destinations
  const fetchDb2Status = useCallback(async () => {
    try {
      const res = await fetch('/api/db2/status');
      const data = await res.json();
      if (data) {
        setDb2Status({
          configured: Boolean(data.configured),
          connected: Boolean(data.connected),
          source: data.source || 'fallback_local_cache',
          message: data.message || '',
          serverTime: data.serverTime,
          serverName: data.serverName,
          latencyMs: data.latencyMs,
          error: data.error,
        });
      }
    } catch (err: any) {
      console.warn('Db2 status check note:', err?.message || err);
      setDb2Status((prev) => ({
        ...prev,
        connected: false,
        source: 'fallback_local_cache',
        message: 'Could not reach backend API endpoint. Running in offline fallback mode.',
      }));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchDb2Status();

    // Fetch destinations from /api/destinations
    fetch('/api/destinations')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data?.success && Array.isArray(data.destinations) && data.destinations.length > 0) {
          setDestinations(data.destinations);
        }
      })
      .catch((err) => {
        console.warn('Notice loading destinations from API, using local dataset:', err?.message || err);
      });

    return () => {
      isMounted = false;
    };
  }, [fetchDb2Status]);

  // Wishlist toggle
  const handleToggleWishlist = (dest: Destination) => {
    setWishlist((prev) => {
      const exists = prev.some((d) => String(d.id) === String(dest.id));
      if (exists) {
        return prev.filter((d) => String(d.id) !== String(dest.id));
      } else {
        return [...prev, dest];
      }
    });
  };

  const handleOpenConciergeWithDestination = (destName: string) => {
    setConciergeContext(destName);
    setIsConciergeOpen(true);
  };

  // Translation cache per language
  const [langCache, setLangCache] = useState<Record<string, Record<string, Destination>>>({});
  const [translatedMap, setTranslatedMap] = useState<Record<string, Destination>>({});
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translationError, setTranslationError] = useState<string | null>(null);

  // Translation effect on language change
  useEffect(() => {
    // Keep the original data unchanged when English is selected.
    if (currentLanguage === 'en') {
      setTranslatedMap({});
      setIsTranslating(false);
      setTranslationError(null);
      return;
    }

    if (langCache[currentLanguage]) {
      setTranslatedMap(langCache[currentLanguage]);
      setIsTranslating(false);
      setTranslationError(null);
      return;
    }

    let isMounted = true;
    setIsTranslating(true);
    setTranslationError(null);

    fetch('/api/lens/batch-translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        places: destinations,
        targetLang: currentLanguage,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Translation service unavailable');
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        if (data.translatedPlaces) {
          const map: Record<string, Destination> = {};
          data.translatedPlaces.forEach((tp: Destination) => {
            map[tp.id] = tp;
          });
          setLangCache((prev) => ({ ...prev, [currentLanguage]: map }));
          setTranslatedMap(map);
        }
      })
      .catch((err) => {
        console.warn('Batch translation note:', err?.message || err);
        if (isMounted) {
          setTranslationError(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsTranslating(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentLanguage, destinations, langCache]);

  // Expose window.translatePage, speakText, playTravelStory, and stopTravelStory
  useEffect(() => {
    (window as any).translatePage = () => {
      const langEl = document.getElementById('language') as HTMLSelectElement | null;
      if (langEl) {
        const val = langEl.value;
        const code = val.startsWith('hi') ? 'hi' : val.startsWith('en') ? 'en' : val;
        handleLanguageChange(code);
      }
    };
    (window as any).speakText = (text: string, language: string = 'hi-IN') => {
      return speakText(text, language);
    };
    (window as any).playTravelStory = (place: Destination, language: string = 'en') => {
      if (!place) return;
      setSpeakingDestinationId(place.id);
      return playTravelStory(place, language, {
        onEnd: () => setSpeakingDestinationId(null),
        onError: () => setSpeakingDestinationId(null),
      });
    };
    (window as any).stopTravelStory = () => {
      stopTravelStory();
      setSpeakingDestinationId(null);
    };

    // Expose destinations, Varanasi Ghats, Kakanmath Temple, Thawe Mandir, and story viewer functions
    (window as any).destinations = destinations;
    (window as any).kakanmathTemple = kakanmathTemple;
    (window as any).thaweMandir = thaweMandir;
    (window as any).varanasiGhats = varanasiGhats;
    (window as any).showVaranasiGhats = () => {
      setActiveView('ghats');
      const container = document.getElementById('places');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth' });
      }
    };
    (window as any).showGhatStory = (index: number) => {
      const ghat = varanasiGhats[index];
      if (ghat) {
        setSelectedGhat(ghat);
      }
    };
  }, [destinations]);

  // Exact user specification: searchDestinations(query)
  const searchDestinations = useCallback((query: string) => {
    const searchText = (query || '').toLowerCase().trim();
    if (!searchText) return destinations;

    return destinations.filter((place) => {
      const categoryStr = Array.isArray(place.category) ? place.category.join(' ') : (place.category || '');
      const historyStr = typeof place.history === 'object' && place.history ? (place.history.details || '') : (place.history || '');
      const alternateNamesStr = Array.isArray(place.alternateNames) ? place.alternateNames.join(' ') : '';
      const attractionsArr = Array.isArray(place.attractions) ? place.attractions : [place.attractions || ''];
      const foodArr = Array.isArray(place.localFood)
        ? place.localFood.map((f) => (typeof f === 'object' ? f.name : f))
        : [place.localFood || place.food || ''];
      const nearbyArr = Array.isArray(place.nearbyPlaces)
        ? place.nearbyPlaces
        : [place.nearbyPlaces || ''];

      const searchableText = [
        place.name,
        alternateNamesStr,
        place.state,
        place.district || '',
        place.village || '',
        place.region,
        categoryStr,
        place.description || place.introduction || '',
        historyStr,
        ...attractionsArr,
        ...foodArr,
        ...nearbyArr
      ].join(" ").toLowerCase();

      return searchableText.includes(searchText);
    });
  }, [destinations]);

  // Exact user specification: openDestinationMap(id)
  const openDestinationMap = useCallback((id: string | number) => {
    const place = destinations.find((item) => item.id === id || String(item.id) === String(id));
    if (!place) return;

    const url =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(place.mapQuery || `${place.name} ${place.city || place.state} India`);

    window.open(url, "_blank", "noopener,noreferrer");
  }, [destinations]);

  // Exact user specification: speakPlace(name) - Anvesha AI Indian Voice Guide
  const handleSpeakPlace = useCallback((name: string) => {
    const place = destinations.find(
      (p) =>
        p.name === name ||
        p.name.toLowerCase() === (name || '').toLowerCase() ||
        String(p.id) === String(name)
    );
    if (place) {
      setSpeakingDestinationId(place.id);
    }
    return speakPlace(name, destinations, {
      onStart: () => {
        if (place) setSpeakingDestinationId(place.id);
      },
      onEnd: () => setSpeakingDestinationId(null),
      onError: () => setSpeakingDestinationId(null),
    });
  }, [destinations]);

  // Exact user specification: stopVoice() - Anvesha AI Indian Voice Guide
  const handleStopVoice = useCallback(() => {
    stopVoice();
    setSpeakingDestinationId(null);
  }, []);

  // Exact user specification: speakDestination(id)
  const speakDestination = useCallback((id: string | number) => {
    const place = destinations.find((item) => item.id === id || String(item.id) === String(id));
    if (!place) return;
    return handleSpeakPlace(place.name);
  }, [destinations, handleSpeakPlace]);

  // Exact user specification: stopDestinationVoice()
  const stopDestinationVoice = useCallback(() => {
    handleStopVoice();
  }, [handleStopVoice]);

  // Exact user specification: playKakanmathStory(storyId)
  const playKakanmathStory = useCallback((storyId: string) => {
    const temple = (destinations.find(
      (place) => place.name.toLowerCase() === "kakanmath temple"
    ) || kakanmathTemple) as any;

    const story = (temple.stories || []).find(
      (item: any) => item.id === storyId
    );

    if (!story) {
      console.error("Story not found.");
      return;
    }

    if (!("speechSynthesis" in window)) {
      if (typeof alert === "function") {
        try {
          alert("Voice playback is not supported in this browser.");
        } catch {
          console.warn("Voice playback is not supported in this browser.");
        }
      }
      return;
    }

    window.speechSynthesis.cancel();

    const narration = new SpeechSynthesisUtterance(
      `${story.title}. ${story.story}`
    );

    narration.lang = "en-IN";
    narration.rate = 0.9;
    narration.pitch = 1;

    setSpeakingDestinationId(temple.id);
    narration.onend = () => setSpeakingDestinationId(null);
    narration.onerror = () => setSpeakingDestinationId(null);

    window.speechSynthesis.speak(narration);
  }, [destinations]);

  // Exact user specification: stopKakanmathStory()
  const stopKakanmathStory = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingDestinationId(null);
  }, []);

  // Exact user specification: getKakanmathAnswer(question)
  const getKakanmathAnswer = useCallback((question: string) => {
    if (!question) return "";
    const q = question.toLowerCase();

    const temple = (destinations.find(
      (place) => place.name.toLowerCase() === "kakanmath temple"
    ) || kakanmathTemple) as any;

    if (
      q.includes("ghost") ||
      q.includes("ghosts") ||
      q.includes("bhoot") ||
      q.includes("mystery") ||
      q.includes("mysterious")
    ) {
      const story = temple.stories.find(
        (item: any) => item.id === "ghost-construction"
      );

      return `
      ${story.title}

      ${story.story}

      Evidence status: ${story.historicalStatus}
    `;
    }

    if (
      q.includes("queen") ||
      q.includes("kakanavati") ||
      q.includes("kakanade")
    ) {
      const story = temple.stories.find(
        (item: any) => item.id === "queen-kakanavati"
      );

      return `
      ${story.title}

      ${story.story}

      Evidence status: ${story.historicalStatus}
    `;
    }

    if (
      q.includes("history") ||
      q.includes("king") ||
      q.includes("dynasty") ||
      q.includes("historical")
    ) {
      return `
      Historical Background

      ${temple.history.details}

      Dynasty: ${temple.history.dynasty}

      Associated ruler: ${temple.history.ruler}
    `;
    }

    if (
      q.includes("architecture") ||
      q.includes("stone") ||
      q.includes("construction") ||
      q.includes("built")
    ) {
      return `
      Architecture

      ${temple.architecture.explanation}

      Architectural style: ${temple.architecture.style}
    `;
    }

    if (
      q.includes("nearby") ||
      q.includes("related places") ||
      q.includes("near") ||
      q.includes("nearby places")
    ) {
      return `
      Related Places

      ${temple.relatedPlaces
        .map((place: any) => `${place.name} — ${place.category}`)
        .join("\n")}
    `;
    }

    if (
      q.includes("food") ||
      q.includes("eat") ||
      q.includes("local food")
    ) {
      return `
      Local Food Suggestions

      ${temple.localFood
        .map((food: any) => `${food.name}: ${food.description}`)
        .join("\n")}
    `;
    }

    return `
    ${temple.name}

    ${temple.introduction}

    Historical Background:
    ${temple.history.details}

    Religious Significance:
    ${temple.religiousSignificance.details}

    You can ask me about its history, architecture,
    Queen Kakanavati, ghost legend, local food or nearby places.
  `;
  }, [destinations]);

  // Exact user specification: getThaweMandirAnswer(question)
  const getThaweMandirAnswer = useCallback((question: string) => {
    if (!question) return "";
    const q = question.toLowerCase();

    const mandir = (destinations.find(
      (place) => place.name.toLowerCase().includes("thawe")
    ) || thaweMandir) as any;

    if (
      q.includes("legend") ||
      q.includes("story") ||
      q.includes("rahshu") ||
      q.includes("manan singh") ||
      q.includes("kamakhya") ||
      q.includes("famine")
    ) {
      return `
Legend of Maa Thawewali & Rahshu Bhagat:
${mandir.legend}
      `.trim();
    }

    if (
      q.includes("history") ||
      q.includes("origin") ||
      q.includes("tradition")
    ) {
      return `
Historical Background of Thawe Mandir:
${mandir.history}
      `.trim();
    }

    if (
      q.includes("food") ||
      q.includes("sweet") ||
      q.includes("eat") ||
      q.includes("pidakiya")
    ) {
      return `
Local Food & Specialties of Thawe:
${Array.isArray(mandir.food) ? mandir.food.join("\n• ") : mandir.food}
      `.trim();
    }

    if (
      q.includes("festival") ||
      q.includes("navratri") ||
      q.includes("chaitra") ||
      q.includes("sharad")
    ) {
      return `
Festivals Celebrated at Thawe Mandir:
• ${(mandir.festivals || ["Chaitra Navratri", "Sharad Navratri"]).join("\n• ")}
      `.trim();
    }

    if (
      q.includes("tips") ||
      q.includes("travel tips") ||
      q.includes("visit") ||
      q.includes("time") ||
      q.includes("timing")
    ) {
      return `
Travel Tips & Best Time to Visit:
${mandir.travelTips || ""}
Best Time: ${mandir.bestTime || ""}
      `.trim();
    }

    return `
${mandir.name} — ${mandir.district}, ${mandir.state}
${mandir.description}

You can ask me about the Rahshu Bhagat legend, history, festivals, Thawe Pidakiya, or travel tips.
    `.trim();
  }, [destinations]);

  // Exact user specification: showDestinationDetails(id)
  const showDestinationDetails = useCallback((id: string | number) => {
    setActiveView('destinations');
    const place = destinations.find((item) => item.id === id || String(item.id) === String(id));

    if (!place) {
      if (typeof window !== 'undefined' && typeof window.alert === 'function') {
        try {
          alert("Destination not found.");
        } catch {
          console.warn("Destination not found.");
        }
      }
      return;
    }

    const container = document.getElementById("destinationResults");
    if (!container) {
      console.error("destinationResults element nahi mila.");
      return;
    }

    const attractionsList = Array.isArray(place.attractions) ? place.attractions : [place.attractions || ''];
    const localFoodList = Array.isArray(place.localFood)
      ? place.localFood.map((f) => (typeof f === 'object' ? `${f.name}${f.description ? ` (${f.description})` : ''}` : f))
      : Array.isArray(place.food)
      ? place.food
      : [place.localFood || place.food || ''];
    const nearbyPlacesList = Array.isArray(place.nearbyPlaces) ? place.nearbyPlaces : [place.nearbyPlaces || ''];
    const categoryDisplay = Array.isArray(place.category) ? place.category.join(", ") : place.category;
    const historyDisplay = typeof place.history === 'object' && place.history ? place.history.details : (place.history || '');
    const legendDisplay = place.legend || (place.legends && place.legends.length > 0 ? place.legends.map(l => `${l.title}: ${l.story}`).join('\n\n') : '') || (Array.isArray(place.stories) ? place.stories[1]?.story || place.stories[0]?.story : '');

    const safe = (val: any) => {
      if (val === null || val === undefined) return '';
      return String(val)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    };

    const mapUrl =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(place.mapQuery || place.name);

    const mapButton = `
      <a
        href="${mapUrl}"
        target="_blank"
        rel="noopener noreferrer"
        class="map-button"
      >
        📍 Explore on Google Maps
      </a>
    `;

    container.innerHTML = `
      <article class="destination-details">
        <button onclick="showSearchResults('')">
          ← Back to All Places
        </button>

        <h2>${place.name}</h2>

        ${place.images ? `
          <section class="destination-gallery">
            <h3>📸 Explore the Temple</h3>

            <div class="gallery-grid">
              ${place.images.map((img: any) => `
                <figure>
                  <img
                    src="${img.url}"
                    alt="${img.caption}"
                    loading="lazy"
                    onerror="this.style.display='none'"
                  >
                  <figcaption>${img.caption}</figcaption>
                </figure>
              `).join("")}
            </div>
          </section>
        ` : ""}

        <p><strong>State:</strong> ${place.state}</p>
        <p><strong>Region:</strong> ${place.region}</p>
        <p><strong>Category:</strong> ${categoryDisplay}</p>

        <h3>About This Place</h3>
        <p>${place.overview || place.description || place.introduction || ''}</p>

        <h3>Historical Background</h3>
        <p>${historyDisplay}</p>

        <h3>Traditional Stories</h3>
        <p>${legendDisplay}</p>

        <h3>Important Attractions</h3>
        <ul>
          ${attractionsList.map((item) => `<li>${item}</li>`).join("")}
        </ul>

        <h3>🍛 Local Food</h3>
        <ul>
          ${localFoodList.map((item) => `<li>${item}</li>`).join("")}
        </ul>

        ${place.festivals ? `
          <h3>🎉 Festivals & Traditions</h3>
          <ul>
            ${(Array.isArray(place.festivals) ? place.festivals : [place.festivals]).map(item =>
              `<li>${safe(item)}</li>`
            ).join("")}
          </ul>
        ` : ""}

        <h3>Related Destinations</h3>
        <ul>
          ${nearbyPlacesList.map((item) => `
            <li>
              <button onclick="searchRelatedPlace('${String(item).replace(/'/g, "\\'")}')">
                ${item}
              </button>
            </li>
          `).join("")}
        </ul>

        <p><strong>Suggested Season:</strong> ${place.bestTime || 'October to March'}</p>

        ${place.travelTips ? `
          <h3>🧳 Travel Tips</h3>
          <p>${safe(place.travelTips)}</p>
        ` : ""}

        ${mapButton}

        <button onclick="speakPlace('${place.name.replace(/'/g, "\\'")}')">
          🔊 Listen with Anvesha AI
        </button>

        <button onclick="stopVoice()">
          ⏹ Stop Voice
        </button>

        ${place.name.toLowerCase().includes('kakanmath') ? `
          <div class="kakanmath-voice-bar">
            <h4>Narrated Story Legends</h4>
            <div class="kakanmath-voice-buttons">
              <button onclick="playKakanmathStory('ghost-construction')">
                👻 Listen to Ghost Legend
              </button>
              <button onclick="playKakanmathStory('queen-kakanavati')">
                👑 Listen to Queen Kakanavati Story
              </button>
              <button onclick="stopKakanmathStory()">
                ⏹ Stop Story Voice
              </button>
            </div>
          </div>
        ` : ''}
      </article>
    `;

    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [destinations]);

  // Exact user specification: searchRelatedPlace(name)
  const searchRelatedPlace = useCallback((name: string) => {
    setActiveView('destinations');
    const found = destinations.find(
      (place) => place.name.toLowerCase() === (name || '').toLowerCase().trim()
    );

    if (found) {
      showDestinationDetails(found.id);
    } else {
      const container = document.getElementById("destinationResults");
      if (!container) return;

      container.innerHTML = `
        <h3>${name}</h3>
        <p>This related destination has not been added to the database yet.</p>
        <button onclick="showSearchResults('')">Back to Destinations</button>
      `;
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [destinations, showDestinationDetails]);

  // Exact user specification: showDetails(nameOrId)
  const showDetails = useCallback((nameOrId: string | number) => {
    setActiveView('destinations');
    const place = destinations.find(
      (p) =>
        p.id === nameOrId ||
        String(p.id) === String(nameOrId) ||
        p.name.toLowerCase() === String(nameOrId).toLowerCase().trim() ||
        p.name.toLowerCase().includes(String(nameOrId).toLowerCase().trim())
    );
    if (place) {
      setSelectedDestination(place);
      showDestinationDetails(place.id);
    }
  }, [destinations, showDestinationDetails]);

  // Exact user specification: showSearchResults(query)
  const showSearchResults = useCallback((query: string) => {
    setActiveView('destinations');
    const q = (query || '').toLowerCase();

    if (
      q.includes("thawe") ||
      q.includes("rahshu") ||
      q.includes("rahsu") ||
      q.includes("manan singh")
    ) {
      showDetails("Thawe Mandir");
      return;
    }

    const results = searchDestinations(query);

    const container = document.getElementById("destinationResults");

    if (!container) {
      console.error("destinationResults element nahi mila.");
      return;
    }

    if (results.length === 0) {
      container.innerHTML = "<p>No destinations found. Try another search.</p>";
      return;
    }

    container.innerHTML = results.map((place) => `
      <article class="destination-card">
        <h3>${place.name}</h3>

        <p>
          <strong>State:</strong> ${place.state}
        </p>

        <p>
          <strong>Category:</strong> ${place.category}
        </p>

        <p>${place.description || ''}</p>

        <div style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-top:0.5rem;">
          <button onclick="showDestinationDetails(${place.id})">
            Explore Story
          </button>

          <button onclick="speakPlace('${place.name.replace(/'/g, "\\'")}')">
            🔊 Listen (Anvesha AI)
          </button>

          <button onclick="openDestinationMap(${place.id})">
            Open Map
          </button>
        </div>
      </article>
    `).join("");

    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [searchDestinations]);

  // Exact user specification: renderPlaces()
  const renderPlaces = useCallback(() => {
    const langSelect = document.getElementById("language") as HTMLSelectElement | null;
    const selectedLang = langSelect ? langSelect.value : "en-IN";
    const langCode = selectedLang.startsWith("hi") ? "hi" : "en";
    handleLanguageChange(langCode);
    showSearchResults(searchQuery || '');
  }, [handleLanguageChange, showSearchResults, searchQuery]);

  // Exact user specification: showAvailableVoices()
  const showAvailableVoices = useCallback(() => {
    if (typeof window === 'undefined' || !("speechSynthesis" in window)) {
      if (typeof alert === "function") {
        try {
          alert("Voice playback is not supported in this browser.");
        } catch {
          console.warn("Voice playback is not supported in this browser.");
        }
      }
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    const langSelect = document.getElementById("language") as HTMLSelectElement | null;
    const genderSelect = document.getElementById("voiceGender") as HTMLSelectElement | null;
    const targetLang = langSelect ? langSelect.value : "en-IN";
    const targetGender = genderSelect ? (genderSelect.value as 'female' | 'male') : "female";

    const langPrefix = targetLang.split('-')[0].toLowerCase();
    const matchingVoices = voices.filter((v) =>
      v.lang.toLowerCase().includes(langPrefix) || v.lang.toLowerCase().includes("in")
    );

    const sampleText = targetLang.startsWith("hi")
      ? (targetGender === "female"
          ? "नमस्ते! मैं आपकी टूर गाइड हूँ। भारत के ऐतिहासिक स्थलों की यात्रा में आपका स्वागत है।"
          : "नमस्ते! मैं आपका टूर गाइड हूँ। भारत के गौरवशाली स्मारकों की यात्रा में आपका स्वागत है।")
      : (targetGender === "female"
          ? "Namaste! I am your female tour guide. Welcome to the timeless heritage of Incredible India."
          : "Namaste! I am your male tour guide. Welcome to the historic wonders of Incredible India.");

    speakText(sampleText, targetLang, {
      gender: targetGender,
      rate: 0.9,
    });

    const notif = document.getElementById("voiceStatusNotification");
    if (notif) {
      const voiceListNames = (matchingVoices.length > 0 ? matchingVoices : voices.slice(0, 4))
        .map((v) => `• ${v.name} (${v.lang})`)
        .join("\n");

      notif.innerHTML = `
        <div class="mt-2 p-3 bg-slate-900 text-white rounded-xl border border-teal-500/40 text-xs shadow-lg animate-in fade-in">
          <p class="font-bold text-teal-300">🎙️ Active Voice: ${targetLang} (${targetGender === 'female' ? 'Female Guide' : 'Male Guide'})</p>
          <p class="text-[11px] text-slate-300 mt-1 whitespace-pre-line max-h-24 overflow-y-auto">${voiceListNames}</p>
        </div>
      `;
      setTimeout(() => {
        if (notif) notif.innerHTML = '';
      }, 7000);
    }
  }, []);

  // Bind window functions
  useEffect(() => {
    (window as any).places = destinations;
    (window as any).destinations = destinations;
    (window as any).indianVoices = indianVoices;
    (window as any).loadIndianVoices = loadIndianVoices;
    (window as any).getIndianVoice = getIndianVoice;
    (window as any).speakPlace = handleSpeakPlace;
    (window as any).stopVoice = handleStopVoice;
    (window as any).searchDestinations = searchDestinations;
    (window as any).showSearchResults = showSearchResults;
    (window as any).showDestinationDetails = showDestinationDetails;
    (window as any).showDetails = showDetails;
    (window as any).searchRelatedPlace = searchRelatedPlace;
    (window as any).openDestinationMap = openDestinationMap;
    (window as any).speakDestination = speakDestination;
    (window as any).stopDestinationVoice = stopDestinationVoice;
    (window as any).getKakanmathAnswer = getKakanmathAnswer;
    (window as any).getThaweMandirAnswer = getThaweMandirAnswer;
    (window as any).playKakanmathStory = playKakanmathStory;
    (window as any).stopKakanmathStory = stopKakanmathStory;
    (window as any).renderPlaces = renderPlaces;
    (window as any).showAvailableVoices = showAvailableVoices;

    const langEl = document.getElementById('language') as HTMLSelectElement | null;
    if (langEl) {
      langEl.onchange = () => {
        if (typeof (window as any).renderPlaces === 'function') {
          (window as any).renderPlaces();
        }
      };
    }

    const checkBtn = document.getElementById('checkVoicesBtn') as HTMLButtonElement | null;
    if (checkBtn) {
      checkBtn.onclick = () => {
        if (typeof (window as any).showAvailableVoices === 'function') {
          (window as any).showAvailableVoices();
        }
      };
    }

    const stopBtn = document.getElementById('stopVoiceBtn') as HTMLButtonElement | null;
    if (stopBtn) {
      stopBtn.onclick = () => {
        if (typeof (window as any).stopVoice === 'function') {
          (window as any).stopVoice();
        }
      };
    }
  }, [
    destinations,
    handleSpeakPlace,
    handleStopVoice,
    searchDestinations,
    showSearchResults,
    showDestinationDetails,
    searchRelatedPlace,
    openDestinationMap,
    speakDestination,
    stopDestinationVoice,
    getKakanmathAnswer,
    playKakanmathStory,
    stopKakanmathStory,
    renderPlaces,
    showAvailableVoices,
  ]);

  const handleToggleSpeak = (place: Destination) => {
    if (String(speakingDestinationId) === String(place.id)) {
      handleStopVoice();
    } else {
      handleSpeakPlace(place.name);
    }
  };

  // Filtered destinations matching English and translated fields
  const filteredDestinations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const searched = q ? searchDestinations(q) : destinations;

    return searched.filter((place) => {
      const matchCategory =
        selectedCategory === 'All' ||
        (Array.isArray(place.category)
          ? place.category.some(
              (cat) =>
                cat.toLowerCase() === selectedCategory.toLowerCase() ||
                cat.toLowerCase().includes(selectedCategory.toLowerCase())
            )
          : place.category === selectedCategory);

      const normReg = (place.region || '').toLowerCase().replace(' india', '').trim();
      const normSelReg = selectedRegion.toLowerCase().replace(' india', '').trim();
      const matchRegion =
        selectedRegion === 'All' ||
        place.region === selectedRegion ||
        normReg === normSelReg ||
        normReg.startsWith(normSelReg) ||
        normSelReg.startsWith(normReg);

      return matchCategory && matchRegion;
    });
  }, [destinations, searchQuery, searchDestinations, selectedCategory, selectedRegion]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedRegion('All');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        onOpenPhotoLens={() => setIsPhotoLensOpen(true)}
        onOpenTripPlanner={() => setIsTripPlannerOpen(true)}
        onOpenConcierge={() => {
          setConciergeContext('');
          setIsConciergeOpen(true);
        }}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlist.length}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        t={t}
        db2Status={db2Status}
        onOpenDb2Status={() => setIsDb2ModalOpen(true)}
      />

      {/* Hero Banner with Search, Language Box, and Categories */}
      <HeroBanner
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
        totalCount={filteredDestinations.length}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        t={t}
        onExploreGhats={() => {
          setActiveView('ghats');
          document.getElementById('places')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Destinations Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 tracking-tight">
                {t.exploreIndiaHeading}
              </h2>
              <span className="text-2xl" role="img" aria-label="India flag">
                🇮🇳
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {t.showingPlaces} ({filteredDestinations.length})
            </p>
          </div>

          {/* Quick Active Filters or reset */}
          {(searchQuery || selectedCategory !== 'All' || selectedRegion !== 'All') && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs font-semibold self-start sm:self-center transition active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.resetFilters}</span>
            </button>
          )}
        </div>

        {/* Travel Lens AI - Indian Voice Guide Controls */}
        <section aria-label="Travel Lens AI Indian Voice Guide" className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-2xl border border-teal-500/30 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
                <Volume2 className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    Travel Lens AI — Indian Voice Guide
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                    Indian Voices
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Natural Indian English & Hindi narration with smart persona selection
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="language" className="text-[11px] font-semibold text-teal-200">
                  Narration Language
                </label>
                <select
                  id="language"
                  defaultValue={currentLanguage === 'hi' ? 'hi-IN' : 'en-IN'}
                  onChange={() => {
                    if (typeof (window as any).renderPlaces === 'function') {
                      (window as any).renderPlaces();
                    }
                  }}
                  className="bg-slate-800 text-white border border-teal-500/40 hover:border-teal-400 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer shadow-inner"
                >
                  <option value="hi-IN">Hindi (India)</option>
                  <option value="en-IN">English (India)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="voiceGender" className="text-[11px] font-semibold text-teal-200">
                  Tour Guide Voice
                </label>
                <select
                  id="voiceGender"
                  className="bg-slate-800 text-white border border-teal-500/40 hover:border-teal-400 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer shadow-inner"
                >
                  <option value="female">Indian Female</option>
                  <option value="male">Indian Male</option>
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-5 sm:pt-0">
                <button
                  id="checkVoicesBtn"
                  onClick={() => {
                    if (typeof (window as any).showAvailableVoices === 'function') {
                      (window as any).showAvailableVoices();
                    }
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  🎙️ Check Voices
                </button>

                <button
                  id="stopVoiceBtn"
                  onClick={() => {
                    if (typeof (window as any).stopVoice === 'function') {
                      (window as any).stopVoice();
                    }
                  }}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-xl text-xs sm:text-sm font-semibold transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  ⏹ Stop Voice
                </button>
              </div>
            </div>
          </div>

          <div id="voiceStatusNotification" className="mt-3 empty:hidden" />
        </section>

        {/* View Switcher: All Destinations vs Varanasi Ghats Trail */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            onClick={() => setActiveView('destinations')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition active:scale-95 ${
              activeView === 'destinations'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>All Destinations ({filteredDestinations.length})</span>
          </button>

          <button
            id="explore-varanasi-ghats"
            onClick={() => {
              setActiveView('ghats');
              document.getElementById('places')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition active:scale-95 cursor-pointer ${
              activeView === 'ghats'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:border-amber-300'
            }`}
          >
            <Waves className="w-4 h-4 text-amber-500" />
            <span>Explore Varanasi Ghats</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200/80 text-amber-950">
              8 Sacred Ghats
            </span>
          </button>
        </div>

        {/* Places Grid or Ghats Trail */}
        {activeView === 'ghats' ? (
          <div id="places">
            <VaranasiGhatsTrail
              onSelectGhat={(ghat) => setSelectedGhat(ghat)}
              language={currentLanguage}
            />
            <div id="destinationResults" className="hidden" />
          </div>
        ) : isTranslating ? (
          <div id="places" className="py-16 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-sm font-medium animate-pulse shadow-xs">
              <Sparkles className="w-4 h-4 text-teal-600 animate-spin" />
              <span>Translating destinations...</span>
            </div>
            <div id="destinationResults" className="hidden" />
          </div>
        ) : translationError ? (
          <div id="places" className="py-12 text-center">
            <p className="text-sm text-rose-600 font-medium bg-rose-50 border border-rose-200 rounded-xl py-3 px-4 inline-block">
              {translationError}
            </p>
            <div id="destinationResults" className="hidden" />
          </div>
        ) : filteredDestinations.length > 0 ? (
          <div id="places">
            <div
              id="destinationResults"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-7"
            >
              {filteredDestinations.map((place) => {
                const displayPlace = translatedMap[place.id] || place;
                return (
                  <DestinationCard
                    key={place.id}
                    destination={displayPlace}
                    onSelect={(dest) => setSelectedDestination(dest)}
                    isWishlisted={wishlist.some((w) => String(w.id) === String(place.id))}
                    onToggleWishlist={handleToggleWishlist}
                    language={currentLanguage}
                    t={t}
                    isSpeaking={String(speakingDestinationId) === String(place.id)}
                    onToggleSpeak={handleToggleSpeak}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div id="places">
            <div
              id="destinationResults"
              className="py-16 text-center space-y-4 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs max-w-xl mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto text-2xl">
                🔍
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                {t.noPlacesFound}
              </h3>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm transition shadow-sm"
              >
                {t.resetFilters}
              </button>
            </div>
          </div>
        )}

        {/* Feature Highlights Banner */}
        <section className="mt-16 pt-12 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">{t.storyAndHistory}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {t.heroSubtext}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 flex items-center justify-center shrink-0">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">{t.localFood}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Discover Banarasi Kachori, Mathura Peda, Litti Chokha, Khasi Jadoh, and ancient temple prasad offerings.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">{t.aiDeepLens}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Multi-lingual audio tours, AI landmark scanning, and personalized spiritual & nature itineraries.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Active Voice Narration Bar */}
      {speakingDestinationId && (() => {
        const speakingPlace = destinations.find((d) => String(d.id) === String(speakingDestinationId));
        const speakingPlaceDisplay = speakingPlace ? (translatedMap[speakingPlace.id] || speakingPlace) : null;
        if (!speakingPlaceDisplay) return null;

        return (
          <aside
            aria-label="Active Voice Narration"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 sm:px-5 py-3 rounded-2xl bg-slate-900/95 border border-teal-500/60 text-white shadow-2xl backdrop-blur-md max-w-[92vw] animate-in slide-in-from-bottom duration-300 ring-1 ring-teal-400/30"
          >
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
              <Volume2 className="w-5 h-5 text-teal-400 animate-pulse" />
            </div>
            <div className="text-left min-w-0 pr-2">
              <p className="text-[11px] font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1">
                <span>{currentLanguage === 'hi' ? '🎙️ हिन्दी आवाज़' : '🎙️ Voice Narration'}</span>
                <span className="text-slate-400 text-[10px]">({currentLanguage === 'hi' ? 'hi-IN 0.9x' : 'en-IN 0.9x'})</span>
              </p>
              <p className="text-xs sm:text-sm text-white font-bold truncate max-w-[200px] sm:max-w-xs">
                {speakingPlaceDisplay.name} • {speakingPlaceDisplay.city}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setSelectedDestination(speakingPlaceDisplay)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold transition hidden sm:inline-block"
                title="Open Story"
              >
                {t.discoverStory}
              </button>
              <button
                onClick={() => {
                  stopTravelStory();
                  setSpeakingDestinationId(null);
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center gap-1 active:scale-95 shadow-sm"
                title="Stop Narration"
              >
                <span>⏹️</span>
                <span>{currentLanguage === 'hi' ? 'रोकें' : 'Stop'}</span>
              </button>
            </div>
          </aside>
        );
      })()}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-extrabold text-lg">
              <Compass className="w-5 h-5 text-teal-400" />
              <span>{t.appName}</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              {t.tagline}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-300 flex-wrap justify-center">
            <button
              onClick={() => setIsPhotoLensOpen(true)}
              className="hover:text-teal-300 transition"
            >
              {t.aiPhotoLens}
            </button>
            <span>•</span>
            <button
              onClick={() => setIsTripPlannerOpen(true)}
              className="hover:text-teal-300 transition"
            >
              {t.tripPlanner}
            </button>
            <span>•</span>
            <button
              onClick={() => setIsConciergeOpen(true)}
              className="hover:text-teal-300 transition"
            >
              {t.aiGuide}
            </button>
            <span>•</span>
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="hover:text-teal-300 transition"
            >
              {t.savedBucketList} ({wishlist.length})
            </button>
          </div>

          <div className="text-xs text-slate-500">
            <p>{t.poweredBy}</p>
            <p className="text-[11px] mt-0.5">© {new Date().getFullYear()} Incredible India Heritage Explorer</p>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <StoryModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        isWishlisted={selectedDestination ? wishlist.some((w) => w.id === selectedDestination.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenConciergeWithDestination={handleOpenConciergeWithDestination}
        onExploreGhats={() => setActiveView('ghats')}
        language={currentLanguage}
        t={t}
      />

      <GhatStoryModal
        ghat={selectedGhat}
        onClose={() => setSelectedGhat(null)}
        language={currentLanguage}
      />

      <AIPhotoLensModal
        isOpen={isPhotoLensOpen}
        onClose={() => setIsPhotoLensOpen(false)}
        onSelectIdentifiedDestination={(destName) => {
          const match = destinations.find((d) => d.name.toLowerCase().includes(destName.toLowerCase()));
          if (match) {
            setSelectedDestination(match);
          }
        }}
      />

      <AITripPlannerModal
        isOpen={isTripPlannerOpen}
        onClose={() => setIsTripPlannerOpen(false)}
        language={currentLanguage}
      />

      <AIChatDrawer
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        destinationContext={conciergeContext}
        language={currentLanguage}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemove={(id) => setWishlist((prev) => prev.filter((d) => d.id !== id))}
        onClear={() => setWishlist([])}
        onSelectDestination={(dest) => setSelectedDestination(dest)}
        onPlanTripFromWishlist={() => {
          setIsTripPlannerOpen(true);
        }}
        t={t}
      />

      <Db2StatusModal
        isOpen={isDb2ModalOpen}
        onClose={() => setIsDb2ModalOpen(false)}
        status={db2Status}
        onRefresh={fetchDb2Status}
      />
    </div>
  );
}
