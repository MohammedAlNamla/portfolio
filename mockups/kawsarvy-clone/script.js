const copyButton = document.getElementById('copy');
const email = document.getElementById('email').textContent;

copyButton.addEventListener('click', async () => {
  await navigator.clipboard.writeText(email);
  copyButton.textContent = 'Copied';
  setTimeout(() => { copyButton.textContent = 'Copy'; }, 1500);
});

const marqueeTrack = document.getElementById('marquee-track');
const marqueeClone = marqueeTrack.firstElementChild.cloneNode(true);
marqueeClone.setAttribute('aria-hidden', 'true');
marqueeTrack.append(marqueeClone);
