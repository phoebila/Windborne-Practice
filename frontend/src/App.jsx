import React, { useState } from "react";
import SpaceXTable from "./components/SpaceXTable";
import TelemetryTable from "./components/TelemetryTable";
import "./App.css";

function App() {
  const [altitudeFilter, setAltitudeFilter] = useState(null);

  return (
    <div className="App">
      <h1>Flight Team Dashboard</h1>

      {/* Altitude Filter Dropdown */}
      <div className="controls" style={{ margin: "20px 0" }}>
        <label>
          Filter Telemetry by Altitude:{" "}
          <select
            value={altitudeFilter ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") setAltitudeFilter(null);
              else if (val === "high") setAltitudeFilter(20000);
              else if (val === "low") setAltitudeFilter(0);
            }}
          >
            <option value="">All</option>
            <option value="high">High (&gt;20k)</option>
            <option value="low">Low (≤20k)</option>
          </select>
        </label>
      </div>

      {/* Side-by-side tables */}
      <div
        className="tables-container"
        style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
      >
        {/* SpaceX Table */}
        <div className="table-wrapper" style={{ flex: 1 }}>
          <h2>Day 2 – SpaceX Launches</h2>
          <SpaceXTable />
        </div>

        {/* Telemetry Table */}
        <div className="table-wrapper" style={{ flex: 1 }}>
          <h2>Day 3+5 – Telemetry</h2>
          <TelemetryTable minAltFilter={altitudeFilter} />
        </div>
      </div>
    </div>
  );
}

export default App;
