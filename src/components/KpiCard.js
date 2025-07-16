import React from "react";

export default function KpiCard({ title, value, comparison }) {
  return (
    <div className="col">
      <div className="grid-item">
        {title}
        {value}
        {comparison}
      </div>
    </div>
  );
}
