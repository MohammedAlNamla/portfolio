// Mohammed Al-Namla Portfolio web stream.
// Analytics is on by default; a visitor can switch it off from the privacy panel.
const GA_MEASUREMENT_ID = 'G-MV5PK161QN';
const ANALYTICS_CONSENT_KEY = 'portfolio-analytics-consent';

const analyticsText = document.documentElement.lang === 'ar'
  ? {
      message: 'أستخدم Google Analytics لقياس الزيارات والنقرات بشكل مجهول، بدون إعلانات. تقدر توقفه متى شئت.',
      toggle: 'الإحصاءات',
      settings: 'الخصوصية',
      label: 'إعدادات الخصوصية'
    }
  : {
      message: 'I use Google Analytics to measure visits and clicks anonymously, with no ads. You can turn it off anytime.',
      toggle: 'Analytics',
      settings: 'Privacy',
      label: 'Privacy settings'
    };

function readAnalyticsConsent() {
  try {
    return localStorage.getItem(ANALYTICS_CONSENT_KEY);
  } catch {
    return null;
  }
}

function saveAnalyticsConsent(value) {
  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    // If storage is unavailable, honor the choice for this page view only.
  }
}

function sendAnalyticsEvent(name, parameters = {}) {
  if (typeof window.gtag === 'function') window.gtag('event', name, parameters);
}

function loadGoogleAnalytics() {
  if (window.portfolioAnalyticsLoaded || !/^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID)) return;
  window.portfolioAnalyticsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_location: `${location.origin}${location.pathname}`,
    page_title: document.title,
    language: document.documentElement.lang,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  const tag = document.createElement('script');
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.append(tag);
}

