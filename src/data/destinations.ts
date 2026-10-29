import { Destination } from '../types/travel';

export const destinations: Destination[] = [
  // =========================
  // UTTAR PRADESH
  // =========================

  {
    id: 1,
    name: "Varanasi",
    city: "Varanasi",
    state: "Uttar Pradesh",
    region: "North India",
    category: "Spiritual",
    description: "One of India's oldest continuously inhabited cities.",
    history: "Varanasi is an ancient centre of learning, pilgrimage and culture. It is closely associated with Lord Shiva and the River Ganga.",
    legend: "According to Hindu tradition, Varanasi is a sacred city associated with Lord Shiva.",
    attractions: [
      "Dashashwamedh Ghat",
      "Assi Ghat",
      "Manikarnika Ghat",
      "Kashi Vishwanath Temple",
      "Sarnath",
      "Ramnagar Fort"
    ],
    localFood: [
      "Kachori Sabzi",
      "Banarasi Tamatar Chaat",
      "Malaiyyo",
      "Banarasi Paan"
    ],
    nearbyPlaces: ["Sarnath", "Chunar Fort", "Vindhyachal"],
    mapQuery: "Tourist places in Varanasi Uttar Pradesh",
    bestTime: "October to March",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200",
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=1200",
      "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=1200"
    ],
    food: "Kachori Sabzi, Banarasi Tamatar Chaat, Malaiyyo, Banarasi Paan",
    attractionList: [
      "Dashashwamedh Ghat (Grand Ganga Aarti)",
      "Assi Ghat (Morning cultural gatherings)",
      "Manikarnika Ghat (Sacred liberation ghat)",
      "Kashi Vishwanath Temple (Golden Spire)",
      "Sarnath (First sermon of Buddha)",
      "Ramnagar Fort (Ganga Riverfront bastion)"
    ],
    builtYearOrEra: "3,000+ Years Living Heritage",
    unescoHeritage: false,
    bestSeason: "October to March",
    idealDuration: "2 - 3 Days",
    audioTourSummary: "Stand on the ancient stone steps of Varanasi along the sacred River Ganga, listening to the reverberations of temple bells and evening aarti songs.",
    coordinates: { lat: 25.3176, lng: 82.9739 }
  },

  {
    id: 2,
    name: "Ayodhya",
    city: "Ayodhya",
    state: "Uttar Pradesh",
    region: "North India",
    category: "Temple",
    description: "A major Hindu pilgrimage city associated with Lord Rama.",
    history: "Ayodhya has a long history in Indian religious literature and is associated with the ancient Kosala kingdom.",
    legend: "In the Ramayana tradition, Ayodhya is described as the birthplace of Lord Rama.",
    attractions: [
      "Shri Ram Janmabhoomi Mandir",
      "Hanuman Garhi",
      "Kanak Bhawan",
      "Saryu River Ghats",
      "Guptar Ghat"
    ],
    localFood: ["Kachori", "Jalebi", "Traditional North Indian Thali"],
    nearbyPlaces: ["Faizabad", "Sultanpur"],
    mapQuery: "Tourist places in Ayodhya Uttar Pradesh",
    bestTime: "October to March",
    image: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=1200",
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=1200"
    ],
    food: "Kachori, Jalebi, Traditional North Indian Thali",
    attractionList: [
      "Shri Ram Janmabhoomi Mandir",
      "Hanuman Garhi Fort-Temple",
      "Kanak Bhawan",
      "Saryu River Ghats & Evening Aarti",
      "Guptar Ghat"
    ],
    builtYearOrEra: "Ancient Kosala Kingdom Heritage",
    unescoHeritage: false,
    bestSeason: "October to March",
    idealDuration: "2 Days",
    audioTourSummary: "Experience the spiritual devotion along the banks of the sacred Saryu river in the historic kingdom of Ayodhya.",
    coordinates: { lat: 26.7922, lng: 82.1998 }
  },

  {
    id: 3,
    name: "Mathura",
    city: "Mathura",
    state: "Uttar Pradesh",
    region: "North India",
    category: "Temple",
    description: "A major pilgrimage destination associated with Lord Krishna.",
    history: "Mathura was an important ancient settlement and a significant centre of religious art and trade.",
    legend: "Hindu tradition identifies Mathura as the birthplace of Lord Krishna.",
    attractions: [
      "Shri Krishna Janmabhoomi",
      "Dwarkadhish Temple",
      "Vishram Ghat",
      "Gita Mandir",
      "Government Museum"
    ],
    localFood: ["Mathura Peda", "Kachori", "Jalebi"],
    nearbyPlaces: ["Vrindavan", "Govardhan", "Barsana", "Gokul"],
    mapQuery: "Tourist places in Mathura Uttar Pradesh",
    bestTime: "October to March",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200",
      "https://images.unsplash.com/photo-1599818805561-9c17df3d5bc0?w=1200"
    ],
    food: "Mathura Peda, Kachori, Jalebi",
    attractionList: [
      "Shri Krishna Janmabhoomi Complex",
      "Dwarkadhish Temple on Yamuna bank",
      "Vishram Ghat sacred boat rides",
      "Gita Mandir with Bhagavad Gita inscriptions",
      "Mathura Government Museum (Kushan Art)"
    ],
    builtYearOrEra: "Ancient Shurasena Kingdom",
    unescoHeritage: false,
    bestSeason: "October to March",
    idealDuration: "1 - 2 Days",
    audioTourSummary: "Walk along Vishram Ghat on the holy Yamuna river where ancient tales of devotion and the famed Mathura Pedas come alive.",
    coordinates: { lat: 27.4924, lng: 77.6737 }
  },

  {
    id: 4,
    name: "Vrindavan",
    city: "Vrindavan",
    state: "Uttar Pradesh",
    region: "North India",
    category: "Temple",
    description: "A sacred town famous for Krishna temples and devotional traditions.",
    history: "Vrindavan developed into an important Vaishnava pilgrimage centre, particularly during the medieval period.",
    legend: "Tradition associates Vrindavan with the childhood and youthful stories of Krishna and Radha.",
    attractions: [
      "Banke Bihari Temple",
      "Prem Mandir",
      "ISKCON Temple",
      "Nidhivan",
      "Seva Kunj",
      "Radha Raman Temple"
    ],
    localFood: ["Makhan Mishri", "Peda", "Lassi", "Traditional Vegetarian Thali"],
    nearbyPlaces: ["Mathura", "Barsana", "Govardhan", "Gokul"],
    mapQuery: "Tourist places in Vrindavan Uttar Pradesh",
    bestTime: "October to March",
    image: "https://images.unsplash.com/photo-1599818805561-9c17df3d5bc0?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1599818805561-9c17df3d5bc0?w=1200",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200"
    ],
    food: "Makhan Mishri, Peda, Lassi, Traditional Vegetarian Thali",
    attractionList: [
      "Banke Bihari Temple",
      "Prem Mandir (Illuminated Italian marble)",
      "ISKCON Krishna Balaram Mandir",
      "Nidhivan Sacred Grove",
      "Seva Kunj",
      "Radha Raman Temple (Self-manifested Saligram)"
    ],
    builtYearOrEra: "16th Century Bhakti Movement Flourishing",
    unescoHeritage: false,
    bestSeason: "October to March",
    idealDuration: "1 - 2 Days",
    audioTourSummary: "Immerse in the sweet kirtans and temple corridors of Vrindavan, where sacred legends of Radha and Krishna echo through narrow lanes.",
    coordinates: { lat: 27.5806, lng: 77.7006 }
  },

  {
    id: 5,
    name: "Agra",
    city: "Agra",
    state: "Uttar Pradesh",
    region: "North India",
    category: "Historical",
    description: "A historic city famous for Mughal architecture.",
    history: "Agra became a major Mughal imperial centre, especially under Akbar, Jahangir and Shah Jahan.",
    legend: "The Taj Mahal is widely associated with Shah Jahan's memorial to Mumtaz Mahal.",
    attractions: [
      "Taj Mahal",
      "Agra Fort",
      "Fatehpur Sikri",
      "Itimad-ud-Daulah",
      "Mehtab Bagh"
    ],
    localFood: ["Agra Petha", "Bedai", "Mughlai Cuisine"],
    nearbyPlaces: ["Fatehpur Sikri", "Mathura", "Bharatpur"],
    mapQuery: "Historical places in Agra Uttar Pradesh",
    bestTime: "October to March",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200"
    ],
    food: "Agra Petha, Bedai, Mughlai Cuisine",
    attractionList: [
      "Taj Mahal (UNESCO World Heritage & Global Wonder)",
      "Agra Fort (Red sandstone imperial citadel)",
      "Fatehpur Sikri (Akbar's royal capital)",
      "Tomb of Itimad-ud-Daulah (Baby Taj)",
      "Mehtab Bagh (Moonlight garden river view)"
    ],
    builtYearOrEra: "16th - 17th Century Mughal Empire",
    unescoHeritage: true,
    bestSeason: "October to March",
    idealDuration: "1 - 2 Days",
    audioTourSummary: "Gaze upon the pristine white marble domes of the Taj Mahal as dawn light illuminates its timeless symmetry along the Yamuna river.",
    coordinates: { lat: 27.1767, lng: 78.0081 }
  },

  {
    id: 6,
    name: "Chitrakoot",
    city: "Chitrakoot",
    state: "Uttar Pradesh and Madhya Pradesh",
    region: "Central India",
    category: "Spiritual",
    description: "A pilgrimage region spread across parts of Uttar Pradesh and Madhya Pradesh.",
    history: "Chitrakoot has a long-standing place in religious literature and pilgrimage traditions.",
    legend: "The Ramayana tradition associates the region with the exile period of Lord Rama, Sita and Lakshmana.",
    attractions: [
      "Ramghat",
      "Kamadgiri",
      "Gupt Godavari",
      "Sati Anusuya Ashram",
      "Hanuman Dhara"
    ],
    localFood: ["Traditional North Indian Food", "Local Sweets"],
    nearbyPlaces: ["Prayagraj", "Satna", "Banda"],
    mapQuery: "Tourist places in Chitrakoot India",
    bestTime: "October to March",
    image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=1200",
      "https://images.unsplash.com/photo-1587922546307-776227941871?w=1200"
    ],
    food: "Traditional North Indian Food, Local Sweets",
    attractionList: [
      "Ramghat along the Mandakini River",
      "Kamadgiri Sacred Hill Parikrama",
      "Gupt Godavari Cave Stream",
      "Sati Anusuya Ashram in tranquil forest",
      "Hanuman Dhara Cascade Shrine"
    ],
    builtYearOrEra: "Ancient Forest Pilgrimage",
    unescoHeritage: false,
    bestSeason: "October to March",
    idealDuration: "2 Days",
    audioTourSummary: "Follow the sacred Mandakini river in Chitrakoot, exploring caves, sacred hills, and tranquil forest ashrams celebrated in epic literature.",
    coordinates: { lat: 25.1788, lng: 80.8672 }
  },

  // =========================
  // SOUTH INDIA
  // =========================

  {
    id: 7,
    name: "Meenakshi Amman Temple",
    city: "Madurai",
    state: "Tamil Nadu",
    region: "South India",
    category: "Temple",
    description: "A renowned temple complex in Madurai, famous for its colourful towers.",
    history: "The temple is associated with Madurai's long religious and cultural history. Its present architectural complex developed over several historical periods.",
    legend: "Temple tradition tells the story of Goddess Meenakshi and her marriage to Lord Sundareswarar, a form of Shiva.",
    attractions: [
      "Meenakshi Amman Temple",
      "Thirumalai Nayakkar Palace",
      "Vandiyur Mariamman Teppakulam",
      "Puthu Mandapam"
    ],
    localFood: ["Idli", "Dosa", "Jigarthanda", "Pongal"],
    nearbyPlaces: ["Rameswaram", "Thanjavur", "Kanyakumari"],
    mapQuery: "Meenakshi Amman Temple Madurai",
    bestTime: "October to March",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200"
    ],
    food: "Idli, Dosa, Jigarthanda, Pongal",
    attractionList: [
      "Meenakshi Amman Temple (14 Sculpted Gopurams)",
      "Thirumalai Nayakkar Palace (Stately arches)",
      "Vandiyur Mariamman Teppakulam (Giant tank)",
      "Puthu Mandapam Pillared Market"
    ],
    builtYearOrEra: "6th - 17th Century Pandya & Nayak Dynasty",
    unescoHeritage: false,
    bestSeason: "October to March",
    idealDuration: "2 Days",
    audioTourSummary: "Marvel at thousands of vibrant mythological sculptures carved onto the towering soaring gopurams of the ancient temple city of Madurai.",
    coordinates: { lat: 9.9195, lng: 78.1193 }
  },

  {
    id: 8,
    name: "Rameswaram",
    city: "Rameswaram",
    state: "Tamil Nadu",
    region: "South India",
    category: "Spiritual",
    description: "An important pilgrimage destination on Pamban Island.",
    history: "Rameswaram developed as a major pilgrimage centre and is famous for its historic Ramanathaswamy Temple.",
    legend: "Ramayana traditions connect Rameswaram with Lord Rama's journey towards Lanka.",
    attractions: [
      "Ramanathaswamy Temple",
      "Agni Theertham",
      "Pamban Bridge",
      "Dhanushkodi",
      "Dr. A.P.J. Abdul Kalam Memorial"
    ],
    localFood: ["South Indian Meals", "Idli", "Dosa", "Seafood in local restaurants"],
    nearbyPlaces: ["Madurai", "Dhanushkodi", "Pamban"],
    mapQuery: "Tourist places in Rameswaram Tamil Nadu",
    bestTime: "October to April",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200",
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200"
    ],
    food: "South Indian Meals, Idli, Dosa, Seafood in local restaurants",
    attractionList: [
      "Ramanathaswamy Temple (Longest pillared corridor in India)",
      "Agni Theertham seashore",
      "Historic Pamban Sea Bridge",
      "Dhanushkodi Ghost Town & Land's End",
      "Dr. A.P.J. Abdul Kalam National Memorial"
    ],
    builtYearOrEra: "12th Century Pandya & Setupati Patrons",
    unescoHeritage: false,
    bestSeason: "October to April",
    idealDuration: "2 Days",
    audioTourSummary: "Cross the magnificent Pamban sea bridge onto the sacred island of Rameswaram, walking beneath the longest carved temple corridor in India.",
    coordinates: { lat: 9.2876, lng: 79.3129 }
  },

  {
    id: 9,
    name: "Hampi",
    city: "Hampi",
    state: "Karnataka",
    region: "South India",
    category: "Historical",
    description: "A UNESCO World Heritage Site containing the remains of Vijayanagara.",
    history: "Hampi was the capital region of the Vijayanagara Empire, which flourished particularly between the 14th and 16th centuries.",
    legend: "Local religious traditions associate the surrounding region with Kishkindha, a kingdom described in the Ramayana.",
    attractions: [
      "Virupaksha Temple",
      "Vittala Temple",
      "Stone Chariot",
      "Lotus Mahal",
      "Elephant Stables",
      "Hemakuta Hill"
    ],
    localFood: ["North Karnataka Meals", "Dosa", "Jolada Rotti"],
    nearbyPlaces: ["Badami", "Aihole", "Pattadakal"],
    mapQuery: "Hampi UNESCO World Heritage Site Karnataka",
    bestTime: "October to February",
    image: "https://images.unsplash.com/photo-1600100397608-f010e9e0f0d5?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1600100397608-f010e9e0f0d5?w=1200",
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200"
    ],
    food: "North Karnataka Meals, Dosa, Jolada Rotti",
    attractionList: [
      "Vittala Temple & Iconic Stone Chariot",
      "Living Virupaksha Temple on Tungabhadra river",
      "Lotus Mahal & Zenana Enclosure",
      "Grand Elephant Stables",
      "Sunset from Hemakuta Hill"
    ],
    builtYearOrEra: "14th - 16th Century Vijayanagara Empire",
    unescoHeritage: true,
    bestSeason: "October to February",
    idealDuration: "2 - 3 Days",
    audioTourSummary: "Roam through an otherworldly landscape of golden granite boulders and magnificent royal ruins of the grand Vijayanagara Empire.",
    coordinates: { lat: 15.3350, lng: 76.4600 }
  },

  {
    id: 10,
    name: "Mysuru Palace",
    city: "Mysuru",
    state: "Karnataka",
    region: "South India",
    category: "Historical",
    description: "A famous royal palace associated with the Wadiyar dynasty.",
    history: "The present Mysuru Palace was completed in the early 20th century after the earlier palace was destroyed by fire.",
    legend: "The wider Mysuru region is associated with the traditional story of Goddess Chamundeshwari defeating Mahishasura.",
    attractions: [
      "Mysuru Palace",
      "Chamundi Hills",
      "St. Philomena's Church",
      "Brindavan Gardens",
      "Devaraja Market"
    ],
    localFood: ["Mysore Pak", "Mysore Masala Dosa", "Bisi Bele Bath"],
    nearbyPlaces: ["Srirangapatna", "Coorg", "Bandipur"],
    mapQuery: "Tourist places in Mysuru Karnataka",
    bestTime: "October to March",
    image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1590766940554-634a7ed41450?w=1200",
      "https://images.unsplash.com/photo-1600100397608-f010e9e0f0d5?w=1200"
    ],
    food: "Mysore Pak, Mysore Masala Dosa, Bisi Bele Bath",
    attractionList: [
      "Mysuru Palace (Indo-Saracenic royal residence)",
      "Chamundeshwari Temple atop Chamundi Hills",
      "Gothic St. Philomena's Cathedral",
      "Brindavan Gardens musical fountain",
      "Fragrant Devaraja Market"
    ],
    builtYearOrEra: "Completed 1912 by Henry Irwin for Wadiyar Dynasty",
    unescoHeritage: false,
    bestSeason: "October to March",
    idealDuration: "2 Days",
    audioTourSummary: "Discover the splendour of the Wadiyar royalty inside Mysuru Palace, especially on Sunday evenings when 97,000 bulbs light up the grand facade.",
    coordinates: { lat: 12.3051, lng: 76.6551 }
  },

  {
    id: 11,
    name: "Munnar",
    city: "Munnar",
    state: "Kerala",
    region: "South India",
    category: "Nature",
    description: "A hill station famous for tea gardens and mountain landscapes.",
    history: "Munnar became prominent as a tea-growing region during the colonial period.",
    legend: "The surrounding Western Ghats contain many local oral traditions and cultural stories.",
    attractions: [
      "Tea Museum",
      "Eravikulam National Park",
      "Mattupetty Dam",
      "Top Station",
      "Kundala Lake"
    ],
    localFood: ["Appam", "Puttu and Kadala Curry", "Kerala Sadya"],
    nearbyPlaces: ["Thekkady", "Marayoor", "Idukki"],
    mapQuery: "Tourist places in Munnar Kerala",
    bestTime: "September to March",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200"
    ],
    food: "Appam, Puttu and Kadala Curry, Kerala Sadya",
    attractionList: [
      "Tata Tea Museum & Tea Processing",
      "Eravikulam National Park (Home of Nilgiri Tahr)",
      "Mattupetty Dam & Eco Point",
      "Top Station (High vista overlooking Tamil Nadu)",
      "Kundala Lake pedal boating"
    ],
    builtYearOrEra: "Late 19th Century Tea Plantation Heritage",
    unescoHeritage: false,
    bestSeason: "September to March",
    idealDuration: "2 - 3 Days",
    audioTourSummary: "Breathe in the cool misty air of the Western Ghats while wandering through endless emerald carpets of tea estates.",
    coordinates: { lat: 10.0889, lng: 77.0595 }
  },

  {
    id: 12,
    name: "Alappuzha Backwaters",
    city: "Alappuzha",
    state: "Kerala",
    region: "South India",
    category: "Nature",
    description: "A network of waterways, canals, lakes and villages.",
    history: "Alappuzha has a long connection with coastal trade, coir production and water-based transport.",
    legend: "Local communities maintain many traditions connected with the backwaters and annual boat races.",
    attractions: [
      "Alappuzha Beach",
      "Vembanad Lake",
      "Kuttanad",
      "Houseboat Routes",
      "Pathiramanal Island"
    ],
    localFood: ["Appam", "Kerala Fish Curry", "Puttu", "Sadya"],
    nearbyPlaces: ["Kumarakom", "Kochi", "Marari Beach"],
    mapQuery: "Alappuzha backwaters Kerala",
    bestTime: "October to March",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200"
    ],
    food: "Appam, Kerala Fish Curry, Puttu, Sadya",
    attractionList: [
      "Traditional Kettuvallam Houseboat Cruises",
      "Alappuzha Beach & Historic Pier",
      "Vembanad Lake (India's longest lake)",
      "Kuttanad (Farming below sea level)",
      "Pathiramanal Island bird sanctuary"
    ],
    builtYearOrEra: "Historic Coastal Trade & Waterway Network",
    unescoHeritage: false,
    bestSeason: "October to March",
    idealDuration: "2 Days",
    audioTourSummary: "Drift along calm palm-fringed lagoons and watch village life quietly unfold from your traditional thatched houseboat.",
    coordinates: { lat: 9.4981, lng: 76.3388 }
  },

  {
    id: 13,
    name: "Tirumala Venkateswara Temple",
    city: "Tirupati",
    state: "Andhra Pradesh",
    region: "South India",
    category: "Temple",
    description: "One of India's most visited Hindu pilgrimage destinations.",
    history: "The temple has received patronage from multiple South Indian dynasties over many centuries.",
    legend: "Temple tradition associates the deity with Lord Venkateswara, a form of Vishnu.",
    attractions: [
      "Sri Venkateswara Temple",
      "Akasa Ganga",
      "Silathoranam",
      "Sri Padmavathi Ammavari Temple"
    ],
    localFood: ["Tirupati Laddu", "South Indian Meals", "Pulihora"],
    nearbyPlaces: ["Chandragiri Fort", "Sri Kalahasti"],
    mapQuery: "Tirumala Venkateswara Temple Andhra Pradesh",
    bestTime: "September to February",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200"
    ],
    food: "Tirupati Laddu, South Indian Meals, Pulihora",
    attractionList: [
      "Sri Venkateswara Temple on the Seven Seshachalam Hills",
      "Akasa Ganga holy waterfall",
      "Silathoranam natural geological rock arch",
      "Sri Padmavathi Ammavari Temple at Tiruchanur"
    ],
    builtYearOrEra: "Ancient Dravidian Heritage (Chola, Pallava, Vijayanagara Patronage)",
    unescoHeritage: false,
    bestSeason: "September to February",
    idealDuration: "1 - 2 Days",
    audioTourSummary: "Ascend the sacred seven hills of Tirumala where millions of devotees seek blessings before the radiant deity of Lord Venkateswara.",
    coordinates: { lat: 13.6833, lng: 79.3472 }
  },

  {
    id: 14,
    name: "Hyderabad Charminar",
    city: "Hyderabad",
    state: "Telangana",
    region: "South India",
    category: "Historical",
    description: "An iconic monument in the historic centre of Hyderabad.",
    history: "Charminar was built in 1591 under Muhammad Quli Qutb Shah and became a landmark of the city.",
    legend: "Popular stories connect its construction with prayers for relief from a plague, although such stories should be distinguished from documented history.",
    attractions: [
      "Charminar",
      "Mecca Masjid",
      "Chowmahalla Palace",
      "Golconda Fort",
      "Salar Jung Museum"
    ],
    localFood: ["Hyderabadi Biryani", "Haleem", "Irani Chai", "Osmania Biscuits"],
    nearbyPlaces: ["Golconda Fort", "Ramoji Film City"],
    mapQuery: "Historical places in Hyderabad Telangana",
    bestTime: "October to February",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=1200",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200"
    ],
    food: "Hyderabadi Biryani, Haleem, Irani Chai, Osmania Biscuits",
    attractionList: [
      "Charminar (Four grand minarets & central mosque)",
      "Historic Mecca Masjid",
      "Chowmahalla Palace of the Nizams",
      "Acoustic Golconda Fort",
      "Salar Jung World Artifacts Museum"
    ],
    builtYearOrEra: "Built 1591 by Sultan Muhammad Quli Qutb Shah",
    unescoHeritage: false,
    bestSeason: "October to February",
    idealDuration: "2 - 3 Days",
    audioTourSummary: "Soak in the bustling energy of Laad Bazaar beneath the four iconic minarets of Charminar, sipping fragrant Irani chai.",
    coordinates: { lat: 17.3616, lng: 78.4747 }
  },

  // =========================
  // EAST INDIA
  // =========================

  {
    id: 15,
    name: "Konark Sun Temple",
    city: "Konark",
    state: "Odisha",
    region: "East India",
    category: "Historical",
    description: "A UNESCO World Heritage Site dedicated to the Sun God.",
    history: "The temple was built in the 13th century under King Narasimhadeva I of the Eastern Ganga dynasty.",
    legend: "Regional traditions include stories about the temple's construction and the young architect Dharmapada.",
    attractions: [
      "Sun Temple",
      "Konark Beach",
      "Archaeological Museum",
      "Chandrabhaga Beach"
    ],
    localFood: ["Pakhala Bhata", "Chhena Poda", "Dalma"],
    nearbyPlaces: ["Puri", "Bhubaneswar", "Chilika Lake"],
    mapQuery: "Konark Sun Temple Odisha",
    bestTime: "October to February",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1200",
      "https://images.unsplash.com/photo-1626244410185-d6d7e0029b43?w=1200"
    ],
    food: "Pakhala Bhata, Chhena Poda, Dalma",
    attractionList: [
      "Konark Sun Temple (Giant cosmic chariot with 24 carved stone wheels)",
      "Chandrabhaga Beach sunrise",
      "Archaeological Museum of Konark",
      "Konark Beach coastline"
    ],
    builtYearOrEra: "13th Century Eastern Ganga Dynasty",
    unescoHeritage: true,
    bestSeason: "October to February",
    idealDuration: "1 Day",
    audioTourSummary: "Stand before the colossal stone chariot of Surya at Konark, whose intricate sundial wheels measure time by the sun's shadows.",
    coordinates: { lat: 19.8876, lng: 86.0945 }
  },

  {
    id: 16,
    name: "Jagannath Temple",
    city: "Puri",
    state: "Odisha",
    region: "East India",
    category: "Temple",
    description: "A major Hindu pilgrimage destination in Puri.",
    history: "The present temple complex dates mainly to the 12th century and is associated with the Eastern Ganga dynasty.",
    legend: "The temple is dedicated to Jagannath, worshipped alongside Balabhadra and Subhadra.",
    attractions: [
      "Jagannath Temple",
      "Puri Beach",
      "Gundicha Temple",
      "Chilika Lake",
      "Konark Sun Temple"
    ],
    localFood: ["Mahaprasad", "Khaja", "Pakhala Bhata"],
    nearbyPlaces: ["Konark", "Bhubaneswar", "Chilika Lake"],
    mapQuery: "Jagannath Temple Puri Odisha",
    bestTime: "October to February",
    image: "https://images.unsplash.com/photo-1626244410185-d6d7e0029b43?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1626244410185-d6d7e0029b43?w=1200",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1200"
    ],
    food: "Mahaprasad, Khaja, Pakhala Bhata",
    attractionList: [
      "Jagannath Temple (Char Dham sacred coastal shrine)",
      "Golden Puri Beach",
      "Gundicha Temple (Garden house for Ratha Yatra)",
      "Chilika Lake boat sanctuary",
      "Ananda Bazar Mahaprasad courtyard"
    ],
    builtYearOrEra: "12th Century King Anantavarman Chodaganga Deva",
    unescoHeritage: false,
    bestSeason: "October to February",
    idealDuration: "2 Days",
    audioTourSummary: "Feel the ocean breeze and sacred hymns in Puri, home of the famed annual Ratha Yatra and sacred 56 bhog Mahaprasad.",
    coordinates: { lat: 19.8049, lng: 85.8179 }
  },

  {
    id: 17,
    name: "Bodh Gaya",
    city: "Bodh Gaya",
    state: "Bihar",
    region: "East India",
    category: "Spiritual",
    description: "One of the world's most important Buddhist pilgrimage destinations.",
    history: "Bodh Gaya is associated with Siddhartha Gautama's enlightenment and the development of Buddhist pilgrimage.",
    legend: "Buddhist tradition identifies the Bodhi Tree as the place where Gautama Buddha attained enlightenment.",
    attractions: [
      "Mahabodhi Temple",
      "Bodhi Tree",
      "Great Buddha Statue",
      "Thai Monastery",
      "Royal Bhutan Monastery"
    ],
    localFood: ["Litti Chokha", "Thekua", "Traditional Bihari Food"],
    nearbyPlaces: ["Rajgir", "Nalanda", "Gaya"],
    mapQuery: "Bodh Gaya Bihar",
    bestTime: "October to March",
    image: "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=1200",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200"
    ],
    food: "Litti Chokha, Thekua, Traditional Bihari Food",
    attractionList: [
      "Mahabodhi Temple Complex (UNESCO Heritage)",
      "Sacred Bodhi Tree & Diamond Throne (Vajrasana)",
      "Great Buddha 80-Foot Statue",
      "International Monasteries (Thai, Bhutanese, Tibetan, Japanese)",
      "Muchalinda Lake meditation spot"
    ],
    builtYearOrEra: "Emperor Ashoka 3rd Century BCE & 5th Century Brick Temple",
    unescoHeritage: true,
    bestSeason: "October to March",
    idealDuration: "2 Days",
    audioTourSummary: "Meditate beneath the tranquil leaves of the sacred Bodhi Tree where Prince Siddhartha attained supreme enlightenment.",
    coordinates: { lat: 24.6961, lng: 84.9913 }
  },

  {
    id: 18,
    name: "Sundarbans",
    city: "Sundarbans",
    state: "West Bengal",
    region: "East India",
    category: "Wildlife",
    description: "A vast mangrove ecosystem shared by India and Bangladesh.",
    history: "The Sundarbans has a long history of fishing, forest livelihoods and settlement in a changing delta environment.",
    legend: "Local traditions include stories of Bonbibi, a protective figure associated with the forest.",
    attractions: [
      "Sajnekhali",
      "Sudhanyakhali",
      "Mangrove Forests",
      "Wildlife Observation Areas"
    ],
    localFood: ["Bengali Fish Curry", "Rice-Based Dishes", "Mishti Doi"],
    nearbyPlaces: ["Kolkata", "Canning"],
    mapQuery: "Sundarbans National Park West Bengal",
    bestTime: "November to February",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200",
      "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=1200"
    ],
    food: "Bengali Fish Curry, Rice-Based Dishes, Mishti Doi",
    attractionList: [
      "Sajnekhali Bird Sanctuary & Watchtower",
      "Sudhanyakhali Watchtower for Royal Bengal Tigers",
      "Dense Tidal Mangrove Forests & Estuaries",
      "Dobanki Canopy Walk",
      "Bhagabatpur Crocodile Project"
    ],
    builtYearOrEra: "Ancient Delta Mangrove Biosphere Reserve",
    unescoHeritage: true,
    bestSeason: "November to February",
    idealDuration: "2 - 3 Days",
    audioTourSummary: "Navigate the silent tidal waterways of the world's largest mangrove forest, realm of the elusive Royal Bengal Tiger.",
    coordinates: { lat: 21.9497, lng: 89.1833 }
  },

  // =========================
  // NORTHEAST INDIA
  // =========================

  {
    id: 19,
    name: "Living Root Bridges",
    city: "Cherrapunji (Sohra)",
    state: "Meghalaya",
    region: "Northeast India",
    category: "Nature",
    description: "Living bridges grown from the aerial roots of rubber fig trees.",
    history: "Indigenous Khasi and Jaintia communities developed techniques for guiding tree roots across streams over many years.",
    legend: "The bridges are connected with local knowledge and oral traditions, but their engineering is based on living root growth and community skill.",
    attractions: [
      "Nongriat",
      "Double Decker Root Bridge",
      "Tyrna Village",
      "Nearby Waterfalls"
    ],
    localFood: ["Jadoh", "Dohneiiong", "Tungrymbai"],
    nearbyPlaces: ["Cherrapunji", "Mawsynram", "Shillong"],
    mapQuery: "Living Root Bridges Meghalaya",
    bestTime: "October to April",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200"
    ],
    food: "Jadoh, Dohneiiong, Tungrymbai",
    attractionList: [
      "Nongriat Double Decker Living Root Bridge",
      "Rainbow Falls natural pool",
      "Tyrna Village mountain stairway",
      "Nohkalikai Falls (India's tallest plunge waterfall)"
    ],
    builtYearOrEra: "Centuries-Old Indigenous Khasi Bio-Engineering",
    unescoHeritage: false,
    bestSeason: "October to April",
    idealDuration: "2 Days",
    audioTourSummary: "Trek deep into the lush rainforest gorges of Meghalaya to step upon miraculous living bridges entwined from the roots of ancient trees.",
    coordinates: { lat: 25.2500, lng: 91.6700 }
  },

  {
    id: 20,
    name: "Kaziranga National Park",
    city: "Golaghat & Nagaon",
    state: "Assam",
    region: "Northeast India",
    category: "Wildlife",
    description: "A UNESCO World Heritage Site famous for the greater one-horned rhinoceros.",
    history: "Kaziranga developed as a protected area during the early 20th century and later became a national park.",
    legend: "The region has local cultural traditions, while the park's major significance comes from wildlife conservation.",
    attractions: [
      "Wildlife Safaris",
      "Grasslands",
      "Wetlands",
      "Wildlife Observation Areas"
    ],
    localFood: ["Assamese Thali", "Khar", "Masor Tenga"],
    nearbyPlaces: ["Majuli", "Jorhat", "Tezpur"],
    mapQuery: "Kaziranga National Park Assam",
    bestTime: "November to April",
    image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=1200",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200"
    ],
    food: "Assamese Thali, Khar, Masor Tenga",
    attractionList: [
      "Central Bagori & Kohora Range Jeep Safaris",
      "Tall Elephant Grasslands & Wetlands",
      "Greater One-Horned Rhinoceros viewing",
      "Wild Water Buffaloes, Elephants & Swamp Deer",
      "Tea Estate borders and Orchid Park"
    ],
    builtYearOrEra: "Established 1905 Reserve Forest, National Park 1974",
    unescoHeritage: true,
    bestSeason: "November to April",
    idealDuration: "2 - 3 Days",
    audioTourSummary: "Embark on an early morning safari into the misty Brahmaputra floodplains, coming face-to-face with the magnificent Indian one-horned rhino.",
    coordinates: { lat: 26.5775, lng: 93.1711 }
  },

  {
    id: 21,
    name: "Tawang Monastery",
    city: "Tawang",
    state: "Arunachal Pradesh",
    region: "Northeast India",
    category: "Spiritual",
    description: "A major Tibetan Buddhist monastery in the Eastern Himalayas.",
    history: "Tawang Monastery was founded in the 17th century and remains an important centre of the Gelug school of Tibetan Buddhism.",
    legend: "Local tradition describes the monastery's location as having been chosen through a miraculous horse-related event.",
    attractions: [
      "Tawang Monastery",
      "Tawang War Memorial",
      "Sela Pass",
      "Madhuri Lake"
    ],
    localFood: ["Thukpa", "Momos", "Local Himalayan Dishes"],
    nearbyPlaces: ["Dirang", "Bomdila", "Sela Pass"],
    mapQuery: "Tawang Monastery Arunachal Pradesh",
    bestTime: "March to May and September to October",
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200",
      "https://images.unsplash.com/photo-1587922546307-776227941871?w=1200"
    ],
    food: "Thukpa, Momos, Local Himalayan Dishes",
    attractionList: [
      "Tawang Monastery (Galden Namgey Lhatse)",
      "High altitude Sela Pass (13,700 ft)",
      "Tawang War Memorial",
      "Madhuri (Sangetsar) Lake",
      "Nuranang Falls (Bong Bong Falls)"
    ],
    builtYearOrEra: "Founded 1680–1681 by Merak Lama Lodre Gyatso",
    unescoHeritage: false,
    bestSeason: "March to May and September to October",
    idealDuration: "3 Days",
    audioTourSummary: "Perched high at 10,000 feet amidst snow-capped Himalayan peaks, hear the deep horn calls and chanting monks of India's largest monastery.",
    coordinates: { lat: 27.5861, lng: 91.8594 }
  },

  // =========================
  // WEST INDIA
  // =========================

  {
    id: 22,
    name: "Ajanta Caves",
    city: "Aurangabad",
    state: "Maharashtra",
    region: "West India",
    category: "Historical",
    description: "Ancient Buddhist rock-cut caves famous for murals and sculptures.",
    history: "The caves were created in different phases, broadly from the 2nd century BCE to around the 5th century CE.",
    legend: "Many paintings depict stories associated with the Jataka tales and the previous lives of the Buddha.",
    attractions: [
      "Cave Paintings",
      "Buddhist Monasteries",
      "Rock-Cut Shrines",
      "Ancient Sculptures"
    ],
    localFood: ["Maharashtrian Thali", "Puran Poli", "Misal Pav"],
    nearbyPlaces: ["Ellora Caves", "Aurangabad", "Daulatabad Fort"],
    mapQuery: "Ajanta Caves Maharashtra",
    bestTime: "October to March",
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200",
      "https://images.unsplash.com/photo-1600100397608-f010e9e0f0d5?w=1200"
    ],
    food: "Maharashtrian Thali, Puran Poli, Misal Pav",
    attractionList: [
      "Horse-shoe shaped gorge with 30 Rock-Cut Caves",
      "Cave 1 & 2 Masterpiece Buddhist Frescoes",
      "Cave 26 Colossal Reclining Buddha",
      "Ancient Chaitya Grihas and Viharas"
    ],
    builtYearOrEra: "2nd Century BCE - 5th Century CE Satavahana & Vakataka",
    unescoHeritage: true,
    bestSeason: "October to March",
    idealDuration: "1 - 2 Days",
    audioTourSummary: "Enter the cool basalt cave chambers carved into the cliffside of the Waghur river gorge, illuminated by 2,000-year-old Buddhist tempera murals.",
    coordinates: { lat: 20.5519, lng: 75.7033 }
  },

  {
    id: 23,
    name: "Dwarkadhish Temple",
    city: "Dwarka",
    state: "Gujarat",
    region: "West India",
    category: "Temple",
    description: "A major Krishna pilgrimage destination on Gujarat's western coast.",
    history: "Dwarka has a long history as a pilgrimage town. The present temple structure reflects multiple periods of construction and renovation.",
    legend: "Hindu tradition identifies Dwarka as the kingdom of Lord Krishna.",
    attractions: [
      "Dwarkadhish Temple",
      "Gomti Ghat",
      "Rukmini Devi Temple",
      "Bet Dwarka",
      "Nageshwar Jyotirlinga"
    ],
    localFood: ["Gujarati Thali", "Thepla", "Khichdi"],
    nearbyPlaces: ["Somnath", "Porbandar", "Nageshwar"],
    mapQuery: "Dwarkadhish Temple Gujarat",
    bestTime: "October to March",
    image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=1200",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200"
    ],
    food: "Gujarati Thali, Thepla, Khichdi",
    attractionList: [
      "Dwarkadhish Jagat Mandir 5-storey spire",
      "Gomti Ghat holy river bath",
      "Rukmini Devi Temple carved stone architecture",
      "Bet Dwarka island ferry pilgrimage",
      "Nageshwar Jyotirlinga shrine"
    ],
    builtYearOrEra: "Present 5-Storey Structure 16th Century on Ancient Foundations",
    unescoHeritage: false,
    bestSeason: "October to March",
    idealDuration: "2 Days",
    audioTourSummary: "Gaze at the 52-yard sacred flag fluttering from the top spire of the Jagat Mandir on the Arabian Sea coast of Dwarka.",
    coordinates: { lat: 22.2394, lng: 68.9678 }
  },

  {
    id: 24,
    name: "Rann of Kutch",
    city: "Dhordo",
    state: "Gujarat",
    region: "West India",
    category: "Nature",
    description: "A vast seasonal salt marsh famous for its white landscape and cultural festival.",
    history: "The region has supported trading communities and distinctive pastoral cultures for centuries.",
    legend: "Local traditions include stories associated with desert communities, crafts and regional folklore.",
    attractions: [
      "White Rann",
      "Kala Dungar",
      "Dholavira",
      "Traditional Craft Villages",
      "Rann Utsav"
    ],
    localFood: ["Gujarati Thali", "Bajra Rotla", "Traditional Kutchi Dishes"],
    nearbyPlaces: ["Bhuj", "Mandvi", "Dholavira"],
    mapQuery: "Great Rann of Kutch Gujarat",
    bestTime: "November to February",
    image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=1200",
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200"
    ],
    food: "Gujarati Thali, Bajra Rotla, Traditional Kutchi Dishes",
    attractionList: [
      "Endless White Salt Desert under Full Moon",
      "Kala Dungar (Black Hill panoramic viewpoint)",
      "Dholavira (Harappan UNESCO World Heritage site)",
      "Traditional Kutchi Rogan art and mirror-work villages",
      "Rann Utsav cultural tent festival"
    ],
    builtYearOrEra: "Ancient Geological Salt Ecosystem & Harappan Civilization",
    unescoHeritage: false,
    bestSeason: "November to February",
    idealDuration: "2 - 3 Days",
    audioTourSummary: "Stand on the surreal white salt horizon of the Great Rann under a silvery full moon night, surrounded by Kutchi folk music and desert breezes.",
    coordinates: { lat: 23.8346, lng: 69.8354 }
  },

  // =========================
  // MOUNTAINS AND NATURE
  // =========================

  {
    id: 25,
    name: "Valley of Flowers",
    city: "Chamoli",
    state: "Uttarakhand",
    region: "North India",
    category: "Nature",
    description: "An alpine valley famous for seasonal wildflowers in the Himalayas.",
    history: "The valley became internationally known through botanical exploration and is now protected as a national park.",
    legend: "The wider Himalayan region has many religious and cultural traditions; the valley is especially known for its biodiversity.",
    attractions: [
      "Valley of Flowers National Park",
      "Hemkund Sahib",
      "Govindghat",
      "Joshimath"
    ],
    localFood: ["Garhwali Cuisine", "Mandua Roti", "Local Himalayan Dishes"],
    nearbyPlaces: ["Badrinath", "Auli", "Joshimath"],
    mapQuery: "Valley of Flowers National Park Uttarakhand",
    bestTime: "The park is seasonal, generally accessible in summer and early autumn",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
      "https://images.unsplash.com/photo-1587922546307-776227941871?w=1200"
    ],
    food: "Garhwali Cuisine, Mandua Roti, Local Himalayan Dishes",
    attractionList: [
      "Vibrant Himalayan Wildflower Meadows (Brahma Kamal, Blue Poppy)",
      "Hemkund Sahib high altitude glacial lake (14,100 ft)",
      "Pushpawati River Valley mountain trek",
      "Ghangaria alpine base camp"
    ],
    builtYearOrEra: "UNESCO World Heritage Nanda Devi Biosphere",
    unescoHeritage: true,
    bestSeason: "July to September (Peak flower blooming season)",
    idealDuration: "3 - 4 Days",
    audioTourSummary: "Trek through a kaleidoscope of hundreds of rare alpine wildflowers sheltered beneath towering snow peaks in the Garhwal Himalayas.",
    coordinates: { lat: 30.7280, lng: 79.6053 }
  },

  {
    id: 26,
    name: "Spiti Valley",
    city: "Kaza",
    state: "Himachal Pradesh",
    region: "North India",
    category: "Adventure",
    description: "A high-altitude Himalayan region known for monasteries and dramatic landscapes.",
    history: "Spiti has long-standing Tibetan Buddhist cultural links and historic monasteries.",
    legend: "Buddhist teachings, local oral traditions and monastery histories form an important part of the region's cultural heritage.",
    attractions: [
      "Key Monastery",
      "Tabo Monastery",
      "Dhankar Monastery",
      "Chandratal",
      "Kibber Village"
    ],
    localFood: ["Thukpa", "Momos", "Thenthuk"],
    nearbyPlaces: ["Kaza", "Tabo", "Kalpa"],
    mapQuery: "Spiti Valley Himachal Pradesh",
    bestTime: "Summer is generally the most accessible season",
    image: "https://images.unsplash.com/photo-1587922546307-776227941871?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1587922546307-776227941871?w=1200",
      "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200"
    ],
    food: "Thukpa, Momos, Thenthuk",
    attractionList: [
      "Key Monastery (Perched dramatically like a fortress)",
      "Tabo Monastery (Ajanta of the Himalayas, over 1000 years old)",
      "Dhankar Monastery on razor cliff edge",
      "Crescent-shaped Chandratal Lake",
      "Highest inhabited villages (Kibber, Hikkim, Komic)"
    ],
    builtYearOrEra: "Monasteries founded 996 CE (Tabo) to 11th Century",
    unescoHeritage: false,
    bestSeason: "May to October",
    idealDuration: "4 - 5 Days",
    audioTourSummary: "Drive through the dramatic high-altitude desert landscapes of Spiti, where ancient whitewashed monasteries cling to rugged mountain ridges.",
    coordinates: { lat: 32.2461, lng: 78.0349 }
  },

  {
    id: 27,
    name: "Andaman Islands",
    city: "Port Blair",
    state: "Andaman and Nicobar Islands",
    region: "Islands",
    category: "Beach",
    description: "An island group known for beaches, marine life and coral ecosystems.",
    history: "The islands have Indigenous histories and a colonial history that includes the Cellular Jail.",
    legend: "Island communities have distinct cultural traditions; Indigenous peoples' histories should be represented respectfully.",
    attractions: [
      "Swaraj Dweep",
      "Shaheed Dweep",
      "Cellular Jail",
      "Baratang Island",
      "Radhanagar Beach"
    ],
    localFood: ["Seafood", "Coconut-Based Dishes", "Indian Coastal Cuisine"],
    nearbyPlaces: ["Port Blair", "Havelock Island", "Neil Island"],
    mapQuery: "Tourist places in Andaman Islands India",
    bestTime: "October to May",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200"
    ],
    food: "Seafood, Coconut-Based Dishes, Indian Coastal Cuisine",
    attractionList: [
      "Radhanagar Beach (Asia's pristine white sand beach)",
      "Swaraj Dweep (Havelock) Scuba & Coral Reefs",
      "Cellular Jail National Memorial (Light & Sound show)",
      "Baratang Island Limestone Caves & Mud Volcanoes",
      "Shaheed Dweep (Neil Island) Natural Bridge"
    ],
    builtYearOrEra: "Historic Islands Archipelago & Cellular Jail (Built 1906)",
    unescoHeritage: false,
    bestSeason: "October to May",
    idealDuration: "4 - 5 Days",
    audioTourSummary: "Dip your toes into crystal-clear turquoise waters and explore rich coral gardens along the powder-white beaches of the Andaman archipelago.",
    coordinates: { lat: 11.9761, lng: 92.9876 }
  }
];

