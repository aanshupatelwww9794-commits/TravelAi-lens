import ibm_db from 'ibm_db';
import dotenv from 'dotenv';
import { initialDestinations } from '../src/data/destinations';
import { varanasiGhats } from '../src/data/varanasiGhats';
import type { Destination, VaranasiGhat } from '../src/types/travel';

dotenv.config();

export interface Db2Config {
  database?: string;
  hostname?: string;
  port?: number;
  uid?: string;
  pwd?: string;
  security?: string;
}

export interface Db2StatusResult {
  configured: boolean;
  connected: boolean;
  source: 'ibm_db2' | 'fallback_local_cache';
  message: string;
  config: {
    hostname: string | null;
    database: string | null;
    port: number | null;
    security: string | null;
    uidConfigured: boolean;
    pwdConfigured: boolean;
  };
  latencyMs?: number;
  serverTime?: string;
  serverName?: string;
  error?: string;
  timestamp: string;
}

/**
 * Returns current Db2 credentials from environment variables.
 */
export function getDb2Config(): Db2Config {
  return {
    database: process.env.DB2_DATABASE || process.env.DB2_DB,
    hostname: process.env.DB2_HOSTNAME || process.env.DB2_HOST,
    port: process.env.DB2_PORT ? parseInt(process.env.DB2_PORT, 10) : 50001,
    uid: process.env.DB2_UID || process.env.DB2_USER,
    pwd: process.env.DB2_PWD || process.env.DB2_PASSWORD,
    security: process.env.DB2_SECURITY || 'SSL',
  };
}

/**
 * Checks whether all required IBM Db2 credentials are provided.
 */
export function isDb2Configured(): boolean {
  const cfg = getDb2Config();
  return Boolean(cfg.database && cfg.hostname && cfg.uid && cfg.pwd);
}

/**
 * Assembles the standard IBM Db2 connection string.
 * Format: DATABASE=BLUDB;HOSTNAME=...;PORT=50001;PROTOCOL=TCPIP;UID=...;PWD=...;Security=SSL;
 */
export function buildDb2ConnectionString(): string {
  const cfg = getDb2Config();
  if (!cfg.database || !cfg.hostname || !cfg.uid || !cfg.pwd) {
    return '';
  }
  return `DATABASE=${cfg.database};HOSTNAME=${cfg.hostname};PORT=${cfg.port || 50001};PROTOCOL=TCPIP;UID=${cfg.uid};PWD=${cfg.pwd};Security=${cfg.security || 'SSL'};`;
}

/**
 * Sanitizes connection details for logs and API responses (masks password).
 */
export function getSanitizedDb2Details() {
  const cfg = getDb2Config();
  return {
    hostname: cfg.hostname || null,
    database: cfg.database || null,
    port: cfg.port || null,
    security: cfg.security || null,
    uidConfigured: Boolean(cfg.uid),
    pwdConfigured: Boolean(cfg.pwd),
  };
}

/**
 * Strips password patterns from error strings for secure logging.
 */
function sanitizeErrorMessage(msg: string): string {
  if (!msg) return '';
  return msg.replace(/PWD=[^;]+/gi, 'PWD=***');
}

/**
 * Helper to get an ibm_db Database client instance.
 */
function getDbInstance(): any {
  if (typeof ibm_db === 'function') {
    return (ibm_db as any)();
  }
  return ibm_db;
}

/**
 * Tests the live connection to the IBM Db2 database.
 * Does NOT assume a connection works until an actual query completes.
 */
