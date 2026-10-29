# 🏛️ Travel Lens AI — System Architecture & Data Model

> **IBM Db2 TechX Summit 2026 Db2 Hack Challenge**  
> Architecture & Design Specification

---

## 1. High-Level System Architecture

Travel Lens AI follows a decoupled, three-tier architecture uniting an interactive client frontend, an Express.js enterprise API service layer, an **IBM Db2** relational database, and **Google Gemini 3.8 Flash** generative AI models.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CLIENT TIER (React 19 SPA)                            │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐  │
│  │ Destination Explorer  │  │ Spoken Audio Guide    │  │ AI Visual Lens  │  │
│  │ (Search, Filter, Map) │  │ (Anvesha Voice Engine)│  │ (Camera/Photo)  │  │
│  └───────────┬───────────┘  └───────────┬───────────┘  └────────┬────────┘  │
│              │                          │                       │           │
│              └──────────────────────────┼───────────────────────┘           │
│                                         │ HTTP REST (JSON)                  │
└─────────────────────────────────────────┼───────────────────────────────────┘
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      APPLICATION TIER (Node.js & Express)                   │
│                                                                             │
│   server.ts (Express Gateway on Port 3000)                                  │
│   ├── /api/db2/status       ──►  server/db2.ts (Live Connection Pool)       │
│   ├── /api/destinations     ──►  Parameterized SQL Query Engine             │
│   ├── /api/destinations/:id ──►  Relational Join Query Engine               │
│   ├── /api/ghats            ──►  Varanasi Ghats Service                     │
│   └── /api/lens/*           ──►  Google Gemini 3.8 Flash SDK Proxy          │
│                                         │                                   │
└─────────────────────────────────────────┼───────────────────────────────────┘
                 ┌────────────────────────┴───────────────────────┐
                 │                                                │
                 ▼ SQL over SSL (Port 50001)                      ▼ HTTPS API
┌────────────────────────────────────────────────┐  ┌─────────────────────────┐
│              DATA STORAGE TIER                 │  │       AI ENGINE         │
│                                                │  │                         │
│        IBM Db2 on Cloud (BLUDB)                │  │   Google Gemini 3.8     │
│   ┌────────────────────────────────────────┐   │  │   Flash Models          │
│   │ DESTINATIONS                           │   │  │   - Storytelling        │
│   │ ├── DESTINATION_IMAGES (1:N)           │   │  │   - Multi-day Itinerary │
│   │ ├── DESTINATION_ATTRACTIONS (1:N)      │   │  │   - Heritage Concierge  │
│   │ ├── DESTINATION_FOOD (1:N)             │   │  │   - Visual Photo Lens   │
│   │ ├── DESTINATION_FESTIVALS (1:N)        │   │  └─────────────────────────┘
│   │ └── DESTINATION_SOURCES (1:N)          │   │
│   │ VARANASI_GHATS                         │   │
│   │ USER_WISHLISTS                         │   │
│   └────────────────────────────────────────┘   │
└────────────────────────────────────────────────┘
```

---

## 2. IBM Db2 Entity-Relationship (ER) Schema

The database schema is normalized into relational tables with cascading foreign keys:

```
┌───────────────────────────┐
│       DESTINATIONS        │
├───────────────────────────┤
│ PK  ID (VARCHAR 64)       │◄──┐
│     NAME (VARCHAR 255)    │   │
│     CITY (VARCHAR 128)    │   │
│     DISTRICT              │   │
│     STATE (VARCHAR 128)   │   │
│     REGION (VARCHAR 64)   │   │
│     CATEGORY (VARCHAR 128)│   │
│     OVERVIEW (CLOB)       │   │
│     DESCRIPTION (CLOB)    │   │
│     HISTORY (CLOB)        │   │
│     LEGEND (CLOB)         │   │
│     ARCHITECTURE (CLOB)   │   │
│     PRIMARY_IMAGE         │   │
│     LATITUDE / LONGITUDE  │   │
│     UNESCO_HERITAGE       │   │
│     CREATED_AT            │   │
└─────────────┬─────────────┘   │
              │ 1               │
              │                 │
              ├─────────────────┼───────────────────────────┬───────────────────────────┐
              │ N               │ N                         │ N                         │ N
              ▼                 │                           │                           │
┌───────────────────────────┐   │                           │                           │
│    DESTINATION_IMAGES     │   │                           │                           │
├───────────────────────────┤   │                           │                           │
│ PK  ID (BIGINT IDENTITY)  │   │                           │                           │
│ FK  DESTINATION_ID ───────┼───┘                           │                           │
│     IMAGE_URL             │                               │                           │
│     CAPTION               │                               │                           │
│     DISPLAY_ORDER         │                               │                           │
└───────────────────────────┘                               ▼                           ▼
                                            ┌───────────────────────────┐ ┌───────────────────────────┐
                                            │  DESTINATION_ATTRACTIONS  │ │     DESTINATION_FOOD      │
                                            ├───────────────────────────┤ ├───────────────────────────┤
                                            │ PK  ID (BIGINT IDENTITY)  │ │ PK  ID (BIGINT IDENTITY)  │
                                            │ FK  DESTINATION_ID        │ │ FK  DESTINATION_ID        │
                                            │     ATTRACTION_NAME       │ │     DISH_NAME             │
                                            │     DETAILS               │ │     DISH_DESCRIPTION      │
                                            │     DISPLAY_ORDER         │ │     DISPLAY_ORDER         │
                                            └───────────────────────────┘ └───────────────────────────┘
```

---

## 3. Data Flow Pipelines

### A. Destination Retrieval Pipeline
1. **User Action**: The traveler enters a keyword (e.g., `"Thawe"` or `"Kakanmath"`), selects a category, or selects a region.
2. **Frontend Request**: Client initiates `GET /api/destinations?search=Thawe`.
3. **Backend Query Execution**:
   - `server/db2.ts` checks if IBM Db2 is configured.
   - If configured: Executes parameterized SQL:
     ```sql
     SELECT * FROM DESTINATIONS 
     WHERE (LOWER(NAME) LIKE ? OR LOWER(STATE) LIKE ?)
     ORDER BY NAME ASC
     ```
   - If unconfigured/offline: Gracefully queries the local cached dataset.
4. **Response**: Returns JSON with payload and telemetry header (`source: "ibm_db2" | "fallback_local_cache"`).
5. **UI Rendering**: Destination cards are rendered with localized names, images, and audio narration trigger.

### B. Deep Storytelling Pipeline (Hybrid Db2 + Gemini AI)
1. **User Action**: Traveler clicks `"Discover Cultural Story"`.
2. **Data Layer (Db2)**: Retrieves canonical verified history, recorded dates, royal patrons, and oral legends from `DESTINATIONS.HISTORY` and `DESTINATIONS.LEGEND`.
3. **AI Enhancement (Gemini 3.8 Flash)**: The server sends structured prompt grounding the AI in the exact verified historical facts retrieved from Db2.
4. **Output**: The user receives a vivid chronicle, secret trivia, sensory descriptions, and local etiquette in their chosen language.

---

## 4. Security & Connection Lifecycle Model

1. **Zero Secret Exposure**:
   - Database credentials (`DB2_HOSTNAME`, `DB2_PORT`, `DB2_DATABASE`, `DB2_UID`, `DB2_PWD`) and Google Gemini API keys exist exclusively on the server side.
   - Frontend bundles never import or receive connection strings or passwords.
2. **Connection Safety**:
   - All connection requests use SSL/TLS (`Security=SSL` on Port 50001).
   - Error messages are scrubbed of credentials before logging or transmitting over HTTP.
   - Connections are closed explicitly via `conn.close()` in both success and error handlers.
3. **SQL Injection Defense**:
   - All dynamic inputs are sanitized and executed using parameterized placeholders (`?`).

---

## 5. Fault Tolerance & High Availability (Local Cache Fallback)

To guarantee that the user experience is never interrupted during cloud database cold starts or maintenance windows:
- If `DB2_HOSTNAME` is not configured, or if the connection times out:
  - The server logs a diagnostic warning.
  - The API seamlessly serves the curated local dataset.
  - The UI accurately indicates `Db2 Mode: Local Cache` rather than falsely claiming database connectivity.
- Once credentials are supplied, clicking **"Test Connection"** immediately establishes live Db2 communication without requiring a server reboot.
