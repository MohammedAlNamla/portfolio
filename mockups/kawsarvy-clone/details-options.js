const variants = [
  { key: 'drawer', letter: 'A', name: 'لوحة جانبية', note: 'تنزلق من الجانب وتبقى الصفحة ظاهرة خلفها. مألوفة وسريعة.' },
  { key: 'sheet', letter: 'B', name: 'ورقة من الأسفل', note: 'تصعد بزوايا كبيرة مثل ألواح الصفحة. الأقرب لهوية التصميم.' },
  { key: 'full', letter: 'C', name: 'صفحة كاملة', note: 'تغطي الشاشة بعنوان كبير. الأكثر تركيزاً وتشبه دراسة حالة.' },
  { key: 'pop', letter: 'D', name: 'نافذة تنبثق من الكرت', note: 'تكبر من مكان الضغط وتبقى في الوسط. الأخف إحساساً.' },
  { key: 'split', letter: 'E', name: 'صور بجانب النص', note: 'الصور على جهة والشرح على الأخرى، ولكل منهما تمرير مستقل.' },
  { key: 'inline', letter: 'F', name: 'تنفتح داخل الصفحة', note: 'بلا نافذة فوق الصفحة، تتمدد تحت الكروت ثم تُطوى.' }
];

const closeIcon = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M2 2l10 10M12 2 2 12"/></svg>';

const media = `
  <div class="crop crop-hero d-hero" role="img" aria-label="Sufra dashboard and kitchen screens"></div>`;

const gallery = `
  <div class="d-gallery">
    <figure class="d-shot"><div class="crop crop-dashboard d-shot-img" role="img" aria-label="Dashboard"></div><figcaption>Owner dashboard and reports</figcaption></figure>
    <figure class="d-shot"><div class="crop crop-kitchen d-shot-img" role="img" aria-label="Kitchen display"></div><figcaption>Kitchen display, live orders</figcaption></figure>
    <figure class="d-shot"><div class="crop crop-pos d-shot-img" role="img" aria-label="Point of sale"></div><figcaption>Point of sale</figcaption></figure>
  </div>`;

const text = `
  <div class="d-head">
    <div>
      <h2 class="d-name">Sufra</h2>
      <p class="d-type">Restaurant menu, ordering and POS SaaS</p>
    </div>
    <a class="d-visit" href="https://sufra.live/" target="_blank" rel="noopener">Visit site ↗</a>
  </div>
  <div class="d-meta"><span>Full-stack</span><span>Live</span><span>Nuxt</span><span>Supabase</span><span>Rust</span></div>
  <div class="d-columns">
    <section class="d-block">
      <h3>For the business</h3>
      <div class="d-item"><strong>The problem</strong><p>Restaurants need their menu, orders, tables and till to work as one system.</p></div>
      <div class="d-item"><strong>Who uses it</strong><p>Owners and staff run the dashboard, POS and kitchen screens. Diners order from the menu.</p></div>
      <div class="d-item"><strong>Where it stands</strong><p>Live, with real restaurant owners and customers.</p></div>
    </section>
    <section class="d-block">
      <h3>For engineers</h3>
      <div class="d-item"><strong>A POS that survives outages</strong><p>Orders queue in IndexedDB and sync on reconnect, so a dropped line doesn't stop a busy shift.</p></div>
      <div class="d-item"><strong>The database as the boundary</strong><p>The public menu has only the anon key, so row-level security protects every table.</p></div>
      <div class="d-item"><strong>Printing from the browser</strong><p>A small Rust tray app sends ESC/POS bytes to USB printers, with WebUSB as the fallback.</p></div>
    </section>
  </div>`;

const standardContent = `<div class="d-wrap">${media}${text}${gallery}</div>`;
const splitContent = `
  <div class="d-wrap">
    <div class="d-media">${media}${gallery}</div>
    <div class="d-text">${text}</div>
  </div>`;

function closeButton() {
  return `<button class="dlg-close" type="button" aria-label="Close" autofocus>${closeIcon}</button>`;
}

function createDialog(variant) {
  const dialog = document.createElement('dialog');
  dialog.className = `dlg dlg-${variant.key}`;
  dialog.setAttribute('aria-label', `Sufra details, ${variant.name}`);
  dialog.innerHTML = `<div class="dlg-scroll">${closeButton()}${variant.key === 'split' ? splitContent : standardContent}</div>`;
  document.body.append(dialog);

  const finishClose = () => {
    dialog.classList.remove('is-closing');
    dialog.close();
    document.documentElement.classList.remove('is-locked');
  };
  const requestClose = () => {
    if (dialog.classList.contains('is-closing')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { finishClose(); return; }
    dialog.classList.add('is-closing');
    // The timer also closes it when the browser pauses animations, such as in a background tab
    setTimeout(finishClose, 220);
  };

  dialog.querySelector('.dlg-close').addEventListener('click', requestClose);
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); requestClose(); });
  dialog.addEventListener('click', (event) => { if (event.target === dialog) requestClose(); });
  return dialog;
}

const inlineHost = document.getElementById('inline-host');
const inlineInner = document.getElementById('inline-inner');
inlineInner.innerHTML = `${closeButton()}${standardContent}`;
inlineHost.inert = true;

function setInline(open, trigger) {
  inlineHost.classList.toggle('is-open', open);
  inlineHost.inert = !open;
  trigger.setAttribute('aria-expanded', String(open));
  if (open) inlineHost.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

const triggers = document.getElementById('triggers');
variants.forEach((variant) => {
  const card = document.createElement('button');
  card.className = 'do-card';
  card.type = 'button';
  card.dir = 'rtl';
  card.innerHTML = `
    <div class="crop crop-hero do-card-img"></div>
    <span class="do-card-letter">${variant.letter}</span><h2 class="do-card-name">${variant.name}</h2>
    <p class="do-card-note">${variant.note}</p>`;

  if (variant.key === 'inline') {
    card.setAttribute('aria-expanded', 'false');
    card.addEventListener('click', () => setInline(!inlineHost.classList.contains('is-open'), card));
    inlineInner.querySelector('.dlg-close').addEventListener('click', () => { setInline(false, card); card.focus(); });
  } else {
    const dialog = createDialog(variant);
    card.addEventListener('click', () => {
      const box = card.getBoundingClientRect();
      dialog.style.setProperty('--from-x', `${box.left + box.width / 2 - (window.innerWidth - Math.min(860, window.innerWidth * .94)) / 2}px`);
      dialog.style.setProperty('--from-y', `${box.top + box.height / 2 - 40}px`);
      document.documentElement.classList.add('is-locked');
      dialog.showModal();
      dialog.querySelector('.dlg-scroll').scrollTop = 0;
    });
  }
  triggers.append(card);
});
