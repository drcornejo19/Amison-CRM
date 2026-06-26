import { formatDate } from "@/lib/amison-crm/format";
import type { Task } from "@/lib/amison-crm/types";
import { PriorityBadge } from "@/components/crm/priority-badge";
import { StatusBadge } from "@/components/crm/status-badge";

export function TaskCard({ task }: { task: Task }) {
  return (
    <article className="rounded-[24px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-4 shadow-[0_16px_44px_rgba(3,10,24,0.16)]">
      <div className="flex flex-wrap items-center gap-2">
        <PriorityBadge priority={task.priority} />
        <StatusBadge status={task.status} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[color:var(--crm-text)]">
        {task.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[color:var(--crm-text-soft)]">
        {task.description}
      </p>
      <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[color:var(--crm-text-muted)]">
        <span>{task.reminder}</span>
        <span>{formatDate(task.dueDate)}</span>
      </div>
    </article>
  );
}
