import type { CrmRoleKey } from "@/lib/amison-crm/types";

export type CrmNavItem = {
  href: string;
  label: string;
  icon:
    | "LayoutGrid"
    | "Target"
    | "Building2"
    | "ContactRound"
    | "BadgeDollarSign"
    | "KanbanSquare"
    | "FileText"
    | "Package2"
    | "History"
    | "ListTodo"
    | "CalendarDays"
    | "FolderKanban"
    | "Sparkles"
    | "BarChart3"
    | "Settings2"
    | "ShieldCheck";
  roles?: CrmRoleKey[];
};

export const crmNavigation: CrmNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutGrid" },
  { href: "/leads", label: "Leads", icon: "Target" },
  { href: "/clientes", label: "Clientes", icon: "Building2" },
  { href: "/contactos", label: "Contactos", icon: "ContactRound" },
  {
    href: "/oportunidades",
    label: "Oportunidades",
    icon: "BadgeDollarSign",
  },
  { href: "/pipeline", label: "Pipeline", icon: "KanbanSquare" },
  { href: "/cotizaciones", label: "Cotizaciones", icon: "FileText" },
  { href: "/productos", label: "Productos", icon: "Package2" },
  { href: "/seguimientos", label: "Seguimientos", icon: "History" },
  { href: "/tareas", label: "Tareas", icon: "ListTodo" },
  { href: "/calendario", label: "Calendario", icon: "CalendarDays" },
  { href: "/documentos", label: "Documentos", icon: "FolderKanban" },
  { href: "/ia-comercial", label: "IA Comercial", icon: "Sparkles" },
  { href: "/reportes", label: "Reportes", icon: "BarChart3" },
  { href: "/configuracion", label: "Configuracion", icon: "Settings2" },
  { href: "/usuarios", label: "Usuarios y permisos", icon: "ShieldCheck" },
];

export const crmQuickActions = [
  {
    label: "Nueva oportunidad",
    href: "/oportunidades#nueva-oportunidad",
  },
  {
    label: "Nuevo cliente",
    href: "/clientes#nuevo-cliente",
  },
  {
    label: "Nueva cotizacion",
    href: "/cotizaciones#nueva-cotizacion",
  },
];
