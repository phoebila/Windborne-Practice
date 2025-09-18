import React, { useState } from "react";

export default function TelemetryForm({ onNewTelemetry }) {
  const [altitude, setAltitude] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          altitude: Number(altitude),
          timestamp: timestamp ? new Date(timestamp).getTime() : Date.now(),
        }),
      });
      const data = await res.json();
      onNewTelemetry(data);
      setAltitude("");
      setTimestamp("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "10px" }}>
      <input
        type="number"
        placeholder="Altitude"
        value={altitude}
        onChange={(e) => setAltitude(e.target.value)}
        required
        style={{ marginRight: "10px" }}
      />
      <input
        type="datetime-local"
        placeholder="Timestamp"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button type="submit">Add Telemetry</button>
    </form>
  );
}
