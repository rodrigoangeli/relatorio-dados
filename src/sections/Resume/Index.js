import React, { useMemo } from "react";
import Section from "../../components/Section";
import KpiCard from "../../components/KpiCard";
import { formatPercent, numFmt } from "../../helpers/formatter";

function Resume({
  visitas,
  visitasCompare,
  leads,
  leadsCompare,
  vendas,
  vendasCompare,
  convVisitLead,
  convVisitLeadCmp,
  convLeadSale,
  convLeadSaleCmp,
  convVisitSale,
  convVisitSaleCmp,
  delta,
}) {
  return (
    <>
      <Section title="Resumo" md={3} gutter={2}>
        <KpiCard
          title="Visitas totais"
          value={numFmt(visitas)}
          comparison={numFmt(visitasCompare)}
          dif={formatPercent(delta.visitas)}
        />
        <KpiCard
          title="Leads totais"
          value={numFmt(leads)}
          comparison={numFmt(leadsCompare)}
          dif={formatPercent(delta.leads)}
        />
        <KpiCard
          title="Vendas totais"
          value={numFmt(vendas)}
          comparison={numFmt(vendasCompare)}
          dif={formatPercent(delta.vendas)}
        />

        <KpiCard
          title="Taxa de Conversão (Visita → Lead)"
          value={formatPercent(convVisitLead)}
          comparison={formatPercent(convVisitLeadCmp)}
        />
        <KpiCard
          title="Taxa de Conversão (Lead → Venda)"
          value={formatPercent(convLeadSale)}
          comparison={formatPercent(convLeadSaleCmp)}
        />
        <KpiCard
          title="Taxa de Conversão (Visita → Venda)"
          value={formatPercent(convVisitSale)}
          comparison={formatPercent(convVisitSaleCmp)}
        />
      </Section>
    </>
  );
}

export default Resume;
