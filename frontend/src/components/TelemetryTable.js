import React from "react";

function TelemetryTable({ data }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Timestamp</th>
          <th>Altitude</th>
        </tr>
      </thead>
      <tbody>
        {data.map(entry => (
          <tr key={entry.id}>
            <td>{entry.id}</td>
            <td>{new Date(entry.timestamp).toLocaleString()}</td>
            <td>{entry.altitude}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TelemetryTable;
