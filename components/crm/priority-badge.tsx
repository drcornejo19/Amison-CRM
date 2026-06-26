import { cn } from "@/lib/amison-crm/format";

const priorityStyles: Record<string, string> = {
  baja: "border-zinc-500/30 bg-zinc-500/12 text-zinc-300",
  media: "border-sky-400/30 bg-sky-500/12 text-sky-100",
  alta: "border-amber-400/30 bg-amber-500/12 text-amber-100",
  critica: "border-rose-400/30 bg-rose-500/12 text-rose-100",
};

export function PriorityBadge({
  priority,
  className,
}: {
  priority: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
        priorityStyles[priority] ??
          "border-[color:var(--crm-border-strong)] bg-[color:var(--crm-surface-2)] text-[color:var(--crm-text-muted)]",
        className
      )}
    >
      {priority}
    </span>
  );
}
