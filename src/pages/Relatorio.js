import React, { useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import Resume from "../sections/Resume/Index";
import MetaAds from "../sections/MetaAds/Index";
import Organic from "../sections/Organic/Index";

export default function Relatorio() {
  const { data, loading, error } = useDashboard();

  if (loading) {
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
    <div className="px-4 pb-5">
      <Resume data={data} />
      <Organic data={data} />
      <MetaAds data={data} />
    </div>
  );
}
