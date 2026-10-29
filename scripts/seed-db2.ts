import ibm_db from 'ibm_db';
import dotenv from 'dotenv';
import { initialDestinations } from '../src/data/destinations';
import { varanasiGhats } from '../src/data/varanasiGhats';

dotenv.config();

function getDbInstance(): any {
  if (typeof ibm_db === 'function') {
    return (ibm_db as any)();
  }
  return ibm_db;
}

function buildConnectionString(): string {
  const database = process.env.DB2_DATABASE || process.env.DB2_DB;
  const hostname = process.env.DB2_HOSTNAME || process.env.DB2_HOST;
  const port = process.env.DB2_PORT ? parseInt(process.env.DB2_PORT, 10) : 50001;
  const uid = process.env.DB2_UID || process.env.DB2_USER;
  const pwd = process.env.DB2_PWD || process.env.DB2_PASSWORD;
  const security = process.env.DB2_SECURITY || 'SSL';

  if (!database || !hostname || !uid || !pwd) {
    return '';
  }
  return `DATABASE=${database};HOSTNAME=${hostname};PORT=${port};PROTOCOL=TCPIP;UID=${uid};PWD=${pwd};Security=${security};`;
}

async function runQuery(conn: any, sql: string, params: any[] = []): Promise<any[]> {
  return new Promise((resolve, reject) => {
    conn.query(sql, params, (err: Error | null, rows: any[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows || []);
      }
    });
  });
}

async function checkTableExists(conn: any, tableName: string): Promise<boolean> {
  try {
    const rows = await runQuery(
      conn,
      `SELECT TABNAME FROM SYSCAT.TABLES WHERE TABSCHEMA = CURRENT SCHEMA AND TABNAME = ?`,
      [tableName.toUpperCase()]
    );
    return rows.length > 0;
  } catch {
    return false;
  }
}

