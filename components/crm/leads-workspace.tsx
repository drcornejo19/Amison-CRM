"use client";

import { useMemo, useState } from "react";
import { ConfirmDialog } from "@/components/crm/confirm-dialog";
import { DataTable } from "@/components/crm/data-table";
import { FilterBar } from "@/components/crm/filter-bar";
import { PriorityBadge } from "@/components/crm/priority-badge";
import { StatusBadge } from "@/components/crm/status-badge";
import { crmUsers } from "@/lib/amison-crm/mock-data";
import { formatDate } from "@/lib/amison-crm/format";
import type { Lead } from "@/lib/amison-crm/types";

export function LeadsWorkspace({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [form, setForm] = useState({
    company: "",
    contactName: "",
    interestProduct: "Estuches plegadizos",
    source: "web",
    status: "nuevo",
    ownerId: "usr-sofia",
  });
  const [filters, setFilters] = useState({
    status: "todos",
    source: "todos",
  });

  const visibleLeads = useMemo(
    () =>
      leads.filter(
        (lead) =>
          !lead.isDeleted &&
          (filters.status === "todos" || lead.status === filters.status) &&
          (filters.source === "todos" || lead.source === filters.source)
      ),
    [filters.source, filters.status, leads]
  );

  return (
    <div className="space-y-5">
      <FilterBar
        title="Embudo de captacion"
        options={[
          { label: "Todos", active: filters.status === "todos" },
          { label: "Nuevos", active: filters.status === "nuevo" },
          { label: "Calificados", active: filters.status === "calificado" },
          { label: "Convertidos", active: filters.status === "convertido" },
          { label: "Web", active: filters.source === "web" },
          { label: "Referidos", active: filters.source === "referido" },
        ]}
        actions={
          <>
            <SelectAction
              value={filters.status}
              onChange={(value) => setFilters((current) => ({ ...current, status: value }))}
              options={["todos", "nuevo", "contactado", "calificado", "convertido"]}
            />
            <SelectAction
              value={filters.source}
              onChange={(value) => setFilters((current) => ({ ...current, source: value }))}
              options={["todos", "web", "referido", "linkedin", "email", "evento"]}
            />
          </>
        }
      />

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setLeads((current) => [
              {
                id: `led-${current.length + 1}`,
                company: form.company,
                cuit: `30-7199${String(current.length + 10).padStart(4, "0")}-1`,
                industry: "Laboratorio farmacéutico",
                clientType: "laboratorio",
                contactName: form.contactName,
                contactRole: "Compras",
                email: `${form.company.toLowerCase().replace(/[^a-z]/g, "")}@demo.com`,
                phone: "+54 11 5555-1200",
                whatsapp: "+54 9 11 5555-1200",
                website: "https://nuevo-lead.demo",
                source: form.source as Lead["source"],
                interestProduct: form.interestProduct as Lead["interestProduct"],
                estimatedVolume: "3 lotes mensuales",
                urgency: "media",
                score: 72,
                status: form.status as Lead["status"],
                ownerId: form.ownerId,
                nextContactAt: new Date().toISOString(),
                notes:
                  "Lead generado desde el formulario demo del CRM. Preparado para flujo de conversion.",
              },
              ...current,
            ]);
            setForm({
              company: "",
              contactName: "",
              interestProduct: "Estuches plegadizos",
              source: "web",
              status: "nuevo",
              ownerId: "usr-sofia",
            });
          }}
          className="rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6 shadow-[0_22px_70px_rgba(3,10,24,0.18)]"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7b95f2]">
            Alta de lead
          </p>
          <div className="mt-5 grid gap-4">
            <Field
              label="Empresa"
              value={form.company}
              onChange={(value) => setForm((current) => ({ ...current, company: value }))}
            />
            <Field
              label="Contacto"
              value={form.contactName}
              onChange={(value) =>
                setForm((current) => ({ ...current, contactName: value }))
              }
            />
            <FieldSelect
              label="Producto de interes"
              value={form.interestProduct}
              options={[
                "Estuches plegadizos",
                "Prospectos medicos",
                "Etiquetas autoadhesivas",
                "Exhibidores",
                "Desarrollo especial",
              ]}
              onChange={(value) =>
                setForm((current) => ({ ...current, interestProduct: value }))
              }
            />
            <FieldSelect
              label="Origen"
              value={form.source}
              options={["web", "referido", "linkedin", "email", "llamada", "evento"]}
              onChange={(value) => setForm((current) => ({ ...current, source: value }))}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FieldSelect
                label="Estado"
                value={form.status}
                options={["nuevo", "contactado", "calificado"]}
                onChange={(value) => setForm((current) => ({ ...current, status: value }))}
              />
              <FieldSelect
                label="Responsable"
                value={form.ownerId}
                options={crmUsers
                  .filter((user) => user.role.includes("SALES") || user.role === "DIRECTOR")
                  .map((user) => user.id)}
                labels={Object.fromEntries(crmUsers.map((user) => [user.id, user.name]))}
                onChange={(value) => setForm((current) => ({ ...current, ownerId: value }))}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-[#274dff] px-4 py-3 text-sm font-semibold text-white"
          >
            Crear lead
          </button>
        </form>

        <DataTable
          rows={visibleLeads}
          columns={[
            {
              key: "empresa",
              header: "Empresa / contacto",
              render: (lead) => (
                <div>
                  <p className="font-semibold text-[color:var(--crm-text)]">{lead.company}</p>
                  <p className="mt-1 text-sm text-[color:var(--crm-text-soft)]">
                    {lead.contactName}
                  </p>
                </div>
              ),
            },
            {
              key: "origen",
              header: "Origen",
              render: (lead) => (
                <div className="space-y-2">
                  <StatusBadge status={lead.status} />
                  <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--crm-text-muted)]">
                    {lead.source}
                  </p>
                </div>
              ),
            },
            {
              key: "producto",
              header: "Interes",
              render: (lead) => (
                <div>
                  <p className="font-medium text-[color:var(--crm-text)]">
                    {lead.interestProduct}
                  </p>
                  <p className="mt-1 text-xs text-[color:var(--crm-text-soft)]">
                    Proximo contacto {formatDate(lead.nextContactAt)}
                  </p>
                </div>
              ),
            },
            {
              key: "score",
              header: "Score",
              render: (lead) => <PriorityBadge priority={lead.urgency} className="capitalize" />,
            },
            {
              key: "acciones",
              header: "Acciones",
              render: (lead) => (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setLeads((current) =>
                        current.map((item) =>
                          item.id === lead.id ? { ...item, status: "convertido" } : item
                        )
                      )
                    }
                    className="rounded-2xl border border-[#274dff]/20 bg-[#274dff]/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#9ab1ff]"
                  >
                    Convertir
                  </button>
                  <ConfirmDialog
                    triggerLabel="Soft delete"
                    title="Eliminar lead"
                    description="El lead no se borra físicamente: queda marcado como eliminado para auditoría y trazabilidad."
                    confirmLabel="Marcar como eliminado"
                    tone="danger"
                    onConfirm={() =>
                      setLeads((current) =>
                        current.map((item) =>
                          item.id === lead.id ? { ...item, isDeleted: true } : item
                        )
                      )
                    }
                  />
                </div>
              ),
            },
          ]}
        />
      </section>
    </div>
  );
}

function Field({
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
  labels,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  labels?: Record<string, string>;
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
        {options.map((option) => (
          <option key={option} value={option}>
            {labels?.[option] ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}

function SelectAction({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-2xl border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] px-3 py-2 text-sm text-[color:var(--crm-text)]"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
