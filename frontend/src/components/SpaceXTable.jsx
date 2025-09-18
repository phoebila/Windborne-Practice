import React, {useEffect, useState} from "react";
import axios from "axios";

export default function SpaceXTable() {
  const [launches, setLaunches] = useState([]);
  const [search, setSearch] = useState("");
  const [showSuccesses, setShowSuccesses] = useState(false);

  useEffect(() => {axios.get("https://api.spacexdata.com/v4/launches").then(res => setLaunches(res.data)).catch(console.error);}, []);

  const filtered = launches.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) && (!showSuccesses || l.success));

  return ( 

    <div><input placeholder="Search By Name" value={search} onChange={e => setSearch(e.target.value)}/>
        <button onClick={() => setShowSuccesses( s=> !s)}> {showSuccesses ? "Show All" : "Show only successful"} </button>
    
        <table>
          <thread>
            <tr><th>Name</th>
            <th>Date</th>
            <th>Success</th>
            </tr>
          </thread>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id}>
                <td>
                  {l.name}
                </td>
                <td>{new Date(l.date_utc).toLocaleDateString()}</td>
                <td>{l.success ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}

