const LOGOS = [
  '<img class="logo-square" src="logos/approved-tech.png" alt="">Approved Tech',
  '<img class="logo-full logo-on-light" src="logos/university-of-palestine.svg" alt="University of Palestine"><img class="logo-full logo-on-dark" src="logos/university-of-palestine-dark.svg" alt="University of Palestine">',
  '<img src="logos/iug.png" alt=""><span class="logo-iug-name" dir="rtl"><span>الجامعة الإسلامية</span><small dir="ltr">Islamic University of Gaza</small></span>',
  '<img class="logo-badge" src="logos/netspeed.png" alt="">NetSpeed',
  'Fikritak'
];
const LOGO_CLASS = ['', '', 'logo-iug', '', ''];
const logo = (index, extra = '') => `<div class="logo ${LOGO_CLASS[index]}" style="--order:${index}" ${extra}>${LOGOS[index]}</div>`;
const allLogos = extra => LOGOS.map((_, index) => logo(index, extra)).join('');

const COPY = {
  en: {
    label: 'Worked and learned with',
    names: ['Approved Tech', 'University of Palestine', 'Islamic University of Gaza', 'NetSpeed', 'Fikritak'],
    roles: ['Backend engineer since 2023', 'Built their CMS and public website', 'B.Sc. Information Technology', 'A platform for 10K+ concurrent users', 'Building a booking API, part-time']
  },
  ar: {
    label: 'عملت وتعلمت مع',
    names: ['Approved Tech', 'جامعة فلسطين', 'الجامعة الإسلامية بغزة', 'NetSpeed', 'فكرتك'],
    roles: ['مهندس واجهة خلفية منذ 2023', 'بنيت نظام إدارة المحتوى وموقعها العام', 'بكالوريوس تقنية المعلومات', 'منصة لأكثر من 10 آلاف مستخدم متزامن', 'أبني واجهة برمجية للحجوزات بدوام جزئي']
  }
};

const marquee = (classes = '', run = allLogos()) => {
  const group = `<div class="marquee-group">${run}${run}${run}</div>`;
  return `<div class="marquee ${classes}"><div class="marquee-track">${group}${group}</div></div>`;
};
const label = lang => `<span class="xs-label">${COPY[lang].label}</span>`;
const names = lang => COPY[lang].names.map(name => `<span>${name}</span><i></i>`).join('');
const slides = lang => `<div class="xs-stage" data-rotate>${LOGOS.map((_, index) => `<div class="xs-slide ${index === 0 ? 'is-on' : ''}">${logo(index)}<span class="xs-label">${COPY[lang].roles[index]}</span></div>`).join('')}</div>`;
const explain = lang => `<div class="xs-explain" data-lang="${lang}"><div class="xs-row">${allLogos('tabindex="0"')}</div><span class="xs-caption" aria-live="polite">${COPY[lang].label}</span></div>`;
const LINE = {
  en: 'Worked and learned with <img src="logos/approved-tech.png" alt=""><b>Approved Tech</b>, <img src="logos/iug.png" alt=""><b>the Islamic University of Gaza</b>, <b>the University of Palestine</b>, <img src="logos/netspeed.png" alt=""><b>NetSpeed</b> and <b>Fikritak.</b>',
  ar: 'عملت وتعلمت مع <img src="logos/approved-tech.png" alt=""><b>Approved Tech</b>، و<img src="logos/iug.png" alt=""><b>الجامعة الإسلامية بغزة</b>، و<b>جامعة فلسطين</b>، و<img src="logos/netspeed.png" alt=""><b>NetSpeed</b>، و<b>فكرتك.</b>'
};

