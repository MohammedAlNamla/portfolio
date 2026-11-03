const svg = content => `<svg viewBox="0 0 24 24" aria-hidden="true">${content}</svg>`;
const circle = (content, modifier = '') => `<div class="ci-circle${modifier}">${content}</div>`;

const icons = [
  {
    name: 'أنا وأنت',
    note: 'دائرتان متداخلتان: حروفك ودائرة للزائر. فكرة شراكة بدون أيقونة تقليدية.',
    art: '<div class="ci-pair"><span class="ci-pair-me">MN</span><span class="ci-pair-you">You</span></div>'
  },
  {
    name: 'تقاطع',
    note: 'دائرتان تلتقيان في منطقة غامقة. مجرد وهادئ جدًا.',
    art: circle(svg('<circle cx="9" cy="12" r="6.500"/><circle cx="15" cy="12" r="6.500"/><path class="ink" d="M12 6.230a6.500 6.500 0 0 1 0 11.540 6.500 6.500 0 0 1 0-11.540z"/>'))
  },
  {
    name: 'سطر الأوامر',
    note: 'مؤشر يومض كأن الصفحة تنتظر كلامك. قريب من شغلك وفيه حركة خفيفة.',
    art: circle(svg('<path d="m5 8 5 4-5 4"/><rect class="ink ci-cursor" x="12" y="15" width="7" height="1.500"/>'))
  },
  {
    name: 'نقطتان متصلتان',
    note: 'نظامان يتصلان، أو أنت والعميل. بسيطة وتناسب هندسة الأنظمة.',
    art: circle(svg('<circle cx="6" cy="17" r="3"/><circle class="ink" cx="18" cy="7" r="3"/><path d="M8.300 15 15.700 9"/>'))
  },
  {
    name: 'قاعدة بيانات',
    note: 'رمز الـ backend الأشهر، ويكمل عبارة From the database.',
    art: circle(svg('<ellipse cx="12" cy="6" rx="7.500" ry="3"/><path d="M4.500 6v12c0 1.650 3.360 3 7.500 3s7.500-1.350 7.500-3V6M4.500 12c0 1.650 3.360 3 7.500 3s7.500-1.350 7.500-3"/>'))
  },
  {
    name: 'يد تلوّح',
    note: 'رمز تعبيري مثل 👏🏼 الموجود بجانب اسمك. الأكثر ودًا.',
    art: circle('<span class="ci-emoji">👋🏼</span>')
  },
  {
    name: 'ظرف',
    note: 'واضح ومباشر، ويرتبط بزر Email Me.',
    art: circle(svg('<rect x="3" y="5.500" width="18" height="13" rx="1.500"/><path d="m3.500 7 8.500 6.500L20.500 7"/>'))
  },
  {
    name: 'مصباح فكرة',
    note: 'يقول: عندك فكرة؟ مألوف، لكنه مفهوم فورًا.',
    art: circle(svg('<path d="M12 3a6.500 6.500 0 0 0-3.800 11.800c.700.500 1.300 1.300 1.300 2.200h5c0-.900.600-1.700 1.300-2.200A6.500 6.500 0 0 0 12 3z"/><path d="M9.500 20h5M10.500 22.500h3"/>'))
  },
  {
    name: 'إشارة',
    note: 'دوائر تتسع من نقطة خضراء، كأنها تقول: أنا متاح.',
    art: circle(svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.500"/><circle class="ci-green" cx="12" cy="12" r="2"/>'))
  },
  {
    name: 'مكعب على داكن',
    note: 'نفس المكعب بدائرة غامقة مثل زر Email Me، فيصبح حضوره أقوى.',
    art: circle(svg('<path class="ci-light-fill" d="m12 3 8 4.500-8 4.500-8-4.500z"/><path d="M4 7.500v9l8 4.500 8-4.500v-9M12 12v9"/>'), ' is-dark')
  },
  {
    name: 'شارة متاح',
    note: 'بدل الصورة، جملة صغيرة تعطي معلومة مفيدة. تناسب إذا كنت متاحًا فعلًا.',
    art: '<span class="ci-status"><span class="ci-status-dot"></span>Available for work</span>'
  },
  {
    name: 'بدون صورة',
    note: 'الأهدأ: العبارة والزران فقط، مع توسيط أوضح.',
    art: ''
  }
];

document.getElementById('icons').innerHTML = icons.map((icon, index) => `
  <article class="ci-card">
    <span class="ci-number">${index + 1}</span>
    <div class="ci-art">${icon.art}</div>
    <p class="title"><span class="line">Let’s build</span><span class="line">something great.</span></p>
    <h2 class="ci-name" dir="rtl">${icon.name}</h2>
    <p class="ci-note" dir="rtl">${icon.note}</p>
  </article>`).join('');