// =========================
// MADHYA PRADESH - MORENA HERITAGE
// =========================

export const kakanmathTemple: Destination = {
  id: 28,
    name: "Kakanmath Temple",
    alternateNames: [
      "Kakanmath Shiva Temple",
      "Kakanmath Mandir"
    ],
    city: "Sihoniya, Morena",
    state: "Madhya Pradesh",
    district: "Morena",
    village: "Sihoniya",
    region: "Central India",
    category: [
      "Ancient Temple",
      "Historical Monument",
      "Architecture",
      "Mystery",
      "Local Folklore"
    ],
    coordinates: {
      latitude: 26.234,
      longitude: 78.0,
      lat: 26.234,
      lng: 78.0
    },
    mapQuery: "Kakanmath Temple Sihoniya Morena Madhya Pradesh",
    introduction: `
    Kakanmath Temple is an ancient Shiva temple in Sihoniya
    village, Morena district, Madhya Pradesh.

    The temple is associated with the Kachchhapaghata dynasty
    and is an important example of medieval North Indian temple
    architecture.
  `,
    description: "An ancient 11th-century Kachchhapaghata Shiva temple in Morena, celebrated for its towering Nagara stone architecture and mysterious folklore.",
    history: {
      period: "Approximately 11th century CE",
      dynasty: "Kachchhapaghata dynasty",
      ruler: "King Kirttiraja",
      details: `
      Kakanmath Temple is historically associated with King
      Kirttiraja, who ruled during the early 11th century.

      Inscriptions connect him with a Shiva temple at a place
      identified with present-day Sihoniya.

      The temple provides evidence of the architectural skill,
      religious traditions and artistic achievements of
      medieval central India.
    `,
      historicalNote:
        "The historical account should be checked against archaeological publications and inscriptions."
    },
    architecture: {
      style: "North Indian Nagara temple architecture",
      features: [
        "Tall stone temple structure",
        "Massive stone blocks",
        "Carved pillars and architectural details",
        "Remains of the main shrine",
        "Stone sculptures and decorative elements",
        "Remains associated with the wider temple complex"
      ],
      explanation: `
      The surviving temple structure demonstrates the
      craftsmanship of medieval Indian builders.

      Its architectural form reflects the North Indian Nagara
      tradition. The arrangement of stone blocks and surviving
      structural elements can be studied to understand
      traditional construction methods.

      Claims about the exact building techniques should be
      supported by archaeological evidence.
    `
    },
    religiousSignificance: {
      deity: "Lord Shiva",
      details: `
      Kakanmath Temple was dedicated to Lord Shiva.

      Its religious significance is connected with the
      Shaiva traditions of medieval India and the temple's
      architectural and archaeological heritage.
    `
    },
    legend: "Popular folklore narrates that supernatural beings built the towering stone temple in a single night before dawn.",
    stories: [
      {
        id: "queen-kakanavati",
        title: "The Legend of Queen Kakanavati",
        type: "Local Folklore",
        story: `
        According to popular local tradition, Queen Kakanavati
        or Kakanade was devoted to Lord Shiva.

        Some versions of the story say that a magnificent
        temple was built in connection with her wishes or
        religious devotion.

        This tradition is often used to explain the temple's
        name and its cultural identity.

        However, the detailed account of the queen is not
        established as historical fact by the information
        available here.
      `,
        historicalStatus:
          "Traditional story; historical details require independent verification."
      },
      {
        id: "ghost-construction",
        title: "The Mystery of the Ghosts Who Built the Temple",
        type: "Supernatural Folklore",
        story: `
        One popular local legend claims that supernatural
        beings, often described as ghosts, built Kakanmath
        Temple in a single night.

        According to the story, the construction had to be
        completed before sunrise.

        When morning arrived, the work was supposedly
        unfinished, leaving behind the extraordinary stone
        structure seen today.

        The story has contributed to the temple's mysterious
        reputation and is part of its popular folklore.

        There is no reliable historical evidence that ghosts
        constructed the temple. The legend should therefore
        be presented as folklore rather than fact.
      `,
        historicalStatus:
          "Unverified local legend; not established historical evidence."
      },
      {
        id: "ancient-engineering",
        title: "How Did Medieval Builders Construct It?",
        type: "Architecture and Historical Inquiry",
        story: `
        The temple's large stone blocks and surviving
        architectural elements raise interesting questions
        about medieval construction.

        Builders needed to understand stone selection,
        transportation, placement, structural balance
        and architectural design.

        Modern visitors may find the structure mysterious,
        but its construction should be investigated through
        architecture, archaeology and material evidence
        rather than supernatural explanations.
      `,
        historicalStatus:
          "Architectural interpretation; specific construction techniques require archaeological evidence."
      },
      {
        id: "ruins-and-restoration",
        title: "Why Is the Temple Partly Ruined?",
        type: "Historical Inquiry",
        story: `
        Parts of Kakanmath Temple have survived, while other
        parts of the original structure are damaged or lost.

        Ancient buildings can deteriorate because of
        weathering, structural instability, environmental
        exposure and historical events.

        An inscription associated with restoration work
        around 1393–1394 CE is mentioned in accounts of
        the temple's history.

        The exact cause of every visible area of damage
        should not be attributed to a single event without
        supporting archaeological evidence.
      `,
        historicalStatus:
          "General explanation; individual causes of damage need evidence."
      }
    ],
    localFolklore: [
      "The temple was built in a single night.",
      "Supernatural beings were responsible for its construction.",
      "The name is associated in local tradition with Queen Kakanavati.",
      "The unusual stone structure inspires stories about ancient builders."
    ],
    visitorExperience: {
      recommendedFor: [
        "History lovers",
        "Architecture enthusiasts",
        "Heritage travellers",
        "Photography enthusiasts",
        "Students of archaeology",
        "Visitors interested in local folklore"
      ],
      activities: [
        "Observe the surviving temple architecture",
        "Study stone carvings from a respectful distance",
        "Learn about the Kachchhapaghata dynasty",
        "Record local oral traditions with permission",
        "Explore the surrounding heritage area"
      ],
      safety: [
        "Check current access conditions before travelling.",
        "Follow local and archaeological site rules.",
        "Do not climb unstable ruins.",
        "Do not damage or remove stones or sculptures.",
        "Respect religious practices and local residents."
      ]
    },
    relatedPlaces: [
      {
        name: "Mitawali Chausath Yogini Temple",
        state: "Madhya Pradesh",
        category: "Historical Temple",
        mapQuery: "Chausath Yogini Temple Mitawali Morena"
      },
      {
        name: "Padawali Temple Complex",
        state: "Madhya Pradesh",
        category: "Historical Temple",
        mapQuery: "Padawali Temple Morena Madhya Pradesh"
      },
      {
        name: "Bateshwar Temples",
        state: "Madhya Pradesh",
        category: "Ancient Temples",
        mapQuery: "Bateshwar Temples Morena Madhya Pradesh"
      },
      {
        name: "Gwalior Fort",
        state: "Madhya Pradesh",
        category: "Historical Fort",
        mapQuery: "Gwalior Fort Madhya Pradesh"
      }
    ],
    attractions: [
      "Tall stone Nagara temple shikhara",
      "Massive interlocking dry-stone blocks",
      "Carved pillars and celestial apsaras",
      "Remains of the central sanctum (Garbhagriha)",
      "Remains of the wider medieval temple complex"
    ],
    attractionList: [
      "Surviving Nagara temple structure standing over 100 feet tall",
      "Intricate stone carvings and sculptures preserved in ruins",
      "Unique dry-stone interlocking masonry without lime mortar",
      "Historic archaeological complex of Sihoniya village"
    ],
    localFood: [
      {
        name: "Bedai and Kachori",
        description: "Popular breakfast foods in parts of the wider region."
      },
      {
        name: "Jalebi",
        description: "A popular Indian sweet."
      },
      {
        name: "Traditional Madhya Pradesh Food",
        description: "Explore regional dishes offered by local food vendors."
      }
    ],
    food: "Bedai and Kachori, Jalebi, Traditional Madhya Pradesh Food",
    nearbyPlaces: [
      "Mitawali Chausath Yogini Temple",
      "Padawali Temple Complex",
      "Bateshwar Temples",
      "Gwalior Fort"
    ],
    languages: [
      "English",
      "Hindi"
    ],
    bestTime:
      "October to March is generally a comfortable period for exploring the region; check local weather before travelling.",
    sources: [
      {
        title: "Morena District Administration",
        url: "https://morena.nic.in/en/tourist-place/sihoniya/",
        purpose: "Official destination information"
      },
      {
        title: "Puratattva: Sihoniya — A Jewel of Chambal Valley",
        url: "https://puratattva.in/sihoniya-a-jewel-of-chambal-valley/",
        purpose: "Historical and archaeological background; verify claims against the article."
      },
      {
        title: "Madhya Pradesh Tourism",
        url: "https://www.mptourism.com/morena-tourist-places-to-visit.html",
        purpose: "Regional tourism information"
      }
    ],
    image: "https://images.unsplash.com/photo-1600100397608-f010f4448555?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1600100397608-f010f4448555?w=1200",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200"
    ],
    builtYearOrEra: "11th Century CE (King Kirttiraja)",
    unescoHeritage: false,
    bestSeason: "October to March",
    idealDuration: "Half Day excursion from Gwalior / Morena",
    audioTourSummary: "Marvel at the gravity-defying, 100-foot-high ruins of Kakanmath Temple, built of massive dry-stone blocks steeped in 1,000-year-old royal history and local folklore."
};

