"use client";

import { useActionState, useState } from "react";
import type { CrmUser } from "@/lib/amison-crm/types";
import type { LoginFormState } from "@/app/actions";
import { demoPassword } from "@/lib/amison-crm/mock-data";

const initialState: LoginFormState = {};

export function LoginForm({
  action,
  demoUsers,
}: {
  action: (
    state: LoginFormState,
    payload: FormData
  ) => Promise<LoginFormState>;
  demoUsers: CrmUser[];
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [credentials, setCredentials] = useState({
    email: demoUsers[0]?.email ?? "",
    password: demoPassword,
  });

  return (
    <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(165deg,rgba(10,17,29,0.98),rgba(15,26,42,0.96))] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.48)] backdrop-blur-xl">
      <form action={formAction} className="space-y-5">
        <div>
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f85a5]">
            Email corporativo
          </label>
          <input
            name="email"
            type="email"
            value={credentials.email}
            onChange={(event) =>
              setCredentials((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            className="crm-field-dark"
            placeholder="nombre@amison.demo"
          />
          {state.errors?.email ? (
            <p className="mt-2 text-sm text-rose-300">{state.errors.email[0]}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f85a5]">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={(event) =>
              setCredentials((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            className="crm-field-dark"
          />
          {state.errors?.password ? (
            <p className="mt-2 text-sm text-rose-300">{state.errors.password[0]}</p>
          ) : null}
        </div>

        {state.message ? (
          <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {state.message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-2xl bg-[#274dff] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(39,77,255,0.34)] transition hover:bg-[#3960ff] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Ingresando..." : "Ingresar al CRM"}
        </button>
      </form>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f85a5]">
          Accesos demo
        </p>
        <div className="mt-3 space-y-2">
          {demoUsers.slice(0, 4).map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() =>
                setCredentials({
                  email: user.email,
                  password: demoPassword,
                })
              }
              className="flex w-full items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left transition hover:border-[#274dff]/28 hover:bg-[#274dff]/10"
            >
              <div>
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="mt-1 text-xs text-[#a3b6ce]">{user.title}</p>
              </div>
              <span className="rounded-full border border-[#274dff]/20 bg-[#274dff]/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[#9ab1ff]">
                {user.role}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
