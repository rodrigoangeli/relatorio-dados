import React, { useMemo } from "react";
import Section from "../../components/Section";
import KpiCard from "../../components/KpiCard";
import {
  formatPercent,
  formatCurrencyBRL,
  numFmt,
} from "../../helpers/formatter";

function Resume({ data }) {
  const {
    visitas,
    visitasCompare,
    leads,
    leadsCompare,
    vendas,
    vendasCompare,
    receita,
    receitaCompare,
    custoAds,
    custoAdsCompare,
  } = useMemo(() => {
    const visitasVal =
      data.analytics?.pages?.reduce((sum, { sessions }) => sum + sessions, 0) ||
      0;
    const visitasCmp =
      data.analyticsCompare?.pages?.reduce(
        (sum, { sessions }) => sum + sessions,
        0
      ) || 0;
    const leadsVal = data.leads?.length || 0;
    const leadsCmp = data.leadsCompare?.length || 0;
    const vendasVal = data.vendas?.length || 0;
    const vendasCmp = data.vendasCompare?.length || 0;
    const receitaVal =
      data.vendas?.reduce((sum, { ValorTotal }) => sum + ValorTotal, 0) || 0;
    const receitaCmp =
      data.vendasCompare?.reduce(
        (sum, { ValorTotal }) => sum + ValorTotal,
        0
      ) || 0;
    const custoAdsVal = data.metaAds?.total?.spend || 0;
    const custoAdsCmp = data.metaAdsCompare?.total?.spend || 0;

    return {
      visitas: visitasVal,
      visitasCompare: visitasCmp,
      leads: leadsVal,
      leadsCompare: leadsCmp,
      vendas: vendasVal,
      vendasCompare: vendasCmp,
      receita: receitaVal,
      receitaCompare: receitaCmp,
      custoAds: custoAdsVal,
      custoAdsCompare: custoAdsCmp,
    };
  }, [data]);

  // helper for percentage diff
  const diff = (v, c) => (c ? (v / c - 1) * 100 : 0);

  // computed conversion rates
  const convVisitLead = leads && visitas ? (leads / visitas) * 100 : 0;
  const convVisitLeadCmp =
    leadsCompare && visitasCompare ? (leadsCompare / visitasCompare) * 100 : 0;

  const convLeadSale = vendas && leads ? (vendas / leads) * 100 : 0;
  const convLeadSaleCmp =
    vendasCompare && leadsCompare ? (vendasCompare / leadsCompare) * 100 : 0;

  const convVisitSale = vendas && visitas ? (vendas / visitas) * 100 : 0;
  const convVisitSaleCmp =
    vendasCompare && visitasCompare
      ? (vendasCompare / visitasCompare) * 100
      : 0;

  const roi = ((receita - custoAds) / custoAds) * 100;

  const roiCompare =
    ((receitaCompare - custoAdsCompare) / custoAdsCompare) * 100;

  return (
    <>
      <Section title="Resumo" md={3} gutter={2}>
        <KpiCard
          title="Visitas totais"
          value={numFmt(visitas)}
          comparison={numFmt(visitasCompare)}
          dif={formatPercent(diff(visitas, visitasCompare))}
        />
        <KpiCard
          title="Leads totais"
          value={numFmt(leads)}
          comparison={numFmt(leadsCompare)}
          dif={formatPercent(diff(leads, leadsCompare))}
        />
        <KpiCard
          title="Vendas totais"
          value={numFmt(vendas)}
          comparison={numFmt(vendasCompare)}
          dif={formatPercent(diff(vendas, vendasCompare))}
        />
        {/* Conversion Rates */}
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
      <Section md={2} gutter={2}>
        <KpiCard
          title="Receita"
          value={formatCurrencyBRL(receita)}
          comparison={formatCurrencyBRL(receitaCompare)}
          dif={formatPercent(diff(receita, receitaCompare))}
        />
        <KpiCard
          title="Custo total em Ads"
          value={formatCurrencyBRL(custoAds)}
          comparison={formatCurrencyBRL(custoAdsCompare)}
          dif={formatPercent(diff(custoAds, custoAdsCompare))}
        />
      </Section>
    </>
  );
}

export default Resume;
