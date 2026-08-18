# Kubar Labs website

Production website for [kubar.tech](https://kubar.tech), built with Next.js App Router, TypeScript, Tailwind CSS, and next-intl.

## Local development

```bash
npm ci
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
npx playwright install chromium # first run only
npm run test:e2e
```

## Contact form configuration

The `/api/contact` route sends through the Cloudflare Email Service `EMAIL`
binding. Sender and recipient restrictions are declared in `wrangler.jsonc`;
no SMTP credentials are required. The route enforces same-origin JSON
requests, a 10 KB body limit, a honeypot, Cloudflare edge rate limiting, and a
second best-effort 10-minute per-instance guard. The edge limiter allows five
requests per IP per minute and is declared in `wrangler.jsonc`.

## Deployment

The site deploys to the Cloudflare Worker `kubar-web` through the OpenNext
adapter. Run `npm run deploy:cf` for a production deployment. Production custom
domains are `kubar.tech` and `www.kubar.tech`; the `www` host redirects to the
apex domain.
