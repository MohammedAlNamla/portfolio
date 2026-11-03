const svg = content => `<svg viewBox="0 0 24 24" aria-hidden="true">${content}</svg>`;

const icons = [
  {
    name: 'مكعب بناء',
    note: 'يترجم كلمة build مباشرة، وبأسلوب أيقونات الصفحة.',
    art: svg('<path class="ink" d="m12 3 8 4.500-8 4.500-8-4.500z"/><path d="M4 7.500v9l8 4.500 8-4.500v-9M12 12v9"/>')
  },
  {
    name: 'طيارة ورق',
    note: 'تعني أرسل لي رسالة، وهي الخطوة التالية بعد العبارة.',
    art: svg('<path d="M21 3 3 10.500l6.500 3L21 3zM21 3l-7.500 18-4-7.500"/><path class="ink" d="m9.500 13.500.800 5 2.700-2.900z"/>')
  },
  {
    name: 'محادثة',
    note: 'واضحة وودودة، وتناسب كلمة let’s.',
    art: svg('<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-9l-4 3.500V17H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><circle class="ink" cx="8" cy="11" r="1"/><circle class="ink" cx="12" cy="11" r="1"/><circle class="ink" cx="16" cy="11" r="1"/>')
  },
  {
    name: 'مكعبات مركبة',
    note: 'قطع تُبنى فوق بعض، أوسع من مكعب واحد لكن أكثر تفصيلًا.',
    art: svg('<rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/><rect class="ink" x="8" y="3" width="8" height="8" rx="1"/>')
  },
  {
    name: 'نجمة',
    note: 'تناسب كلمة great، وأنيقة لكنها أقل ارتباطًا بعملك.',
    art: svg('<path d="M12 3c.800 5 4 8.200 9 9-5 .800-8.200 4-9 9-.800-5-4-8.200-9-9 5-.800 8.200-4 9-9z"/><path class="ink" d="M19 2.500c.200 1.300 1 2.100 2.500 2.500-1.500.400-2.300 1.200-2.500 2.500-.200-1.300-1-2.100-2.500-2.500 1.500-.400 2.300-1.200 2.500-2.500z"/>')
  },
  {
    name: 'رمز الكود',
    note: 'يقول إنك مهندس برمجيات من أول نظرة، لكنه شائع.',
    art: svg('<path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.500 5l-3 14"/>')
  },
  {
    name: 'سهم',
    note: 'الأبسط والأهدأ، ونفس سهم زر See My Work.',
    art: svg('<path d="M6 18 18 6M8 6h10v10"/>')
  },
  {
    name: 'صورتك الشخصية',
    note: 'الأقوى إنسانيًا. تحتاج صورتك بعد تعديلها، والحروف هنا مؤقتة.',
    photo: true,
    art: 'MN'
  }
];

document.getElementById('icons').innerHTML = icons.map((icon, index) => `
  <article class="ci-card">
    <span class="ci-number">${index + 1}</span>
    <div class="ci-circle${icon.photo ? ' is-photo' : ''}">${icon.art}</div>
    <p class="title"><span class="line">Let’s build</span><span class="line">something great.</span></p>
    <h2 class="ci-name" dir="rtl">${icon.name}</h2>
    <p class="ci-note" dir="rtl">${icon.note}</p>
  </article>`).join('');
