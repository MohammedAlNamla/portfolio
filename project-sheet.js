// Details sheet: opens from a project card, and from a #project-<id> link.
const sheet = document.getElementById('project-sheet');
const sheetBody = document.getElementById('project-sheet-body');
const sheetScroll = sheet.querySelector('.sheet-scroll');
sheet.querySelector('.sheet-close').setAttribute('aria-label', ui.close);
let currentIndex = -1;
let closeTimer = null;
let openerCard = null;

const cropStyle = (image, [zoom, x, y]) =>
  `background-image:url('${image}');background-size:${zoom};background-position:${x} ${y}`;

const renderItems = items => items
  .map(([title, text]) => `<div class="sheet-item"><strong>${title}</strong><p>${text}</p></div>`)
  .join('');

function renderGallery(project) {
  if (!project.shots) return '';
  const shots = project.shots.map(shot => `
    <figure class="sheet-shot">
      ${shot.image
        ? `<a href="${shot.image}" target="_blank" rel="noopener"><img class="sheet-shot-img" src="${shot.image}" alt="${shot.caption}" loading="lazy"></a>`
        : `<div class="sheet-shot-img" role="img" aria-label="${shot.caption}" style="${cropStyle(project.image, shot.crop)}"></div>`}
      <figcaption>${shot.caption}</figcaption>
    </figure>`).join('');
  return `<div class="sheet-gallery">${shots}</div><p class="sheet-note">${ui.sampleData}</p>`;
}

function renderSheet(project, index) {
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const visit = project.url
    ? `<a class="sheet-visit" href="${project.url}" target="_blank" rel="noopener">${ui.visit}</a>`
    : '';
  const demo = project.demo ? `<span class="project-demo">${ui.demoImage}</span>` : '';
  const heroLabel = `${project.name} ${project.demo && !project.detailImage ? ui.demoImage : ui.screens}`;
  const hero = project.detailImage
    ? `<a href="${project.detailImage}" target="_blank" rel="noopener"><img class="sheet-hero sheet-hero-image" src="${project.detailImage}" alt="${heroLabel}"></a>`
    : `<div class="sheet-hero" role="img" aria-label="${heroLabel}" style="${cropStyle(project.image, project.crop)}">${demo}</div>`;

  sheetBody.innerHTML = `
    ${hero}
    <div class="sheet-head">
      <div>
        <h2 class="sheet-name" id="project-sheet-title">${project.name}</h2>
        <p class="sheet-type">${project.type}</p>
      </div>
      ${visit}
    </div>
    <div class="sheet-meta">${project.meta.map(item => `<span>${item}</span>`).join('')}</div>
    <div class="sheet-columns">
      <section class="sheet-block"><h3>${ui.forBusiness}</h3>${renderItems(project.business)}</section>
      <section class="sheet-block"><h3>${ui.forEngineers}</h3>${renderItems(project.engineering)}</section>
    </div>
    ${renderGallery(project)}
    <nav class="sheet-nav" aria-label="${ui.moreProjects}">
      <button type="button" data-go="${(index - 1 + projects.length) % projects.length}">${ui.previous(previous.name)}</button>
      <button type="button" data-go="${(index + 1) % projects.length}">${ui.next(next.name)}</button>
    </nav>`;
  sheetScroll.scrollTop = 0;
}

function setHash(project) {
  const url = project ? `#project-${project.id}` : `${location.pathname}${location.search}`;
  history.replaceState(null, '', url);
}

function openSheet(index) {
  clearTimeout(closeTimer);
  sheet.classList.remove('is-closing');
  currentIndex = index;
  renderSheet(projects[index], index);
  setHash(projects[index]);
  if (!sheet.open) {
    document.documentElement.classList.add('is-sheet-open');
    sheet.showModal();
  }
}

function finishClose() {
  sheet.classList.remove('is-closing');
  sheet.close();
  document.documentElement.classList.remove('is-sheet-open');
  setHash(null);
  if (openerCard) openerCard.focus({ preventScroll: true });
}

function closeSheet() {
  if (!sheet.open || sheet.classList.contains('is-closing')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finishClose();
    return;
  }
  sheet.classList.add('is-closing');
  closeTimer = setTimeout(finishClose, 220);
}

arc.addEventListener('click', (event) => {
  const card = event.target.closest('.project-card');
  if (!card) return;
  openerCard = card;
  openSheet(projects.findIndex(project => project.id === card.dataset.project));
});

sheet.querySelector('.sheet-close').addEventListener('click', closeSheet);
sheet.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeSheet();
});
sheet.addEventListener('click', (event) => {
  if (event.target === sheet) {
    closeSheet();
    return;
  }
  const go = event.target.closest('[data-go]');
  if (go) openSheet(Number(go.dataset.go));
});

const linked = projects.findIndex(project => `#project-${project.id}` === location.hash);
if (linked >= 0) openSheet(linked);
