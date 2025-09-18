import express from "express";
import cors from "cors";
import { time } from "console";
import { MongoClient } from "mongodb";

const app = express();
app.use(cors());           // <── allow all origins for development
app.use(express.json());

// connect to mongodb
const client = new MongoClient("mongodb://localhost:27017");
await client.connect();
const db = client.db("windborne"); //db name
const telemetryCollection = db.collection("telemetry");

// Day 4 MONGODB
const existing = await telemetryCollection.findOne({});
if (!existing) {
  await telemetryCollection.insertMany([
    { id: 1, altitude: 15000, timestamp: 1694444000 },
    { id: 2, altitude: 18000, timestamp: 1694447600 },
    { id: 3, altitude: 22000, timestamp: 1694451200 },
    { id: 4, altitude: 9000,  timestamp: 1694454800 },
    { id: 5, altitude: 12000, timestamp: 1694458400 }
  ]);
}

// helper funcs -------------------------------------------------
const generateID = () => `t${Date.now()}`; // unique ID based on timestamp

setInterval(async () => {
  const newRecord = {
    id: generateID(),
    timestamp: Date.now(),
    altitude: Math.floor(Math.random() * 30000),
    success: Math.random() > 0.2
  };
  await telemetryCollection.insertOne(newRecord);
  console.log("Inserted random telemetry:", newRecord);
}, 5000);

// ROUTES ---------------------------------------------------------

// ping
app.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

//GET telemetry with opt minAlt filter!
app.get("/telemetry", async (req, res) => {
  const minAlt = parseFloat(req.query.minAlt) || 0;
  const data = await telemetryCollection.find({ altitude: { $gte: minAlt } }).toArray();
  res.json(data);
});

// POST /telemetry with err handling 
app.post("/telemetry", (req, res) => {
  const { id, timestamp, altitude, success = true } = req.body;

  if (!altitude) return res.status(400).json({ error: "Altitude required" });

  const newRecord = {
    id:generateID(),
    timestamp: Date.now(),
    altitude,
    success,
  };

  telemetry.push(newRecord);
  res.status(201).json(newRecord);
});

// PUT /telemetry/:id → update altitude of a flight
app.put("/telemetry/:id", async (req, res) => {
  const { id } = req.params;
  const { altitude } = req.body;
  if (!altitude) return res.status(400).json({ error: "Altitude required" });

  const result = await telemetryCollection.updateOne(
    { id },
    { $set: { altitude } }
  );

  res.json({ matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
});

// DELETE /telemetry/older-than/:ts → delete old flights
app.delete("/telemetry/older-than/:ts", async (req, res) => {
  const ts = parseInt(req.params.ts);
  const result = await telemetryCollection.deleteMany({ timestamp: { $lt: ts } });
  res.json({ deletedCount: result.deletedCount });
});


app.listen(4000, () => console.log("Server running on http://localhost:4000"));
