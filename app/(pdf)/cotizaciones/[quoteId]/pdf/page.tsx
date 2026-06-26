import { notFound } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { PrintButton } from "@/components/crm/print-button";
import {
  getClientById,
  getContactById,
  getQuoteById,
} from "@/lib/amison-crm/mock-data";
import { formatCurrency, formatDate } from "@/lib/amison-crm/format";

export default async function QuotePdfPage(
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

  return (
    <main className="min-h-screen bg-[#eef2f7] px-4 py-8 print:bg-white print:px-0">
      <div className="mx-auto max-w-5xl rounded-[30px] bg-white p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] print:rounded-none print:shadow-none">
        <div className="mb-6 flex items-start justify-between gap-4 print:hidden">
          <div>
            <p className="text-sm text-slate-500">Vista de impresion lista para PDF</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">{quote.number}</h1>
          </div>
          <PrintButton />
        </div>

        <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
          <BrandLogo variant="light" priority className="h-20 w-auto" />
          <div className="text-right text-sm text-slate-600">
            <p>AMISON S.A.</p>
            <p>Soluciones graficas para industria farmaceutica</p>
            <p>Argentina - Trazabilidad - Calidad - Produccion</p>
          </div>
        </div>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <InfoBox
            title="Cliente"
            lines={[
              client?.legalName ?? "Cliente",
              client?.address ?? "",
              `Contacto: ${contact?.firstName ?? ""} ${contact?.lastName ?? ""}`,
            ]}
          />
          <InfoBox
            title="Cotizacion"
            lines={[
              `Numero: ${quote.number}`,
              `Fecha: ${formatDate(quote.date)}`,
              `Validez: ${formatDate(quote.validUntil)}`,
            ]}
          />
        </section>

        <section className="mt-8 overflow-hidden rounded-[22px] border border-slate-200">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left">Producto</th>
                <th className="px-4 py-3 text-left">Especificaciones</th>
                <th className="px-4 py-3 text-left">Precio</th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((item) => (
                <tr key={item.id} className="border-t border-slate-200">
                  <td className="px-4 py-4 font-medium text-slate-900">{item.productName}</td>
                  <td className="px-4 py-4 text-slate-600">
                    {item.quantity} unidades - {item.measures} - {item.material} - {item.traceability}
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-900">
                    {formatCurrency(item.totalPrice, quote.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[22px] border border-slate-200 p-5 text-sm leading-7 text-slate-600">
            <h2 className="text-base font-semibold text-slate-900">Observaciones</h2>
            <p className="mt-3">
              La presente cotizacion contempla aprobacion de arte, control documental,
              trazabilidad por lote, verificaciones de calidad y plazo comercial indicado.
            </p>
            <p className="mt-3">
              Sujeto a confirmacion final de especificaciones tecnicas y aprobaciones internas.
            </p>
          </div>
          <div className="rounded-[22px] border border-slate-200 p-5">
            <h2 className="text-base font-semibold text-slate-900">Resumen comercial</h2>
            <div className="mt-4 space-y-3 text-sm">
              <SummaryRow label="Condicion de pago" value={quote.paymentTerms} />
              <SummaryRow label="Plazo de entrega" value={quote.deliveryLeadTime} />
              <SummaryRow label="Precio final" value={formatCurrency(quote.finalPrice, quote.currency)} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoBox({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-[22px] border border-slate-200 p-5 text-sm text-slate-600">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-1">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  );
}
