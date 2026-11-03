const today = new Date();

function formatDuration(months) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
  if (rest || !years) parts.push(`${Math.max(rest, 1)} ${rest > 1 ? 'mos' : 'mo'}`);
  return parts.join(' ');
}

const monthsSince = (year, month) => (today.getFullYear() - year) * 12 + today.getMonth() + 1 - month;

const items = [
  {
    company: 'Fikritak', mark: 'F', role: 'Backend Software Engineer · Part-time',
    note: 'Building Shahrazad Tours, a booking API for flights, transfers and travel eSIMs.',
    when: 'Oct 2026 — Now', length: formatDuration(monthsSince(2026, 10)), year: 2026, current: true
  },
  {
    company: 'Approved Tech', logo: 'logos/approved-tech.png', role: 'Backend Software Engineer',
    note: 'SaaS, ERP and booking platforms for multiple clients.',
    when: 'Oct 2023 — Now', length: formatDuration(monthsSince(2023, 10)), year: 2023, current: true
  },
  {
    company: 'Approved Tech', logo: 'logos/approved-tech.png', role: 'Backend Developer · Internship',
    note: 'PHP, Laravel and MySQL, before joining the team full-time.',
    when: 'Jun — Oct 2023', length: '4 mos', year: 2023
  },
  {
    company: 'Islamic University of Gaza', logo: 'logos/iug.png', role: 'B.Sc. Information Technology',
    note: 'Web development, databases and software engineering.',
    when: '2020 — 2025', length: '', year: 2020
  }
];

const mark = item => `<span class="mark">${item.logo ? `<img src="${item.logo}" alt="">` : item.mark}</span>`;
const length = item => item.length ? `<span class="length">${item.length}</span>` : '';
const rowClass = (item, index) =>
  `row ${item.current ? 'is-current' : 'is-past'}${index && items[index - 1].year === item.year ? ' is-repeat' : ''}`;
const dates = item => `<div class="dates"><span class="when">${item.when}</span>${length(item)}</div>`;
const details = item => `<h4 class="company">${item.company}</h4><span class="role">${item.role}</span><p class="note">${item.note}</p>`;

const renderColumns = (prefix, yearStyle) => `<div>${items.map((item, index) => `
  <article class="${prefix}-row ${rowClass(item, index)}">
    <div class="year ${yearStyle}">${item.year}</div>
    ${mark(item)}
    <div class="body">${dates(item)}${details(item)}</div>
  </article>`).join('')}</div>`;

const renderHairlines = () => `<div>${items.map((item, index) => `
  <article class="m3-row ${rowClass(item, index)}">
    <div class="year year-display">${item.year}</div>
    <div class="body">
      <div class="m3-head">${mark(item)}<h4 class="company">${item.company}</h4></div>
      <span class="role">${item.role}</span>
      <p class="note">${item.note}</p>
    </div>
    <div class="m3-side"><span class="when">${item.when}</span>${length(item)}</div>
  </article>`).join('')}</div>`;

const layouts = [
  { letter: '1', name: 'أعمدة', note: 'سنة بخط العناوين بحجم متوسط، ثم شعار وتفاصيل، بدون خطوط.', render: () => renderColumns('m1', 'year-display') },
  { letter: '2', name: 'خط رفيع', note: 'نفس السنة، مع خط رفيع يصل الشعارات، وأغمق قليلًا عند الشغل الحالي.', render: () => renderColumns('m2', 'year-display') },
  { letter: '3', name: 'صفوف بفواصل', note: 'فاصل خفيف بين الصفوف، والتواريخ في عمود على اليمين.', render: renderHairlines },
  { letter: '4', name: 'سنة ناعمة', note: 'السنة بخط النص العادي بدل خط العناوين، فتبدو أخف وأهدأ.', render: () => renderColumns('m4', 'year-text') }
];

document.getElementById('layouts').innerHTML = layouts.map(layout => `
  <section>
    <div class="cl-label" dir="rtl">
      <span class="cl-letter">${layout.letter}</span>
      <h2>${layout.name}</h2>
      <p>${layout.note}</p>
    </div>
    <div class="cl-frames">
      <div class="frame">${layout.render()}</div>
      <div class="frame frame-phone">${layout.render()}</div>
    </div>
  </section>`).join('');
