import express from "express";
const router = express.Router();

let telemetryData = [
  { id: 1, timestamp: Date.now(), altitude: 12000 },
  { id: 2, timestamp: Date.now(), altitude: 25000 },
];

// GET /telemetry
router.get("/", (req, res) => {
  const { minAlt } = req.query;
  let results = telemetryData;
  if (minAlt) {
    results = results.filter(t => t.altitude >= Number(minAlt));
  }
  res.json(results);
});

// POST /telemetry
router.post("/", (req, res) => {
  const { altitude, timestamp } = req.body;
  if (!altitude || !timestamp) {
    return res.status(400).json({ error: "Missing altitude or timestamp" });
  }
  const newEntry = { id: telemetryData.length + 1, altitude, timestamp };
  telemetryData.push(newEntry);
  res.status(201).json(newEntry);
});

export default router;
