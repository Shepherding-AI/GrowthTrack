# Growth Track SaaS Starter (Multi-tenant, path-based tenant routing)

A minimal **multi-tenant** Next.js + Postgres + Prisma starter to build a **Growth Track** SaaS for churches.

## What you get
- Path-based tenant routing (no wildcard DNS required).

---

## Quick start (local)

### 1) Install deps
```bash
npm install
```

### 2) Configure env
Copy `.env.example` → `.env` and set:
- `DATABASE_URL` (Postgres)
- `APP_BASE_DOMAIN`
- `ADMIN_TOKEN`

### 3) Run migrations / push schema
For a quick start, use:
```bash
npm run db:push
npm run seed
```

### 4) Local subdomain setup

#### Option A (recommended): use `*.localhost` (Chrome supports this)
Open:
- http://localhost:3000/t/demo  ✅

> Most modern browsers treat `*.localhost` as loopback without editing hosts.

#### Option B: edit hosts file
Map a test subdomain to 127.0.0.1
- macOS/Linux: `/etc/hosts`
- Windows: `C:\Windows\System32\drivers\etc\hosts`

Add:
```
127.0.0.1 demo.localhost
```

### 5) Start dev server
```bash
npm run dev
```

---

## Admin access (starter token)

This starter uses a simple token so the repo runs without external auth providers.

### Use header
Send header `x-admin-token: <ADMIN_TOKEN>` for admin routes.

### Or set cookie in your browser console
On `http://localhost:3000/t/demo`, open devtools console and run:
```js
document.cookie = "gt_admin=dev_admin_token_change_me; path=/";
```

Then visit:
- http://localhost:3000/t/demo/t/[tenant]/admin

> Replace with real auth (Auth.js/Clerk/etc.) once your core product flow is built.

---

## Routing rules (important)
- Apex domain (no subdomain) shows marketing page at `/`
- Tenant subdomain rewrites:
  - `/` → `/t/{tenant}`
  - `/signup` → `/t/{tenant}/signup`
  - `/me` → `/t/{tenant}/me`
  - any other path → `/t/{tenant}{path}`
- `/t/[tenant]/admin` stays `/t/[tenant]/admin` but tenant context is provided via header `x-tenant-slug`

---

## Recommended next steps
1) Build real signup form UI on `/t/[tenant]/signup`
2) On signup:
   - create/find `Person`
   - create `Enrollment` into default Track
   - create `FormSubmission`
   - enqueue automations
3) Add cohort creation + attendance marking in admin
4) Add magic-link auth for `Person` ("My Progress")
5) Add Stripe billing per `Tenant`

---

## Deploy notes (Railway)
- Add Postgres plugin
- Set env vars:
  - `DATABASE_URL`
  - `APP_BASE_DOMAIN` = your production domain (e.g. `yourapp.com`)
  - `ADMIN_TOKEN`
- Ensure your DNS has a wildcard:
  - `*.yourapp.com` → your Railway app

---

## License
MIT (do whatever you want)
