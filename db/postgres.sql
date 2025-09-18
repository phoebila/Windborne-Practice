CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    name TEXT,
    altitude INTEGER,
    timestamp TIMESTAMP
);

INSERT INTO flights (name, altitude, timestamp) VALUES
('Falcon 1', 15000, '2025-09-18 10:00:00'),
('Falcon 9', 22000, '2025-09-18 11:00:00'),
('Starship', 30000, '2025-09-18 12:00:00'),
('Electron', 18000, '2025-09-18 13:00:00'),
('New Glenn', 25000, '2025-09-18 14:00:00');

SELECT * FROM flights
WHERE altitude > 20000;

SELECT DATE(timestamp) AS flight_date, COUNT(*) AS flight_count
FROM flights
GROUP BY DATE(timestamp);