destinations.push(kakanmathTemple);

export const thaweMandir: Destination = {
  id: 29,
  name: "Thawe Mandir",
  alternateNames: ["Thawe Durga Mandir", "Maa Thawewali Mandir"],
  city: "Thawe, Gopalganj",
  district: "Gopalganj",
  state: "Bihar",
  region: "East India",
  category: "Temple",

  description:
    "Thawe Mandir is a famous Hindu pilgrimage site in Thawe, Gopalganj, Bihar. The temple is dedicated to Maa Thawewali, a form of Goddess Durga, and attracts devotees throughout the year.",

  history:
    "Thawe Mandir is an important religious and cultural landmark of Gopalganj. Its history is closely connected with local religious traditions. The story of its origin is preserved mainly through oral and devotional accounts.",

  legend:
    "According to local tradition, King Manan Singh was a powerful ruler who faced a severe famine in his kingdom. Rahshu Bhagat, a devoted worshipper of the Goddess, was believed to help hungry people through divine blessings. When the king demanded that the Goddess appear before him, Rahshu warned him of the consequences. The Goddess is said to have arrived from the Kamakhya region of Assam and appeared at Thawe. In the devotional story, Rahshu Bhagat attained spiritual liberation, while the king's pride led to his downfall. This is a religious legend, not a fully verified historical account.",

  architecture:
    "The temple is an active place of worship dedicated to Maa Thawewali. Visitors come to offer prayers and participate in religious observances. For detailed architectural history, archaeological documentation and local temple records should be consulted.",

  religiousSignificance: {
    deity: "Maa Thawewali (Goddess Durga)",
    details: "Dedicated to Maa Thawewali, an auspicious form of Goddess Durga revered across Bihar and neighboring regions."
  },

  attractions: [
    "Maa Thawewali Temple",
    "Rahshu Bhagat Temple",
    "Temple परिसर and pilgrimage area"
  ],

  attractionList: [
    "Maa Thawewali Temple (Sanctum Sanctorum)",
    "Rahshu Bhagat Temple (Devoted saint shrine)",
    "Temple परिसर and vibrant pilgrimage courtyard",
    "Historic Hathua Raj heritage connections"
  ],

  food: "Thawe Pidakiya — a local sweet similar to gujiya, Traditional Bihari sweets, Local vegetarian food",

  localFood: [
    "Thawe Pidakiya — a local sweet similar to gujiya",
    "Traditional Bihari sweets",
    "Local vegetarian food"
  ],

  festivals: [
    "Chaitra Navratri",
    "Sharad Navratri"
  ],

  related: [
    "Hathua Raj Palace",
    "Dhurna Kund",
    "Lakri Dargah",
    "Gopalganj",
    "Gorakhpur",
    "Bodh Gaya"
  ],

  nearbyPlaces: [
    "Hathua Raj Palace",
    "Dhurna Kund",
    "Lakri Dargah",
    "Gopalganj",
    "Gorakhpur",
    "Bodh Gaya"
  ],

  relatedPlaces: [
    { name: "Hathua Raj Palace", state: "Bihar", category: "Historical" },
    { name: "Dhurna Kund", state: "Bihar", category: "Nature" },
    { name: "Lakri Dargah", state: "Bihar", category: "Cultural" },
    { name: "Bodh Gaya", state: "Bihar", category: "Spiritual" }
  ],

  bestTime:
    "October to March is generally comfortable for travel. Navratri is an important pilgrimage period, but crowds can be very large.",

  travelTips:
    "Check current temple timings and local travel arrangements before visiting. During Navratri, allow extra time for queues and crowds. Respect temple rules and local customs.",

  map: "Thawe Mandir Gopalganj Bihar India",
  mapQuery: "Thawe Mandir Gopalganj Bihar India",

  sources: [
    {
      name: "Gopalganj District Administration — Thawe Temple",
      title: "Gopalganj District Administration — Thawe Temple",
      url: "https://gopalganj.nic.in/hi/tourist-place/%E0%A4%AE%E0%A4%BE%E0%A4%81-%E0%A4%A6%E0%A5%81%E0%A4%B0%E0%A5%8D%E0%A4%97%E0%A4%BE-%E0%A4%AE%E0%A4%82%E0%A4%A6%E0%A4%BF%E0%A4%B0-%E0%A4%A5%E0%A4%BE%E0%A4%B5%E0%A5%87/",
      purpose: "Official destination information"
    },
    {
      name: "Bihar Tourism",
      title: "Bihar Tourism",
      url: "https://tourism.bihar.gov.in/en/destinations/gopalganj/thawe-mandir",
      purpose: "Official state tourism information"
    }
  ],

  image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
  gallery: [
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200",
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200"
  ],
  images: [
    {
      url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200",
      caption: "Thawe Mandir, Gopalganj, Bihar"
    },
    {
      url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200",
      caption: "Maa Thawewali — Temple Deity"
    }
  ],
  builtYearOrEra: "Ancient / Medieval Bihar Tradition",
  unescoHeritage: false,
  bestSeason: "October to March",
  idealDuration: "1 Day",
  audioTourSummary: "Visit the revered Thawe Mandir in Gopalganj, Bihar, dedicated to Maa Thawewali and steeped in the powerful Navratri legend of Rahshu Bhagat.",
  coordinates: { lat: 26.4255, lng: 84.3828 }
};

