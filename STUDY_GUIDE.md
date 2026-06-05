# Mysogi Landing Page — Full Study Guide

This document explains **everything** in this project: what I built, why, and how each part works. Read it section by section while looking at the files on your computer.

---

## 1. What this project is

I built a **single-page website** (landing page) for **Mysogi**, a billboard and digital advertising company in Nigeria.

The design started from a **Figma template** called [Friendly Accounting Services](https://www.figma.com/community/file/1498084903136440786/friendly-accounting-services). I did not copy accounting text — I replaced it with Mysogi’s billboard advertising content that my client (Tosin) gave me.

**Technologies I used:**

| Tool | What it does |
|------|----------------|
| **HTML** | Structure of the page (headings, form, links) |
| **Tailwind CSS** | Styling using short class names on HTML elements |
| **TypeScript** | A small script for the contact form |
| **Vite** | Runs a local dev server and bundles files for production |
| **Inter font** | Same font family used in most Figma designs |

---

## 2. Project folder — only what I need

After cleaning up, these are the **only files that matter**:

```
mysogi/
├── index.html          ← The whole webpage structure
├── src/
│   ├── style.css       ← Turns on Tailwind + Inter font
│   └── main.ts         ← Form JavaScript (7 lines)
├── public/
│   ├── world.png       ← Hero image exported from Figma
│   └── favicon.svg     ← Small icon in browser tab
├── package.json        ← Lists npm packages and scripts
├── package-lock.json   ← Auto-generated lock file (do not edit by hand)
├── vite.config.ts      ← Connects Vite + Tailwind
├── tsconfig.json       ← TypeScript settings
└── STUDY_GUIDE.md      ← This file
```

**What I removed (not needed):**

- `icons.svg` — leftover from the default Vite template, never used on my page
- `src/assets/` SVG files — default Vite logos, not part of my design
- Extra README — replaced by this study guide
- Long custom CSS — replaced with **Tailwind classes** in HTML (what my lecturer asked for)

**Folders you can ignore:**

- `node_modules/` — downloaded packages (run `npm install` to create)
- `dist/` — built website after `npm run build` (auto-generated)

---

## 3. How to run the project

Open terminal in the project folder:

```bash
cd "c:\Users\HP USER\Documents\mysogi"
npm install
npm run dev
```

Then open **http://localhost:5173** in the browser.

| Command | Meaning |
|---------|---------|
| `npm install` | Downloads Vite, Tailwind, TypeScript |
| `npm run dev` | Starts live preview; page refreshes when I save files |
| `npm run build` | Creates production files inside `dist/` |
| `npm run preview` | Preview the built `dist/` version |

---

## 4. How the page loads (order of events)

When someone visits the site, this happens:

1. Browser loads **`index.html`**
2. HTML loads **Inter font** from Google Fonts
3. HTML loads **`/src/main.ts`** as a module script
4. **`main.ts`** imports **`style.css`**
5. **`style.css`** has `@import 'tailwindcss'` — Tailwind scans my HTML and generates only the CSS classes I actually used
6. **`main.ts`** attaches a **submit listener** to the form
7. User sees the full styled page

```
index.html  →  main.ts  →  style.css  →  Tailwind CSS output
                ↓
           form listener
```

---

## 5. `index.html` — structure explained

The HTML file is the **skeleton** of the site. I divided it into clear sections.

### 5.1 `<head>` — page setup

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

- `charset` — supports normal letters and symbols
- `viewport` — makes the site look good on mobile phones

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:..." />
```

- Loads **Inter** font from Google (matches Figma)

I do **not** link CSS directly in HTML. CSS comes through `main.ts` → `style.css` so Vite and Tailwind work correctly.

### 5.2 `<body>` — global Tailwind classes

```html
<body class="font-sans text-lg leading-7 text-[#5b6472] antialiased">
```

| Class | Meaning |
|-------|---------|
| `font-sans` | Uses Inter (set in `style.css` `@theme`) |
| `text-lg` | Body text 18px (Figma body size) |
| `leading-7` | Line height 28px |
| `text-[#5b6472]` | Gray body text color from design |
| `antialiased` | Smoother font rendering |

**Bracket colors** like `text-[#5b6472]` are Tailwind **arbitrary values** — I use them when I want the exact hex color from Figma.

### 5.3 Header

```html
<header class="border-b border-slate-200 bg-white">
```

- Top bar with logo **Mysogi** and navigation links
- Links use `href="#form"` etc. — **anchor links** scroll to sections on the same page
- `hover:text-[#2d5bff]` — link turns blue when mouse hovers

### 5.4 Hero section

This is the **first big block** users see.

```html
<section class="bg-[#f0f4ff] py-16 lg:py-24">
```

| Class | Meaning |
|-------|---------|
| `bg-[#f0f4ff]` | Light blue background from Figma |
| `py-16` | Padding top/bottom on mobile |
| `lg:py-24` | More padding on large screens (`lg:` = 1024px and up) |

```html
<div class="... lg:grid-cols-2">
```

- **CSS Grid** with 1 column on phone, **2 columns** on desktop (text left, image right)

**Heading (H1):**

```html
<h1 class="... text-4xl ... lg:text-[52px] lg:leading-[58px]">
```

- Mobile: `text-4xl` (36px)
- Desktop: `52px` — matches Figma hero heading size

**Image:**

```html
<img src="/world.png" ... class="... drop-shadow-lg" />
```

- File lives in `public/world.png`
- In HTML I write `/world.png` — Vite serves `public/` at the site root
- `drop-shadow-lg` — soft shadow so the globe looks nicer on the blue background

**CTA button:**

```html
<a href="#form" class="... bg-[#2d5bff] ... hover:bg-[#2449d4]">
```

- Primary blue button linking down to the form

### 5.5 Lead form section

```html
<section id="form" class="bg-slate-50 py-16 lg:py-20">
```

- `id="form"` — target for `#form` links from header and hero
- Light gray background `bg-slate-50`

**Form card:**

```html
<div class="... rounded-xl border ... shadow-lg ...">
```

- White card centered with `max-w-lg mx-auto`
- `shadow-lg` — elevation so it stands out (design improvement)

**Inputs:**

```html
<input class="... border border-slate-300 ... focus:ring-2 focus:ring-[#2d5bff]/30" />
```

- `focus:ring-2` — blue glow when user clicks in a field
- `required` on inputs — browser blocks submit if empty

**Submit button:**

```html
<button type="submit" class="w-full ... bg-[#2d5bff]">
```

- `w-full` — full width button
- `type="submit"` — triggers form submit event

### 5.6 WhatsApp section

```html
<section id="whatsapp" class="py-16 lg:py-20">
  <div class="... bg-emerald-50 ... ring-1 ring-emerald-100">
```

- Green-tinted box — feels like WhatsApp without being too loud
- Link opens WhatsApp in new tab: `target="_blank"`

```html
href="https://wa.me/2348000000000"
```

- `wa.me` is WhatsApp’s official link format
- **I must replace** `2348000000000` with Mysogi’s real number (country code + number, no + or spaces)

### 5.7 Call section

```html
<section id="call" class="bg-[#1a2b4a] py-16 lg:py-20">
```

- Dark navy background — contrast section at bottom
- White text on dark: `text-white`, `text-[#c5d0e0]` for paragraph

```html
<a href="tel:+2348000000000">
```

- `tel:` link — on phones, tapping opens the dialer

### 5.8 Footer

Simple copyright line with Tailwind `text-sm` and border on top.

---

## 6. Tailwind CSS — how I style with it

**Tailwind idea:** Instead of writing CSS like `.hero { padding: 64px }`, I put utility classes **directly on HTML**.

Example:

```html
<p class="text-lg leading-7 text-[#5b6472]">...</p>
```

equals roughly:

```css
p {
  font-size: 18px;
  line-height: 28px;
  color: #5b6472;
}
```

### 6.1 Classes I use most in this project

| Class | CSS effect |
|-------|------------|
| `mx-auto` | Center block horizontally |
| `max-w-6xl` | Max width ~1152px |
| `px-6` | Padding left/right 24px |
| `py-16` | Padding top/bottom 64px |
| `flex` | Flexbox layout |
| `grid` | Grid layout |
| `gap-10` | Space between grid/flex children |
| `rounded-lg` | Rounded corners 8px |
| `rounded-xl` | Rounded corners 12px |
| `font-semibold` | Font weight 600 |
| `shadow-lg` | Large box shadow |
| `transition` | Smooth hover color change |
| `hover:bg-[#2449d4]` | Darker blue on hover |

### 6.2 Responsive prefix `lg:`

```html
class="text-4xl lg:text-[52px]"
```

- **Default** (mobile first): `text-4xl`
- **From 1024px width up**: `text-[52px]`

Tailwind is **mobile-first** — base classes apply to all sizes unless overridden with `sm:`, `md:`, `lg:`, etc.

### 6.3 Figma sizes I matched

| Element | Tailwind |
|---------|----------|
| H1 desktop | `lg:text-[52px] lg:leading-[58px]` |
| H1 mobile | `text-4xl` |
| H2 | `text-[32px] leading-9` |
| Body | `text-lg leading-7` |
| Labels | `text-sm font-semibold` |
| Buttons | `text-base font-semibold py-3.5` |

### 6.4 Brand colors (from Figma)

| Color | Hex | Used for |
|-------|-----|----------|
| Navy | `#1a2b4a` | Headings, dark section |
| Blue | `#2d5bff` | Primary buttons |
| Blue hover | `#2449d4` | Button hover |
| Gray text | `#5b6472` | Paragraphs |
| Hero bg | `#f0f4ff` | Hero background |
| WhatsApp | `#25d366` | WhatsApp button |

---

## 7. `src/style.css` — only 5 lines

```css
@import 'tailwindcss';

@theme {
  --font-sans: Inter, Arial, sans-serif;
}
```

**What this does:**

1. `@import 'tailwindcss'` — loads Tailwind v4 into the project
2. `@theme { --font-sans: Inter ... }` — when I use `font-sans` in HTML, it uses **Inter**

I keep this file **small** on purpose. Almost all styling is in HTML classes (lecturer requirement).

---

## 8. `src/main.ts` — the only JavaScript

```typescript
import './style.css'

const form = document.getElementById('lead-form') as HTMLFormElement

form.addEventListener('submit', function (e) {
  e.preventDefault()
  alert('Thank you! Your request was sent. We will contact you soon.')
  form.reset()
})
```

**Line by line:**

| Line | Explanation |
|------|-------------|
| `import './style.css'` | Tells Vite to load Tailwind CSS into the page |
| `getElementById('lead-form')` | Finds the `<form id="lead-form">` in HTML |
| `as HTMLFormElement` | TypeScript type so TS knows it is a form |
| `addEventListener('submit', ...)` | Runs code when user clicks submit |
| `e.preventDefault()` | Stops browser from reloading the page |
| `alert(...)` | Shows a thank-you popup (simple for a school project) |
| `form.reset()` | Clears the input fields after submit |

**Why I used `preventDefault`:**  
Without it, the form would try to send data to a server URL and refresh the page. We have no backend yet, so I handle it in JavaScript instead.

**Later improvement (optional):** Send data to WhatsApp or an email API instead of `alert`.

---

## 9. `vite.config.ts` — build tool setup

```typescript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

- **Vite** = fast dev server and bundler
- **tailwindcss()** plugin = processes Tailwind when I save files

Without this plugin, `@import 'tailwindcss'` in CSS would not work — **the page would look plain/unstyled**.

Also in `style.css` I added `@source '../index.html'` so Tailwind scans my HTML file for class names.

---

## 10. `package.json` — dependencies

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview"
}
```

**Dependencies:**

- `vite` — dev server
- `tailwindcss` + `@tailwindcss/vite` — styling
- `typescript` — checks `main.ts` for errors

No React, no extra libraries — keeps the project simple.

---

## 11. `tsconfig.json` — TypeScript config

Tells TypeScript to check files in `src/` folder. Settings like `strict` help catch mistakes. I only have one TS file, so this is minimal.

---

## 12. What I did step by step (project story)

This is the workflow I followed — useful if my lecturer asks **“how did you build this?”**

1. **Got the brief** — Convert Figma UI to a webpage for Mysogi billboard advertising.
2. **Opened the Figma template** — Friendly Accounting Services (community file).
3. **Copied the content** Tosin sent (headings, form labels, CTA text, WhatsApp section, call section).
4. **Exported the globe image** from Figma → saved as `public/world.png`.
5. **Created the project** with Vite (`npm create vite`).
6. **Installed Tailwind** (`tailwindcss`, `@tailwindcss/vite`).
7. **Wrote `index.html`** — header, hero, form, WhatsApp, call, footer.
8. **Styled with Tailwind classes** — colors and font sizes matched to Figma (Inter, 52px hero, 32px section titles).
9. **Wrote `main.ts`** — simple form handler with alert.
10. **Removed unused files** — default icons and assets not part of my design.
11. **Tested** with `npm run dev` on desktop and mobile width in browser dev tools.

---

## 13. Section map — client content to HTML

| Client / Tosin content | Where on page |
|------------------------|---------------|
| Main heading (Affordable Nationwide Billboard…) | Hero `<h1>` |
| Subheading (Drive brand awareness…) | Hero `<p>` |
| CTA: Start Your Billboard or Digital… | Hero `<a href="#form">` |
| Form: Request Billboard Rates… | Form `<h2>` |
| Fields: Full Name, Email, Phone | `<input>` elements |
| Button: Launch My Billboard Campaign | `<button type="submit">` |
| WhatsApp heading + text + Speak With an Ad Expert | `#whatsapp` section |
| Call heading + text + Call Now | `#call` section |

---

## 14. Things I should change before going live

1. **WhatsApp number** in `index.html` → `https://wa.me/YOUR_REAL_NUMBER`
2. **Phone number** in `index.html` → `tel:+234...`
3. Replace `alert()` with real form handling if backend is added later
4. Add real Mysogi logo image if they provide one (replace text logo)

---

## 15. Quick revision quiz (test yourself)

1. Which file has the form HTML? → `index.html`
2. Where are Tailwind classes written? → On HTML elements in `index.html`
3. Why does `main.ts` import `style.css`? → So Vite loads Tailwind
4. Where is `world.png` stored? → `public/world.png`
5. What does `e.preventDefault()` do? → Stops page reload on form submit
6. What does `lg:grid-cols-2` do? → Two columns on large screens
7. What command starts the dev server? → `npm run dev`

---

## 16. If something breaks

| Problem | Fix |
|---------|-----|
| Page has no styling | Run `npm install`, make sure `main.ts` imports `./style.css` |
| Image not showing | Check `public/world.png` exists |
| `npm run dev` fails | Delete `node_modules`, run `npm install` again |
| TypeScript error | Check `main.ts` — form id must be `lead-form` in HTML |

---

*End of study guide. Open `index.html` and this file side by side while reading.*
