const HANDSHAKE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path class="ink" d="M20.7 2.7 22.2 14h-2.5l-1.1-9.8z"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>';
const KASHIDA = 'ـ'.repeat(30);
const amp = '<span class="amp serif">&amp;</span>';
const buttons = '<div class="ct-actions"><span class="ct-btn">Email me</span><span class="ct-btn light">WhatsApp</span></div>';
const section = (heading, actions = buttons) => `<div class="ct"><div class="ct-disc">${HANDSHAKE}</div>${heading}${actions}</div>`;
const title = (first, second, style = '') => `<h2 class="ct-title ${style}"><span class="soft">${first}</span><span>${second}</span></h2>`;

const arabic = `<h2 class="title ar-title cta-ref"><span class="ar-line ar-soft">لنبنِ معًا</span><span class="ar-line">شيئًا <span class="ar-big ar-join"><span>يـ</span><span class="ar-stretch"><span>${KASHIDA}</span></span><span>ـدوم</span></span></span></h2>`;
const arabicButtons = '<div class="ct-actions"><span class="ct-btn">راسلني</span><span class="ct-btn light">واتساب</span></div>';

const options = [
  ['العربية', 'المرجع: دائرة وسطران وأزرار، وكلمة واحدة تتمدد', section(arabic, arabicButtons), 'rtl'],
  ['الشرطة الطويلة', 'ترشيحي: شرطة تمتد قبل lasts. الشرطة الطويلة من علامات الكتابة الإنجليزية، ومعناها هنا الزمن الذي يمر', section(title('Let’s build', 'something that <span class="ct-dash"></span> lasts'))],
  ['ذيل الحرف الأخير', 'حرف s الأخير يمتد بخط مستقيم إلى الخارج', section(title('Let’s build', 'something that lasts<span class="ct-tail"></span>'))],
  ['حروف تتسع', 'lasts تبدأ متلاصقة ثم تأخذ مساحتها', section(title('Let’s build', 'something that <span class="ct-wide">lasts</span>'))],
  ['سطر أكبر من سطر', 'بدون زخرفة: السطر الأول صغير والثاني كبير، كتدرج الوزن في العربية', section(title('Let’s build', 'something that lasts', 'ct-steps'))],
  ['& في الجملة', 'نفس رمز عنوان البداية، بمعنى «معًا» في الجملة العربية', section(title(`You ${amp} I`, 'build what lasts'))],
  ['الشرطة مع &', 'تجمع لمسة البداية مع الشرطة في جملة واحدة', section(title(`You ${amp} I`, 'build what <span class="ct-dash"></span> lasts'))]
];

document.getElementById('options').innerHTML = options.map(([name, note, html, direction], index) => `
  <article class="ph-option">
    <div class="ph-label" dir="rtl"><b>${index ? `${index}. ` : ''}${name}</b><span>${note}</span></div>
    <button class="ph-replay" type="button">إعادة ↺</button>
    <div class="ph-panes"><div class="ph-pane" dir="${direction || 'ltr'}">${html}</div></div>
  </article>`).join('');

function play(option) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  option.classList.remove('is-playing');
  void option.offsetWidth;
  option.classList.add('is-playing');
  option.querySelectorAll('.ar-title').forEach((heading) => {
    heading.classList.remove('is-playing');
    void heading.offsetWidth;
    heading.classList.add('is-playing');
  });
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

document.getElementById('ct-theme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.dataset.theme === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'dark';
});
