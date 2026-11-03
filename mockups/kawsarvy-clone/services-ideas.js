const KASHIDA = 'ـ'.repeat(26);
const en = (...lines) => `<div class="h-en">${lines.map(line => `<span>${line}</span>`).join('')}</div>`;
const ar = (...lines) => `<div class="h-ar">${lines.map(line => `<span>${line}</span>`).join('')}</div>`;
const drawn = (word, rtl) => `<span class="w-drawn">${word}<svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="${rtl ? 'M100 6C76 2 56 9 36 5S10 4 0 7' : 'M0 6C24 2 44 9 64 5S90 4 100 7'}"/></svg></span>`;
const stretch = (start, end) => `<span class="w-join"><span>${start}</span><span class="ar-stretch"><span>${KASHIDA}</span></span><span>${end}</span></span>`;
const stack = wrapped => `<div class="sv-link">${wrapped}</div>`;
const line = '<span class="sv-line" aria-hidden="true"><b></b><i></i><b></b></span>';
const steps = words => `<div class="sv-steps">${words.map((word, index) => `<span style="--order:${index}">${word}</span>`).join('<span style="--order:0">·</span>')}</div>`;

const EN_1 = 'From the database to the screen,';
const EN_2 = 'built to run in production.';
const AR_1 = 'من قاعدة البيانات إلى الشاشة،';
const AR_2 = 'أنظمة تعمل بثبات في الإنتاج.';

const headings = [
  ['الحالي', 'للمقارنة', en(EN_1, EN_2), ar(AR_1, AR_2)],
  ['فرق الأوزان', 'الكلمتان الأهم أثقل، بدون حركة', en('From the <span class="w-black">database</span> to the <span class="w-black">screen,</span>', `<span class="w-soft">${EN_2}</span>`), ar('من <span class="w-black">قاعدة البيانات</span> إلى <span class="w-black">الشاشة،</span>', `<span class="w-soft">${AR_2}</span>`)],
  ['خط يصل الكلمتين', 'يرسم المعنى نفسه بخط ونقطتين', stack(en('<span class="w-black">Database</span>') + line + en('<span class="w-black">Screen</span>') + `<p class="tc-note">${EN_2}</p>`), stack(ar('<span class="w-black">قاعدة البيانات</span>') + line + ar('<span class="w-black">الشاشة</span>') + `<p class="tc-note">${AR_2}</p>`)],
  ['نقطة تتحرك', 'نقطة تعبر الطريق مرة ثم تقف', stack(en(EN_1, EN_2) + '<div class="sv-travel" aria-hidden="true"><i></i></div><div class="sv-ends"><span>database</span><span>screen</span></div>'), stack(ar(AR_1, AR_2) + '<div class="sv-travel" aria-hidden="true"><i></i></div><div class="sv-ends"><span>قاعدة البيانات</span><span>الشاشة</span></div>')],
  ['خطوات تضيء', 'طبقات البناء تضيء بالترتيب', stack(en(EN_1, EN_2) + steps(['Database', 'API', 'Interface', 'Production'])), stack(ar(AR_1, AR_2) + steps(['البيانات', 'الخادم', 'الواجهة', 'الإنتاج']))],
  ['خط باليد', 'تحت كلمة الإنتاج', en(EN_1, `built to run in ${drawn('production.')}`), ar(AR_1, `أنظمة تعمل بثبات في ${drawn('الإنتاج.', true)}`)],
  ['قلم تحديد', 'لون خفيف خلف الكلمة', en(EN_1, `built to run in <span class="w-marker">production.</span>`), ar(AR_1, 'أنظمة تعمل بثبات في <span class="w-marker">الإنتاج.</span>')],
  ['خط مختلف', 'كلمة بخط مائل، وبالعربي تمديد خفيف', en(EN_1, 'built to run in <span class="w-serif">production.</span>'), ar('من قاعدة البيانات إلى', `${stretch('الشـ', 'ـاشة،')} أنظمة تعمل بثبات.`)],
  ['حالة النظام', 'نقطة خضراء تنبض مرتين', stack(en(EN_1, EN_2) + '<span class="sv-status"><i></i>All systems running</span>'), stack(ar(AR_1, AR_2) + '<span class="sv-status"><i></i>كل الأنظمة تعمل</span>')],
  ['أمر في الطرفية', 'لمسة مبرمج بعلامة نجاح', stack(en(EN_1, EN_2) + '<code class="sv-command">$ deploy <b>--production</b> <span class="sv-done">✓</span></code>'), stack(ar(AR_1, AR_2) + '<code class="sv-command">$ deploy <b>--production</b> <span class="sv-done">✓</span></code>')],
  ['سطر كود', 'تعليق صغير فوق العنوان', en('<span class="w-comment">// what I do</span>', EN_1, EN_2), ar('<span class="w-comment">// ما أقدمه</span>', AR_1, AR_2)]
];

