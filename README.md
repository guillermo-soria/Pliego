# Pliego — Gestor de Presupuestos

App de presupuestos para stickers, laminados y otros productos de imprenta.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript |
| Base de datos | SQLite via Turso |
| ORM | Drizzle ORM |
| Auth | Clerk |
| Hosting | Vercel |
| Tests | Vitest |

## Estructura

```
pliego/
├── app/
│   ├── (auth)/sign-in/        # Login con Clerk
│   ├── api/
│   │   ├── materials/         # GET, POST
│   │   ├── materials/[id]/    # PUT, DELETE
│   │   ├── quotes/            # GET, POST
│   │   └── quotes/[id]/       # DELETE
│   └── dashboard/
│       ├── pliego/            # Calculadora de pliego
│       ├── presupuesto/       # Nuevo presupuesto
│       ├── materiales/        # ABM materiales
│       └── historial/         # Presupuestos guardados
├── db/
│   ├── schema.ts              # Tablas: materials, quotes, quoteItems
│   └── client.ts              # Conexión Turso (singleton)
├── lib/
│   ├── layout.ts              # Lógica de pliego (pura, testeable)
│   ├── layout.test.ts         # Tests de pliego y pricing
│   └── pricing.ts             # Lógica de precios (pura, testeable)
└── middleware.ts              # Auth guard con Clerk
```

## Setup paso a paso

### 1. Clonar e instalar

```bash
git clone <repo>
cd pliego
npm install
```

### 2. Turso (base de datos)

```bash
# Instalar CLI de Turso
curl -sSfL https://get.tur.so/install.sh | bash

# Login
turso auth login

# Crear la base de datos
turso db create pliego

# Obtener URL
turso db show pliego --url

# Crear token de acceso
turso db tokens create pliego
```

### 3. Clerk (autenticación)

1. Ir a [dashboard.clerk.com](https://dashboard.clerk.com)
2. Crear una nueva aplicación
3. Copiar `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` y `CLERK_SECRET_KEY`

### 4. Variables de entorno

```bash
cp .env.example .env.local
# Editar .env.local con las keys de Turso y Clerk
```

### 5. Migración de base de datos

```bash
npm run db:generate   # genera los archivos de migración
npm run db:migrate    # aplica la migración en Turso
```

### 6. Correr en desarrollo

```bash
npm run dev
# → http://localhost:3000
```

### 7. Tests

```bash
npx vitest run
```

## Deploy en Vercel

```bash
# Instalar CLI
npm i -g vercel

# Deploy
vercel

# Agregar variables de entorno en vercel.com/dashboard
# o con CLI:
vercel env add TURSO_DATABASE_URL
vercel env add TURSO_AUTH_TOKEN
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL
vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
```

## Costo estimado en producción

| Servicio | Plan | Costo |
|---|---|---|
| Vercel | Hobby | $0 |
| Turso | Free (5GB, 500 DBs) | $0 |
| Clerk | Free (hasta 10k MAU) | $0 |
| Dominio .com.uy | — | ~$15/año |

## Patrones importantes

- **Server Components** para fetching de datos (pliego, historial, materiales)
- **Client Components** solo para interactividad (formularios, modales)
- **lib/layout.ts y lib/pricing.ts** son funciones puras sin dependencias de UI → fáciles de testear
- **Snapshots de precios** en `quoteItems` para que el historial no cambie si editás un material
- **userId de Clerk** en todas las queries para aislamiento multi-usuario
