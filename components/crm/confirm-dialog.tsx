"use client";

import { useState } from "react";

export function ConfirmDialog({
  triggerLabel,
  title,
  description,
  confirmLabel,
  onConfirm,
  tone = "default",
}: {
  triggerLabel: string;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  tone?: "default" | "danger";
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`rounded-2xl border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
          tone === "danger"
            ? "border-rose-500/25 bg-rose-500/12 text-rose-100"
            : "border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)] text-[color:var(--crm-text)]"
        }`}
      >
        {triggerLabel}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#02050e]/72 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6 shadow-[0_26px_80px_rgba(0,0,0,0.4)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--crm-text-muted)]">
              Confirmacion
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--crm-text)]">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--crm-text-soft)]">
              {description}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-[color:var(--crm-border)] px-4 py-2 text-sm text-[color:var(--crm-text-soft)]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  setOpen(false);
                }}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
                  tone === "danger"
                    ? "bg-rose-500 text-white"
                    : "bg-[#274dff] text-white"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