const options = [
  ['الحالي', 'للمقارنة', () => marquee()],
  ['عنوان جانبي', 'الفكرة التي أعجبتك، بصياغة تناسب الجامعات أيضًا', lang => `<div class="xs-side">${label(lang)}${marquee('xs-fade')}</div>`],
  ['عنوان صغير فوقه', 'نفس الشريط بجملة تعريف وحواف تتلاشى', lang => `<div class="xs-above">${label(lang)}${marquee('xs-fade')}</div>`],
  ['وضوح في الوسط', 'الأطراف باهتة جدًا، فلا تشد العين', () => marquee('xs-focus')],
  ['تركيز بالماوس', 'مرر الماوس: يقف الشريط وتتراجع باقي الشعارات', () => marquee('xs-fade xs-dim')],
  ['يتحرك مع السكرول', 'ساكن تمامًا حتى يتحرك الزائر. اسحب الصفحة لترى', () => marquee('xs-fade xs-scroll')],
  ['عنوان جانبي مع السكرول', 'يجمع الفكرة التي أعجبتك مع الهدوء الكامل', lang => `<div class="xs-side">${label(lang)}${marquee('xs-fade xs-scroll')}</div>`],
  ['أسماء بلا شعارات', 'شريط من الكلمات فقط، بخط العناوين', lang => marquee('xs-fade xs-names', names(lang))],
  ['صف ثابت', 'بلا حركة، كل الشعارات ظاهرة دائمًا', () => `<div class="xs-row">${allLogos()}</div>`],
  ['يظهر ثم يستقر', 'حركة واحدة عند الوصول، ثم سكون', () => `<div class="xs-row xs-settle">${allLogos()}</div>`],
  ['خانات بخطوط رفيعة', 'مثل جدول هادئ، ويتحول إلى عمودين على الجوال', () => `<div class="xs-cells">${allLogos()}</div>`],
  ['شعار واحد كل مرة', 'يتبدل ببطء، ومعه سطر يشرح علاقتك به', slides],
  ['تعريف عند الطلب', 'مرر الماوس أو اضغط على شعار: يظهر ماذا فعلت معه', explain],
  ['جملة فيها الشعارات', 'الشريط يصبح سطرًا تقرؤه', lang => `<p class="xs-line">${LINE[lang]}</p>`]
];

document.getElementById('options').innerHTML = options.map(([name, note, build], index) => `
  <article class="ph-option">
    <div class="ph-label" dir="rtl"><b>${index + 1}. ${name}</b><span>${note}</span></div>
    <button class="ph-replay" type="button">إعادة ↺</button>
    <div class="ph-panes">
      <div class="ph-pane" dir="ltr">${build('en')}</div>
      <div class="ph-pane" dir="rtl">${build('ar')}</div>
    </div>
  </article>`).join('');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll-driven strips follow the page with a little easing
const scrollTracks = [...document.querySelectorAll('.xs-scroll .marquee-track')];
let scrollPosition = window.scrollY;
function followScroll() {
  scrollPosition += (window.scrollY - scrollPosition) * .12;
  scrollTracks.forEach((track) => {
    track.style.transform = `translateX(${-((scrollPosition * .35) % (track.scrollWidth / 2))}px)`;
  });
  requestAnimationFrame(followScroll);
}
if (!reducedMotion) followScroll();

// One logo at a time
document.querySelectorAll('[data-rotate]').forEach((stage) => {
  const slideList = [...stage.children];
  let current = 0;
  if (reducedMotion) return;
  setInterval(() => {
    slideList[current].classList.remove('is-on');
    current = (current + 1) % slideList.length;
    slideList[current].classList.add('is-on');
  }, 3200);
});

// The caption answers for the logo under the pointer or focus
document.querySelectorAll('.xs-explain').forEach((block) => {
  const { label: intro, roles } = COPY[block.dataset.lang];
  const caption = block.querySelector('.xs-caption');
  block.querySelectorAll('.logo').forEach((item, index) => {
    const show = () => { caption.textContent = roles[index]; };
    const hide = () => { caption.textContent = intro; };
    item.addEventListener('mouseenter', show);
    item.addEventListener('focus', show);
    item.addEventListener('click', show);
    item.addEventListener('mouseleave', hide);
    item.addEventListener('blur', hide);
  });
});

function play(option) {
  if (reducedMotion) return;
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

document.getElementById('xs-theme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.dataset.theme === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'dark';
});
