db.telemetry.insertMany([
  { id: 1, altitude: 15000, timestamp: 1694444000 },
  { id: 2, altitude: 25000, timestamp: 1694447600 },
  { id: 3, altitude: 18000, timestamp: 1694451200 },
  { id: 4, altitude: 30000, timestamp: 1694454800 },
  { id: 5, altitude: 9000,  timestamp: 1694458400 }
]);

db.telemetry.find({ altitude: { $gt: 10000 } });

db.telemetry.updateOne(
  { id: 3 },
  { $set: { altitude: 20000 } }
);

db.telemetry.deleteOne({ id: 5 });
