---
name: animated diagram accessibility pattern
description: Required pattern for any auto-advancing/always-on animated diagram in the engagement-portal app (WCAG 2.2.2 Pause/Stop/Hide).
---

# Animated diagram accessibility pattern

Any always-on or auto-advancing animation (JS-driven stage cycling, CSS flowing
connectors, pulsing icons) MUST ship with all three of these, or it fails review:

1. **A visible pause/play control** — a real `<button>` with `aria-pressed`,
   not just a hover affordance. Toggles a `playing` state.
2. **Reduced-motion gating** — a `usePrefersReducedMotion()` hook
   (synchronous lazy `useState` init from `matchMedia`, plus a `change`
   listener). `playing` defaults to `!reduced` and re-syncs via effect.
   Any `setInterval` early-returns when `!playing`. CSS side: a `.motion-paused`
   wrapper class sets `animation-play-state: paused` on the animated pseudo-
   elements, and an `@media (prefers-reduced-motion: reduce)` block kills the
   animations outright.
3. **A text equivalent** — `role="img"` + descriptive `aria-label` on the
   diagram container, plus an `sr-only` list enumerating the stages/content so
   screen-reader users get the same information.

**Why:** an architect review failed the June 17 animated workflow diagram on
WCAG 2.2.2 for lacking exactly these. Reference implementation lives in the
`FutureStateFlow` / `CurrentStateFlow` components and the `.motion-paused`
rules in `index.css`.

**How to apply:** reuse this triad for every new animated diagram instead of
re-deriving it; copy the hook + `MotionToggle` from the architecture-flow
component.
