"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { formatCurrency, formatPercent } from "@/lib/amison-crm/format";
import type { Product } from "@/lib/amison-crm/types";

export function QuoteForm({ products }: { products: Product[] }) {
  const [selectedId, setSelectedId] = useState(products[0]?.id ?? "");
  const [quantity, setQuantity] = useState(25000);
  const [margin, setMargin] = useState(28);
  const [currency, setCurrency] = useState<"USD" | "ARS">("USD");

  const product = useMemo(
    () => products.find((item) => item.id === selectedId) ?? products[0],
    [products, selectedId]
  );

  const estimatedCost = useMemo(
    () => Number(((product?.baseCost ?? 0.1) * quantity).toFixed(2)),
    [product, quantity]
  );
  const total = useMemo(
    () => Number((estimatedCost * (1 + margin / 100)).toFixed(2)),
    [estimatedCost, margin]
  );

  if (!product) return null;

  return (
    <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6 shadow-[0_22px_70px_rgba(3,10,24,0.18)]">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Producto">
            <select
              value={selectedId}
              onChange={(event) => setSelectedId(event.target.value)}
              className="crm-field"
            >
              {products.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Moneda">
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value as "USD" | "ARS")}
              className="crm-field"
            >
              <option value="USD">USD</option>
              <option value="ARS">ARS</option>
            </select>
          </Field>
          <Field label="Cantidad">
            <input
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              className="crm-field"
            />
          </Field>
          <Field label="Margen aplicado">
            <input
              type="range"
              min={18}
              max={42}
              value={margin}
              onChange={(event) => setMargin(Number(event.target.value))}
              className="w-full accent-[#274dff]"
            />
            <div className="mt-2 flex justify-between text-xs text-[color:var(--crm-text-muted)]">
              <span>Min 18%</span>
              <span>{formatPercent(margin)}</span>
              <span>Max 42%</span>
            </div>
          </Field>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <Spec title="Materiales posibles" values={product.possibleMaterials} />
          <Spec title="Terminaciones" values={product.possibleFinishes} />
          <Spec title="Requisitos tecnicos" values={product.technicalRequirements} />
          <Spec title="Campos para cotizar" values={product.quoteFields} />
        </div>
      </div>

      <aside className="rounded-[30px] border border-[color:var(--crm-border)] bg-[linear-gradient(160deg,var(--crm-surface),rgba(39,77,255,0.08))] p-6 shadow-[0_22px_70px_rgba(3,10,24,0.18)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7b95f2]">
          CPQ tecnico
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--crm-text)]">
          {product.name}
        </h3>
        <p className="mt-3 text-sm leading-7 text-[color:var(--crm-text-soft)]">
          {product.description}
        </p>

        <div className="mt-6 space-y-3 rounded-[24px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)] p-4">
          <SummaryRow label="Costo estimado" value={formatCurrency(estimatedCost, currency)} />
          <SummaryRow
            label="Margen sugerido"
            value={formatPercent(product.suggestedMargin)}
          />
          <SummaryRow label="Margen aplicado" value={formatPercent(margin)} />
          <SummaryRow label="Precio final" value={formatCurrency(total, currency)} />
        </div>

        <div className="mt-5 rounded-[24px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)] p-4 text-sm leading-7 text-[color:var(--crm-text-soft)]">
          <p className="font-semibold text-[color:var(--crm-text)]">
            Estado de aprobacion interna
          </p>
          <p className="mt-2">
            {margin < 24
              ? "Envio bloqueado hasta aprobacion gerencial por margen debajo del minimo."
              : "Margen dentro del umbral comercial. Lista para versionar y emitir PDF."}
          </p>
        </div>
      </aside>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--crm-text-muted)]">
        {label}
      </span>
      {children}
    </label>
  );
}

function Spec({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-[22px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)] p-4">
      <p className="text-sm font-semibold text-[color:var(--crm-text)]">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-[color:var(--crm-text-soft)]">
        {values.map((value) => (
          <li key={value}>- {value}</li>
        ))}
      </ul>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-[color:var(--crm-text-soft)]">{label}</span>
      <span className="font-mono text-[color:var(--crm-text)]">{value}</span>
    </div>
  );
}
