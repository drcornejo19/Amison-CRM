import Link from "next/link";
import { DataTable } from "@/components/crm/data-table";
import { PageHeader } from "@/components/crm/page-header";
import { QuoteForm } from "@/components/crm/quote-form";
import { StatCard } from "@/components/crm/stat-card";
import { StatusBadge } from "@/components/crm/status-badge";
import {
  crmClients,
  crmProducts,
  crmQuotes,
} from "@/lib/amison-crm/mock-data";
import { formatCurrency, formatDate } from "@/lib/amison-crm/format";

export default function QuotesPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="CPQ / Cotizaciones"
        title="Cotizacion tecnica adaptada a impresion farmaceutica"
        description="Versionado, aprobacion de descuentos, bloqueo por margen minimo, resumen tecnico-comercial y salida lista para PDF."
      />

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard
          label="Cotizaciones emitidas"
          value={String(crmQuotes.length)}
          detail="Versionadas por oportunidad"
          tone="accent"
        />
        <StatCard
          label="Pendientes de aprobacion"
          value={String(
            crmQuotes.filter((quote) => quote.status === "pendiente de aprobacion").length
          )}
          detail="Margen o monto por encima del umbral"
          tone="warning"
        />
        <StatCard
          label="Aceptadas"
          value={String(crmQuotes.filter((quote) => quote.status === "aceptada").length)}
          detail="Listas para pasar a produccion"
          tone="success"
        />
        <StatCard
          label="Rentabilidad media"
          value="27.6%"
          detail="Calculada sobre cotizaciones activas"
        />
      </section>

      <div id="nueva-cotizacion" className="space-y-5">
        <QuoteForm products={crmProducts} />
      </div>

      <DataTable
        rows={crmQuotes}
        columns={[
          {
            key: "numero",
            header: "Numero / cliente",
            render: (quote) => (
              <div>
                <Link
                  href={`/cotizaciones/${quote.id}`}
                  className="font-semibold text-[color:var(--crm-text)] hover:text-[#9db3ff]"
                >
                  {quote.number}
                </Link>
                <p className="mt-1 text-sm text-[color:var(--crm-text-soft)]">
                  {crmClients.find((client) => client.id === quote.clientId)?.tradeName}
                </p>
              </div>
            ),
          },
          {
            key: "estado",
            header: "Estado",
            render: (quote) => <StatusBadge status={quote.status} />,
          },
          {
            key: "version",
            header: "Version / fecha",
            render: (quote) => (
              <div>
                <p className="font-semibold text-[color:var(--crm-text)]">v{quote.version}</p>
                <p className="mt-1 text-xs text-[color:var(--crm-text-soft)]">
                  {formatDate(quote.date)}
                </p>
              </div>
            ),
          },
          {
            key: "precio",
            header: "Precio final",
            render: (quote) => (
              <div>
                <p className="font-semibold text-[color:var(--crm-text)]">
                  {formatCurrency(quote.finalPrice, quote.currency)}
                </p>
                <p className="mt-1 text-xs text-[color:var(--crm-text-soft)]">
                  Margen {quote.estimatedProfitability.toFixed(1)}%
                </p>
              </div>
            ),
          },
          {
            key: "pdf",
            header: "Salida",
            render: (quote) => (
              <Link
                href={`/cotizaciones/${quote.id}/pdf`}
                className="rounded-2xl border border-[#274dff]/20 bg-[#274dff]/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#a7bcff]"
              >
                Ver PDF
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}
