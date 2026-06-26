import type { ReactNode } from "react";

type FilterOption = {
  label: string;
  active?: boolean;
};

export function FilterBar({
  title,
  options,
  actions,
}: {
  title: string;
  options: FilterOption[];
  actions?: ReactNode;
}) {
  return (
    <div className="rounded-[26px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-4 shadow-[0_18px_50px_rgba(3,10,24,0.15)]">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--crm-text-muted)]">
            {title}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {options.map((option) => (
              <span
                key={option.label}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                  option.active
                    ? "border-[#274dff]/30 bg-[#274dff]/14 text-[#a9bdff]"
                    : "border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)] text-[color:var(--crm-text-soft)]"
                }`}
              >
                {option.label}
              </span>
            ))}
          </div>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
