import Section from "../../components/Section";
import KpiCard from "../../components/KpiCard";

function Resume() {
  return (
    <div className="container py-4">
      <h4>Resumo Geral</h4>
      <Section md={4} gutter={2} className="mb-2">
        <KpiCard title="Visitas totais" />
        <KpiCard title="Leads totais" />
        <KpiCard title="Vendas totais (receita)" />
        <KpiCard title="Custo total em Ads" />
        <KpiCard title="ROI / ROAS agregado" />
      </Section>

      <Section lg={2} gutter={2}>
        <KpiCard title="Todos os cadastros (leads)" />
        <KpiCard title="Custo por Todos os cadastros (leads)" />
      </Section>
    </div>
  );
}

export default Resume;
