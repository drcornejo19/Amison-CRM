import type {
  Activity,
  Approval,
  Contact,
  DocumentRecord,
  Lead,
  Opportunity,
  Quote,
  QuoteItem,
  Task,
} from "@/lib/amison-crm/types";
import { crmClients, crmPipelineStages, crmProducts } from "./core";

const iso = (value: string) => new Date(value).toISOString();
const contactBlueprints = [
  ["Mariana", "Soria", "Jefa de compras", "compras", "decisor"],
  ["Diego", "Peralta", "Analista de calidad", "calidad", "tecnico"],
  ["Paula", "Ferreyra", "Responsable de desarrollo", "desarrollo", "influenciador"],
  ["Adrian", "Suarez", "Coordinador de produccion", "produccion", "tecnico"],
  ["Valentina", "Rossi", "Direccion tecnica", "direccion", "decisor"],
  ["Nicolas", "Bassi", "Administracion de compras", "administracion", "administrativo"],
] as const;

export const crmContacts: Contact[] = crmClients.flatMap((client, index) =>
  [0, 1].map((offset) => {
    const base = contactBlueprints[(index + offset) % contactBlueprints.length];
    const firstName = base[0];
    const lastName = base[1];
    return {
      id: `ctc-${client.id}-${offset + 1}`,
      clientId: client.id,
      firstName,
      lastName,
      role: base[2],
      area: base[3],
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${client.tradeName.toLowerCase()}.demo`,
      phone: client.phone,
      whatsapp: client.phone,
      linkedin: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
      isPrimary: offset === 0,
      influence: base[4],
      contactPreference: offset === 0 ? "WhatsApp + email" : "Email",
      notes:
        offset === 0
          ? "Contacto de referencia para aprobaciones y definicion comercial."
          : "Participa en evaluaciones tecnicas y validacion documental.",
    };
  })
);

const leadCompanies = [
  "Andes Therapeutics",
  "Nova Farma Sur",
  "Delta Clinical",
  "Axis Biolabs",
  "Rocheval Pharma",
  "MediCore Andina",
  "CruxLab",
  "Sintel Health",
  "Galenic Argentina",
  "Medisafe Partners",
  "Biolumina Labs",
  "Lyra Pharma",
  "Quimera Farma",
  "Savia Salud",
  "Arkos Bio",
  "Nexa OTC",
  "Laboratorio Cefir",
  "Argentum Pharma",
  "Helix Farma",
  "Estelar Life Sciences",
  "Orbia Medical",
  "QF Packagers",
  "ClariMed",
  "Celsius Vita",
  "Ambar Therapeutics",
  "Meridiano Farma",
  "Praxon Lab",
  "Radian Quimica",
  "VitaNova Health",
  "Solutex Bio",
];

const leadProducts = [
  "Estuches plegadizos",
  "Prospectos medicos",
  "Etiquetas autoadhesivas",
  "Exhibidores",
  "Desarrollo especial",
] as const;

const leadSources = [
  "web",
  "referido",
  "linkedin",
  "email",
  "llamada",
  "evento",
  "cliente actual",
] as const;

const leadStatuses = [
  "nuevo",
  "contactado",
  "calificado",
  "no calificado",
  "convertido",
] as const;

export const crmLeads: Lead[] = leadCompanies.map((company, index) => ({
  id: `led-${index + 1}`,
  company,
  cuit: `30-70${String(100000 + index).slice(-6)}-${(index % 9) + 1}`,
  industry: index % 5 === 0 ? "Biotecnologia" : "Laboratorio farmaceutico",
  clientType:
    index % 6 === 0
      ? "drogueria"
      : index % 4 === 0
        ? "distribuidor"
        : "laboratorio",
  contactName: `${["Julia", "Agustin", "Rocio", "Leandro", "Natalia"][index % 5]} ${["Ibarra", "Costa", "Pereyra", "Moyano", "Mena"][index % 5]}`,
  contactRole: ["Compras", "Desarrollo", "Calidad", "Direccion tecnica"][index % 4],
  email: `contacto${index + 1}@${company.toLowerCase().replace(/[^a-z]/g, "")}.demo`,
  phone: `+54 11 52${(index + 10).toString().padStart(2, "0")}-44${(index + 20).toString().padStart(2, "0")}`,
  whatsapp: `+54 9 11 52${(index + 10).toString().padStart(2, "0")}-44${(index + 20).toString().padStart(2, "0")}`,
  website: `https://${company.toLowerCase().replace(/[^a-z]/g, "")}.demo`,
  source: leadSources[index % leadSources.length],
  interestProduct: leadProducts[index % leadProducts.length],
  estimatedVolume: `${(index % 6) + 2} lotes mensuales`,
  urgency: index % 3 === 0 ? "alta" : index % 2 === 0 ? "media" : "baja",
  score: 48 + (index % 8) * 6,
  status: leadStatuses[index % leadStatuses.length],
  ownerId: index % 2 === 0 ? "usr-sofia" : "usr-pablo",
  nextContactAt: new Date(2026, 6, (index % 9) + 3, 10, 0, 0).toISOString(),
  notes:
    index % 2 === 0
      ? "Solicita propuesta tecnica y antecedentes en pharma."
      : "Interes inicial, pendiente de validar volumen y compliance.",
}));

const opportunityBlueprints = [
  ["cli-bionexa", "prd-estuches", "Linea onco oral 2026", "Negociacion", 420000, 29, "competidor local", "alto", 12],
  ["cli-pharmadelta", "prd-exhibidores", "Campana invierno OTC", "Cotizacion enviada", 185000, 32, "agencia POP", "moderado", 7],
  ["cli-genfarma", "prd-etiquetas", "Serializacion neo-bio", "Aprobacion de arte / calidad", 630000, 27, "imprenta especializada", "critico", 4],
  ["cli-saludnova", "prd-prospectos", "Prospectos genericos x 3 SKUs", "Cotizacion en preparacion", 112000, 24, "competidor regional", "moderado", 6],
  ["cli-innovaq", "prd-servicios", "Desarrollo kit lanzamiento", "Relevamiento tecnico", 265000, 37, "consultora packaging", "alto", 9],
  ["cli-medicor", "prd-exhibidores", "Display dermo retail", "Ganada", 158000, 33, "agencia btl", "controlado", 2],
  ["cli-vitafor", "prd-estuches", "Estuches suplementos premium", "Orden de compra solicitada", 210000, 28, "proveedor actual", "controlado", 3],
  ["cli-laboris", "prd-etiquetas", "Relanzamiento veterinario", "Pausada", 94000, 23, "sin definir", "alto", 14],
  ["cli-biocentro", "prd-prospectos", "Prospectos mendoza", "Contacto inicial", 72000, 21, "proveedor local", "moderado", 5],
  ["cli-neosynth", "prd-etiquetas", "Etiquetas inyectables loteado", "Negociacion", 540000, 25, "integrador global", "critico", 8],
  ["cli-bionexa", "prd-prospectos", "Insertos tratamiento cronico", "Solicitud de especificaciones", 98000, 22, "imprenta offset", "moderado", 10],
  ["cli-pharmadelta", "prd-estuches", "Cambio de arte pediatrico", "Cotizacion enviada", 146000, 26, "proveedor actual", "alto", 9],
  ["cli-genfarma", "prd-servicios", "Validacion camara 2D", "Muestra / prueba tecnica", 310000, 36, "consultora serializacion", "alto", 5],
  ["cli-saludnova", "prd-estuches", "Reingenieria carton", "Contacto inicial", 89000, 25, "proveedor local", "moderado", 4],
  ["cli-innovaq", "prd-exhibidores", "Exhibidor cartoneado", "Cotizacion en preparacion", 132000, 34, "agencia creativa", "moderado", 6],
  ["cli-medicor", "prd-etiquetas", "Linea dermo etiquetas", "Ganada", 168000, 31, "competidor actual", "controlado", 1],
  ["cli-vitafor", "prd-prospectos", "Prospectos estacionales", "Perdida", 88000, 20, "competidor precio", "alto", 2],
  ["cli-laboris", "prd-servicios", "Reactivacion cuenta vet", "Lead recibido", 66000, 35, "sin competidor", "alto", 1],
  ["cli-biocentro", "prd-etiquetas", "Etiquetas frascos alcohol", "Solicitud de especificaciones", 104000, 29, "proveedor mendocino", "moderado", 3],
  ["cli-neosynth", "prd-servicios", "Capacidad GMP packaging", "Aprobacion de arte / calidad", 420000, 39, "multi-site supplier", "critico", 11],
  ["cli-bionexa", "prd-estuches", "Lote exportacion chile", "Cotizacion enviada", 232000, 30, "imprenta transandina", "alto", 13],
  ["cli-pharmadelta", "prd-etiquetas", "Etiquetas promo OTC", "Ganada", 97000, 27, "competidor local", "controlado", 1],
  ["cli-saludnova", "prd-servicios", "Optimiza margen prospectos", "Relevamiento tecnico", 121000, 33, "consultora productiva", "moderado", 7],
  ["cli-innovaq", "prd-estuches", "Piloto carton metalizado", "Muestra / prueba tecnica", 198000, 35, "proveedor premium", "alto", 5],
  ["cli-neosynth", "prd-etiquetas", "Reetiquetado lote urgente", "Orden de compra solicitada", 275000, 24, "proveedor actual", "moderado", 2],
] as const;

export const crmOpportunities: Opportunity[] = opportunityBlueprints.map(
  (blueprint, index) => {
    const clientId = blueprint[0];
    const contactId =
      crmContacts.find((contact) => contact.clientId === clientId && contact.isPrimary)
        ?.id ?? crmContacts[0].id;
    const stage =
      crmPipelineStages.find((item) => item.name === blueprint[3]) ?? crmPipelineStages[0];
    const estimatedValue = blueprint[4];
    return {
      id: `opp-${index + 1}`,
      name: blueprint[2],
      clientId,
      contactId,
      productId: blueprint[1],
      workType:
        index % 4 === 0
          ? "Nueva licitacion"
          : index % 3 === 0
            ? "Reingenieria"
            : "Continuidad de linea",
      estimatedQuantity: 25000 + index * 1200,
      estimatedValue,
      currency: index % 5 === 0 ? "ARS" : "USD",
      estimatedMargin: blueprint[5],
      closeProbability:
        stage.name === "Ganada" ? 100 : stage.name === "Perdida" ? 0 : stage.probability,
      estimatedCloseDate: iso(`2026-0${index % 3 === 0 ? 7 : 8}-${String((index % 9) + 3).padStart(2, "0")}T18:00:00`),
      requiredDeliveryDate: iso(`2026-0${index % 3 === 0 ? 8 : 9}-${String((index % 8) + 7).padStart(2, "0")}T18:00:00`),
      ownerId: index % 2 === 0 ? "usr-sofia" : "usr-pablo",
      stageId: stage.id,
      priority:
        blueprint[7] === "critico"
          ? "critica"
          : blueprint[7] === "alto"
            ? "alta"
            : "media",
      competitor: blueprint[6],
      lossReason:
        stage.name === "Perdida"
          ? "Precio final fuera de rango para el cliente."
          : undefined,
      nextAction:
        stage.name === "Cotizacion enviada"
          ? "Hacer seguimiento comercial dentro de 48 hs."
          : stage.name === "Aprobacion de arte / calidad"
            ? "Consolidar aprobacion de calidad y preprensa."
            : "Avanzar con proxima instancia comercial.",
      notes:
        stage.name === "Negociacion"
          ? "Descuento condicionado a volumen consolidado."
          : "Cuenta con requerimientos tecnicos y trazabilidad documentada.",
      technicalFiles: [
        "especificacion-tecnica.pdf",
        index % 2 === 0 ? "artwork-v3.ai" : "layout-control.xlsx",
      ],
      internalApprovalStatus:
        blueprint[5] < 26 || estimatedValue > 400000 ? "pendiente" : "aprobada",
      risk: blueprint[7],
      stagnantDays: blueprint[8],
    };
  }
);

function buildQuoteItem(
  quoteId: string,
  opportunity: Opportunity,
  version: number
): QuoteItem {
  const product = crmProducts.find((item) => item.id === opportunity.productId) ?? crmProducts[0];
  const baseCost = (product.baseCost ?? 0.1) * opportunity.estimatedQuantity;
  const appliedMargin = Math.max(18, opportunity.estimatedMargin - (version - 1) * 1.5);
  const totalPrice = Number(
    (baseCost * (1 + appliedMargin / 100)).toFixed(2)
  );

  return {
    id: `${quoteId}-item-1`,
    productId: product.id,
    productName: product.name,
    quantity: opportunity.estimatedQuantity,
    measures:
      product.id === "prd-estuches"
        ? "145 x 55 x 32 mm"
        : product.id === "prd-prospectos"
          ? "240 x 320 mm abierto"
          : "65 x 35 mm",
    material: product.possibleMaterials[0],
    grammage:
      product.id === "prd-estuches"
        ? "320g"
        : product.id === "prd-prospectos"
          ? "60g"
          : "Autoadhesivo 80g",
    colors: "4/1 + azul especial",
    specialInks: ["Azul AMISON"],
    uvVarnish: product.id !== "prd-prospectos",
    aqueousVarnish: product.id === "prd-etiquetas",
    hotStamping: product.id === "prd-estuches",
    embossing: product.id === "prd-estuches",
    braille: product.id === "prd-estuches",
    dieCutting: product.id !== "prd-prospectos",
    folding: product.id === "prd-prospectos" || product.id === "prd-estuches",
    adhesive: product.id === "prd-etiquetas" ? "Permanent pharma" : "No aplica",
    variableData:
      product.id === "prd-etiquetas" || product.id === "prd-servicios",
    cameraControl: product.id === "prd-etiquetas",
    traceability:
      opportunity.productId === "prd-etiquetas"
        ? "Control por camara + lote"
        : "Registro por lote y version",
    tolerances: "+/- 0.5 mm",
    technicalNotes:
      "Se contempla aprobacion de arte, control documental y trazabilidad interna.",
    estimatedCost: Number(baseCost.toFixed(2)),
    suggestedMargin: product.suggestedMargin,
    appliedMargin,
    unitPrice: Number((totalPrice / opportunity.estimatedQuantity).toFixed(3)),
    totalPrice,
  };
}

export const crmQuotes: Quote[] = crmOpportunities.slice(0, 20).map((opportunity, index) => {
  const version = (index % 3) + 1;
  const item = buildQuoteItem(`qte-${index + 1}`, opportunity, version);
  const status =
    opportunity.closeProbability === 100
      ? "aceptada"
      : opportunity.stageId === "stg-12"
        ? "rechazada"
        : opportunity.internalApprovalStatus === "pendiente"
          ? "pendiente de aprobacion"
          : index % 4 === 0
            ? "enviada"
            : "aprobada";

  return {
    id: `qte-${index + 1}`,
    number: `AMI-2026-${String(index + 1001)}`,
    clientId: opportunity.clientId,
    contactId: opportunity.contactId,
    opportunityId: opportunity.id,
    date: iso(`2026-06-${String((index % 10) + 10).padStart(2, "0")}T09:00:00`),
    validUntil: iso(`2026-07-${String((index % 10) + 3).padStart(2, "0")}T18:00:00`),
    currency: opportunity.currency,
    paymentTerms:
      crmClients.find((client) => client.id === opportunity.clientId)?.paymentTerms ?? "30 dias",
    deliveryLeadTime:
      crmClients.find((client) => client.id === opportunity.clientId)?.usualLeadTime ??
      "15 dias",
    ownerId: opportunity.ownerId,
    status,
    version,
    totalCost: item.estimatedCost,
    discount: index % 5 === 0 ? 7 : index % 4 === 0 ? 4 : 0,
    finalPrice: Number(
      (item.totalPrice * (1 - (index % 5 === 0 ? 0.07 : index % 4 === 0 ? 0.04 : 0))).toFixed(2)
    ),
    estimatedProfitability: Number((item.appliedMargin - (index % 5 === 0 ? 4 : 0)).toFixed(1)),
    minimumMarginBlocked: item.appliedMargin < 24,
    rejectionReason:
      status === "rechazada"
        ? "Cliente adjudico por precio y plazo de entrega."
        : undefined,
    items: [item],
  };
});

export const crmActivities: Activity[] = crmOpportunities.flatMap((opportunity, index) => {
  const client = crmClients.find((item) => item.id === opportunity.clientId) ?? crmClients[0];
  return [
    {
      id: `act-${opportunity.id}-1`,
      entityType: "opportunity",
      entityId: opportunity.id,
      type: "Reunion",
      title: `Kickoff tecnico con ${client.tradeName}`,
      outcome: "Se alinearon medidas, material y criterios de trazabilidad.",
      nextAction: "Preparar especificaciones y circuito de aprobacion.",
      ownerId: opportunity.ownerId,
      happenedAt: iso(`2026-06-${String((index % 10) + 4).padStart(2, "0")}T10:30:00`),
    },
    {
      id: `act-${opportunity.id}-2`,
      entityType: "opportunity",
      entityId: opportunity.id,
      type: "Email",
      title: "Envio de resumen tecnico-comercial",
      outcome: "Cliente solicita version PDF con especificaciones consolidadas.",
      nextAction: "Emitir cotizacion con margen validado.",
      ownerId: opportunity.ownerId,
      happenedAt: iso(`2026-06-${String((index % 10) + 7).padStart(2, "0")}T16:00:00`),
      attachment: "resumen-comercial.pdf",
    },
  ];
});

export const crmTasks: Task[] = crmOpportunities.slice(0, 15).map((opportunity, index) => ({
  id: `tsk-${index + 1}`,
  title:
    index % 3 === 0
      ? "Hacer seguimiento de cotizacion"
      : index % 3 === 1
        ? "Validar especificaciones tecnicas"
        : "Coordinar aprobacion interna",
  description: `Accion relacionada con ${opportunity.name.toLowerCase()}.`,
  relatedType: index % 2 === 0 ? "opportunity" : "quote",
  relatedId: index % 2 === 0 ? opportunity.id : crmQuotes[index]?.id ?? opportunity.id,
  ownerId: opportunity.ownerId,
  dueDate: new Date(2026, 5, (index % 8) + 24, 17, 0, 0).toISOString(),
  priority:
    opportunity.priority === "critica"
      ? "critica"
      : opportunity.priority === "alta"
        ? "alta"
        : index % 3 === 0
          ? "media"
          : "alta",
  status:
    index % 5 === 0
      ? "vencida"
      : index % 4 === 0
        ? "en proceso"
        : "pendiente",
  reminder: "24 horas antes",
  comments:
    index % 2 === 0
      ? "Escalar si no hay respuesta del cliente."
      : "Incluir calidad si aplica requisito GMP.",
}));

export const crmDocuments: DocumentRecord[] = crmQuotes.slice(0, 12).map((quote, index) => ({
  id: `doc-${index + 1}`,
  name:
    index % 3 === 0
      ? `${quote.number}-cotizacion.pdf`
      : index % 3 === 1
        ? `${quote.number}-ficha-tecnica.pdf`
        : `${quote.number}-arte-v${quote.version}.ai`,
  type:
    index % 3 === 0
      ? "Cotizacion PDF"
      : index % 3 === 1
        ? "Ficha tecnica"
        : "Arte",
  clientId: quote.clientId,
  opportunityId: quote.opportunityId,
  quoteId: quote.id,
  version: `v${quote.version}`,
  date: quote.date,
  uploadedById: quote.ownerId,
  permissions: index % 2 === 0 ? "Ventas + Calidad" : "Ventas + Produccion",
  notes:
    index % 3 === 0
      ? "Documento enviado al cliente."
      : "Documento interno de soporte a aprobacion.",
}));

export const crmApprovals: Approval[] = crmQuotes
  .filter((quote) => quote.minimumMarginBlocked || quote.finalPrice > 250000)
  .map((quote, index) => ({
    id: `apr-${index + 1}`,
    quoteId: quote.id,
    opportunityId: quote.opportunityId,
    requestedById: quote.ownerId,
    approvedById: index % 2 === 0 ? "usr-martin" : undefined,
    status: index % 2 === 0 ? "aprobada" : "pendiente",
    reason:
      quote.minimumMarginBlocked
        ? "Margen debajo del minimo parametrizado."
        : "Monto superior al umbral gerencial.",
    requestedAt: quote.date,
  }));
