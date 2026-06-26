import type { ReactNode } from "react";

import { cn } from "@/lib/amison-crm/format";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => ReactNode;
};

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
}: {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey?: (row: T, rowIndex: number) => string | number;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] shadow-[0_22px_70px_rgba(3,10,24,0.18)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)]/90">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--crm-text-muted)]",
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              const rowKey = getRowKey?.(row, rowIndex) ?? rowIndex;

              return (
              <tr
                key={rowKey}
                className={cn(
                  "border-b border-[color:var(--crm-border)]/80 align-top",
                  rowIndex === rows.length - 1 && "border-b-0"
                )}
              >
                {columns.map((column) => (
                  <td
                    key={`${rowKey}-${column.key}`}
                    className={cn(
                      "px-4 py-4 text-sm text-[color:var(--crm-text-soft)]",
                      column.className
                    )}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
