# alexsosa.me

Bilingual (EN/ES) consulting website for Alex Sosa. Next.js 16 (App Router, fully static) + Tailwind CSS 4.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck  # generates route types, then tsc
npm run build
```

## Structure

- `src/content/en.ts`, `src/content/es.ts` — all public copy. Spanish is typed against English, so a missing key fails the build. **Only verified facts** (resume/profile, Appsolution portfolio, live product sites).
- `src/content/site.ts` — verified contact channels, logo, and CV paths.
- `src/app/[locale]/…` — pages: home, services, work, about, contact. `/en` and `/es` are prerendered.
- `src/proxy.ts` — redirects un-prefixed URLs (e.g. `/`) to `/en` or `/es` based on `Accept-Language` (default English).
- `src/app/global-not-found.tsx` — bilingual 404 (required because the root layout is under `[locale]`).
- `public/brand/alex-sosa-logo.png` — the original logo, unmodified (also used as `src/app/icon.png`, `apple-icon.png`, and the Open Graph image).
- `public/cv/` — CV PDFs (EN resume, ES profile).

## Contact

There is no form backend. The contact form composes a pre-filled email to `alexsosa.me@gmail.com` and opens the visitor's email app; nothing is stored.