export async function testDb2Connection(): Promise<Db2StatusResult> {
  const sanitized = getSanitizedDb2Details();
  const timestamp = new Date().toISOString();

  if (!isDb2Configured()) {
    return {
      configured: false,
      connected: false,
      source: 'fallback_local_cache',
      message: 'IBM Db2 credentials are not configured in environment variables (DB2_HOSTNAME, DB2_DATABASE, DB2_UID, DB2_PWD).',
      config: sanitized,
      timestamp,
    };
  }

  const connStr = buildDb2ConnectionString();
  const start = Date.now();
  const db = getDbInstance();

  return new Promise<Db2StatusResult>((resolve) => {
    db.open(connStr, (err: Error | null, conn: any) => {
      if (err || !conn) {
        const errorMsg = sanitizeErrorMessage(err ? err.message || String(err) : 'Failed to obtain Db2 connection');
        console.warn('IBM Db2 Connection Test Notice:', errorMsg);
        resolve({
          configured: true,
          connected: false,
          source: 'fallback_local_cache',
          message: 'Failed to connect to IBM Db2 instance.',
          error: errorMsg,
          config: sanitized,
          latencyMs: Date.now() - start,
          timestamp,
        });
        return;
      }

      // Execute standard Db2 verification query
      conn.query(
        'SELECT CURRENT TIMESTAMP AS DB_TIME, CURRENT SERVER AS SERVER_NAME FROM SYSIBM.SYSDUMMY1',
        (queryErr: Error | null, rows: any[]) => {
          const latencyMs = Date.now() - start;

          // Always ensure connection is properly closed
          conn.close((closeErr: Error | undefined) => {
            if (closeErr) {
              console.warn('Notice closing Db2 test connection:', closeErr);
            }
          });

          if (queryErr) {
            const errorMsg = sanitizeErrorMessage(queryErr.message || String(queryErr));
            resolve({
              configured: true,
              connected: false,
              source: 'fallback_local_cache',
              message: 'Connected to Db2, but verification query failed.',
              error: errorMsg,
              config: sanitized,
              latencyMs,
              timestamp,
            });
            return;
          }

          const firstRow = Array.isArray(rows) && rows[0] ? rows[0] : {};
          resolve({
            configured: true,
            connected: true,
            source: 'ibm_db2',
            message: 'IBM Db2 connection verified successfully.',
            serverTime: firstRow.DB_TIME ? String(firstRow.DB_TIME) : undefined,
            serverName: firstRow.SERVER_NAME ? String(firstRow.SERVER_NAME) : sanitized.database || undefined,
            config: sanitized,
            latencyMs,
            timestamp,
          });
        }
      );
    });
  });
}

/**
 * Executes a parameterized SQL query on the IBM Db2 database.
 */
export async function queryDb2<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  if (!isDb2Configured()) {
    throw new Error('IBM Db2 is not configured.');
  }

  const connStr = buildDb2ConnectionString();
  const db = getDbInstance();

  return new Promise<T[]>((resolve, reject) => {
    db.open(connStr, (err: Error | null, conn: any) => {
      if (err || !conn) {
        reject(new Error(sanitizeErrorMessage(err ? err.message || String(err) : 'Could not open Db2 connection')));
        return;
      }

      conn.query(sql, params, (queryErr: Error | null, rows: any[]) => {
        conn.close((closeErr: Error | undefined) => {
          if (closeErr) {
            console.warn('Notice closing Db2 connection:', closeErr);
          }
        });

        if (queryErr) {
          reject(new Error(sanitizeErrorMessage(queryErr.message || String(queryErr))));
          return;
        }

        resolve((rows || []) as T[]);
      });
    });
  });
}

/**
 * Fetches destinations from IBM Db2 table DESTINATIONS.
 * If Db2 is unconfigured or unavailable, returns the curated local dataset.
 */
