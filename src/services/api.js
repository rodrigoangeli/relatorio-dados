import axios from "axios";
const api = axios.create({
  baseURL: "https://relatorio-dados-backend.vercel.app/api",
});
export default api;
