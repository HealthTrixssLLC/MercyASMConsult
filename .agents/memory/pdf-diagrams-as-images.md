---
name: source architecture diagrams as PDF images
description: How to present client-supplied architecture/workflow diagrams in the engagement-portal app.
---

# Source architecture diagrams — embed, don't rebuild

When a discussion page needs to show an architecture/workflow diagram that the
client supplied in a PDF (e.g. Mercy current/future state), render the PDF page
to a high-res PNG and embed it as an `<img>` — do NOT reconstruct it as a custom
React/CSS component.

**Why:** an attempt to re-create the future-state diagram as a custom animated
component was rejected — the client's original PDF artwork was clearer and more
authoritative. They want their exact images integrated faithfully.

**How to apply:**
- Render with `pdftoppm -png -r 200 -f <page> -l <page> input.pdf out` (pdftoppm
  and pdftocairo are available; ~200 DPI ≈ 2600px wide, matches their exports).
- Put the PNG in `attached_assets/` and import via the `@assets` alias (Vite
  bundles it; `attached_assets/` is NOT served directly).
- Wrap in a click-to-open-full-size anchor (`target="_blank"`) and give a
  descriptive `alt` since these diagrams are dense.
