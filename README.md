# 🧭 Travel Lens AI — Cultural Heritage & Travel Storytelling Engine

> **Don't Just Visit a Place. Discover Its Story.**  
> Built for the **IBM Db2 TechX Summit 2026 Db2 Hack Challenge**.

[![IBM Db2](https://img.shields.io/badge/Database-IBM%20Db2-052FAD?logo=ibm&logoColor=white)](https://www.ibm.com/products/db2)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React 19](https://img.shields.io/badge/Frontend-React%2019%20%7C%20TypeScript-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini%203.8%20Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## 📖 Table of Contents
1. [Project Overview & Problem Statement](#-project-overview--problem-statement)
2. [Key Features & Real-World Use Cases](#-key-features--real-world-use-cases)
3. [Technology Stack](#-technology-stack)
4. [Role of IBM Db2 in Travel Lens AI](#-role-of-ibm-db2-in-travel-lens-ai)
5. [Prerequisites & Installation](#-prerequisites--installation)
6. [Environment Configuration (.env)](#-environment-configuration-env)
7. [Running the Application](#-running-the-application)
8. [Database Migration & Seeding](#-database-migration--seeding)
9. [REST API Documentation](#-rest-api-documentation)
10. [IBM Db2 Connection Verification](#-ibm-db2-connection-verification)
11. [GitHub Repository Setup & Submission Guide](#-github-repository-setup--submission-guide)

---

## 🌟 Project Overview & Problem Statement

### The Problem
India is home to thousands of ancient temples, medieval forts, and UNESCO heritage landmarks. Yet, travelers often visit magnificent sites without understanding their history, oral legends, sacred rituals, or authentic local food traditions. Furthermore, cultural tourism platforms frequently rely on transient, unindexed caches or generic travel listings that lack deep relational structure, reliable data persistence, and cultural nuance.

### The Solution: Travel Lens AI
**Travel Lens AI** bridges centuries of cultural heritage with enterprise relational database engineering and generative AI. It organizes, preserves, and serves comprehensive Indian heritage datasets powered by **IBM Db2** and elevates the journey with:
- **Relational Enterprise Storage**: Structured IBM Db2 schema capturing monuments, legends, architectural styles, galleries, local cuisine, and festivals.
- **Multilingual Generative Storytelling**: Evocative historical tales, secret trivia, and cultural etiquette generated via Google Gemini 3.8 Flash.
- **AI Visual Photo Lens**: Computer vision analysis that identifies monuments or food dishes from user camera snapshots.
- **Spoken Indian Audio Guides**: Natural speech synthesis narrating stories in Indian English and Hindi accents.
- **High Availability & Fault Tolerance**: Robust fallback cache architecture ensuring 100% uptime even during network or database maintenance.

---

## 🚀 Key Features & Real-World Use Cases

| Feature | Description | Use Case |
| :--- | :--- | :--- |
| **🏛️ Destination & Story Explorer** | 29+ rich Indian heritage destinations (Thawe Mandir, Kakanmath Temple, Varanasi, Hampi, Konark Sun Temple, etc.) with deep historical and folklore chronicles. | Tourists researching origins, royal patrons, and oral legends before visiting. |
| **🌊 Ghats of Kashi Trail** | Dedicated interactive exploration of the 8 sacred riverfront ghats of Varanasi (Dashashwamedh, Assi, Manikarnika, etc.). | Pilgrims and heritage walkers navigating riverfront rituals and evening Ganga Aarti. |
| **📸 AI Visual Photo Lens** | Upload or photograph any Indian monument, sculpture, or regional dish for instant AI identification, historical era, and architectural style breakdown. | On-site travelers snapping photos of unfamiliar temple carvings or regional sweets. |
| **🎙️ Spoken Voice Guide (Anvesha AI)** | Hands-free audio tour narration with Indian accent voices (`hi-IN`, `en-IN`), playback controls, and speed tuning. | Travelers walking through temple ruins listening to stories like an audio museum tour. |
| **🗓️ Smart AI Itinerary Planner** | Paced multi-day itineraries customized by travel style (Heritage, Foodie, Photography) and budget with specific meal stops. | Solo travelers and families planning optimal routes and avoiding peak crowds. |
| **📍 Real Google Maps Integration** | Direct Google Maps navigation links with precise geo-coordinates (`lat`, `lng`). | Navigation and ride-hailing to destination gates. |
| **🌐 Multilingual Support (13 Languages)** | Real-time translation supporting English, Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Punjabi, Urdu, French, Spanish, German, and Japanese. | Accessible to regional pilgrims and international tourists alike. |

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion (Framer Motion).
- **Backend**: Node.js, Express.js (Modular REST API architecture).
- **Database**: **IBM Db2** (Db2 on Cloud / IBM Cloud Pak for Data) via the official `ibm_db` (v4.1.0) native driver.
- **AI Engine**: Google Gemini 3.8 Flash (`@google/genai` TypeScript SDK).
- **Build Tooling**: Vite 8, tsx (TypeScript runtime execution), esbuild.

---

## 🗄️ Role of IBM Db2 in Travel Lens AI

IBM Db2 acts as the system of record for Travel Lens AI:
- **`DESTINATIONS`**: Relational table storing core destination profiles, geolocations, UNESCO heritage status, and historical notes.
- **`DESTINATION_IMAGES`**: 1-to-Many relational gallery photos with culturally curated captions.
- **`DESTINATION_ATTRACTIONS`**: 1-to-Many table indexing key shrines, courtyards, and viewpoints.
- **`DESTINATION_FOOD`**: Relational table of authentic regional cuisine, local sweets (e.g., *Thawe Pidakiya*), and stalls.
- **`DESTINATION_FESTIVALS`**: Seasonal pilgrimage calendar tracking Navratri, Aarti, and cultural fairs.
- **`VARANASI_GHATS`**: Specialized relational records for the riverfront ghats trail.
- **`USER_WISHLISTS`**: Relational bookmarking and cross-device bucket lists.
- **High-Performance Indexes**: Composite and B-tree indexes on `NAME`, `STATE`, `REGION`, and `CATEGORY` for sub-millisecond query execution.

---

## 📦 Prerequisites & Installation

### Prerequisites
- **Node.js**: v20.x or higher
- **npm**: v10.x or higher
- **Optional (Not required to run or test):** An IBM Cloud Account with an IBM Db2 database instance.
- **Optional:** Google Gemini API Key (a built-in fallback provides curated stories and itineraries if absent).

> 💡 **Zero-Setup Local Fallback Mode:**  
> You do **NOT** need an IBM Cloud account or an active Db2 database to build, run, test, and evaluate this project! The application includes a built-in **Safe Local Fallback Mode** that runs immediately with 100% of its features intact. Connecting a live IBM Db2 instance is purely optional.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/travel-lens-ai.git
   cd travel-lens-ai
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

---

## 🔐 Environment Configuration (.env)

1. Copy the example configuration template:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your credentials:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Google Gemini API Key
   GEMINI_API_KEY="AIzaSy..."

   # IBM Db2 Credentials (From IBM Cloud Console -> Db2 -> Service Credentials)
   DB2_HOSTNAME="dashdb-txn-sbox-yp-dal09-xx.services.dal.bluemix.net"
   DB2_PORT=50001
   DB2_DATABASE="BLUDB"
   DB2_UID="your_db2_username"
   DB2_PWD="your_db2_password"
   DB2_SECURITY="SSL"
   ```

> **Security Note:** `.env` is included in `.gitignore`. Real credentials are never committed to git or exposed to client-side code.

---

## ⚡ Running the Application

### Development Mode (Express Backend + Vite HMR)
```bash
npm run dev
```
Open your browser at: **`http://localhost:3000`**

### Production Build & Run
```bash
# 1. Build the frontend assets
npm run build

# 2. Start the production Express server
npm run start
```

---

## 🗃️ Database Migration & Seeding

You can populate your IBM Db2 instance using either of two methods:

### Method A: Automated CLI Seeder (Recommended)
Once your `.env` contains your Db2 credentials, run:
```bash
npm run seed:db2
```
This script (`scripts/seed-db2.ts`):
1. Connects to your IBM Db2 instance via SSL.
2. Automatically creates the required tables if they don't exist.
3. Inserts all 29+ Indian heritage destinations, photo galleries, food specialties, and Varanasi Ghats using parameterized SQL queries.
4. Skips already-existing records to avoid duplicate key conflicts.

### Method B: Manual SQL Execution in IBM Cloud Console
1. Log in to your **IBM Cloud Console** -> Open your **Db2** instance.
2. Navigate to **Run SQL** in the web console menu.
3. Open and paste the contents of `db/schema.sql` -> Click **Run all**.
4. (Optional) Paste and run `db/seed.sql` to populate sample records.

---

## 📡 REST API Documentation

The backend Express application exposes the following endpoints:

### 1. Database Health Check
- **`GET /api/db2/status`**
- **Description**: Verifies live connection to IBM Db2 by executing `SELECT CURRENT TIMESTAMP, CURRENT SERVER FROM SYSIBM.SYSDUMMY1`. Returns latency and masked host diagnostics.
- **Sample Response**:
  ```json
  {
    "configured": true,
    "connected": true,
    "source": "ibm_db2",
    "message": "IBM Db2 connection verified successfully.",
    "serverTime": "2026-10-28 14:04:50.123456",
    "serverName": "BLUDB",
    "latencyMs": 42,
    "config": {
      "hostname": "dashdb-txn-sbox-yp-dal09-xx.services.dal.bluemix.net",
      "database": "BLUDB",
      "port": 50001,
      "security": "SSL",
      "uidConfigured": true,
      "pwdConfigured": true
    }
  }
  ```

### 2. Destinations List
- **`GET /api/destinations?search=&category=&region=`**
- **Description**: Retrieves destinations from IBM Db2 with optional search and category filters.
- **Sample Query**: `GET /api/destinations?search=Thawe`

### 3. Destination Detail
- **`GET /api/destinations/:id`**
- **Description**: Retrieves single destination joined with relational gallery images, local food specialties, and attractions.
- **Sample Query**: `GET /api/destinations/thawe-mandir`

### 4. Varanasi Riverfront Ghats
- **`GET /api/ghats`**
- **Description**: Retrieves all 8 sacred riverfront ghats from the `VARANASI_GHATS` table.

### 5. Gemini AI Services
- **`POST /api/lens/story`**: Generates deep cultural chronicles, secret trivia, and etiquette.
- **`POST /api/lens/itinerary`**: Generates customized multi-day travel itineraries.
- **`POST /api/lens/chat`**: Conversational Indian travel concierge.
- **`POST /api/lens/analyze-photo`**: Visual image analyzer for monuments and regional dishes.

---

## 🔍 IBM Db2 Connection Verification

Travel Lens AI features **truthful connection reporting**:
- The backend never assumes Db2 is connected until an actual SQL query completes.
- In the frontend header:
  - **`Db2 Live` (Green)**: Verified live connection to IBM Db2. Data is served directly from relational SQL tables.
  - **`Db2 Mode` (Amber)**: IBM Db2 credentials are not set in `.env` or instance is unreachable. The app runs in safe, in-memory cache fallback mode so travelers can still explore destinations seamlessly.
- Click the database badge in the header at any time to open the **IBM Db2 Status Modal** and view live diagnostics or click **"Test Connection"**.

---

## 🐙 GitHub Repository Setup & Submission Guide

To prepare your repository for the **IBM Db2 TechX Summit 2026 Db2 Hack Challenge**:

1. **Initialize Git & Verify `.gitignore`**:
   ```bash
   git init
   git add .
   git status
   ```
   *Ensure that `.env`, `node_modules/`, and `dist/` are not staged!*

2. **Commit your codebase**:
   ```bash
   git commit -m "feat: Travel Lens AI with IBM Db2 integration for TechX Summit 2026"
   ```

3. **Push to your GitHub repository**:
   ```bash
   git remote add origin https://github.com/your-username/travel-lens-ai.git
   git branch -M main
   git push -u origin main
   ```

4. **Submission Checklist**:
   - [x] Node.js & Express backend architecture (`server.ts`, `server/db2.ts`).
   - [x] Official IBM Db2 driver (`ibm_db`) integrated.
   - [x] Database DDL schema (`db/schema.sql`) and sample seed (`db/seed.sql`).
   - [x] Automated migration script (`scripts/seed-db2.ts` via `npm run seed:db2`).
   - [x] Clean environment template (`.env.example`) without exposed secrets.
   - [x] System Architecture document (`ARCHITECTURE.md`).
   - [x] Comprehensive documentation (`README.md`).

---

## 📄 License
This project is open-source under the [Apache 2.0 License](LICENSE).
