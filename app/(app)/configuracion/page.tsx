import { PageHeader } from "@/components/crm/page-header";
import { crmAutomationRules } from "@/lib/amison-crm/mock-data";

export default function SettingsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Configuracion"
        title="Reglas comerciales, umbrales y gobierno operativo"
        description="Parametrizacion de automatizaciones, alertas, politicas de margen, pipeline, notificaciones y seguridad."
      />

      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          {crmAutomationRules.map((rule) => (
            <article
              key={rule.id}
              className="rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6 shadow-[0_22px_70px_rgba(3,10,24,0.18)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b95f2]">
                {rule.trigger}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-[color:var(--crm-text)]">
                {rule.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[color:var(--crm-text-soft)]">
                {rule.description}
              </p>
            </article>
          ))}
        </div>

        <div className="space-y-5">
          <SettingCard
            title="Politica de margen"
            description="Bloqueo automatico si el margen aplicado es menor al minimo comercial para el producto y el volumen."
          />
          <SettingCard
            title="Notificaciones"
            description="Alertas por cotizaciones proximas a vencer, clientes inactivos y oportunidades estancadas."
          />
          <SettingCard
            title="Seguridad"
            description="Separacion por roles, soft delete, auditoria de acciones y datos visibles por perfil."
          />
        </div>
      </section>
    </div>
  );
}

function SettingCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6 shadow-[0_22px_70px_rgba(3,10,24,0.18)]">
      <h2 className="text-xl font-semibold text-[color:var(--crm-text)]">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[color:var(--crm-text-soft)]">
        {description}
      </p>
    </article>
  );
}
