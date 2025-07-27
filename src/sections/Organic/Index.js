import Section from "../../components/Section";
import KpiCard from "../../components/KpiCard";
import VolumeData from "./VolumeData/Index";
import ConversionRateData from "./ConversionRateData/Index";
import { numFmt, formatPercent } from "../../helpers/formatter";

function Organic({
  totalVisits,
  totalVisitsCompare,
  totalLeads,
  totalLeadsCompare,
  totalSales,
  totalSalesCompare,
  delta,
  volumeData,
  conversionRateData,
}) {
  return (
    <>
      <Section lg={3} gutter={2} title="Orgânico">
        <KpiCard
          title="Visitas totais"
          value={numFmt(totalVisits)}
          comparison={numFmt(totalVisitsCompare)}
          dif={formatPercent(delta?.visits)}
        />
        <KpiCard
          title="Leads totais"
          value={numFmt(totalLeads)}
          comparison={numFmt(totalLeadsCompare)}
          dif={formatPercent(delta?.leads)}
        />
        <KpiCard
          title="Vendas totais"
          value={numFmt(totalSales)}
          comparison={numFmt(totalSalesCompare)}
          dif={formatPercent(delta?.sales)}
        />
      </Section>
      <VolumeData volumeData={volumeData} />
      <ConversionRateData conversionRateData={conversionRateData} />
    </>
  );
}

export default Organic;
