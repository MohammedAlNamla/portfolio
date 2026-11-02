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

const marqueeTrack = document.getElementById('marquee-track');
const marqueeClone = marqueeTrack.firstElementChild.cloneNode(true);
marqueeClone.setAttribute('aria-hidden', 'true');
marqueeTrack.append(marqueeClone);
