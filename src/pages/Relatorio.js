import React, { useState, useEffect } from "react";
import Resume from "../sections/Resume/Index";
import MetaAds from "../sections/MetaAds/Index";
import Organic from "../sections/Organic/Index";
import Other from "../sections/Other/Index";
import api from "../services/api";
import defaultFilters from "../configs/defaultFilters";

import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { parseISO, format } from "date-fns";
import { formatDate } from "../helpers/formatter";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const dataFim = new Date(yesterday);
dataFim.setDate(yesterday.getDate() - 30);

const compareFim = new Date(dataFim);
compareFim.setMonth(compareFim.getMonth() - 1);

const compareInicio = new Date(yesterday);
compareInicio.setMonth(compareInicio.getMonth() - 1);

export default function Relatorio() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const dataFim = new Date(yesterday);
  dataFim.setDate(yesterday.getDate() - 30);

  const compareFim = new Date(dataFim);
  compareFim.setMonth(compareFim.getMonth() - 1);

  const compareInicio = new Date(yesterday);
  compareInicio.setMonth(compareInicio.getMonth() - 1);

  // get url params (if they exist)
  const urlStart = getUrlParam("start");
  const urlEnd = getUrlParam("end");
  const urlStartCompare = getUrlParam("startCompare");
  const urlEndCompare = getUrlParam("endCompare");

  const [start1, setStart1] = useState(urlStart || formatDate(dataFim));
  const [end1, setEnd1] = useState(urlEnd || formatDate(yesterday));
  const [start2, setStart2] = useState(
    urlStartCompare || formatDate(compareFim)
  );
  const [end2, setEnd2] = useState(urlEndCompare || formatDate(compareInicio));

  const [filters, setFilters] = useState({
    ...defaultFilters,
    start: start1,
    end: end1,
    startCompare: start2,
    endCompare: end2,
  });

  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/report", { params: filters })
      .then(({ data }) => {
        console.log(data);
        setFetchedData(data);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [filters]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters({
      ...defaultFilters,
      start: start1,
      end: end1,
      startCompare: start2,
      endCompare: end2,
    });
  };

  // 5) loading / error states
  if (isLoading) {
    return (
      <div className="flex-fill d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex-fill d-flex align-items-center justify-content-center">
        Erro encontrado
      </div>
    );
  }

  return (
    <>
      <header className="menu px-4 py-3  border-bottom">
        <div className="container-xxl">
          <form
            onSubmit={handleSubmit}
            className="d-flex gap-5 align-items-end"
          >
            {/* Período Principal */}
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
                <option disabled value="">
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

      <div className="px-4 pb-5">
        <Resume {...fetchedData.resumeData} />
        <Organic {...fetchedData.organicData} />
        <MetaAds metaAdsData={fetchedData?.metaAdsData} />
        <Other otherData={fetchedData?.otherData} />
      </div>
    </>
  );
}
