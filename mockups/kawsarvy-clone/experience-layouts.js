const today = new Date();
const nowYear = today.getFullYear() + today.getMonth() / 12;

function formatDuration(months) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (rest || !years) parts.push(`${Math.max(rest, 1)} ${rest > 1 ? 'months' : 'month'}`);
  return parts.join(' ');
}

const monthsSince = (year, month) => (today.getFullYear() - year) * 12 + today.getMonth() + 1 - month;

// start and end are decimal years for the time chart; education months are not known, so its bar is approximate
const items = [
  {
    company: 'Fikritak', mark: 'F', role: 'Backend Software Engineer · Part-time',
    note: 'Building Shahrazad Tours, a booking API for flights, transfers and travel eSIMs.',
    date: 'Oct 2026 — Present', duration: formatDuration(monthsSince(2026, 10)),
    year: 2026, start: 2026.75, end: nowYear, current: true
  },
  {
    company: 'Approved Tech', logo: 'logos/approved-tech.png', role: 'Backend Software Engineer',
    note: 'SaaS, ERP and booking platforms for multiple clients.',
    date: 'Oct 2023 — Present', duration: formatDuration(monthsSince(2023, 10)),
    year: 2023, start: 2023.75, end: nowYear, current: true
  },
  {
    company: 'Approved Tech', logo: 'logos/approved-tech.png', role: 'Backend Developer · Internship',
    note: 'PHP, Laravel and MySQL, before joining the team full-time.',
    date: 'Jun 2023 — Oct 2023', duration: '4 months',
    year: 2023, start: 2023.42, end: 2023.75
  },
  {
    company: 'Islamic University of Gaza', logo: 'logos/iug.png', role: 'B.Sc. Information Technology',
    note: 'Web development, databases and software engineering.',
    date: '2020 — 2025', duration: '',
    year: 2020, start: 2020, end: 2025.5, education: true
  }
];

const current = items.filter(item => item.current);
const internship = items[2];
const education = items[3];

const mark = item => `<span class="mark">${item.logo ? `<img src="${item.logo}" alt="">` : item.mark}</span>`;
const nowPill = '<span class="now-pill"><span class="now-dot"></span>Now</span>';
const durationTag = item => item.duration ? `<span class="duration">${item.duration}</span>` : '';
const details = item => `<h4 class="company">${item.company}</h4><span class="role">${item.role}</span><p class="note">${item.note}</p>`;
const currentClass = item => item.current ? ' is-current' : '';

const aRow = item => `
  <article class="a-row row${currentClass(item)}">
    <div class="a-when"><span class="date">${item.date}</span>${durationTag(item)}</div>
    ${mark(item)}
    <div class="a-body">${details(item)}</div>
  </article>`;

const aGroup = (title, rows, dot) => `
  <section class="a-group">
    <h3 class="group-title">${dot ? '<span class="now-dot"></span>' : ''}${title}</h3>
    ${rows.map(aRow).join('')}
  </section>`;

const renderGrouped = () => aGroup('Now', current, true) + aGroup('Before', [internship]) + aGroup('Education', [education]);

const renderYears = () => items.map((item, index) => `
  <article class="b-row row${currentClass(item)}${index && items[index - 1].year === item.year ? ' is-repeat' : ''}">
    <div class="b-year">${item.year}</div>
    ${mark(item)}
    <div class="b-body">
      <div class="b-top"><span class="date">${item.date}</span>${durationTag(item)}${item.current ? nowPill : ''}</div>
      ${details(item)}
    </div>
  </article>`).join('');

const renderCards = () => `
  <h3 class="group-title"><span class="now-dot"></span>Where I work now</h3>
  <div class="now-cards">
    ${current.map(item => `
      <article class="now-card is-current">
        <div class="now-card-top">${mark(item)}${durationTag(item)}</div>
        ${details(item)}
        <span class="date">${item.date}</span>
      </article>`).join('')}
  </div>
  <div class="earlier">
    <h3 class="group-title">Earlier</h3>
    ${[internship, education].map(item => `
      <article class="earlier-row row">
        ${mark(item)}
        <div class="earlier-main"><h4 class="company">${item.company}</h4><span class="role">${item.role}</span></div>
        <div class="earlier-when"><span class="date">${item.date}</span>${durationTag(item)}</div>
      </article>`).join('')}
  </div>`;

const chartStart = 2020;
const chartEnd = Math.ceil(nowYear) + .5;
const chartX = year => ((year - chartStart) / (chartEnd - chartStart)) * 100;
const chartYears = [2020, 2022, 2024];

const renderChart = () => `
  <div class="d-chart">
    <div class="d-axis">
      ${chartYears.map(year => `<span style="left:${chartX(year)}%">${year}</span>`).join('')}
    </div>
    <div class="d-today" style="left:${chartX(nowYear)}%"><span class="d-today-label">Today</span></div>
    ${items.map(item => `
      <article class="d-row row${currentClass(item)}">
        <div class="d-info">
          ${mark(item)}
          <div><h4 class="company">${item.company}</h4><span class="role">${item.role}</span></div>
          <div class="d-date"><span class="date">${item.date}</span>${durationTag(item)}</div>
        </div>
        <div class="d-track"><span class="d-bar${item.education ? ' d-bar-edu' : ''}" style="left:${chartX(item.start)}%;width:${chartX(item.end) - chartX(item.start)}%"></span></div>
      </article>`).join('')}
  </div>`;

const renderTable = () => `
  <div class="e-head"><span>Period</span><span>Where</span><span>Role</span><span></span></div>
  ${items.map(item => `
    <article class="e-row row${currentClass(item)}">
      <div class="e-when"><span class="date">${item.date}</span>${durationTag(item)}</div>
      <div class="e-company">${mark(item)}<h4 class="company">${item.company}</h4></div>
      <div class="e-role"><span class="role">${item.role}</span></div>
      <div class="e-status">${item.current ? nowPill : item.education ? 'Degree' : 'Completed'}</div>
    </article>`).join('')}`;

const layouts = [
  { letter: 'A', name: 'مجموعات', note: 'الديمو الحالي: الآن، ثم قبل، ثم الدراسة، مع عمود ثابت للتواريخ.', render: renderGrouped },
  { letter: 'B', name: 'سنوات كبيرة', note: 'خط زمني واحد بسنوات البداية بخط كبير، وعلامة Now للشغل الحالي.', render: renderYears },
  { letter: 'C', name: 'بطاقات الحاضر', note: 'الشغل الحالي ببطاقتين بارزتين، والباقي قائمة قصيرة تحتهما.', render: renderCards },
  { letter: 'D', name: 'مخطط زمني', note: 'أشرطة على محور السنوات تعرض التداخل ومدة كل دور، والخط الأخضر هو اليوم.', render: renderChart },
  { letter: 'E', name: 'جدول هادئ', note: 'أبسطها: فترة، وجهة، ودور، وحالة، وأسهلها للمسح السريع.', render: renderTable }
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
