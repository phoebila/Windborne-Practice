import React, { useState, useEffect } from "react";
import TelemetryTable from "./components/TelemetryTable";

function App() {
  const [telemetry, setTelemetry] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/telemetry")
      .then(res => res.json())
      .then(data => setTelemetry(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>Flight Team Telemetry Dashboard</h1>
      <TelemetryTable data={telemetry} />
    </div>
  );
}

export default App;
