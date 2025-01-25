import React from "react";

export default function MetricsCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
}
