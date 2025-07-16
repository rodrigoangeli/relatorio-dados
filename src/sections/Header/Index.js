import React, { useState } from "react";
import { useDashboard } from "../../context/DashboardContext";

export default function Header() {
  const {
    primaryFilters,
    compareFilters,
    setPrimaryFilters,
    setCompareFilters,
  } = useDashboard();

  const [start1, setStart1] = useState(primaryFilters?.DataInicio);
  const [end1, setEnd1] = useState(primaryFilters?.DataFim);
  const [start2, setStart2] = useState(compareFilters?.DataInicio);
  const [end2, setEnd2] = useState(compareFilters?.DataFim);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrimaryFilters({ ...primaryFilters, DataInicio: start1, DataFim: end1 });
    setCompareFilters({ ...compareFilters, DataInicio: start2, DataFim: end2 });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label>Período Principal</label>
          <input
            type="date"
            value={start1}
            onChange={(e) => setStart1(e.target.value)}
          />
          <input
            type="date"
            value={end1}
            onChange={(e) => setEnd1(e.target.value)}
          />
        </div>
        <div>
          <label>Período de Comparação</label>
          <input
            type="date"
            value={start2}
            onChange={(e) => setStart2(e.target.value)}
          />
          <input
            type="date"
            value={end2}
            onChange={(e) => setEnd2(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
}
