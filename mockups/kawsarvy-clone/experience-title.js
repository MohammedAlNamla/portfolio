const KASHIDA = 'ـ'.repeat(26);
const ART = '<svg viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true"><path fill-rule="evenodd" d="M14 88L34 70 26 70 52 52 44 51 74 34 68 32 96 24C130 15 165 14 200 24C235 34 262 32 296 22L322 14 316 11 346 6 340 14 352 16 342 26 350 30 340 40 348 46 336 54 342 62 326 70C290 84 245 94 195 90C155 87 125 78 92 80C62 82 38 88 14 88ZM70 50C110 37 160 35 205 45C245 53 285 47 325 31C285 49 245 56 205 49C160 40 112 42 70 50Z"/></svg>';

const en = (...lines) => `<div class="h-en">${lines.map(line => `<span>${line}</span>`).join('')}</div>`;
const ar = (...lines) => `<div class="h-ar">${lines.map(line => `<span>${line}</span>`).join('')}</div>`;
const brush = word => `<span class="w-brush">${ART}${word}</span>`;
const black = word => `<span class="w-black">${word}</span>`;
const soft = line => `<span class="w-soft">${line}</span>`;
const serif = word => `<span class="w-serif">${word}</span>`;
const drawn = (word, rtl) => `<span class="w-drawn">${word}<svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="${rtl ? 'M100 6C76 2 56 9 36 5S10 4 0 7' : 'M0 6C24 2 44 9 64 5S90 4 100 7'}"/></svg></span>`;
const stretch = (start, end) => `<span class="w-join"><span>${start}</span><span class="ar-stretch"><span>${KASHIDA}</span></span><span>${end}</span></span>`;

const options = [
  ['من متدرب إلى مهندس', 'الأصدق، ويشرح الترقية الظاهرة في الخيار 13', en('From intern to engineer,', soft('on the same team.')), ar('من متدرب إلى مهندس،', soft('في الفريق نفسه.'))],
  ['بدأت متدربًا', 'نفس المعنى بجملة شخصية أقصر', en(`Started as an ${black('intern.')}`, `Stayed as an ${black('engineer.')}`), ar(`بدأت ${black('متدربًا،')}`, `وبقيت ${black('مهندسًا.')}`)],
  ['من غزة إلى الإنتاج', 'الأكثر شخصية: يبدأ من الجامعة وينتهي بالعمل', en('From a lecture hall in Gaza', `to systems in ${brush('production.')}`), ar('من قاعة دراسة في غزة', `إلى أنظمة تعمل في ${brush('الإنتاج.')}`)],
  ['ثلاث سنوات', 'يحتاج تحديث الرقم كل سنة', en(`${black('Three years')} of systems`, 'that keep running.'), ar(`${black('ثلاث سنوات')} من أنظمة`, 'تعمل بثبات.')],
  ['منذ 2023', 'قصيرة، ولا تحتاج تحديثًا', en(`In production since ${brush('2023.')}`), ar(`في بيئة الإنتاج منذ ${brush('2023.')}`)],
  ['الطريق حتى الآن', 'الأهدأ، وتترك التفاصيل للصفوف', en(`The road ${serif('so far.')}`), ar(`الطريق ${drawn('حتى الآن.', true)}`)],
  ['أين بنيت', 'تربط الماضي بالعمل الحالي', en('Where I have built,', soft('and where I still do.')), ar('أين بنيت،', soft('وأين ما زلت أبني.'))],
  ['أماكن شكّلتني', 'تشمل الجامعة والعمل معًا', en('The places that shaped', `how I ${serif('build.')}`), ar('أماكن شكّلت', `طريقتي في ${black('البناء.')}`)],
  ['ما زلت أتعلم', 'تواضع وثقة في سطرين', en('Still learning.', `${black('Still shipping.')}`), ar('ما زلت أتعلم،', `${black('وما زلت أبني.')}`)],
  ['كلمة واحدة', 'الخبرات فقط، بتمديد عربي هادئ وخط مائل بالإنجليزي', en(serif('Experience.')), ar(stretch('الخبـ', 'ـرات'))],
  ['سطر مبرمج', 'تعليق كود صغير فوق جملة هادئة', en('<span class="w-comment">// git log --oneline</span>', 'The road so far.'), ar('<span class="w-comment" dir="ltr">// git log --oneline</span>', 'الطريق حتى الآن.')]
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

document.getElementById('xt-theme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.dataset.theme === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'dark';
});
