# DSA Analytics Dashboard — Product & Engineering Specification

## 1. Project Overview

Build a polished, responsive web platform that visualizes and explores the DSA solutions in this GitHub repository:

- **Repository:** https://github.com/akt9802/DSA-Submissions
- **Project name:** DSA Analytics Dashboard
- **Primary goal:** Turn a repository of coding submissions into an attractive, data-driven dashboard that showcases problem-solving progress, topics, activity, and individual solutions.
- **Audience:** The repository owner, recruiters, and anyone viewing the public portfolio.

The platform should use real repository data wherever possible. Do not invent statistics or present placeholder numbers as verified results.

## 2. Product Principles

1. **Accuracy first:** Clearly distinguish unique problems, solution files, commits, and activity days. These metrics are not interchangeable.
2. **Repository-driven:** The repository is the source of truth for submitted solutions. Avoid manually maintaining dashboard counts.
3. **Progressive implementation:** Start with a useful MVP and a simple data pipeline. Add external APIs or persistence only when needed.
4. **Fast and accessible:** Use responsive layouts, accessible controls, keyboard navigation, and good loading/empty/error states.
5. **Maintainable code:** Use reusable components, typed data models, and clear separation between data extraction, business logic, and UI.
6. **Honest metadata:** If difficulty, topic, or original solve date cannot be established reliably, show “Unknown” rather than guessing.

## 3. Recommended Technology Stack

- **Framework:** Next.js using the App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI components:** shadcn/ui where useful
- **Charts:** Recharts
- **Icons:** Lucide React
- **Code display:** `react-syntax-highlighter` or another maintained syntax-highlighting library
- **Initial data source:** A generated JSON index derived from repository files and Git history
- **Optional later integration:** GitHub REST API for repository metadata and commits
- **Deployment target:** Vercel or another platform that supports Next.js

Start without a database. Use generated JSON data for the first version. Consider a database only if the product later needs user accounts, editable profiles, persistent snapshots, or other database-backed features.

## 4. Data Ingestion and Repository Analysis

Inspect the actual repository structure before implementing assumptions. The repository may have nested topic folders and submission filenames such as `submission-0.py` or `submission-0.ts`. Do not assume every file follows one naming convention or that every solution is C++.

### Data ingestion requirements

Create a repeatable script that:

1. Reads solution files from the repository.
2. Skips irrelevant files such as generated output, dependency folders, binaries, and `.git`.
3. Extracts the relative file path, file extension/language, folder/topic, and source code reference.
4. Identifies problem names and problem IDs from directory names or known metadata when possible.
5. Uses an explicit metadata map for information that cannot be inferred reliably.
6. Optionally reads Git history to derive commit activity by date.
7. Deduplicates problems separately from solution files and commits.
8. Produces a validated JSON index for the Next.js app.
9. Reports unclassified or ambiguous files so they can be mapped later.
10. Can be rerun whenever the repository changes.

Do not parse source code with fragile regular expressions to infer algorithm correctness. Treat source files as source files and use metadata for problem names, difficulty, and canonical links.

### Data integrity rules

- A **solution file** is not necessarily a unique problem.
- A **commit** is not necessarily a newly solved problem.
- A **commit date** is not necessarily the date a problem was originally solved.
- A GitHub contribution count is not equivalent to the number of DSA problems solved.
- Do not claim a live LeetCode or NeetCode count unless it comes from a verified, supported source.
- Label estimates and unknown metadata explicitly.
- Never hardcode example stats as if they were real.

### Suggested data model

Create TypeScript types equivalent to the following and adapt them to the actual repository:

```ts
export type Difficulty = "Easy" | "Medium" | "Hard" | "Unknown";

export interface Solution {
  id: string;
  filePath: string;
  language: string;
  codeUrl?: string;
}

export interface Problem {
  id: string;
  name: string;
  topic: string;
  difficulty: Difficulty;
  platform?: string;
  problemUrl?: string;
  solutions: Solution[];
}

export interface ActivityDay {
  date: string; // YYYY-MM-DD
  commitCount: number;
}

export interface RepositoryStats {
  totalUniqueProblems: number;
  totalSolutionFiles: number;
  totalCommits: number;
  totalActiveDays: number;
  languageCounts: Record<string, number>;
  topicCounts: Record<string, number>;
  difficultyCounts: Record<Difficulty, number>;
  activity: ActivityDay[];
  lastUpdated: string;
}
```

Adapt the model when inspection reveals a better fit. The app must handle unknown topics, unknown difficulty, missing links, and duplicate submissions gracefully.

## 5. Core Dashboard Experience

Build a modern developer dashboard with a strong visual hierarchy. Default to a dark theme with a clean, GitHub-inspired aesthetic, while keeping contrast and accessibility in mind.

### A. Header

