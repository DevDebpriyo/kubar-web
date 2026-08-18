# Cloudflare production deployment

The production website runs as the Cloudflare Worker `kubar-web`, built with
the OpenNext adapter.

## Deploy

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build:cf
npx opennextjs-cloudflare deploy
```

The Worker owns the custom domains `kubar.tech` and `www.kubar.tech`.
`www.kubar.tech` is redirected to the apex domain by `next.config.ts`.

The contact route uses:

- Cloudflare Email Service sender `website@mail.kubar.tech`.
- Recipient `outreach@kubar.tech`.
- The `CONTACT_RATE_LIMITER` binding for edge throttling.
- A second in-process 10-minute guard as defense in depth.

## Rollback

Keep the previous Vercel project available during the post-cutover observation
window. To route the website back to Vercel:

1. Remove the two custom-domain entries from `wrangler.jsonc` and redeploy.
2. Restore unproxied DNS CNAME records for both `kubar.tech` and
   `www.kubar.tech` to `b51b1c09503998a6.vercel-dns-017.com` with a
   60-second TTL.
3. Verify the apex returns `server: Vercel` and `www` redirects to the apex.

Email Sending records under `mail.kubar.tech` are independent of the website
custom domains and do not affect Google Workspace MX records for `kubar.tech`.