export async function getDestinationsFromDb2(search?: string, category?: string, region?: string): Promise<{
  destinations: Destination[];
  source: 'ibm_db2' | 'fallback_local_cache';
  totalCount: number;
  db2Connected: boolean;
}> {
  if (isDb2Configured()) {
    try {
      let sql = `
        SELECT
          D.ID, D.NAME, D.ALTERNATE_NAMES, D.CITY, D.DISTRICT, D.VILLAGE, D.STATE,
          D.REGION, D.CATEGORY, D.OVERVIEW, D.DESCRIPTION, D.HISTORY, D.LEGEND,
          D.ARCHITECTURE, D.BEST_TIME, D.BEST_SEASON, D.IDEAL_DURATION,
          D.UNESCO_HERITAGE, D.AUDIO_TOUR_SUMMARY, D.TRAVEL_TIPS, D.MAP_QUERY,
          D.LATITUDE, D.LONGITUDE, D.PRIMARY_IMAGE, D.BUILT_ERA
        FROM DESTINATIONS D
        WHERE 1=1
      `;
      const params: any[] = [];

      if (category && category !== 'All') {
        sql += ` AND LOWER(D.CATEGORY) LIKE LOWER(?)`;
        params.push(`%${category}%`);
      }

      if (region && region !== 'All') {
        sql += ` AND LOWER(D.REGION) = LOWER(?)`;
        params.push(region);
      }

      if (search && search.trim()) {
        sql += ` AND (LOWER(D.NAME) LIKE LOWER(?) OR LOWER(D.STATE) LIKE LOWER(?) OR LOWER(D.CITY) LIKE LOWER(?))`;
        const q = `%${search.trim()}%`;
        params.push(q, q, q);
      }

      sql += ` ORDER BY D.NAME ASC`;

      const rows = await queryDb2<any>(sql, params);

      if (Array.isArray(rows) && rows.length > 0) {
        // Map Db2 rows to the Destination interface
        const mappedDestinations: Destination[] = rows.map((row) => ({
          id: row.ID,
          name: row.NAME,
          alternateNames: row.ALTERNATE_NAMES ? row.ALTERNATE_NAMES.split(',').map((s: string) => s.trim()) : undefined,
          city: row.CITY || undefined,
          district: row.DISTRICT || undefined,
          village: row.VILLAGE || undefined,
          state: row.STATE,
          region: row.REGION,
          category: row.CATEGORY,
          overview: row.OVERVIEW || undefined,
          description: row.DESCRIPTION || row.OVERVIEW || '',
          history: row.HISTORY || '',
          legend: row.LEGEND || undefined,
          architecture: row.ARCHITECTURE || undefined,
          bestTime: row.BEST_TIME || undefined,
          bestSeason: row.BEST_SEASON || undefined,
          idealDuration: row.IDEAL_DURATION || undefined,
          unescoHeritage: Boolean(row.UNESCO_HERITAGE),
          audioTourSummary: row.AUDIO_TOUR_SUMMARY || undefined,
          travelTips: row.TRAVEL_TIPS || undefined,
          mapQuery: row.MAP_QUERY || undefined,
          image: row.PRIMARY_IMAGE || 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
          builtYearOrEra: row.BUILT_ERA || undefined,
          coordinates: row.LATITUDE && row.LONGITUDE ? { lat: Number(row.LATITUDE), lng: Number(row.LONGITUDE) } : undefined,
          attractions: [],
          localFood: [],
        }));

        return {
          destinations: mappedDestinations,
          source: 'ibm_db2',
          totalCount: mappedDestinations.length,
          db2Connected: true,
        };
      }
    } catch (err: any) {
      console.warn('Notice querying IBM Db2 DESTINATIONS, serving local cache:', err?.message || err);
    }
  }

  // Graceful local cache fallback (ensures UI always works)
  let filtered = [...initialDestinations];
  if (category && category !== 'All') {
    filtered = filtered.filter((d) => {
      const c = Array.isArray(d.category) ? d.category.join(' ') : d.category;
      return c.toLowerCase().includes(category.toLowerCase());
    });
  }
  if (region && region !== 'All') {
    filtered = filtered.filter((d) => d.region.toLowerCase() === region.toLowerCase());
  }
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter((d) =>
      d.name.toLowerCase().includes(q) ||
      d.state.toLowerCase().includes(q) ||
      (d.city && d.city.toLowerCase().includes(q))
    );
  }

  return {
    destinations: filtered,
    source: 'fallback_local_cache',
    totalCount: filtered.length,
    db2Connected: false,
  };
}

/**
 * Fetches single destination by ID or Name from Db2, including joined gallery, food, and attractions.
 */
