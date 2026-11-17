# Marcelo · Pixel Portfolio

Next.js 14 portfolio in 16-bit pixel art: a night sky where every planet is a
project and the moon leads to "about me". Every sprite is drawn in code (SVG and
CSS), with no image files and no animation libraries.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Optimized for [Vercel](https://vercel.com):

```bash
npm run build
```

## Customize

- **Content**: edit `data/skills.ts`, `projects.ts`, `certifications.ts`, `timeline.ts`
- **Links**: social URLs and the contact email live in `data/contact.ts`
- **CV**: save the file as `public/cv.pdf`; the CV buttons already point to it
- **Project screenshots**: put images in `public/projects/` and list them on the
  project in `data/projects.ts`:

  ```ts
  images: [{ src: "/projects/taskflow-1.png", alt: "Task board with three columns" }],
  ```

  They show in the window that opens from the project's planet.
- **Planets**: each project gets its planet in `data/planets.ts` (shape, colours,
  rings, moons, and its position on wide and narrow screens). A project without
  an entry still appears in the list below the scene.
- **Colours**: the whole site draws from `lib/palette.ts`
- **SEO**: update `app/layout.tsx` metadata

## How it is built

- One pixel size for the whole page: the CSS variable `--px` (3px on phones,
  4px from 640px, 5px from 1920px). Sprites, borders and spacing are whole
  multiples of it.
- Sprites are rows of characters turned into SVG paths (`lib/sprites.ts`,
  `lib/planets.ts`); the scene lives in `components/scene/`.
- Animations are CSS only and move just `transform` and `opacity`. They pause
  when the tab is hidden or the scene is off screen, and switch off entirely
  with `prefers-reduced-motion`.

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Fonts: Press Start 2P, VT323, DM Sans (via `next/font`)