async function ensureTables(conn: any) {
  console.log('🔍 Checking IBM Db2 tables...');

  const tableDefinitions = [
    {
      name: 'DESTINATIONS',
      ddl: `
        CREATE TABLE DESTINATIONS (
            ID VARCHAR(64) NOT NULL PRIMARY KEY,
            NAME VARCHAR(255) NOT NULL,
            ALTERNATE_NAMES VARCHAR(500),
            CITY VARCHAR(128),
            DISTRICT VARCHAR(128),
            VILLAGE VARCHAR(128),
            STATE VARCHAR(128) NOT NULL,
            REGION VARCHAR(64) NOT NULL,
            CATEGORY VARCHAR(128) NOT NULL,
            OVERVIEW CLOB,
            DESCRIPTION CLOB,
            HISTORY CLOB,
            LEGEND CLOB,
            ARCHITECTURE CLOB,
            BEST_TIME VARCHAR(255),
            BEST_SEASON VARCHAR(128),
            IDEAL_DURATION VARCHAR(128),
            UNESCO_HERITAGE SMALLINT DEFAULT 0,
            AUDIO_TOUR_SUMMARY CLOB,
            TRAVEL_TIPS CLOB,
            MAP_QUERY VARCHAR(255),
            LATITUDE DECIMAL(10, 6),
            LONGITUDE DECIMAL(10, 6),
            PRIMARY_IMAGE VARCHAR(1024),
            BUILT_ERA VARCHAR(128),
            CREATED_AT TIMESTAMP DEFAULT CURRENT TIMESTAMP,
            UPDATED_AT TIMESTAMP DEFAULT CURRENT TIMESTAMP
        )
      `,
    },
    {
      name: 'DESTINATION_IMAGES',
      ddl: `
        CREATE TABLE DESTINATION_IMAGES (
            ID BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
            DESTINATION_ID VARCHAR(64) NOT NULL,
            IMAGE_URL VARCHAR(1024) NOT NULL,
            CAPTION VARCHAR(500),
            DISPLAY_ORDER SMALLINT DEFAULT 0,
            CONSTRAINT FK_DEST_IMG FOREIGN KEY (DESTINATION_ID)
                REFERENCES DESTINATIONS (ID) ON DELETE CASCADE
        )
      `,
    },
    {
      name: 'DESTINATION_ATTRACTIONS',
      ddl: `
        CREATE TABLE DESTINATION_ATTRACTIONS (
            ID BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
            DESTINATION_ID VARCHAR(64) NOT NULL,
            ATTRACTION_NAME VARCHAR(255) NOT NULL,
            DETAILS VARCHAR(1000),
            DISPLAY_ORDER SMALLINT DEFAULT 0,
            CONSTRAINT FK_DEST_ATTR FOREIGN KEY (DESTINATION_ID)
                REFERENCES DESTINATIONS (ID) ON DELETE CASCADE
        )
      `,
    },
    {
      name: 'DESTINATION_FOOD',
      ddl: `
        CREATE TABLE DESTINATION_FOOD (
            ID BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
            DESTINATION_ID VARCHAR(64) NOT NULL,
            DISH_NAME VARCHAR(255) NOT NULL,
            DISH_DESCRIPTION VARCHAR(1000),
            MUST_TRY_AT VARCHAR(255),
            DISPLAY_ORDER SMALLINT DEFAULT 0,
            CONSTRAINT FK_DEST_FOOD FOREIGN KEY (DESTINATION_ID)
                REFERENCES DESTINATIONS (ID) ON DELETE CASCADE
        )
      `,
    },
    {
      name: 'DESTINATION_FESTIVALS',
      ddl: `
        CREATE TABLE DESTINATION_FESTIVALS (
            ID BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
            DESTINATION_ID VARCHAR(64) NOT NULL,
            FESTIVAL_NAME VARCHAR(255) NOT NULL,
            SEASON VARCHAR(128),
            CONSTRAINT FK_DEST_FEST FOREIGN KEY (DESTINATION_ID)
                REFERENCES DESTINATIONS (ID) ON DELETE CASCADE
        )
      `,
    },
    {
      name: 'VARANASI_GHATS',
      ddl: `
        CREATE TABLE VARANASI_GHATS (
            ID BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
            NAME VARCHAR(128) NOT NULL,
            CATEGORY VARCHAR(128) NOT NULL,
            STORY CLOB NOT NULL,
            SIGNIFICANCE CLOB NOT NULL,
            EXPERIENCE CLOB NOT NULL,
            LOCATION VARCHAR(255) NOT NULL,
            IMAGE_URL VARCHAR(1024),
            DISPLAY_ORDER SMALLINT DEFAULT 0
        )
      `,
    },
  ];

  for (const table of tableDefinitions) {
    const exists = await checkTableExists(conn, table.name);
    if (!exists) {
      console.log(`Creating table ${table.name}...`);
      try {
        await runQuery(conn, table.ddl);
        console.log(`✅ Table ${table.name} created.`);
      } catch (err: any) {
        console.warn(`Note on table ${table.name}:`, err?.message || err);
      }
    } else {
      console.log(`✓ Table ${table.name} already exists.`);
    }
  }
}

