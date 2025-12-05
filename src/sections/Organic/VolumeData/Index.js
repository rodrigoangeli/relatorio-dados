import { useMemo, useState } from "react";
import Section from "../../../components/Section";
import KpiCard from "../../../components/KpiCard";
import DataTable from "react-data-table-component";
import Card from "../../../components/Card";
import { getCourseName } from "../../../helpers/cleaner";
import { formatPercent } from "../../../helpers/formatter";
import Form from "react-bootstrap/Form";

const allColumns = [
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
    compareCol: true, // 👈 marcamos as colunas de comparação
  },
  {
    name: "Δ Visitas",
    selector: (row) => row.delta.visits,
    sortable: true,
    compact: true,
    format: (row) => formatPercent(row.delta.visits),
    maxWidth: "80px",
    compareCol: true,
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
    compareCol: true,
  },
  {
    name: "Δ Leads",
    selector: (row) => row.delta.leads,
    sortable: true,
    compact: true,
    format: (row) => formatPercent(row.delta.leads),
    maxWidth: "80px",
    compareCol: true,
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
    compareCol: true,
  },
  {
    name: "Δ Vendas",
    selector: (row) => row.delta.sales,
    sortable: true,
    compact: true,
    format: (row) => formatPercent(row.delta.sales),
    maxWidth: "80px",
    compareCol: true,
  },
];

function VolumeData({ volumeData }) {
  const [courseNameInput, setCourseNameInput] = useState("");
  const [currentOnlyCheckbox, setCurrentOnlyCheckbox] = useState(false);

  const columns = useMemo(() => {
    if (currentOnlyCheckbox) {
      // mantém apenas as colunas sem flag compareCol
      return allColumns.filter((col) => !col.compareCol);
    }
    return allColumns;
  }, [currentOnlyCheckbox]);

  const { rows } = useMemo(() => {
    const rowsRaw = volumeData.map((e, i) => ({
      ...e,
      id: i + 1,
    }));

    const filteredRows = rowsRaw.filter((e) => {
      const matchName =
        courseNameInput === "" ||
        e.title.toLowerCase().includes(courseNameInput.toLowerCase());
      return matchName;
    });

    return { rows: filteredRows };
  }, [volumeData, courseNameInput]);

  return (
    <>
      <Section md={1} gutter={2}>
        <Card>
          <DataTable
            title="Tabela de Volumes"
            columns={columns}
            data={rows}
            subHeader
            subHeaderAlign="left"
            subHeaderComponent={
              <div className="d-flex gap-4 align-items-center">
                <Form.Control
                  id="search"
                  type="text"
                  placeholder="Nome do Curso"
                  value={courseNameInput}
                  onChange={(e) => setCourseNameInput(e.target.value)}
                />
                <Form.Check
                  type={"checkbox"}
                  id={`default`}
                  label="Atual"
                  checked={currentOnlyCheckbox}
                  onChange={() => setCurrentOnlyCheckbox(!currentOnlyCheckbox)}
                />
              </div>
            }
            pagination
            striped
          />
        </Card>
      </Section>
    </>
  );
}

export default VolumeData;
