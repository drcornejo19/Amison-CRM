import Link from "next/link";
import { DataTable } from "@/components/crm/data-table";
import { PageHeader } from "@/components/crm/page-header";
import { StatCard } from "@/components/crm/stat-card";
import { StatusBadge } from "@/components/crm/status-badge";
import {
  crmClients,
  getOwner,
} from "@/lib/amison-crm/mock-data";
import { formatPercent } from "@/lib/amison-crm/format";

export default function ClientsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Clientes"
        title="Cartera 360 con foco en laboratorios y trazabilidad"
        description="Ficha unificada de clientes, condiciones comerciales, riesgo, recompra, productos habituales y resumen ejecutivo generado por IA."
      />

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Clientes activos" value="7" detail="Cartera en movimiento" tone="success" />
        <StatCard label="Prospectos" value="2" detail="En onboarding comercial" tone="accent" />
        <StatCard label="Inactivos" value="1" detail="Requieren recuperacion" tone="warning" />
        <StatCard label="Riesgo alto" value="3" detail="Con alerta de churn" />
      </section>

      <DataTable
        rows={crmClients}
        columns={[
          {
            key: "cliente",
            header: "Cliente",
            render: (client) => (
              <div>
                <Link
                  href={`/clientes/${client.id}`}
                  className="font-semibold text-[color:var(--crm-text)] hover:text-[#9db3ff]"
                >
                  {client.tradeName}
                </Link>
                <p className="mt-1 text-sm text-[color:var(--crm-text-soft)]">
                  {client.segment}
                </p>
              </div>
            ),
          },
          {
            key: "estado",
            header: "Estado / prioridad",
            render: (client) => (
              <div className="space-y-2">
                <StatusBadge status={client.status} />
                <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--crm-text-muted)]">
                  Prioridad {client.priorityLevel}
                </p>
              </div>
            ),
          },
          {
            key: "condiciones",
            header: "Condiciones",
            render: (client) => (
              <div>
                <p className="text-sm text-[color:var(--crm-text)]">{client.paymentTerms}</p>
                <p className="mt-1 text-xs text-[color:var(--crm-text-soft)]">
                  Entrega {client.usualLeadTime}
                </p>
              </div>
            ),
          },
          {
            key: "owner",
            header: "Ejecutivo",
            render: (client) => (
              <div>
                <p className="text-sm text-[color:var(--crm-text)]">
                  {getOwner(client.executiveId).name}
                </p>
                <p className="mt-1 text-xs text-[color:var(--crm-text-soft)]">
                  Recompra {formatPercent(client.repurchaseProbability)}
                </p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
