import { EmptyState } from "@/components/crm/empty-state";
import { ForecastChart } from "@/components/crm/forecast-chart";
import { PageHeader } from "@/components/crm/page-header";
import {
  crmAiInsights,
  crmForecastScenarios,
} from "@/lib/amison-crm/mock-data";

export default function AiCommercialPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="IA Comercial"
        title="Asistencia comercial preparada para conectar modelos reales"
        description="Scoring de leads, resumen ejecutivo, riesgos de perdida, emails, forecast inteligente, recompra y preguntas tipo chat listas para evolucionar con OpenAI."
      />

      <section className="grid gap-5 lg:grid-cols-2">
        {crmAiInsights.map((insight) => (
          <article
            key={insight.id}
            className="rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6 shadow-[0_22px_70px_rgba(3,10,24,0.18)]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b95f2]">
              {insight.type}
            </p>
            <h2 className="mt-3 text-xl font-semibold text-[color:var(--crm-text)]">
              {insight.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--crm-text-soft)]">
              {insight.content}
            </p>
          </article>
        ))}
      </section>

      <ForecastChart scenarios={crmForecastScenarios} />

      <EmptyState
        title="Chat comercial listo para evolucionar"
        description='La superficie ya contempla consultas del estilo "¿Qué clientes no fueron contactados en 30 días?" y "¿Qué cotizaciones vencen esta semana?". El siguiente paso es conectar un proveedor de IA y una DAL real.'
      />
    </div>
  );
}
