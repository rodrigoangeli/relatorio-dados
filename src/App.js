import React, { useEffect, useState } from "react";
import api from "./services/api";
import KpiCard from "./components/KpiCard";
import LineChart from "./components/LineChart";

function App() {
  const [overview, setOverview] = useState(null);
  const [trend, setTrend] = useState({ labels: [], data: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: ov } = await api.get("/report/overview");
        setOverview(ov);
        const { data: tr } = await api.get(
          "/report/trend?metric=sessions&period=30"
        );
        setTrend({ labels: tr.dates, data: tr.values });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  if (!overview) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Métricas</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KpiCard title="Sessões (30d)" value={overview.sessions} />
        <KpiCard title="Cliques Ads" value={overview.clicks} />
        <KpiCard title="Leads" value={overview.leads} />
        <KpiCard title="Vendas" value={overview.sales} />
      </div>
      <div className="mb-6">
        <LineChart
          labels={trend.labels}
          data={trend.data}
          title="Tendência de Sessões"
        />
      </div>
      {/* Adicione aqui mais gráficos conforme necessidade */}
    </div>
  );
}

export default App;
