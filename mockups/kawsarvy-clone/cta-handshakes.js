const current = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
  <path d="m14 14 2.500 2.500a1 1 0 1 0 3-3l-3.880-3.880a3 3 0 0 0-4.240 0l-.880.880a1 1 0 1 1-3-3l2.810-2.810a5.790 5.790 0 0 1 7.060-.870l.470.280a2 2 0 0 0 1.420.250L21 4"/>
  <path class="ink" d="M20.700 2.700 22.200 14h-2.500l-1.100-9.800z"/>
  <path d="M3 3 2 14l6.500 6.500a1 1 0 1 0 3-3"/>
  <path d="M3 4h8"/>
</svg>`;

const icon = url => `<img class="ci-remote" src="${url}" alt="">`;

const icons = [
  { name: 'الحالي', note: 'الموجود الآن في الصفحة، للمقارنة.', art: current },
  { name: 'Phosphor Thin', note: 'خطوط رفيعة جدًا وأنيقة.', art: icon('https://cdn.jsdelivr.net/npm/@phosphor-icons/core@2.1.1/assets/thin/handshake-thin.svg') },
  { name: 'Phosphor Light', note: 'متوازن، ويشبه خط أيقونات الخدمات.', art: icon('https://cdn.jsdelivr.net/npm/@phosphor-icons/core@2.1.1/assets/light/handshake-light.svg') },
  { name: 'Phosphor Regular', note: 'خط أوضح بحضور أقوى.', art: icon('https://cdn.jsdelivr.net/npm/@phosphor-icons/core@2.1.1/assets/regular/handshake.svg') },
  { name: 'Phosphor Duotone', note: 'لونان: خطوط غامقة مع تعبئة خفيفة.', art: icon('https://cdn.jsdelivr.net/npm/@phosphor-icons/core@2.1.1/assets/duotone/handshake-duotone.svg') },
  { name: 'Phosphor Fill', note: 'مصمت وقوي، الأجرأ بينها.', art: icon('https://cdn.jsdelivr.net/npm/@phosphor-icons/core@2.1.1/assets/fill/handshake-fill.svg') },
  { name: 'Remix Line', note: 'يدان واضحتان بخط متوسط.', art: icon('https://cdn.jsdelivr.net/npm/remixicon@4.5.0/icons/Business/shake-hands-line.svg') },
  { name: 'Remix Fill', note: 'نسخة مصمتة أبسط تفاصيلًا.', art: icon('https://cdn.jsdelivr.net/npm/remixicon@4.5.0/icons/Business/shake-hands-fill.svg') },
  { name: 'Material Light', note: 'شكل مصافحة كلاسيكي ونظيف.', art: icon('https://cdn.jsdelivr.net/npm/@material-symbols/svg-200@0.27.0/outlined/handshake.svg') },
  { name: 'Material Rounded', note: 'حواف ناعمة تناسب دوائر الصفحة.', art: icon('https://cdn.jsdelivr.net/npm/@material-symbols/svg-200@0.27.0/rounded/handshake.svg') },
  { name: 'Font Awesome', note: 'الأشهر، بخط سميك نسبيًا.', art: icon('https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/svgs/regular/handshake.svg') },
  { name: 'Tabler', note: 'مصافحة داخل قلب، فيها دفء أكثر.', art: icon('https://cdn.jsdelivr.net/npm/@tabler/icons@3.31.0/icons/outline/heart-handshake.svg') }
];

document.getElementById('icons').innerHTML = icons.map((item, index) => `
  <article class="ci-card">
    <span class="ci-number">${index + 1}</span>
    <div class="ci-art"><div class="ci-circle">${item.art}</div></div>
    <p class="title"><span class="line">Let’s build</span><span class="line">something great.</span></p>
    <h2 class="ci-name">${item.name}</h2>
    <p class="ci-note" dir="rtl">${item.note}</p>
  </article>`).join('');