async function seedData(conn: any) {
  console.log('\n📦 Seeding destinations into IBM Db2...');

  let destInserted = 0;
  let destSkipped = 0;

  for (const place of initialDestinations) {
    const destId = String(place.id);
    const existing = await runQuery(conn, `SELECT ID FROM DESTINATIONS WHERE ID = ?`, [destId]);

    if (existing.length > 0) {
      destSkipped++;
      continue;
    }

    const historyStr =
      typeof place.history === 'object' && place.history
        ? place.history.details || ''
        : place.history || '';

    const categoryStr = Array.isArray(place.category) ? place.category.join(', ') : place.category;
    const alternateNamesStr = Array.isArray(place.alternateNames) ? place.alternateNames.join(', ') : '';

    const lat = place.coordinates
      ? 'lat' in place.coordinates
        ? place.coordinates.lat
        : place.coordinates.latitude
      : null;
    const lng = place.coordinates
      ? 'lng' in place.coordinates
        ? place.coordinates.lng
        : place.coordinates.longitude
      : null;

    await runQuery(
      conn,
      `
      INSERT INTO DESTINATIONS (
        ID, NAME, ALTERNATE_NAMES, CITY, DISTRICT, VILLAGE, STATE, REGION, CATEGORY,
        OVERVIEW, DESCRIPTION, HISTORY, LEGEND, ARCHITECTURE,
        BEST_TIME, BEST_SEASON, IDEAL_DURATION, UNESCO_HERITAGE,
        AUDIO_TOUR_SUMMARY, TRAVEL_TIPS, MAP_QUERY, LATITUDE, LONGITUDE,
        PRIMARY_IMAGE, BUILT_ERA
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        destId,
        place.name,
        alternateNamesStr || null,
        place.city || null,
        place.district || null,
        place.village || null,
        place.state,
        place.region,
        categoryStr,
        place.overview || null,
        place.description || place.overview || '',
        historyStr,
        place.legend || null,
        typeof place.architecture === 'object' ? place.architecture.explanation || null : place.architecture || null,
        place.bestTime || null,
        place.bestSeason || null,
        place.idealDuration || null,
        place.unescoHeritage ? 1 : 0,
        place.audioTourSummary || null,
        place.travelTips || null,
        place.mapQuery || `${place.name} ${place.state} India`,
        lat,
        lng,
        place.image || 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
        place.builtYearOrEra || null,
      ]
    );

    // Insert Images
    if (Array.isArray(place.images) && place.images.length > 0) {
      let order = 1;
      for (const img of place.images) {
        await runQuery(
          conn,
          `INSERT INTO DESTINATION_IMAGES (DESTINATION_ID, IMAGE_URL, CAPTION, DISPLAY_ORDER) VALUES (?, ?, ?, ?)`,
          [destId, img.url, img.caption || null, order++]
        ).catch(() => {});
      }
    } else if (Array.isArray(place.gallery) && place.gallery.length > 0) {
      let order = 1;
      for (const imgUrl of place.gallery) {
        await runQuery(
          conn,
          `INSERT INTO DESTINATION_IMAGES (DESTINATION_ID, IMAGE_URL, CAPTION, DISPLAY_ORDER) VALUES (?, ?, ?, ?)`,
          [destId, imgUrl, `${place.name} photo`, order++]
        ).catch(() => {});
      }
    }

    // Insert Attractions
    if (Array.isArray(place.attractions) && place.attractions.length > 0) {
      let order = 1;
      for (const attr of place.attractions) {
        await runQuery(
          conn,
          `INSERT INTO DESTINATION_ATTRACTIONS (DESTINATION_ID, ATTRACTION_NAME, DETAILS, DISPLAY_ORDER) VALUES (?, ?, ?, ?)`,
          [destId, attr, null, order++]
        ).catch(() => {});
      }
    }

    // Insert Local Food
    if (Array.isArray(place.localFood) && place.localFood.length > 0) {
      let order = 1;
      for (const food of place.localFood) {
        const dishName = typeof food === 'object' ? food.name : food;
        const dishDesc = typeof food === 'object' ? food.description || null : null;
        await runQuery(
          conn,
          `INSERT INTO DESTINATION_FOOD (DESTINATION_ID, DISH_NAME, DISH_DESCRIPTION, DISPLAY_ORDER) VALUES (?, ?, ?, ?)`,
          [destId, dishName, dishDesc, order++]
        ).catch(() => {});
      }
    } else if (Array.isArray(place.food)) {
      let order = 1;
      for (const dish of place.food) {
        await runQuery(
          conn,
          `INSERT INTO DESTINATION_FOOD (DESTINATION_ID, DISH_NAME, DISPLAY_ORDER) VALUES (?, ?, ?)`,
          [destId, dish, order++]
        ).catch(() => {});
      }
    }

    // Insert Festivals
    if (Array.isArray(place.festivals) && place.festivals.length > 0) {
      for (const fest of place.festivals) {
        await runQuery(
          conn,
          `INSERT INTO DESTINATION_FESTIVALS (DESTINATION_ID, FESTIVAL_NAME) VALUES (?, ?)`,
          [destId, fest]
        ).catch(() => {});
      }
    }

    destInserted++;
  }

  console.log(`✅ Destinations Seeded: ${destInserted} new, ${destSkipped} already present.`);

  // Seed Varanasi Ghats
  console.log('\n🌊 Seeding Varanasi Ghats into VARANASI_GHATS table...');
  let ghatsInserted = 0;
  let ghatsSkipped = 0;

  for (let i = 0; i < varanasiGhats.length; i++) {
    const ghat = varanasiGhats[i];
    const existing = await runQuery(conn, `SELECT ID FROM VARANASI_GHATS WHERE NAME = ?`, [ghat.name]);

    if (existing.length > 0) {
      ghatsSkipped++;
      continue;
    }

    await runQuery(
      conn,
      `
      INSERT INTO VARANASI_GHATS (
        NAME, CATEGORY, STORY, SIGNIFICANCE, EXPERIENCE, LOCATION, IMAGE_URL, DISPLAY_ORDER
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        ghat.name,
        ghat.category,
        ghat.story,
        ghat.significance,
        ghat.experience,
        ghat.location,
        ghat.image || null,
        i + 1,
      ]
    );
    ghatsInserted++;
  }

  console.log(`✅ Varanasi Ghats Seeded: ${ghatsInserted} new, ${ghatsSkipped} already present.`);
}

