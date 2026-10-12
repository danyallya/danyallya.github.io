import fs from 'node:fs';
const repos = [];
for (let page = 1; ; page++) {
  const response = await fetch(`https://api.github.com/users/danyallya/repos?per_page=100&page=${page}`, { headers: { Accept: 'application/vnd.github+json' } });
  if (!response.ok) throw new Error(`GitHub API: ${response.status}. Existing snapshot was preserved.`);
  const batch = await response.json();
  repos.push(...batch.filter(repo => !repo.private).map(({ name, description, html_url, homepage, language, fork, archived, default_branch, topics }) => ({ name, description, html_url, homepage, language, fork, archived, default_branch, topics })));
  if (batch.length < 100) break;
}
fs.writeFileSync(new URL('../repositories.json', import.meta.url), JSON.stringify(repos, null, 2) + '\n');
await import('./build-catalog.mjs');
