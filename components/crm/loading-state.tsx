export function LoadingState({ label }: { label: string }) {
  return (
    <div className="rounded-[28px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6">
      <div className="h-3 w-28 animate-pulse rounded-full bg-white/10" />
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="h-24 animate-pulse rounded-[22px] bg-white/8" />
        <div className="h-24 animate-pulse rounded-[22px] bg-white/8" />
        <div className="h-24 animate-pulse rounded-[22px] bg-white/8" />
      </div>
      <p className="mt-4 text-sm text-[color:var(--crm-text-soft)]">{label}</p>
    </div>
  );
}
