const KASHIDA = 'ـ'.repeat(26);
const ART = '<svg viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true"><path fill-rule="evenodd" d="M14 88L34 70 26 70 52 52 44 51 74 34 68 32 96 24C130 15 165 14 200 24C235 34 262 32 296 22L322 14 316 11 346 6 340 14 352 16 342 26 350 30 340 40 348 46 336 54 342 62 326 70C290 84 245 94 195 90C155 87 125 78 92 80C62 82 38 88 14 88ZM70 50C110 37 160 35 205 45C245 53 285 47 325 31C285 49 245 56 205 49C160 40 112 42 70 50Z"/></svg>';

const en = (...lines) => `<div class="h-en">${lines.map(line => `<span>${line}</span>`).join('')}</div>`;
const ar = (...lines) => `<div class="h-ar">${lines.map(line => `<span>${line}</span>`).join('')}</div>`;
const stack = (...parts) => `<div class="xr-stack">${parts.join('')}</div>`;
const brush = word => `<span class="w-brush">${ART}${word}</span>`;
const drawn = (word, rtl) => `<span class="w-drawn">${word}<svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="${rtl ? 'M100 6C76 2 56 9 36 5S10 4 0 7' : 'M0 6C24 2 44 9 64 5S90 4 100 7'}"/></svg></span>`;
const between = (start, end) => `<span class="xr-between"><span>${start}</span><i></i><span>${end}</span></span>`;
const words = list => list.map((word, index) => `<span class="w-focus" style="--order:${index}">${word}</span>`).join(' ');
const wind = '<svg class="xr-wind" viewBox="0 0 300 40" aria-hidden="true"><path d="M4 28C50 6 90 6 130 20S220 36 296 10"/><circle r="4"/></svg>';
const stations = (first, second, last) => `<div class="xr-stations"><span style="--order:0">${first}</span><span style="--order:1">${second}</span><span style="--order:2">${last}</span></div>`;
const drop = '<i class="xr-drop"></i><i class="xr-drop-end"></i>';
const live = '<i class="xr-dot" aria-hidden="true"></i>';

const options = [
  ['الحالي', 'خط يد تحت «حتى الآن»', en(`The road <span class="w-serif">so far.</span>`), ar(`الطريق ${drawn('حتى الآن.', true)}`)],
  ['الكلمة نفسها طريق', 'الكلمة تتمدد بالعربي، والحروف تستقر بالإنجليزي', en('<span class="w-track">The road so far.</span>'), ar(`<span class="w-join xr-long"><span>الطريـ</span><span class="ar-stretch"><span>${KASHIDA}</span></span><span>ـق</span></span> حتى الآن.`)],
  ['خط بين الكلمتين', 'مسافة مرسومة بين البداية واليوم', en(between('The road', 'so far.')), ar(between('الطريق', 'حتى الآن.'))],
  ['من الباهت إلى الغامق', 'بنفس تدرج سنوات العمل الحالي', en('<span class="xr-fade">The road so far.</span>'), ar('<span class="xr-fade">الطريق حتى الآن.</span>')],
  ['خطان مختلفان', 'مائل بالإنجليزي، وفرق وزن بالعربي', en(`The road <span class="w-serif">so far.</span>`), ar('<span class="w-soft">الطريق</span> <span class="w-black">حتى الآن.</span>')],
  ['فرشاة', 'نفس فرشاة الخدمات', en(`The road ${brush('so far.')}`), ar(`الطريق ${brush('حتى الآن.')}`)],
  ['درجتان', 'سطران متدرجان كخطوتين', `<div class="h-en xr-steps"><span>The road</span><span>so far.</span></div>`, `<div class="h-ar xr-steps"><span>الطريق</span><span>حتى الآن.</span></div>`],
  ['كبير وصغير', 'الطريق هي الكلمة، والباقي همس', en('<span class="xr-big">The road</span><span class="xr-small">so far.</span>'), ar('<span class="xr-big">الطريق</span><span class="xr-small">حتى الآن.</span>')],
  ['طريق متعرج', 'نقطة تمشي مرة واحدة ثم تقف عند النهاية', stack(wind, en('The road so far.')), stack(wind, ar('الطريق حتى الآن.'))],
  ['محطات', 'ثلاث نقاط صغيرة تحت الجملة', stack(en('The road so far.'), stations('2020', '2023', 'Now')), stack(ar('الطريق حتى الآن.'), stations('2020', '2023', 'الآن'))],
  ['الخط ينزل إلى الصفوف', 'العنوان يصبح بداية خط السنوات نفسه', stack(en('The road so far.'), drop), stack(ar('الطريق حتى الآن.'), drop)],
  ['نقطة حية', 'نقطة آخر الجملة خضراء وتنبض مرتين: ما زال الطريق مستمرًا', en(`The road so far${live}`), ar(`الطريق حتى الآن${live}`)],
  ['مؤشر الكتابة', 'يومض قليلًا ثم يقف: الجملة لم تكتمل بعد', en('The road so far<span class="w-cursor"></span>'), ar('الطريق حتى الآن<span class="w-cursor"></span>')],
  ['كلمات تتضح', 'كلمة بعد كلمة', en(words(['The', 'road', 'so', 'far.'])), ar(words(['الطريق', 'حتى', 'الآن.']))]
];

document.getElementById('options').innerHTML = options.map(([name, note, english, arabic], index) => `
  <article class="ph-option">
    <div class="ph-label" dir="rtl"><b>${index + 1}. ${name}</b><span>${note}</span></div>
    <button class="ph-replay" type="button">إعادة ↺</button>
    <div class="ph-panes">
      <div class="ph-pane" dir="ltr">${english}</div>
      <div class="ph-pane" dir="rtl">${arabic}</div>
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

document.getElementById('xr-theme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.dataset.theme === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'dark';
});
