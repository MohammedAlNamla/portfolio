// Language: Arabic is written in the HTML, and this file swaps in English when it is chosen.
const isArabic = document.documentElement.lang === 'ar';

const ui = isArabic
  ? {
      copy: 'نسخ البريد الإلكتروني',
      copied: 'تم نسخ البريد الإلكتروني',
      useDark: 'استخدام الوضع الداكن',
      useLight: 'استخدام الوضع الفاتح',
      otherLanguage: 'Switch to English',
      demoImage: 'صورة توضيحية',
      sampleData: 'بعض الشاشات تعرض بيانات تجريبية.',
      screens: 'شاشات',
      screenshot: 'صورة شاشة',
      visit: 'زيارة الموقع ↖',
      forBusiness: 'لأصحاب العمل',
      forEngineers: 'للمهندسين',
      moreProjects: 'مشاريع أخرى',
      close: 'إغلاق',
      previousImage: 'الصورة السابقة',
      nextImage: 'الصورة التالية',
      showImage: number => `عرض الصورة ${number}`,
      enlargeImage: 'تكبير الصورة',
      previous: name => `→ ${name}`,
      next: name => `${name} ←`
    }
  : {
      copy: 'Copy email address',
      copied: 'Email address copied',
      useDark: 'Use dark theme',
      useLight: 'Use light theme',
      otherLanguage: 'التبديل إلى العربية',
      demoImage: 'illustration',
      sampleData: 'Some screens show sample data.',
      screens: 'screens',
      screenshot: 'screenshot',
      visit: 'Visit site ↗',
      forBusiness: 'For the business',
      forEngineers: 'For engineers',
      moreProjects: 'More projects',
      close: 'Close',
      previousImage: 'Previous image',
      nextImage: 'Next image',
      showImage: number => `Show image ${number}`,
      enlargeImage: 'Enlarge image',
      previous: name => `← ${name}`,
      next: name => `${name} →`
    };

function formatDuration(months) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (!isArabic) {
    const parts = [];
    if (years) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
    if (rest || !years) parts.push(`${Math.max(rest, 1)} ${rest > 1 ? 'months' : 'month'}`);
    return parts.join(' ');
  }
  const arabicYears = count => (count === 1 ? 'سنة' : count === 2 ? 'سنتان' : count <= 10 ? `${count} سنوات` : `${count} سنة`);
  const arabicMonths = count => (count === 1 ? 'شهر' : count === 2 ? 'شهران' : count <= 10 ? `${count} أشهر` : `${count} شهرًا`);
  if (!years && rest <= 1) return 'شهر واحد';
  const parts = [];
  if (years) parts.push(arabicYears(years));
  if (rest || !years) parts.push(arabicMonths(Math.max(rest, 1)));
  return parts.join(' و');
}

const languageToggle = document.getElementById('lang-toggle');
languageToggle.textContent = isArabic ? 'EN' : 'ع';
languageToggle.setAttribute('aria-label', ui.otherLanguage);
languageToggle.addEventListener('click', () => {
  try {
    localStorage.setItem('portfolio-lang', isArabic ? 'en' : 'ar');
  } catch (error) {}
  location.reload();
});

