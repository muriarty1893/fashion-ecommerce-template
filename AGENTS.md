# Agent Instructions

This repository is a Next.js + React + TypeScript fashion e-commerce demo. Keep changes scoped, frontend-first, and consistent with the existing component/view structure.

## Project Context

- Current app type: local demo storefront, not production commerce.
- Local API: Next route handlers under `src/app/api/`, backed by `src/data/db.json`.
- Frontend route root: `src/app/`.
- Shared UI: `src/components/`.
- Route views: `src/views/`.
- Redux slices: `src/features/`.
- API client: `src/axios/custom.ts`.

## Commands

Use these commands for normal work:

```bash
npm start
npm run build
npm run lint
```

`npm start` runs the Next.js dev server. The storefront is expected at `http://localhost:5173/`; the demo API is expected under `http://localhost:5173/api/`.

## Coding Guidelines

- Use TypeScript and existing React patterns.
- Prefer small, local changes over broad rewrites.
- Keep demo-only behavior explicit in copy or comments when it could be mistaken for production behavior.
- Do not add real payment, auth, email, storage, or deployment assumptions without a dedicated backend task.
- Keep user-facing UI responsive on mobile and desktop.
- Reuse existing Tailwind conventions and utility classes.
- Avoid changing unrelated files or generated build output.

## Backend Integration Notes

Before connecting a real backend, normalize the API layer:

- Keep API access centralized through `src/axios/custom.ts`; it defaults to `/api` and can be overridden with `NEXT_PUBLIC_API_BASE_URL`.
- Remove direct imports from `src/data/db.json` in production paths.
- Define stable contracts for products, variants, cart items, orders, users, addresses, reviews, and coupons.
- Move stock validation, order creation, payment verification, and admin authorization to the backend.

## Verification

At minimum, run:

```bash
npm run build
```

For UI-heavy changes, start the app with `npm start` and check the affected route manually.
