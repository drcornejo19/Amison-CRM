import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ActivityTimeline } from "@/components/crm/activity-timeline";
import { ClientSummaryCard } from "@/components/crm/client-summary-card";
import { DataTable } from "@/components/crm/data-table";
import { PageHeader } from "@/components/crm/page-header";
import {
  getClientById,
  getClientContacts,
  getClientExecutiveSummary,
  getClientOpportunities,
  getClientQuotes,
  getEntityActivities,
  getOwner,
  getProductById,
  getStage,
} from "@/lib/amison-crm/mock-data";
import { formatCurrency } from "@/lib/amison-crm/format";
import { StatusBadge } from "@/components/crm/status-badge";

export default async function ClientDetailPage(
  props: {
    params: Promise<{
      clientId: string;
    }>;
  }
) {
  const { clientId } = await props.params;
  const client = getClientById(clientId);

  if (!client) {
    notFound();
  }

  const contacts = getClientContacts(client.id);
  const opportunities = getClientOpportunities(client.id);
  const quotes = getClientQuotes(client.id);
  const activities = getEntityActivities("opportunity", opportunities[0]?.id ?? "").slice(0, 6);
  const totalQuoted = quotes.reduce((total, quote) => total + quote.finalPrice, 0);
  const totalWon = quotes
    .filter((quote) => quote.status === "aceptada")
    .reduce((total, quote) => total + quote.finalPrice, 0);

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Cliente 360"
        title={client.legalName}
        description={`Ejecutivo asignado: ${getOwner(client.executiveId).name} - Proxima accion: ${client.nextAction}`}
      />

      <ClientSummaryCard
        client={client}
        totalQuoted={totalQuoted}
        totalWon={totalWon}
        opportunityCount={opportunities.length}
        aiSummary={getClientExecutiveSummary(client.id)}
      />

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <TabsSection
            title="Contactos"
            description="Decisores y referentes tecnicos asociados al cliente."
          >
            <DataTable
              rows={contacts}
              columns={[
                {
                  key: "nombre",
                  header: "Contacto",
                  render: (contact) => (
                    <div>
                      <p className="font-semibold text-[color:var(--crm-text)]">
                        {contact.firstName} {contact.lastName}
                      </p>
                      <p className="mt-1 text-sm text-[color:var(--crm-text-soft)]">
                        {contact.role}
                      </p>
                    </div>
                  ),
                },
                {
                  key: "area",
                  header: "Area",
                  render: (contact) => (
                    <div>
                      <p className="text-sm text-[color:var(--crm-text)]">{contact.area}</p>
                      <p className="mt-1 text-xs text-[color:var(--crm-text-soft)]">
                        {contact.influence}
                      </p>
                    </div>
                  ),
                },
                {
                  key: "correo",
                  header: "Contacto",
                  render: (contact) => (
                    <div className="text-sm text-[color:var(--crm-text-soft)]">
                      {contact.email}
                    </div>
                  ),
                },
              ]}
            />
          </TabsSection>

          <TabsSection
            title="Oportunidades"
            description="Pipeline y foco comercial asociado al cliente."
          >
            <DataTable
              rows={opportunities}
              columns={[
                {
                  key: "nombre",
                  header: "Oportunidad",
                  render: (opportunity) => (
                    <div>
                      <p className="font-semibold text-[color:var(--crm-text)]">
                        {opportunity.name}
                      </p>
                      <p className="mt-1 text-sm text-[color:var(--crm-text-soft)]">
                        {getProductById(opportunity.productId)?.name}
                      </p>
                    </div>
                  ),
                },
                {
                  key: "etapa",
                  header: "Etapa",
                  render: (opportunity) => (
                    <StatusBadge status={getStage(opportunity.stageId).name} />
                  ),
                },
                {
                  key: "valor",
                  header: "Valor",
                  render: (opportunity) =>
                    formatCurrency(opportunity.estimatedValue, opportunity.currency),
                },
              ]}
            />
          </TabsSection>
        </div>

        <div className="space-y-5">
          <TabsSection
            title="Cotizaciones"
            description="Historico comercial y versionado."
          >
            <DataTable
              rows={quotes}
              columns={[
                {
                  key: "numero",
                  header: "Numero",
                  render: (quote) => quote.number,
                },
                {
                  key: "estado",
                  header: "Estado",
                  render: (quote) => <StatusBadge status={quote.status} />,
                },
                {
                  key: "total",
                  header: "Total",
                  render: (quote) => formatCurrency(quote.finalPrice, quote.currency),
                },
              ]}
            />
          </TabsSection>

          <TabsSection
            title="Actividades"
            description="Timeline cronologico y resumen operativo."
          >
            <ActivityTimeline items={activities} />
          </TabsSection>
        </div>
      </section>
    </div>
  );
}

function TabsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-5 shadow-[0_22px_70px_rgba(3,10,24,0.18)]">
      <h2 className="text-lg font-semibold text-[color:var(--crm-text)]">{title}</h2>
      <p className="mt-1 text-sm text-[color:var(--crm-text-soft)]">{description}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}
