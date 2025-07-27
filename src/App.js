import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Relatorio from "./pages/Relatorio";

export default function App() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Relatorio /> : <Login />;
}
