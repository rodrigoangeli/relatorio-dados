import React from "react";

export default function Card({ children }) {
  return (
    <div className="col">
      <div className="card p-4">{children}</div>
    </div>
  );
}