- Project name and simple logo/icon
- Navigation to Dashboard, Problems, and About/Repository
- Link to the original GitHub repository
- Last-updated timestamp for generated data
- Optional theme toggle

### B. Overview cards

Show data-derived metrics such as:

- Unique problems identified
- Total solution files
- Total commits (if Git history is available)
- Active days (based on available commit history)
- Number of programming languages represented

Each card should have a concise label and, where useful, a tooltip explaining exactly what is counted. Never display unverified sample values.

### C. Activity heatmap

- A GitHub-style calendar heatmap showing daily commit activity.
- Use Git history or a verified API source.
- Include a tooltip with date and commit count.
- Include a legend and accessible text alternative.
- If activity data is unavailable, show a helpful empty state rather than a fabricated heatmap.
- Explain that commits measure repository activity, not necessarily new problems solved.

### D. Topic analytics

- Bar chart or other readable chart for solution counts by topic.
- Include an “Unknown / Unclassified” category.
- Allow users to select a topic and navigate to matching problems.
- Do not infer topic names solely from vague source-code patterns.

### E. Difficulty breakdown

- Visualize Easy, Medium, Hard, and Unknown counts.
- Count unique problems, not raw files, when the chart is labelled “problems.”
- Make the metric definition clear.
- Do not assign difficulty without trustworthy metadata.

### F. Language distribution

- Show solution file counts by programming language.
- Derive languages from file extensions, with an explicit mapping and an “Other/Unknown” fallback.
- Do not assume all submissions are C++.

### G. Recent repository activity

- Display recent commits or recent file updates when data is available.
- Clearly label these as repository activity.
- Link to the corresponding commit or file when a valid URL exists.

## 6. Problem Explorer

Create a searchable, filterable problems page.

### Required features

- Search by problem name, ID, topic, or file path.
- Filter by topic.
- Filter by difficulty.
- Filter by programming language.
- Sort by name, topic, or other fields supported by the data.
- Show a useful result count.
- Provide a clear-filters action.
- Include pagination or efficient list rendering if the dataset is large.
- Support loading, empty, and error states.
- Make filters usable on mobile.

Each problem row/card should show, when available:

- Problem name
- Topic
- Difficulty
- Language(s)
- Number of solution files
- Link to the source file on GitHub
- Link to the original problem statement, only if verified

Avoid duplicate rows for multiple files that belong to the same problem. When grouping is uncertain, show the records transparently rather than merging unrelated submissions.

## 7. Solution Detail / Code Viewer

Create a detail view or modal for an individual solution.

- Display problem name and available metadata.
- Show the source code with syntax highlighting based on the language.
- Include a link to open the original source file on GitHub.
- Display topic, difficulty, and complexity only when known or explicitly authored.
- Allow copying code.
- Handle missing or inaccessible code gracefully.
- Do not claim that a solution was tested or correct unless it has actually been tested.
- Never execute repository code on the server as part of displaying it.

If code is loaded from generated local JSON, consider whether including all source text in the initial client bundle would be too large. Prefer loading code on demand or linking directly to GitHub when appropriate.

## 8. About / Repository Information

Include a short page or section explaining:

- What the dashboard represents
- Which repository powers it
- How statistics are calculated
- What “problem,” “solution file,” “commit,” and “active day” mean
- When the data was last generated
- Known limitations in metadata and activity history

Include a clear GitHub repository link:
https://github.com/akt9802/DSA-Submissions

## 9. Suggested Routes and Project Structure

Use the Next.js App Router. Adjust the exact structure as appropriate after inspecting the starter project.

```text
app/
  layout.tsx
  page.tsx                  # Dashboard overview
  problems/
    page.tsx                # Search and filter
    [id]/
      page.tsx              # Problem/solution details
  about/
    page.tsx
  globals.css

components/
  layout/
    site-header.tsx
    site-footer.tsx
  dashboard/
    stat-card.tsx
    activity-heatmap.tsx
    topic-chart.tsx
    difficulty-chart.tsx
    language-chart.tsx
    recent-activity.tsx
  problems/
    problem-filters.tsx
    problem-list.tsx
    problem-card.tsx
    solution-viewer.tsx
  ui/                       # shadcn/ui components, if used

lib/
  data/
    load-data.ts
    schema.ts
    generated-data.json
  analytics/
    calculate-stats.ts
    group-problems.ts
  github/
    urls.ts

scripts/
  build-dsa-index.ts        # Reads repository files and generates data
  README.md                 # Optional script usage notes

public/
  # Static assets if needed

tests/
  # Tests for parsing, deduplication, and metric calculations
```

The generated JSON can live in a different directory if that better fits the implementation. Keep generated data separate from handwritten application code.

## 10. Visual Design Requirements

