-- ==============================================================================
-- TRAVEL LENS AI - IBM Db2 Sample Seed Script
-- Target: Run directly in IBM Cloud Db2 SQL Editor or via db2 -tvf db/seed.sql
-- ==============================================================================

-- 1. Insert Destinations
INSERT INTO DESTINATIONS (
    ID, NAME, ALTERNATE_NAMES, CITY, DISTRICT, STATE, REGION, CATEGORY,
    OVERVIEW, DESCRIPTION, HISTORY, LEGEND, ARCHITECTURE,
    BEST_TIME, BEST_SEASON, IDEAL_DURATION, UNESCO_HERITAGE,
    AUDIO_TOUR_SUMMARY, TRAVEL_TIPS, MAP_QUERY, LATITUDE, LONGITUDE,
    PRIMARY_IMAGE, BUILT_ERA
) VALUES (
    'thawe-mandir',
    'Thawe Mandir',
    'Thawe Durga Mandir, Maa Thawewali Mandir',
    'Thawe',
    'Gopalganj',
    'Bihar',
    'East India',
    'Temple',
    'A well-known pilgrimage site dedicated to Maa Thawewali, a form of Goddess Durga.',
    'Thawe Mandir is a famous Hindu pilgrimage site in Thawe, Gopalganj, Bihar. The temple is dedicated to Maa Thawewali, a form of Goddess Durga, and attracts devotees throughout the year.',
    'Thawe Mandir is an important religious and cultural landmark of Gopalganj. Its history is closely connected with local religious traditions. The story of its origin is preserved mainly through oral and devotional accounts.',
    'According to local tradition, King Manan Singh was a powerful ruler who faced a severe famine in his kingdom. Rahshu Bhagat, a devoted worshipper of the Goddess, helped hungry people through divine blessings. When the king demanded that the Goddess appear before him, Rahshu warned him of the consequences. The Goddess arrived from Kamakhya, Assam and appeared at Thawe. Rahshu Bhagat attained spiritual liberation while the king''s pride led to his downfall.',
    'The temple is an active place of worship dedicated to Maa Thawewali. Visitors come to offer prayers and participate in religious observances.',
    'October to March is generally comfortable for travel. Navratri is an important pilgrimage period, but crowds can be very large.',
    'October to March',
    '1 Day',
    0,
    'Visit the revered Thawe Mandir in Gopalganj, Bihar, dedicated to Maa Thawewali and steeped in the powerful Navratri legend of Rahshu Bhagat.',
    'Check current temple timings and local travel arrangements before visiting. During Navratri, allow extra time for queues and crowds. Respect temple rules and local customs.',
    'Thawe Mandir Gopalganj Bihar India',
    26.425500,
    84.382800,
    'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    'Ancient / Medieval Bihar Tradition'
);

INSERT INTO DESTINATIONS (
    ID, NAME, ALTERNATE_NAMES, CITY, DISTRICT, STATE, REGION, CATEGORY,
    OVERVIEW, DESCRIPTION, HISTORY, LEGEND, ARCHITECTURE,
    BEST_TIME, BEST_SEASON, IDEAL_DURATION, UNESCO_HERITAGE,
    AUDIO_TOUR_SUMMARY, TRAVEL_TIPS, MAP_QUERY, LATITUDE, LONGITUDE,
    PRIMARY_IMAGE, BUILT_ERA
) VALUES (
    'kakanmath-temple',
    'Kakanmath Temple',
    'Kakanmadh, Sihoniya Temple',
    'Sihoniya',
    'Morena',
    'Madhya Pradesh',
    'Central India',
    'Historical Temple',
    'An important medieval Shiva temple located at Sihoniya in Morena district.',
    'Kakanmath is a ruined 11th-century Hindu temple complex located at Sihoniya in Morena district, Madhya Pradesh, renowned for its massive dry-stone architecture.',
    'Built during the reign of the Kachchhapaghata ruler Kirttiraja (c. 1015-1035 CE). An inscription records the founding of an imposing temple dedicated to Shiva at Simhapaniya (modern Sihoniya).',
    'According to popular Chambal folklore, supernatural spirits and ghosts erected the temple in a single night from huge sandstone blocks, but abandoned it unfinished when the dawn cock crew.',
    'Towering over 100 feet in height, Kakanmath was built in the Nagara architectural style with piled dry-stone blocks fitted without lime mortar.',
    'October to March is pleasant for exploring heritage ruins in Chambal Valley.',
    'October to March',
    'Half Day excursion',
    0,
    'Marvel at the gravity-defying, 100-foot-high ruins of Kakanmath Temple, built of massive dry-stone blocks steeped in 1,000-year-old royal history and local folklore.',
    'Wear sturdy walking shoes. Carry drinking water as facilities near the archaeological site are basic.',
    'Kakanmath Temple Sihoniya Morena Madhya Pradesh',
    26.671000,
    78.261000,
    'https://images.unsplash.com/photo-1600100397608-f010f4448555?w=800',
    '11th Century CE (King Kirttiraja)'
);