export async function getDestinationDetailsFromDb2(idOrName: string): Promise<{
  destination: Destination | null;
  source: 'ibm_db2' | 'fallback_local_cache';
  db2Connected: boolean;
}> {
  if (isDb2Configured()) {
    try {
      const destRows = await queryDb2<any>(
        `SELECT * FROM DESTINATIONS WHERE ID = ? OR LOWER(NAME) = LOWER(?) FETCH FIRST 1 ROWS ONLY`,
        [idOrName, idOrName]
      );

      if (destRows.length > 0) {
        const row = destRows[0];
        const destId = row.ID;

        // Fetch related images, attractions, food, festivals in parallel
        const [images, attractions, food, festivals] = await Promise.all([
          queryDb2<any>(`SELECT IMAGE_URL, CAPTION FROM DESTINATION_IMAGES WHERE DESTINATION_ID = ? ORDER BY DISPLAY_ORDER ASC`, [destId]).catch(() => []),
          queryDb2<any>(`SELECT ATTRACTION_NAME, DETAILS FROM DESTINATION_ATTRACTIONS WHERE DESTINATION_ID = ? ORDER BY DISPLAY_ORDER ASC`, [destId]).catch(() => []),
          queryDb2<any>(`SELECT DISH_NAME, DISH_DESCRIPTION FROM DESTINATION_FOOD WHERE DESTINATION_ID = ? ORDER BY DISPLAY_ORDER ASC`, [destId]).catch(() => []),
          queryDb2<any>(`SELECT FESTIVAL_NAME FROM DESTINATION_FESTIVALS WHERE DESTINATION_ID = ?`, [destId]).catch(() => []),
        ]);

        const destination: Destination = {
          id: row.ID,
          name: row.NAME,
          alternateNames: row.ALTERNATE_NAMES ? row.ALTERNATE_NAMES.split(',').map((s: string) => s.trim()) : undefined,
          city: row.CITY || undefined,
          district: row.DISTRICT || undefined,
          village: row.VILLAGE || undefined,
          state: row.STATE,
          region: row.REGION,
          category: row.CATEGORY,
          overview: row.OVERVIEW || undefined,
          description: row.DESCRIPTION || row.OVERVIEW || '',
          history: row.HISTORY || '',
          legend: row.LEGEND || undefined,
          architecture: row.ARCHITECTURE || undefined,
          bestTime: row.BEST_TIME || undefined,
          bestSeason: row.BEST_SEASON || undefined,
          idealDuration: row.IDEAL_DURATION || undefined,
          unescoHeritage: Boolean(row.UNESCO_HERITAGE),
          audioTourSummary: row.AUDIO_TOUR_SUMMARY || undefined,
          travelTips: row.TRAVEL_TIPS || undefined,
          mapQuery: row.MAP_QUERY || undefined,
          image: row.PRIMARY_IMAGE || (images[0]?.IMAGE_URL ?? 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800'),
          gallery: images.map((img: any) => img.IMAGE_URL),
          images: images.map((img: any) => ({ url: img.IMAGE_URL, caption: img.CAPTION })),
          attractions: attractions.map((a: any) => a.ATTRACTION_NAME),
          attractionList: attractions.map((a: any) => a.DETAILS ? `${a.ATTRACTION_NAME} (${a.DETAILS})` : a.ATTRACTION_NAME),
          localFood: food.map((f: any) => ({ name: f.DISH_NAME, description: f.DISH_DESCRIPTION || undefined })),
          food: food.map((f: any) => f.DISH_NAME).join(', '),
          festivals: festivals.map((f: any) => f.FESTIVAL_NAME),
          builtYearOrEra: row.BUILT_ERA || undefined,
          coordinates: row.LATITUDE && row.LONGITUDE ? { lat: Number(row.LATITUDE), lng: Number(row.LONGITUDE) } : undefined,
        };

        return {
          destination,
          source: 'ibm_db2',
          db2Connected: true,
        };
      }
    } catch (err: any) {
      console.warn('Notice fetching destination detail from Db2:', err?.message || err);
    }
  }

  // Fallback to local dataset
  const place = initialDestinations.find(
    (d) =>
      String(d.id) === String(idOrName) ||
      d.name.toLowerCase() === idOrName.toLowerCase() ||
      d.name.toLowerCase().includes(idOrName.toLowerCase())
  );

  return {
    destination: place || null,
    source: 'fallback_local_cache',
    db2Connected: false,
  };
}

/**
 * Fetches Varanasi Riverfront Ghats from Db2 table VARANASI_GHATS.
 */
export async function getGhatsFromDb2(): Promise<{
  ghats: VaranasiGhat[];
  source: 'ibm_db2' | 'fallback_local_cache';
  db2Connected: boolean;
}> {
  if (isDb2Configured()) {
    try {
      const rows = await queryDb2<any>(
        `SELECT NAME, CATEGORY, STORY, SIGNIFICANCE, EXPERIENCE, LOCATION, IMAGE_URL FROM VARANASI_GHATS ORDER BY DISPLAY_ORDER ASC`
      );

      if (Array.isArray(rows) && rows.length > 0) {
        const ghats: VaranasiGhat[] = rows.map((r) => ({
          name: r.NAME,
          category: r.CATEGORY,
          story: r.STORY,
          significance: r.SIGNIFICANCE,
          experience: r.EXPERIENCE,
          location: r.LOCATION,
          image: r.IMAGE_URL,
        }));

        return {
          ghats,
          source: 'ibm_db2',
          db2Connected: true,
        };
      }
    } catch (err: any) {
      console.warn('Notice fetching Varanasi Ghats from Db2:', err?.message || err);
    }
  }

  return {
    ghats: varanasiGhats,
    source: 'fallback_local_cache',
    db2Connected: false,
  };
}