destinations.push(thaweMandir);

export const places: Destination[] = destinations;

export const additionalPlaces: Destination[] = [
  {
    id: "thawe-mandir",
    name: "Thawe Mandir",
    state: "Bihar",
    district: "Gopalganj",
    region: "East India",
    category: "Temple",

    overview:
      "A well-known pilgrimage site dedicated to Maa Thawewali, a form of Goddess Durga.",
    description:
      "A well-known pilgrimage site dedicated to Maa Thawewali, a form of Goddess Durga.",

    history:
      "Thawe Mandir is an important religious and cultural landmark of Gopalganj. Its origin is closely associated with local devotional traditions.",

    legends: [
      {
        title: "Rahshu Bhagat and Maa Thawewali",
        story:
          "According to local religious tradition, Rahshu Bhagat was a devoted worshipper of the Goddess. Stories connect his devotion with the arrival of Maa Thawewali at Thawe. Different versions of the legend are preserved through local oral traditions.",
        type: "Traditional religious legend"
      }
    ],

    attractions: [
      "Maa Thawewali Temple",
      "Rahshu Bhagat Temple"
    ],

    food: ["Pidakiya", "Traditional Bihari sweets"],
    localFood: ["Pidakiya", "Traditional Bihari sweets"],

    festivals: ["Chaitra Navratri", "Sharad Navratri"],

    mapQuery: "Thawe Mandir Gopalganj Bihar",

    sources: [
      {
        title: "Gopalganj District Administration",
        url:
          "https://gopalganj.nic.in/hi/tourist-place/%E0%A4%AE%E0%A4%BE%E0%A4%81-%E0%A4%A6%E0%A5%81%E0%A4%B0%E0%A5%8D%E0%A4%97%E0%A4%BE-%E0%A4%AE%E0%A4%82%E0%A4%A6%E0%A4%BF%E0%A4%B0-%E0%A4%A5%E0%A4%BE%E0%A4%B5%E0%A5%87/"
      }
    ],

    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
    images: [
      {
        url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200",
        caption: "Thawe Mandir, Gopalganj, Bihar"
      },
      {
        url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200",
        caption: "Maa Thawewali — Temple Deity"
      }
    ]
  },

  {
    id: "kakanmath-temple",
    name: "Kakanmath Temple",
    state: "Madhya Pradesh",
    district: "Morena",
    region: "Central India",
    category: "Historical Temple",

    overview:
      "An important medieval Shiva temple located at Sihoniya in Morena district.",
    description:
      "An important medieval Shiva temple located at Sihoniya in Morena district.",

    history:
      "The temple is associated with the Kachchhapaghata dynasty and King Kirttiraja. Its remains provide evidence of medieval temple architecture.",

    legends: [
      {
        title: "The One-Night Construction Story",
        story:
          "Local folklore says supernatural beings built the temple in a single night. This story is a legend and not established historical evidence.",
        type: "Local folklore"
      },
      {
        title: "Queen Kakanavati",
        story:
          "Some local traditions connect the temple's name and origin with a queen devoted to Lord Shiva. This account should be presented as folklore unless supported by historical evidence.",
        type: "Traditional account"
      }
    ],

    attractions: [
      "Temple ruins",
      "Stone carvings",
      "Medieval architectural remains"
    ],

    food: ["Local Madhya Pradesh cuisine"],
    localFood: ["Local Madhya Pradesh cuisine"],

    festivals: ["Check local temple calendar"],

    mapQuery: "Kakanmath Temple Sihoniya Morena Madhya Pradesh",

    sources: [],
    image: "https://images.unsplash.com/photo-1600100397608-f010f4448555?w=800"
  },

  {
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    district: "Vijayanagara",
    region: "South India",
    category: "Historical Heritage",

    overview:
      "A historic landscape containing the remains of the Vijayanagara Empire.",
    description:
      "A historic landscape containing the remains of the Vijayanagara Empire.",

    history:
      "Hampi was the centre of the Vijayanagara Empire and contains temples, public buildings, market streets and other archaeological remains.",

    legends: [
      {
        title: "Kishkindha Traditions",
        story:
          "The wider region is associated in Hindu tradition with Kishkindha and stories from the Ramayana. These religious traditions should be distinguished from archaeological evidence.",
        type: "Epic tradition"
      }
    ],

    attractions: [
      "Virupaksha Temple",
      "Vittala Temple complex",
      "Stone Chariot",
      "Royal enclosure"
    ],

    food: ["Local Karnataka cuisine"],
    localFood: ["Local Karnataka cuisine"],

    festivals: ["Check current local festival calendar"],

    mapQuery: "Hampi Karnataka India",

    sources: [],
    image: "https://images.unsplash.com/photo-1600100397608-f010f4448555?w=800"
  },

  {
    id: "konark-sun-temple",
    name: "Konark Sun Temple",
    state: "Odisha",
    district: "Puri",
    region: "East India",
    category: "Historical Temple",

    overview:
      "A celebrated Sun Temple known for its monumental stone architecture.",
    description:
      "A celebrated Sun Temple known for its monumental stone architecture.",

    history:
      "The temple was built in the 13th century under the Eastern Ganga dynasty and is dedicated to Surya, the Sun God.",

    legends: [
      {
        title: "Local and Religious Traditions",
        story:
          "The temple is surrounded by cultural and religious stories. Each account should be checked against reliable historical or regional sources before being presented as fact.",
        type: "Traditional stories"
      }
    ],

    attractions: [
      "Main temple remains",
      "Stone wheel carvings",
      "Sculptural details"
    ],

    food: ["Traditional Odia cuisine"],
    localFood: ["Traditional Odia cuisine"],

    festivals: ["Konark Dance Festival — check current dates"],

    mapQuery: "Konark Sun Temple Odisha India",

    sources: [],
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800"
  }
];

// Add these records to the existing destination array.
places.push(...additionalPlaces);

export const initialDestinations: Destination[] = destinations;

export const CATEGORIES: Array<{ id: string; label: string; icon: string }> = [
  { id: 'All', label: 'All Destinations', icon: 'Sparkles' },
  { id: 'Spiritual', label: 'Spiritual', icon: 'Sun' },
  { id: 'Temple', label: 'Temples & Shrines', icon: 'Sun' },
  { id: 'Historical', label: 'Historical & Forts', icon: 'Landmark' },
  { id: 'Nature', label: 'Nature & Landscapes', icon: 'Mountain' },
  { id: 'Wildlife', label: 'Wildlife & Sanctuaries', icon: 'Compass' },
  { id: 'Adventure', label: 'Adventure & Mountains', icon: 'Mountain' },
  { id: 'Beach', label: 'Beaches & Islands', icon: 'Waves' }
];

export const REGIONS = [
  'All',
  'North India',
  'South India',
  'East India',
  'West India',
  'Central India',
  'Northeast India',
  'Islands'
] as const;
