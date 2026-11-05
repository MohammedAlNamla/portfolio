const copyButton = document.getElementById('copy');
const email = document.getElementById('email').textContent;

let copyTimer;

// The Clipboard API needs a secure context, so plain http falls back to a hidden field
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement('textarea');
    field.value = text;
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.append(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    copyButton.focus();
    return copied;
  }
}

copyButton.setAttribute('aria-label', ui.copy);

copyButton.addEventListener('click', async () => {
  if (!await copyText(email)) return;
  copyButton.classList.add('is-copied');
  copyButton.setAttribute('aria-label', ui.copied);
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    copyButton.classList.remove('is-copied');
    copyButton.setAttribute('aria-label', ui.copy);
  }, 1500);
});

// Light is the default; the choice is remembered only after a visitor picks dark or light
const themeToggle = document.getElementById('theme-toggle');

function showTheme(isDark) {
  if (isDark) document.documentElement.dataset.theme = 'dark';
  else delete document.documentElement.dataset.theme;
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? ui.useLight : ui.useDark);
}

showTheme(document.documentElement.dataset.theme === 'dark');

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.dataset.theme !== 'dark';
  showTheme(isDark);
  try {
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  } catch (error) {}
});

// Durations of current roles stay correct without editing the page
const today = new Date();
document.querySelectorAll('.xp-duration[data-start]').forEach((duration) => {
  const [year, month] = duration.dataset.start.split('-').map(Number);
  duration.textContent = formatDuration((today.getFullYear() - year) * 12 + today.getMonth() + 1 - month);
});

// The line under the experience title and the services brush draw once when reached
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.xp-road, .w-brush').forEach((word) => {
    word.classList.add('is-waiting');
    const wordObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      word.classList.replace('is-waiting', 'is-drawing');
      wordObserver.disconnect();
    }, { threshold: .5 });
    wordObserver.observe(word);
  });
}

const marqueeTrack = document.getElementById('marquee-track');
const marqueeGroup = marqueeTrack.firstElementChild;
const marqueeLogos = [...marqueeGroup.children];

// Three logos alone are narrower than a wide screen, so each group repeats them
for (let copy = 0; copy < 2; copy++) {
  for (const logo of marqueeLogos) {
    const logoClone = logo.cloneNode(true);
    logoClone.setAttribute('aria-hidden', 'true');
    marqueeGroup.append(logoClone);
  }
}

const marqueeClone = marqueeGroup.cloneNode(true);
marqueeClone.setAttribute('aria-hidden', 'true');
marqueeTrack.append(marqueeClone);

// The Arabic headlines stretch once when they come into view
document.querySelectorAll('.ar-title').forEach((title) => {
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    title.classList.add('is-playing');
    observer.disconnect();
  }, { threshold: .4 });
  observer.observe(title);
});

// Shows the hero when its fonts and portrait are ready, or after a short wait on a slow connection
const HERO_MAX_WAIT = 1500;
const heroFontsNeeded = isArabic
  ? ['500 1em "Fatimah"', '900 1em "Fatimah"', '700 1em "Aref Ruqaa"', '500 1em "Thmanyah Sans"', '700 1em "Thmanyah Sans"']
  : ['500 1em "Unbounded"', 'italic 400 1em "Instrument Serif"', '500 1em "DM Sans"'];
const heroText = isArabic ? 'محمد النملة' : 'Mohammed';

Promise.race([
  Promise.allSettled([
    ...heroFontsNeeded.map(font => document.fonts.load(font, heroText)),
    document.querySelector('.avatar-photo').decode()
  ]),
  new Promise(resolve => setTimeout(resolve, HERO_MAX_WAIT))
]).then(() => {
  const root = document.documentElement;
  root.classList.add('is-entering');
  root.classList.remove('is-loading');
  setTimeout(() => root.classList.remove('is-entering'), 400);
});
