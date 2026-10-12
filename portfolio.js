'use strict';
const grid = document.querySelector('#project-grid');
const search = document.querySelector('#search');
const sort = document.querySelector('#sort');
const filters = document.querySelector('#filters');
const projects = window.PUBLIC_PROJECTS || [];
let category = 'All';
const categories = ['All', ...new Set(projects.map(project => project.category))];
for (const name of categories) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = name;
  button.setAttribute('aria-pressed', String(name === category));
  button.addEventListener('click', () => {
    category = name;
    for (const sibling of filters.children) sibling.setAttribute('aria-pressed', String(sibling === button));
    render();
  });
  filters.append(button);
}
function element(tag, text, className) {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  return node;
}
function render() {
  const query = search.value.trim().toLowerCase();
  const matches = projects.filter(project => (category === 'All' || project.category === category) && `${project.name} ${project.title} ${project.language} ${project.category} ${project.description}`.toLowerCase().includes(query));
  matches.sort((a,b) => sort.value === 'year' ? (b.year || 0) - (a.year || 0) || a.title.localeCompare(b.title) : a.title.localeCompare(b.title));
  const fragment = document.createDocumentFragment();
  for (const project of matches) {
    const card = document.createElement('a');
    card.className = 'archive-card';
    card.href = project.url;
    const top = element('div', '', 'card-top');
    top.append(element('span', project.category), element('span', project.year || '—'));
    const bottom = element('div', '', 'card-bottom');
    bottom.append(element('span', project.language || 'Source'), element('span', 'View repository ↗'));
    card.append(top, element('h3', project.title), element('p', project.description), bottom);
    fragment.append(card);
  }
  if (!matches.length) fragment.append(element('p', 'No projects found. Try another search or category.', 'empty'));
  grid.replaceChildren(fragment);
  document.querySelector('#results').textContent = `${matches.length} of ${projects.length} public projects`;
}
search.addEventListener('input', render);
sort.addEventListener('change', render);
document.querySelector('#year').textContent = new Date().getFullYear();
render();
