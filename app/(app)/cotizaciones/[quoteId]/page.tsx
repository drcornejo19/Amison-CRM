import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/crm/page-header";
import { StatusBadge } from "@/components/crm/status-badge";
import {
  getClientById,
  getContactById,
  getOpportunityById,
  getQuoteById,
} from "@/lib/amison-crm/mock-data";
import { formatCurrency, formatDate } from "@/lib/amison-crm/format";

export default async function QuoteDetailPage(
  props: {
    params: Promise<{
      quoteId: string;
    }>;
  }
) {
  const { quoteId } = await props.params;
  const quote = getQuoteById(quoteId);

  if (!quote) {
    notFound();
  }

  const client = getClientById(quote.clientId);
  const contact = getContactById(quote.contactId);
  const opportunity = getOpportunityById(quote.opportunityId);

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Detalle de cotizacion"
        title={quote.number}
        description={`${client?.tradeName ?? "Cliente"} - ${opportunity?.name ?? "Oportunidad"} - Validez ${formatDate(quote.validUntil)}`}
        actions={
          <Link
            href={`/cotizaciones/${quote.id}/pdf`}
            className="rounded-2xl bg-[#274dff] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Abrir PDF
          </Link>
        }
      />

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <article className="rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6 shadow-[0_22px_70px_rgba(3,10,24,0.18)]">
          <div className="flex items-center gap-3">
            <StatusBadge status={quote.status} />
            <p className="text-sm text-[color:var(--crm-text-soft)]">Version {quote.version}</p>
          </div>
          <div className="mt-5 space-y-3 text-sm text-[color:var(--crm-text-soft)]">
            <p>Cliente: {client?.legalName}</p>
            <p>Contacto: {contact?.firstName} {contact?.lastName}</p>
            <p>Condicion de pago: {quote.paymentTerms}</p>
            <p>Plazo de entrega: {quote.deliveryLeadTime}</p>
          </div>
        </article>

        <article className="rounded-[30px] border border-[color:var(--crm-border)] bg-[linear-gradient(160deg,var(--crm-surface),rgba(39,77,255,0.08))] p-6 shadow-[0_22px_70px_rgba(3,10,24,0.18)]">
          <h2 className="text-xl font-semibold text-[color:var(--crm-text)]">
            Resumen economico
          </h2>
          <div className="mt-5 space-y-3 text-sm">
            <SummaryRow label="Costo estimado" value={formatCurrency(quote.totalCost, quote.currency)} />
            <SummaryRow label="Descuento" value={`${quote.discount}%`} />
            <SummaryRow label="Precio final" value={formatCurrency(quote.finalPrice, quote.currency)} />
            <SummaryRow label="Rentabilidad" value={`${quote.estimatedProfitability}%`} />
          </div>
        </article>
      </section>

      <section className="rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6 shadow-[0_22px_70px_rgba(3,10,24,0.18)]">
        <h2 className="text-xl font-semibold text-[color:var(--crm-text)]">Especificacion tecnica</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {quote.items.map((item) => (
            <article
              key={item.id}
              className="rounded-[24px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)] p-5"
            >
              <p className="font-semibold text-[color:var(--crm-text)]">{item.productName}</p>
              <div className="mt-3 space-y-2 text-sm text-[color:var(--crm-text-soft)]">
                <p>Cantidad: {item.quantity}</p>
                <p>Medidas: {item.measures}</p>
                <p>Material: {item.material}</p>
                <p>Gramaje: {item.grammage}</p>
                <p>Trazabilidad: {item.traceability}</p>
                <p>Observaciones: {item.technicalNotes}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[color:var(--crm-text-soft)]">{label}</span>
      <span className="font-mono text-[color:var(--crm-text)]">{value}</span>
    </div>
  );
}
