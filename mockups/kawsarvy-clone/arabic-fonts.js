const fonts = [
  { family: 'Alexandria', weight: 700, note: 'عريض وهندسي، الأقرب لروح الخط الإنجليزي.' },
  { family: 'Readex Pro', weight: 700, note: 'نظيف وعصري، وعريض بدون مبالغة.' },
  { family: 'Reem Kufi', weight: 700, note: 'كوفي أنيق بزوايا مميزة وهوية عربية واضحة.' },
  { family: 'Reem Kufi Fun', weight: 700, note: 'نفس الكوفي بحركات مرحة أكثر.' },
  { family: 'Marhey', weight: 700, note: 'حروف مستديرة وحركات لافتة، الأكثر تفردًا.' },
  { family: 'Lemonada', weight: 700, note: 'ناعم ومائل، فيه شخصية ودفء.' },
  { family: 'El Messiri', weight: 700, note: 'راقٍ بلمسة خط تقليدية.' },
  { family: 'Kufam', weight: 700, note: 'كوفي حديث بتوازن هادئ.' },
  { family: 'Changa', weight: 700, note: 'مربع وتقني، قريب من عالم البرمجة.' },
  { family: 'Rakkas', weight: 400, note: 'جريء جدًا بطابع ملصقات قديمة.' },
  { family: 'Lalezar', weight: 400, note: 'سميك ومشدود، حضوره قوي.' },
  { family: 'Thmanyah Sans', weight: 900, note: 'الخط العربي الموجود حاليًا، للمقارنة.' }
];

document.getElementById('fonts').innerHTML = fonts.map((font, index) => `
  <article class="af-card">
    <span class="af-number">${index + 1}</span>
    <p class="af-sample" style="font-family:'${font.family}',sans-serif;font-weight:${font.weight}">
      <span class="line">أبني الأنظمة</span>
      <span class="line">خلف منتجات</span>
      <span class="line">حقيقية.</span>
    </p>
    <h2 class="af-name" dir="ltr">${font.family}</h2>
    <p class="af-note">${font.note}</p>
  </article>`).join('');
