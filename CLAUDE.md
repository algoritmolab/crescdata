@AGENTS.md

# Cresc Datasoft — Marketing Website

Marketing website for **Cresc Datasoft**, a supply-chain back-office BPO. The site
presents the company's services, positioning, and contact points to prospective
clients. It is a content/marketing site — there is no application backend.

## Local development

```bash
npm install     # first time only
npm run dev     # http://localhost:3000
```

## Lint

```bash
npm run lint
```

## Tech stack

- **Next.js 16** (App Router) with **React 19**
- **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **ESLint** with `eslint-config-next` (flat config in `eslint.config.mjs`)
- Source lives under `src/`; `@/*` is aliased to `src/*`

## Deployment

Deploys to **Vercel** from the **`main`** branch. Pushing to `main` triggers a
production deploy; other branches get preview deployments.
