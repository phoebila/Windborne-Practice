import express from "express";
import bodyParser from "body-parser";
import telemetryRouter from "./routes/telemetry.js";

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use("/telemetry", telemetryRouter);

app.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
