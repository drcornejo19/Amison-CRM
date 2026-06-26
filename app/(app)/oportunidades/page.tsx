import { OpportunitiesWorkspace } from "@/components/crm/opportunities-workspace";
import { PageHeader } from "@/components/crm/page-header";
import { StatCard } from "@/components/crm/stat-card";
import {
  crmOpportunities,
  crmPipelineStages,
} from "@/lib/amison-crm/mock-data";
import { formatCompactNumber } from "@/lib/amison-crm/format";

export default function OpportunitiesPage() {
  const totalValue = crmOpportunities.reduce(
    (total, opportunity) => total + opportunity.estimatedValue,
    0
  );

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Oportunidades"
        title="Ventas tecnicas B2B en una sola mesa"
        description="Oportunidades comerciales con contexto industrial, cantidades, margen, calidad, aprobaciones y proximas acciones para ventas complejas."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Oportunidades abiertas"
          value={String(crmOpportunities.length)}
          detail="Con historial de cambios y responsable"
          tone="accent"
        />
        <StatCard
          label="Valor del pipeline"
          value={formatCompactNumber(totalValue)}
          detail="Monto bruto estimado"
          tone="success"
        />
        <StatCard
          label="Negocios criticos"
          value={String(
            crmOpportunities.filter((opportunity) => opportunity.priority === "critica")
              .length
          )}
          detail="Requieren seguimiento o aprobacion"
          tone="warning"
        />
      </section>

      <OpportunitiesWorkspace
        initialOpportunities={crmOpportunities}
        stages={crmPipelineStages}
      />
    </div>
  );
}
