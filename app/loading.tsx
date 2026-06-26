import { LoadingState } from "@/components/crm/loading-state";

export default function Loading() {
  return (
    <div className="px-4 py-6 md:px-6 lg:px-8">
      <LoadingState label="Preparando superficie comercial de AMISON..." />
    </div>
  );
}