const projectsArabic = {
  restrogram: {
    type: 'نقاط بيع وإدارة عمليات المطاعم',
    tag: 'نظام للمطاعم',
    summary: 'يربط استقبال الطلبات والدفع وشاشات المطبخ ومتابعة المخزون.',
    meta: ['تطوير متكامل', 'يعمل الآن', 'Laravel', 'Nuxt', 'PostgreSQL', 'Flutter'],
    business: [
      ['المشكلة', 'تحتاج المطاعم إلى تنسيق الطلبات والطاولات والدفع والعمل في المطبخ ضمن نظام واحد.'],
      ['من يستخدمه', 'يستقبل الكاشير الطلبات، ويتابع فريق المطبخ تجهيزها، ويراقب المدير العمليات والمخزون.'],
      ['الوضع الحالي', 'يعمل الآن مع أصحاب مطاعم وزبائن حقيقيين.']
    ],
    engineering: [
      ['نقطة بيع تصمد عند الانقطاع', 'تُحفظ الطلبات في IndexedDB وتتزامن عند عودة الاتصال، فلا يتوقف العمل في وقت الزحام.'],
      ['نظام خلفي واحد لكل التطبيقات', 'واجهة برمجية واحدة بـLaravel تخدم لوحة التحكم ولوحة الإدارة وتطبيق الموظفين لمتاجر كثيرة.'],
      ['طباعة مركزية', 'يعمل تطبيق Flutter للموظفين أيضًا كجهاز طباعة مركزي للمطعم.']
    ],
    captions: ['نقطة البيع مع الإضافات والخصومات وتقسيم الدفع', 'شاشة المطبخ من الطلب الجديد حتى الجاهزية', 'حالة الطاولات مباشرة في صالة المطعم', 'منيو QR يطلب منه الزبائن', 'مستويات المخزون وتكلفة كل طبق', 'الطلبات تُحفظ دون إنترنت وتتزامن بين الأجهزة']
  },
  bookforme: {
    type: 'منصة حجوزات للأعمال الخدمية',
    tag: 'منصة حجوزات',
    summary: 'تتيح للصالونات والعيادات والمنتجعات استقبال الحجوزات وإدارة المواعيد والعملاء والتقارير.',
    meta: ['تطوير متكامل', 'Laravel', 'Nuxt', 'WebSockets'],
    business: [
      ['المشكلة', 'تحتاج الصالونات والعيادات والمنتجعات إلى حجز إلكتروني بدل إدارة المكالمات والرسائل يدويًا.'],
      ['من يستخدمها', 'يدير الملاك والموظفون العمل، ويجد العملاء المتجر ويحجزون موعدهم.'],
      ['ماذا تشمل', 'الحجوزات والتقويم والعملاء والمخزون والتسويق والتقارير.']
    ],
    engineering: [
      ['متعددة العملاء من الأساس', 'لكل متجر بياناته المعزولة عبر عدة تطبيقات مترابطة.'],
      ['منطق المواعيد المتاحة', 'يجمع التقويم بين الموظفين والخدمات وساعات العمل والأوقات المحجوبة.'],
      ['تحديثات مباشرة', 'يدفع Laravel Reverb التغييرات الفورية عبر WebSockets.']
    ],
    captions: ['يختار العميل الوقت ويؤكد حجزه عبر الإنترنت', 'تقويم واحد للفريق كله', 'حجز عدة خدمات من الموظف دفعة واحدة', 'الحجوزات والعضويات في ملف العميل', 'المبيعات وطلبات المنتجات وبطاقات الهدايا', 'تقارير الإيرادات والحجوزات والعملاء', 'الجرد والمنتجات والموردون', 'رسائل تلقائية عند كل تحديث على الحجز', 'لوحة إدارة واحدة لكل المتاجر']
  },
  taskat: {
    type: 'أداة لإدارة المشاريع بأسلوب Agile',
    tag: 'إدارة مشاريع',
    summary: 'تجمع فرق البرمجة في مكان واحد، من قائمة المهام والسبرنت إلى لوحات Kanban والمحادثة.',
    meta: ['تطوير متكامل', 'Laravel', 'Nuxt', 'WebSockets'],
    business: [
      ['المشكلة', 'تحتاج فرق البرمجة إلى التخطيط والمتابعة والنقاش في مكان واحد.'],
      ['من يستخدمها', 'فرق تعمل من قائمة المهام إلى تخطيط السبرنت وتنفيذه وإنهائه.'],
      ['ماذا تشمل', 'لوحات Kanban والسبرنت وقائمة المهام ودعوات الفريق والمحادثة.']
    ],
    engineering: [
      ['صلاحيات لكل مشروع', 'تُفحص الصلاحيات حسب الدور في كل مشروع، وليس على مستوى الحساب فقط.'],
      ['سجل تغييرات كامل', 'يُحفظ كل تغيير على المهام والمشاريع في سجل واضح.'],
      ['محادثة فورية', 'قنوات وتفاعلات ورسائل مثبتة تعمل عبر البث المباشر.']
    ],
    captions: ['المهام المؤجلة وتخطيط السبرنت', 'لوحة كانبان بالأنواع والأولويات والمسؤولين', 'تفاصيل المهمة وسجل كامل للتغييرات', 'القنوات والرسائل المباشرة والمثبتة', 'أعضاء الفريق وأدوارهم في كل مشروع']
  },
  edux: {
    type: 'منصة تعليمية للمعلمين والطلاب',
    tag: 'منصة تعليمية',
    summary: 'مساحة خاصة لكل من المسؤولين والمعلمين والطلاب لإدارة المحتوى التعليمي.',
    meta: ['تطوير متكامل', 'قيد التطوير', 'NestJS', 'PostgreSQL', 'Flutter'],
    business: [
      ['المشكلة', 'يحتاج المعلمون والطلاب إلى محتوى تعليمي منظم في مكان واحد.'],
      ['من يستخدمها', 'المسؤولون والمعلمون والطلاب، ولكل منهم واجهته.'],
      ['الوضع الحالي', 'قيد التطوير، بدءًا من إدارة المنصة.']
    ],
    engineering: [
      ['تنظيم حسب المجال', 'لكل دور واجهته دون تكرار وحدات العمل الموجودة خلفها.'],
      ['مسار طلبات صارم', 'تمر الطلبات بطبقات الحماية والتحقق والخدمات والمستودعات قبل الوصول إلى Prisma.'],
      ['معرفات عامة آمنة', 'تعرض الواجهة البرمجية معرفات UUID فقط، بينما يمكن لقاعدة البيانات استخدام أرقام داخلية.']
    ],
    captions: ['المواد بدروسها وطلابها وأسعارها وجاهزيتها', 'مكتبة الوسائط للفيديوهات وملفات PDF', 'اشتراكات الطلاب وتقدمهم في الدروس', 'مراجعة إثبات الدفع قبل تفعيل الاشتراك', 'المواد والصفوف والمعلمون الناقصون']
  },
  uop: {
    name: 'جامعة فلسطين',
    type: 'موقع جامعي ونظام لإدارة المحتوى',
    tag: 'موقع جامعي',
    summary: 'يتيح لموظفي الجامعة نشر الأخبار والفعاليات والاختبارات والصفحات بعدة لغات.',
    meta: ['تطوير متكامل', 'Laravel', 'Nuxt', 'Vue', 'Inertia'],
    business: [
      ['المشكلة', 'تحتاج الجامعة إلى نشر محتواها الرسمي وتحديثه بعدة لغات.'],
      ['من يستخدمه', 'يعمل المحررون من لوحة التحكم، ويتصفح الطلاب والزوار الموقع العام.'],
      ['ماذا يشمل', 'الأخبار والفعاليات والاختبارات والمعارض وقصص النجاح والصفحات المخصصة.']
    ],
    engineering: [
      ['صفحات دون إعادة نشر', 'أي صفحة تُنشأ من لوحة التحكم تظهر تلقائيًا عبر مسار عام.'],
      ['واجهة برمجية منفصلة', 'تفصل واجهة JSON البرمجية الموقع العام عن نظام الإدارة.'],
      ['توثيق واضح', 'الواجهة البرمجية موثقة باستخدام OpenAPI 3.0.']
    ],
    captions: ['الموقع العام على الحاسوب والجوال', 'خطوات القبول والوثائق المطلوبة', 'المقالات عبر المواقع والكليات', 'كتابة مقال وتحديد لغته وتصنيفه وموقعه', 'تعديل قسم مع معاينة مباشرة']
  },
  netspeed: {
    type: 'نظام لإدارة خدمات الإنترنت',
    tag: 'إدارة مزود إنترنت',
    summary: 'يدير بطاقات الإنترنت المدفوعة مسبقًا ونقاط الولاء وتذاكر الدعم والعمل الميداني.',
    meta: ['تطوير متكامل', 'Laravel', 'jQuery', 'SMS'],
    business: [
      ['المشكلة', 'يحتاج مزود الإنترنت إلى إدارة البطاقات والعملاء والدعم والعمل الميداني في نظام واحد.'],
      ['من يستخدمه', 'يدير المسؤولون والدعم العمليات، ويجمع العملاء النقاط ويستبدلونها بالهدايا.'],
      ['ماذا يشمل', 'البطاقات المدفوعة ونقاط الولاء وتذاكر الدعم والتركيبات والصيانة.']
    ],
    engineering: [
      ['متصل بالأجهزة', 'تستدعي أجهزة Hotspot واجهة برمجية عامة للتحقق من البطاقة وبدء الجلسة.'],
      ['أدوار دقيقة', 'لكل دور إداري مجموعة صلاحياته الخاصة.'],
      ['نشاط قابل للتتبع', 'تُسجل عمليات الدخول وإجراءات المسؤولين للمراجعة.']
    ],
    captions: ['رصيد المشترك وبطاقاته وهداياه', 'البطاقات المدفوعة مسبقًا ونقاطها', 'استبدال النقاط بالهدايا', 'تذاكر الدعم والعمل الميداني']
  },
  'er-atlas': {
    type: 'أداة بصرية لاستكشاف قواعد البيانات',
    tag: 'أداة للمطورين',
    summary: 'تسهّل استكشاف قواعد البيانات الكبيرة بالمخططات ومسودات تغييرات قابلة للمراجعة.',
    meta: ['أداة شخصية', 'Node.js', 'JavaScript', 'PostgreSQL'],
    business: [
      ['المشكلة', 'مخططات قواعد البيانات الكبيرة صعبة القراءة وتغييرها محفوف بالمخاطر.'],
      ['من يستخدمها', 'مطورون يستكشفون الجداول ويجهزون التغييرات على أجهزتهم.'],
      ['ماذا تشمل', 'المخططات وفحص الجداول والعلاقات ومسودات التغييرات.']
    ],
    engineering: [
      ['مسودات قبل التغيير', 'تُقترح التعديلات كمسودات للمراجعة بدل كتابتها مباشرة في قاعدة البيانات.'],
      ['اقتراحات من الاستخدام الفعلي', 'تعتمد الاقتراحات على طريقة استخدام الكود للجداول، لا الأسماء والمفاتيح فقط.'],
      ['صغيرة ومحلية', 'خادم Node محلي مع واجهة JavaScript بسيطة.']
    ],
    captions: ['مساعد AI يميز الحقائق من الاستنتاجات', 'مراجعة التغييرات كمسودة', 'أعمدة الجدول ومفاتيحه وعلاقاته', 'الجداول مقسمة حسب المواضيع', 'البحث في كل الجداول بالوضع الداكن']
  }
};

