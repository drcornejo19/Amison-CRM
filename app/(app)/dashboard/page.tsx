import Link from "next/link";
import type { ReactNode } from "react";
import { DataTable } from "@/components/crm/data-table";
import { ForecastChart } from "@/components/crm/forecast-chart";
import { PageHeader } from "@/components/crm/page-header";
import { StatCard } from "@/components/crm/stat-card";
import {
  crmForecastScenarios,
  getActivityBySeller,
  getClientById,
  getCriticalOpportunities,
  getDashboardMetrics,
  getLossReasons,
  getOwner,
  getPipelineSummary,
  getProductById,
  getProductDemand,
  getSalesByMonth,
  getSellerRanking,
  getStage,
} from "@/lib/amison-crm/mock-data";
import {
  formatCompactNumber,
  formatCurrency,
  formatPercent,
} from "@/lib/amison-crm/format";
import { PriorityBadge } from "@/components/crm/priority-badge";
import { StatusBadge } from "@/components/crm/status-badge";

export default function DashboardPage() {
  const metrics = getDashboardMetrics();
  const pipelineSummary = getPipelineSummary();
  const salesByMonth = getSalesByMonth();
  const productDemand = getProductDemand();
  const lossReasons = getLossReasons();
  const sellerRanking = getSellerRanking();
  const criticalOpportunities = getCriticalOpportunities();
  const activityBySeller = getActivityBySeller();

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Dashboard ejecutivo"
        title="Visibilidad total del proceso comercial de AMISON"
        description="KPIs, funnel, pipeline, forecast y cartera critica en una superficie disenada para ventas industriales, trazabilidad y aprobaciones internas."
        actions={
          <>
            <Link
              href="/pipeline"
              className="rounded-2xl border border-[#274dff]/20 bg-[#274dff]/10 px-4 py-2.5 text-sm font-medium text-[#aac0ff]"
            >
              Abrir pipeline
            </Link>
            <Link
              href="/reportes"
              className="rounded-2xl border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] px-4 py-2.5 text-sm font-medium text-[color:var(--crm-text)]"
            >
              Ver reportes
            </Link>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Ventas estimadas del mes"
          value={formatCurrency(metrics.estimatedMonthSales)}
          detail="Monto proyectado en negociacion activa"
          tone="accent"
        />
        <StatCard
          label="Ventas cerradas"
          value={formatCurrency(metrics.closedSales)}
          detail="Oportunidades ya adjudicadas"
          tone="success"
        />
        <StatCard
          label="Pipeline total"
          value={formatCurrency(metrics.totalPipeline)}
          detail={`${metrics.openOpportunities} oportunidades abiertas`}
        />
        <StatCard
          label="Forecast mensual"
          value={formatCurrency(metrics.monthlyForecast)}
          detail="Ponderado por etapa y probabilidad"
          tone="warning"
        />
        <StatCard
          label="Cotizaciones emitidas"
          value={String(metrics.quotesIssued)}
          detail={`${metrics.quotesPending} pendientes de respuesta`}
        />
        <StatCard
          label="Tasa de conversion"
          value={formatPercent(metrics.conversionRate)}
          detail="Ganadas vs. emitidas"
        />
        <StatCard
          label="Ticket promedio"
          value={formatCurrency(metrics.averageTicket)}
          detail="Sobre oportunidades ganadas"
        />
        <StatCard
          label="Margen estimado"
          value={formatPercent(metrics.estimatedMargin)}
          detail={`${metrics.overdueTasks} tareas vencidas`}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <ChartPanel
          title="Funnel de ventas"
          subtitle="Cantidad estimada por etapa"
          content={
            <div className="space-y-3">
              {pipelineSummary.slice(0, 6).map((entry) => (
                <div key={entry.stage.id}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-[color:var(--crm-text)]">{entry.stage.name}</span>
                    <span className="font-mono text-[color:var(--crm-text-soft)]">
                      {entry.count}
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-white/6">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.max(10, entry.count * 14)}%`,
                        backgroundColor: entry.stage.tone,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          }
        />

        <ChartPanel
          title="Ventas por mes"
          subtitle="Evolucion comercial"
          content={<BarSeries values={salesByMonth.map((item) => ({ label: item.month, value: item.value }))} />}
        />

        <ChartPanel
          title="Oportunidades por producto"
          subtitle="Mix comercial del trimestre"
          content={<BarSeries values={productDemand.map((item) => ({ label: item.product, value: item.opportunities }))} />}
        />

        <ChartPanel
          title="Cotizaciones ganadas vs perdidas"
          subtitle="Balance del embudo"
          content={
            <SplitBars
              first={{ label: "Ganadas", value: metrics.quotesWon }}
              second={{ label: "Perdidas", value: metrics.quotesLost }}
            />
          }
        />

        <ChartPanel
          title="Motivos de perdida"
          subtitle="Patrones para ajustar estrategia"
          content={<BarSeries values={lossReasons.map((item) => ({ label: item.reason, value: item.value }))} />}
        />

        <ForecastChart scenarios={crmForecastScenarios} />

        <ChartPanel
          title="Ranking de vendedores"
          subtitle="Pipeline y conversion"
          content={
            <div className="space-y-3">
              {sellerRanking.map((entry) => (
                <div
                  key={entry.user.id}
                  className="rounded-[20px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-[color:var(--crm-text)]">
                      {entry.user.name}
                    </p>
                    <span className="text-xs text-[color:var(--crm-text-muted)]">
                      {formatPercent(entry.conversion)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[color:var(--crm-text-soft)]">
                    {formatCurrency(entry.pipelineValue)} de pipeline - {entry.activeOpps} cuentas activas
                  </p>
                </div>
              ))}
            </div>
          }
        />

        <ChartPanel
          title="Actividad por vendedor"
          subtitle="Capilaridad del seguimiento"
          content={<BarSeries values={activityBySeller.map((item) => ({ label: item.seller, value: item.activities }))} />}
        />
      </section>

      <DataTable
        rows={criticalOpportunities}
        columns={[
          {
            key: "cliente",
            header: "Cliente / producto",
            render: (opportunity) => (
              <div>
                <p className="font-semibold text-[color:var(--crm-text)]">
                  {getClientById(opportunity.clientId)?.tradeName}
                </p>
                <p className="mt-1 text-sm text-[color:var(--crm-text-soft)]">
                  {getProductById(opportunity.productId)?.name}
                </p>
              </div>
            ),
          },
          {
            key: "valor",
            header: "Valor / etapa",
            render: (opportunity) => (
              <div>
                <p className="font-semibold text-[color:var(--crm-text)]">
                  {formatCurrency(opportunity.estimatedValue, opportunity.currency)}
                </p>
                <div className="mt-2">
                  <StatusBadge status={getStage(opportunity.stageId).name} />
                </div>
              </div>
            ),
          },
          {
            key: "prob",
            header: "Probabilidad / riesgo",
            render: (opportunity) => (
              <div className="space-y-2">
                <p className="text-sm text-[color:var(--crm-text)]">
                  {formatPercent(opportunity.closeProbability)}
                </p>
                <PriorityBadge priority={opportunity.priority} />
              </div>
            ),
          },
          {
            key: "accion",
            header: "Proxima accion",
            render: (opportunity) => (
              <div>
                <p className="text-sm text-[color:var(--crm-text-soft)]">
                  {opportunity.nextAction}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[color:var(--crm-text-muted)]">
                  Responsable: {getOwner(opportunity.ownerId).name}
                </p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

function ChartPanel({
  title,
  subtitle,
  content,
}: {
  title: string;
  subtitle: string;
  content: ReactNode;
}) {
  return (
    <section className="rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-5 shadow-[0_22px_70px_rgba(3,10,24,0.18)]">
      <h2 className="text-lg font-semibold text-[color:var(--crm-text)]">{title}</h2>
      <p className="mt-1 text-sm text-[color:var(--crm-text-soft)]">{subtitle}</p>
      <div className="mt-5">{content}</div>
    </section>
  );
}

function BarSeries({
  values,
}: {
  values: Array<{ label: string; value: number }>;
}) {
  const max = Math.max(...values.map((item) => item.value));
  return (
    <div className="space-y-3">
      {values.map((item) => (
        <div key={item.label}>
          <div className="mb-2 flex items-center justify-between gap-3 text-sm">
            <span className="text-[color:var(--crm-text)]">{item.label}</span>
            <span className="font-mono text-[color:var(--crm-text-soft)]">
              {formatCompactNumber(item.value)}
            </span>
          </div>
          <div className="h-3 rounded-full bg-white/6">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#274dff,#65a8ff)]"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function SplitBars({
  first,
  second,
}: {
  first: { label: string; value: number };
  second: { label: string; value: number };
}) {
  const total = first.value + second.value || 1;
  return (
    <div>
      <div className="flex h-5 overflow-hidden rounded-full bg-white/6">
        <div
          className="bg-emerald-500"
          style={{ width: `${(first.value / total) * 100}%` }}
        />
        <div
          className="bg-rose-500"
          style={{ width: `${(second.value / total) * 100}%` }}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-[18px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)] p-3">
          <p className="text-[color:var(--crm-text)]">{first.label}</p>
          <p className="mt-2 font-mono text-[#a5c8b1]">{first.value}</p>
        </div>
        <div className="rounded-[18px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)] p-3">
          <p className="text-[color:var(--crm-text)]">{second.label}</p>
          <p className="mt-2 font-mono text-[#f0b0b6]">{second.value}</p>
        </div>
      </div>
    </div>
  );
}
