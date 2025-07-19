import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { parseISO, format } from "date-fns";
import { useDashboard } from "../../context/DashboardContext";

import "react-datepicker/dist/react-datepicker.css";

export default function Header() {
  registerLocale("pt-BR", ptBR);
  const {
    primaryFilters,
    compareFilters,
    setPrimaryFilters,
    setCompareFilters,
  } = useDashboard();

  const [start1, setStart1] = useState(primaryFilters.DataInicio);
  const [end1, setEnd1] = useState(primaryFilters.DataFim);
  const [start2, setStart2] = useState(compareFilters.DataInicio);
  const [end2, setEnd2] = useState(compareFilters.DataFim);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrimaryFilters({ ...primaryFilters, DataInicio: start1, DataFim: end1 });
    setCompareFilters({ ...compareFilters, DataInicio: start2, DataFim: end2 });
  };

  return (
    <header className="py-4 border-bottom">
      <div className="container">
        <form onSubmit={handleSubmit} className="d-flex gap-5 align-items-end">
          <div>
            <label>Período Principal</label>
            <div className="d-flex gap-2">
              <DatePicker
                selected={parseISO(start1)}
                onChange={(date) => setStart1(format(date, "yyyy-MM-dd"))}
                selectsStart
                startDate={parseISO(start1)}
                endDate={parseISO(end1)}
                dateFormat="dd/MM/yyyy"
                locale="pt-BR"
                className="form-control me-2"
              />
              <DatePicker
                selected={parseISO(end1)}
                onChange={(date) => setEnd1(format(date, "yyyy-MM-dd"))}
                selectsEnd
                startDate={parseISO(start1)}
                endDate={parseISO(end1)}
                dateFormat="dd/MM/yyyy"
                locale="pt-BR"
                className="form-control"
              />
            </div>
          </div>

          <div>
            <label>Período de Comparação</label>
            <div className="d-flex gap-2">
              <DatePicker
                selected={parseISO(start2)}
                onChange={(date) => setStart2(format(date, "yyyy-MM-dd"))}
                selectsStart
                startDate={parseISO(start2)}
                endDate={parseISO(end2)}
                dateFormat="dd/MM/yyyy"
                locale="pt-BR"
                className="form-control me-2"
              />
              <DatePicker
                selected={parseISO(end2)}
                onChange={(date) => setEnd2(format(date, "yyyy-MM-dd"))}
                selectsEnd
                startDate={parseISO(start2)}
                endDate={parseISO(end2)}
                dateFormat="dd/MM/yyyy"
                locale="pt-BR"
                className="form-control"
              />
            </div>
          </div>
          <div className="w-50">
            <label>Produtos</label>
            <select defaultValue="" className="form-control">
              <option disabled selected value="">
                Todos
              </option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Atualizar
          </button>
        </form>
      </div>
    </header>
  );
}
