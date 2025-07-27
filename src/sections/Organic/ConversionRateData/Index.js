import { useMemo } from "react";
import Section from "../../../components/Section";
import DataTable from "react-data-table-component";
import Card from "../../../components/Card";
import { getCourseName } from "../../../helpers/cleaner";
import { formatPercent } from "../../../helpers/formatter";

const columns = [
  {
    name: "Curso",
    grow: 2,
    selector: (row) =>
      getCourseName(row.title) !== "(not set)"
        ? getCourseName(row.title)
        : row.path,
    sortable: true,
  },
  {
    name: "% (Visita→Lead)",
    selector: (row) => row.crVisLead,
    sortable: true,
    format: (row) => formatPercent(row.crVisLead),
    compact: true,
  },
  {
    name: "% (Visita→Lead) Ant.",
    selector: (row) => row.crVisLeadCompare,
    sortable: true,
    format: (row) => formatPercent(row.crVisLeadCompare),
    compact: true,
  },
  {
    name: "% (Lead→Venda)",
    selector: (row) => row.crLeadSale,
    sortable: true,
    format: (row) => formatPercent(row.crLeadSale),
    compact: true,
  },
  {
    name: "% (Lead→Venda) Ant.",
    selector: (row) => row.crLeadSaleCompare,
    sortable: true,
    format: (row) => formatPercent(row.crLeadSaleCompare),
    compact: true,
  },
];

function ConversionRateData({ conversionRateData }) {
  const { rows } = useMemo(() => {
    const rowsRaw = conversionRateData.map((e, i) => ({
      ...e,
      id: i + 1,
    }));

    return {
      rows: rowsRaw,
    };
  }, [conversionRateData]);

  return (
    <>
      <Section md={1} gutter={2}>
        <Card>
          <DataTable
            title="Tabela de Taxas de Conversão"
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

export default ConversionRateData;
