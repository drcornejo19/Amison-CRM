import type {
  Activity,
  AIInsight,
  AuditLog,
  AutomationRule,
  ForecastScenario,
  Notification,
  SearchItem,
} from "@/lib/amison-crm/types";
import { crmClients, crmPipelineStages, crmProducts, crmUsers } from "./core";
import {
  crmActivities,
  crmContacts,
  crmLeads,
  crmOpportunities,
  crmQuotes,
  crmTasks,
} from "./relations";

const iso = (value: string) => new Date(value).toISOString();
export const crmAiInsights: AIInsight[] = [
  {
    id: "ai-1",
    title: "Lead scoring",
    type: "lead-scoring",
    content:
      "Los leads con origen referido, urgencia alta y contacto de compras superan 78/100 y ameritan contacto en menos de 24 hs.",
  },
  {
    id: "ai-2",
    title: "Next best action",
    type: "next-best-action",
    content:
      "BioNexa: enviar muestra validada y agendar reunion tecnico-comercial con calidad esta semana.",
    relatedType: "client",
    relatedId: "cli-bionexa",
  },
  {
    id: "ai-3",
    title: "Resumen ejecutivo",
    type: "executive-summary",
    content:
      "NeoSynth concentra el ticket mas alto del trimestre, pero exige aprobacion de margen y SLA de calidad.",
    relatedType: "client",
    relatedId: "cli-neosynth",
  },
  {
    id: "ai-4",
    title: "Email sugerido",
    type: "email",
    content:
      "Asunto: Seguimiento de cotizacion AMI-2026-1006. Cuerpo: compartimos version consolidada con trazabilidad y plazo ajustado...",
    relatedType: "quote",
    relatedId: "qte-6",
  },
  {
    id: "ai-5",
    title: "Riesgo de perdida",
    type: "risk",
    content:
      "Tres oportunidades superan 10 dias sin cambio de etapa y requieren escalamiento o redefinicion de valor.",
  },
  {
    id: "ai-6",
    title: "Forecast inteligente",
    type: "forecast",
    content:
      "Escenario realista: cerrar USD 1,43M del pipeline abierto si se sostiene la tasa de avance de junio.",
  },
  {
    id: "ai-7",
    title: "Recompra",
    type: "repurchase",
    content:
      "PharmaDelta y Vitafor tienen alta probabilidad de recompra en las proximas 5 semanas por comportamiento historico.",
  },
  {
    id: "ai-8",
    title: "Chat comercial",
    type: "chat",
    content:
      "Preguntas sugeridas: oportunidades grandes del mes, clientes sin contacto en 30 dias, cotizaciones por vencer, ranking de vendedores.",
  },
];

export const crmNotifications: Notification[] = [
  {
    id: "ntf-1",
    title: "Cotizacion por vencer",
    body: "AMI-2026-1005 vence en 48 horas.",
    severity: "warning",
    createdAt: iso("2026-06-24T08:00:00"),
  },
  {
    id: "ntf-2",
    title: "Aprobacion pendiente",
    body: "NeoSynth requiere aprobacion gerencial por margen.",
    severity: "critical",
    createdAt: iso("2026-06-24T09:15:00"),
  },
  {
    id: "ntf-3",
    title: "Cliente inactivo",
    body: "Laboris supera 60 dias sin actividad registrada.",
    severity: "warning",
    createdAt: iso("2026-06-23T12:30:00"),
  },
];

export const crmForecastScenarios: ForecastScenario[] = [
  {
    label: "Optimista",
    value: 1980000,
    description: "Incluye cierres de oportunidades en negociacion y OC solicitada.",
  },
  {
    label: "Realista",
    value: 1430000,
    description: "Pondera por probabilidad y velocidad de avance historica.",
  },
  {
    label: "Conservador",
    value: 980000,
    description: "Considera solo pipeline con aprobacion avanzada o OC.",
  },
];

export const crmAutomationRules: AutomationRule[] = [
  {
    id: "auto-1",
    title: "Asignacion inicial de leads",
    description: "Si entra un lead nuevo, asignarlo al ejecutivo segun provincia y carga.",
    trigger: "Lead creado",
    status: "activa",
  },
  {
    id: "auto-2",
    title: "Seguimiento de cotizacion",
    description: "Si una cotizacion lleva 3 dias sin respuesta, crear tarea de seguimiento.",
    trigger: "Cotizacion sin actividad",
    status: "activa",
  },
  {
    id: "auto-3",
    title: "Oportunidad estancada",
    description: "Si una oportunidad no cambia de etapa en 10 dias, marcarla como estancada.",
    trigger: "Pipeline inactivo",
    status: "activa",
  },
  {
    id: "auto-4",
    title: "Margen bajo",
    description: "Bloquear envio si el margen aplicado queda por debajo del minimo permitido.",
    trigger: "Cotizacion lista para enviar",
    status: "activa",
  },
];

