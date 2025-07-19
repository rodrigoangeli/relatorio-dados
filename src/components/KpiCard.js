import React from "react";

export default function KpiCard({ title, value, dif, comparison }) {
  return (
    <div className="col">
      <div className="grid-item card p-4">
        <h4 className="fw-semibold fs-6 mb-2">{title}</h4>
        <div className="d-flex space-x-2 align-items-center justify-content-center">
          <h2 className="mb-0">{value}</h2>
          {dif && (
            <div className={`tag ms-2 ${parseInt(dif) > 0 ? "good" : "bad"}`}>
              <svg
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                should-add-custom-color="true"
              >
                <path d="M3 8L6 3L9 8"></path>
                <path
                  d="M3 8L6 3L9 8L3 8Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              {dif}
            </div>
          )}
        </div>
        {comparison && (
          <small>
            <b>{comparison}</b> no período anterior
          </small>
        )}
      </div>
    </div>
  );
}
