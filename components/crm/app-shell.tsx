"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import {
  BadgeDollarSign,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ContactRound,
  FileText,
  FolderKanban,
  History,
  KanbanSquare,
  LayoutGrid,
  ListTodo,
  LogOut,
  Package2,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { crmLogoutAction } from "@/app/actions";
import { BrandLogo } from "@/components/brand-logo";
import { GlobalSearch } from "@/components/crm/global-search";
import { ThemeToggle } from "@/components/crm/theme-toggle";
import { cn } from "@/lib/amison-crm/format";
import { crmNavigation, crmQuickActions } from "@/lib/amison-crm/navigation";
import { crmRoles } from "@/lib/amison-crm/mock-data";
import type { CrmUser, SearchItem } from "@/lib/amison-crm/types";

const iconMap = {
  LayoutGrid,
  Target,
  Building2,
  ContactRound,
  BadgeDollarSign,
  KanbanSquare,
  FileText,
  Package2,
  History,
  ListTodo,
  CalendarDays,
  FolderKanban,
  Sparkles,
  BarChart3,
  Settings2,
  ShieldCheck,
};

export function CrmAppShell({
  user,
  notifications,
  searchItems,
  children,
  initialTheme = "dark",
}: {
  user: CrmUser;
  notifications: number;
  searchItems: SearchItem[];
  children: ReactNode;
  initialTheme?: "dark" | "light";
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const roleLabel = useMemo(
    () => crmRoles.find((role) => role.key === user.role)?.label ?? user.role,
    [user.role]
  );

  return (
    <div className="amison-theme min-h-screen bg-[color:var(--crm-bg)] text-[color:var(--crm-text)]">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden border-r border-[color:var(--crm-border)] bg-[linear-gradient(180deg,#09111c,#0b1320_50%,#0e1828)] px-4 py-5 shadow-[20px_0_50px_rgba(0,0,0,0.2)] lg:block",
          collapsed ? "w-[100px]" : "w-[292px]"
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/dashboard"
            className={cn(
              "overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.03] p-3",
              collapsed ? "mx-auto" : "w-full"
            )}
          >
            <BrandLogo
              variant={collapsed ? "icon" : "horizontal"}
              priority
              className={collapsed ? "h-12 w-12" : "h-14 w-auto"}
            />
          </Link>

          {!collapsed ? (
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] text-[color:var(--crm-text-muted)] transition hover:text-[color:var(--crm-text)]"
            >
              <ChevronLeft size={16} />
            </button>
          ) : null}
        </div>

        {collapsed ? (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="mt-4 flex h-10 w-full items-center justify-center rounded-2xl border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] text-[color:var(--crm-text-muted)] transition hover:text-[color:var(--crm-text)]"
          >
            <ChevronRight size={16} />
          </button>
        ) : null}

        <nav className="mt-6 space-y-1.5">
          {crmNavigation.map((item) => {
            const Icon = iconMap[item.icon];
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-[22px] border px-3 py-3 text-sm font-medium transition",
                  active
                    ? "border-[#274dff]/22 bg-[#274dff]/14 text-[#c6d7ff] shadow-[0_0_24px_rgba(39,77,255,0.14)]"
                    : "border-transparent text-[color:var(--crm-text-soft)] hover:border-[color:var(--crm-border)] hover:bg-white/[0.03] hover:text-[color:var(--crm-text)]",
                  collapsed && "justify-center px-0"
                )}
              >
                <Icon size={18} />
                {!collapsed ? <span>{item.label}</span> : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 rounded-[24px] border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--crm-text-muted)]">
            Rol activo
          </p>
          {!collapsed ? (
            <>
              <p className="mt-2 text-sm font-semibold text-[color:var(--crm-text)]">
                {roleLabel}
              </p>
              <p className="mt-1 text-xs text-[color:var(--crm-text-soft)]">
                {user.title}
              </p>
            </>
          ) : (
            <p className="mt-2 text-center text-xs text-[color:var(--crm-text-soft)]">
              {user.role}
            </p>
          )}
        </div>
      </aside>

      <div className={cn("min-h-screen", collapsed ? "lg:pl-[100px]" : "lg:pl-[292px]")}>
        <header className="sticky top-0 z-30 border-b border-[color:var(--crm-border)] bg-[color:var(--crm-bg)]/88 px-4 py-4 backdrop-blur-xl md:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <GlobalSearch items={searchItems} />
                <div className="flex flex-wrap gap-2">
                  {crmQuickActions.map((action) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="rounded-2xl border border-[#274dff]/20 bg-[#274dff]/10 px-3 py-2 text-sm font-medium text-[#aac0ff] transition hover:bg-[#274dff]/16"
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <ThemeToggle initialTheme={initialTheme} />
                <div className="inline-flex h-11 items-center gap-2 rounded-2xl border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] px-4 text-sm text-[color:var(--crm-text-soft)]">
                  <Bell size={16} />
                  <span>{notifications} alertas</span>
                </div>
                <div className="rounded-2xl border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] px-4 py-2">
                  <p className="text-sm font-semibold text-[color:var(--crm-text)]">
                    {user.name}
                  </p>
                  <p className="text-xs text-[color:var(--crm-text-muted)]">{user.email}</p>
                </div>
                <form action={crmLogoutAction}>
                  <button
                    type="submit"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] text-[color:var(--crm-text-soft)] transition hover:border-rose-500/25 hover:text-rose-200"
                    aria-label="Cerrar sesion"
                  >
                    <LogOut size={17} />
                  </button>
                </form>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {crmNavigation.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "shrink-0 rounded-full border px-3 py-2 text-xs font-medium",
                      active
                        ? "border-[#274dff]/22 bg-[#274dff]/14 text-[#c6d7ff]"
                        : "border-[color:var(--crm-border)] bg-[color:var(--crm-surface)] text-[color:var(--crm-text-soft)]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </header>

        <main className="px-4 py-6 md:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
