export type ThemeMode = "dark" | "light";

export type CrmRoleKey =
  | "ADMIN"
  | "DIRECTOR"
  | "SALES_MANAGER"
  | "SALES_EXECUTIVE"
  | "PRODUCTION"
  | "QUALITY"
  | "FINANCE"
  | "CUSTOMER_SUCCESS";

export type CurrencyCode = "ARS" | "USD";

export type ClientType =
  | "laboratorio"
  | "drogueria"
  | "distribuidor"
  | "tercero"
  | "otro";

export type LeadSource =
  | "web"
  | "referido"
  | "linkedin"
  | "email"
  | "llamada"
  | "evento"
  | "cliente actual"
  | "otro";

export type LeadStatus =
  | "nuevo"
  | "contactado"
  | "calificado"
  | "no calificado"
  | "convertido";

export type ClientStatus = "prospecto" | "activo" | "inactivo" | "perdido";

export type OpportunityStageName =
  | "Lead recibido"
  | "Contacto inicial"
  | "Relevamiento tecnico"
  | "Solicitud de especificaciones"
  | "Cotizacion en preparacion"
  | "Cotizacion enviada"
  | "Negociacion"
  | "Muestra / prueba tecnica"
  | "Aprobacion de arte / calidad"
  | "Orden de compra solicitada"
  | "Ganada"
  | "Perdida"
  | "Pausada";

export type OpportunityPriority = "baja" | "media" | "alta" | "critica";

export type OpportunityRisk = "controlado" | "moderado" | "alto" | "critico";

export type QuoteStatus =
  | "borrador"
  | "pendiente de aprobacion"
  | "aprobada"
  | "enviada"
  | "aceptada"
  | "rechazada"
  | "vencida";

export type ApprovalStatus = "pendiente" | "aprobada" | "rechazada";

export type ProductCategory =
  | "Estuches plegadizos"
  | "Prospectos medicos"
  | "Etiquetas autoadhesivas"
  | "Exhibidores"
  | "Servicios especiales";

export type ActivityType =
  | "Llamada"
  | "Email"
  | "WhatsApp"
  | "Reunion"
  | "Nota interna"
  | "Tarea"
  | "Archivo enviado"
  | "Cotizacion enviada"
  | "Cambio de etapa"
  | "Aprobacion"
  | "Reclamo"
  | "Postventa";

export type TaskStatus = "pendiente" | "en proceso" | "completada" | "vencida";

export type ContactArea =
  | "compras"
  | "calidad"
  | "produccion"
  | "desarrollo"
  | "direccion"
  | "administracion";

export type InfluenceLevel =
  | "decisor"
  | "influenciador"
  | "tecnico"
  | "administrativo";

export type DocumentType =
  | "Cotizacion PDF"
  | "Arte"
  | "Plano"
  | "Ficha tecnica"
  | "Certificado"
  | "Orden de compra"
  | "Documento de calidad"
  | "Email importante"
  | "Archivo del cliente";

export type PermissionKey =
  | "dashboard.read"
  | "lead.manage"
  | "client.manage"
  | "contact.manage"
  | "opportunity.manage"
  | "quote.manage"
  | "quote.approve"
  | "document.manage"
  | "report.read"
  | "forecast.read"
  | "automation.manage"
  | "settings.manage"
  | "user.manage";

export type CrmUser = {
  id: string;
  name: string;
  email: string;
  role: CrmRoleKey;
  title: string;
  territory: string;
  avatar: string;
};

export type RoleDefinition = {
  key: CrmRoleKey;
  label: string;
  summary: string;
  permissions: PermissionKey[];
};

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  possibleMaterials: string[];
  possibleFinishes: string[];
  technicalRequirements: string[];
  quoteFields: string[];
  baseCost?: number;
  suggestedMargin: number;
  estimatedProductionDays: number;
  documents: string[];
  active: boolean;
};

export type Client = {
  id: string;
  legalName: string;
  tradeName: string;
  cuit: string;
  address: string;
  province: string;
  country: string;
  phone: string;
  website: string;
  taxCondition: string;
  type: ClientType;
  segment: string;
  status: ClientStatus;
  executiveId: string;
  paymentTerms: string;
  usualLeadTime: string;
  usualProducts: string[];
  priorityLevel: "A" | "B" | "C";
  commercialRisk: OpportunityRisk;
  internalNotes: string;
  lastInteractionAt: string;
  nextAction: string;
  repurchaseProbability: number;
  churnRisk: number;
};

