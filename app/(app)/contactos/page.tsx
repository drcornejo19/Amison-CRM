import { DataTable } from "@/components/crm/data-table";
import { PageHeader } from "@/components/crm/page-header";
import { crmClients, crmContacts } from "@/lib/amison-crm/mock-data";

export default function ContactsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Contactos"
        title="Mapa de decisores e influenciadores"
        description="Compras, calidad, produccion, desarrollo, direccion y administracion vinculados a cada cuenta."
      />

      <DataTable
        rows={crmContacts}
        columns={[
          {
            key: "contacto",
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
            key: "empresa",
            header: "Empresa / area",
            render: (contact) => (
              <div>
                <p className="text-sm text-[color:var(--crm-text)]">
                  {crmClients.find((client) => client.id === contact.clientId)?.tradeName}
                </p>
                <p className="mt-1 text-xs text-[color:var(--crm-text-soft)]">
                  {contact.area} · {contact.influence}
                </p>
              </div>
            ),
          },
          {
            key: "medios",
            header: "Medios",
            render: (contact) => (
              <div className="text-sm text-[color:var(--crm-text-soft)]">
                {contact.email}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
