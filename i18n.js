// Language: Arabic is written in the HTML, and this file swaps in English when it is chosen.
const isArabic = document.documentElement.lang === 'ar';

const ui = isArabic
  ? {
      copy: 'نسخ البريد الإلكتروني',
      copied: 'تم نسخ البريد الإلكتروني',
      useDark: 'استخدام الوضع الداكن',
      useLight: 'استخدام الوضع الفاتح',
      otherLanguage: 'EN - Switch to English',
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
      otherLanguage: 'ع - التبديل إلى العربية',
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
    summary: 'نظام واحد للمطعم كله: الطلبات والدفع والمطبخ والمخزون.',
    meta: ['تطوير متكامل', 'يعمل الآن', 'Laravel', 'Nuxt', 'PostgreSQL', 'Flutter'],
    business: [
      ['لماذا بنيته', 'في وقت الذروة لا يحتمل المطعم أن يضيع طلب بين الكاشير والمطبخ، فكان لا بد أن يعمل كل شيء كنظام واحد.'],
      ['من يستخدمه', 'الكاشير والنادل والمطبخ والمدير وفريق الموارد البشرية، ولكل منهم شاشته.'],
      ['ماذا فيه', 'نقطة البيع، الطاولات، شاشة المطبخ، منيو QR، المخزون والموردون، تكلفة كل طبق، العملاء، الموظفون والتقارير.'],
      ['اليوم', 'يعمل كل يوم مع مطاعم حقيقية وزبائنها.']
    ],
    engineering: [
      ['عندما ينقطع الإنترنت', 'تُحفظ الطلبات على الجهاز وتتزامن عند عودة الاتصال، فلا يتوقف العمل.'],
      ['نظام خلفي واحد', 'لوحة التحكم ولوحة الإدارة وتطبيق الموظفين تعمل كلها على واجهة Laravel واحدة لمتاجر كثيرة.'],
      ['الطباعة', 'تطبيق Flutter للموظفين يعمل أيضًا كمركز للطباعة في المطعم.']
    ],
    captions: ['نقطة البيع مع الإضافات والخصومات وتقسيم الدفع', 'شاشة المطبخ من الطلب الجديد حتى الجاهزية', 'حالة الطاولات مباشرة في صالة المطعم', 'منيو QR يطلب منه الزبائن', 'مستويات المخزون وتكلفة كل طبق', 'الطلبات تُحفظ دون إنترنت وتتزامن بين الأجهزة']
  },
  bookforme: {
    type: 'منصة حجوزات للأعمال الخدمية',
    tag: 'منصة حجوزات',
    summary: 'حجز أونلاين للصالونات والعيادات والمنتجعات، ومعه التقويم والعملاء والتقارير.',
    meta: ['تطوير متكامل', 'Laravel', 'Nuxt', 'WebSockets'],
    business: [
      ['الفكرة', 'كثير من الصالونات والعيادات ما زالت تأخذ الحجوزات بالهاتف والرسائل. هنا يحجز العميل وحده.'],
      ['من يستخدمها', 'الملاك والموظفون يديرون يومهم منها، والعميل يحجز من التطبيق أو من صفحة المتجر، وفريق المنصة يدير كل المتاجر.'],
      ['ماذا فيها', 'الحجوزات والتقويم، الخدمات والباقات والعضويات، العملاء وبطاقات الهدايا، المخزون والموردون، التسويق والتذكيرات، الموظفون والصلاحيات، والتقارير، بالعربية والإنجليزية.']
    ],
    engineering: [
      ['كل متجر مستقل', 'لكل متجر بياناته المعزولة، مع أن المتاجر كلها تشترك في التطبيقات نفسها.'],
      ['إيجاد وقت فارغ', 'الوقت المتاح يعتمد على الموظفين والخدمات وساعات العمل والأوقات المحجوبة، وكلها تُفحص معًا.'],
      ['تقويم مباشر', 'عندما يتغير حجز، يراه الجميع فورًا عبر Laravel Reverb.']
    ],
    captions: ['يختار العميل الوقت ويؤكد حجزه عبر الإنترنت', 'تقويم واحد للفريق كله', 'حجز عدة خدمات من الموظف دفعة واحدة', 'الحجوزات والعضويات في ملف العميل', 'المبيعات وطلبات المنتجات وبطاقات الهدايا', 'تقارير الإيرادات والحجوزات والعملاء', 'الجرد والمنتجات والموردون', 'رسائل تلقائية عند كل تحديث على الحجز', 'لوحة إدارة واحدة لكل المتاجر']
  },
  taskat: {
    type: 'أداة لإدارة المشاريع بأسلوب Agile',
    tag: 'إدارة مشاريع',
    summary: 'مكان واحد لفرق البرمجة: تخطيط السبرنت، ونقل المهام، والمحادثة.',
    meta: ['تطوير متكامل', 'Laravel', 'Nuxt', 'WebSockets'],
    business: [
      ['الفكرة', 'كثير من فرق البرمجة توزّع التخطيط والمهام والنقاش على أكثر من أداة. Taskat يجمعها في مكان واحد.'],
      ['كيف تستخدمه الفرق', 'من قائمة المهام إلى تخطيط السبرنت، ثم العمل عليه وإغلاقه.'],
      ['ماذا فيه', 'لوحات Kanban بالسحب والإفلات، السبرنت وقائمة المهام، حالات مخصصة لكل مشروع، التعليقات والمرفقات، صفحة «عملي»، دعوات الفريق، الإشعارات والمحادثة.']
    ],
    engineering: [
      ['صلاحيات لكل مشروع', 'قد يقود شخص مشروعًا ويكتفي بالمشاهدة في آخر، لذلك تُفحص الأدوار لكل مشروع وليس للحساب فقط.'],
      ['لا شيء يضيع', 'كل تغيير على مهمة أو مشروع محفوظ في سجل واضح.'],
      ['محادثة داخل الأداة', 'قنوات وتفاعلات ورسائل مثبتة، مباشرة عبر البث.']
    ],
    captions: ['المهام المؤجلة وتخطيط السبرنت', 'لوحة كانبان بالأنواع والأولويات والمسؤولين', 'تفاصيل المهمة وسجل كامل للتغييرات', 'القنوات والرسائل المباشرة والمثبتة', 'أعضاء الفريق وأدوارهم في كل مشروع']
  },
  edux: {
    type: 'منصة تعليمية للمعلمين والطلاب',
    tag: 'منصة تعليمية',
    summary: 'منصة تعليمية، لكل من المسؤولين والمعلمين والطلاب مساحته الخاصة.',
    meta: ['تطوير متكامل', 'قيد التطوير', 'NestJS', 'PostgreSQL', 'Flutter'],
    business: [
      ['الفكرة', 'يحتاج المعلم والطالب أن تكون الدروس والملفات والاشتراكات مرتبة في مكان واحد.'],
      ['من يستخدمها', 'المسؤولون والمعلمون والطلاب، ولكل منهم شاشاته.'],
      ['أين وصلت', 'ما زالت قيد التطوير، وبدأت بجهة الإدارة.']
    ],
    engineering: [
      ['منظمة حسب المجال', 'لكل دور واجهته، لكن المنطق خلفها مكتوب مرة واحدة.'],
      ['طريق واضح لكل طلب', 'يمر كل طلب بالحماية والتحقق والخدمات والمستودعات قبل أن يصل إلى Prisma.'],
      ['معرفات آمنة', 'الواجهة البرمجية تعرض UUID فقط، والأرقام الداخلية تبقى في قاعدة البيانات.']
    ],
    captions: ['المواد بدروسها وطلابها وأسعارها وجاهزيتها', 'مكتبة الوسائط للفيديوهات وملفات PDF', 'اشتراكات الطلاب وتقدمهم في الدروس', 'مراجعة إثبات الدفع قبل تفعيل الاشتراك', 'المواد والصفوف والمعلمون الناقصون']
  },
  uop: {
    name: 'جامعة فلسطين',
    type: 'موقع جامعي ونظام لإدارة المحتوى',
    tag: 'موقع جامعي',
    summary: 'موقع الجامعة، والنظام الذي ينشر منه موظفوها الأخبار والفعاليات والصفحات بعدة لغات.',
    meta: ['تطوير متكامل', 'Laravel', 'Nuxt', 'Vue', 'Inertia'],
    business: [
      ['الحاجة', 'الجامعة تنشر محتوى رسميًا كثيرًا بأكثر من لغة، ويجب أن يبقى محدّثًا.'],
      ['من يستخدمه', 'المحررون يعملون من لوحة التحكم، والطلاب والزوار يتصفحون الموقع.'],
      ['ماذا فيه', 'الأخبار والفعاليات، جداول الاختبارات، المعارض، نتائج الثانوية العامة، الشراكات والأبحاث، قصص النجاح، الكليات والتخصصات، وأي صفحة جديدة، بالعربية والإنجليزية.']
    ],
    engineering: [
      ['صفحات جديدة بلا مطوّر', 'ينشئ المحرر الصفحة من لوحة التحكم فتظهر على الموقع وحدها.'],
      ['الموقع منفصل عن الإدارة', 'الموقع العام يقرأ من واجهة JSON، فيبقى مستقلًا عن نظام الإدارة.'],
      ['واجهة موثقة', 'كل مسار موثق بـOpenAPI 3.0، فلا يحتاج المطوّر التالي أن يخمّن.']
    ],
    captions: ['الموقع العام على الحاسوب والجوال', 'خطوات القبول والوثائق المطلوبة', 'المقالات عبر المواقع والكليات', 'كتابة مقال وتحديد لغته وتصنيفه وموقعه', 'تعديل قسم مع معاينة مباشرة']
  },
  netspeed: {
    type: 'نظام لإدارة خدمات الإنترنت',
    tag: 'إدارة مزود إنترنت',
    summary: 'نظام واحد لمزود إنترنت: البطاقات المدفوعة ونقاط الولاء والدعم والعمل الميداني.',
    meta: ['تطوير متكامل', 'Laravel', 'jQuery', 'SMS'],
    business: [
      ['لماذا وُجد', 'البطاقات والعملاء وتذاكر الدعم والزيارات الميدانية كان لا بد أن تكون في مكان واحد.'],
      ['من يستخدمه', 'الإدارة والدعم والفنيون في الميدان يديرون العمل، والعملاء يجمعون النقاط ويستبدلونها بالهدايا.'],
      ['ماذا فيه', 'البطاقات المدفوعة، النقاط والهدايا، تذاكر الدعم، التركيبات والصيانة، عهد المعدات، التحقق بالرسائل النصية، وإحصائيات الاستخدام.']
    ],
    engineering: [
      ['يتحدث مع الأجهزة', 'أجهزة Hotspot تستدعي واجهة عامة لتتحقق من البطاقة وتبدأ الجلسة.'],
      ['دور لكل عمل', 'كل دور إداري يرى ما يحتاجه فقط.'],
      ['كل شيء قابل للتتبع', 'عمليات الدخول وإجراءات المسؤولين مسجلة للمراجعة.']
    ],
    captions: ['رصيد المشترك وبطاقاته وهداياه', 'البطاقات المدفوعة مسبقًا ونقاطها', 'استبدال النقاط بالهدايا', 'تذاكر الدعم والعمل الميداني']
  },
  'er-atlas': {
    type: 'أداة بصرية لاستكشاف قواعد البيانات',
    tag: 'أداة للمطورين',
    summary: 'أداة بنيتها لنفسي لأقرأ قواعد البيانات الكبيرة وأخطط لتغييرها بلا خوف.',
    meta: ['أداة شخصية', 'Node.js', 'JavaScript', 'PostgreSQL'],
    business: [
      ['لماذا بنيتها', 'مخططات قواعد البيانات الكبيرة صعبة القراءة، وتغييرها مخاطرة.'],
      ['لمن هي', 'لمطوّر يريد أن يفهم الجداول ويجهّز تغييراته على جهازه.'],
      ['ماذا تعطيك', 'مخططات وتفاصيل الجداول والعلاقات ومسودات للتغييرات.']
    ],
    engineering: [
      ['المسودة أولًا', 'لا يلمس أي تغيير قاعدة البيانات مباشرة، بل يبقى مسودة حتى تراجعه.'],
      ['اقتراحات من الكود الحقيقي', 'تنظر في طريقة استخدام الكود للجداول، لا الأسماء والمفاتيح فقط.'],
      ['صغيرة ومحلية', 'خادم Node صغير وJavaScript بسيطة، تعمل على جهازك.']
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
