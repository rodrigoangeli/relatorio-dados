import defaultFilters from "./configs/defaultFilters";
import React, { useState } from "react";
import { DashboardProvider } from "./context/DashboardContext";
import Resume from "./sections/Resume/Index";
import MetaAds from "./sections/MetaAds/Index";
import Header from "./sections/Header/Index";

const initialFilters = {
  DataInicio: "2025-07-01",
  DataFim: "2025-07-15",
  ...defaultFilters,
};
const initialCompare = {
  DataInicio: "2025-06-01",
  DataFim: "2025-06-15",
  ...defaultFilters,
};

export default function App() {
  return (
    <DashboardProvider
      initialFilters={initialFilters}
      initialCompare={initialCompare}
    >
      <div className="p-4">
        <h1>Dashboard</h1>
        <Header />
        <Resume />
        <MetaAds />
      </div>
    </DashboardProvider>
  );
}
