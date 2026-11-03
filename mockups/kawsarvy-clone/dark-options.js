const palettes = [
  { name: 'رمادي عميق', surface: '#262626', light: '#2f2f2f', raised: '#3a3a3a', ink: '#f2f2f0', fade: '#bcbcb9', soft: '#b7b7b4', btn: '#f2f2f0', btnInk: '#262626', line: '#424242', muted: '#8c8c89' },
  { name: 'رمادي ناعم', surface: '#2c2c2b', light: '#353534', raised: '#404040', ink: '#f3f3f0', fade: '#c0c0bc', soft: '#bbbbb7', btn: '#f3f3f0', btnInk: '#2c2c2b', line: '#484847', muted: '#92928e' },
  { name: 'رمادي أخف', surface: '#333332', light: '#3c3c3b', raised: '#474746', ink: '#f5f5f2', fade: '#c6c6c2', soft: '#c1c1bd', btn: '#f5f5f2', btnInk: '#333332', line: '#50504e', muted: '#989894' },
  { name: 'الأخف', surface: '#3a3a39', light: '#434342', raised: '#4e4e4c', ink: '#f7f7f4', fade: '#cbcbc7', soft: '#c7c7c3', btn: '#f7f7f4', btnInk: '#3a3a39', line: '#575755', muted: '#a0a09c' },
  { name: 'دافئ ناعم', surface: '#2e2d2b', light: '#373634', raised: '#42403e', ink: '#f4f2ee', fade: '#c1beb8', soft: '#bcb9b3', btn: '#f4f2ee', btnInk: '#2e2d2b', line: '#4a4845', muted: '#93908a' },
  { name: 'بارد ناعم', surface: '#2b2d30', light: '#34363a', raised: '#3f4246', ink: '#f2f3f5', fade: '#bfc2c7', soft: '#babdc2', btn: '#f2f3f5', btnInk: '#2b2d30', line: '#474a4f', muted: '#90939a' }
];

const page = document.getElementById('page');
const picker = document.getElementById('picker');
let currentIndex = 1;

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
