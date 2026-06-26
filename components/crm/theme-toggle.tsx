"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "amison-crm-theme";

export function ThemeToggle({
  initialTheme = "dark",
}: {
  initialTheme?: "dark" | "light";
}) {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") {
      return initialTheme;
    }

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === "dark" || storedTheme === "light"
      ? storedTheme
      : initialTheme;
  });

  useEffect(() => {
    document.body.dataset.amisonTheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] text-[color:var(--crm-text)] shadow-[0_16px_40px_rgba(3,10,24,0.12)] transition hover:border-[#274dff]/35 hover:text-[#8db2ff]"
      aria-label="Cambiar modo de color"
    >
      {theme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
    </button>
  );
}
