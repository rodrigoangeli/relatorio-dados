import Section from "../../components/Section";
import KpiCard from "../../components/KpiCard";
import DataTable from "react-data-table-component";
import Card from "../../components/Card";
import { useMemo, useState } from "react";
import {
  formatPercent,
  formatCurrencyBRL,
  numFmt,
} from "../../helpers/formatter";
import Form from "react-bootstrap/Form";

const columns = [
  {
    name: "Origem / Mídia",
    selector: (row) => `${row.source} / ${row.medium}`,
    sortable: true,
    width: "200px",
    format: (row) => (
      <div className="d-flex flex-column" style={{ fontSize: "12px" }}>
        <span className="fw-bold">{row.source}</span>
        <span className="text-muted">{row.medium}</span>
      </div>
    ),
  },
  {
    name: "Campanha",
    selector: (row) => row.campaign,
    sortable: true,
    width: "200px",
    format: (row) => (
      <span title={row.campaign} style={{ fontSize: "12px" }}>
        {row.campaign || "-"}
      </span>
    ),
  },
  {
    name: "URL",
    selector: (row) => row.url,
    sortable: true,
    width: "350px",
    format: (row) => (
      <span
        title={row.url}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "11px",
          display: "block",
          maxWidth: "100%",
        }}
      >
        {row.url}
      </span>
    ),
  },
  {
    name: "Leads",
    selector: (row) => row.leads,
    sortable: true,
    width: "120px",
    right: true,
    format: (row) => numFmt(row.leads),
  },
  {
    name: "Vendas",
    selector: (row) => row.sales,
    sortable: true,
    width: "120px",
    right: true,
    format: (row) => numFmt(row.sales),
  },
  {
    name: "Receita",
    selector: (row) => row.revenue,
    sortable: true,
    width: "120px",
    right: true,
    format: (row) => formatCurrencyBRL(row.revenue),
  },
  {
    name: "CR Vendas",
    selector: (row) => row.conversionRate,
    sortable: true,
    width: "100px",
    right: true,
    format: (row) => formatPercent(row.conversionRate * 100),
  },
];

function Other({ otherData }) {
  const [filterText, setFilterText] = useState("");

  const { rows, totalLeads, totalSales, totalRevenue } = useMemo(() => {
    if (!otherData)
      return { rows: [], totalLeads: 0, totalSales: 0, totalRevenue: 0 };

    // Simply map the flat data
    const mappedRows = otherData.map((item, index) => {
      const leads = Number(item.leads || 0);
      const sales = Number(item.sales || 0);
      const revenue = Number(item.revenue || 0);
      const conversionRate = leads > 0 ? sales / leads : 0;

      return {
        id: index,
        source: item.utm_source || "(direct)",
        medium: item.utm_medium || "(none)",
        campaign: item.utm_campaign || "",
        url: item.url || "",
        leads,
        sales,
        revenue,
        conversionRate,
        raw: item,
      };
    });

    const filteredRows = mappedRows.filter((item) => {
      const searchStr = filterText.toLowerCase();
      return (
        item.source.toLowerCase().includes(searchStr) ||
        item.medium.toLowerCase().includes(searchStr) ||
        item.campaign.toLowerCase().includes(searchStr) ||
        item.url.toLowerCase().includes(searchStr)
      );
    });

    const totalLeads = filteredRows.reduce((sum, r) => sum + r.leads, 0);
    const totalSales = filteredRows.reduce((sum, r) => sum + r.sales, 0);
    const totalRevenue = filteredRows.reduce((sum, r) => sum + r.revenue, 0);

    return {
      rows: filteredRows,
      totalLeads,
      totalSales,
      totalRevenue,
    };
  }, [otherData, filterText]);

  return (
    <>
      <Section md={3} gutter={2} title="Outros Canais">
        <KpiCard title="Leads Totais" value={numFmt(totalLeads)} />
        <KpiCard title="Vendas Totais" value={numFmt(totalSales)} />
        <KpiCard title="Receita Total" value={formatCurrencyBRL(totalRevenue)} />
        {/* Removed Spend/Cost cards as they are not present in the data snippet */}
      </Section>

      <Section md={1} gutter={2}>
        <Card>
          <div className="p-3">
            <Form.Control
              type="text"
              placeholder="Filtrar por origem, campanha ou url..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              style={{ maxWidth: "300px" }}
            />
          </div>
          <DataTable
            columns={columns}
            data={rows}
            pagination
            striped
            dense
            highlightOnHover
            noDataComponent="Nenhum dado encontrado."
          />
        </Card>
      </Section>
    </>
  );
}

export default Other;
