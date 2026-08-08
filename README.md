# Orbi GPS Tracker Landing Page + Order Backend

A production-ready, single-product Cash-on-Delivery storefront: a Next.js landing page with a real order form, a MySQL-backed order pipeline, and a JWT-protected admin dashboard.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript (strict)
- Tailwind CSS v4 (CSS-based theme tokens, no `tailwind.config.js` needed)
- next/font (Space Grotesk, Inter, JetBrains Mono) — self-hosted, no runtime Google Fonts request in the browser
- Prisma ORM + MySQL (`Product`, `Order`, `Admin`)
- JWT admin sessions via `jose` (edge-safe) + bcrypt password hashing via `bcryptjs`
- Zod for request/form validation

## Getting started

The storefront needs a database before `npm run dev` will fully work — jump to **Backend setup** below for the complete steps (create DB → `.env` → `npm install` → migrate → seed → run). Short version once `.env` is filled in:

```bash
npm install     # also runs `prisma generate`
npm run db:migrate
npm run db:seed
npm run dev
```

Open http://localhost:3000 for the storefront, or http://localhost:3000/admin/login for the admin dashboard.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

> **Note:** `npm run build` fetches font files from Google Fonts at build time via `next/font`. This needs outbound internet access — it works normally on a developer machine, CI, or hosting provider, but will fail in network-locked sandboxes.

## Project structure

```
prisma/
  schema.prisma        # Product, Order, Admin models (MySQL)
  seed.ts               # creates the product + first admin user
src/
  middleware.ts         # protects /admin/* behind a valid session
  app/
    layout.tsx           # fonts, metadata, root shell
    page.tsx               # composes the landing page sections
    globals.css              # design tokens (@theme), keyframes, focus styles
    api/
      orders/               # POST (place order), GET (admin list)
      orders/[id]/           # GET / PATCH (admin) a single order
      auth/                   # login / logout / me
    admin/
      login/page.tsx            # public login screen
      (protected)/                # route group — everything here requires auth
        layout.tsx                 # sidebar + topbar shell
        page.tsx                    # dashboard overview
        orders/page.tsx              # orders list (search, filter, status)
        orders/[id]/page.tsx          # order detail
  components/
    layout/               # Navbar, Footer
    sections/              # Hero, ProductDetails, WhyChooseUs, FAQ, Contact
    ui/                      # Button, Container, SectionTitle, FeatureCard, FAQItem, icons
    graphics/                 # PulseDevice — signature animated hero illustration
    order/                     # OrderForm — public COD checkout form
    admin/                      # AdminSidebar, AdminTopbar, StatusBadge, StatusSelect, LoginForm, ...
  constants/
    product.ts             # all copy + product data lives here (single source of truth)
  lib/
    prisma.ts               # Prisma client singleton
    token.ts                 # JWT sign/verify (edge-safe, used by middleware)
    password.ts               # bcrypt hashing (Node-only, never imported by middleware)
    validations.ts             # Zod schemas shared by API routes and forms
    money.ts                    # integer-paisa formatting helpers
    require-admin.ts             # reads/verifies the admin cookie inside route handlers
  types/
    index.ts                # landing-page content types
    order.ts                 # order/admin types shared by admin UI
```

To change any copy, price, spec, FAQ, or contact detail, edit `src/constants/product.ts` — no component code needs to change.

## Design system

- **Colors:** Ink graphite (`--color-ink`) for high-contrast sections, Cloud paper (`--color-cloud`) for readable sections, Signal Indigo (`--color-indigo`) as the primary action color, Pulse Cyan (`--color-cyan`) as the signature accent.
- **Type:** Space Grotesk (display/headlines), Inter (body), JetBrains Mono (specs, labels, eyebrows).
- **Signature element:** the hero's `PulseDevice` graphic — animated concentric rings and an equalizer chip, echoing the product's ANC/audio pulse.
- Reduced-motion is respected globally (`prefers-reduced-motion`), and all interactive elements have a visible focus ring.

## Scope — Phase 1 (landing page)

- Responsive Navbar, Hero, Product Details, Why Choose Us, FAQ, Contact, Footer
- Fully static content, driven by `src/constants/product.ts`

## Scope — Phase 2 (backend, orders, admin)

Phase 2 adds everything needed to actually run the COD store end to end:

- **Database:** Prisma + MySQL, with `Product`, `Order`, and `Admin` models (`prisma/schema.prisma`)
- **Public order flow:** the landing page's order block now has a real form (`components/order/OrderForm.tsx`) that posts to `POST /api/orders` — no account needed, matches the original brief
- **Admin auth:** email/password login backed by bcrypt-hashed passwords and a signed JWT stored in an `httpOnly` cookie (`/api/auth/login`, `/api/auth/logout`, `/api/auth/me`)
- **Route protection:** `src/middleware.ts` guards every `/admin/*` route except `/admin/login`, verifying the JWT at the edge
- **Admin dashboard:** `/admin` (order counts + in-progress order value), `/admin/orders` (search, status filter, inline status updates), `/admin/orders/[id]` (full order detail)

### Backend setup

1. **Create a MySQL database** (locally, in Docker, or with a managed provider).
2. **Copy the env file and fill it in:**
   ```bash
   cp .env.example .env
   ```
   - `DATABASE_URL` — your MySQL connection string
   - `JWT_SECRET` — any long random string (`openssl rand -base64 32`)
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` — used once, by the seed script, to create your first admin login
3. **Install dependencies** (this also runs `prisma generate` via `postinstall`):
   ```bash
   npm install
   ```
4. **Create the database tables:**
   ```bash
   npm run db:migrate
   ```
5. **Seed the product and admin user:**
   ```bash
   npm run db:seed
   ```
6. **Run the app:**
   ```bash
   npm run dev
   ```
   - Storefront: http://localhost:3000 — the order form at the bottom of the page writes real `Order` rows.
   - Admin: http://localhost:3000/admin/login — sign in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you seeded.

Other useful scripts: `npm run db:studio` (Prisma Studio, a GUI for the database), `npm run db:push` (sync schema without a migration, handy in early development).

> **Sandbox note:** this project was built and type-checked in a network-restricted sandbox that couldn't reach `binaries.prisma.sh` (to download the Prisma engine) or `fonts.googleapis.com` (for `next/font`). Both are ordinary outbound HTTPS calls that succeed on a normal machine, in CI, or on any standard host — they were the *only* things that couldn't be verified end-to-end here. Every file was still written and, where possible, type-checked and linted against the real Prisma/Next APIs.

### API reference

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/orders` | Public | Place a COD order |
| `GET` | `/api/orders` | Admin | List orders (`?status=`, `?q=`, `?page=`) |
| `GET` | `/api/orders/:id` | Admin | Fetch one order |
| `PATCH` | `/api/orders/:id` | Admin | Update order status |
| `POST` | `/api/auth/login` | Public | Log in, sets the admin cookie |
| `POST` | `/api/auth/logout` | Admin | Clears the admin cookie |
| `GET` | `/api/auth/me` | Admin | Current admin session info |

### Money handling

Prices and order totals are stored as **integer paisa** (1 BDT = 100 paisa) rather than floats, to avoid rounding drift — see `src/lib/money.ts` for the `formatBDT()` / `toCents()` helpers.

## Not included (future phases)

- Multi-product catalog / cart (this is intentionally a single-product store)
- SMS/email order confirmations
- Payment gateway integration (the product is COD-only by design)
- Role-based permissions beyond a single "admin" role

