const svg = (box, inner) => `<svg class="lg" viewBox="${box}" aria-hidden="true">${inner}</svg>`;

// M and N share their middle stem
const ligature = (w) => {
  const middle = (50 + w) / 2;
  const edge = 1.2 * w;
  return [
    `M4 4h${w}v56h-${w}z`,
    `M46 4h${w}v56h-${w}z`,
    `M${96 - w} 4h${w}v56h-${w}z`,
    `M4 4h${edge}L${middle} ${46 - 1.8 * w} ${46 + w - edge} 4h${edge}L${middle} 46z`,
    `M46 4h${edge}L96 60h-${edge}z`
  ].join('');
};
const LIGATURE = ligature(10);
const joined = svg('0 0 100 64', `<path class="fill" d="${LIGATURE}"/>`);
const thin = svg('0 0 100 64', `<path class="fill" d="${ligature(5)}"/>`);
const single = svg('0 0 104 64', '<path class="thin draw" pathLength="1" stroke-width="8" d="M6 58 22 8 38 46 54 8 70 58 94 8"/>');
const seal = svg('0 0 100 100', `<circle cx="50" cy="50" r="46" stroke-width="5"/><path class="fill" transform="translate(23 32) scale(.54)" d="${LIGATURE}"/>`);
const tile = svg('0 0 100 100', `<rect class="fill" width="100" height="100" rx="26"/><path class="cut" transform="translate(21 30) scale(.58)" d="${LIGATURE}"/>`);

const antLetter = svg('0 0 118 64', `<path class="fill" d="${LIGATURE}"/><circle class="fill" cx="109" cy="53" r="7"/>`);

const text = html => `<span class="lg-text">${html}</span>`;
const mixed = text('<span class="serif">M</span><span class="end">N</span>');
const namla = text('<span>namla</span>');
const mNamla = text('<span class="serif">m</span><span class="end">namla</span>');
const fullName = text('<span class="soft">al-</span><span>namla</span>');

const options = [
  ['MN مدموجان', 'ترشيحي: M وN يشتركان في عمود واحد. بسيط، قوي، ويُقرأ حتى بأصغر حجم', joined],
  ['MN ونقطة', 'الحرفان المدموجان ثم نقطة صغيرة', antLetter],
  ['M إيطالي وN عريض', 'نفس لمسة عنوان البداية: خطك Unbounded مع Instrument Serif', mixed],
  ['MN رفيع', 'نفس الدمج بخط أخف وأهدأ، لكنه يضعف في الأحجام الصغيرة', thin],
  ['خط واحد متصل', 'M وN بحركة قلم واحدة، أقرب لنبض نظام يعمل. يُقرأ أبطأ من غيره', single],
  ['ختم دائري', 'الحرفان داخل دائرة، يتكرر مع دوائر الموقع', seal],
  ['مربع داكن', 'أيقونة جاهزة للتطبيقات وأيقونة التبويب', tile],
  ['namla', 'كلمة بدل رمز، سهلة التذكر، وتكفي وحدها في الشريط', namla],
  ['m + namla', 'حرف اسمك الأول بالإيطالي ثم العائلة', mNamla],
  ['al-namla', 'اسم العائلة كاملًا بدرجتين', fullName]
];

const preview = mark => `
  <div class="lg-big">${mark}</div>
  <div class="lg-side">
    <div class="lg-bar">${mark}<nav><span>GitHub</span><span>LinkedIn</span><span>CV</span></nav></div>
    <div class="lg-row">
      <div class="lg-tab">${mark}<span>Mohammed</span></div>
      <div class="lg-dark">${mark}</div>
      <div class="lg-light">${mark}</div>
    </div>
  </div>`;

document.getElementById('options').innerHTML = options.map(([name, note, mark], index) => `
  <article class="ph-option">
    <div class="ph-label" dir="rtl"><b>${index + 1}. ${name}</b><span>${note}</span></div>
    <button class="ph-replay" type="button">إعادة ↺</button>
    <div class="ph-panes"><div class="ph-pane" dir="ltr">${preview(mark)}</div></div>
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
}, { threshold: .4 });

document.querySelectorAll('.ph-option').forEach((option) => {
  option.querySelector('.ph-replay').addEventListener('click', () => play(option));
  observer.observe(option);
});

document.getElementById('lg-theme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.dataset.theme === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'dark';
});
