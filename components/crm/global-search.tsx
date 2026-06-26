"use client";

import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { useDeferredValue, useEffect, useEffectEvent, useMemo, useState } from "react";
import type { SearchItem } from "@/lib/amison-crm/types";

export function GlobalSearch({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    if (!deferredQuery.trim()) return items.slice(0, 8);

    const normalized = deferredQuery.toLowerCase();
    return items
      .filter((item) =>
        `${item.label} ${item.description} ${item.kind}`
          .toLowerCase()
          .includes(normalized)
      )
      .slice(0, 10);
  }, [deferredQuery, items]);

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      setOpen((current) => !current);
    }

    if (event.key === "Escape") {
      setOpen(false);
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex min-w-[260px] items-center gap-3 rounded-2xl border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] px-4 py-3 text-left shadow-[0_16px_40px_rgba(3,10,24,0.12)] transition hover:border-[#274dff]/35"
      >
        <Search size={17} className="text-[color:var(--crm-text-muted)]" />
        <span className="text-sm text-[color:var(--crm-text-soft)]">
          Buscar clientes, cotizaciones, oportunidades...
        </span>
        <span className="ml-auto rounded-lg border border-[color:var(--crm-border)] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[color:var(--crm-text-muted)]">
          Ctrl + K
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-start justify-center bg-[#02050e]/72 px-4 py-16 backdrop-blur-md">
          <div className="w-full max-w-3xl rounded-[30px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
            <div className="flex items-center gap-3 border-b border-[color:var(--crm-border)] px-5 py-4">
              <Search size={18} className="text-[color:var(--crm-text-muted)]" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nombre de cliente, numero de cotizacion o modulo..."
                className="w-full border-0 bg-transparent text-base text-[color:var(--crm-text)] outline-none placeholder:text-[color:var(--crm-text-muted)]"
              />
            </div>
            <div className="p-3">
              <div className="max-h-[60vh] overflow-y-auto">
                {results.length > 0 ? (
                  <div className="space-y-2">
                    {results.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-start justify-between rounded-[22px] border border-transparent bg-[color:var(--crm-surface-2)] px-4 py-3 transition hover:border-[#274dff]/25 hover:bg-[#274dff]/10"
                      >
                        <div>
                          <p className="text-sm font-semibold text-[color:var(--crm-text)]">
                            {item.label}
                          </p>
                          <p className="mt-1 text-sm text-[color:var(--crm-text-soft)]">
                            {item.description}
                          </p>
                        </div>
                        <span className="rounded-full border border-[#274dff]/20 bg-[#274dff]/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[#8fb1ff]">
                          {item.kind}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[24px] border border-dashed border-[color:var(--crm-border-strong)] bg-[color:var(--crm-surface-2)] p-8 text-center">
                    <Sparkles className="mx-auto text-[#8fb1ff]" size={24} />
                    <p className="mt-3 text-sm text-[color:var(--crm-text-soft)]">
                      No encontré resultados con ese criterio. Probá con cliente, producto
                      o número de cotización.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