- Modern, minimal, polished developer-tool aesthetic.
- Dark navy/charcoal background by default, with restrained accent colors.
- Clear typographic hierarchy and consistent spacing.
- Cards with subtle borders and restrained shadows.
- Responsive dashboard grid.
- Charts with readable axes, legends, and tooltips.
- Avoid excessive gradients, glow effects, and visual clutter.
- Avoid large decorative illustrations that distract from the data.
- Use skeletons only for genuinely asynchronous loading.
- Respect reduced-motion preferences.
- Ensure text and interactive controls have sufficient contrast.
- Make the dashboard useful at desktop, tablet, and mobile widths.

## 11. Technical Requirements

- Use TypeScript types for all important data structures and component props.
- Prefer server components for static/server-side data rendering; use client components only where interaction requires them.
- Keep filtering and search responsive.
- Validate generated data and fail with a useful error message if the data format is invalid.
- Do not expose GitHub tokens or other secrets in client-side code.
- If GitHub API access is added, use server-side environment variables and respect rate limits.
- Avoid unnecessary API calls on each page render.
- Include a clear fallback if the API is unavailable.
- Add metadata and sensible page titles.
- Add basic tests for data parsing, deduplication, and analytics calculations.
- Ensure linting, type-checking, and production build pass.

## 12. MVP Scope and Implementation Order

Implement in this order:

### Phase 1 — Inspect and model the data

1. Inspect the existing workspace and repository structure.
2. Inspect the DSA repository's real files and README.
3. Identify actual naming patterns, folder taxonomy, file extensions, and available Git history.
4. Decide how to group files into problems and record ambiguous cases.
5. Define the typed schema and create a repeatable index-generation script.
6. Validate the generated counts against the source repository.

### Phase 2 — Build the dashboard

1. Initialize or adapt the Next.js App Router project.
2. Add Tailwind CSS and the selected UI/chart libraries.
3. Build the site layout and responsive header.
4. Add overview cards using real calculated statistics.
5. Add topic, difficulty, and language charts.
6. Add the activity heatmap only if reliable activity data exists.
7. Add loading, empty, and error states.

### Phase 3 — Problem explorer and solutions

1. Build the searchable/filterable problem list.
2. Implement topic, difficulty, and language filters.
3. Add solution detail pages or a code viewer.
4. Add source links and copy-code functionality.
5. Test duplicate handling and unknown metadata.

### Phase 4 — Quality and deployment

1. Test mobile layouts and keyboard accessibility.
2. Add unit tests for metrics and data grouping.
3. Run lint, TypeScript checks, and production build.
4. Add setup and data-refresh instructions to the README.
5. Deploy to Vercel or another compatible host.
6. Verify that the deployed dashboard reflects the generated data.

Do not implement every optional feature before the MVP works end to end.

## 13. Future Enhancements (Not Required for MVP)

Keep these out of the critical path unless the core dashboard is complete:

- Automated scheduled repository sync
- GitHub Actions workflow to regenerate JSON on pushes
- Historical snapshots for trend charts
- User profiles and multiple repositories
- Verified integration with external problem-solving platforms
- Custom tags and manually curated metadata
- Exportable stats cards for LinkedIn or social media
- Shareable filtered views
- SEO improvements and Open Graph preview cards

## 14. Acceptance Criteria

The first version is complete when:

- [ ] The app runs locally using documented commands.
- [ ] The dashboard is responsive and visually polished.
- [ ] All displayed statistics are calculated from actual data.
- [ ] Unique problems and solution files are counted separately.
- [ ] Unknown difficulty/topic values are represented honestly.
- [ ] The language distribution is derived from actual file types.
- [ ] The activity heatmap uses real commit activity or displays an honest empty state.
- [ ] Users can search and filter the problem list.
- [ ] Source links point to real files in the correct GitHub repository.
- [ ] The solution viewer handles missing metadata and source errors.
- [ ] No secret token is shipped to the browser.
- [ ] Type-checking, linting, and production build succeed.
- [ ] The README explains setup, data generation, metric definitions, and deployment.

## 15. Instructions to the Coding Agent

Work directly in the current IDE workspace.

Before writing substantial code:

1. Inspect the existing files and determine whether a Next.js project already exists.
2. Inspect the actual DSA repository and README. Do not rely on guessed file paths or assumed counts.
3. Summarize the discovered repository structure and any data-quality limitations.
4. Propose a short implementation plan based on the actual data.

Then implement the MVP end to end. Make reasonable engineering decisions without repeatedly asking for approval. If network access to GitHub is unavailable, explain that limitation and implement the ingestion script so it can run against a local clone of the repository.

Do not stop at a static mockup. Connect every displayed metric to the data layer. Do not fabricate statistics, links, problem names, difficulty labels, or activity records. If some data cannot be derived reliably, display “Unknown,” omit the metric, or provide a clearly labelled empty state.

At the end, report:

- What was implemented
- The key files created or changed
- How to run the app
- How to refresh repository data
- Any limitations or metadata that still needs manual mapping
- Results of lint, type-check, tests, and production build
