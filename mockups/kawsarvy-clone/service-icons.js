const icon = content => `<svg viewBox="0 0 42 36" aria-hidden="true">${content}</svg>`;

const services = [
  {
    title: 'Multi-tenant SaaS',
    icons: [
      ['طبقات', '<path class="ink" d="M21 3 38 11 21 19 4 11z"/><path d="M4 18 21 26 38 18M4 25 21 33 38 25"/>'],
      ['مبانٍ', '<rect x="4" y="15" width="10" height="18" rx="1.500"/><rect class="ink" x="16" y="4" width="10" height="29" rx="1.500"/><rect x="28" y="15" width="10" height="18" rx="1.500"/><path d="M8 20h2M8 25h2M32 20h2M32 25h2"/>'],
      ['مربعات', '<rect x="7" y="3" width="13" height="13" rx="2.500"/><rect class="ink" x="22" y="3" width="13" height="13" rx="2.500"/><rect x="7" y="19" width="13" height="13" rx="2.500"/><rect x="22" y="19" width="13" height="13" rx="2.500"/>'],
      ['مركز وفروع', '<circle class="ink" cx="21" cy="18" r="4.500"/><circle cx="7" cy="7" r="3.500"/><circle cx="35" cy="7" r="3.500"/><circle cx="7" cy="29" r="3.500"/><circle cx="35" cy="29" r="3.500"/><path d="m10 9.500 7.500 6M32 9.500l-7.500 6M10 26.500l7.500-6M32 26.500l-7.500-6"/>'],
      ['نافذة مقسمة', '<rect x="3" y="4" width="36" height="28" rx="3"/><path d="M15 12v20M27 12v20"/><path class="ink" d="M3 7a3 3 0 0 1 3-3h30a3 3 0 0 1 3 3v5H3z"/>']
    ]
  },
  {
    title: 'APIs & Integrations',
    icons: [
      ['أقواس واضحة', '<path d="M14 3h-2a4 4 0 0 0-4 4v7a4 4 0 0 1-4 4 4 4 0 0 1 4 4v7a4 4 0 0 0 4 4h2M28 3h2a4 4 0 0 1 4 4v7a4 4 0 0 0 4 4 4 4 0 0 0-4 4v7a4 4 0 0 1-4 4h-2"/><circle class="ink" cx="16" cy="18" r="2"/><circle class="ink" cx="26" cy="18" r="2"/>'],
      ['عقدتان', '<circle cx="9" cy="18" r="6"/><circle class="ink" cx="33" cy="18" r="6"/><path d="M15 18h12"/>'],
      ['قابس', '<path d="M2 18h8M13 12h9v12h-9a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3zM22 15h5M22 21h5M36 18h4"/><rect class="ink" x="29" y="10" width="7" height="16" rx="2"/>'],
      ['تبادل', '<path d="M5 12h31M29 5l7 7-7 7"/><path d="M37 24H6M13 17l-7 7 7 7"/>'],
      ['رمز الكود', '<path d="m13 9-9 9 9 9M29 9l9 9-9 9"/><path class="ink" d="M23 5h3l-7 26h-3z"/>']
    ]
  },
  {
    title: 'Real-time & Offline',
    icons: [
      ['برق', '<path class="ink" d="M24 2 10 20h9l-2 14 15-19h-9z"/>'],
      ['مزامنة', '<path d="M8 14a14 14 0 0 1 24-5l3 3M35 5v7h-7"/><path d="M34 22a14 14 0 0 1-24 5l-3-3M7 31v-7h7"/>'],
      ['واي فاي', '<path d="M5 13a23 23 0 0 1 32 0M10 19a16 16 0 0 1 22 0M15 25a9 9 0 0 1 12 0"/><circle class="ink" cx="21" cy="30" r="2.500"/>'],
      ['سحابة منقطعة', '<path d="M12 29a7 7 0 0 1-1-14 10 10 0 0 1 19-2 8 8 0 0 1 1 16z"/><path d="m7 4 28 28"/>'],
      ['إشارة', '<circle cx="21" cy="18" r="15"/><circle cx="21" cy="18" r="9"/><circle class="ink" cx="21" cy="18" r="3.500"/>']
    ]
  },
  {
    title: 'Full-stack Delivery',
    icons: [
      ['واجهة وقاعدة بيانات', '<rect x="9" y="2" width="24" height="12" rx="2"/><path d="M21 14v6"/><path class="ink" d="M21 18c5.500 0 10 1.800 10 4s-4.500 4-10 4-10-1.800-10-4 4.500-4 10-4z"/><path d="M11 22v8c0 2.200 4.500 4 10 4s10-1.800 10-4v-8"/>'],
      ['ثلاث طبقات', '<rect x="5" y="3" width="32" height="8" rx="2"/><rect class="ink" x="5" y="14" width="32" height="8" rx="2"/><rect x="5" y="25" width="32" height="8" rx="2"/>'],
      ['واجهة وخادم', '<rect x="2" y="7" width="16" height="22" rx="2"/><path d="M2 12h16"/><rect x="24" y="7" width="16" height="22" rx="2"/><path d="M24 15h16M24 22h16M18 18h6"/><circle class="ink" cx="28" cy="11" r="1.500"/>'],
      ['نافذة كود', '<rect x="3" y="4" width="36" height="28" rx="3"/><path class="ink" d="M3 7a3 3 0 0 1 3-3h30a3 3 0 0 1 3 3v4H3z"/><path d="m15 16-4 4.500 4 4.500M27 16l4 4.500-4 4.500"/>'],
      ['صندوق تسليم', '<path class="ink" d="M21 3 36 11 21 19 6 11z"/><path d="M6 11v14l15 8 15-8V11M21 19v14"/>']
    ]
  }
];

document.getElementById('services').innerHTML = services.map(service => `
  <section class="si-service">
    <h2>${service.title.replace('&', '&amp;')}</h2>
    <div class="si-grid">
      ${service.icons.map(([name, art], index) => `
        <article class="si-tile">
          <span class="si-number">${index + 1}</span>
          ${icon(art)}
          <p dir="rtl">${name}</p>
        </article>`).join('')}
    </div>
  </section>`).join('');

document.getElementById('si-theme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.dataset.theme === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'dark';
});
