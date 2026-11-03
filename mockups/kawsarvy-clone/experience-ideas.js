const LOGOS = [
  '<span class="xp-logo" role="img" aria-label="Fikritak">F</span>',
  '<span class="xp-logo"><img src="logos/approved-tech.png" alt="Approved Tech"></span>',
  '<span class="xp-logo"><img src="logos/approved-tech.png" alt="Approved Tech"></span>',
  '<span class="xp-logo"><img src="logos/iug.png" alt="Islamic University of Gaza"></span>'
];
const YEARS = [2026, 2023, 2023, 2020];
const NOW = { en: 'Now', ar: 'الآن' };

const ROWS = {
  en: [
    ['Oct 2026 — Now', '1 mo', 'Fikritak', 'Backend Software Engineer · Part-time', 'Building Shahrazad Tours, a booking API for flights, transfers and travel eSIMs.'],
    ['Oct 2023 — Now', '3 yrs 1 mo', 'Approved Tech', 'Backend Software Engineer', 'SaaS, ERP and booking platforms for multiple clients.'],
    ['Jun — Oct 2023', '4 mos', 'Approved Tech', 'Backend Developer · Internship', 'PHP, Laravel and MySQL, before joining the team full-time.'],
    ['2020 — 2025', '', 'Islamic University of Gaza', 'B.Sc. Information Technology', 'Web development, databases and software engineering.']
  ],
  ar: [
    ['أكتوبر 2026 — الآن', 'شهر', 'فكرتك', 'مهندس برمجيات (الواجهة الخلفية) · دوام جزئي', 'أبني Shahrazad Tours، واجهة برمجية لحجز الرحلات والتنقلات وشرائح eSIM.'],
    ['أكتوبر 2023 — الآن', '3 سنوات وشهر', 'Approved Tech', 'مهندس برمجيات (الواجهة الخلفية)', 'منصات SaaS وERP وحجوزات لعدة عملاء.'],
    ['يونيو — أكتوبر 2023', '4 أشهر', 'Approved Tech', 'مطوّر واجهة خلفية · تدريب', 'PHP وLaravel وMySQL، قبل الانضمام إلى الفريق بدوام كامل.'],
    ['2020 — 2025', '', 'الجامعة الإسلامية بغزة', 'بكالوريوس تقنية المعلومات', 'تطوير الويب وقواعد البيانات وهندسة البرمجيات.']
  ]
};

const ART = '<svg viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true"><path fill-rule="evenodd" d="M14 88L34 70 26 70 52 52 44 51 74 34 68 32 96 24C130 15 165 14 200 24C235 34 262 32 296 22L322 14 316 11 346 6 340 14 352 16 342 26 350 30 340 40 348 46 336 54 342 62 326 70C290 84 245 94 195 90C155 87 125 78 92 80C62 82 38 88 14 88ZM70 50C110 37 160 35 205 45C245 53 285 47 325 31C285 49 245 56 205 49C160 40 112 42 70 50Z"/></svg>';
const brush = word => `<span class="w-brush">${ART}${word}</span>`;

const isCurrent = index => index < 2;
const row = (lang, index, { date, after } = {}) => {
  const [dateText, duration, company, role, note] = ROWS[lang][index];
  const classes = ['xp-row', isCurrent(index) && 'is-current', index === 2 && 'is-repeat'].filter(Boolean).join(' ');
  return `
    <article class="${classes}" style="--order:${index}">
      <div class="xp-year">${YEARS[index]}</div>
      ${LOGOS[index]}
      <div class="xp-body">
        <div class="xp-dates"><span class="xp-date">${date ? date(dateText, index) : dateText}${after ? after(index) : ''}</span>${duration ? `<span class="xp-duration">${duration}</span>` : ''}</div>
        <h3 class="xp-company">${company}</h3>
        <span class="xp-role">${role}</span>
        <p class="xp-note">${note}</p>
      </div>
    </article>`;
};
const list = (lang, variant = '', options) => `<div class="xp-list ${variant}">${[0, 1, 2, 3].map(index => row(lang, index, options)).join('')}</div>`;

// Fikritak, Approved Tech with both roles, then the university
const grouped = (lang) => {
  const [, duration, company, role, note] = ROWS[lang][1];
  const intern = ROWS[lang][2];
  const step = (date, length, title, text) => `
    <div class="xd-step">
      <div class="xp-dates"><span class="xp-date">${date}</span><span class="xp-duration">${length}</span></div>
      <span class="xp-role">${title}</span>
      <p class="xp-note">${text}</p>
    </div>`;
  return `<div class="xp-list">
    ${row(lang, 0)}
    <article class="xp-row is-current">
      <div class="xp-year">2023</div>
      ${LOGOS[1]}
      <div class="xp-body">
        <h3 class="xp-company">${company}</h3>
        <div class="xd-steps">${step(ROWS[lang][1][0], duration, role, note)}${step(intern[0], intern[1], intern[3], intern[4])}</div>
      </div>
    </article>
    ${row(lang, 3)}
  </div>`;
};