INSERT INTO DESTINATIONS (
    ID, NAME, ALTERNATE_NAMES, CITY, DISTRICT, STATE, REGION, CATEGORY,
    OVERVIEW, DESCRIPTION, HISTORY, LEGEND, ARCHITECTURE,
    BEST_TIME, BEST_SEASON, IDEAL_DURATION, UNESCO_HERITAGE,
    AUDIO_TOUR_SUMMARY, TRAVEL_TIPS, MAP_QUERY, LATITUDE, LONGITUDE,
    PRIMARY_IMAGE, BUILT_ERA
) VALUES (
    'varanasi',
    'Varanasi',
    'Kashi, Banaras, City of Light',
    'Varanasi',
    'Varanasi',
    'Uttar Pradesh',
    'North India',
    'Spiritual',
    'The spiritual capital of India, one of the oldest continuously inhabited cities in the world.',
    'Varanasi rises from the western banks of the sacred River Ganges with its labyrinth of ancient galis, classical silk weavers, and vibrant continuous rituals.',
    'Mark Twain wrote: "Banaras is older than history, older than tradition, older even than legend, and looks twice as old as all of them put together."',
    'Associated with Lord Shiva as his earthly abode. Traditions recount that drops of celestial amrit sanctified the ghats, granting spiritual liberation to pilgrims.',
    'Distinctive riverfront architecture featuring soaring stepped stone ghats, Maratha balconies, and riverside spires.',
    'October to March brings cool river breezes and festive Deepavali celebrations.',
    'October to March',
    '2 - 3 Days',
    0,
    'Experience sunrise along the 84 sacred riverfront ghats of Kashi, where the chiming of temple bells and ancient chants echo across the eternal waters of Mother Ganga.',
    'Take a sunrise wooden boat ride from Assi to Dashashwamedh. Walk through narrow lanes with a local guide.',
    'Varanasi Uttar Pradesh India',
    25.317600,
    82.973900,
    'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
    'Ancient (Continuously Inhabited Since 1200 BCE)'
);

