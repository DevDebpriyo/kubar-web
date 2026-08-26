# Kubar Labs website

Production website for [kubar.tech](https://kubar.tech), built with Next.js App Router, TypeScript, Tailwind CSS, and next-intl.

## Local development

```bash
npm ci --ignore-scripts
cp .env.example .env.local
npm run dev
```

The site runs at `http://localhost:3000`. Replace the placeholder SMTP values in `.env.local` only when testing contact delivery. Agentation can be started separately with `npm run agentation`; its toolbar is loaded only in development.

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run build:cf
npx playwright install chromium # first run only
npm run test:e2e
```

## Contact form configuration

The `/api/contact` route validates and queues submissions through the
`CONTACT_EMAIL_QUEUE` binding. A separate Worker in `workers/contact-email`
sends mail through Cloudflare Email Routing, retries failed deliveries, and
moves exhausted messages to a dead-letter queue. No SMTP credentials are
required. The route enforces an explicit origin allowlist, a streaming 10 KB
body limit, a honeypot, strict field validation, and Cloudflare edge rate
limiting keyed by `CF-Connecting-IP`.

## Deployment

The site deploys to the Cloudflare Worker `kubar-web` through the OpenNext
adapter. Run `npm run release:check` for the local release gate and
`npm run preview:cf` for a local Worker preview. Production deployment and
rollback instructions, including the one-time queue setup, are in
[`docs/deployment.md`](docs/deployment.md). GitHub Actions are intentionally not
part of the release path.
