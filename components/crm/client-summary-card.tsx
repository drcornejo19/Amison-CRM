import { formatCurrency, formatPercent } from "@/lib/amison-crm/format";
import type { Client } from "@/lib/amison-crm/types";

export function ClientSummaryCard({
  client,
  totalQuoted,
  totalWon,
  opportunityCount,
  aiSummary,
}: {
  client: Client;
  totalQuoted: number;
  totalWon: number;
  opportunityCount: number;
  aiSummary: string;
}) {
  return (
    <section className="rounded-[30px] border border-[color:var(--crm-border)] bg-[linear-gradient(160deg,var(--crm-surface),rgba(39,77,255,0.08))] p-6 shadow-[0_22px_70px_rgba(3,10,24,0.2)]">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7b95f2]">
            Resumen 360
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--crm-text)]">
            {client.tradeName}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--crm-text-soft)]">
            {aiSummary}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <MetricBox label="Total cotizado" value={formatCurrency(totalQuoted)} />
          <MetricBox label="Total ganado" value={formatCurrency(totalWon)} />
          <MetricBox label="Oportunidades" value={String(opportunityCount)} />
          <MetricBox
            label="Prob. recompra"
            value={formatPercent(client.repurchaseProbability)}
          />
        </div>
      </div>
    </section>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--crm-text-muted)]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--crm-text)]">
        {value}
      </p>
    </div>
  );
}