// Months since Jan 2020, to Nov 2026 (82 months)
const SPANS = [[81, 1], [45, 37], [41, 4], [0, 60]];
const percent = value => `${(value / 82 * 100).toFixed(2)}%`;
const ruler = () => `<div class="xd-ruler" aria-hidden="true">
  ${SPANS.map(([from, span], index) => `<div class="xd-lane"><i class="xd-bar ${isCurrent(index) ? 'is-now' : ''}" style="--from:${percent(from)};--span:${percent(span)};--order:${index}"></i></div>`).join('')}
  <div class="xd-ticks"><span style="--from:0%">2020</span><span style="--from:${percent(41)}">2023</span><span>2026</span></div>
</div>`;

const tags = (index) => {
  if (index === 0) return '<code class="xd-tag">HEAD</code>';
  return index === 1 ? '<code class="xd-tag">main</code>' : '';
};
const live = index => (isCurrent(index) ? '<i class="xd-live"></i>' : '');
const brushNow = lang => text => text.replace(NOW[lang], brush(NOW[lang]));
const title = (lang, en, ar) => (lang === 'en' ? `<div class="h-en"><span>${en}</span></div>` : `<div class="h-ar"><span>${ar}</span></div>`);

const options = [
  ['الحالي', 'للمقارنة', lang => list(lang)],
  ['الخط يرسم نفسه', 'خط السنوات ينزل من صف إلى صف عند الظهور', lang => list(lang, 'v-draw')],
  ['ظهور متتابع', 'الصفوف تظهر بالترتيب مرة واحدة', lang => list(lang, 'v-rise')],
  ['السنوات تعدّ', 'كل سنة تصل إلى قيمتها في أقل من ثانية', lang => list(lang, 'v-count')],
  ['الشعارات تتلوّن', 'موجة لون تمر على الشعارات ثم تعود رمادية', lang => list(lang, 'v-wave')],
  ['نقطة حية', 'نقطة خضراء تنبض مرتين بجانب العمل الحالي', lang => list(lang, '', { after: live })],
  ['علامة git', 'لمسة مبرمج صغيرة: HEAD وmain', lang => list(lang, '', { after: tags })],
  ['فرشاة خلف «الآن»', 'نفس فرشاة الخدمات، لتربط القسمين', lang => list(lang, '', { date: brushNow(lang) })],
  ['تركيز بالماوس', 'مرر الماوس: باقي الصفوف تتراجع', lang => list(lang, 'v-focus')],
  ['الطريق يغمق', 'مرر الماوس: الخط يغمق حتى الصف المختار', lang => list(lang, 'v-fill')],
  ['الوصف عند الطلب', 'مرر الماوس: يفتح الوصف. على الجوال يبقى ظاهرًا', lang => list(lang, 'v-reveal')],
  ['مسطرة الزمن', 'أشرطة بالمدة الحقيقية تُظهر التداخل. مرر الماوس لتمييز الشريط', lang => ruler() + list(lang)],
  ['ترقية داخل شركة واحدة', 'الشركة مرة واحدة، والدوران تحتها كخطوتين', grouped],
  ['جملة فوق القسم', 'بدل الوسم وحده، بنفس خط العناوين', lang => title(lang, 'Three years building systems that keep running.', 'ثلاث سنوات في بناء أنظمة تعمل بثبات.') + list(lang)],
  ['جملة مع فرشاة', 'جملة أقصر، والفرشاة خلف السنة', lang => title(lang, `In production since ${brush('2023.')}`, `في بيئة الإنتاج منذ ${brush('2023.')}`) + list(lang)]
];

document.getElementById('options').innerHTML = options.map(([name, note, build], index) => `
  <article class="ph-option">
    <div class="ph-label" dir="rtl"><b>${index + 1}. ${name}</b><span>${note}</span></div>
    <button class="ph-replay" type="button">إعادة ↺</button>
    <div class="ph-panes">
      <div class="ph-pane" dir="ltr"><div class="xd">${build('en')}</div></div>
      <div class="ph-pane" dir="rtl"><div class="xd">${build('ar')}</div></div>
    </div>
  </article>`).join('');

function countYears(option) {
  option.querySelectorAll('.v-count .xp-year').forEach((year, index) => {
    const target = YEARS[index];
    const started = performance.now();
    const tick = (time) => {
      const progress = Math.min((time - started) / 850, 1);
      year.textContent = Math.round(target - 6 * (1 - progress) ** 3);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function play(option) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  option.classList.remove('is-playing');
  void option.offsetWidth;
  option.classList.add('is-playing');
  countYears(option);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    play(entry.target);
    observer.unobserve(entry.target);
  });
}, { threshold: .4 });

document.querySelectorAll('.ph-option').forEach((option) => {
  option.querySelector('.ph-replay').addEventListener('click', () => play(option));
  observer.observe(option);
});

document.getElementById('xd-theme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.dataset.theme === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'dark';
});
