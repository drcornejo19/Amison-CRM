import { PageHeader } from "@/components/crm/page-header";
import { crmTasks } from "@/lib/amison-crm/mock-data";
import { formatDate } from "@/lib/amison-crm/format";

const weekDays = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

export default function CalendarPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Calendario"
        title="Reuniones, llamadas, vencimientos y entregas"
        description="Lectura mensual y semanal de la operacion comercial con foco en seguimientos y cierres."
      />

      <section className="rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-5 shadow-[0_22px_70px_rgba(3,10,24,0.18)]">
        <div className="grid grid-cols-7 gap-3">
          {weekDays.map((day) => (
            <div
              key={day}
              className="rounded-2xl border border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)] px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--crm-text-muted)]"
            >
              {day}
            </div>
          ))}
          {Array.from({ length: 28 }).map((_, index) => {
            const task = crmTasks[index % crmTasks.length];
            return (
              <div
                key={index}
                className="min-h-32 rounded-[24px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)] p-3"
              >
                <p className="text-sm font-semibold text-[color:var(--crm-text)]">
                  {index + 1}
                </p>
                <p className="mt-3 text-xs leading-6 text-[color:var(--crm-text-soft)]">
                  {task.title}
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-[#8fb1ff]">
                  {formatDate(task.dueDate)}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
