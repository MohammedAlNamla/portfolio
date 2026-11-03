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
  card.style.setProperty('--caption', slot > 0 ? 'right' : 'left');
  card.innerHTML = `
    <span class="project-media">
      <img src="${project.image}" alt="${project.name} ${ui.demoImage}" loading="lazy">
      ${project.demo ? `<span class="project-demo">${ui.demo}</span>` : ''}
    </span>
    <span class="project-name">${project.name}</span>
    <span class="project-tag">${project.tag}</span>
    <span class="project-summary">${project.summary}</span>`;
  return card;
}

const arc = document.getElementById('projects-arc');
projects.forEach((project, rank) => arc.append(renderProject(project, rank)));
