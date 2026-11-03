const tilts = ['-3deg', '2deg', '-2deg', '3deg'];
const tags = {
  restrogram: 'Restaurant SaaS',
  bookforme: 'Booking platform',
  taskat: 'Project tool',
  edux: 'Education',
  uop: 'University CMS',
  netspeed: 'ISP system',
  shahrazad: 'Travel API',
  'er-atlas': 'Developer tool'
};

function arcSlot(rank) {
  const step = Math.ceil(rank / 2);
  const slot = rank % 2 === 0 ? -step : step;
  return projects.length % 2 === 0 ? slot - .5 : slot;
}

function renderCard(project, rank, option) {
  const slot = arcSlot(rank);
  const name = `<span class="project-name">${project.name}</span>`;
  return `
    <button class="project-card" type="button" data-side="${slot > 0 ? 'right' : 'left'}" style="--slot:${slot};--layer:${projects.length - rank};--tilt:${tilts[rank % tilts.length]};--caption:${slot > 0 ? 'right' : 'left'}">
      <span class="project-media">
        <img src="${project.image}" alt="${project.name}">
        ${option.nameInside ? name : ''}
      </span>
      ${option.nameInside ? '' : name}
      ${option.tag ? `<span class="co-tag">${tags[project.id]}</span>` : ''}
      <span class="project-type">${project.type}</span>
    </button>`;
}

const options = [
  { name: 'صورة واسم', note: 'بدون وصف داخل الكرت، فيقل الازدحام فورًا.', variant: 'v-name' },
  { name: 'اسم على الصورة', note: 'الاسم في شارة صغيرة فوق الصورة، والكرت كله صورة تقريبًا.', variant: 'v-pill', nameInside: true },
  { name: 'صورة طويلة', note: 'الصورة تملأ الكرت، والاسم فوق تظليل خفيف في الأسفل.', variant: 'v-shade', nameInside: true },
  { name: 'اسم وكلمتان', note: 'اسم المشروع ونوعه بكلمتين فقط بدل جملة كاملة.', variant: 'v-name v-tag', tag: true },
  { name: 'صورة فقط', note: 'الأهدأ: لا نص حتى تمرر الماوس على الكرت.', variant: 'v-image', nameInside: true },
  { name: 'كروت أصغر وأبعد', note: 'صورة واسم، مع مسافة أكبر حتى لا تغطي الكروت بعضها كثيرًا.', variant: 'v-name v-spaced' }
];

document.getElementById('options').innerHTML = options.map((option, index) => `
  <section class="co-option">
    <div class="co-label" dir="rtl">
      <span class="co-letter">${index + 1}</span>
      <h2>${option.name}</h2>
      <p>${option.note}</p>
    </div>
    <div class="projects-arc ${option.variant}">
      ${projects.map((project, rank) => renderCard(project, rank, option)).join('')}
    </div>
  </section>`).join('');

document.getElementById('co-theme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.dataset.theme === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'dark';
});
