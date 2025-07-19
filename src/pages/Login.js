import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const success = await login(user, pass);
    if (!success) {
      setError("Usuário ou senha incorretos");
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded shadow-sm p-4 w-25 position-relative"
      >
        <h3 className="text-center mb-2">Login</h3>
        {error && <p className="text-danger mb-2 text-center">{error}</p>}
        <div className="mb-2">
          <label className="d-block text-sm">Usuário</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="border px-2 py-1 rounded w-100"
            required
          />
        </div>
        <div className="mb-3">
          <label className="d-block text-sm">Senha</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="border px-2 py-1 rounded w-100"
            required
          />
        </div>
        <button type="submit" className="w-100 btn btn-primary rounded">
          Entrar
        </button>
        {isLoading && (
          <div className="position-absolute h-100 w-100 top-0 start-0 d-flex align-items-center justify-content-center bg-white rounded">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
