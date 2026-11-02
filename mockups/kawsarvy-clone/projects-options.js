const projects = [
  { name: 'Sufra', type: 'Restaurant menu and ordering SaaS', image: 'Sufra.webp' },
  { name: 'BookForMe', type: 'Booking platform for service businesses', image: 'BFM.webp' },
  { name: 'UOP', type: 'University website and CMS', image: 'UOP.webp' },
  { name: 'Taskat', type: 'Agile project management tool', image: 'Taskat.webp' },
  { name: 'NetSpeed', type: 'Internet service management system', image: 'NetSpeed.webp' }
];

const scatterLayout = [
  { x: '0%', y: '10%', r: '-9deg', z: 2 },
  { x: '17%', y: '46%', r: '5deg', z: 4 },
  { x: '38%', y: '2%', r: '-3deg', z: 3 },
  { x: '54%', y: '46%', r: '-6deg', z: 5 },
  { x: '76%', y: '8%', r: '8deg', z: 2 }
];
const scatterLayoutNarrow = [
  { x: '0%', y: '0%', r: '-7deg', z: 2 },
  { x: '50%', y: '4%', r: '6deg', z: 3 },
  { x: '26%', y: '30%', r: '-3deg', z: 5 },
  { x: '0%', y: '60%', r: '5deg', z: 3 },
  { x: '50%', y: '62%', r: '-6deg', z: 4 }
];
const alternating = ['-5deg', '4deg', '-3deg', '5deg', '-4deg'];
const fanArc = [2, .6, 0, .6, 2];
const rowOffsets = ['6px', '-6px', '4px', '-4px', '6px'];
// Each card sits over the one before it, so no project name gets covered
const layersLeftToRight = [1, 2, 3, 4, 5];

const narrow = window.matchMedia('(max-width: 759px)').matches;

const cardVars = {
  fan: i => ({ '--i': i - 2, '--a': fanArc[i], '--z': layersLeftToRight[i] }),
  scatter: i => {
    const place = (narrow ? scatterLayoutNarrow : scatterLayout)[i];
    return { '--x': place.x, '--y': place.y, '--r': place.r, '--z': place.z };
  },
  row: i => ({ '--r': alternating[i], '--dy': rowOffsets[i], '--z': layersLeftToRight[i] }),
  'strip-group': i => ({ '--r': alternating[i] }),
  'line-cards': i => ({ '--r': alternating[i] })
};

function renderCard(project, vars = {}) {
  const card = document.createElement('a');
  card.className = 'pc';
  card.href = '#';
  card.innerHTML = `
    <img src="../../images/${project.image}" alt="${project.name} screenshot" loading="lazy">
    <span class="pc-name">${project.name}</span>
    <span class="pc-type">${project.type}</span>`;
  Object.entries(vars).forEach(([key, value]) => card.style.setProperty(key, value));
  return card;
}

document.querySelectorAll('[data-cards]').forEach((host) => {
  const vars = cardVars[host.classList[0]];
  projects.forEach((project, i) => host.append(renderCard(project, vars ? vars(i) : {})));
});

// E: the second group makes the -50% slide loop without a jump
const strip = document.getElementById('strip');
const stripClone = strip.firstElementChild.cloneNode(true);
stripClone.setAttribute('aria-hidden', 'true');
stripClone.querySelectorAll('a').forEach((link) => link.setAttribute('tabindex', '-1'));
strip.append(stripClone);

// C: the deck keeps an order; index 0 is the card on top
const deckCards = [...document.querySelectorAll('#deck .pc')];
const deckPose = [
  { r: '-2deg', dx: '0px' },
  { r: '5deg', dx: '10px' },
  { r: '-7deg', dx: '-12px' },
  { r: '9deg', dx: '18px' },
  { r: '-10deg', dx: '-18px' }
];
let deckOrder = projects.map((_, i) => i);

function paintDeck() {
  deckOrder.forEach((cardIndex, position) => {
    const card = deckCards[cardIndex];
    card.style.setProperty('--r', deckPose[position].r);
    card.style.setProperty('--dx', deckPose[position].dx);
    card.style.setProperty('--z', deckCards.length - position);
    card.classList.toggle('is-top', position === 0);
  });
  const top = deckOrder[0];
  document.getElementById('deck-num').textContent = `0${top + 1} / 0${projects.length}`;
  document.getElementById('deck-name').textContent = projects[top].name;
  document.getElementById('deck-type').textContent = projects[top].type;
}

function nextInDeck() {
  deckOrder = [...deckOrder.slice(1), deckOrder[0]];
  paintDeck();
}

deckCards.forEach((card) => {
  card.addEventListener('click', (event) => {
    event.preventDefault();
    if (card.classList.contains('is-top')) nextInDeck();
  });
});
document.getElementById('deck-next').addEventListener('click', nextInDeck);
paintDeck();
