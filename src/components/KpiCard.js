import React from "react";

export default function KpiCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
