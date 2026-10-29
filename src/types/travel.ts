export type DestinationCategory =
  | 'Historical'
  | 'Nature'
  | 'Spiritual'
  | 'Cultural'
  | 'Temple'
  | 'Wildlife'
  | 'Adventure'
  | 'Beach'
  | string;

export interface Destination {
  id: string | number;
  name: string;
  alternateNames?: string[];
  city?: string;
  district?: string;
  village?: string;
  state: string;
  region: string;
  category: DestinationCategory | string[];
  description?: string;
  introduction?: string;
  overview?: string;
  history: string | {
    period?: string;
    dynasty?: string;
    ruler?: string;
    details?: string;
    historicalNote?: string;
  };
  architecture?: string | {
    style?: string;
    features?: string[];
    explanation?: string;
  };
  religiousSignificance?: {
    deity?: string;
    details?: string;
  };
  legend?: string;
  legends?: Array<{
    title: string;
    story: string;
    type?: string;
  }>;
  stories?: Array<{
    id?: string;
    title: string;
    type: string;
    story: string;
    historicalStatus?: string;
  }>;
  localFolklore?: string[];
  visitorExperience?: {
    recommendedFor?: string[];
    activities?: string[];
    safety?: string[];
  };
  attractions: string | string[];
  attractionList?: string[];
  food?: string | string[];
  localFood?: Array<string | { name: string; description?: string }>;
  foodList?: { name: string; description: string; mustTryAt?: string }[];
  festivals?: string[];
  nearbyPlaces?: string[];
  related?: string[];
  relatedPlaces?: Array<{
    name: string;
    state?: string;
    category?: string;
    mapQuery?: string;
  }>;
  map?: string;
  mapQuery?: string;
  bestTime?: string;
  travelTips?: string;
  languages?: string[];
  sources?: Array<{
    name?: string;
    title?: string;
    url: string;
    purpose?: string;
  }>;
  image?: string;
  gallery?: string[];
  images?: Array<{
    url: string;
    caption?: string;
  }>;
  builtYearOrEra?: string;
  unescoHeritage?: boolean;
  bestSeason?: string;
  idealDuration?: string;
  audioTourSummary?: string;
  coordinates?: { lat: number; lng: number } | { latitude: number; longitude: number };
}

export interface VaranasiGhat {
  name: string;
  category: string;
  story: string;
  significance: string;
  experience: string;
  location: string;
  image?: string;
}

export interface DaySlot {
  time: string;
  activity: string;
  description: string;
  foodRecommendation: string;
}

export interface ItineraryDay {
  dayNumber: number;
  theme: string;
  slots: DaySlot[];
}

export interface ItineraryData {
  summary: string;
  estimatedBudgetPerDayINR: string;
  days: ItineraryDay[];
  localTransportTip: string;
  safetyAndComfort: string;
}

export interface DeepStoryData {
  title: string;
  historicalTale: string;
  secretTrivia: string[];
  sensoryExperience: string;
  culturalEtiquette: string[];
  bestTimeAndSeason: string;
}

export interface PhotoAnalysisData {
  identifiedName: string;
  location: string;
  category: string;
  architecturalOrStyleHighlights: string;
  historicalEra: string;
  fascinatingStory: string;
  visitorTip: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
