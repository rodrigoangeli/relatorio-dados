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
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Form from "react-bootstrap/Form";

const ExpandedAdsComponent = ({ data }) => {
  return (
    <div style={{ padding: ".5rem 1rem" }}>
      <h5 style={{ marginBottom: "1rem" }}>Anúncios da campanha</h5>

      {data.ads?.map((ad, index) => {
        const leads =
          ad.actions?.find((a) => a.action_type === "lead")?.value ?? 0;

        return (
          <div
            key={ad.ad_id || index}
            style={{
              borderBottom: "1px solid #ccc",
              padding: "0.5rem 0",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <img
                src={ad.creative.thumbnail_url}
                className="img-fluid"
                style={{ maxWidth: "115px" }}
              />
              <div>
                <strong>{ad.ad_name}</strong>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem 4rem",
                  }}
                >
                  <div>
                    <strong className="d-block">ID:</strong> {ad.ad_id}
                  </div>
                  <div>
                    <strong className="d-block">Impressões:</strong>{" "}
                    {ad.impressions}
                  </div>
                  <div>
                    <strong className="d-block">Cliques:</strong> {ad.clicks}
                  </div>
                  <div>
                    <strong className="d-block">CTR:</strong>{" "}
                    {Number(ad.ctr).toFixed(2)}%
                  </div>
                  <div>
                    <strong className="d-block">Investimento:</strong>
                    {formatCurrencyBRL(Number(ad.spend))}
                  </div>
                  <div>
                    <strong className="d-block">Link:</strong>
                    {ad.creative?.link_url ||
                      ad.creative?.asset_feed_spec?.link_urls?.[0]
                        ?.website_url ||
                      ad.creative?.object_story_spec?.video_data?.call_to_action
                        ?.value?.link ||
                      ad.creative?.object_story_spec?.link_data?.link ||
                      null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const accMap = {
  act_221726821802864: {
    name: "Verbo Jurídico | RS (novo)",
    color: "#1158c6",
  },
  act_323660580768388: {
    name: "Novos Negócios",
    color: "#ac8b0c",
  },
  act_1260402611487429: {
    name: "Verbo Sedes - Conta 002",
    color: "#0cac3c",
  },
  act_224872643601473: {
    name: "RJ Presencial",
    color: "#ac320c",
  },
};

const columns = [
  {
    name: "Campaign",
    selector: (row) => row.campaignName,
    sortable: true,
    format: (row) => {
      const original = row.campaignName;
      const limpar = (texto) => {
        return texto
          .replace(/\((?![^()]*p[óo]s)[^()]*\)/gi, "")
          .replace(/\[(?![^\[\]]*p[óo]s)[^\[\]]*\]/gi, "")
          .replace(/\{(?![^{}]*p[óo]s)[^{}]*\}/gi, "")
          .replace(/\s+/g, " ")
          .trim();
      };
      const formatado = limpar(original);
      return (
        <span
          style={{ color: accMap[row.accountId].color, fontWeight: 700 }}
          title={original}
        >
          {formatado}
        </span>
      );
    },
    width: "250px",
  },
  {
    name: "Adset",
    selector: (row) => row.adsetNames,
    width: "65px",
    center: true,
    format: (row) => {
      return (
        <>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip>
                <ul>
                  {row.adsetNames.map((e) => (
                    <li>{e.trim()}</li>
                  ))}
                </ul>
              </Tooltip>
            }
          >
            <span className="info">{row.adsetNames.length}</span>
          </OverlayTrigger>
        </>
      );
    },
  },
  {
    name: "Impressões",
    selector: (row) => row.impressions,
    sortable: true,
    width: "120px",
    compact: true,
    center: true,
  },
  {
    name: "Cliques",
    selector: (row) => row.clicks,
    sortable: true,
    width: "60px",
    compact: true,
    center: true,
  },
  {
    name: "CTR",
    selector: (row) => row.ctr,
    sortable: true,
    format: (row) => formatPercent(row.ctr),
    width: "80px",
    compact: true,
    center: true,
  },
  {
    name: "Leads",
    selector: (row) => row.leads,
    sortable: true,
    format: (row) => {
      if (row.metaLeadsCount) {
        return `${row.leads}~`;
      }
      return row.leads;
    },
    width: "60px",
    compact: true,
    center: true,
  },
  {
    name: "% CR Leads",
    selector: (row) => row.leadRate,
    sortable: true,
    format: (row) => formatPercent(parseFloat(row.leadRate)),
    width: "80px",
    compact: true,
    center: true,
  },
  {
    name: "Vendas",
    selector: (row) => row.sales,
    sortable: true,
    width: "60px",
    compact: true,
    center: true,
  },
  {
    name: "% CR Vendas",
    selector: (row) => row.saleRate,
    sortable: true,
    format: (row) => formatPercent(parseFloat(row.saleRate)),
    width: "80px",
    compact: true,
    center: true,
  },
  {
    name: "Investimento",
    selector: (row) => row.spend,
    format: (row) => formatCurrencyBRL(row.spend),
    sortable: true,
    width: "120px",
    compact: true,
  },
  {
    name: "Receita",
    selector: (row) => row.revenue,
    format: (row) => formatCurrencyBRL(row.revenue),
    sortable: true,
    width: "120px",
    compact: true,
  },
  {
    name: "Custo por Venda",
    selector: (row) => row.costPerSale,
    format: (row) => formatCurrencyBRL(row.costPerSale),
    sortable: true,
    width: "120px",
    compact: true,
  },
  {
    name: "utms",
    selector: (row) => row.utms,
    sortable: true,
    format: (row) => (
      <div className="utms">
        <span>medium: {row.utms.utm_medium}</span>
        <span>campaign: {row.utms.utm_campaign}</span>
        <span>content: {row.utms.utm_content}</span>
      </div>
    ),
  },
];
function MetaAds({ metaAdsData }) {
  const [campaignNameInput, setCampaignNameInput] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [courseOnlyCheckbox, setCourseOnlyCheckbox] = useState(true);
  const { rows, totalLeads, totalSales, totalRevenue, totalSpent } =
    useMemo(() => {
      const rowsRaw = metaAdsData
        .map((account) => {
          const rows = [];
          account.campaigns.forEach((camp) => {
            camp.adsets.forEach((aset) => {
              rows.push({
                accountId: account.accountId,
                id: aset.adsetIds.join(""),
                campaignName: camp.campaignName,
                adsetNames: aset.adsetNames,
                impressions: parseInt(aset.impressions),
                clicks: parseInt(aset.clicks),
                ctr: parseFloat(aset.ctr),
                leads: parseInt(aset.leads),
                revenue: parseInt(aset.revenue),
                leadRate:
                  parseInt(aset.clicks) > 0
                    ? (parseInt(aset.leads) / parseInt(aset.clicks)) * 100
                    : 0,
                sales: parseInt(aset.sales),
                saleRate:
                  parseInt(aset.leads) > 0
                    ? (parseInt(aset.sales) / parseInt(aset.leads)) * 100
                    : 0,
                spend: parseInt(aset.spend),
                costPerSale:
                  parseInt(aset.sales) > 0
                    ? parseInt(aset.spend) / parseInt(aset.sales)
                    : parseInt(aset.spend),
                utms: {
                  utm_medium: aset.utm_medium,
                  utm_campaign: aset.utm_campaign,
                  utm_content: aset.utm_content,
                },
                ...aset,
              });
            });
          });
          return rows;
        })
        .flat();
      const filteredRows = rowsRaw.filter((e) => {
        const matchName =
          campaignNameInput === "" ||
          e.campaignName
            .toLowerCase()
            .includes(campaignNameInput.toLowerCase());

        const matchCourse = !courseOnlyCheckbox || e.isCourse;

        const matchAccount =
          selectedAccount === "" || e.accountId === selectedAccount;

        return matchName && matchCourse && matchAccount;
      });

      const totalLeads = filteredRows.reduce(
        (sum, a) => sum + Number(a.leads || 0),
        0
      );
      const totalSales = filteredRows.reduce(
        (sum, a) => sum + Number(a.sales || 0),
        0
      );
      const totalSpent = filteredRows.reduce(
        (sum, a) => sum + Number(a.spend || 0),
        0
      );
      const totalRevenue = filteredRows.reduce(
        (sum, a) => sum + Number(a.revenue || 0),
        0
      );

      return {
        rows: filteredRows,
        totalLeads,
        totalSales,
        totalSpent,
        totalRevenue,
      };
    }, [metaAdsData, campaignNameInput, courseOnlyCheckbox, selectedAccount]);
  return (
    <>
      <Section md={1} gutter={2} title="Meta Ads">
        <Card>
          <DataTable
            title="Tabela de Volumes"
            columns={columns}
            data={rows}
            pagination
            striped
            subHeader
            subHeaderAlign="left"
            subHeaderComponent={
              <div className="d-flex gap-4 align-items-center">
                <Form.Control
                  id="search"
                  type="text"
                  placeholder="Nome da Campanha"
                  value={campaignNameInput}
                  onChange={(e) => setCampaignNameInput(e.target.value)}
                />
                <Form.Select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                >
                  <option value="">Selecinar conta</option>
                  {Object.keys(accMap).map((val) => (
                    <option value={val}>{accMap[val].name}</option>
                  ))}
                </Form.Select>
                <Form.Check
                  type={"checkbox"}
                  id={`default`}
                  label="Cursos"
                  checked={courseOnlyCheckbox}
                  onChange={() => setCourseOnlyCheckbox(!courseOnlyCheckbox)}
                />
              </div>
            }
            expandableRows
            expandableRowsComponent={ExpandedAdsComponent}
          />
        </Card>
      </Section>
      <Section md={2} gutter={2}>
        <KpiCard title="Leads Totais" value={numFmt(totalLeads)} />
        <KpiCard title="Vendas Totais" value={numFmt(totalSales)} />
        <KpiCard
          title="Valor investido"
          value={formatCurrencyBRL(totalSpent)}
        />
        <KpiCard title="Receita" value={formatCurrencyBRL(totalRevenue)} />
      </Section>
    </>
  );
}

export default MetaAds;
