const palettes = [
  { name: 'الحالي', surface: '#1c1b1a', light: '#242321', raised: '#2e2c2a', ink: '#e9e7e3', fade: '#a5a29d', soft: '#a09e99', btn: '#e4e2dd', btnInk: '#1c1b1a', line: '#353330', muted: '#7d7b76' },
  { name: 'جرافيت', surface: '#131313', light: '#1c1c1c', raised: '#292929', ink: '#f4f4f4', fade: '#a8a8a8', soft: '#a6a6a6', btn: '#f4f4f4', btnInk: '#131313', line: '#2e2e2e', muted: '#7a7a7a' },
  { name: 'أسود', surface: '#000000', light: '#101010', raised: '#1f1f1f', ink: '#ffffff', fade: '#a3a3a3', soft: '#a0a0a0', btn: '#ffffff', btnInk: '#000000', line: '#262626', muted: '#757575' },
  { name: 'حبر أزرق', surface: '#0e1116', light: '#161a21', raised: '#232833', ink: '#eff2f7', fade: '#a2aab8', soft: '#a0a7b4', btn: '#eff2f7', btnInk: '#0e1116', line: '#2a303b', muted: '#747c8a' },
  { name: 'فحمي دافئ', surface: '#121110', light: '#1f1d1b', raised: '#2d2a27', ink: '#f5f2ec', fade: '#b0aba2', soft: '#aca79e', btn: '#f5f2ec', btnInk: '#121110', line: '#322f2b', muted: '#807b73' },
  { name: 'أخضر داكن', surface: '#0e1411', light: '#161e1a', raised: '#232d28', ink: '#eff4f1', fade: '#a3b0a9', soft: '#a0ada6', btn: '#eff4f1', btnInk: '#0e1411', line: '#2a342f', muted: '#74807a' }
];

const page = document.getElementById('page');
const picker = document.getElementById('picker');
let currentIndex = 0;

function applyPalette(index) {
  currentIndex = index;
  const palette = palettes[index];
  const pageRoot = page.contentDocument?.documentElement;
  if (pageRoot) {
    pageRoot.dataset.theme = 'dark';
    const values = {
      '--surface': palette.surface,
      '--surface-light': palette.light,
      '--raised': palette.raised,
      '--ink': palette.ink,
      '--ink-fade': palette.fade,
      '--ink-soft': palette.soft,
      '--btn': palette.btn,
      '--btn-ink': palette.btnInk,
      '--line': palette.line
    };
    Object.entries(values).forEach(([name, value]) => pageRoot.style.setProperty(name, value));
    pageRoot.style.setProperty('background', palette.surface);
    page.contentDocument.querySelectorAll('.xp-row:not(.is-current) .xp-year').forEach((year) => { year.style.color = palette.muted; });
    page.contentWindow.showTheme?.(true);
  }
  picker.querySelectorAll('button').forEach((button, buttonIndex) => {
    button.setAttribute('aria-pressed', String(buttonIndex === index));
  });
}

picker.innerHTML = palettes.map((palette, index) => `
  <button type="button" data-index="${index}" aria-pressed="false">
    <span class="swatch" style="background:${palette.surface}"></span>${palette.name}
  </button>`).join('');

picker.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (button) applyPalette(Number(button.dataset.index));
});

page.addEventListener('load', () => applyPalette(currentIndex));
