import { PageHeader } from "@/components/crm/page-header";
import { TaskCard } from "@/components/crm/task-card";
import { crmTasks } from "@/lib/amison-crm/mock-data";

export default function TasksPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Tareas"
        title="Agenda operativa del equipo comercial"
        description="Pendientes, vencidas y en proceso, asociadas a lead, cliente, oportunidad o cotizacion."
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {crmTasks.slice(0, 9).map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>
    </div>
  );
}
