import { DataTable } from "@/components/crm/data-table";
import { ForecastChart } from "@/components/crm/forecast-chart";
import { PageHeader } from "@/components/crm/page-header";
import { StatCard } from "@/components/crm/stat-card";
import {
  crmForecastScenarios,
  getLossReasons,
  getPipelineSummary,
  getSellerRanking,
} from "@/lib/amison-crm/mock-data";
import { formatCurrency, formatPercent } from "@/lib/amison-crm/format";

export default function ReportsPage() {
  const ranking = getSellerRanking();
  const pipelineSummary = getPipelineSummary();
  const lossReasons = getLossReasons();

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Reportes"
        title="Ventas, performance y forecast exportables"
        description="Superficie comercial para direccion y gerencia con consolidado mensual, conversion, motivos de perdida, margen estimado y actividad por vendedor."
        actions={
          <>
            <ExportButton label="Excel" />
            <ExportButton label="CSV" />
            <ExportButton label="PDF" />
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Forecast trimestral" value={formatCurrency(3432000)} detail="Realista consolidado" tone="accent" />
        <StatCard label="Conversion global" value={formatPercent(61)} detail="Leads a oportunidades calificadas" tone="success" />
        <StatCard label="Margen estimado" value={formatPercent(27.6)} detail="Sobre pipeline activo" tone="warning" />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <ForecastChart scenarios={crmForecastScenarios} />
        <DataTable
          rows={pipelineSummary}
          columns={[
            {
              key: "etapa",
              header: "Pipeline por etapa",
              render: (entry) => entry.stage.name,
            },
            {
              key: "cantidad",
              header: "Cantidad",
              render: (entry) => String(entry.count),
            },
            {
              key: "valor",
              header: "Valor",
              render: (entry) => formatCurrency(entry.value),
            },
          ]}
        />
      </section>

      <DataTable
        rows={ranking}
        columns={[
          {
            key: "vendedor",
            header: "Vendedor",
            render: (entry) => entry.user.name,
          },
          {
            key: "pipeline",
            header: "Pipeline",
            render: (entry) => formatCurrency(entry.pipelineValue),
          },
          {
            key: "conversion",
            header: "Conversion",
            render: (entry) => formatPercent(entry.conversion),
          },
        ]}
      />

      <DataTable
        rows={lossReasons}
        columns={[
          {
            key: "reason",
            header: "Motivo de perdida",
            render: (item) => item.reason,
          },
          {
            key: "value",
            header: "Casos",
            render: (item) => String(item.value),
          },
        ]}
      />
    </div>
  );
}

function ExportButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="rounded-2xl border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] px-4 py-2.5 text-sm font-medium text-[color:var(--crm-text)]"
    >
      Exportar {label}
    </button>
  );
}
