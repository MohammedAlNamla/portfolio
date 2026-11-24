// Mohammed Al-Namla Portfolio web stream.
// Analytics stays disabled until a visitor opts in.
const GA_MEASUREMENT_ID = 'G-MV5PK161QN';
const ANALYTICS_CONSENT_KEY = 'portfolio-analytics-consent';

const analyticsText = document.documentElement.lang === 'ar'
  ? {
      message: 'أستخدم Google Analytics لفهم زيارات الموقع والنقرات. لن يبدأ التتبع إلا إذا وافقت.',
      accept: 'موافقة',
      reject: 'رفض',
      settings: 'الخصوصية',
      label: 'إعدادات الخصوصية',
      close: 'إغلاق إعدادات الخصوصية'
    }
  : {
      message: 'I use Google Analytics to understand visits and clicks. Tracking starts only if you agree.',
      accept: 'Accept',
      reject: 'Decline',
      settings: 'Privacy',
      label: 'Privacy settings',
      close: 'Close privacy settings'
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
    .analytics-consent, .analytics-settings { font-family: var(--font-text, sans-serif); }
    .analytics-consent { position: fixed; z-index: 1200; inset-inline: 16px; bottom: 16px; max-width: 620px; margin-inline: auto; padding: 18px; color: var(--ink, #161616); background: var(--surface, #eeecea); border: 1px solid currentColor; box-shadow: 0 8px 32px #0002; }
    .analytics-consent[hidden] { display: none; }
    .analytics-consent p { margin: 0 0 14px; line-height: 1.6; }
    .analytics-consent-actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .analytics-consent button, .analytics-settings { border: 1px solid currentColor; color: inherit; background: transparent; padding: 8px 14px; font: inherit; cursor: pointer; }
    .analytics-consent button[data-choice="accept"] { background: var(--ink, #161616); color: var(--surface, #eeecea); }
    .analytics-settings { position: fixed; z-index: 1199; bottom: 12px; inset-inline-start: 12px; border-radius: 999px; padding: 6px 12px; font-size: 13px; background: var(--surface, #eeecea); }
    @media (prefers-reduced-motion: no-preference) { .analytics-consent { animation: analytics-consent-in 180ms ease-out both; } @keyframes analytics-consent-in { from { opacity: 0; transform: translateY(8px); } } }
  `;
  document.head.append(style);

  const banner = document.createElement('section');
  banner.className = 'analytics-consent';
  banner.setAttribute('aria-label', analyticsText.label);
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-modal', 'false');
  banner.hidden = true;
  banner.innerHTML = `<p>${analyticsText.message}</p><div class="analytics-consent-actions"><button type="button" data-choice="accept">${analyticsText.accept}</button><button type="button" data-choice="reject">${analyticsText.reject}</button></div>`;
  document.body.append(banner);

  const settings = document.createElement('button');
  settings.className = 'analytics-settings';
  settings.type = 'button';
  settings.textContent = analyticsText.settings;
  settings.setAttribute('aria-label', analyticsText.label);
  settings.hidden = true;
  document.body.append(settings);

  function showBanner() {
    banner.hidden = false;
    settings.hidden = true;
    banner.querySelector('button')?.focus();
  }

  function applyChoice(value) {
    saveAnalyticsConsent(value);
    banner.hidden = true;
    settings.hidden = false;
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

  banner.addEventListener('click', event => {
    const button = event.target.closest('button[data-choice]');
    if (button) applyChoice(button.dataset.choice === 'accept' ? 'granted' : 'denied');
  });
  settings.addEventListener('click', showBanner);

  const savedChoice = readAnalyticsConsent();
  if (savedChoice === 'granted') applyChoice('granted');
  else if (savedChoice === 'denied') settings.hidden = false;
  else showBanner();
}

setupConsentUi();
