import type { ReactNode } from "react";
import { requireCrmSession } from "@/lib/amison-crm/session";

export default async function CrmPdfLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireCrmSession();
  return children;
}
