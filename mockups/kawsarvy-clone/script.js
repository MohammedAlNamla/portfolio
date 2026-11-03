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

copyButton.addEventListener('click', async () => {
  if (!await copyText(email)) return;
  copyButton.classList.add('is-copied');
  copyButton.setAttribute('aria-label', 'Email address copied');
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    copyButton.classList.remove('is-copied');
    copyButton.setAttribute('aria-label', 'Copy email address');
  }, 1500);
});

// Durations of current roles stay correct without editing the page
function formatDuration(months) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
  if (rest || !years) parts.push(`${Math.max(rest, 1)} ${rest > 1 ? 'mos' : 'mo'}`);
  return parts.join(' ');
}

const today = new Date();
document.querySelectorAll('.xp-duration[data-start]').forEach((duration) => {
  const [year, month] = duration.dataset.start.split('-').map(Number);
  duration.textContent = formatDuration((today.getFullYear() - year) * 12 + today.getMonth() + 1 - month);
});

const marqueeTrack = document.getElementById('marquee-track');
const marqueeGroup = marqueeTrack.firstElementChild;
const marqueeLogos = [...marqueeGroup.children];

// Four logos alone are narrower than a wide screen, so each group repeats them
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
