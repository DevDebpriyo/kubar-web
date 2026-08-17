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

Copy `.env.example` to `.env.local` for local delivery testing. The `/api/contact` route uses these server-side environment variables in production:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `CONTACT_FORM_RECIPIENT_EMAIL`

Never commit real credentials. The route enforces same-origin JSON requests, a 10 KB body limit, a honeypot, and best-effort per-instance throttling.

The production Vercel project also has a distributed firewall rule with these parameters:

- Match path `/api/contact` and method `POST`.
- Allow 5 requests per IP in a 600-second fixed window.
- Deny requests that exceed the limit.

Keep this external rule in place when recreating or relinking the Vercel project; it is not represented by a supported repository configuration file.

## Deployment

The repository is linked to the Vercel project `kubar-web`. Production aliases are `kubar.tech` and `www.kubar.tech`.
