const shape = '<svg viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true"><path d="M1 9C22 4 62 2 99 6c1 8 1 17-1 25-34 4-68 4-96 1-2-8-2-15-1-23z"/></svg>';
const risingWide = '<svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30C26 22 62 11 100 1l0 9C72 18 42 28 6 40z"/></svg>';
const risingThin = '<svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 36C28 26 62 14 100 3l0 3C66 18 34 31 3 40z"/></svg>';
const brush = (word, style) => {
  const art = style.includes('is-rise-wide') ? risingWide : style.includes('is-rise-thin') ? risingThin : shape;
  return `<span class="w-brush ${style}">${art}${word}</span>`;
};
const en = (...lines) => `<div class="h-en">${lines.map(line => `<span>${line}</span>`).join('')}</div>`;
const ar = (...lines) => `<div class="h-ar">${lines.map(line => `<span>${line}</span>`).join('')}</div>`;
const EN_1 = 'From the database to the screen,';
const AR_1 = 'من قاعدة البيانات إلى الشاشة،';

const options = [
  ['ضربة صاعدة عريضة', 'كما رسمتها: تصعد من أسفل الكلمة إلى أعلاها', 'is-rise-wide'],
  ['ضربة صاعدة رفيعة', 'نفس الاتجاه بخط أدق وأغمق', 'is-rise-thin'],
  ['فرشاة ممتلئة', 'حواف خشنة ولون كامل', 'is-edge'],
  ['فرشاة جافة', 'خطوط الشعر ظاهرة داخل الضربة', 'is-dry'],
  ['ضربة سفلية', 'تغطي أسفل الكلمة فقط', 'is-low'],
  ['ضربة مائلة', 'فرشاة جافة بميل خفيف', 'is-sweep']
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