export type Contact = {
  id: string;
  clientId: string;
  firstName: string;
  lastName: string;
  role: string;
  area: ContactArea;
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  isPrimary: boolean;
  influence: InfluenceLevel;
  contactPreference: string;
  notes: string;
};

export type Lead = {
  id: string;
  company: string;
  cuit: string;
  industry: string;
  clientType: ClientType;
  contactName: string;
  contactRole: string;
  email: string;
  phone: string;
  whatsapp: string;
  website: string;
  source: LeadSource;
  interestProduct: ProductCategory | "Desarrollo especial";
  estimatedVolume: string;
  urgency: "baja" | "media" | "alta";
  score: number;
  status: LeadStatus;
  ownerId: string;
  nextContactAt: string;
  notes: string;
  isDeleted?: boolean;
};

export type PipelineStage = {
  id: string;
  name: OpportunityStageName;
  probability: number;
  tone: string;
};

export type Opportunity = {
  id: string;
  name: string;
  clientId: string;
  contactId: string;
  productId: string;
  workType: string;
  estimatedQuantity: number;
  estimatedValue: number;
  currency: CurrencyCode;
  estimatedMargin: number;
  closeProbability: number;
  estimatedCloseDate: string;
  requiredDeliveryDate: string;
  ownerId: string;
  stageId: string;
  priority: OpportunityPriority;
  competitor: string;
  lossReason?: string;
  nextAction: string;
  notes: string;
  technicalFiles: string[];
  internalApprovalStatus: ApprovalStatus;
  risk: OpportunityRisk;
  stagnantDays: number;
};

export type QuoteItem = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  measures: string;
  material: string;
  grammage: string;
  colors: string;
  specialInks: string[];
  uvVarnish: boolean;
  aqueousVarnish: boolean;
  hotStamping: boolean;
  embossing: boolean;
  braille: boolean;
  dieCutting: boolean;
  folding: boolean;
  adhesive: string;
  variableData: boolean;
  cameraControl: boolean;
  traceability: string;
  tolerances: string;
  technicalNotes: string;
  estimatedCost: number;
  suggestedMargin: number;
  appliedMargin: number;
  unitPrice: number;
  totalPrice: number;
};

export type Quote = {
  id: string;
  number: string;
  clientId: string;
  contactId: string;
  opportunityId: string;
  date: string;
  validUntil: string;
  currency: CurrencyCode;
  paymentTerms: string;
  deliveryLeadTime: string;
  ownerId: string;
  status: QuoteStatus;
  version: number;
  totalCost: number;
  discount: number;
  finalPrice: number;
  estimatedProfitability: number;
  minimumMarginBlocked: boolean;
  rejectionReason?: string;
  items: QuoteItem[];
};

export type Activity = {
  id: string;
  entityType: "lead" | "client" | "opportunity" | "quote" | "contact";
  entityId: string;
  type: ActivityType;
  title: string;
  outcome: string;
  nextAction?: string;
  ownerId: string;
  happenedAt: string;
  attachment?: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  relatedType: "lead" | "client" | "opportunity" | "quote";
  relatedId: string;
  ownerId: string;
  dueDate: string;
  priority: OpportunityPriority;
  status: TaskStatus;
  reminder: string;
  comments: string;
};

export type DocumentRecord = {
  id: string;
  name: string;
  type: DocumentType;
  clientId?: string;
  opportunityId?: string;
  quoteId?: string;
  version: string;
  date: string;
  uploadedById: string;
  permissions: string;
  notes: string;
};

export type Approval = {
  id: string;
  opportunityId?: string;
  quoteId?: string;
  requestedById: string;
  approvedById?: string;
  status: ApprovalStatus;
  reason: string;
  requestedAt: string;
};

export type ForecastScenario = {
  label: string;
  value: number;
  description: string;
};

export type AIInsight = {
  id: string;
  title: string;
  type:
    | "lead-scoring"
    | "next-best-action"
    | "executive-summary"
    | "email"
    | "risk"
    | "forecast"
    | "repurchase"
    | "chat";
  content: string;
  relatedType?: "client" | "opportunity" | "quote" | "lead";
  relatedId?: string;
};

export type AuditLog = {
  id: string;
  action: string;
  actorId: string;
  entity: string;
  entityId: string;
  timestamp: string;
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  severity: "info" | "warning" | "critical";
  createdAt: string;
};

export type AutomationRule = {
  id: string;
  title: string;
  description: string;
  trigger: string;
  status: "activa" | "borrador";
};

export type SearchItem = {
  id: string;
  label: string;
  description: string;
  href: string;
  kind: string;
};
