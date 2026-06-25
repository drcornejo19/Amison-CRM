# CRM AMISON S.A.

CRM comercial B2B para AMISON S.A., enfocado en ventas industriales, cotizaciones tecnicas, pipeline complejo y trazabilidad documental.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Prisma
- Zod
- Recharts

## Puesta en marcha

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Demo local

- Login: `http://localhost:3010/login`
- Usuario demo: `lucia.mendez@amison.demo`
- Password demo: `Amison2026!`

## Deploy en Vercel

- Importar el repositorio en Vercel
- Configurar `Root Directory` como `amison-crm`
- Agregar variables desde `.env.example` si se activa Prisma con base real
- Ejecutar build command: `npm run build`

## Alcance actual

- Dashboard ejecutivo con KPIs y graficos
- Leads, clientes, contactos, oportunidades y pipeline
- Cotizaciones tecnicas con CPQ mock y salida PDF
- Documentos, tareas, calendario, reportes e IA comercial mock
- Layout premium con branding AMISON y modo claro/oscuro
