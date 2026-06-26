import { redirect } from "next/navigation";
import { getCrmSession } from "@/lib/amison-crm/session";

export default async function CrmIndexPage() {
  const session = await getCrmSession();
  redirect(session ? "/dashboard" : "/login");
}
