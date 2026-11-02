const EMAIL = 'moh.alnamla@gmail.com';
const CV_URL = '../../Mohammed_Al_Namla_CV.pdf';
const GITHUB_URL = 'https://github.com/Abu3Maher';
const LINKEDIN_URL = 'https://www.linkedin.com/in/mohammed-al-namla-084907260';

const ICONS = {
  copy: '<svg class="icon-copy" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="5.500" y="5.500" width="8" height="8" rx="1.500"/><path d="M10.500 3.500v-.500a1 1 0 0 0-1-1H3.500a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h.500"/></svg>',
  check: '<svg class="icon-copy" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 8.500 3.200 3.200L13 4.800"/></svg>',
  mail: '<svg class="icon-mail" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="1.500" y="3" width="13" height="10" rx="1.500"/><path d="m2 4 6 5 6-5"/></svg>',
  download: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v8M4.500 7 8 10.500 11.500 7M2.500 13.500h11"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.630 0-12 5.373-12 12 0 5.303 3.438 9.800 8.205 11.385.600.113.820-.258.820-.577 0-.285-.010-1.040-.015-2.040-3.338.724-4.042-1.610-4.042-1.610C4.422 18.070 3.633 17.700 3.633 17.700c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.070 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.760-1.605-2.665-.300-5.466-1.332-5.466-5.930 0-1.310.465-2.380 1.235-3.220-.135-.303-.540-1.523.105-3.176 0 0 1.005-.322 3.300 1.230.960-.267 1.980-.399 3-.405 1.020.006 2.040.138 3 .405 2.280-1.552 3.285-1.230 3.285-1.230.645 1.653.240 2.873.120 3.176.765.840 1.230 1.910 1.230 3.220 0 4.610-2.805 5.625-5.475 5.920.420.360.810 1.096.810 2.220 0 1.606-.015 2.896-.015 3.286 0 .315.210.690.825.570C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.900 1.637-1.850 3.370-1.850 3.601 0 4.267 2.370 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z"/></svg>'
};

const external = 'target="_blank" rel="noopener"';

const emailButton = `<button class="nb-email" type="button" aria-label="Copy email address">
  ${ICONS.mail}<span class="text">${EMAIL}</span>${ICONS.copy}
</button>`;

const textLinks = `<span class="nb-group nb-links">
  <a class="nb-link" href="${GITHUB_URL}" ${external}>GitHub</a>
  <a class="nb-link" href="${LINKEDIN_URL}" ${external}>LinkedIn</a>
</span>`;

const iconLink = (url, name, solid) =>
  `<a class="nb-icon${solid ? ' nb-icon-solid' : ''}" href="${url}" ${external} aria-label="${name}">${ICONS[name.toLowerCase()]}</a>`;

const iconLinks = `<span class="nb-group nb-icons">${iconLink(GITHUB_URL, 'GitHub')}${iconLink(LINKEDIN_URL, 'LinkedIn')}</span>`;

const cvButton = (dark, label = 'Download CV') =>
  `<a class="nb-cv${dark ? ' nb-cv-dark' : ''}" href="${CV_URL}" ${external}>
    <span class="long">${label}</span><span class="short">CV</span>${ICONS.download}
  </a>`;

const options = [
  {
    letter: 'A',
    name: 'هادئ',
    note: 'الأقرب لتصميم الصفحة الحالي: إيميل بأيقونة نسخ، وروابط، وزر CV أبيض.',
    bar: `<nav class="nb">
      <div class="nb-group">${emailButton}</div>
      <div class="nb-group">${textLinks}${iconLinks}${cvButton(false)}</div>
    </nav>`
  },
  {
    letter: 'B',
    name: 'كبسولة عائمة',
    note: 'كل شيء داخل كبسولة بيضاء في الوسط، وزر الـ CV فيها غامق وواضح.',
    bar: `<nav class="nb nb-capsule">
      <div class="nb-capsule-in">
        <div class="nb-group">${emailButton}</div>
        <span class="nb-sep"></span>
        <div class="nb-group">${textLinks}${iconLinks}</div>
        ${cvButton(true)}
      </div>
    </nav>`
  },
  {
    letter: 'C',
    name: 'الاسم أولًا',
    note: 'يبدأ باسمك ودورك مثل هوية موقع، والإيميل يبقى في قسم التواصل أسفل الصفحة.',
    bar: `<nav class="nb">
      <div class="nb-id">
        <span class="nb-id-mark" aria-hidden="true">MN</span>
        <span><b>Mohammed Al-Namla</b><small>Software Engineer</small></span>
      </div>
      <div class="nb-group">${textLinks}${iconLinks}${cvButton(false, 'CV')}</div>
    </nav>`
  },
  {
    letter: 'D',
    name: 'متاح للعمل',
    note: 'يعرض حالتك أول شيء لأصحاب العمل. يناسب فقط إذا كنت متاحًا فعلًا.',
    bar: `<nav class="nb">
      <div class="nb-group">
        <span class="nb-status"><span class="nb-dot"></span>Available for work</span>
        <span class="nb-divider"></span>
        ${emailButton}
      </div>
      <div class="nb-group">${textLinks}${iconLinks}${cvButton(false)}</div>
    </nav>`
  },
  {
    letter: 'E',
    name: 'أيقونات',
    note: 'أقل نص: إيميل، ثم أيقونات دائرية للروابط، وزر CV غامق.',
    bar: `<nav class="nb">
      <div class="nb-group">${emailButton}</div>
      <div class="nb-group">
        ${iconLink(GITHUB_URL, 'GitHub', true)}${iconLink(LINKEDIN_URL, 'LinkedIn', true)}
        ${cvButton(true)}
      </div>
    </nav>`
  }
];

const heroPreview = `<div class="frame-hero">
  <span class="frame-avatar" aria-hidden="true">MN</span>
  <p class="title">
    <span class="line">Building the</span>
    <span class="line">systems behind</span>
    <span class="line">real products.</span>
  </p>
</div>`;

const frame = (bar, modifier = '') => `<div class="frame${modifier}">${bar}${heroPreview}</div>`;

document.getElementById('options').innerHTML = options.map(option => `
  <section>
    <div class="no-label" dir="rtl">
      <span class="no-letter">${option.letter}</span>
      <h2>${option.name}</h2>
      <p>${option.note}</p>
    </div>
    <div class="no-frames">
      ${frame(option.bar)}
      ${frame(option.bar, ' frame-phone')}
    </div>
  </section>`).join('');

document.querySelectorAll('.nb-email').forEach(button => {
  const copyIcon = button.querySelector('.icon-copy');
  button.addEventListener('click', async () => {
    await navigator.clipboard.writeText(EMAIL);
    button.classList.add('is-copied');
    copyIcon.outerHTML = ICONS.check;
    setTimeout(() => {
      button.classList.remove('is-copied');
      button.querySelector('.icon-copy').outerHTML = ICONS.copy;
    }, 1500);
  });
});
