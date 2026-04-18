# Pliego — Guía de configuración paso a paso

---

## Índice

1. [Node.js y entorno local](#1-nodejs-y-entorno-local)
2. [Crear el proyecto](#2-crear-el-proyecto)
3. [Turso (base de datos)](#3-turso-base-de-datos)
4. [Clerk (autenticación)](#4-clerk-autenticación)
5. [Variables de entorno](#5-variables-de-entorno)
6. [Migración de base de datos](#6-migración-de-base-de-datos)
7. [Correr en desarrollo](#7-correr-en-desarrollo)
8. [Tests](#8-tests)
9. [Vercel (deploy en producción)](#9-vercel-deploy-en-producción)
10. [Dominio (opcional)](#10-dominio-opcional)
11. [Checklist final](#11-checklist-final)

---

## 1. Node.js y entorno local

### Requisito previo

Necesitás Node.js versión 20 o superior.

Verificá si ya lo tenés:

```bash
node -v
```

Si no lo tenés o es viejo, instalá la versión LTS desde https://nodejs.org
(descargá el instalador para Windows/Mac o usá `nvm` en Linux/Mac).

### Verificar npm

```bash
npm -v
# Debe mostrar 10.x o superior
```

---

## 2. Crear el proyecto

### Descomprimir el ZIP

Descomprimí el archivo `pliego-project.zip` que descargaste. Vas a tener una carpeta `pliego/`.

### Abrir en tu editor

Abrí la carpeta `pliego/` en VS Code (recomendado) u otro editor.

### Instalar dependencias

Desde la terminal, dentro de la carpeta del proyecto:

```bash
cd pliego
npm install
```

Esto descarga todos los paquetes (Next.js, Drizzle, Clerk, etc.). Puede tardar 1-2 minutos.

---

## 3. Turso (base de datos)

Turso es SQLite en la nube. Es gratuito para este uso.

### 3.1 — Crear cuenta

1. Ir a https://turso.tech
2. Clic en **Sign Up**
3. Registrarse con GitHub (recomendado) o email

### 3.2 — Instalar la CLI de Turso

**Mac / Linux:**
```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

**Windows** (PowerShell como administrador):
```powershell
scoop install turso
```
Si no tenés Scoop: https://scoop.sh

### 3.3 — Login desde la terminal

```bash
turso auth login
```

Se abre el navegador. Autenticarse con la misma cuenta que crearon.

### 3.4 — Crear la base de datos

```bash
turso db create pliego
```

Verás algo como:
```
Created database pliego at group default in Frankfurt, Germany (fra).
```

### 3.5 — Obtener la URL de conexión

```bash
turso db show pliego --url
```

Copia ese valor. Se ve así:
```
libsql://pliego-tunombre.turso.io
```

**Guardalo** — lo vas a necesitar en el paso 5.

### 3.6 — Crear token de acceso

```bash
turso db tokens create pliego
```

Te devuelve un token largo. **Copialo y guardalo** ahora porque no se puede ver de nuevo.

---

## 4. Clerk (autenticación)

Clerk maneja el login/registro de usuarios. Gratuito hasta 10.000 usuarios.

### 4.1 — Crear cuenta

1. Ir a https://clerk.com
2. Clic en **Get started for free**
3. Registrarse con GitHub o email

### 4.2 — Crear una aplicación

1. En el dashboard de Clerk, clic en **Create application**
2. Nombre: `pliego`
3. En "How will your users sign in?": elegir **Email** (y opcionalmente **Google**)
4. Clic en **Create application**

### 4.3 — Obtener las API Keys

Después de crear la app, Clerk te muestra las keys directamente:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` → empieza con `pk_test_...`
- `CLERK_SECRET_KEY` → empieza con `sk_test_...`

También las encontrás en: **Configure → API Keys** en el panel izquierdo.

**Copialas y guardalas** para el paso siguiente.

### 4.4 — Configurar URLs de redirección (opcional para producción)

Cuando hagas deploy, en Clerk ir a **Configure → Domains** y agregar tu dominio de Vercel.

---

## 5. Variables de entorno

### 5.1 — Crear el archivo

En la raíz del proyecto, copiar el archivo de ejemplo:

```bash
cp .env.example .env.local
```

### 5.2 — Editar `.env.local`

Abrir `.env.local` en el editor y completar con los valores de los pasos anteriores:

```env
# Turso
TURSO_DATABASE_URL=libsql://pliego-tunombre.turso.io
TURSO_AUTH_TOKEN=eyJh...token-largo...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Estas líneas ya están escritas, no las cambies
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

> ⚠️ El archivo `.env.local` nunca se sube a Git (ya está en `.gitignore`). Es solo local.

---

## 6. Migración de base de datos

Esto crea las tablas en Turso (materials, quotes, quote_items).

### 6.1 — Generar los archivos de migración

```bash
npm run db:generate
```

Crea una carpeta `db/migrations/` con archivos SQL. Solo se hace una vez (o cuando cambiás el schema).

### 6.2 — Aplicar la migración en Turso

```bash
npm run db:migrate
```

Verás algo como:
```
[✓] migrations applied successfully
```

### Verificar (opcional)

Podés explorar la BD visualmente con:

```bash
npm run db:studio
```

Se abre una interfaz en el navegador donde ves las tablas.

---

## 7. Correr en desarrollo

```bash
npm run dev
```

La app queda corriendo en:
```
http://localhost:3000
```

Abrís esa URL en el navegador. Te va a pedir que inicies sesión con Clerk.

### Flujo de primera vez

1. La app te redirige a `/sign-in`
2. Hacés clic en **Sign up** para crear tu usuario
3. Completás email y contraseña
4. Clerk te manda un email de verificación
5. Verificás y ya entrás al dashboard

---

## 8. Tests

Los tests de la lógica de pliego y precios ya están escritos en `lib/layout.test.ts`.

```bash
npx vitest run
```

Resultado esperado:
```
✓ lib/layout.test.ts (8)
  ✓ calculateLayout > calcula stickers de 50x50 en A4
  ✓ calculateLayout > elige rotación cuando conviene
  ✓ calculateLayout > devuelve 0 si el sticker no entra
  ✓ calculateLayout > calcula hojas necesarias correctamente
  ✓ calculatePricing > calcula costo total correctamente
  ✓ calculatePricing > aplica markup correctamente
  ✓ calculatePricing > calcula precio por unidad
  ✓ calculatePricing > devuelve 0 por unidad si qty es 0

Test Files  1 passed (1)
Tests       8 passed (8)
```

---

## 9. Vercel (deploy en producción)

### 9.1 — Crear cuenta en Vercel

1. Ir a https://vercel.com
2. Clic en **Sign Up**
3. Elegir **Continue with GitHub** (recomendado)

### 9.2 — Subir el código a GitHub

Si no lo hiciste ya:

```bash
# Dentro de la carpeta pliego/
git init
git add .
git commit -m "Initial commit"
```

Luego crear un repositorio nuevo en https://github.com/new y seguir los pasos que GitHub indica para conectarlo.

```bash
git remote add origin https://github.com/tu-usuario/pliego.git
git push -u origin main
```

### 9.3 — Importar proyecto en Vercel

1. En el dashboard de Vercel, clic en **Add New → Project**
2. Conectar tu cuenta de GitHub si no está conectada
3. Buscar el repositorio `pliego` y clic en **Import**
4. Framework Preset: **Next.js** (se detecta automáticamente)
5. **NO hacer deploy todavía** — primero agregar las variables de entorno

### 9.4 — Agregar variables de entorno en Vercel

En la pantalla de configuración del proyecto, expandir **Environment Variables** y agregar una por una:

| Name | Value |
|------|-------|
| `TURSO_DATABASE_URL` | `libsql://pliego-tunombre.turso.io` |
| `TURSO_AUTH_TOKEN` | `eyJh...token-largo...` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` |
| `CLERK_SECRET_KEY` | `sk_test_...` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/dashboard` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/dashboard` |

### 9.5 — Deploy

Clic en **Deploy**. Vercel compila y publica. Tarda 1-3 minutos.

Al terminar, te da una URL como:
```
https://pliego-abc123.vercel.app
```

### 9.6 — Registrar el dominio de Vercel en Clerk

Para que el login funcione en producción:

1. Ir al dashboard de Clerk → **Configure → Domains**
2. Clic en **Add domain**
3. Ingresar `pliego-abc123.vercel.app` (o tu dominio personalizado)
4. Guardar

### 9.7 — Deploy automático

Desde ahora, cada vez que hagas `git push` a `main`, Vercel redeploya automáticamente.

---

## 10. Dominio (opcional)

Si querés una URL propia como `pliego.com.uy`:

### Opciones para registrar el dominio

- **NIC Uruguay** (para .com.uy): https://www.nic.org.uy — ~$15 USD/año
- **Namecheap** (para .com): https://namecheap.com — ~$10 USD/año

### Conectar dominio a Vercel

1. En Vercel → tu proyecto → **Settings → Domains**
2. Ingresar el dominio y seguir las instrucciones de DNS
3. Vercel te da los registros DNS a configurar en el panel de tu registrador
4. Los cambios de DNS pueden tardar hasta 24hs en propagarse

### Agregar dominio en Clerk

Repetir el paso 9.6 con el dominio definitivo.

---

## 11. Checklist final

Antes de considerar el setup completo, verificá:

**Local:**
- [ ] `npm install` corrió sin errores
- [ ] `.env.local` completado con todas las keys
- [ ] `npm run db:migrate` aplicó la migración
- [ ] `npm run dev` levanta sin errores en localhost:3000
- [ ] Podés crear un usuario y loguearte
- [ ] Podés crear un material y guardarlo
- [ ] Podés crear un presupuesto y verlo en el historial
- [ ] `npx vitest run` muestra 8 tests pasando

**Producción:**
- [ ] Repositorio en GitHub creado y código subido
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno agregadas en Vercel
- [ ] Deploy exitoso
- [ ] URL de Vercel agregada como dominio en Clerk
- [ ] Login funciona en la URL de producción

---

## Resumen de costos

| Servicio | Plan | Costo mensual |
|----------|------|---------------|
| Vercel | Hobby | $0 |
| Turso | Free (500 DBs, 5GB) | $0 |
| Clerk | Free (hasta 10k usuarios) | $0 |
| GitHub | Free | $0 |
| Dominio .com.uy | — | ~$1.25 USD |
| **Total** | | **~$0 / mes** |

---

## Comandos de referencia rápida

```bash
npm run dev          # desarrollo local
npm run build        # compilar para producción
npm run db:generate  # generar migraciones tras cambiar schema.ts
npm run db:migrate   # aplicar migraciones
npm run db:studio    # explorador visual de la BD
npx vitest run       # correr tests
git push origin main # deploy automático en Vercel
```
