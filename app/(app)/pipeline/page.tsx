import { PageHeader } from "@/components/crm/page-header";
import { PipelineKanban } from "@/components/crm/pipeline-kanban";
import {
  crmOpportunities,
  crmPipelineStages,
} from "@/lib/amison-crm/mock-data";

export default function PipelinePage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Pipeline"
        title="Kanban premium para ventas complejas"
        description="Arrastrá oportunidades entre etapas, detectá negocios estancados, asigná tareas o dispará una cotizacion tecnica sin perder el contexto comercial."
      />
      <PipelineKanban
        initialOpportunities={crmOpportunities}
        stages={crmPipelineStages.slice(0, 8)}
      />
    </div>
  );
}
