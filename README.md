# Flight Team Full-Stack Practice

A 7-day prep plan for full-stack interview practice (JavaScript/TypeScript, React, Node/Express, SQL/Mongo).

---

## 🔹 Day 1 – JavaScript/TypeScript Fundamentals
- Implement `groupByYear()` in `backend/utils/day1.js`
- Implement `getTopLaunches()` that fetches from SpaceX API
- Create a TypeScript file `telemetry.ts` with an interface + average altitude function

---

## 🔹 Day 2 – React Fundamentals
- Build `TelemetryTable.js` to fetch and display data from SpaceX API
- Add a search bar to filter by name
- Add a “Show Only Successful” toggle

---

## 🔹 Day 3 – Backend (Node + Express)
- In `server.js`, add:
  - `GET /ping` → `{status:"ok"}`
  - `GET /telemetry` → return mock telemetry
  - `POST /telemetry` → add telemetry from JSON body
- Extend `GET /telemetry?minAlt=10000` → filter

---

## 🔹 Day 4 – Database Basics
- In `postgres.sql`:
  - Create a `flights` table
  - Insert sample rows
  - Write SELECT queries for altitude filtering + flights per day
- In `mongo.js`:
  - Insert telemetry docs
  - Query, update, delete docs

---

## 🔹 Day 5 – Full-Stack Integration
- Connect React frontend → Express `/telemetry`
- Display telemetry in table
- Add dropdown filter (All / High Altitude / Low Altitude)
- Add form to submit new telemetry (POST to backend)

---

## 🔹 Day 6 – Mock Technical Test
Build a Flight Tracker Dashboard:
- **Backend**: `/flights` (GET, POST)
- **Frontend**: Display flights, add form, filter by altitude
- (Optional) Connect to DB

---

## 🔹 Day 7 – Review + Polish
- Refactor code
- Add comments & error handling
- Write an explanation of your Day 6 project

---
