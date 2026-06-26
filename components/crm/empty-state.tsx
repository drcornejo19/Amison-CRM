import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-[28px] border border-dashed border-[color:var(--crm-border-strong)] bg-[color:var(--crm-surface)]/55 p-10 text-center">
      <h3 className="text-xl font-semibold tracking-[-0.03em] text-[color:var(--crm-text)]">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[color:var(--crm-text-soft)]">
        {description}
      </p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
