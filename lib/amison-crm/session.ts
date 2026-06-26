import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { crmUsers } from "@/lib/amison-crm/mock-data";

export const CRM_SESSION_COOKIE = "amison_crm_session";

type SessionPayload = {
  userId: string;
  theme?: "dark" | "light";
};

export async function getCrmSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(CRM_SESSION_COOKIE)?.value;

  if (!raw) return null;

  try {
    const payload = JSON.parse(raw) as SessionPayload;
    const user = crmUsers.find((item) => item.id === payload.userId);

    if (!user) return null;

    return {
      user,
      theme: payload.theme ?? "dark",
    };
  } catch {
    return null;
  }
}

export async function requireCrmSession() {
  const session = await getCrmSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function setCrmSession(userId: string, theme: "dark" | "light" = "dark") {
  const cookieStore = await cookies();
  cookieStore.set(
    CRM_SESSION_COOKIE,
    JSON.stringify({
      userId,
      theme,
    }),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 10,
    }
  );
}

export async function clearCrmSession() {
  const cookieStore = await cookies();
  cookieStore.delete(CRM_SESSION_COOKIE);
}
