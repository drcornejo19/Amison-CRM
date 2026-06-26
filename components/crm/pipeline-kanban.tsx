"use client";

import { startTransition, useMemo, useState } from "react";
import { formatCompactNumber, formatCurrency, formatPercent, toneFromRisk } from "@/lib/amison-crm/format";
import {
  crmProducts,
  getClientById,
  getOwner,
  getStage,
} from "@/lib/amison-crm/mock-data";
import type { Opportunity, PipelineStage } from "@/lib/amison-crm/types";
import { PriorityBadge } from "@/components/crm/priority-badge";

export function PipelineKanban({
  initialOpportunities,
  stages,
}: {
  initialOpportunities: Opportunity[];
  stages: PipelineStage[];
}) {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const columns = useMemo(
    () =>
      stages.map((stage) => ({
        stage,
        items: opportunities.filter((opportunity) => opportunity.stageId === stage.id),
      })),
    [opportunities, stages]
  );

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[1200px] grid-cols-6 gap-4 xl:grid-cols-7 2xl:grid-cols-8">
        {columns.map(({ stage, items }) => (
          <section
            key={stage.id}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (!draggedId) return;
              startTransition(() => {
                setOpportunities((current) =>
                  current.map((opportunity) =>
                    opportunity.id === draggedId
                      ? {
                          ...opportunity,
                          stageId: stage.id,
                          closeProbability: stage.probability,
                          stagnantDays: 0,
                        }
                      : opportunity
                  )
                );
              });
            }}
            className="rounded-[30px] border border-[color:var(--crm-border)] bg-[linear-gradient(160deg,var(--crm-surface),rgba(255,255,255,0.02))] p-4 shadow-[0_22px_70px_rgba(3,10,24,0.18)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[color:var(--crm-text)]">
                  {stage.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[color:var(--crm-text-muted)]">
                  {items.length} oportunidades · {formatCompactNumber(items.reduce((total, item) => total + item.estimatedValue, 0))}
                </p>
              </div>
              <span
                className="h-3 w-3 rounded-full shadow-[0_0_16px_rgba(39,77,255,0.42)]"
                style={{ backgroundColor: stage.tone }}
              />
            </div>

            <div className="mt-4 space-y-3">
              {items.map((opportunity) => {
                const client = getClientById(opportunity.clientId);
                const owner = getOwner(opportunity.ownerId);
                const product = crmProducts.find((item) => item.id === opportunity.productId);

                return (
                  <article
                    key={opportunity.id}
                    draggable
                    onDragStart={() => setDraggedId(opportunity.id)}
                    onDragEnd={() => setDraggedId(null)}
                    className="cursor-grab rounded-[24px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)] p-4 transition hover:border-[#274dff]/28 hover:shadow-[0_18px_50px_rgba(3,10,24,0.18)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[color:var(--crm-text)]">
                          {client?.tradeName ?? "Cliente"}
                        </p>
                        <p className="mt-1 text-xs text-[color:var(--crm-text-soft)]">
                          {product?.name ?? "Producto"}
                        </p>
                      </div>
                      <PriorityBadge priority={opportunity.priority} />
                    </div>

                    <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-[color:var(--crm-text)]">
                      {formatCurrency(opportunity.estimatedValue, opportunity.currency)}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.14em] text-[color:var(--crm-text-muted)]">
                      <span>{formatPercent(opportunity.closeProbability)}</span>
                      <span>{owner.name}</span>
                      <span>{opportunity.stagnantDays} dias</span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-[color:var(--crm-text-soft)]">
                      {opportunity.nextAction}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] ${toneFromRisk(
                          opportunity.risk
                        )}`}
                      >
                        Riesgo {opportunity.risk}
                      </span>
                      <div className="flex gap-2">
                        <MiniAction label="Tarea" />
                        <MiniAction
                          label={
                            getStage(opportunity.stageId).name === "Cotizacion enviada"
                              ? "Ganada"
                              : "Cotizar"
                          }
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function MiniAction({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="rounded-xl border border-[color:var(--crm-border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[color:var(--crm-text-soft)]"
    >
      {label}
    </button>
  );
}
