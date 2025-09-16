// backend/utils/telementry.ts

export interface Telemetry{
  id: string,
  timestamp: number,
  altitude: number;
}

/**
 * Compute the average altitude across a set of telemetry readings.
 * Returns 0 if the array is empty.
 */

export function averageAltitude(data: Telemetry[]): number {
  if (data.length === 0) return 0;
  const total = data.reduce((sum, t) => sum + t.altitude, 0);
  return total/data.length; 

}

/**
 * Find the highest-altitude telemetry record.
 * Returns null if there is no data.
 */

export function highestAltitude(data: Telemetry[]): Telemetry | null{
  if (data.length == 0) return null;

  return data.reduce((max, t) => (t.altitude > max.altitude ? t: max), data[0]);

}

/**
 * Filter readings that are newer than the given UNIX timestamp.
 */

export function filterRecent(data: Telemetry[], since: number): Telemetry[] {
  return data.filter(t => t.timestamp > since);
}