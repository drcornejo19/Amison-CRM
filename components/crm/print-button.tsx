"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-2xl bg-[#274dff] px-4 py-2.5 text-sm font-semibold text-white"
    >
      Imprimir / guardar PDF
    </button>
  );
}
