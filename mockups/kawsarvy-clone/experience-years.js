const today = new Date();

function formatDuration(months) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (rest || !years) parts.push(`${Math.max(rest, 1)} ${rest > 1 ? 'months' : 'month'}`);
  return parts.join(' ');
}

const monthsSince = (year, month) => (today.getFullYear() - year) * 12 + today.getMonth() + 1 - month;

const items = [
  {
    company: 'Fikritak', mark: 'F', role: 'Backend Software Engineer · Part-time',
    note: 'Building Shahrazad Tours, a booking API for flights, transfers and travel eSIMs.',
    date: 'Oct 2026 — Present', duration: formatDuration(monthsSince(2026, 10)),
    year: 2026, current: true
  },
  {
    company: 'Approved Tech', logo: 'logos/approved-tech.png', role: 'Backend Software Engineer',
    note: 'SaaS, ERP and booking platforms for multiple clients.',
    date: 'Oct 2023 — Present', duration: formatDuration(monthsSince(2023, 10)),
    year: 2023, current: true
  },
  {
    company: 'Approved Tech', logo: 'logos/approved-tech.png', role: 'Backend Developer · Internship',
    note: 'PHP, Laravel and MySQL, before joining the team full-time.',
    date: 'Jun 2023 — Oct 2023', duration: '4 months',
    year: 2023
  },
  {
    company: 'Islamic University of Gaza', logo: 'logos/iug.png', role: 'B.Sc. Information Technology',
    note: 'Web development, databases and software engineering.',
    date: '2020 — 2025', duration: '',
    year: 2020, endYear: 2025
  }
];

const mark = item => `<span class="mark">${item.logo ? `<img src="${item.logo}" alt="">` : item.mark}</span>`;
const nowPill = '<span class="now-pill"><span class="now-dot"></span>Now</span>';
const durationTag = item => item.duration ? `<span class="duration">${item.duration}</span>` : '';
const stateClass = item => item.current ? ' is-current' : ' is-past';
const heading = item => `<h4 class="company">${item.company}</h4>`;
const text = item => `<span class="role">${item.role}</span><p class="note">${item.note}</p>`;
const pill = item => item.current ? nowPill : '';
const isRepeat = (item, index) => index > 0 && items[index - 1].year === item.year;

const renderEditorial = () => items.map(item => `
  <article class="y1-row row${stateClass(item)}">
    <div class="year">${item.year}</div>
    <div class="y1-body">
      <div class="head">${mark(item)}${heading(item)}</div>
      ${text(item)}
    </div>
    <div class="y1-side">
      <div class="y1-when"><span class="date">${item.date}</span>${durationTag(item)}</div>
      ${pill(item)}
    </div>
  </article>`).join('');

const renderRail = () => items.map((item, index) => `
  <article class="y2-row row${stateClass(item)}${isRepeat(item, index) ? ' is-repeat' : ''}">
    <div class="year">${item.year}</div>
    ${mark(item)}
    <div class="y2-body">
      <div class="meta"><span class="date">${item.date}</span>${durationTag(item)}${pill(item)}</div>
      ${heading(item)}${text(item)}
    </div>
  </article>`).join('');

const yearRange = (item) => {
  if (item.current) return `${item.year}<span class="year-sep">—</span><span class="y3-now">Now<span class="now-dot"></span></span>`;
  if (item.endYear) return `${item.year}<span class="year-sep">—</span>${item.endYear}`;
  return item.year;
};

const renderRanges = () => items.map(item => `
  <article class="y3-row row${stateClass(item)}">
    <div class="year">${yearRange(item)}</div>
    <div>
      <div class="head">${mark(item)}${heading(item)}</div>
      ${text(item)}
      ${item.duration ? `<span class="duration">${item.date.replace(' — Present', '')} · ${item.duration}</span>` : ''}
    </div>
  </article>`).join('');

const blockYears = [...new Set(items.map(item => item.year))];

const renderBlocks = () => blockYears.map(year => `
  <section class="y4-block">
    <div class="y4-title${items.some(item => item.year === year && item.current) ? ' is-current' : ' is-past'}"><span class="year">${year}</span></div>
    <div class="y4-cards">
      ${items.filter(item => item.year === year).map(item => `
        <article class="y4-card row${stateClass(item)}">
          <div class="head">${mark(item)}${pill(item)}</div>
          ${heading(item)}${text(item)}
          <div class="meta"><span class="date">${item.date}</span>${durationTag(item)}</div>
        </article>`).join('')}
    </div>
  </section>`).join('');

const renderGhost = () => `<div class="y5-list">${items.map(item => `
  <article class="y5-card row${stateClass(item)}">
    <span class="year" aria-hidden="true">${item.year}</span>
    <div class="head">${mark(item)}${heading(item)}${pill(item)}</div>
    <div class="meta"><span class="date">${item.date}</span>${durationTag(item)}</div>
    ${text(item)}
  </article>`).join('')}</div>`;

const layouts = [
  { letter: '1', name: 'تحريري', note: 'سنة ضخمة بكل صف، وتحتها خط رفيع، والتواريخ على اليمين. نظيف وواسع.', render: renderEditorial },
  { letter: '2', name: 'خط متصل', note: 'أقرب لـ B: الخط غامق في الشغل الحالي وفاتح في القديم، والسنة موازية للشعار.', render: renderRail },
  { letter: '3', name: 'من سنة إلى سنة', note: 'المدى كله بخط كبير، مثل 2023 — Now، فيبان الوقت من أول نظرة.', render: renderRanges },
  { letter: '4', name: 'كتل السنوات', note: 'كل سنة عنوان، وتحتها بطاقات أدوارها، فيظهر الانتقال من التدريب للوظيفة في 2023.', render: renderBlocks },
  { letter: '5', name: 'سنة خلف البطاقة', note: 'سنة ضخمة شفافة خلف كل بطاقة، والشغل الحالي ببطاقة غامقة. الأجرأ بينهم.', render: renderGhost }
];

document.getElementById('layouts').innerHTML = layouts.map(layout => `
  <section>
    <div class="xl-label" dir="rtl">
      <span class="xl-letter">${layout.letter}</span>
      <h2>${layout.name}</h2>
      <p>${layout.note}</p>
    </div>
    <div class="xl-frames">
      <div class="frame">${layout.render()}</div>
      <div class="frame frame-phone">${layout.render()}</div>
    </div>
  </section>`).join('');
