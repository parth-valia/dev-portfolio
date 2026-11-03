# Parth Valia — portfolio

The site at [parthvalia.dev](https://parthvalia.dev). A visitor types their idea, the page builds it into an app, a website, an AI product and a workflow, then shows the products Parth has shipped.

## Stack

Next.js 13 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, GSAP with Lenis, and Three.js for the pop-up build. Deployed on Netlify.

## Run it

```bash
npm install
npm run dev
```

## Where things live

| Path | What |
| --- | --- |
| `app/` | Routes: the home page, `work/[slug]` case studies, `notes/[slug]` posts, and `api/github-calendar` for the commit heat map |
| `components/zero/` | Every section of the site |
| `components/pixel-pet/` | The cat that follows the cursor |
| `content/` | All copy and data: case studies, projects, experience, notes, testimonials |
| `app/globals.css` | Colour tokens (`--z-*`) for the dark and light themes |
| `public/` | Product screenshots, blog images and `resume.pdf` |
