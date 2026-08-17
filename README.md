# Kubar Labs website

Production website for [kubar.tech](https://kubar.tech), built with Next.js App Router, TypeScript, Tailwind CSS, and next-intl.

## Local development

```bash
npm ci
npm run dev
```

The site runs at `http://localhost:3000`. Agentation can be started separately with `npm run agentation`; its toolbar is loaded only in development.

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Contact form configuration

The `/api/contact` route requires these server-side environment variables in production:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `CONTACT_FORM_RECIPIENT_EMAIL`

The route enforces same-origin JSON requests, a 10 KB body limit, a honeypot, and best-effort per-instance throttling. Configure a Vercel Firewall rate-limit rule for `/api/contact` for distributed enforcement.

## Deployment

The repository is linked to the Vercel project `kubar-web`. Production aliases are `kubar.tech` and `www.kubar.tech`.
