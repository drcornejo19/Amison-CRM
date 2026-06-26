import { PageHeader } from "@/components/crm/page-header";
import { crmProducts } from "@/lib/amison-crm/mock-data";

export default function ProductsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Productos"
        title="Catalogo interno de impresion farmaceutica"
        description="Productos y servicios con materiales, terminaciones, requisitos tecnicos, campos variables y margenes sugeridos."
      />
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {crmProducts.map((product) => (
          <article
            key={product.id}
            className="rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6 shadow-[0_22px_70px_rgba(3,10,24,0.18)]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b95f2]">
              {product.category}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--crm-text)]">
              {product.name}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--crm-text-soft)]">
              {product.description}
            </p>
            <div className="mt-5 space-y-3 text-sm text-[color:var(--crm-text-soft)]">
              <p>Materiales: {product.possibleMaterials.join(", ")}</p>
              <p>Terminaciones: {product.possibleFinishes.join(", ")}</p>
              <p>Tiempo estimado: {product.estimatedProductionDays} dias</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