function setText(element, text) {
  const node = [...element.childNodes].find(child => child.nodeType === Node.TEXT_NODE && child.textContent.trim());
  if (node) node.textContent = ` ${text} `;
  else element.textContent = text;
}

function setLines(selector, lines) {
  document.querySelectorAll(`${selector} .line`).forEach((line, index) => {
    const brushed = line.querySelector('.w-brush');
    if (!brushed) {
      line.textContent = lines[index];
      return;
    }
    const words = lines[index].split(' ');
    setText(brushed, words.pop());
    setText(line, words.join(' '));
  });
}

function translatePage() {
  const set = (selector, text) => { document.querySelector(selector).textContent = text; };
  const useEnglishTitle = (title, lines) => {
    title.classList.remove('ar-title');
    title.removeAttribute('aria-label');
    title.innerHTML = lines;
  };

  document.title = 'Mohammed Al-Namla — Backend Software Engineer';
  document.querySelector('meta[name="description"]').content = 'Backend Software Engineer building SaaS, POS and booking systems that work and grow.';
  set('.pill-long', 'My CV');
  set('.pill-short', 'CV');
  document.querySelector('.avatar-name').textContent = 'Mohammed Al-Namla';
  setText(document.querySelector('.btn-shots'), 'See my work');
  document.querySelector('.avatar-photo').alt = 'Mohammed Al-Namla';

  useEnglishTitle(document.querySelector('.hero .title'), `
    <span class="en-line en-soft">I build systems</span>
    <span class="en-line">that work <span class="en-amp">&amp;</span> grow</span>`);

  set('.clients-label', 'Worked with');
  document.querySelectorAll('.logo-full').forEach((logo) => { logo.alt = 'University of Palestine'; });
  set('.ghost-word', 'Work');
  setLines('.projects .subtitle', ['Some of the products', "I've built"]);
  document.querySelector('.projects .divider-tag').textContent = 'Projects';

  setLines('.subtitle-wide', ['From the database to the screen,', 'built to run in production']);
  setLines('.subtitle-narrow', ['From the database', 'to the screen,', 'built to run in production']);
  document.querySelector('.services .divider-tag').textContent = 'Services';

  const services = [
    ['Multi-tenant SaaS', 'One platform serving many businesses, each with its own data, roles and permissions.'],
    ['APIs & Integrations', 'Documented APIs and external providers, kept in sync with webhooks and scheduled checks.'],
    ['Real-time & Offline', 'Live updates over WebSockets, and a POS that keeps taking orders when the connection drops.'],
    ['Full-stack Delivery', 'Vue and Nuxt interfaces, shipped together with the backend behind them.']
  ];
  document.querySelectorAll('.service').forEach((service, index) => {
    service.querySelector('h3').textContent = services[index][0];
    service.querySelector('p').textContent = services[index][1];
  });

  document.querySelector('.experience .divider-tag').textContent = 'Experience';
  setText(document.querySelector('.experience .line'), 'The road');
  setText(document.querySelector('.xp-road'), 'so far');
  const experience = [
    ['Oct 2023 — Now', 'Backend Software Engineer', 'SaaS, ERP and booking platforms for multiple clients.'],
    ['Jun — Oct 2023', 'Backend Developer Intern', 'PHP, Laravel and MySQL, before joining the team full-time.'],
    ['2020 — 2025', 'B.Sc. Information Technology', 'Web development, databases and software engineering.']
  ];
  const experienceDates = document.querySelectorAll('.xp-date');
  const experienceRoles = document.querySelectorAll('.xp-role');
  const experienceNotes = document.querySelectorAll('.xp-note');
  experience.forEach(([date, role, note], index) => {
    experienceDates[index].textContent = date;
    experienceRoles[index].textContent = role;
    experienceNotes[index].textContent = note;
  });
  const companies = ['Approved Tech', 'Islamic University of Gaza'];
  document.querySelectorAll('.xp-company').forEach((company, index) => {
    setText(company.querySelector('a') || company, companies[index]);
  });
  const companyLogos = ['Approved Tech logo', 'Islamic University of Gaza logo'];
  document.querySelectorAll('.xp-logo img').forEach((logo, index) => { logo.alt = companyLogos[index]; });
  const fixedDuration = document.querySelector('.xp-duration:not([data-start])');
  if (fixedDuration) fixedDuration.textContent = '4 months';

  useEnglishTitle(document.querySelector('.cta-title'), `
    <span class="en-line en-soft">Let’s build</span>
    <span class="en-line">something that lasts</span>`);
  setText(document.querySelector('.btn-email'), 'Email me');
  set('.btn-whatsapp', 'WhatsApp');
}

// The English headlines settle once when they come into view
if (!isArabic) {
  translatePage();
  document.querySelectorAll('.en-title').forEach((title) => {
    const titleObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      title.classList.add('is-playing');
      titleObserver.disconnect();
    }, { threshold: .4 });
    titleObserver.observe(title);
  });
}

if (isArabic) {
  projects.forEach((project) => {
    const arabic = projectsArabic[project.id];
    Object.assign(project, arabic);
    if (project.shots && arabic.captions) {
      project.shots.forEach((shot, index) => { shot.caption = arabic.captions[index]; });
    }
  });
}
