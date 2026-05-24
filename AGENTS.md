# Agent Instructions

This repository is a Vite React + TypeScript fashion e-commerce demo. Keep changes scoped, frontend-first, and consistent with the existing component/page structure.

## Project Context

- Current app type: local demo storefront, not production commerce.
- Local API: `json-server` backed by `src/data/db.json`.
- Frontend route root: `src/App.tsx`.
- Shared UI: `src/components/`.
- Route pages: `src/pages/`.
- Redux slices: `src/features/`.
- API client: `src/axios/custom.ts`.

## Commands

Use these commands for normal work:

```bash
npm start
npm run build
npm run lint
```

`npm start` runs both Vite and `json-server`. The storefront is expected at `http://localhost:5173/`; the demo API is expected at `http://localhost:3000/`.

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

- Replace hardcoded `http://localhost:3000` values with environment configuration.
- Remove direct imports from `src/data/db.json` in production paths.
- Define stable contracts for products, variants, cart items, orders, users, addresses, reviews, and coupons.
- Move stock validation, order creation, payment verification, and admin authorization to the backend.

## Verification

At minimum, run:

```bash
npm run build
```

For UI-heavy changes, start the app with `npm start` and check the affected route manually.
