import { Telemetry, averageAltitude, highestAltitude, filterRecent } from "./telemetry";

const sample: Telemetry[] = [
  { id: "a1", timestamp: Date.now() - 10000, altitude: 12000 },
  { id: "a2", timestamp: Date.now() - 5000,  altitude: 18000 },
  { id: "a3", timestamp: Date.now(),         altitude: 15000 },
];

console.log("Average Altitude:", averageAltitude(sample)); 
// → e.g. 15000

console.log("Highest Altitude:", highestAltitude(sample)); 
// → returns the object with altitude 18000

console.log("Recent Readings:", filterRecent(sample, Date.now() - 8000)); 
// → readings within the last 8 seconds
