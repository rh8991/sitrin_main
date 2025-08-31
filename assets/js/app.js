// Toast helper
const toast = document.getElementById('toast');
function showToast(msg, good = true){
  if(!toast) return;
  toast.textContent = msg;
  toast.style.background = good ? 'var(--ok)' : 'var(--bad)';
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 3200);
}

// Scroll reveal
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); revealObserver.unobserve(e.target); }
  });
},{threshold:.16});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

// Smooth anchor scroll (data-scroll or href^="#")
document.querySelectorAll('[data-scroll], a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const sel = a.dataset.scroll || a.getAttribute('href');
    if(!sel || sel === '#') return;
    const el = document.querySelector(sel);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
  });
});

// Form handling (mailto fallback)
const form = document.getElementById('leadForm');
if(form){
  form.addEventListener('submit', async (ev)=>{
    ev.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get('name')||'').trim();
    const phone = (fd.get('phone')||'').trim();
    const email = (fd.get('email')||'').trim();
    const topic = (fd.get('topic')||'').trim();
    const message = (fd.get('message')||'').trim();
    const consent = document.getElementById('consent')?.checked;

    if(!name || !phone || !email || !consent){
      showToast('נא למלא שם, טלפון ואימייל ולאשר יצירת קשר', false);
      return;
    }
    const subject = encodeURIComponent('פניה מאתר – סיטרין אחזקות');
    const body = encodeURIComponent(`שם: ${name}\nטלפון: ${phone}\nאימייל: ${email}\nנושא: ${topic}\n\nהודעה:\n${message}`);
    window.location.href = `mailto:info@citrine-holdings.co.il?subject=${subject}&body=${body}`;
    showToast('נשלח ללקוח הדוא"ל – תודה!');
    form.reset();
  });
}

/* ===== JSON-driven content loader (NO THEME SYNC) ===== */
window.loadContent = async function loadContent(){
  try {
    const res = await fetch('data/content.he.json?_=' + Date.now());
    if(!res.ok) throw new Error('HTTP ' + res.status);
    const c = await res.json();

    const byPath = (obj, path) => path.split('.').reduce((o,k)=>o?.[k], obj);

    // Fill simple texts
    document.querySelectorAll('[data-t]').forEach(el=>{
      const val = byPath(c, el.dataset.t);
      if (typeof val === 'string') el.textContent = val;
    });

    // Hero bullets
    if (Array.isArray(c.hero?.bullets)) {
      const cont = document.querySelector('.bullets');
      if (cont) cont.innerHTML = c.hero.bullets.map(b=>`<div class="bullet">✔ ${b}</div>`).join('');
    }

    // Domains cards
    if (Array.isArray(c.domains)) {
      const cont = document.querySelector('[data-dynamic="domains"]');
      if (cont) cont.innerHTML = c.domains.map(item => `
        <div class="card">
          <div class="chip">${item.chip||''}</div>
          <h3>${item.title||''}</h3>
          <p>${item.text||''}</p>
        </div>`).join('');
    }

    function renderWhyFeatures(data) {
      const container = document.querySelector('[data-dynamic="why_features"]');
      if (!container || !data.why_features) return;
      container.innerHTML = data.why_features.map(f => `
        <div class="feature">
          <div class="icon">${f.icon}</div>
          <div>
            <h3>${f.title}</h3>
            <p>${f.text}</p>
          </div>
        </div>
      `).join('');
      // Set section title
      const whyTitle = document.querySelector('[data-t="why_title"]');
      if (whyTitle && data.why_title) whyTitle.textContent = data.why_title;
    }

    renderWhyFeatures(c);

  } catch (e) {
    console.warn('Failed to load content.he.json:', e);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navBar = document.getElementById('mainNav');
  if (!navToggle || !navBar) return;
  navToggle.addEventListener('click', function() {
    const open = navBar.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});