async function main() {
  console.log('========================================================');
  console.log('🚀 Travel Lens AI — IBM Db2 Database Migration & Seeder');
  console.log('========================================================');

  const connStr = buildConnectionString();

  if (!connStr) {
    console.error('\n❌ ERROR: IBM Db2 credentials are not configured in your environment.');
    console.error('Please configure the following in your .env file:');
    console.error('  DB2_HOSTNAME=<your-db2-host>');
    console.error('  DB2_PORT=50001');
    console.error('  DB2_DATABASE=BLUDB');
    console.error('  DB2_UID=<your-db2-username>');
    console.error('  DB2_PWD=<your-db2-password>');
    console.error('  DB2_SECURITY=SSL\n');
    process.exit(1);
  }

  const db = getDbInstance();
  console.log('\n🔌 Connecting to IBM Db2...');

  db.open(connStr, async (err: Error | null, conn: any) => {
    if (err || !conn) {
      console.error('\n❌ Failed to connect to IBM Db2:');
      console.error(err?.message || String(err));
      console.error('\nTroubleshooting tips:');
      console.error('  1. Check if the Db2 instance is running and port 50001 (SSL) is open.');
      console.error('  2. Verify DB2_UID and DB2_PWD credentials from your IBM Cloud console.');
      console.error('  3. Ensure IP restrictions / firewall allow outbound connections.\n');
      process.exit(1);
    }

    try {
      console.log('✅ Connected to IBM Db2 successfully.');

      // Check current timestamp from DB
      const result = await runQuery(conn, 'SELECT CURRENT TIMESTAMP AS DB_TIME, CURRENT SERVER AS SERVER_NAME FROM SYSIBM.SYSDUMMY1');
      if (result[0]) {
        console.log(`Server: ${result[0].SERVER_NAME} | Db2 Timestamp: ${result[0].DB_TIME}\n`);
      }

      await ensureTables(conn);
      await seedData(conn);

      console.log('\n✨ Database seeding completed successfully!\n');
    } catch (error: any) {
      console.error('\n❌ Error during database seeding:', error?.message || error);
    } finally {
      conn.close((closeErr: Error | undefined) => {
        if (closeErr) console.warn('Notice closing connection:', closeErr);
        console.log('🔒 Closed Db2 connection.\n');
        process.exit(0);
      });
    }
  });
}

main();
