const experience = [
  {
    company: 'Fikritak',
    role: 'Backend Software Engineer · Part-time',
    note: 'Building Shahrazad Tours, a booking API for flights, transfers and travel eSIMs.',
    date: 'Oct 2026 — Present',
    current: true
  },
  {
    company: 'Approved Tech',
    role: 'Backend Software Engineer',
    note: 'SaaS, ERP and booking platforms for multiple clients.',
    date: 'Oct 2023 — Present',
    current: true
  },
  {
    company: 'Islamic University of Gaza',
    role: 'B.Sc. Information Technology',
    note: 'Web development, databases and software engineering.',
    date: 'Education'
  }
];

const tilts = ['-1.5deg', '1.2deg', '-1deg'];

const nameBlock = item => `<div><h3 class="x-company">${item.company}</h3><span class="x-role">${item.role}</span></div>`;
const note = item => `<p class="x-note">${item.note}</p>`;
const date = item => `<span class="x-date">${item.date}</span>`;

const templates = {
  rows: item => nameBlock(item) + note(item) + date(item),
  timeline: item => date(item) + nameBlock(item) + note(item),
  cards: item => date(item) + nameBlock(item) + note(item),
  reveal: item => `
    <div class="x-line">
      <div><span class="x-company">${item.company}</span><span class="x-role">${item.role}</span></div>
      ${date(item)}
    </div>
    <div class="x-panel">${note(item)}</div>`,
  split: item => `<div class="x-top">${nameBlock(item)}${date(item)}</div>${note(item)}`,
  track: item => date(item) + nameBlock(item) + note(item)
};

document.querySelectorAll('[data-variant]').forEach((host) => {
  const variant = host.dataset.variant;
  const items = document.createElement('div');
  items.style.display = 'contents';

  experience.forEach((item, i) => {
    const element = document.createElement('article');
    element.className = `x-item${item.current ? ' is-current' : ''}`;
    element.style.setProperty('--tilt', tilts[i]);
    element.innerHTML = templates[variant](item);
    if (variant === 'reveal') {
      element.addEventListener('click', () => element.classList.toggle('is-open'));
    }
    items.append(element);
  });

  if (variant === 'split') {
    host.innerHTML = '<h3 class="x-title">Where I\'ve<br>worked and studied.</h3>';
    const list = document.createElement('div');
    list.append(items);
    host.append(list);
  } else {
    host.append(items);
  }
});
