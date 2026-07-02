# Swayam Desai — Portfolio

A fast, self-contained portfolio site (no build step, no framework) showcasing
production ML / AI engineering projects. Dark, premium theme built with hand-written
HTML + CSS + vanilla JS.

## Structure

```
portfolio/
├── index.html                     # Home: hero, project grid, skills, about, contact
├── styles.css                     # Shared design system (tokens, components)
├── projects.css                   # Case-study page styles
├── main.js                        # Nav, scroll reveal, metric count-up
├── favicon.svg
└── projects/                      # One case-study page per project
    ├── icd10-rag.html
    ├── agentforge.html
    ├── demand-forecasting.html
    ├── job-market-intelligence.html
    ├── crypto-anomaly-mlops.html
    └── ai-study-notes.html
```

Each project card on the home page links to a dedicated case study with the workflow,
results, engineering decisions, and stack — written from the actual repo code.

## Preview locally

```bash
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages (recommended)

1. Create a repo named **`SwayamDesai.github.io`** (a user site publishes at the root domain).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/SwayamDesai/SwayamDesai.github.io.git
   git push -u origin main
   ```
3. GitHub → repo **Settings → Pages → Source: Deploy from a branch → `main` / root**.
4. Live in ~1 minute at **https://swayamdesai.github.io**.

> Prefer a project repo (e.g. `portfolio`) instead of the user site? It works the same;
> the URL becomes `https://swayamdesai.github.io/portfolio/`. All links here are relative,
> so both work with no changes.

### Vercel / Netlify (alternative)

Drag-and-drop this folder, or connect the repo. No build command; output directory is `.`.

## Before you publish — optional

- **LinkedIn** — set to `https://www.linkedin.com/in/swayam-desai/` (contact button + footer). ✓
- **Email** — set to `desaiswayam71@gmail.com` throughout; change if needed.
- Optional: add a `resume.pdf` to the root and link it from the hero if you want a CV download.

## Notes

- Fully responsive (375 / 768 / 1024 / 1440), respects `prefers-reduced-motion`,
  keyboard-accessible, WCAG-conscious contrast.
- Only external dependency is Google Fonts (Inter + JetBrains Mono).
