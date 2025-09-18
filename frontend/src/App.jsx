import React, { useState, useEffect } from "react";
import TelemetryTable from "./components/TelemetryTable";

function App() {
  const [telemetry, setTelemetry] = useState([]);
  const [showSuccessfulOnly, setShowSuccessfulOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuccesses, setShowSuccesses] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/telemetry")
      .then(res => res.json())
      .then(data => setTelemetry(data))
      .catch(err => console.error(err));
  }, []);

  // Apply filters:
  const filtered = telemetry.filter( t=> 
    (!search || (t.name ?? "").toLowerCase().includes(search.toLowerCase())) && 
    (!showSuccesses || t.success)
  );

  return (
    <div className="App">
      <h1>Flight Team Telemetry Dashboard</h1>
      {/* Search Input - Day 2! */}
      <input placeholder="Search by flight name" 
      value={search}
      onChange={e => setSearch(e.target.value)}
      style={{ marginRight: "1rem"}}/>

      {/* Success toggle */}
      <button onClick={() => setShowSuccesses(prev => !prev)}>
      {showSuccesses ? "Show All": "Show Only Successful"}
      </button>
      <TelemetryTable data={filtered} />
    </div>
  );
}

export default App;