const icons = [
  '<path class="ink" d="M21 3 38 11 21 19 4 11z"/><path d="M4 18 21 26 38 18M4 25 21 33 38 25"/>',
  '<circle cx="9" cy="18" r="6"/><circle class="ink" cx="33" cy="18" r="6"/><path d="M15 18h12"/>',
  '<path d="M8 14a14 14 0 0 1 24-5l3 3M35 5v7h-7"/><path d="M34 22a14 14 0 0 1-24 5l-3-3M7 31v-7h7"/>',
  '<rect x="9" y="2" width="24" height="12" rx="2"/><path d="M21 14v6"/><path class="ink" d="M21 18c5.500 0 10 1.800 10 4s-4.500 4-10 4-10-1.800-10-4 4.500-4 10-4z"/><path d="M11 22v8c0 2.200 4.500 4 10 4s10-1.800 10-4v-8"/>'
];

const textEn = [
  ['Multi-tenant SaaS', 'One platform serving many businesses.'],
  ['APIs & Integrations', 'Documented APIs, kept in sync.'],
  ['Real-time & Offline', 'Live updates, and a POS that keeps working.'],
  ['Full-stack Delivery', 'Interfaces shipped with their backend.']
];
const textAr = [
  ['أنظمة متعددة العملاء', 'منصة واحدة تخدم شركات كثيرة.'],
  ['واجهات برمجية وتكاملات', 'واجهات موثقة تبقى متزامنة.'],
  ['الوقت الفعلي والعمل دون اتصال', 'تحديثات فورية، ونقطة بيع تواصل العمل.'],
  ['تطوير متكامل', 'واجهات تُسلَّم مع أنظمتها الخلفية.']
];

const mini = (text, classes, numbered) => `<div class="sv-mini ${classes}">${text.map(([title, body], index) => `
  <article class="sv-item" style="--order:${index}">
    ${numbered ? `<span class="sv-num">0${index + 1}</span>` : ''}
    <svg viewBox="0 0 42 36" aria-hidden="true">${icons[index]}</svg>
    <h3>${title.replace('&', '&amp;')}</h3>
    <p>${body}</p>
  </article>`).join('')}</div>`;

const grids = [
  ['الحالي', 'للمقارنة', '', false],
  ['أرقام صغيرة', 'ترقيم هادئ فوق كل خدمة', '', true],
  ['خطوط فاصلة', 'شبكة بخطوط رفيعة مثل جدول', 'sv-lines', false],
  ['دوائر', 'نفس أسلوب دائرة قسم التواصل', 'sv-circles', false],
  ['تفاعل بالماوس', 'خلفية خفيفة عند المرور على الخدمة', 'sv-hover', false],
  ['أيقونات تُرسم', 'الخطوط ترسم نفسها عند الظهور', 'sv-draw', false],
  ['ظهور متتابع', 'الخدمات تظهر واحدة بعد الأخرى', 'sv-rise', false]
].map(([name, note, classes, numbered]) => [name, note, mini(textEn, classes, numbered), mini(textAr, classes, numbered)]);

const render = (list, start) => list.map(([name, note, english, arabic], index) => `
  <article class="ph-option">
    <div class="ph-label"><b>${index + start}. ${name}</b><span>${note}</span></div>
    <button class="ph-replay" type="button">إعادة ↺</button>
    <div class="ph-panes">
      <div class="ph-pane" dir="ltr">${english}</div>
      <div class="ph-pane" dir="rtl">${arabic}</div>
    </div>
  </article>`).join('');

document.getElementById('headings').innerHTML = render(headings, 1);
document.getElementById('grids').innerHTML = render(grids, headings.length + 1);

document.querySelectorAll('.sv-draw svg :not(.ink)').forEach(shape => shape.setAttribute('pathLength', '1'));

function play(option) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  option.classList.remove('is-playing');
  void option.offsetWidth;
  option.classList.add('is-playing');
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    play(entry.target);
    observer.unobserve(entry.target);
  });
}, { threshold: .5 });

document.querySelectorAll('.ph-option').forEach((option) => {
  option.querySelector('.ph-replay').addEventListener('click', () => play(option));
  observer.observe(option);
});

document.getElementById('sv-theme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.dataset.theme === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'dark';
});
