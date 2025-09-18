import React from "react";

export default function AltFilterDropdown({ filter, setFilter }) {
  return (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      style={{ marginBottom: "10px" }}
    >
      <option value="all">All</option>
      <option value="high">High Altitude ({">"}20k)</option>
      <option value="low">Low Altitude (≤20k)</option>
    </select>
  );
}
