# Fashion E-commerce Demo

A Next.js + React + TypeScript fashion e-commerce storefront demo built with the App Router, Tailwind CSS, Redux Toolkit, and local Next API routes.

This project is currently a local-demo application. It is useful for validating the customer and admin flows before connecting a production database, payment provider, email service, and production auth.

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
- Custom toast notifications with icons, auto-dismiss, and swipe-to-dismiss gesture support
- "Coming soon" notifications for placeholder controls such as newsletter signup, app download buttons, social links, and unfinished footer links
- Local Next API routes backed by `src/data/db.json`

## Tech Stack

- React 18
- TypeScript
- Next.js App Router
- Tailwind CSS
- Redux Toolkit
- Axios
- Framer Motion
- Lucide React / React Icons
- Next Route Handlers

## Getting Started

Install dependencies:

```bash
npm install
```

Start the Next.js app:

```bash
npm start
```

Open the app:

```txt
http://localhost:5173/
```

The local demo API is served by the same Next.js app:

```txt
http://localhost:5173/api
```

Available JSON resources:

```txt
http://localhost:5173/api/products
http://localhost:5173/api/orders
http://localhost:5173/api/users
```

## Scripts

```bash
npm run dev       # Start Next.js dev server
npm start         # Start Next.js dev server
npm run build     # Build the Next.js app
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

## Demo Notes

- The app uses local/imported demo data and Next API routes backed by `src/data/db.json`.
- Admin product changes are in-memory preview behavior.
- Wishlist and cart are Redux state only and are not persisted after refresh.
- Checkout is a demo flow. It does not process real card payments.
- `SAVE10` is the demo cart discount code.
- Some production fields are frontend-generated fallback values, such as demo ratings, colors, sizes, discount prices, and created dates.
- Placeholder controls that are not backed by a real service should call `useToast().showToast(...)` with a "Coming soon" message instead of silently doing nothing.
- Newsletter signup, app downloads, social links, order tracking, size guide, private sale, and similar unfinished footer links currently show "Coming soon" notifications.

## Toast Notifications

The app includes a local toast system in `src/components/ToastProvider.tsx`.

Wrap app content with the provider once:

```tsx
<ToastProvider>
  <App />
</ToastProvider>
```

Show a notification from any child component:

```tsx
const { showToast } = useToast();

showToast({
  title: "Coming soon",
  subtitle: "This feature is not ready yet.",
  leading: () => <Clock3 className="h-5 w-5" />,
});
```

Supported toast behavior:

- Multiple concurrent toasts, capped to the newest four
- Optional `subtitle`
- Optional custom `key`/`id` for replacing an existing toast
- `autodismiss` enabled by default
- Manual dismiss button
- Horizontal swipe-to-dismiss gesture

Existing `react-hot-toast` usage remains in place for cart, checkout, auth, and validation feedback.

## Backend Readiness

The project is ready for backend planning and incremental API integration, but it is not yet a production backend drop-in.

Recommended backend prep:

1. Define API models for `Product`, `ProductVariant`, `Cart`, `Order`, `User`, `Address`, `Review`, and `Coupon`.
2. Replace direct `src/data/db.json` imports with API-backed data reads in production paths.
3. Decide whether product routes should use IDs or SEO slugs.
4. Move auth, cart persistence, order creation, stock validation, and admin CRUD to backend APIs.
5. Replace fake checkout/card fields with payment session creation and webhook verification.
6. Add real image storage, email notifications, role-based admin authorization, and deployment configuration.

## Suggested Backend API Surface

```txt
GET    /api/products
GET    /api/products/:id-or-slug
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id

POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/cart
POST   /api/cart/items
PATCH  /api/cart/items/:id
DELETE /api/cart/items/:id

POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
PATCH  /api/orders/:id/status

POST   /api/checkout/session
POST   /api/payments/webhook
```

## Project Structure

```txt
src/
  app/              Next App Router routes and API route handlers
  assets/           Local demo images
  axios/            API client
  components/       Shared UI components
  data/             Local demo database JSON
  features/         Redux slices
  hooks/            Typed Redux hooks
  lib/              Server-side demo data helpers
  views/            Client route view components
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
