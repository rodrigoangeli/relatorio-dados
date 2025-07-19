import defaultFilters from "./configs/defaultFilters";
import React, { useState } from "react";
import { DashboardProvider } from "./context/DashboardContext";
import Header from "./sections/Header/Index";
import Login from "./pages/Login";
import Relatorio from "./pages/Relatorio";
import { AuthProvider, useAuth } from "./context/AuthContext";

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

// Get yesterday's date
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

// DataFim is 30 days before yesterday
const dataFim = new Date(yesterday);
dataFim.setDate(yesterday.getDate() - 30);

// Same period last month
const compareFim = new Date(dataFim);
compareFim.setMonth(compareFim.getMonth() - 1);

const compareInicio = new Date(yesterday);
compareInicio.setMonth(compareInicio.getMonth() - 1);

const initialFilters = {
  DataInicio: formatDate(dataFim),
  DataFim: formatDate(yesterday),
  ...defaultFilters,
};

const initialCompare = {
  DataInicio: formatDate(compareFim),
  DataFim: formatDate(compareInicio),
  ...defaultFilters,
};

function AppContent() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Login />;

  return (
    <DashboardProvider
      initialFilters={initialFilters}
      initialCompare={initialCompare}
      /*  isDisabled={true} */
    >
      <Header />
      <Relatorio />
    </DashboardProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
