import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { LoginForm } from "@/components/crm/login-form";
import { crmLoginAction } from "@/app/actions";
import { crmUsers, demoPassword } from "@/lib/amison-crm/mock-data";
import { getCrmSession } from "@/lib/amison-crm/session";

export default async function CrmLoginPage() {
  const session = await getCrmSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#1c2d4d_0%,#0a111b_34%,#060a11_70%,#02050b_100%)] px-4 py-10 text-white">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[40px] border border-white/8 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10">
          <div className="rounded-[28px] border border-white/8 bg-black/18 p-5 sm:p-7">
            <BrandLogo variant="horizontal" priority className="h-20 w-auto" />
          </div>

          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#7f97ff]">
            CRM Comercial AMISON S.A.
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
            Gestion comercial, cotizaciones y seguimiento B2B
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#b9c7d7]">
            Plataforma pensada para laboratorios, licitaciones tecnicas,
            trazabilidad documental, aprobaciones internas y ventas industriales de
            alto valor.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Feature
              title="Pipeline complejo"
              description="Etapas adaptadas a relevamiento, muestras, arte y calidad."
            />
            <Feature
              title="CPQ tecnico"
              description="Matriz comercial con margen, trazabilidad y bloqueos de aprobacion."
            />
            <Feature
              title="IA comercial"
              description="Scoring, next best action, forecast y alertas sobre cartera."
            />
          </div>

          <div className="mt-8 rounded-[26px] border border-[#274dff]/18 bg-[#274dff]/10 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9bb2ff]">
              Acceso demo
            </p>
            <p className="mt-3 text-sm leading-7 text-[#d3ddf2]">
              Password comun de demostracion:{" "}
              <span className="font-mono">{demoPassword}</span>
            </p>
          </div>
        </section>

        <LoginForm action={crmLoginAction} demoUsers={crmUsers} />
      </div>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[26px] border border-white/8 bg-white/[0.04] p-5">
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-7 text-[#adc0d8]">{description}</p>
    </div>
  );
}
