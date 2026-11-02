// Biggest project first. Projects without a real screenshot use a labelled demo image.
const projects = [
  { name: 'Sufra', type: 'Restaurant menu, ordering and POS SaaS', image: '../../images/Sufra.webp' },
  { name: 'BookForMe', type: 'Booking platform for service businesses', image: '../../images/BFM.webp' },
  { name: 'Taskat', type: 'Agile project management tool', image: '../../images/Taskat.webp' },
  { name: 'Edux', type: 'Education platform for teachers and students', image: 'demo/edux.svg', demo: true },
  { name: 'UOP', type: 'University website and CMS', image: '../../images/UOP.webp' },
  { name: 'NetSpeed', type: 'Internet service management system', image: '../../images/NetSpeed.webp' },
  { name: 'Shahrazad Tours', type: 'Flights, transfers and eSIM booking backend', image: 'demo/shahrazad.svg', demo: true },
  { name: 'ER Atlas', type: 'Visual database schema explorer', image: 'demo/er-atlas.svg', demo: true },
  { name: 'RouterGuard', type: 'Android app for home network devices', image: 'demo/routerguard.svg', demo: true }
];
const count = projects.length;

const scatterLayout = [
  { x: '0%', y: '4%', r: '-8deg' }, { x: '19%', y: '0%', r: '4deg' }, { x: '38%', y: '6%', r: '-3deg' },
  { x: '57%', y: '0%', r: '6deg' }, { x: '77%', y: '5%', r: '-5deg' }, { x: '9%', y: '50%', r: '5deg' },
  { x: '29%', y: '54%', r: '-6deg' }, { x: '48%', y: '50%', r: '3deg' }, { x: '68%', y: '54%', r: '-4deg' }
];
const scatterLayoutNarrow = [
  { x: '0%', y: '0%', r: '-6deg' }, { x: '31%', y: '2%', r: '4deg' }, { x: '62%', y: '0%', r: '-3deg' },
  { x: '0%', y: '33%', r: '5deg' }, { x: '31%', y: '35%', r: '-5deg' }, { x: '62%', y: '33%', r: '4deg' },
  { x: '0%', y: '66%', r: '-4deg' }, { x: '31%', y: '68%', r: '5deg' }, { x: '62%', y: '66%', r: '-5deg' }
];
const alternating = ['-5deg', '4deg', '-3deg', '5deg', '-4deg', '3deg', '-5deg', '4deg', '-3deg'];
const rowOffsets = ['6px', '-6px', '4px', '-4px', '6px', '-6px', '4px', '-4px', '6px'];

const narrow = window.matchMedia('(max-width: 759px)').matches;

// A: the biggest project takes the centre and the rest alternate outwards
function fanSlot(rank) {
  const step = Math.ceil(rank / 2);
  return rank % 2 === 0 ? -step : step;
}

const cardVars = {
  fan: i => {
    const slot = fanSlot(i);
    return { '--i': slot, '--a': (slot * slot) / 4, '--z': count - i, '--caption': slot > 0 ? 'right' : 'left' };
  },
  scatter: i => {
    const place = (narrow ? scatterLayoutNarrow : scatterLayout)[i];
    return { '--x': place.x, '--y': place.y, '--r': place.r, '--z': count - i };
  },
  row: i => ({ '--r': alternating[i], '--dy': rowOffsets[i], '--z': count - i, '--caption': 'right' }),
  'strip-group': i => ({ '--r': alternating[i] }),
  'line-cards': i => ({ '--r': alternating[i] })
};

function renderCard(project, vars = {}) {
  const card = document.createElement('a');
  card.className = 'pc';
  card.href = '#';
  card.innerHTML = `
    <span class="pc-media">
      <img src="${project.image}" alt="${project.name} ${project.demo ? 'demo image' : 'screenshot'}" loading="lazy">
      ${project.demo ? '<span class="pc-demo">Demo</span>' : ''}
    </span>
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
    const pose = deckPose[Math.min(position, deckPose.length - 1)];
    card.style.setProperty('--r', pose.r);
    card.style.setProperty('--dx', pose.dx);
    card.style.setProperty('--z', count - position);
    card.classList.toggle('is-top', position === 0);
  });
  const top = deckOrder[0];
  document.getElementById('deck-num').textContent = `0${top + 1} / 0${count}`;
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
