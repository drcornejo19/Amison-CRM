import { formatDateTime } from "@/lib/amison-crm/format";
import type { Activity } from "@/lib/amison-crm/types";

export function ActivityTimeline({ items }: { items: Activity[] }) {
  return (
    <div className="rounded-[28px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6 shadow-[0_20px_60px_rgba(3,10,24,0.16)]">
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id} className="relative pl-8">
            {index < items.length - 1 ? (
              <span className="absolute left-[11px] top-7 h-[calc(100%+16px)] w-px bg-[color:var(--crm-border-strong)]" />
            ) : null}
            <span className="absolute left-0 top-1.5 h-[22px] w-[22px] rounded-full border border-[#274dff]/30 bg-[#274dff]/18 shadow-[0_0_18px_rgba(39,77,255,0.35)]" />
            <div className="rounded-[22px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[color:var(--crm-text)]">
                  {item.title}
                </p>
                <span className="text-[11px] uppercase tracking-[0.14em] text-[color:var(--crm-text-muted)]">
                  {formatDateTime(item.happenedAt)}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[color:var(--crm-text-soft)]">
                {item.outcome}
              </p>
              {item.nextAction ? (
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-[#89a4ff]">
                  Proxima accion: {item.nextAction}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
