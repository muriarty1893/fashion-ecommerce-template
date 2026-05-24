# Fashion E-commerce Demo

A React + TypeScript fashion e-commerce storefront demo built with Vite, Tailwind CSS, Redux Toolkit, React Router, and `json-server`.

This project is currently a frontend/local-demo application. It is useful for validating the customer and admin flows before connecting a real backend, database, payment provider, email service, and production auth.

## Current Features

- Home page with hero, collections, categories, testimonials, and footer
- Product listing with category pages, search, pagination, sorting, and filters
- Product detail page with image gallery, size/color selection, stock-aware quantity, wishlist, buy now, reviews, size guide, and related products
- Cart page with quantity updates, remove item, stock validation, discount code demo, shipping/tax/total summary, and empty state
- Checkout page with contact, shipping, payment-method demo, order summary, terms checkbox, and local order creation
- Wishlist page with saved products, remove, and move-to-cart actions
- Login, register, profile, order history, and order detail demo pages
- Static/demo info pages for about, contact, FAQ, shipping, returns, privacy, cookies, and terms
- Admin demo at `/admin` with dashboard metrics, products, orders, customers, settings, inventory alerts, and best-selling products
- Local JSON API using `src/data/db.json`

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
- Framer Motion
- Lucide React / React Icons
- JSON Server

## Getting Started

Install dependencies:

```bash
npm install
```

Start the storefront and local JSON API:

```bash
npm start
```

Open the app:

```txt
http://localhost:5173/
```

The local JSON API runs at:

```txt
http://localhost:3000/
```

Available JSON resources:

```txt
http://localhost:3000/products
http://localhost:3000/orders
http://localhost:3000/users
```

## Scripts

```bash
npm run dev       # Start Vite only
npm start         # Start Vite and json-server together
npm run build     # Type-check and build production assets
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

## Demo Notes

- The app still uses `json-server` and local/imported demo data.
- Admin product changes are in-memory preview behavior.
- Wishlist and cart are Redux state only and are not persisted after refresh.
- Checkout is a demo flow. It does not process real card payments.
- `SAVE10` is the demo cart discount code.
- Some production fields are frontend-generated fallback values, such as demo ratings, colors, sizes, discount prices, and created dates.

## Backend Readiness

The project is ready for backend planning and incremental API integration, but it is not yet a production backend drop-in.

Recommended backend prep:

1. Define API models for `Product`, `ProductVariant`, `Cart`, `Order`, `User`, `Address`, `Review`, and `Coupon`.
2. Replace direct `src/data/db.json` imports and hardcoded `http://localhost:3000` calls with an environment-based API client.
3. Decide whether product routes should use IDs or SEO slugs.
4. Move auth, cart persistence, order creation, stock validation, and admin CRUD to backend APIs.
5. Replace fake checkout/card fields with payment session creation and webhook verification.
6. Add real image storage, email notifications, role-based admin authorization, and deployment configuration.

## Suggested Backend API Surface

```txt
GET    /products
GET    /products/:id-or-slug
POST   /products
PATCH  /products/:id
DELETE /products/:id

POST   /auth/register
POST   /auth/login
POST   /auth/logout
GET    /auth/me

GET    /cart
POST   /cart/items
PATCH  /cart/items/:id
DELETE /cart/items/:id

POST   /orders
GET    /orders
GET    /orders/:id
PATCH  /orders/:id/status

POST   /checkout/session
POST   /payments/webhook
```

## Project Structure

```txt
src/
  actions/          React Router actions
  assets/           Local demo images
  axios/            API client
  components/       Shared UI components
  data/             json-server demo database
  features/         Redux slices
  hooks/            Typed Redux hooks
  pages/            Route pages
  utils/            Form and formatting helpers
```

## Production Exclusions

Do not treat this demo as production commerce without adding:

- Real backend validation and persistence
- Secure auth and password hashing
- Payment provider sessions and webhook verification
- Server-side stock validation
- Admin role checks
- Email notifications
- Legal policy review
- HTTPS, environment variables, logging, backups, and deployment hardening
