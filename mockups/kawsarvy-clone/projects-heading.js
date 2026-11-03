const KASHIDA = 'ـ'.repeat(26);
const images = ['Sufra', 'BFM', 'Taskat', 'UOP', 'NetSpeed'].map(name => `../../images/${name}.webp`);
const projectNames = ['RestroGram', 'BookForMe', 'Taskat', 'UOP', 'NetSpeed'];

const en = (...lines) => `<div class="h-en">${lines.map(line => `<span>${line}</span>`).join('')}</div>`;
const ar = (...lines) => `<div class="h-ar">${lines.map(line => `<span>${line}</span>`).join('')}</div>`;
const drawn = word => `<span class="w-drawn">${word}<svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M0 6C24 2 44 9 64 5S90 4 100 7"/></svg></span>`;
const drawnAr = word => `<span class="w-drawn">${word}<svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M100 6C76 2 56 9 36 5S10 4 0 7"/></svg></span>`;
const pic = index => `<span class="w-pic"><img src="${images[index]}" alt=""></span>`;
const stack = `<div class="w-stack" aria-hidden="true">${images.map((src, index) => `<img src="${src}" alt="" style="--order:${index}">`).join('')}</div>`;
const swap = words => `<span class="w-swap" data-swap>${words.map((word, index) => `<span class="${index ? '' : 'is-on'}">${word}</span>`).join('')}</span>`;
const focus = (text) => text.split(' ').map((word, index) => `<span class="w-focus" style="--order:${index}">${word}</span>`).join(' ');
const stretch = (start, end) => `<span class="w-join"><span>${start}</span><span class="ar-stretch"><span>${KASHIDA}</span></span><span>${end}</span></span>`;
const rule = label => `<div class="w-rule" aria-hidden="true"><i></i><b>${label}</b></div>`;
const follow = (id, intro) => `<div>
  <div class="${id === 'en' ? 'h-en' : 'h-ar'}"><span>${intro} <span class="w-black" data-follow-name>${projectNames[0]}</span></span></div>
  <div class="w-follow" data-follow>${images.map((src, index) => `<button type="button" class="${index ? '' : 'is-on'}" data-name="${projectNames[index]}" aria-label="${projectNames[index]}"><img src="${src}" alt=""></button>`).join('')}</div>
</div>`;

