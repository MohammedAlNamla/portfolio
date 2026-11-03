// An underline flourish: it leaves the last letter thin, swells, then thins out again to the left
const TAIL = '<svg class="sg-tail" viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden="true"><path d="M200 2C150 3 70 8 2 20 72 13 152 8 200 2Z"/></svg>';

const mark = ({ svg, font, text, scale = 1, tail = false, from, length, drop }) => {
  if (svg) return svg;
  const vars = [`font-family:'${font}',cursive`, `--scale:${scale}`, from && `--from:${from}`, length && `--length:${length}`, drop && `--drop:${drop}`].filter(Boolean).join(';');
  return `<span class="sg" style="${vars}">${text}${tail ? TAIL : ''}</span>`;
};

// Drawn with one pen stroke: m and n as three leaning humps
const HUMPS = 'M5 50C12 34 17 17 22 18 27 19 18 42 20 50 26 34 33 17 38 18 43 19 34 42 36 50 42 34 49 17 54 18 59 19 49 41 53 49';
const drawn = (exit, width = 4) => `<svg class="sg-pen" viewBox="0 0 ${exit ? 104 : 62} 62" aria-hidden="true"><path pathLength="1" stroke-width="${width}" d="${HUMPS}${exit ? 'C57 56 76 50 99 44' : ''}"/></svg>`;

const options = [
  ['خط قلم واحد', 'ترشيحي: m وn بحركة قلم واحدة بخط ثابت، أخف ما يمكن ويبقى واضحًا صغيرًا', { svg: drawn(false) }],
  ['خط قلم بذيل قصير', 'نفس الحركة مع خروج قصير كنهاية التوقيع', { svg: drawn(true) }],
  ['خط قلم أرفع', 'أهدأ، ويناسب الأحجام الكبيرة أكثر', { svg: drawn(true, 2.6) }],
  ['mn بخط Ms Madi', 'حرفان صغيران بخط قلم ناعم', { font: 'Ms Madi', text: 'mn', scale: 1.35 }],
  ['mn بخط De Haviland', 'أكثر رشاقة بسماكة تتغير قليلًا', { font: 'Mr De Haviland', text: 'mn', scale: 1.55 }],
  ['mn بخط Whisper', 'مائل وسريع كبداية توقيع', { font: 'Whisper', text: 'mn', scale: 1.5 }],
  ['M وحدها بخط Ms Madi', 'حرف واحد فقط، أبسط شعار ممكن', { font: 'Ms Madi', text: 'M', scale: 1.35 }],
  ['M وحدها بخط De Haviland', 'حرف واحد بانحناءات أجمل', { font: 'Mr De Haviland', text: 'M', scale: 1.5 }]
];

const preview = settings => `
  <div class="sg-big">${mark(settings)}</div>
  <div class="sg-side">
    <div class="sg-bar">${mark(settings)}<nav><span>GitHub</span><span>LinkedIn</span></nav></div>
    <div class="sg-row">
      <div class="sg-dark">${mark(settings)}</div>
      <div class="sg-light">${mark(settings)}</div>
      <div class="sg-tab">${mark(settings)}</div>
    </div>
  </div>`;

document.getElementById('options').innerHTML = options.map(([name, note, settings], index) => `
  <article class="ph-option">
    <div class="ph-label" dir="rtl"><b>${index + 1}. ${name}</b><span>${note}</span></div>
    <button class="ph-replay" type="button">إعادة ↺</button>
    <div class="ph-panes"><div class="ph-pane" dir="ltr">${preview(settings)}</div></div>
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

document.getElementById('sg-theme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.dataset.theme === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'dark';
});
