// size scales fonts with small letterforms so the samples read at a similar height
const fonts = [
  { family: 'Beiruti', weight: 700, note: 'حديث بزوايا حادة وطابع إعلاني.' },
  { family: 'Cairo Play', weight: 700, note: 'مربع بأشكال حروف بديلة مرحة.' },
  { family: 'Fustat', weight: 700, note: 'معاصر ونظيف بروح عربية.' },
  { family: 'Zain', weight: 700, note: 'بسيط بتفاصيل خط يد خفيفة.' },
  { family: 'Rubik', weight: 600, note: 'زوايا مدورة وحضور ودود.' },
  { family: 'Baloo Bhaijaan 2', weight: 700, note: 'ممتلئ ومستدير جدًا.' },
  { family: 'Playpen Sans Arabic', weight: 600, note: 'يشبه الكتابة باليد بأسلوب عصري.' },
  { family: 'Handjet', weight: 500, size: 1.25, note: 'حروف نقطية مثل الشاشات، قريب من البرمجة.' },
  { family: 'Noto Kufi Arabic', weight: 700, note: 'كوفي واضح ومتوازن.' },
  { family: 'Qahiri', weight: 400, size: 1.25, note: 'كوفي قاهري تاريخي مميز جدًا.' },
  { family: 'Blaka', weight: 400, size: 1.15, note: 'قوطي عربي، جريء وغير مألوف.' },
  { family: 'Blaka Ink', weight: 400, size: 1.15, note: 'نفس السابق بملمس حبر.' },
  { family: 'Aref Ruqaa', weight: 700, note: 'رقعة كلاسيكية بتوقيع واضح.' },
  { family: 'Aref Ruqaa Ink', weight: 700, note: 'رقعة بملمس حبر حقيقي.' },
  { family: 'Gulzar', weight: 400, note: 'نستعليق انسيابي وفخم.' },
  { family: 'Katibeh', weight: 400, size: 1.3, note: 'يد خطاط بحركات متحررة.' },
  { family: 'Jomhuria', weight: 400, size: 1.6, note: 'مكثف وقوي مثل عناوين الصحف.' },
  { family: 'Markazi Text', weight: 700, size: 1.2, note: 'نسخ تحريري راقٍ.' },
  { family: 'Mirza', weight: 700, size: 1.2, note: 'نسخ بطابع أدبي هادئ.' },
  { family: 'Alkalami', weight: 400, size: 1.1, note: 'خط مغربي نادر وعريض.' }
];

fonts.forEach((font) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${font.family.replaceAll(' ', '+')}:wght@${font.weight}&display=swap`;
  document.head.append(link);
});

document.getElementById('fonts').innerHTML = fonts.map((font, index) => `
  <article class="af-card">
    <span class="af-number">${index + 1}</span>
    <p class="af-sample" style="font-family:'${font.family}',serif;font-weight:${font.weight};font-size:${2 * (font.size || 1)}rem">
      <span class="line">أبني الأنظمة</span>
      <span class="line">خلف منتجات</span>
      <span class="line">حقيقية.</span>
    </p>
    <h2 class="af-name" dir="ltr">${font.family}</h2>
    <p class="af-note">${font.note}</p>
  </article>`).join('');
