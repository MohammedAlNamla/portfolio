// Language: English is written in the HTML, and this file swaps in Arabic when it is chosen.
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
  shahrazad: {
    type: 'واجهة برمجية لحجز الرحلات والتنقلات وشرائح eSIM',
    tag: 'واجهة برمجية للسفر',
    summary: 'واجهة برمجية واحدة لحجز الرحلات والتنقلات وشراء شرائح eSIM، مع حجز دون إنشاء حساب.',
    meta: ['أنظمة خلفية', 'في فكرتك', 'Laravel 12', 'MySQL'],
    business: [
      ['الفكرة', 'مكان واحد يحجز فيه المسافرون الرحلات والتنقلات ويشترون شرائح eSIM.'],
      ['كيف تعمل', 'تبيع المنصة عبر مزودين خارجيين وتتابع كل طلب للعميل.'],
      ['من يستخدمها', 'يحجز المسافرون دون حساب، ويتابع الدعم الطلبات من أدوات الإدارة.']
    ],
    engineering: [
      ['مزودون خلف واجهة برمجية واحدة', 'يتعامل منطق العمل مع واجهة موحدة، فيمكن تغيير المزود دون المساس به.'],
      ['حجز دون حساب', 'يفتح الرقم المرجعي القصير والبريد الإلكتروني الحجز دون تسجيل دخول.'],
      ['مزامنة مستمرة', 'تبقي Webhooks والفحوصات المجدولة الطلبات المحلية محدثة.']
    ],
    captions: ['تفاصيل الرحلة، استنادًا إلى تصاميم Figma', 'التنقلات من المطار، استنادًا إلى تصاميم Figma', 'باقات شرائح السفر، استنادًا إلى تصاميم Figma', 'فتح الحجز دون حساب', 'واجهة برمجية واحدة أمام عدة مزودين']
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

const stretchWord = (start, end, modifier) =>
  `<span class="ar-big ${modifier}"><span>${start}</span><span class="ar-stretch"><span>${'ـ'.repeat(30)}</span></span><span>${end}</span></span>`;

function translatePage() {
  const set = (selector, text) => { document.querySelector(selector).textContent = text; };

  document.title = 'محمد النملة — مهندس برمجيات';
  set('.pill-long', 'السيرة الذاتية');
  set('.pill-short', 'السيرة');
  document.querySelector('.avatar-name').textContent = 'محمد النملة';
  setText(document.querySelector('.btn-shots'), 'استعرض أعمالي');
  document.querySelector('.avatar-photo').alt = 'محمد النملة';

  const heroTitle = document.querySelector('.hero .title');
  heroTitle.classList.add('ar-title');
  heroTitle.setAttribute('aria-label', 'أبني أنظمة تعمل وتكبر');
  heroTitle.innerHTML = `
    <span class="ar-line ar-soft" aria-hidden="true">أبني أنظمة</span>
    <span class="ar-line" aria-hidden="true">تعمل ${stretchWord('وتكـ', 'ـبر', 'ar-grow')}</span>`;

  const logos = document.querySelectorAll('.logo');
  logos[logos.length - 1].textContent = 'فكرتك';

  set('.clients-label', 'عملت مع');
  set('.ghost-word', 'أعمال');
  setLines('.projects .subtitle', ['من المنتجات', 'التي بنيتها']);
  document.querySelector('.projects .divider-tag').textContent = 'المشاريع';

  setLines('.subtitle-wide', ['من قاعدة البيانات إلى الشاشة،', 'أنظمة تعمل بثبات في الإنتاج']);
  setLines('.subtitle-narrow', ['من قاعدة البيانات', 'إلى الشاشة،', 'أنظمة تعمل بثبات في الإنتاج']);
  document.querySelector('.services .divider-tag').textContent = 'الخدمات';

  const services = [
    ['أنظمة متعددة العملاء', 'منصة واحدة تخدم شركات كثيرة، ولكل منها بياناتها وأدوارها وصلاحياتها.'],
    ['واجهات برمجية وتكاملات', 'واجهات موثقة وربط بمزودين خارجيين، تبقى متزامنة عبر Webhooks ومهام مجدولة.'],
    ['الوقت الفعلي والعمل دون اتصال', 'تحديثات فورية عبر WebSockets، ونقطة بيع تواصل استقبال الطلبات عند انقطاع الاتصال.'],
    ['تطوير متكامل', 'واجهات Vue وNuxt تُسلَّم مع الأنظمة الخلفية التي تشغّلها.']
  ];
  document.querySelectorAll('.service').forEach((service, index) => {
    service.querySelector('h3').textContent = services[index][0];
    service.querySelector('p').textContent = services[index][1];
  });

  document.querySelector('.experience .divider-tag').textContent = 'الخبرات';
  setText(document.querySelector('.experience .line'), 'الطريق');
  setText(document.querySelector('.xp-road'), 'حتى الآن');
  const experience = [
    ['أكتوبر 2026 — الآن', 'مهندس أنظمة خلفية · دوام جزئي', 'أبني Shahrazad Tours، واجهة برمجية لحجز الرحلات والتنقلات وشرائح eSIM.'],
    ['أكتوبر 2023 — الآن', 'مهندس أنظمة خلفية', 'منصات SaaS وERP وحجوزات لعدة عملاء.'],
    ['يونيو — أكتوبر 2023', 'متدرب في تطوير الأنظمة الخلفية', 'PHP وLaravel وMySQL، قبل الانضمام إلى الفريق بدوام كامل.'],
    ['2020 — 2025', 'بكالوريوس تقنية المعلومات', 'تطوير الويب وقواعد البيانات وهندسة البرمجيات.']
  ];
  const experienceDates = document.querySelectorAll('.xp-date');
  const experienceRoles = document.querySelectorAll('.xp-role');
  const experienceNotes = document.querySelectorAll('.xp-note');
  experience.slice(-experienceDates.length).forEach(([date, role, note], index) => {
    experienceDates[index].textContent = date;
    experienceRoles[index].textContent = role;
    experienceNotes[index].textContent = note;
  });
  const companies = ['فكرتك', 'Approved Tech', 'الجامعة الإسلامية بغزة'];
  const companyNodes = document.querySelectorAll('.xp-company');
  companyNodes.forEach((company, index) => {
    setText(company.querySelector('a') || company, companies.slice(-companyNodes.length)[index]);
  });
  const fikritakLogo = [...document.querySelectorAll('.xp-logo')].find(logo => logo.textContent.trim() === 'F');
  if (fikritakLogo) {
    fikritakLogo.textContent = 'ف';
    fikritakLogo.setAttribute('aria-label', 'فكرتك');
  }
  const fixedDuration = document.querySelector('.xp-duration:not([data-start])');
  if (fixedDuration) fixedDuration.textContent = '4 أشهر';

  const contactTitle = document.querySelector('.cta-title');
  contactTitle.classList.add('ar-title');
  contactTitle.setAttribute('aria-label', 'لنبنِ معًا شيئًا يدوم');
  contactTitle.innerHTML = `
    <span class="ar-line ar-soft" aria-hidden="true">لنبنِ معًا</span>
    <span class="ar-line" aria-hidden="true">شيئًا ${stretchWord('يـ', 'ـدوم', 'ar-join')}</span>`;
  setText(document.querySelector('.btn-email'), 'راسلني');
  set('.btn-whatsapp', 'واتساب');
}

// The English headlines settle once when they come into view
if (!isArabic) {
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
  translatePage();
  projects.forEach((project) => {
    const arabic = projectsArabic[project.id];
    Object.assign(project, arabic);
    if (project.shots && arabic.captions) {
      project.shots.forEach((shot, index) => { shot.caption = arabic.captions[index]; });
    }
  });
}
