import { cn } from "@/lib/amison-crm/format";

export function StatCard({
  label,
  value,
  detail,
  tone = "default",
  trend,
}: {
  label: string;
  value: string;
  detail?: string;
  tone?: "default" | "accent" | "success" | "warning";
  trend?: string;
}) {
  const toneStyles = {
    default: "from-white/[0.05] to-white/[0.02]",
    accent: "from-[#274dff]/20 to-[#0b1020]",
    success: "from-emerald-500/18 to-emerald-500/5",
    warning: "from-amber-500/16 to-amber-500/5",
  }[tone];

  return (
    <article
      className={cn(
        "rounded-[28px] border border-[color:var(--crm-border)] bg-[linear-gradient(160deg,var(--crm-surface),var(--crm-surface-2))] p-5 shadow-[0_18px_60px_rgba(3,10,24,0.22)]",
        toneStyles
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--crm-text-muted)]">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--crm-text)]">
        {value}
      </p>
      {detail ? (
        <p className="mt-2 text-sm text-[color:var(--crm-text-soft)]">{detail}</p>
      ) : null}
      {trend ? (
        <p className="mt-4 inline-flex rounded-full border border-[#274dff]/20 bg-[#274dff]/10 px-3 py-1 text-xs font-medium text-[#8db2ff]">
          {trend}
        </p>
      ) : null}
    </article>
  );
}
