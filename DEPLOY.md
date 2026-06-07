# CAIS — WOW Redesign · Deploy Guide

This package contains the full rewrite of the CAIS landing page (cais.uno)
including custom brand assets, new section architecture, and improved
performance.

## What's inside

| File / Folder | What it is |
|---|---|
| `src/` | React + TypeScript source (Hero, Manifesto, Spotlight, Showcase, Roadmap, Services, TechStack, Brain, Contact, Footer + reusable components) |
| `src/sections/brain.tsx` | **NEW** — Brand mark section "Il nostro marchio" |
| `public/cais-logo.png` | **NEW** — Brand logo 1024×1024 (C with neural rings) |
| `public/cais-logo-512.png` | **NEW** — Brand logo 512×512 (nav/footer size, 297 KB) |
| `public/cais-brand.jpg` | **NEW** — Brain image, used in preloader, manifesto, cervello section |
| `public/cais-brain-hero.jpg` | **NEW** — Brain variant for hero background |
| `public/openclaw-hero.jpg` | **NEW** — OpenClaw spotlight image (robotic claw) |
| `public/hermes-agent.jpg` | **NEW** — Hermes spotlight image (Greek god cyber) |
| `public/automation-workflow.jpg` | **NEW** — Automation spotlight image |
| `public/python-ai-dev.jpg` | **NEW** — Python & AI spotlight image |
| `public/ai-agents.jpg` | **NEW** — AI & ML showcase card |
| `public/security.jpg` | **NEW** — Security showcase card |
| `public/automation.jpg` | **NEW** — Data & Knowledge showcase card |
| `public/hero-main.jpg` | **NEW** — Brand image (available for future use) |
| `api/` | Untouched — trpc contact route, SMTP email, etc. |
| `public/PRD_zeus/` | Untouched — microsite |
| `index.html`, `package.json`, `vite.config.ts`, `Dockerfile` | Untouched |

## What's preserved (every existing feature)

✅ i18n (IT / EN / PT-BR) with localStorage persistence
✅ Light / dark theme with localStorage persistence
✅ Contact form — Web3Forms primary channel + trpc backend (DB + SMTP)
✅ Admin page at `/admin` (password: `cais2025`)
✅ All Cloudflare Pages build configuration (untouched)
✅ All original public/ images are still there in git history

## How to deploy

### Option 1 — Replace your project folder (recommended)

1. Download `cais-wow-redesign-source.zip`
2. Extract it **on top of your existing `cais-lp` project folder**, overwriting files
3. Verify locally:
   ```bash
   cd cais-lp
   npm install
   npm run build      # → dist/  (client) + dist/boot.js (server)
   npm run dev        # → http://localhost:3000
   ```
4. Commit and push:
   ```bash
   git add -A
   git commit -m "feat: complete WOW redesign + brand integration"
   git push origin main
   ```
5. Cloudflare Pages will detect the push and deploy automatically (your
   existing Cloudflare config already points at `main`)

### Option 2 — Apply the patch (cleaner git history)

1. Download `cais-wow-redesign.patch`
2. In your project root:
   ```bash
   git checkout main
   git apply --check cais-wow-redesign.patch   # verify it applies cleanly
   git apply cais-wow-redesign.patch
   git add -A
   git commit -m "feat: complete WOW redesign + brand integration"
   git push origin main
   ```

## What you should see after deploy

1. Open https://cais.uno
2. **Preloader**: brain floating with cyan/violet glow → "CAIS" → fades up
3. **Hero**: "Agenti AI · nel core · della tua azienda" with 3-agent orbit on the right
4. **Manifesto**: marquee + manifesto card with brain on the left, copy on the right
5. **Soluzioni proprietarie**: 4 spotlight cards alternating left/right with images
6. **Capability stack**: 3 image cards (AI & ML, Security, Data)
7. **Metodo**: 3-step roadmap (Audit → Prototype → Deploy)
8. **Servizi**: 3 service cards with hover magnetic shine
9. **Stack**: floating tech cloud (18 tools)
10. **Cervello** *(new)*: the brain as the brand symbol with rotating rings + brand statement
11. **Contatti**: contact form (with Web3Forms + trpc)
12. **Footer**: new logo + CAIS

## Customise after deploy

Common tweaks you'll want to make in the code:

| What to change | Where |
|---|---|
| Hero copy (3 lines + description) | `src/i18n/{it,en,pt-BR}.json` → `hero.line1/2/3`, `hero.description` |
| Contact email | `src/sections/contact.tsx` → `CONTACT_EMAIL` constant |
| Section order in the page | `src/pages/Home.tsx` |
| Brand colors (cyan / violet / lime) | `src/index.css` → `:root` and `.dark` blocks |
| Brain image in preloader/manifesto | replace `public/cais-brand.jpg` |
| Logo glyph in nav/footer | replace `public/cais-logo-512.png` |

## Brand kit ready for Twitter / socials (next round)

When you're ready to launch the Twitter account, ask me to generate:
- **Profile picture** — square crop of the brain + C logo
- **Header banner** — 1500×500, full-bleed brain + tagline
- **Open Graph image** — 1200×630, for link previews when sharing cais.uno
- **Pinned tweet card** — single-product visual

Just ping me when the handle is live.
