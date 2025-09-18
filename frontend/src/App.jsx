import React from "react";
import { SpaceXTable, TelemetryTable } from "./components";
import "./App.css";  // import the CSS

function App() {
  return (
    <div className="App">
      <h1>Flight Team Telemetry Dashboard</h1>

      <div className="tables-container">
        <div className="table-wrapper">
          <h2>Day 2 – SpaceX Launches</h2>
          <SpaceXTable />
        </div>

        <div className="table-wrapper">
          <h2>Day 3 – Telemetry</h2>
          <TelemetryTable />
        </div>
      </div>
    </div>
  );
}

export default App;
