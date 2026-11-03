const KASHIDA = 'ـ'.repeat(26);
const stretch = (start, end) =>
  `<span class="tc-black tc-join"><span>${start}</span><span class="ar-stretch"><span>${KASHIDA}</span></span><span>${end}</span></span>`;
const drawn = word =>
  `<span class="tc-drawn">${word}<svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M100 6C74 2 54 9 34 5S10 4 0 7"/></svg></span>`;
const marker = word => `<span class="tc-marker">${word}</span>`;
const rise = (word, order, extra = '') => `<span class="tc-rise ${extra}" style="--order:${order}">${word}</span>`;
const title = (...lines) => `<div class="tc-title">${lines.map(line => `<span>${line}</span>`).join('')}</div>`;
const small = (text, extra = '') => `<p class="tc-small ${extra}">${text}</p>`;
const brands = 'Approved Tech · جامعة فلسطين · الجامعة الإسلامية · NetSpeed · فكرتك'.split(' · ');
const strip = extra => {
  const run = brands.map(name => `<span>${name}</span>`).join('');
  return `<div class="tc-strip ${extra}"><div class="tc-strip-track">${run}${run}${run}${run}</div></div>`;
};
const handshake = ring => `<div class="tc-circle"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.500 2.500a1 1 0 1 0 3-3l-3.880-3.880a3 3 0 0 0-4.240 0l-.880.880a1 1 0 1 1-3-3l2.810-2.810a5.790 5.790 0 0 1 7.060-.870l.470.280a2 2 0 0 0 1.420.250L21 4"/><path class="ink" d="M20.700 2.700 22.200 14h-2.500l-1.100-9.800z"/><path d="M3 3 2 14l6.500 6.500a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>${ring ? '<svg class="tc-ring" viewBox="0 0 100 100" aria-hidden="true"><circle pathLength="1" cx="50" cy="50" r="48"/></svg>' : ''}</div>`;
const contact = title('<span class="tc-soft">لنبنِ معًا</span>', `شيئًا ${stretch('عظـ', 'ـيمًا.')}`);

const sections = [
  {
    title: 'القسم الأول',
    items: [
      ['سطر تعريف', title('<span class="tc-soft">أبني أنظمة</span>', `تعمل ${stretch('وتكـ', 'ـبر.')}`) + small('مهندس برمجيات من فلسطين')],
      ['تقنياتي', title('<span class="tc-soft">أبني أنظمة</span>', `تعمل ${stretch('وتكـ', 'ـبر.')}`) + small('Laravel  ·  Nuxt  ·  PostgreSQL  ·  Flutter', 'tc-mini')],
      ['إشارة نزول', title('<span class="tc-soft">أبني أنظمة</span>', `تعمل ${stretch('وتكـ', 'ـبر.')}`) + '<div class="tc-scroll" aria-hidden="true"></div>']
    ]
  },
  {
    title: 'شريط الشركات',
    items: [
      ['حواف تتلاشى', strip('tc-fade')],
      ['عنوان صغير', `${small('جهات عملت وتعلمت معها')}<div style="height:14px"></div>${strip('tc-fade')}`],
      ['عنوان جانبي', `<div class="tc-side"><b>عملت مع</b>${strip('tc-fade')}</div>`]
    ]
  },
  {
    title: 'المشاريع',
    items: [
      ['تمديد الكلمة', title('<span class="tc-soft">بعض</span>', stretch('المنتجـ', 'ـات'), '<span class="tc-soft">التي بنيتها.</span>')],
      ['فرق الأوزان', title('<span class="tc-muted">بعض المنتجات</span>', '<span class="tc-black">التي بنيتها.</span>')],
      ['خط باليد', title('<span class="tc-soft">بعض المنتجات</span>', `التي ${drawn('بنيتها.')}`)],
      ['عبارة أقصر', title(rise('ما', 0, 'tc-soft') + ' ' + rise('بنيتُه', 1, 'tc-black'), rise('حتى', 2, 'tc-soft') + ' ' + rise('الآن.', 3, 'tc-soft'))]
    ]
  },
  {
    title: 'الخدمات',
    items: [
      ['خط يصل بينهما', `${title('<span class="tc-black">قاعدة البيانات</span>')}<span class="tc-connector" aria-hidden="true"><span class="tc-dot"></span><span class="tc-track"></span><span class="tc-dot"></span></span>${title('<span class="tc-black">الشاشة</span>')}${small('أنظمة تعمل بثبات في الإنتاج.')}`],
      ['تمديد كالرحلة', title('<span class="tc-soft">من قاعدة البيانات</span>', `إلى ${stretch('الشـ', 'ـاشة.')}`) + small('أنظمة تعمل بثبات في الإنتاج.')],
      ['قلم تحديد', title('<span class="tc-soft">من قاعدة البيانات إلى الشاشة،</span>', `<span class="tc-soft">أنظمة تعمل بثبات في</span> ${marker('الإنتاج.')}`)],
      ['فرق الأوزان', title('<span class="tc-muted">من</span> <span class="tc-black">قاعدة البيانات</span>', '<span class="tc-muted">إلى</span> <span class="tc-black">الشاشة.</span>')]
    ]
  },
  {
    title: 'الخبرات',
    items: [
      ['تمديد الكلمة', title(`${stretch('رحلـ', 'ـتي')} <span class="tc-soft">حتى الآن.</span>`)],
      ['كلمة بكلمة', title(rise('خطوة', 0, 'tc-soft') + ' ' + rise('بعد', 1, 'tc-soft') + ' ' + rise('خطوة.', 2, 'tc-black'))],
      ['خط باليد', title(`<span class="tc-soft">من التدريب</span> إلى ${drawn('الإنتاج.')}`)],
      ['قلم تحديد', title(`<span class="tc-soft">أكثر من 3 سنوات في</span> ${marker('البرمجة.')}`)]
    ]
  },
  {
    title: 'التواصل',
    items: [
      ['دائرة تُرسم', handshake(true) + contact],
      ['سطر قريب', handshake(false) + contact + small('راسلني مباشرة، وأرد عليك بنفسي.')],
      ['الإيميل عنوانًا', handshake(false) + contact + `<div style="direction:ltr;margin-top:10px">${drawn('<span class="tc-mail">moh.alnamla@gmail.com</span>')}</div>`]
    ]
  }
];

document.getElementById('sections').innerHTML = sections.map(section => `
  <section class="tc-section">
    <h2>${section.title}</h2>
    <div class="tc-grid">
      ${section.items.map(([name, content], index) => `
        <article class="tc-card">
          <span class="tc-number">${index + 1}</span>
          ${content}
          <span class="tc-name">${name}</span>
          <button class="tc-replay" type="button">إعادة ↺</button>
        </article>`).join('')}
    </div>
  </section>`).join('');

function play(card) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  card.classList.remove('is-playing');
  void card.offsetWidth;
  card.classList.add('is-playing');
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    play(entry.target);
    observer.unobserve(entry.target);
  });
}, { threshold: .5 });

document.querySelectorAll('.tc-card').forEach((card) => {
  card.querySelector('.tc-replay').addEventListener('click', () => play(card));
  observer.observe(card);
});

document.getElementById('tc-theme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.dataset.theme === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'dark';
});
