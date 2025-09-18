import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

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
  const success = Math.random() > 0.2;
  const newRecord = {
    id: generateID(),
    timestamp: Date.now(),
    altitude,
    success,
  };
  telemetry.push(newRecord);
};

setInterval(generateRandomTelemetry, 60000);

// GET /ping
app.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

// GET /telemetry with optional minAlt / maxAlt query
app.get("/telemetry", (req, res) => {
  let data = telemetry;
  const minAlt = parseFloat(req.query.minAlt);
  const maxAlt = parseFloat(req.query.maxAlt);

  if (!isNaN(minAlt)) data = data.filter(t => t.altitude > minAlt);
  if (!isNaN(maxAlt)) data = data.filter(t => t.altitude <= maxAlt);

  res.json(data);
});

// POST /telemetry
app.post("/telemetry", (req, res) => {
  const { altitude, success = true } = req.body;
  if (altitude == null) return res.status(400).json({ error: "Altitude required" });

  const newRecord = {
    id: generateID(),
    timestamp: Date.now(),
    altitude,
    success
  };

  telemetry.push(newRecord);
  res.status(201).json(newRecord);
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
