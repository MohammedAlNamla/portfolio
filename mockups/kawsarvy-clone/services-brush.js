// A wavy body with frayed ends. The inner shapes are the dry gaps left by the bristles.
const BODY = 'M14 88L34 70 26 70 52 52 44 51 74 34 68 32 96 24C130 15 165 14 200 24C235 34 262 32 296 22L322 14 316 11 346 6 340 14 352 16 342 26 350 30 340 40 348 46 336 54 342 62 326 70C290 84 245 94 195 90C155 87 125 78 92 80C62 82 38 88 14 88Z';
const GAPS = 'M70 50C110 37 160 35 205 45C245 53 285 47 325 31C285 49 245 56 205 49C160 40 112 42 70 50ZM120 60C140 55 160 54 178 56C160 56 140 57 120 60ZM130 25L150 22 172 24 150 25ZM240 35L262 34 285 28 262 37Z';
const STRANDS = 'M3 97L30 82 12 96ZM18 68L48 49 28 67ZM58 26L88 17 68 28ZM350 2L358 1 330 12ZM354 36L359 37 345 48ZM300 90L330 76 312 90Z';
const art = `<svg viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true"><path fill-rule="evenodd" d="${BODY}${GAPS}"/><path d="${STRANDS}"/></svg>`;
const brush = (word, style) => `<span class="w-brush ${style}">${art}${word}</span>`;
const en = (...lines) => `<div class="h-en">${lines.map(line => `<span>${line}</span>`).join('')}</div>`;
const ar = (...lines) => `<div class="h-ar">${lines.map(line => `<span>${line}</span>`).join('')}</div>`;
const EN_1 = 'From the database to the screen,';
const AR_1 = 'من قاعدة البيانات إلى الشاشة،';

const options = [
  ['هادئة', 'الدرجة التي أنصح بها', ''],
  ['أخف', 'تكاد تذوب في الخلفية', 'is-faint'],
  ['أوضح', 'حضورها أقوى قليلًا', 'is-clear'],
  ['أعرض', 'بالدرجة الهادئة وتتجاوز الكلمة أكثر', 'is-wide']
];

document.getElementById('options').innerHTML = options.map(([name, note, style], index) => `
  <article class="ph-option">
    <div class="ph-label"><b>${index + 1}. ${name}</b><span>${note}</span></div>
    <button class="ph-replay" type="button">إعادة ↺</button>
    <div class="ph-panes">
      <div class="ph-pane" dir="ltr">${en(EN_1, `built to run in ${brush('production.', style)}`)}</div>
      <div class="ph-pane" dir="rtl">${ar(AR_1, `أنظمة تعمل بثبات في ${brush('الإنتاج.', style)}`)}</div>
    </div>
  </article>`).join('');

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
