import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

// El cliente se crea una sola vez (singleton pattern).
// En desarrollo usa la variable de entorno; en tests puede usar :memory:

function createDbClient() {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) throw new Error("TURSO_DATABASE_URL no está definida");

  const client = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  return drizzle(client, { schema });
}

// Evitar múltiples instancias en desarrollo (hot reload de Next.js)
declare global {
  // eslint-disable-next-line no-var
  var __db: ReturnType<typeof createDbClient> | undefined;
}

export const db = globalThis.__db ?? createDbClient();
if (process.env.NODE_ENV !== "production") globalThis.__db = db;
