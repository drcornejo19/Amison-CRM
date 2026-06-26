import type { ReactNode } from "react";
import { CrmAppShell } from "@/components/crm/app-shell";
import {
  crmNotifications,
  getSearchItems,
} from "@/lib/amison-crm/mock-data";
import { requireCrmSession } from "@/lib/amison-crm/session";

export default async function CrmProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireCrmSession();

  return (
    <CrmAppShell
      user={session.user}
      notifications={crmNotifications.length}
      searchItems={getSearchItems()}
      initialTheme={session.theme}
    >
      {children}
    </CrmAppShell>
  );
}