function trackPortfolioClick(event) {
  const target = event.target instanceof Element ? event.target : null;
  const link = target?.closest('a[href]');
  const projectCard = target?.closest('.project-card');
  const projectLink = target?.closest('.sheet-visit');

  if (projectCard) {
    sendAnalyticsEvent('project_open', { project_id: projectCard.dataset.project });
    return;
  }

  if (!link) return;
  const href = link.getAttribute('href') || '';
  const text = (link.textContent || link.getAttribute('aria-label') || '').trim().slice(0, 80);
  const cleanLabel = text || 'unnamed';

  if (projectLink) {
    sendAnalyticsEvent('project_link_click', {
      project_id: location.hash.match(/^#project-(.+)$/)?.[1] || 'project',
      link_url: safeExternalUrl(href),
      link_text: cleanLabel
    });
    return;
  }

  if (href.toLowerCase().endsWith('.pdf') || link.hasAttribute('download')) {
    // GA4 Enhanced Measurement records this as the recommended file_download event.
    return;
  }

  if (href.startsWith('mailto:')) {
    sendAnalyticsEvent('contact_click', { contact_method: 'email', link_text: cleanLabel });
    return;
  }
  if (href.includes('wa.me')) {
    sendAnalyticsEvent('contact_click', { contact_method: 'whatsapp', link_text: cleanLabel });
    return;
  }
  if (href.startsWith('#')) {
    sendAnalyticsEvent('navigation_click', { destination: href.slice(1), link_text: cleanLabel });
    return;
  }

  if (/^https?:\/\//i.test(href) && new URL(href, location.href).origin !== location.origin) {
    sendAnalyticsEvent('outbound_click', { link_url: safeExternalUrl(href), link_text: cleanLabel });
  }
}

function safeExternalUrl(href) {
  try {
    const url = new URL(href, location.href);
    return `${url.origin}${url.pathname}`;
  } catch {
    return 'unknown';
  }
}

function setupConsentUi() {
  const style = document.createElement('style');
  style.textContent = `
    .analytics-ui { position: fixed; z-index: 1199; bottom: 14px; inset-inline-start: 14px; font-family: var(--font-text, sans-serif); color: var(--ink, #161616); }
    .analytics-fab { display: flex; align-items: center; height: 42px; min-width: 42px; padding: 0; border: 0; border-radius: 999px; color: inherit; background: var(--surface-light, #f8f7f5); box-shadow: 0 8px 24px -8px rgba(40,34,28,.22), 0 0 0 1px var(--line, #dddad4); cursor: pointer; font: inherit; font-size: 13px; transition: transform 160ms ease; }
    .analytics-fab:active { transform: scale(.95); }
    .analytics-fab svg { flex: none; width: 42px; height: 18px; }
    .analytics-fab span { max-width: 0; overflow: hidden; white-space: nowrap; opacity: 0; transition: max-width 320ms ease, opacity 240ms ease, margin 320ms ease; }
    .analytics-ui.is-hint .analytics-fab span { max-width: 120px; opacity: 1; margin-inline-end: 16px; margin-inline-start: -8px; }
    .analytics-panel { position: absolute; bottom: 52px; inset-inline-start: 0; width: min(300px, calc(100vw - 28px)); padding: 18px; border-radius: 22px; background: var(--surface-light, #f8f7f5); box-shadow: 0 14px 36px -10px rgba(40,34,28,.28), 0 0 0 1px var(--line, #dddad4); transition: opacity 180ms ease, transform 180ms ease; }
    html[dir="rtl"] .analytics-panel { transform-origin: bottom right; }
    html:not([dir="rtl"]) .analytics-panel { transform-origin: bottom left; }
    .analytics-panel[hidden] { display: block; opacity: 0; transform: scale(.94) translateY(6px); pointer-events: none; visibility: hidden; }
    .analytics-panel h2 { margin: 0 0 4px; font-size: 15px; font-weight: 700; }
    .analytics-panel p { margin: 0 0 14px; font-size: 13px; line-height: 1.7; color: var(--ink-soft, #57544f); }
    .analytics-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 14px; }
    .analytics-switch { position: relative; flex: none; width: 44px; height: 26px; padding: 0; border: 0; border-radius: 999px; background: var(--line, #dddad4); cursor: pointer; transition: background-color 200ms ease; }
    .analytics-switch::after { content: ""; position: absolute; top: 3px; inset-inline-start: 3px; width: 20px; height: 20px; border-radius: 50%; background: var(--surface-light, #f8f7f5); box-shadow: 0 1px 3px rgba(0,0,0,.3); transition: transform 200ms ease; }
    .analytics-switch[aria-checked="true"] { background: var(--btn, #252321); }
    .analytics-switch[aria-checked="true"]::after { transform: translateX(18px); background: var(--surface, #eeecea); }
    html[dir="rtl"] .analytics-switch[aria-checked="true"]::after { transform: translateX(-18px); }
    .analytics-fab:focus-visible, .analytics-switch:focus-visible { outline: 2px solid var(--ink, #161616); outline-offset: 2px; }
    @media (prefers-reduced-motion: reduce) { .analytics-ui * { transition: none !important; } }
  `;
  document.head.append(style);

  const ui = document.createElement('div');
  ui.className = 'analytics-ui';
  ui.innerHTML = `
    <div class="analytics-panel" id="analytics-panel" role="dialog" aria-modal="false" aria-label="${analyticsText.label}" hidden>
      <h2>${analyticsText.settings}</h2>
      <p>${analyticsText.message}</p>
      <div class="analytics-row"><span id="analytics-switch-label">${analyticsText.toggle}</span><button class="analytics-switch" type="button" role="switch" aria-checked="true" aria-labelledby="analytics-switch-label"></button></div>
    </div>
    <button class="analytics-fab" type="button" aria-expanded="false" aria-controls="analytics-panel" aria-label="${analyticsText.label}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/></svg>
      <span>${analyticsText.settings}</span>
    </button>`;
  document.body.append(ui);

  const fab = ui.querySelector('.analytics-fab');
  const panel = ui.querySelector('.analytics-panel');
  const toggle = ui.querySelector('.analytics-switch');

  function setPanel(open) {
    panel.hidden = !open;
    fab.setAttribute('aria-expanded', String(open));
    ui.classList.remove('is-hint');
  }

  function applyChoice(value) {
    toggle.setAttribute('aria-checked', String(value === 'granted'));
    if (value === 'granted') {
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
      if (window.portfolioAnalyticsLoaded) {
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
      }
      loadGoogleAnalytics();
      document.addEventListener('click', trackPortfolioClick);
    } else {
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      if (window.portfolioAnalyticsLoaded) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
        document.cookie.split(';').forEach(cookie => {
          const name = cookie.split('=')[0].trim();
          if (name === '_ga' || name.startsWith('_ga_')) {
            document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
          }
        });
      }
      document.removeEventListener('click', trackPortfolioClick);
    }
  }

  fab.addEventListener('click', () => setPanel(panel.hidden));
  toggle.addEventListener('click', () => {
    const value = toggle.getAttribute('aria-checked') === 'true' ? 'denied' : 'granted';
    saveAnalyticsConsent(value);
    applyChoice(value);
  });
  document.addEventListener('pointerdown', event => {
    if (!panel.hidden && !ui.contains(event.target)) setPanel(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) { setPanel(false); fab.focus(); }
  });

  // On by default: only an explicit opt-out stops tracking.
  const savedChoice = readAnalyticsConsent();
  applyChoice(savedChoice === 'denied' ? 'denied' : 'granted');

  // First visit: the icon shows its name for a few seconds, then shrinks to a circle.
  if (!savedChoice) {
    setTimeout(() => ui.classList.add('is-hint'), 1200);
    setTimeout(() => ui.classList.remove('is-hint'), 7000);
  }
}

setupConsentUi();
