import { DataTable } from "@/components/crm/data-table";
import { PageHeader } from "@/components/crm/page-header";
import { crmRoles, crmUsers } from "@/lib/amison-crm/mock-data";

export default function UsersPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Usuarios y permisos"
        title="Modelo de acceso por rol y funcion"
        description="Administrador, direccion, gerente comercial, ejecutivos, produccion, calidad, finanzas y atencion al cliente con permisos diferenciados."
      />

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <DataTable
          rows={crmUsers}
          columns={[
            {
              key: "usuario",
              header: "Usuario",
              render: (user) => (
                <div>
                  <p className="font-semibold text-[color:var(--crm-text)]">{user.name}</p>
                  <p className="mt-1 text-sm text-[color:var(--crm-text-soft)]">{user.email}</p>
                </div>
              ),
            },
            {
              key: "rol",
              header: "Rol / territorio",
              render: (user) => (
                <div>
                  <p className="text-sm text-[color:var(--crm-text)]">{user.role}</p>
                  <p className="mt-1 text-xs text-[color:var(--crm-text-soft)]">
                    {user.territory}
                  </p>
                </div>
              ),
            },
          ]}
        />

        <div className="space-y-5">
          {crmRoles.map((role) => (
            <article
              key={role.key}
              className="rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6 shadow-[0_22px_70px_rgba(3,10,24,0.18)]"
            >
              <h2 className="text-xl font-semibold text-[color:var(--crm-text)]">
                {role.label}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[color:var(--crm-text-soft)]">
                {role.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="rounded-full border border-[#274dff]/18 bg-[#274dff]/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-[#a8bcff]"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
