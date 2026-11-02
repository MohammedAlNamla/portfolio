// Biggest project first. Edit this list to change the cards; a missing url renders a plain card.
const projects = [
  { name: 'Sufra', type: 'Restaurant menu, ordering and POS SaaS', image: '../../images/Sufra.webp', url: 'https://sufra.live/' },
  { name: 'BookForMe', type: 'Booking platform for service businesses', image: '../../images/BFM.webp', url: 'https://www.bookforme.ps' },
  { name: 'Taskat', type: 'Agile project management tool', image: '../../images/Taskat.webp' },
  { name: 'Edux', type: 'Education platform for teachers and students', image: 'demo/edux.svg', demo: true },
  { name: 'UOP', type: 'University website and CMS', image: '../../images/UOP.webp', url: 'https://up.edu.ps/ar' },
  { name: 'NetSpeed', type: 'Internet service management system', image: '../../images/NetSpeed.webp', url: 'https://points.red-radius.com' },
  { name: 'Shahrazad Tours', type: 'Flights, transfers and eSIM booking backend', image: 'demo/shahrazad.svg', demo: true },
  { name: 'ER Atlas', type: 'Visual database schema explorer', image: 'demo/er-atlas.svg', demo: true },
  { name: 'RouterGuard', type: 'Android app for home network devices', image: 'demo/routerguard.svg', demo: true }
];

const tilts = ['-3deg', '2deg', '-2deg', '3deg'];

// The biggest project takes the top of the arc and the rest alternate outwards
function arcSlot(rank) {
  const step = Math.ceil(rank / 2);
  return rank % 2 === 0 ? -step : step;
}

function renderProject(project, rank) {
  const card = document.createElement(project.url ? 'a' : 'div');
  const slot = arcSlot(rank);
  card.className = 'project-card';
  if (project.url) {
    card.href = project.url;
    card.target = '_blank';
    card.rel = 'noopener';
  }
  card.style.setProperty('--slot', slot);
  card.style.setProperty('--layer', projects.length - rank);
  card.style.setProperty('--tilt', tilts[rank % tilts.length]);
  card.style.setProperty('--caption', slot > 0 ? 'right' : 'left');
  card.innerHTML = `
    <span class="project-media">
      <img src="${project.image}" alt="${project.name} ${project.demo ? 'demo image' : 'screenshot'}" loading="lazy">
      ${project.demo ? '<span class="project-demo">Demo</span>' : ''}
    </span>
    <span class="project-name">${project.name}</span>
    <span class="project-type">${project.type}</span>`;
  return card;
}

const arc = document.getElementById('projects-arc');
projects.forEach((project, rank) => arc.append(renderProject(project, rank)));
