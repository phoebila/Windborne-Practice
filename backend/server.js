import express from "express";
import cors from "cors";
import { time } from "console";

const app = express();
app.use(cors());           // <── allow all origins for development
app.use(express.json());

// your existing routes
app.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

// telemetry storage
let telemetry = [
  { id: "a1", timestamp: Date.now(), altitude: 12000, success: true },
  { id: "a2", timestamp: Date.now(), altitude: 18000, success: false }
];

// helper to generate unique ID
const generateID = () => `t${telemetry.length + 1}`;

// helper func to generate random telemetry
const generateRandomTelemetry = () => {
  const altitude = Math.floor(Math.random() * 30000);
  const success = Math.random() > .2;
  const newRecond = {
    id: generateID(),
    timestamp: Date.now(),
    altitude,
    success,
  };
  telemetry.push(newRecond);
};

setInterval(generateRandomTelemetry, 5000);

// GET /ping
app.get("/ping", (req, res) => {
  res.json({status: "ok"})
});

//GET telemetry with opt minAlt filter!
app.get("/telemetry", (req, res) => {
  const minAlt = parseFloat(req.query.minAlt);
  if (!isNaN(minAlt)){
    return res.json(telemetry.filter(record => record.altitude > minAlt));
  }
  res.json(telemetry);
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

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
