# Maya Delacroix — Portfolio (Vue 3 + Vite)

This is the componentized version of the single-file portfolio, rebuilt with Vue 3
(`<script setup>`) and Vite. Same design (sidebar + bento grid), same behavior
(command palette, project modal, tilt/reveal, marquee, testimonial carousel,
contact form) — just split into reusable pieces.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## Project structure

```
vue-portfolio/
├── index.html                  Vite entry HTML (loads Font Awesome + fonts)
├── package.json
├── vite.config.js
└── src/
    ├── main.js                 Creates the app, installs the router, registers v-tilt/v-reveal
    ├── App.vue                 Root: sidebar + <router-view> + global overlays
    ├── router/
    │   └── index.js             Route table: / , /projects , /contact
    ├── assets/
    │   └── main.css            Design tokens (CSS vars) + all shared component styles
    │
    ├── pages/                  One component per "page" (page switch, not routing)
    │   ├── HomePage.vue         Hero, tools marquee, About/Skills bento grid
    │   ├── ProjectsPage.vue     Project bento grid + stacked mini cards
    │   └── ContactPage.vue      Form + info cards
    │
    ├── components/
    │   ├── layout/
    │   │   └── TheSidebar.vue          Avatar, socials, page nav, ⌘K trigger
    │   ├── common/                     Shared across pages
    │   │   ├── BentoCard.vue           Generic card shell (icon/eyebrow/slot, tilt+reveal)
    │   │   ├── StatusBadge.vue         Pulsing "open to work" badge
    │   │   ├── ToolsMarquee.vue        Auto-scrolling tools strip
    │   │   ├── CommandPalette.vue      ⌘K overlay (search + navigate + actions)
    │   │   ├── ProjectModal.vue        Project quick-view overlay
    │   │   ├── MockBrowser.vue         Decorative browser-window preview
    │   │   ├── MockBlueprint.vue       Decorative pipeline/diagram preview
    │   │   ├── MockStack.vue           Decorative fanned-card preview
    │   │   └── MockPhones.vue          Decorative phone-pair preview
    │   ├── home/
    │   │   ├── HeroSection.vue         Status badge + typewriter role + headline + stats
    │   │   ├── StatRow.vue             Animated count-up stats
    │   │   └── TestimonialCarousel.vue Auto-rotating testimonial slider
    │   ├── work/
    │   │   ├── ProjectCard.vue         Bento card + mock preview + opens modal
    │   │   └── StackList.vue           The 3 small stacked project cards
    │   └── contact/
    │       └── ContactForm.vue         Lead form -> opens a pre-filled mailto
    │
    ├── composables/            Reusable reactive logic
    │   ├── useNavigation.js            Thin wrapper around vue-router (currentPage + goTo)
    │   ├── useProjectModal.js          Shared modal open/close + selected project
    │   ├── useCommandPalette.js        Shared palette state + global ⌘K/Esc shortcut
    │   ├── useTypewriter.js            Cycles through an array of words
    │   ├── useCounter.js               Animated count-up to a target number
    │   ├── useReveal.js                v-reveal directive (staggered scroll-in)
    │   └── useTilt.js                  v-tilt directive (3D hover tilt)
    │
    └── data/                   Plain content — edit these to make the site yours
        ├── tools.js                    "Daily drivers" pills
        ├── stats.js                    Hero stat counters
        ├── testimonials.js             Testimonial quotes
        ├── services.js                 Services list on the Home page
        ├── social.js                   Social links (sidebar + contact page)
        ├── projects.js                 Main + mini project cards
        └── commands.js                 Command palette entries + contact email
```

## Notes on the architecture

- **Real URL routing**, via `vue-router` (`src/router/index.js`): `/`, `/projects`,
  `/contact`. `useNavigation()` is a thin wrapper around `useRoute`/`useRouter`
  so components don't import `vue-router` directly. Because it uses
  `createWebHistory` (clean URLs, no `#`), static hosts need a rewrite rule for
  deep links to work on refresh — `vercel.json` and `public/_redirects` are
  included for Vercel and Netlify; most other static hosts have an equivalent
  "SPA fallback to index.html" setting.
- **No global CSS framework.** All styling lives in `src/assets/main.css` as
  plain CSS with custom properties, imported once in `main.js` — components stay
  focused on markup/behavior rather than re-declaring styles.
- **Two custom directives** (`v-tilt`, `v-reveal`) replace the manual
  `querySelectorAll` + event-listener loops from the vanilla version. Because
  the router mounts a fresh page component on navigation, the staggered reveal
  animation "just works" again each time you land on a page — no manual
  re-trigger needed.
- **Composable singletons** (`useProjectModal`, `useCommandPalette`) hold
  shared state with a plain `reactive()` object at module scope. It's the
  lightest option for state this small; for a bigger app, promote these to
  Pinia stores.
- To edit content, you generally only need to touch files in `src/data/` —
  the components read from there.
