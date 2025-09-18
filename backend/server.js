import express from "express";
import cors from "cors";

const app = express();
app.use(cors());           // <── allow all origins for development
app.use(express.json());

// your existing routes
app.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

let telemetry = [
  { id: "a1", timestamp: Date.now(), altitude: 12000, success: true },
  { id: "a2", timestamp: Date.now(), altitude: 18000, success: false }
];

app.get("/telemetry", (req, res) => {
  res.json(telemetry);
});

app.post("/telemetry", (req, res) => {
  const { id, timestamp, altitude } = req.body;
  if (!altitude) return res.status(400).json({ error: "Altitude required" });
  telemetry.push({ id, timestamp, altitude });
  res.json({ status: "added" });
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
