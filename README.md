# Danyal Yasheikh — Portfolio

Personal portfolio and searchable public project archive, published at https://danyallya.github.io/.

## Run locally

Serve this directory with any static HTTP server, for example `python -m http.server 4173`, then visit `http://localhost:4173`.

No build step, framework, runtime API request, analytics or external font service is required. The bundled catalogue remains available if the GitHub API is unavailable.

## Update the public project archive

With Node.js 18 or newer, run `node scripts/refresh-catalog.mjs`. This reads only GitHub's public user-repositories endpoint, excludes forks and the profile/portfolio repositories, and regenerates `repositories.json` and `projects.js`. Review and commit both files. Run `node scripts/build-catalog.mjs` to regenerate from the saved snapshot without network access.

Years come from repository names. Categories are editorial groupings. Detailed featured descriptions come from public project READMEs; generic descriptions identify category and repository language without claiming unverified functionality.

## Publishing

GitHub Pages serves the repository root on the existing `master` branch. Current entry points are `index.html`, `portfolio.css`, `portfolio.js` and `projects.js`. `.nojekyll` keeps delivery static. Historical assets are retained; obsolete demo paths have been replaced with public source links.

The original gallery preview illustrates the legal template collection. The MileMaster image comes from its public repository. Source availability is not a reuse license; check each project's license.
