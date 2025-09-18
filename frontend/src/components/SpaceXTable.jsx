import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SpaceXTable() {
  const [launches, setLaunches] = useState([]);
  const [search, setSearch] = useState("");
  const [showSuccesses, setShowSuccesses] = useState(false); // new state

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v4/launches")
      .then((res) => setLaunches(res.data))
      .catch(console.error);
  }, []);

  // Filter launches by search and success toggle
  const filtered = launches.filter(
    l =>
      (!search || l.name.toLowerCase().includes(search.toLowerCase())) &&
      (!showSuccesses || l.success) // filter only successful if toggle is true
  );

  return (
    <div>
      <input
        placeholder="Search by Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <button onClick={() => setShowSuccesses(prev => !prev)}>
          {showSuccesses ? "Show All" : "Show Only Successful"}
        </button>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Success</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((l) => (
            <tr key={l.id}>
              <td>{l.name}</td>
              <td>{new Date(l.date_utc).toLocaleDateString()}</td>
              <td>{l.success ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
