const title = (style, ...lines) => `<h2 class="eh ${style}">${lines.map(line => `<span class="ln">${line}</span>`).join('')}</h2>`;
const chart = '<svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M0 26C14 26 18 18 30 20S46 14 58 15 80 4 98 3"/><circle cx="98" cy="3" r="3"/></svg>';
const weights = [...'grow'].map((letter, index) => `<b style="--order:${index};--to:${[300, 450, 620, 800][index]}">${letter}</b>`).join('');

const options = [
  ['الحالي', 'للمقارنة: Unbounded وتكبير الكلمة الأخيرة', title('eh-now', '<span class="soft">I build systems</span>', 'that work and grow')],
  ['رمز & الزخرفي', 'أقوى لمسة لاتينية خالصة: & جميل بالإيطالي، ولا يوجد ما يقابله في العربية', title('eh-amp', 'I build systems', 'that work <span class="amp">&amp;</span> grow')],
  ['خط هادئ مع نهاية إيطالية', 'نفس صوت "so far"، فيربط البداية بقسم الخبرات', title('eh-mix', 'I build systems', 'that <i>work and grow</i>')],
  ['إيطالي كلاسيكي كامل', 'خط Serif رفيع وأنيق كعناوين المجلات', title('eh-italic', 'I build systems', 'that <i>work and grow</i>')],
  ['دافئ وناعم', 'Fraunces: خط عتيق بحواف ناعمة وشخصية واضحة', title('eh-fraunces', 'I build systems', 'that <i>work</i> and <i>grow</i>')],
  ['سميك ورفيع', 'Bodoni: أعلى تباين، وهو الأقرب لفخامة الخط العربي دون تقليد', title('eh-bodoni', 'I build systems', 'that work <i>and grow</i>')],
  ['خط بياني تحت الكلمة', 'خط يصعد ويقف عند نقطة خضراء: معنى grow مرسوم', title('eh-chart', 'I build systems', `that work and <span class="up">grow${chart}</span>`)],
  ['حروف تزداد وزنًا', 'كل حرف في grow أثقل مما قبله، فالكلمة تكبر فعلًا', title('eh-weight', 'I build systems', `that work and ${weights}`)],
  ['عرض متغير', 'خط متغير يتسع طبيعيًا، وهذا اتساع لاتيني وليس كشيدة', title('eh-wide', 'I build systems', 'that work and <b>grow</b>')],
  ['ضيق وعصري', 'Grotesque مكثف وكبير، قوي بلا زخرفة', title('eh-tight', 'I build systems', 'that work and grow')],
  ['كلمة بخط اليد', 'لمسة شخصية مكتوبة باليد في نهاية الجملة', title('eh-hand', 'I build systems', 'that work and <span class="script">grow</span>')],
  ['سطر كود', 'هوية مبرمج صريحة، جملة تُقرأ وتبدو كسطر برمجي', title('eh-code', '<span class="fade">const</span> <b>systems</b> <span class="fade">=</span> <b>build</b><span class="fade">()</span>', '<span class="fade">.</span><b>that</b><span class="fade">(</span>work<span class="fade">).</span><b>and</b><span class="fade">(</span>grow<span class="fade">);</span>')],
  ['كلمة تتبدل بهدوء', 'الجملة ثابتة وآخرها يتغير كل 3 ثوانٍ', title('eh-swap', 'I build systems', 'that <span class="swap" data-swap><i class="is-on">work</i><i>grow</i><i>last</i></span>')]
];

document.getElementById('options').innerHTML = options.map(([name, note, html], index) => `
  <article class="ph-option">
    <div class="ph-label" dir="rtl"><b>${index + 1}. ${name}</b><span>${note}</span></div>
    <button class="ph-replay" type="button">إعادة ↺</button>
    <div class="ph-panes"><div class="ph-pane" dir="ltr">${html}</div></div>
  </article>`).join('');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function play(option) {
  if (reducedMotion) return;
  option.classList.remove('is-playing');
  void option.offsetWidth;
  option.classList.add('is-playing');
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    play(entry.target);
    observer.unobserve(entry.target);
  });
}, { threshold: .5 });

document.querySelectorAll('.ph-option').forEach((option) => {
  option.querySelector('.ph-replay').addEventListener('click', () => play(option));
  observer.observe(option);
});

if (!reducedMotion) {
  setInterval(() => {
    document.querySelectorAll('[data-swap]').forEach((swap) => {
      const words = [...swap.children];
      const current = words.findIndex(word => word.classList.contains('is-on'));
      words[current].classList.remove('is-on');
      words[(current + 1) % words.length].classList.add('is-on');
    });
  }, 3000);
}

document.getElementById('eh-theme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.dataset.theme === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'dark';
});
