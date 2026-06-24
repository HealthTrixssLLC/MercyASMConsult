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

# Extracting embedded screenshots from an email PDF

When a client emails analysis screenshots (Excel views, charts) inside an Outlook
PDF and asks for the page narrative to be "backed by the screenshots", pull the
*embedded* images rather than rendering whole pages:
- `pdfimages -list input.pdf` to see embedded images (width/height tells you which
  are real screenshots vs logos/icons/smasks — skip tiny ones and the HEALTHTRIXSS
  logo strip).
- `pdfimages -png input.pdf /tmp/out/s` extracts each as a PNG at native resolution.
- Read the PNGs with the image tool to label them before use.
- Copy the keepers into `attached_assets/` with descriptive names, import via the
  `@assets` alias, embed with a click-to-open `<a target="_blank">` + descriptive
  `alt` + caption (a small `Figure` component).
