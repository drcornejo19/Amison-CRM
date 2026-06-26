import { LeadsWorkspace } from "@/components/crm/leads-workspace";
import { PageHeader } from "@/components/crm/page-header";
import { StatCard } from "@/components/crm/stat-card";
import { crmLeads } from "@/lib/amison-crm/mock-data";

export default function LeadsPage() {
  const visibleLeads = crmLeads.filter((lead) => !lead.isDeleted);

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Leads"
        title="Captacion y scoring comercial"
        description="Mesa comercial preparada para detectar duplicados, clasificar por origen, priorizar volumen y convertir leads en cliente mas oportunidad."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Leads nuevos"
          value={String(visibleLeads.filter((lead) => lead.status === "nuevo").length)}
          detail="Ingresados esta semana"
          tone="accent"
        />
        <StatCard
          label="Tasa de calificacion"
          value="63%"
          detail="Sobre el total del funnel"
          tone="success"
        />
        <StatCard
          label="Origen mas rentable"
          value="Referidos"
          detail="Mejor ratio de conversion a oportunidad"
          tone="warning"
        />
      </section>

      <LeadsWorkspace initialLeads={crmLeads} />
    </div>
  );
}