const options = [
  ['الحالي', 'للمقارنة', en('Some of the products', "I've built."), ar('بعض المنتجات', 'التي بنيتها.')],
  ['فرق الأوزان', 'أهدأ لمسة، بدون حركة', en('<span class="w-soft">Some of the products</span>', `<span class="w-black">I've built.</span>`), ar('<span class="w-soft">بعض المنتجات</span>', '<span class="w-black">التي بنيتها.</span>')],
  ['خط باليد', 'خط ناعم يرسم نفسه', en('Some of the products', `I've ${drawn('built.')}`), ar('بعض المنتجات', `التي ${drawnAr('بنيتها.')}`)],
  ['قلم تحديد', 'لون خفيف خلف الكلمة', en('Some of the', `<span class="w-marker">products</span> I've built.`), ar('بعض', '<span class="w-marker">المنتجات</span> التي بنيتها.')],
  ['مؤشر كتابة', 'لمسة مبرمج، يومض قليلًا ثم يتوقف', en('Some of the products', `I've built<span class="w-cursor"></span>`), ar('بعض المنتجات', 'التي بنيتها<span class="w-cursor"></span>')],
  ['سطر من الكود', 'تعليق صغير فوق العنوان', en('<span class="w-comment">// selected work</span>', 'Some of the products', `I've built.`), ar('<span class="w-comment">// أعمال مختارة</span>', 'بعض المنتجات', 'التي بنيتها.')],
  ['عدّاد صغير', 'رقم هادئ بجانب العنوان', en('Selected work<span class="w-count">(08)</span>'), ar('أعمال مختارة<span class="w-count">(08)</span>')],
  ['الرقم أولًا', 'عبارة جديدة يقودها الرقم', en('<span class="w-number">8</span> products,', '<span class="w-soft">one standard.</span>'), ar('<span class="w-number">8</span> منتجات،', '<span class="w-soft">ومعيار واحد.</span>')],
  ['خط مختلف', 'كلمة بخط مائل أنيق، وبالعربي بوزن ثقيل', en('Some of the <span class="w-serif">products</span>', `I've built.`), ar('بعض <span class="w-black">المنتجات</span>', 'التي بنيتها.')],
  ['من محيط إلى كلمة', 'الكلمة تبدأ خطًا خارجيًا ثم تمتلئ', en('Some of the products', `I've <span class="w-outline w-display">built.</span>`), ar('بعض المنتجات', 'التي <span class="w-outline w-black">بنيتها.</span>')],
  ['صور داخل الجملة', 'لمحات من مشاريعك بين الكلمات', en(`Some of the ${pic(0)} products`, `I've ${pic(3)} built.`), ar(`بعض ${pic(0)} المنتجات`, `التي ${pic(3)} بنيتها.`)],
  ['صور فوق العنوان', 'دوائر متداخلة من مشاريعك', stack + en('Some of the products', `I've built.`), stack + ar('بعض المنتجات', 'التي بنيتها.')],
  ['كلمة تتغير', 'تتبدل بهدوء كل 3 ثوانٍ', en(`Some of the ${swap(['products', 'platforms', 'systems'])}`, `I've built.`), ar(`بعض ${swap(['المنتجات', 'المنصات', 'الأنظمة'])}`, 'التي بنيتها.')],
  ['عنوان يتفاعل', 'مرر الماوس على الصور فيتغير الاسم', follow('en', 'I built'), follow('ar', 'بنيتُ')],
  ['حروف تستقر', 'تقترب الحروف بالإنجليزي، وتتمدد بالعربي', en('Some of the products', `I've <span class="w-track w-black">built.</span>`), ar('بعض المنتجات', `التي ${stretch('بنيتـ', 'ـها.')}`)],
  ['وضوح تدريجي', 'الكلمات تتضح واحدة بعد الأخرى', en(focus('Some of the products'), focus(`I've built.`)), ar(focus('بعض المنتجات'), focus('التي بنيتها.'))],
  ['كلمة خلفية', 'كلمة كبيرة باهتة جدًا خلف العنوان', `<span class="w-ghost" aria-hidden="true">Work</span>${en('Some of the products', `I've built.`)}`, `<span class="w-ghost" aria-hidden="true">أعمال</span>${ar('بعض المنتجات', 'التي بنيتها.')}`],
  ['خط يفتح', 'الخط والبطاقة يظهران مع العنوان', `<div>${en('Some of the products', `I've built.`)}${rule('Projects')}</div>`, `<div>${ar('بعض المنتجات', 'التي بنيتها.')}${rule('المشاريع')}</div>`]
];

document.getElementById('options').innerHTML = options.map(([name, note, english, arabic], index) => `
  <article class="ph-option">
    <div class="ph-label"><b>${index + 1}. ${name}</b><span>${note}</span></div>
    <button class="ph-replay" type="button">إعادة ↺</button>
    <div class="ph-panes">
      <div class="ph-pane" dir="ltr">${english}</div>
      <div class="ph-pane" dir="rtl">${arabic}</div>
    </div>
  </article>`).join('');

function play(option) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  option.classList.remove('is-playing');
  option.querySelectorAll('.w-cursor').forEach((cursor) => {
    cursor.style.animation = 'none';
    void cursor.offsetWidth;
    cursor.style.animation = '';
  });
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

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => {
    document.querySelectorAll('[data-swap]').forEach((swapWord) => {
      const words = [...swapWord.children];
      const current = words.findIndex(word => word.classList.contains('is-on'));
      words[current].classList.remove('is-on');
      words[(current + 1) % words.length].classList.add('is-on');
    });
  }, 3000);
}

document.querySelectorAll('[data-follow]').forEach((group) => {
  const name = group.parentElement.querySelector('[data-follow-name]');
  const select = (button) => {
    group.querySelectorAll('button').forEach(item => item.classList.toggle('is-on', item === button));
    name.textContent = button.dataset.name;
  };
  group.querySelectorAll('button').forEach((button) => {
    button.addEventListener('mouseenter', () => select(button));
    button.addEventListener('focus', () => select(button));
    button.addEventListener('click', () => select(button));
  });
});

document.getElementById('ph-theme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.dataset.theme === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'dark';
});
