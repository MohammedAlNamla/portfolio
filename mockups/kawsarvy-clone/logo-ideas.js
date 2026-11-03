const svg = (box, inner) => `<svg class="lg" viewBox="${box}" aria-hidden="true">${inner}</svg>`;

// Lowercase m and n share their stems, so the pair becomes three arches in a row
const ARCHES = 'M8 4V60M8 26a15 15 0 0 1 30 0V60M38 26a15 15 0 0 1 30 0V60M68 26a15 15 0 0 1 30 0V60';
const arches = svg('0 0 106 64', `<path class="draw" pathLength="1" stroke-width="11" d="${ARCHES}"/>`);
const archesThin = svg('0 0 106 64', `<path class="draw" pathLength="1" stroke-width="5" d="${ARCHES}"/>`);
const archTile = svg('0 0 100 100', `<rect class="fill" width="100" height="100" rx="24"/><path transform="translate(19 29) scale(.59)" style="stroke:var(--tile-ink)" stroke-width="11" d="${ARCHES}"/>`);
const archDot = svg('0 0 124 64', `<path stroke-width="11" d="${ARCHES}"/><circle cx="115" cy="54" r="6.5" class="live"/>`);

// Capital M and N cut out of one solid block
const triangleBlock = svg('0 0 100 64', '<path class="fill" fill-rule="evenodd" d="M0 0H100V64H0ZM20 0H44L32 20ZM14 64V27L31 50V64ZM48 64V27L31 50V64ZM62 0H84V34ZM62 64V30L84 64Z"/>');

// A ribbon folded into MN, with two tones
const ribbon = svg('0 0 100 64', '<path class="fill" d="M4 4H16L30 28V46Z" style="opacity:.42"/><path class="fill" d="M56 4H44L30 28V46Z"/><path class="fill" d="M46 4H56V60H46Z" style="opacity:.42"/><path class="fill" d="M4 4H14V60H4Z"/><path class="fill" d="M46 4H58L96 60H84Z"/><path class="fill" d="M86 4H96V60H86Z" style="opacity:.42"/>');

// The letters as a small system diagram
const nodes = svg('0 0 100 64', '<path class="draw" pathLength="1" stroke-width="3.5" d="M8 58V6L32 42 56 6V58M56 6 92 58V6"/><g class="fill"><circle cx="8" cy="58" r="5.5"/><circle cx="8" cy="6" r="5.5"/><circle cx="32" cy="42" r="5.5"/><circle cx="56" cy="6" r="5.5"/><circle cx="56" cy="58" r="5.5"/><circle cx="92" cy="58" r="5.5"/></g><circle class="live" cx="92" cy="6" r="5.5"/>');

// One stroke of the pen, with a long exit like a signature
const signature = svg('0 0 124 64', '<path class="thin draw" pathLength="1" stroke-width="5" d="M5 50C12 34 17 17 22 18 27 19 18 42 20 50 26 34 33 17 38 18 43 19 34 42 36 50 42 34 49 17 54 18 59 19 49 41 53 49 58 58 88 48 119 41"/>');

const options = [
  ['ثلاثة أقواس', 'ترشيحي: m وn الصغيرتان تشتركان في أعمدتهما فتصبحان ثلاثة أقواس، كجسر مبني. وتكرر قوس مشاريعك', arches],
  ['أقواس ونقطة حية', 'الأقواس ثم نقطة خضراء: نظام يعمل الآن', archDot],
  ['أقواس رفيعة', 'أخف وأهدأ، وأنسب لهدوء الموقع على الأحجام الكبيرة', archesThin],
  ['أيقونة الأقواس', 'نفس الفكرة كأيقونة تبويب وتطبيق', archTile],
  ['شريط مطوي', 'M وN من شريط واحد ينثني بدرجتين، فيظهر عمق بدون ألوان', ribbon],
  ['كتلة محفورة', 'MN كبيرة من كتلة واحدة، والفراغات مثلثات حادة', triangleBlock],
  ['مخطط نظام', 'الحروف نقاط متصلة كمخطط قاعدة بيانات، وآخر نقطة خضراء', nodes],
  ['توقيع', 'حركة قلم واحدة بذيل طويل، كالكشيدة لكن بلغة التوقيع', signature]
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
