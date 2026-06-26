import { formatCompactNumber } from "@/lib/amison-crm/format";
import type { ForecastScenario } from "@/lib/amison-crm/types";

export function ForecastChart({ scenarios }: { scenarios: ForecastScenario[] }) {
  const max = Math.max(...scenarios.map((scenario) => scenario.value));

  return (
    <div className="rounded-[28px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6 shadow-[0_20px_60px_rgba(3,10,24,0.16)]">
      <div className="space-y-5">
        {scenarios.map((scenario, index) => (
          <div key={scenario.label}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[color:var(--crm-text)]">
                  {scenario.label}
                </p>
                <p className="text-xs text-[color:var(--crm-text-soft)]">
                  {scenario.description}
                </p>
              </div>
              <span className="font-mono text-sm text-[#9cb7ff]">
                {formatCompactNumber(scenario.value)}
              </span>
            </div>
            <div className="h-3 rounded-full bg-white/6">
              <div
                className={`h-full rounded-full ${
                  index === 0
                    ? "bg-[#274dff]"
                    : index === 1
                      ? "bg-[#5c89ff]"
                      : "bg-[#89a7ff]"
                }`}
                style={{
                  width: `${(scenario.value / max) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
