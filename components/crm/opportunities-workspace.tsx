"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/crm/data-table";
import { PriorityBadge } from "@/components/crm/priority-badge";
import { StatusBadge } from "@/components/crm/status-badge";
import {
  crmClients,
  crmProducts,
  crmUsers,
  getStage,
} from "@/lib/amison-crm/mock-data";
import { formatCurrency, formatDate } from "@/lib/amison-crm/format";
import type { Opportunity, PipelineStage } from "@/lib/amison-crm/types";

export function OpportunitiesWorkspace({
  initialOpportunities,
  stages,
}: {
  initialOpportunities: Opportunity[];
  stages: PipelineStage[];
}) {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [form, setForm] = useState({
    name: "",
    clientId: crmClients[0]?.id ?? "",
    productId: crmProducts[0]?.id ?? "",
    value: 145000,
    ownerId: "usr-sofia",
    stageId: stages[0]?.id ?? "",
  });

  const criticalCount = useMemo(
    () => opportunities.filter((item) => item.priority === "critica").length,
    [opportunities]
  );

  return (
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <section
        id="nueva-oportunidad"
        className="rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6 shadow-[0_22px_70px_rgba(3,10,24,0.18)]"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7b95f2]">
          Alta de oportunidad
        </p>
        <p className="mt-3 text-sm leading-7 text-[color:var(--crm-text-soft)]">
          El pipeline abierto hoy concentra {criticalCount} oportunidades criticas y
          pedidos con aprobacion interna pendiente.
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setOpportunities((current) => [
              {
                id: `opp-${current.length + 1}`,
                name: form.name,
                clientId: form.clientId,
                contactId: `ctc-${form.clientId}-1`,
                productId: form.productId,
                workType: "Nueva cuenta",
                estimatedQuantity: 28000,
                estimatedValue: form.value,
                currency: "USD",
                estimatedMargin: 29,
                closeProbability: stages.find((stage) => stage.id === form.stageId)?.probability ?? 15,
                estimatedCloseDate: new Date("2026-08-18").toISOString(),
                requiredDeliveryDate: new Date("2026-09-12").toISOString(),
                ownerId: form.ownerId,
                stageId: form.stageId,
                priority: form.value > 300000 ? "critica" : form.value > 180000 ? "alta" : "media",
                competitor: "Proveedor incumbente",
                nextAction: "Solicitar especificaciones y packshot de referencia.",
                notes: "Oportunidad creada desde la mesa comercial del CRM.",
                technicalFiles: ["brief-comercial.pdf"],
                internalApprovalStatus: form.value > 250000 ? "pendiente" : "aprobada",
                risk: form.value > 300000 ? "alto" : "moderado",
                stagnantDays: 0,
              },
              ...current,
            ]);
            setForm((current) => ({ ...current, name: "", value: 145000 }));
          }}
          className="mt-5 space-y-4"
        >
          <InputField
            label="Nombre de oportunidad"
            value={form.name}
            onChange={(value) => setForm((current) => ({ ...current, name: value }))}
          />
          <FieldSelect
            label="Cliente"
            value={form.clientId}
            options={crmClients.map((client) => [client.id, client.tradeName])}
            onChange={(value) => setForm((current) => ({ ...current, clientId: value }))}
          />
          <FieldSelect
            label="Producto"
            value={form.productId}
            options={crmProducts.map((product) => [product.id, product.name])}
            onChange={(value) => setForm((current) => ({ ...current, productId: value }))}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <FieldSelect
              label="Etapa"
              value={form.stageId}
              options={stages.map((stage) => [stage.id, stage.name])}
              onChange={(value) => setForm((current) => ({ ...current, stageId: value }))}
            />
            <FieldSelect
              label="Responsable"
              value={form.ownerId}
              options={crmUsers
                .filter((user) => user.role === "SALES_EXECUTIVE" || user.role === "SALES_MANAGER")
                .map((user) => [user.id, user.name])}
              onChange={(value) => setForm((current) => ({ ...current, ownerId: value }))}
            />
          </div>
          <label>
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--crm-text-muted)]">
              Valor estimado
            </span>
            <input
              type="number"
              value={form.value}
              onChange={(event) =>
                setForm((current) => ({ ...current, value: Number(event.target.value) }))
              }
              className="crm-field"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-[#274dff] px-4 py-3 text-sm font-semibold text-white"
          >
            Crear oportunidad
          </button>
        </form>
      </section>

      <DataTable
        rows={opportunities}
        columns={[
          {
            key: "oportunidad",
            header: "Oportunidad",
            render: (opportunity) => (
              <div>
                <p className="font-semibold text-[color:var(--crm-text)]">
                  {opportunity.name}
                </p>
                <p className="mt-1 text-sm text-[color:var(--crm-text-soft)]">
                  {crmClients.find((client) => client.id === opportunity.clientId)?.tradeName}
                </p>
              </div>
            ),
          },
          {
            key: "etapa",
            header: "Etapa",
            render: (opportunity) => (
              <div className="space-y-2">
                <StatusBadge status={getStage(opportunity.stageId).name} />
                <PriorityBadge priority={opportunity.priority} />
              </div>
            ),
          },
          {
            key: "valor",
            header: "Valor / cierre",
            render: (opportunity) => (
              <div>
                <p className="font-semibold text-[color:var(--crm-text)]">
                  {formatCurrency(opportunity.estimatedValue, opportunity.currency)}
                </p>
                <p className="mt-1 text-xs text-[color:var(--crm-text-soft)]">
                  Cierre {formatDate(opportunity.estimatedCloseDate)}
                </p>
              </div>
            ),
          },
          {
            key: "owner",
            header: "Responsable",
            render: (opportunity) => (
              <div className="space-y-2">
                <p className="text-sm text-[color:var(--crm-text)]">
                  {crmUsers.find((user) => user.id === opportunity.ownerId)?.name}
                </p>
                <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--crm-text-muted)]">
                  {opportunity.closeProbability}% prob.
                </p>
              </div>
            ),
          },
          {
            key: "acciones",
            header: "Flujo",
            render: () => (
              <Link
                href="/cotizaciones"
                className="rounded-2xl border border-[#274dff]/20 bg-[#274dff]/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#a7bcff]"
              >
                Convertir a cotizacion
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--crm-text-muted)]">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="crm-field"
      />
    </label>
  );
}

function FieldSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<[string, string]>;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--crm-text-muted)]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="crm-field"
      >
        {options.map(([option, labelValue]) => (
          <option key={option} value={option}>
            {labelValue}
          </option>
        ))}
      </select>
    </label>
  );
}
