import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// === SQL PART ===
async function testSQL() {
  // Open an in-memory SQLite database
  const db = await open({
    filename: ':memory:',
    driver: sqlite3.Database
  });

  // 1️⃣ Create flights table
  await db.exec(`
    CREATE TABLE flights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      altitude INTEGER,
      timestamp TEXT
    )
  `);

  // 2️⃣ Insert 5 rows
  const flights = [
    ['Falcon 1', 15000, '2025-09-18 10:00:00'],
    ['Falcon 9', 22000, '2025-09-18 11:00:00'],
    ['Starship', 30000, '2025-09-18 12:00:00'],
    ['Electron', 18000, '2025-09-18 13:00:00'],
    ['New Glenn', 25000, '2025-09-18 14:00:00']
  ];

  for (const f of flights) {
    await db.run('INSERT INTO flights (name, altitude, timestamp) VALUES (?, ?, ?)', f);
  }

  // 3️⃣ Query flights above 20000 altitude
  const highFlights = await db.all('SELECT * FROM flights WHERE altitude > 20000');
  console.log('Flights above 20000 altitude:', highFlights);

  // 4️⃣ Count flights per day
  const countPerDay = await db.all(`
    SELECT DATE(timestamp) AS flight_date, COUNT(*) AS flight_count
    FROM flights
    GROUP BY flight_date
  `);
  console.log('Flight count per day:', countPerDay);
}

// === "Mongo" PART (JS array simulation) ===
function testMongo() {
  const telemetry = [];

  // 1️⃣ Insert documents
  telemetry.push(
    { id: 1, altitude: 15000, timestamp: 1694444000 },
    { id: 2, altitude: 25000, timestamp: 1694447600 },
    { id: 3, altitude: 18000, timestamp: 1694451200 },
    { id: 4, altitude: 30000, timestamp: 1694454800 },
    { id: 5, altitude: 9000,  timestamp: 1694458400 }
  );

  // 2️⃣ Query altitude > 10000
  const highAltitude = telemetry.filter(doc => doc.altitude > 10000);
  console.log('Telemetry altitude > 10000:', highAltitude);

  // 3️⃣ Update id 3 altitude
  const doc3 = telemetry.find(doc => doc.id === 3);
  if (doc3) doc3.altitude = 20000;

  // 4️⃣ Delete id 5
  const index5 = telemetry.findIndex(doc => doc.id === 5);
  if (index5 !== -1) telemetry.splice(index5, 1);

  // 5️⃣ Final telemetry
  console.log('Final telemetry documents:', telemetry);
}

// === RUN BOTH ===
async function main() {
  console.log('=== SQL TEST ===');
  await testSQL();
  console.log('\n=== MONGO TEST ===');
  testMongo();
}

main();
