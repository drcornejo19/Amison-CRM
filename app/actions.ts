"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { demoPassword, getCrmUserByEmail } from "@/lib/amison-crm/mock-data";
import { clearCrmSession, setCrmSession } from "@/lib/amison-crm/session";

const loginSchema = z.object({
  email: z.string().email("Ingresa un email valido."),
  password: z
    .string()
    .min(8, "La contrasena debe tener al menos 8 caracteres."),
});

export type LoginFormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export async function crmLoginAction(
  _state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const user = getCrmUserByEmail(parsed.data.email);

  if (!user || parsed.data.password !== demoPassword) {
    return {
      message:
        "No encontramos ese acceso demo. Usa uno de los perfiles sugeridos o la clave de prueba provista.",
    };
  }

  await setCrmSession(user.id);
  redirect("/dashboard");
}

export async function crmLogoutAction() {
  await clearCrmSession();
  redirect("/login");
}
