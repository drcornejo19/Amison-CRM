import { DataTable } from "@/components/crm/data-table";
import { DocumentUploader } from "@/components/crm/document-uploader";
import { PageHeader } from "@/components/crm/page-header";
import { crmClients, crmDocuments } from "@/lib/amison-crm/mock-data";

export default function DocumentsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Documentos"
        title="Repositorio documental con trazabilidad"
        description="Cotizaciones PDF, artes, planos, fichas tecnicas, certificados, ordenes de compra y documentos de calidad asociados a cliente, oportunidad y cotizacion."
      />

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <DocumentUploader />
        <DataTable
          rows={crmDocuments}
          columns={[
            {
              key: "nombre",
              header: "Documento",
              render: (document) => (
                <div>
                  <p className="font-semibold text-[color:var(--crm-text)]">{document.name}</p>
                  <p className="mt-1 text-sm text-[color:var(--crm-text-soft)]">
                    {document.type}
                  </p>
                </div>
              ),
            },
            {
              key: "cliente",
              header: "Cliente / version",
              render: (document) => (
                <div>
                  <p className="text-sm text-[color:var(--crm-text)]">
                    {crmClients.find((client) => client.id === document.clientId)?.tradeName}
                  </p>
                  <p className="mt-1 text-xs text-[color:var(--crm-text-soft)]">
                    {document.version}
                  </p>
                </div>
              ),
            },
            {
              key: "permiso",
              header: "Permisos",
              render: (document) => document.permissions,
            },
          ]}
        />
      </section>
    </div>
  );
}
