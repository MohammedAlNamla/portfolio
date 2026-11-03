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
    when: 'Oct 2026 — Now', length: formatDuration(monthsSince(2026, 10)), current: true
  },
  {
    company: 'Approved Tech', logo: 'logos/approved-tech.png', role: 'Backend Software Engineer',
    note: 'SaaS, ERP and booking platforms for multiple clients.',
    when: 'Oct 2023 — Now', length: formatDuration(monthsSince(2023, 10)), current: true
  },
  {
    company: 'Approved Tech', logo: 'logos/approved-tech.png', role: 'Backend Developer · Internship',
    note: 'PHP, Laravel and MySQL, before joining the team full-time.',
    when: 'Jun — Oct 2023', length: '4 mos'
  },
  {
    company: 'Islamic University of Gaza', logo: 'logos/iug.png', role: 'B.Sc. Information Technology',
    note: 'Web development, databases and software engineering.',
    when: '2020 — 2025', length: ''
  }
];

const mark = item => `<span class="mark">${item.logo ? `<img src="${item.logo}" alt="">` : item.mark}</span>`;
const state = item => item.current ? ' is-current' : '';
const length = item => item.length ? `<span class="length">${item.length}</span>` : '';

const renderList = () => `<div>${items.map(item => `
  <article class="c1-row row${state(item)}">
    <span class="when">${item.when}</span>
    ${mark(item)}
    <div class="c1-main"><h4 class="company">${item.company}</h4><span class="role">${item.role}</span></div>
  </article>`).join('')}</div>`;

const renderThinLine = () => `<div>${items.map(item => `
  <article class="c2-row row${state(item)}">
    <div class="c2-when"><span class="when">${item.when}</span>${length(item)}</div>
    <div class="c2-body">
      <div class="c2-head">${mark(item)}<h4 class="company">${item.company}</h4></div>
      <span class="role">${item.role}</span>
      <p class="note">${item.note}</p>
    </div>
  </article>`).join('')}</div>`;

const renderColumns = () => `<div>${items.map(item => `
  <article class="c3-row row${state(item)}">
    <div class="c3-when"><span class="when">${item.when}</span>${length(item)}</div>
    ${mark(item)}
    <div class="c3-body">
      <h4 class="company">${item.company}</h4>
      <span class="role">${item.role}</span>
      <p class="note">${item.note}</p>
    </div>
  </article>`).join('')}</div>`;

const renderPanel = () => `<div class="c4-panel">${items.map(item => `
  <article class="c4-row row${state(item)}">
    ${mark(item)}
    <div class="c4-body"><h4 class="company">${item.company}</h4><span class="role">${item.role}</span></div>
    <div class="c4-side"><span class="when">${item.when}</span>${length(item)}</div>
  </article>`).join('')}</div>`;

const layouts = [
  { letter: '1', name: 'قائمة', note: 'صف واحد لكل دور: التاريخ والشعار والجهة والمسمى. الأهدأ، وبدون وصف.', render: renderList },
  { letter: '2', name: 'خط رفيع', note: 'خط ونقاط صغيرة تفصل التاريخ عن التفاصيل. النقطة الممتلئة تعني الشغل الحالي.', render: renderThinLine },
  { letter: '3', name: 'أعمدة', note: 'بدون خطوط إطلاقًا: تاريخ وشعار وتفاصيل، بمسافات متساوية.', render: renderColumns },
  { letter: '4', name: 'لوحة ناعمة', note: 'لوحة بيضاء واحدة بفواصل خفيفة، والتاريخ على اليمين، بنفس أسلوب أقسام الصفحة.', render: renderPanel }
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
