"use client";

import { UploadCloud } from "lucide-react";
import { useState } from "react";

type UploadedFile = {
  id: string;
  name: string;
  size: string;
};

export function DocumentUploader() {
  const [uploaded, setUploaded] = useState<UploadedFile[]>([]);

  return (
    <div className="rounded-[28px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-6 shadow-[0_20px_60px_rgba(3,10,24,0.15)]">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-[color:var(--crm-border-strong)] bg-[color:var(--crm-surface-2)] px-6 py-10 text-center">
        <UploadCloud className="text-[#8db2ff]" size={28} />
        <p className="mt-4 text-lg font-semibold text-[color:var(--crm-text)]">
          Subir documentos relacionados
        </p>
        <p className="mt-2 max-w-lg text-sm leading-7 text-[color:var(--crm-text-soft)]">
          Cotizaciones, artes, fichas tecnicas, certificados y ordenes de compra
          pueden quedar trazados contra cliente, oportunidad o cotizacion.
        </p>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            setUploaded((current) => [
              ...files.map((file) => ({
                id: `${file.name}-${file.lastModified}`,
                name: file.name,
                size: `${(file.size / 1024).toFixed(1)} KB`,
              })),
              ...current,
            ]);
          }}
        />
      </label>
      <div className="mt-5 space-y-2">
        {uploaded.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between rounded-2xl border border-[color:var(--crm-border)] bg-[color:var(--crm-surface-2)] px-4 py-3 text-sm"
          >
            <span className="text-[color:var(--crm-text)]">{file.name}</span>
            <span className="font-mono text-[color:var(--crm-text-muted)]">{file.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
