import React, { useEffect, useState } from "react";

export default function TelemetryTable() {
  const [telemetry, setTelemetry] = useState([]);
  const [search, setSearch] = useState("");
  const [showSuccessful, setShowSuccessful] = useState(false);
  const [minAlt, setMinAlt] = useState(""); // optional min altitude filter

  // Fetch telemetry from backend
  const fetchTelemetry = async () => {
    try {
      let url = "http://localhost:4000/telemetry";
      if (minAlt) url += `?minAlt=${minAlt}`;
      const res = await fetch(url);
      const data = await res.json();
      setTelemetry(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTelemetry(); // initial fetch
    const interval = setInterval(fetchTelemetry, 5000); // live updates
    return () => clearInterval(interval);
  }, [minAlt]); // refetch if minAlt changes

  // Filter telemetry by ID and success
  const filteredTelemetry = telemetry
    .filter((t) => t.id.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => (showSuccessful ? t.success : true));

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search by ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Min Altitude"
          value={minAlt}
          onChange={(e) => setMinAlt(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={() => setShowSuccessful((s) => !s)}>
          {showSuccessful ? "Show All" : "Show Only Successful"}
        </button>
      </div>

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
              <td>{new Date(t.timestamp).toLocaleTimeString()}</td>
              <td>{t.altitude}</td>
              <td>{t.success ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
