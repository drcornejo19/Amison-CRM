import { cn } from "@/lib/amison-crm/format";

const statusStyles: Record<string, string> = {
  nuevo: "border-sky-400/30 bg-sky-500/12 text-sky-100",
  contactado: "border-cyan-400/30 bg-cyan-500/12 text-cyan-100",
  calificado: "border-emerald-400/30 bg-emerald-500/12 text-emerald-100",
  convertido: "border-emerald-400/30 bg-emerald-500/12 text-emerald-100",
  "no calificado": "border-zinc-500/30 bg-zinc-500/12 text-zinc-300",
  prospecto: "border-sky-400/30 bg-sky-500/12 text-sky-100",
  activo: "border-emerald-400/30 bg-emerald-500/12 text-emerald-100",
  inactivo: "border-amber-400/30 bg-amber-500/12 text-amber-100",
  perdido: "border-rose-400/30 bg-rose-500/12 text-rose-100",
  borrador: "border-zinc-500/30 bg-zinc-500/12 text-zinc-300",
  "pendiente de aprobacion":
    "border-amber-400/30 bg-amber-500/12 text-amber-100",
  aprobada: "border-sky-400/30 bg-sky-500/12 text-sky-100",
  enviada: "border-cyan-400/30 bg-cyan-500/12 text-cyan-100",
  aceptada: "border-emerald-400/30 bg-emerald-500/12 text-emerald-100",
  rechazada: "border-rose-400/30 bg-rose-500/12 text-rose-100",
  vencida: "border-rose-400/30 bg-rose-500/12 text-rose-100",
  pendiente: "border-amber-400/30 bg-amber-500/12 text-amber-100",
  "en proceso": "border-cyan-400/30 bg-cyan-500/12 text-cyan-100",
  completada: "border-emerald-400/30 bg-emerald-500/12 text-emerald-100",
  aprobada_internal: "border-emerald-400/30 bg-emerald-500/12 text-emerald-100",
  rechazada_internal: "border-rose-400/30 bg-rose-500/12 text-rose-100",
  pausada: "border-zinc-500/30 bg-zinc-500/12 text-zinc-300",
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
        statusStyles[status] ??
          "border-[color:var(--crm-border-strong)] bg-[color:var(--crm-surface-2)] text-[color:var(--crm-text-muted)]",
        className
      )}
    >
      {status}
    </span>
  );
}
