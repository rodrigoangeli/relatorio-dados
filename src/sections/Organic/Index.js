import { useMemo } from "react";
import Section from "../../components/Section";
import KpiCard from "../../components/KpiCard";
import DataTable from "react-data-table-component";
import Card from "../../components/Card";
import { getCourseName } from "../../helpers/cleaner";

const columns = [
  {
    name: "Curso",
    selector: (row) => getCourseName(row.title),
    sortable: true,
  },
  { name: "Sessões", selector: (row) => row.sessions, sortable: true },
];

function Organic({ data }) {
  const { rows } = useMemo(() => {
    const rowsRaw = data.analytics?.pages
      .filter(({ title }) => title !== "(not set)")
      .map((e, i) => ({
        ...e,
        id: i + 1,
      }));

    return {
      rows: rowsRaw,
    };
  }, [data]);

  return (
    <>
      <Section md={1} gutter={2} title="Orgânico">
        <Card>
          <DataTable
            title="Visitas Orgânicas"
            columns={columns}
            data={rows}
            pagination
          />
        </Card>
      </Section>

      <Section lg={2} gutter={2}>
        <KpiCard title="Todos os cadastros (leads)" />
        <KpiCard title="Custo por Todos os cadastros (leads)" />
      </Section>
    </>
  );
}

export default Organic;
