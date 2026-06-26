export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(
  value: number,
  currency: "ARS" | "USD" = "USD"
) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "ARS" ? 0 : 2,
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatPercent(value: number) {
  return `${value.toFixed(0)}%`;
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("es-AR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function toneFromRisk(risk: string) {
  if (risk === "critico") return "text-rose-200 bg-rose-500/15 border-rose-400/30";
  if (risk === "alto") return "text-amber-200 bg-amber-500/15 border-amber-400/30";
  if (risk === "moderado") return "text-sky-200 bg-sky-500/15 border-sky-400/30";
  return "text-emerald-200 bg-emerald-500/15 border-emerald-400/30";
}
