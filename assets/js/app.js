
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

// Form handling (mailto fallback; can be switched to Formspree/EmailJS)
const form = document.getElementById('leadForm');
if(form){
  form.addEventListener('submit', async (ev)=>{
    ev.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get('name')||'').trim();
    const phone = (fd.get('phone')||'').trim();
    const email = (fd.get('email')||'').trim();
    const topic = fd.get('topic') || '';
    const message = (fd.get('message')||'').trim();
    const consent = document.getElementById('consent')?.checked;

    if(!name || !phone || !email || !consent){
      showToast('נא למלא שם, טלפון ואימייל ולאשר יצירת קשר', false);
      return;
    }

    // === Mailto fallback ===
    const subject = encodeURIComponent('פניה מאתר – סיטרין אחזקות');
    const body = encodeURIComponent(`שם: ${name}\nטלפון: ${phone}\nאימייל: ${email}\nנושא: ${topic}\n\nהודעה:\n${message}`);
    window.location.href = `mailto:info@citrine-holdings.co.il?subject=${subject}&body=${body}`;
    showToast('נשלח ללקוח הדוא"ל – תודה!');
    form.reset();

    // === To use Formspree instead, replace the block above with: ===
    // await fetch('https://formspree.io/f/YOUR_FORM_ID', { method:'POST', body: new FormData(form), headers:{Accept:'application/json'} });
    // showToast('הטופס נשלח בהצלחה!');
    // form.reset();

    // === Or EmailJS (include their script in index.html head): ===
    // emailjs.init('PUBLIC_KEY');
    // await emailjs.send('SERVICE_ID','TEMPLATE_ID',{ name, phone, email, topic, message });
    // showToast('הטופס נשלח בהצלחה!');
    // form.reset();
  });
}
