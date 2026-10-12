import fs from 'node:fs';
const root = new URL('../', import.meta.url);
const repositories = JSON.parse(fs.readFileSync(new URL('repositories.json', root), 'utf8').replace(/^\uFEFF/, ''));
const categories = [
  ['Dashboards', /admin|dashboard|management|invoice|MileMaster/i],
  ['Platforms', /platform|marketplace|auction|customer|loyality|social|streaming|library/i],
  ['Travel & automotive', /car[234]?-|flight|transit|tourism|searate/i],
  ['Food & hospitality', /food|restaurant|paliz|bagh|hypermarket/i],
  ['Education', /education|learning|learn|course|training|university|student|roboskill|Bozorg/i],
  ['Business & legal', /lawyer|company|corporation|bimeh|Enar/i],
];
const descriptions = {
  'MileMaster-React-2025': 'React mileage dashboard with an animated progress indicator and live numeric input.',
  'ahangtone-music-streaming-platform': 'A social music streaming project with shared playlists and community interactions.',
  'kamkar-job-matching-platform': 'HTML, CSS and jQuery interfaces for employers and job seekers.',
  'Lawyer_Templates_Browser': 'A central browser for a collection of legal website templates.',
};
const projects = repositories.filter(repo => !repo.fork && !['danyallya','danyallya.github.io'].includes(repo.name)).map(repo => {
  const category = categories.find(([, pattern]) => pattern.test(repo.name))?.[0] || 'Experiments & forms';
  const year = repo.name.match(/(?:19|20)\d{2}/)?.[0] || null;
  const title = repo.name.replace(/[-_]/g, ' ').replace(/\b(?:19|20)\d{2}\b/g, '').replace(/\s+/g, ' ').trim().replace(/\b\w/g, c => c.toUpperCase());
  return { name: repo.name, title, category, year: year ? Number(year) : null, language: repo.language, description: descriptions[repo.name] || repo.description || `${category} · Public ${repo.language || 'source'} project.`, url: repo.html_url };
});
fs.writeFileSync(new URL('projects.js', root), `// Generated from the public-only snapshot in repositories.json.\nwindow.PUBLIC_PROJECTS = ${JSON.stringify(projects, null, 2)};\n`);
console.log(`Generated ${projects.length} public projects across ${new Set(projects.map(p => p.category)).size} categories.`);
