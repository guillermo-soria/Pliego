# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm run lint         # ESLint on app/ and lib/
npm run test         # Run all tests (vitest run)

# Run a single test file
npx vitest run lib/layout.test.ts

# Database
npm run db:generate  # Generate migration from schema changes
npm run db:migrate   # Apply migrations
npm run db:studio    # Open Drizzle Studio UI
```

> All `db:*` scripts require `.env.local` — they use `dotenv -e .env.local` internally.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:
- `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN` — Turso (libsql) database
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY` — Clerk auth
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `SIGN_IN_FALLBACK_REDIRECT_URL`

## Architecture

**Stack:** Next.js 15 App Router · TypeScript · Drizzle ORM · Turso (SQLite) · Clerk auth · Vitest

This is a **budgeting/quotation tool for print jobs** (stickers, laminates). Users define materials, calculate sheet layouts, and save quotes.

### Data Flow

```
Client Component (form) → API Route (app/api/) → Drizzle ORM → Turso DB
Server Component (page)  → Drizzle ORM (direct) → Turso DB
```

Server Components fetch data directly via Drizzle. Client Components call the REST API (`/api/materials`, `/api/quotes`). Clerk middleware (`middleware.ts`) guards all `/dashboard` and `/api` routes.

### Key Layers

- **`lib/`** — Pure business logic, no framework dependencies. `layout.ts` calculates optimal sheet layout (tries both orientations, returns best fit). `pricing.ts` computes quote totals. These are unit-tested.
- **`db/`** — Drizzle schema (`schema.ts`) defines three tables: `materials`, `quotes`, `quoteItems`. `client.ts` exports a singleton Turso client. All queries filter by `userId` (from Clerk) for data isolation.
- **`app/api/`** — REST handlers for materials and quotes CRUD. Quote items store a price snapshot at save time — this is intentional so historical quotes aren't affected by material price changes.
- **`app/dashboard/`** — Four sections: `pliego` (sheet calculator), `presupuesto` (create quote), `materiales` (manage materials), `historial` (saved quotes).

### Conventions

- Keep business logic in `lib/` as pure functions — no DB or Next.js imports there.
- Use Server Components for data fetching; add `"use client"` only when interactivity requires it.
- Path alias `@/*` maps to the project root.
