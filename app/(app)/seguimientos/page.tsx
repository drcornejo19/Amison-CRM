import { ActivityTimeline } from "@/components/crm/activity-timeline";
import { PageHeader } from "@/components/crm/page-header";
import { crmActivities, crmAiInsights } from "@/lib/amison-crm/mock-data";

export default function FollowUpsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Seguimientos"
        title="Timeline comercial, resultados y proximas acciones"
        description="Llamadas, emails, reuniones, notas internas, aprobaciones y eventos relevantes en una linea de tiempo preparada para ventas consultivas."
      />

      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <ActivityTimeline items={crmActivities.slice(0, 10)} />
        <div className="space-y-5">
          <InsightCard
            title="Resumen IA del historial"
            body={
              crmAiInsights.find((item) => item.type === "executive-summary")?.content ??
              ""
            }
          />
          <InsightCard
            title="Mensaje sugerido"
            body={
              crmAiInsights.find((item) => item.type === "email")?.content ?? ""
            }
          />
          <InsightCard
            title="Next best action"
            body={
              crmAiInsights.find((item) => item.type === "next-best-action")?.content ??
              ""
            }
          />
        </div>
      </section>
    </div>
  );
}

function InsightCard({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6 shadow-[0_22px_70px_rgba(3,10,24,0.18)]">
      <h2 className="text-lg font-semibold text-[color:var(--crm-text)]">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[color:var(--crm-text-soft)]">{body}</p>
    </section>
  );
}
