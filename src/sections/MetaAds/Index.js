import Section from "../../components/Section";
import KpiCard from "../../components/KpiCard";

function MetaAds() {
  return (
    <div className="container py-4">
      <h4>Meta Ads</h4>
      <Section md={4} gutter={2} className="mb-2">
        <KpiCard title="Valor investido" />
        <KpiCard title="Impressões Totais" />
        <KpiCard title="Alcance Total" />
        <KpiCard title="Total de cliques no link" />
        <KpiCard title="CTR" />
        <KpiCard title="CPC médio" />
        <KpiCard title="CPM médio" />
        <KpiCard title="Frequência" />
      </Section>

      <Section lg={2} gutter={2}>
        <KpiCard title="Todos os cadastros (leads)" />
        <KpiCard title="Custo por Todos os cadastros (leads)" />
      </Section>
    </div>
  );
}

export default MetaAds;
