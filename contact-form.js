const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const subject = `Portfolio contact from ${name}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    message
  ].join('\n');
  const mailto = `mailto:moh.alnamla@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'contact_form_submit', { method: 'mailto' });
  }

  window.location.href = mailto;
});
