<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Quick Commands (npm)

- Dev: `npm run dev`
- Lint: `npm run lint` (ESLint v9)
- Build: `npm run build`
- Prod: `npm run start`
- No test/typecheck scripts are defined in `package.json`.

## Project Shape

- Single Next.js app using App Router under `src/app/`.
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).

## i18n (next-intl)

- `next-intl` is wired via the Next plugin: `createNextIntlPlugin("./src/i18n/request.ts")` in `next.config.ts`.
- Locale is currently hardcoded to `en` in `src/i18n/request.ts`.
- Translations are YAML loaded from `messages/en.yml` (not JSON).
- Root provider is in `src/app/layout.tsx` using `NextIntlClientProvider` with `getMessages()`.

## Styling / UI Stack

- Tailwind CSS v4 is enabled via CSS imports in `src/app/globals.css` (`@import "tailwindcss";`, `tw-animate-css`, `shadcn/tailwind.css`).
- shadcn/ui is configured with `components.json`; global css path is `src/app/globals.css`.
- Utility `cn()` lives at `src/lib/utils.ts`.

## Notable Toolchain Quirks

- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`). Avoid introducing patterns that rely on memoization for correctness.
