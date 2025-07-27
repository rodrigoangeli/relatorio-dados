import { useMemo } from "react";
import Section from "../../../components/Section";
import KpiCard from "../../../components/KpiCard";
import DataTable from "react-data-table-component";
import Card from "../../../components/Card";
import { getCourseName } from "../../../helpers/cleaner";
import { formatPercent } from "../../../helpers/formatter";

const columns = [
  {
    name: "Curso",
    grow: 4,
    selector: (row) =>
      getCourseName(row.title) !== "(not set)"
        ? getCourseName(row.title)
        : row.path,
    sortable: true,
    maxWidth: "340px",
  },
  {
    name: "Visitas",
    selector: (row) => row.visits,
    sortable: true,
    compact: true,
    maxWidth: "80px",
  },
  {
    name: "Visitas Ant.",
    selector: (row) => row.visitsCompare,
    sortable: true,
    compact: true,
    maxWidth: "80px",
  },
  {
    name: "Δ Visitas",
    selector: (row) => row.delta.visits,
    sortable: true,
    compact: true,
    format: (row) => formatPercent(row.delta.visits),
    maxWidth: "80px",
  },
  {
    name: "Leads",
    selector: (row) => row.leads,
    sortable: true,
    compact: true,
    maxWidth: "80px",
  },
  {
    name: "Leads Ant.",
    selector: (row) => row.leadsCompare,
    sortable: true,
    compact: true,
    maxWidth: "80px",
  },
  {
    name: "Δ Leads",
    selector: (row) => row.delta.leads,
    sortable: true,
    compact: true,
    format: (row) => formatPercent(row.delta.leads),
    maxWidth: "80px",
  },
  {
    name: "Vendas ",
    selector: (row) => row.sales,
    sortable: true,
    compact: true,
    maxWidth: "80px",
  },
  {
    name: "Vendas  Ant.",
    selector: (row) => row.salesCompare,
    sortable: true,
    compact: true,
    maxWidth: "80px",
  },
  {
    name: "Δ Vendas",
    selector: (row) => row.delta.sales,
    sortable: true,
    compact: true,
    format: (row) => formatPercent(row.delta.sales),
    maxWidth: "80px",
  },
];

function VolumeData({ volumeData }) {
  const { rows } = useMemo(() => {
    const rowsRaw = volumeData.map((e, i) => ({
      ...e,
      id: i + 1,
    }));

    return {
      rows: rowsRaw,
    };
  }, [volumeData]);

  return (
    <>
      <Section md={1} gutter={2}>
        <Card>
          <DataTable
            title="Tabela de Volumes"
            columns={columns}
            data={rows}
            pagination
            striped
          />
        </Card>
      </Section>
    </>
  );
}

export default VolumeData;