INSERT INTO DESTINATIONS (
    ID, NAME, ALTERNATE_NAMES, CITY, DISTRICT, STATE, REGION, CATEGORY,
    OVERVIEW, DESCRIPTION, HISTORY, LEGEND, ARCHITECTURE,
    BEST_TIME, BEST_SEASON, IDEAL_DURATION, UNESCO_HERITAGE,
    AUDIO_TOUR_SUMMARY, TRAVEL_TIPS, MAP_QUERY, LATITUDE, LONGITUDE,
    PRIMARY_IMAGE, BUILT_ERA
) VALUES (
    'hampi',
    'Hampi',
    'Vijayanagara, Pampa Kshetra',
    'Hampi',
    'Vijayanagara',
    'Karnataka',
    'South India',
    'Historical Heritage',
    'A historic landscape containing the remains of the Vijayanagara Empire.',
    'UNESCO World Heritage landscape of boulder-strewn hills dotted with palatial complexes, royal stables, and the famous stone chariot of Vittala Temple.',
    'Flourished between the 14th and 16th centuries as the wealthy capital of the Vijayanagara Empire.',
    'Associated with Kishkindha, the monkey kingdom described in the Ramayana where Rama met Sugriva and Hanuman.',
    'Dravidian architectural marvels including musical stone pillars, inverted shadows in Virupaksha gopuram, and geometric pushkarani stepwells.',
    'November to February offers mild sunshine for cycling through the ruins.',
    'October to February',
    '2 - 3 Days',
    1,
    'Walk through the boulder-strewn royal capital of Vijayanagara, where carved stone chariots and melodic temple pillars echo with the glory of South India''s greatest empire.',
    'Rent a bicycle to explore the vast ruins. Climb Matanga Hill at sunrise for panoramic vistas.',
    'Hampi Karnataka India',
    15.335000,
    76.460000,
    'https://images.unsplash.com/photo-1600100397608-f010f4448555?w=800',
    '14th - 16th Century Vijayanagara Empire'
);

INSERT INTO DESTINATIONS (
    ID, NAME, ALTERNATE_NAMES, CITY, DISTRICT, STATE, REGION, CATEGORY,
    OVERVIEW, DESCRIPTION, HISTORY, LEGEND, ARCHITECTURE,
    BEST_TIME, BEST_SEASON, IDEAL_DURATION, UNESCO_HERITAGE,
    AUDIO_TOUR_SUMMARY, TRAVEL_TIPS, MAP_QUERY, LATITUDE, LONGITUDE,
    PRIMARY_IMAGE, BUILT_ERA
) VALUES (
    'konark-sun-temple',
    'Konark Sun Temple',
    'Black Pagoda, Arka Kshetra',
    'Konark',
    'Puri',
    'Odisha',
    'East India',
    'Historical Temple',
    'A celebrated Sun Temple known for its monumental stone architecture.',
    'A 13th-century UNESCO World Heritage monument engineered as a colossal cosmic stone chariot with 24 carved wheels pulled by seven galloping horses.',
    'Commissioned by King Narasimhadeva I of the Eastern Ganga dynasty around 1250 CE.',
    'Legends tell of Dharmapada, the young 12-year-old son of the chief architect, who solved the riddle of crowning the temple shikhara with the heavy magnetic kalasha.',
    'Kalinga architectural style using Khondalite stone with astronomically precise sundial wheels.',
    'October to February coincides with coastal breezes and the Konark Dance Festival.',
    'October to February',
    '1 Day',
    1,
    'Stand before the colossal stone chariot of Surya at Konark, whose intricate sundial wheels measure time by the sun''s shadows.',
    'Visit Chandrabhaga beach at sunrise before heading to the monument. Hire an ASI-certified guide.',
    'Konark Sun Temple Odisha India',
    19.887600,
    86.094500,
    'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800',
    '13th Century Eastern Ganga Dynasty'
);

