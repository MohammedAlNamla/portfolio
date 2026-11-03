const HANDSHAKE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path pathLength="1" d="m11 17 2 2a1 1 0 1 0 3-3"/><path pathLength="1" d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path class="ink" d="M20.7 2.7 22.2 14h-2.5l-1.1-9.8z"/><path pathLength="1" d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path pathLength="1" d="M3 4h8"/></svg>';
const LINE = '<svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M0 6C24 2 44 9 64 5S90 4 100 7"/></svg>';
const BRUSH = '<svg viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true"><path fill-rule="evenodd" d="M14 88L34 70 26 70 52 52 44 51 74 34 68 32 96 24C130 15 165 14 200 24C235 34 262 32 296 22L322 14 316 11 346 6 340 14 352 16 342 26 350 30 340 40 348 46 336 54 342 62 326 70C290 84 245 94 195 90C155 87 125 78 92 80C62 82 38 88 14 88ZM70 50C110 37 160 35 205 45C245 53 285 47 325 31C285 49 245 56 205 49C160 40 112 42 70 50Z"/></svg>';

const title = (first, second) => `<h2 class="ct-title"><span class="soft">${first}</span><span>${second}</span></h2>`;
const lasts = second => title('Let’s build', second);
const disc = (inside, extra = '') => `<div class="ct-disc ${extra}">${inside}</div>`;
const amp = '<span class="amp serif">&amp;</span>';
const buttons = '<div class="ct-actions"><span class="ct-btn">Email me</span><span class="ct-btn light">WhatsApp</span></div>';
const wrap = (...parts) => `<div class="ct">${parts.join('')}</div>`;
const gazaTime = () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Gaza' }).format(new Date());

const options = [
  ['الحالي', 'للمقارنة', wrap(disc(HANDSHAKE), lasts('something that lasts'), buttons)],
  ['& بدل المصافحة', 'ترشيحي: تنتهي الصفحة بنفس رمز بدايتها، ومعناه أنا وأنت', wrap(disc(amp), lasts('something that lasts'), buttons)],
  ['أنا & أنت', 'دائرتان تقتربان، وتصبح صورتك الحقيقية جزءًا منها لاحقًا', wrap('<div class="ct-pair"><b class="me">MN</b>' + amp + '<b class="you">You</b></div>', lasts('something that lasts'), buttons)],
  ['جملة بالـ &', 'نفس رمز البداية داخل جملة جديدة أقصر', wrap(disc(HANDSHAKE), title('Your idea', `${amp} my code`), buttons)],
  ['كلمة إيطالية', 'lasts بنفس خط الرمز', wrap(disc(HANDSHAKE), lasts('something that <span class="word serif">lasts</span>'), buttons)],
  ['خط باليد', 'نفس خط «so far» تحت الكلمة', wrap(disc(HANDSHAKE), lasts(`something that <span class="mark">lasts${LINE}</span>`), buttons)],
  ['فرشاة', 'نفس فرشاة الخدمات خلف الكلمة', wrap(disc(HANDSHAKE), lasts(`something that <span class="brushed">${BRUSH}lasts</span>`), buttons)],
  ['المصافحة ترسم نفسها', 'تبقى الأيقونة وتتحرك مرة واحدة', wrap(disc(HANDSHAKE, 'ct-draw'), lasts('something that lasts'), buttons)],
  ['البريد هو العنوان', 'أوضح طريق للتواصل، والبريد نفسه بخط أنيق كبير', wrap('<a class="ct-mail serif">moh.alnamla@gmail.com</a>', '<p class="ct-note">or message me on <a>WhatsApp</a></p>')],
  ['رسالة بدأت لك', 'زر يفتح واتساب برسالة جاهزة، فيسهل على الزائر البدء', wrap(lasts('something that lasts'), '<div class="ct-message">Hi Mohammed, I need a system that <span>keeps running</span><i></i></div>', buttons)],
  ['حالة التوفر', 'نقطة تنبض مرتين. يحتاج تأكيدك أنك متاح فعلًا لأعمال جديدة', wrap(disc(HANDSHAKE), lasts('something that lasts'), buttons, '<span class="ct-status"><i></i>Open to new projects</span>')],
  ['الوقت عندك الآن', 'لمسة إنسانية صادقة. يعتمد على قرارك بذكر غزة', wrap(disc(HANDSHAKE), lasts('something that lasts'), buttons, `<span class="ct-status">Gaza · <span data-time>${gazaTime()}</span></span>`)],
  ['نهاية بتذييل هادئ', 'الصفحة تنتهي الآن فجأة، وهذا يغلقها بهدوء', wrap(disc(HANDSHAKE), lasts('something that lasts'), buttons, '<div class="ct-footer"><span><b>Mohammed Al-Namla</b></span><nav><span>Email</span><span>GitHub</span><span>LinkedIn</span></nav></div>')]
];

document.getElementById('options').innerHTML = options.map(([name, note, html], index) => `
  <article class="ph-option">
    <div class="ph-label" dir="rtl"><b>${index + 1}. ${name}</b><span>${note}</span></div>
    <button class="ph-replay" type="button">إعادة ↺</button>
    <div class="ph-panes"><div class="ph-pane" dir="ltr">${html}</div></div>
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

setInterval(() => {
  document.querySelectorAll('[data-time]').forEach((time) => { time.textContent = gazaTime(); });
}, 30000);

document.getElementById('ct-theme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.dataset.theme === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'dark';
});
