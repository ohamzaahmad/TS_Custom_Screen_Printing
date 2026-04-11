# TS Custom Screen Printing

Production website for TS Custom Screen Printing, built with React + TypeScript (Vite) and external hosted form services for enquiries and quote requests.

## Overview

- Frontend: React SPA with browser-history path routing.
- Styling: Tailwind CSS.
- Contact/Quote submissions: External hosted form platform (embedded).

## Tech Stack

- Node.js
- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4

## Repository Structure

- `pages/` Main screens (Home, Quote, Contact, Pricing, Guides).
- `components/` Shared UI (Navbar, Footer).
- `services/dataService.ts` Frontend data service for catalogue/pricing/ink content.

## Prerequisites

- Node.js 20+ recommended
- npm 10+ recommended

## Environment Variables

No mandatory environment variables are required for local development.

## Installation

Install frontend dependencies:

```bash
npm install
```

## Run Locally

Start frontend app (from project root):

```bash
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Build

Build frontend production assets:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Deployment (Hostinger Shared Hosting)

1. Build the app: `npm run build`
2. Upload all contents of `dist/` to your Hostinger `public_html/` directory.
3. Upload `.htaccess` from project root into `public_html/`.
4. Ensure `404.html` from `dist/` is uploaded (generated from `public/404.html`).

Routing behavior:

- The `.htaccess` rewrite rules route all non-file requests to `index.html`.
- This enables direct access to SPA routes (for example: `/quote`, `/contact`) without 404 errors.
- If a 404 is served by hosting configuration, `404.html` redirects visitors back to the app root.

## Operational Notes

- Admin panel and local backend have been removed from this codebase.
- Contact and quote workflows are handled through embedded external forms.
## Operational Notes

- Frontend-only SPA: the local `server/` and any admin pages have been removed. This repository now contains only the frontend assets needed to run the public site.
- Contact/Quote: submissions are handled by embedded external forms (see `pages/Contact.tsx` and `pages/Quote.tsx`).

## Current Dependencies (high level)

- `react`, `react-dom` — core UI
- `framer-motion` — animations used on the Home page
- Tailwind CSS + PostCSS for styling

Note: previously present 3D libraries (`@react-three/fiber`, `three`) were removed because they were not used by the UI.

## Security / Audit

- We recommend running `npm audit` and `npm audit fix` before deploying to address any reported vulnerabilities.

## Quick Developer Guide

- Install dependencies:

```bash
npm install
```

- Run development server (hot reload):

```bash
npm run dev
```

- Build production assets:

```bash
npm run build
```

- Serve a local preview of the production build:

```bash
npm run preview
```

## Project Notes & Where to Edit

- The main app shell and lazy routing live in `App.tsx`.
- The landing / hero with motion is `pages/Home.tsx` (Framer Motion animations).
- Contact and Quote embed logic is in `pages/Contact.tsx` and `pages/Quote.tsx`.
- Theme colors and gradients live in `brandColors.ts` and `index.css` (see `.btn-gradient` for CTA styling).

## Deployment

- Build the app (`npm run build`) and upload the `dist/` folder to any static host (Netlify, Vercel, Hostinger, S3+CloudFront).
- Ensure your host rewrites unknown paths to `index.html` so SPA routing works.

## Questions / Handover

If you want me to add a short script to deploy to a specific host or to pin dependencies, tell me which provider and I will add instructions.

## Ownership

For support or handover, use your internal engineering contact process.

---

For a complete, step-by-step Hostinger shared-hosting deployment guide, see `DEPLOY_HOSTINGER.md` in the project root.
