import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // on mount, check if token header is already set in axios defaults
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth_token");
    if (storedAuth) {
      api.defaults.headers.common.Authorization = storedAuth;
      setIsAuthenticated(true);
    }
  }, []);

  // login via API
  async function login(username, password) {
    try {
      const response = await api.post("/login", { username, password });
      // axios doesn't have .ok, use status
      if (response.status !== 200) throw new Error("Credenciais inválidas");
      // get auth header from response
      const authHeader =
        response.headers["authorization"] || response.headers["Authorization"];
      console.log(authHeader);
      if (!authHeader) throw new Error("Cabeçalho de autorização ausente");
      // set axios default and persist
      api.defaults.headers.common.Authorization = authHeader;
      localStorage.setItem("auth_token", authHeader);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error("Login falhou:", err);
      return false;
    }
  }

  function logout() {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