export const crmAuditLogs: AuditLog[] = [
  {
    id: "aud-1",
    action: "Quote approved",
    actorId: "usr-martin",
    entity: "Quote",
    entityId: "qte-3",
    timestamp: iso("2026-06-23T17:10:00"),
  },
  {
    id: "aud-2",
    action: "Lead converted to client",
    actorId: "usr-sofia",
    entity: "Lead",
    entityId: "led-6",
    timestamp: iso("2026-06-22T10:20:00"),
  },
  {
    id: "aud-3",
    action: "Opportunity moved to negotiation",
    actorId: "usr-pablo",
    entity: "Opportunity",
    entityId: "opp-10",
    timestamp: iso("2026-06-21T14:55:00"),
  },
];

export const demoPassword = "Amison2026!";

export function getCrmUserByEmail(email: string) {
  return crmUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function getClientById(clientId: string) {
  return crmClients.find((client) => client.id === clientId);
}

export function getContactById(contactId: string) {
  return crmContacts.find((contact) => contact.id === contactId);
}

export function getOpportunityById(opportunityId: string) {
  return crmOpportunities.find((opportunity) => opportunity.id === opportunityId);
}

export function getQuoteById(quoteId: string) {
  return crmQuotes.find((quote) => quote.id === quoteId);
}

export function getProductById(productId: string) {
  return crmProducts.find((product) => product.id === productId);
}

export function getClientContacts(clientId: string) {
  return crmContacts.filter((contact) => contact.clientId === clientId);
}

export function getClientOpportunities(clientId: string) {
  return crmOpportunities.filter((opportunity) => opportunity.clientId === clientId);
}

export function getClientQuotes(clientId: string) {
  return crmQuotes.filter((quote) => quote.clientId === clientId);
}

export function getEntityActivities(entityType: Activity["entityType"], entityId: string) {
  return crmActivities.filter(
    (activity) => activity.entityType === entityType && activity.entityId === entityId
  );
}

export function getOwner(userId: string) {
  return crmUsers.find((user) => user.id === userId) ?? crmUsers[0];
}

export function getStage(stageId: string) {
  return crmPipelineStages.find((stage) => stage.id === stageId) ?? crmPipelineStages[0];
}

export function getDashboardMetrics() {
  const activeClients = crmClients.filter((client) => client.status === "activo").length;
  const inactiveClients = crmClients.filter((client) => client.status === "inactivo").length;
  const openOpportunities = crmOpportunities.filter((opportunity) => {
    const stage = getStage(opportunity.stageId).name;
    return stage !== "Ganada" && stage !== "Perdida";
  });
  const closedWon = crmOpportunities.filter(
    (opportunity) => getStage(opportunity.stageId).name === "Ganada"
  );
  const totalPipeline = openOpportunities.reduce(
    (total, opportunity) => total + opportunity.estimatedValue,
    0
  );
  const weightedForecast = openOpportunities.reduce(
    (total, opportunity) =>
      total + opportunity.estimatedValue * (opportunity.closeProbability / 100),
    0
  );
  const quotesPending = crmQuotes.filter(
    (quote) => quote.status === "pendiente de aprobacion" || quote.status === "enviada"
  ).length;
  const quotesWon = crmQuotes.filter((quote) => quote.status === "aceptada").length;
  const quotesLost = crmQuotes.filter((quote) => quote.status === "rechazada").length;
  const averageTicket =
    closedWon.length > 0
      ? closedWon.reduce((total, item) => total + item.estimatedValue, 0) /
        closedWon.length
      : 0;
  const conversionRate =
    crmQuotes.length > 0 ? (quotesWon / crmQuotes.length) * 100 : 0;
  const estimatedMargin =
    openOpportunities.length > 0
      ? openOpportunities.reduce((total, item) => total + item.estimatedMargin, 0) /
        openOpportunities.length
      : 0;
  const overdueTasks = crmTasks.filter((task) => task.status === "vencida").length;

  return {
    estimatedMonthSales: 980000,
    closedSales: closedWon.reduce((total, item) => total + item.estimatedValue, 0),
    totalPipeline,
    openOpportunities: openOpportunities.length,
    quotesIssued: crmQuotes.length,
    quotesPending,
    quotesWon,
    quotesLost,
    conversionRate,
    averageTicket,
    estimatedMargin,
    activeClients,
    inactiveClients,
    newLeads: crmLeads.filter((lead) => lead.status === "nuevo").length,
    monthlyForecast: weightedForecast,
    quarterlyForecast: crmForecastScenarios[1].value * 2.4,
    overdueTasks,
    nextFollowUps: crmTasks.filter((task) => task.status === "pendiente").length,
    weightedForecast,
  };
}

export function getSellerRanking() {
  return crmUsers
    .filter((user) => user.role === "SALES_EXECUTIVE" || user.role === "SALES_MANAGER")
    .map((user) => {
      const ownedOpps = crmOpportunities.filter((item) => item.ownerId === user.id);
      const sentQuotes = crmQuotes.filter((item) => item.ownerId === user.id);
      const wonQuotes = sentQuotes.filter((item) => item.status === "aceptada");

      return {
        user,
        pipelineValue: ownedOpps.reduce((total, item) => total + item.estimatedValue, 0),
        conversion: sentQuotes.length ? (wonQuotes.length / sentQuotes.length) * 100 : 0,
        activeOpps: ownedOpps.length,
      };
    })
    .sort((left, right) => right.pipelineValue - left.pipelineValue);
}

export function getPipelineSummary() {
  return crmPipelineStages.map((stage) => {
    const stageOpps = crmOpportunities.filter((opportunity) => opportunity.stageId === stage.id);
    return {
      stage,
      count: stageOpps.length,
      value: stageOpps.reduce((total, item) => total + item.estimatedValue, 0),
    };
  });
}

export function getSalesByMonth() {
  return [
    { month: "Ene", value: 410000 },
    { month: "Feb", value: 530000 },
    { month: "Mar", value: 480000 },
    { month: "Abr", value: 590000 },
    { month: "May", value: 660000 },
    { month: "Jun", value: 720000 },
  ];
}

export function getProductDemand() {
  return crmProducts.map((product) => ({
    product: product.name,
    opportunities: crmOpportunities.filter((item) => item.productId === product.id).length,
  }));
}

export function getLossReasons() {
  return [
    { reason: "Precio", value: 7 },
    { reason: "Plazo", value: 4 },
    { reason: "Proveedor actual", value: 3 },
    { reason: "Especificacion incompleta", value: 2 },
  ];
}

export function getActivityBySeller() {
  return getSellerRanking().map((entry) => ({
    seller: entry.user.name,
    activities: crmActivities.filter((item) => item.ownerId === entry.user.id).length + 12,
  }));
}

export function getCriticalOpportunities() {
  return crmOpportunities
    .filter((opportunity) => opportunity.risk === "alto" || opportunity.risk === "critico")
    .slice(0, 6);
}

export function getClientExecutiveSummary(clientId: string) {
  const client = getClientById(clientId);
  if (!client) return "";

  return `${client.tradeName} mantiene una relacion comercial con foco en ${client.usualProducts.join(
    ", "
  )}. La probabilidad de recompra es ${client.repurchaseProbability}% y el riesgo de perdida actual es ${client.churnRisk}%.`;
}

export function getSearchItems(): SearchItem[] {
  return [
    ...crmClients.map((client) => ({
      id: client.id,
      label: client.tradeName,
      description: `${client.segment} - ${client.province}`,
      href: `/clientes/${client.id}`,
      kind: "Cliente",
    })),
    ...crmOpportunities.slice(0, 10).map((opportunity) => ({
      id: opportunity.id,
      label: opportunity.name,
      description: `${getClientById(opportunity.clientId)?.tradeName ?? "Cliente"} - ${getStage(opportunity.stageId).name}`,
      href: "/oportunidades",
      kind: "Oportunidad",
    })),
    ...crmQuotes.slice(0, 10).map((quote) => ({
      id: quote.id,
      label: quote.number,
      description: `${getClientById(quote.clientId)?.tradeName ?? "Cliente"} - ${quote.status}`,
      href: `/cotizaciones/${quote.id}`,
      kind: "Cotizacion",
    })),
  ];
}