-- 2. Insert Gallery Images
INSERT INTO DESTINATION_IMAGES (DESTINATION_ID, IMAGE_URL, CAPTION, DISPLAY_ORDER)
VALUES ('thawe-mandir', 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200', 'Thawe Mandir, Gopalganj, Bihar', 1);

INSERT INTO DESTINATION_IMAGES (DESTINATION_ID, IMAGE_URL, CAPTION, DISPLAY_ORDER)
VALUES ('thawe-mandir', 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200', 'Maa Thawewali — Temple Deity', 2);

-- 3. Insert Attractions
INSERT INTO DESTINATION_ATTRACTIONS (DESTINATION_ID, ATTRACTION_NAME, DETAILS, DISPLAY_ORDER)
VALUES ('thawe-mandir', 'Maa Thawewali Temple', 'Main Sanctum Sanctorum where daily Aarti and vows take place', 1);

INSERT INTO DESTINATION_ATTRACTIONS (DESTINATION_ID, ATTRACTION_NAME, DETAILS, DISPLAY_ORDER)
VALUES ('thawe-mandir', 'Rahshu Bhagat Temple', 'Sacred shrine of the devoted devotee Rahshu', 2);

INSERT INTO DESTINATION_ATTRACTIONS (DESTINATION_ID, ATTRACTION_NAME, DETAILS, DISPLAY_ORDER)
VALUES ('thawe-mandir', 'Hathua Raj Heritage Precinct', 'Historical connections to the Hathua Raj estate', 3);

-- 4. Insert Local Foods
INSERT INTO DESTINATION_FOOD (DESTINATION_ID, DISH_NAME, DISH_DESCRIPTION, DISPLAY_ORDER)
VALUES ('thawe-mandir', 'Thawe Pidakiya', 'A famous local delicacy resembling gujiya with mawa/suji filling', 1);

INSERT INTO DESTINATION_FOOD (DESTINATION_ID, DISH_NAME, DISH_DESCRIPTION, DISPLAY_ORDER)
VALUES ('thawe-mandir', 'Traditional Bihari Sweets', 'Khaja, Balushahi, and seasonal sweets', 2);

INSERT INTO DESTINATION_FOOD (DESTINATION_ID, DISH_NAME, DISH_DESCRIPTION, DISPLAY_ORDER)
VALUES ('thawe-mandir', 'Local Vegetarian Thali', 'Authentic regional meals offered near the pilgrimage zone', 3);

-- 5. Insert Festivals
INSERT INTO DESTINATION_FESTIVALS (DESTINATION_ID, FESTIVAL_NAME, SEASON)
VALUES ('thawe-mandir', 'Chaitra Navratri', 'Spring (March - April)');

INSERT INTO DESTINATION_FESTIVALS (DESTINATION_ID, FESTIVAL_NAME, SEASON)
VALUES ('thawe-mandir', 'Sharad Navratri', 'Autumn (September - October)');

-- 6. Insert Varanasi Ghats
INSERT INTO VARANASI_GHATS (NAME, CATEGORY, STORY, SIGNIFICANCE, EXPERIENCE, LOCATION, IMAGE_URL, DISPLAY_ORDER)
VALUES (
    'Dashashwamedh Ghat',
    'History & Spirituality',
    'Dashashwamedh Ghat is one of the best-known ghats in Varanasi. A popular traditional legend connects its name with a great sacrifice involving ten horses. Today, the ghat is especially famous for its evening Ganga Aarti, which attracts visitors and pilgrims.',
    'The ghat is an important centre of religious activity and public ceremonies along the River Ganges.',
    'Observe the riverfront, learn about the Ganga Aarti tradition and explore the nearby old city.',
    'Dashashwamedh Ghat, Varanasi',
    'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
    1
);

INSERT INTO VARANASI_GHATS (NAME, CATEGORY, STORY, SIGNIFICANCE, EXPERIENCE, LOCATION, IMAGE_URL, DISPLAY_ORDER)
VALUES (
    'Assi Ghat',
    'Culture & Spirituality',
    'Assi Ghat is located near the confluence area associated with the Assi stream and the River Ganges. It is an important gathering place for residents, pilgrims, students and visitors.',
    'The ghat is associated with religious traditions, morning prayers and cultural activities.',
    'Explore the riverfront, observe sunrise and learn about the cultural life of Varanasi.',
    'Assi Ghat, Varanasi',
    'https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=800',
    2
);

INSERT INTO VARANASI_GHATS (NAME, CATEGORY, STORY, SIGNIFICANCE, EXPERIENCE, LOCATION, IMAGE_URL, DISPLAY_ORDER)
VALUES (
    'Manikarnika Ghat',
    'History & Religious Traditions',
    'Manikarnika Ghat is one of Varanasi''s principal cremation ghats. Hindu traditions associate the ghat with liberation from the cycle of rebirth. Its name is connected with religious legends involving a jewel or earring.',
    'The ghat is closely connected with Hindu funeral traditions and beliefs about moksha.',
    'Learn respectfully about the history and religious significance of the site.',
    'Manikarnika Ghat, Varanasi',
    'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=800',
    3
);
