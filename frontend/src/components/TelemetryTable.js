import React, { useEffect, useState } from "react";

export default function TelemetryTable({ minAltFilter }) {
  const [telemetry, setTelemetry] = useState([]);
  const [showSuccessful, setShowSuccessful] = useState(false);

  // form state
  const [newAltitude, setNewAltitude] = useState("");
  const [newTimestamp, setNewTimestamp] = useState("");

  const fetchTelemetry = async () => {
    try {
      let url = "http://localhost:4000/telemetry";
      if (minAltFilter !== null && minAltFilter !== undefined) {
        if (minAltFilter === 20000) url += "?minAlt=20000";
      }
      const res = await fetch(url);
      let data = await res.json();

      if (minAltFilter === 0) data = data.filter((t) => t.altitude <= 20000);

      setTelemetry(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 5000);
    return () => clearInterval(interval);
  }, [minAltFilter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAltitude) return alert("Altitude required");

    const payload = {
      altitude: Number(newAltitude),
      timestamp: newTimestamp ? new Date(newTimestamp).getTime() : Date.now(),
    };

    try {
      const res = await fetch("http://localhost:4000/telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setTelemetry((prev) => [...prev, data]);
      setNewAltitude("");
      setNewTimestamp("");
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTelemetry = telemetry.filter((t) =>
    showSuccessful ? t.success : true
  );

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setShowSuccessful((s) => !s)}>
          {showSuccessful ? "Show All" : "Show Only Successful"}
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Altitude"
          value={newAltitude}
          onChange={(e) => setNewAltitude(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="datetime-local"
          value={newTimestamp}
          onChange={(e) => setNewTimestamp(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Add Telemetry</button>
      </form>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Altitude</th>
            <th>Success</th>
          </tr>
        </thead>
        <tbody>
          {filteredTelemetry.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{new Date(t.timestamp).toLocaleString()}</td>
              <td>{t.altitude}</td>
              <td>{t.success ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
