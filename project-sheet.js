// Details sheet: opens from a project card, and from a #project-<id> link.
const sheet = document.getElementById('project-sheet');
const sheetBody = document.getElementById('project-sheet-body');
const sheetScroll = sheet.querySelector('.sheet-scroll');
sheet.querySelector('.sheet-close').setAttribute('aria-label', ui.close);
let currentIndex = -1;
let closeTimer = null;
let openerCard = null;

const renderItems = items => items
  .map(([title, text]) => `<div class="sheet-item"><strong>${title}</strong><p>${text}</p></div>`)
  .join('');

// One large image at a time, moved with arrows, dots, a swipe or the arrow keys.
let viewerMedia = [];
let viewerIndex = 0;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const lightbox = document.createElement('dialog');
lightbox.className = 'viewer-lightbox';
lightbox.setAttribute('aria-label', ui.enlargeImage);
lightbox.innerHTML = `
  <button class="viewer-arrow viewer-prev" type="button" data-step="-1" aria-label="${ui.previousImage}"><span aria-hidden="true"></span></button>
  <img class="viewer-lightbox-img" alt="">
  <button class="viewer-arrow viewer-next" type="button" data-step="1" aria-label="${ui.nextImage}"><span aria-hidden="true"></span></button>
  <button class="viewer-lightbox-close" type="button" aria-label="${ui.close}">✕</button>`;
document.body.append(lightbox);

function renderViewer(project) {
  viewerMedia = [{ image: project.detailImage, caption: `${project.name} ${ui.screens}` }, ...(project.shots || [])];
  viewerIndex = 0;
  const dots = viewerMedia.map((media, index) =>
    `<button class="viewer-dot" type="button" data-show="${index}" aria-label="${ui.showImage(index + 1)}"></button>`).join('');
  return `
    <section class="viewer" style="--tint:${project.tint}">
      <div class="viewer-stage">
        <button class="viewer-open" type="button" aria-label="${ui.enlargeImage}"><img class="viewer-img" alt=""></button>
        <button class="viewer-arrow viewer-prev" type="button" data-step="-1" aria-label="${ui.previousImage}"><span aria-hidden="true"></span></button>
        <button class="viewer-arrow viewer-next" type="button" data-step="1" aria-label="${ui.nextImage}"><span aria-hidden="true"></span></button>
      </div>
      <div class="viewer-dots">${dots}</div>
      ${project.shots ? `<p class="sheet-note">${ui.sampleData}</p>` : ''}
    </section>`;
}

// Pictures are fetched ahead of time and only swapped in once fully decoded, so the stage never
// goes blank. Fetching alone is cheap; decoding happens only for the picture about to be shown.
const imageCache = new Map();
const readyImages = new Set();
function fetchImage(src) {
  if (!imageCache.has(src)) {
    const image = new Image();
    image.decoding = 'async';
    image.src = src;
    imageCache.set(src, image);
  }
  return imageCache.get(src);
}
function loadImage(src) {
  // A failed load still resolves, so the viewer is never stuck waiting.
  return fetchImage(src).decode().catch(() => {}).then(() => { readyImages.add(src); });
}

// The shimmer waits a moment before showing, so pictures that arrive quickly never flash it.
const SHIMMER_DELAY = 120;
let showToken = 0;

function showImage(index) {
  const count = viewerMedia.length;
  viewerIndex = (index + count) % count;
  const media = viewerMedia[viewerIndex];
  const token = ++showToken;
  sheetBody.querySelectorAll('.viewer-dot').forEach((dot, dotIndex) => {
    dot.setAttribute('aria-current', String(dotIndex === viewerIndex));
  });

  const stage = sheetBody.querySelector('.viewer-open');
  const wasReady = readyImages.has(media.image);
  const shimmer = wasReady ? null : setTimeout(() => {
    if (token === showToken) stage.classList.add('is-loading');
  }, SHIMMER_DELAY);

  loadImage(media.image).then(() => {
    clearTimeout(shimmer);
    if (token !== showToken) return;
    const viewerImage = sheetBody.querySelector('.viewer-img');
    [viewerImage, lightbox.querySelector('img')].forEach((image) => {
      image.src = media.image;
      image.alt = media.caption;
    });
    stage.classList.remove('is-loading');
    if (!reducedMotion()) viewerImage.animate([{ opacity: wasReady ? .4 : 0 }, { opacity: 1 }], { duration: wasReady ? 220 : 320 });
  });
  [viewerIndex + 1, viewerIndex - 1].forEach((near) => { fetchImage(viewerMedia[(near + count) % count].image); });
}

function bindSwipe(area) {
  let startX = null;
  area.addEventListener('touchstart', (event) => { startX = event.touches[0].clientX; }, { passive: true });
  area.addEventListener('touchend', (event) => {
    if (startX === null) return;
    const moved = event.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(moved) < 40) return;
    showImage(viewerIndex + ((moved > 0) === (document.documentElement.dir === 'rtl') ? 1 : -1));
  });
}

function handleViewerClick(event) {
  const step = event.target.closest('[data-step]');
  const dot = event.target.closest('[data-show]');
  if (step) showImage(viewerIndex + Number(step.dataset.step));
  else if (dot) showImage(Number(dot.dataset.show));
  else if (event.target.closest('.viewer-open')) lightbox.showModal();
  else return false;
  return true;
}

function renderSheet(project, index) {
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const visit = project.url
    ? `<a class="sheet-visit" href="${project.url}" target="_blank" rel="noopener">${ui.visit}</a>`
    : '';

  sheetBody.innerHTML = `
    ${renderViewer(project)}
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
    <nav class="sheet-nav" aria-label="${ui.moreProjects}">
      <button type="button" data-go="${(index - 1 + projects.length) % projects.length}">${ui.previous(previous.name)}</button>
      <button type="button" data-go="${(index + 1) % projects.length}">${ui.next(next.name)}</button>
    </nav>`;
  bindSwipe(sheetBody.querySelector('.viewer-stage'));
  showImage(0);
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

// Start fetching a project's first picture as soon as the visitor reaches for its card.
function warmCard(event) {
  const card = event.target.closest('.project-card');
  const project = card && projects.find(item => item.id === card.dataset.project);
  if (project) fetchImage(project.detailImage);
}
arc.addEventListener('pointerover', warmCard);
arc.addEventListener('focusin', warmCard);
arc.addEventListener('touchstart', warmCard, { passive: true });

// Once the projects are on screen and the page is idle, fetch every first picture,
// unless the visitor asked their browser to save data.
new IntersectionObserver((entries, observer) => {
  if (!entries.some(entry => entry.isIntersecting)) return;
  observer.disconnect();
  if (navigator.connection && navigator.connection.saveData) return;
  const whenIdle = window.requestIdleCallback || (callback => setTimeout(callback, 1200));
  whenIdle(() => projects.forEach(project => fetchImage(project.detailImage)));
}).observe(document.getElementById('projects'));

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
  if (handleViewerClick(event)) return;
  const go = event.target.closest('[data-go]');
  if (go) openSheet(Number(go.dataset.go));
});

bindSwipe(lightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target.closest('.viewer-lightbox-close')) lightbox.close();
  else handleViewerClick(event);
});
document.addEventListener('keydown', (event) => {
  if (!sheet.open || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
  const forward = document.documentElement.dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
  showImage(viewerIndex + (event.key === forward ? 1 : -1));
});

const linked = projects.findIndex(project => `#project-${project.id}` === location.hash);
if (linked >= 0) openSheet(linked);
