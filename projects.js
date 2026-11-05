const tilts = ['-3deg', '2deg', '-2deg', '3deg'];

// The biggest project takes the top of the arc and the rest alternate outwards.
// An even count has no middle card, so half a step keeps both sides equal.
function arcSlot(rank) {
  const step = Math.ceil(rank / 2);
  const slot = rank % 2 === 0 ? -step : step;
  return projects.length % 2 === 0 ? slot - .5 : slot;
}

function renderProject(project, rank) {
  const card = document.createElement('button');
  const slot = arcSlot(rank);
  card.className = 'project-card';
  card.type = 'button';
  card.setAttribute('aria-haspopup', 'dialog');
  card.dataset.project = project.id;
  card.style.setProperty('--slot', slot);
  card.style.setProperty('--layer', projects.length - rank);
  card.style.setProperty('--tilt', tilts[rank % tilts.length]);
  card.dataset.slot = slot;
  card.innerHTML = `
    <span class="project-face">
      <span class="project-media">
        <img src="${project.image}" alt="${project.name} ${ui.demoImage}" loading="lazy">
      </span>
      <span class="project-name"><span class="project-text">${project.name}</span></span>
      <span class="project-tag"><span class="project-text">${project.tag}</span></span>
    </span>
    <span class="project-more"><span class="project-summary">${project.summary}</span></span>`;
  return card;
}

const arc = document.getElementById('projects-arc');
projects.forEach((project, rank) => arc.append(renderProject(project, rank)));

const arcCards = [...arc.children];
const onArc = window.matchMedia('(min-width: 900px)');

// Titles rest on the side a neighbour does not cover; this is how far each one travels to get there
function measureTitleSlides() {
  const readsRight = document.documentElement.dir === 'rtl';
  arcCards.forEach((card) => {
    const slot = Number(card.dataset.slot);
    const movesTitle = readsRight ? slot <= 0 : slot > 0;
    card.querySelectorAll('.project-name, .project-tag').forEach((line) => {
      const room = Math.max(0, line.clientWidth - line.firstElementChild.offsetWidth - 4);
      line.style.setProperty('--slide', movesTitle && onArc.matches ? `${readsRight ? -room : room}px` : '0px');
    });
  });
}
document.fonts.ready.then(measureTitleSlides);
window.addEventListener('resize', measureTitleSlides);

// Neighbours part around the open card, less the further away they are.
// They wait for the card to settle before closing, so it can change layer while they are apart.
const NEIGHBOURS_CLOSE_AFTER = 180;
const neighbourPush = [3.4, 2.2, 1.1, .5, .2, .1];
let closeArcTimer;

function partAround(openSlot) {
  clearTimeout(closeArcTimer);
  arcCards.forEach((card) => {
    const distance = Number(card.dataset.slot) - openSlot;
    const push = neighbourPush[Math.abs(distance) - 1] ?? 0;
    card.style.setProperty('--push', `${Math.sign(distance) * push}deg`);
  });
}

function closeArc() {
  arcCards.forEach(card => card.style.removeProperty('--push'));
}

arcCards.forEach((card) => {
  const slot = Number(card.dataset.slot);
  card.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse' && onArc.matches) partAround(slot);
  });
  card.addEventListener('pointerleave', () => {
    closeArcTimer = setTimeout(closeArc, NEIGHBOURS_CLOSE_AFTER);
  });
  card.addEventListener('focusin', () => {
    if (onArc.matches && card.matches(':focus-visible')) partAround(slot);
  });
  card.addEventListener('focusout', () => {
    closeArcTimer = setTimeout(closeArc, NEIGHBOURS_CLOSE_AFTER);
  });
});
