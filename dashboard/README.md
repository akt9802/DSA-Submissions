# DSA Analytics Dashboard

A polished, data-driven Next.js dashboard that visualises the DSA problem-solving journey from [akt9802/DSA-Submissions](https://github.com/akt9802/DSA-Submissions) — a NeetCode.io GitHub sync repository.

---

## Features

- **Overview stats** — unique problems, solution files, total commits, active days, languages
- **Activity heatmap** — GitHub-style calendar derived from real Git history
- **Topic & difficulty charts** — bar and pie charts from curated metadata
- **Problem explorer** — searchable, filterable list with topic / difficulty / language filters
- **Solution viewer** — syntax-highlighted code viewer with copy button and GitHub link
- **About page** — metric definitions, data-generation process, known limitations

---

## Tech Stack

| Concern | Library |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Charts | Recharts |
| Icons | Lucide React |
| Syntax highlighting | react-syntax-highlighter |
| Tests | Vitest |

---

## Getting Started

### Prerequisites

- Node.js 20+
- The repository must be cloned alongside `DSA-Submissions/`

### Directory layout

```
DSA-Submissions/
  Data Structures & Algorithms/   ← solution files
  dashboard/                      ← this Next.js project
    lib/data/generated-data.json  ← auto-generated, do not edit manually
    scripts/build-dsa-index.js    ← data generation script
```

### Install dependencies

```bash
cd dashboard
npm install
```

### Generate data

This step reads the parent repository and writes `lib/data/generated-data.json`:

```bash
npm run generate-data
```

Re-run this whenever new solutions are pushed to the repository.

### Development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

---

## Refresh Repository Data

After pulling new submissions from GitHub:

```bash
# 1. Pull latest solutions
git -C .. pull

# 2. Regenerate the JSON index
npm run generate-data

# 3. Rebuild the app
npm run build
```

For automated refresh, consider adding a GitHub Action that runs these steps on push.

---

## Running Tests

```bash
npm test
```

All 17 unit tests cover data parsing, submission index parsing, slug conversion, problem filtering, and stats calculations.

---

## TypeScript Check

```bash
npm run typecheck
```

---

## Metric Definitions

| Metric | Definition |
|---|---|
| **Unique Problems** | Distinct problem folders in the repository |
| **Solution Files** | Total submission files across all problems |
| **Total Commits** | Git commits in the repository (not equivalent to unique problems) |
| **Active Days** | Days with ≥ 1 commit |
| **Difficulty** | From a curated metadata map based on NeetCode.io classifications |
| **Topic** | From the same metadata map |

---

## Adding Metadata for New Problems

If a newly synced problem shows "Unknown" difficulty or topic, add an entry to:

```
lib/data/metadata.ts   → PROBLEM_METADATA object
scripts/build-dsa-index.js → PROBLEM_METADATA object (keep in sync)
```

Then re-run `npm run generate-data` and rebuild.

---

## Known Limitations

- All current solutions are C++. The dashboard handles other languages but the repository currently contains only C++ files.
- Difficulty and topic are curated manually; new problems appear as "Unknown" until mapped.
- Commit dates reflect when solutions were pushed to GitHub, not when they were originally solved on NeetCode.
- No live connection to NeetCode.io or LeetCode APIs — all data comes from the local repository.

---

## Deployment

Deploy to [Vercel](https://vercel.com):

1. Push the `dashboard/` directory (or the entire `DSA-Submissions` repo) to GitHub.
2. Import the project into Vercel, setting the root directory to `dashboard/`.
3. Add a build command: `node scripts/build-dsa-index.js && next build`
4. Deploy.

For auto-refresh on new submissions, add a GitHub Action that triggers a Vercel redeploy on pushes to `main`.
