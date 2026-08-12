(function(){
  const header=document.querySelector('.site-header');
  const onScroll=()=>header && header.classList.toggle('scrolled',window.scrollY>12);
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});

  const menuBtn=document.querySelector('.menu-toggle');
  const mobile=document.querySelector('.mobile-panel');
  if(menuBtn&&mobile){menuBtn.addEventListener('click',()=>{mobile.classList.toggle('open');menuBtn.setAttribute('aria-expanded',mobile.classList.contains('open'));});}

  const page=document.body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===page)a.classList.add('active');});

  document.querySelectorAll('.faq-question').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.faq-item').classList.toggle('open')));

  const revealObs=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>revealObs.observe(el));

  const tabs=document.querySelectorAll('.finder-tab');
  const items=document.querySelectorAll('.treatment-item');
  tabs.forEach(tab=>tab.addEventListener('click',()=>{
    tabs.forEach(t=>t.classList.remove('active'));tab.classList.add('active');
    const cat=tab.dataset.cat;
    items.forEach(item=>item.style.display=(cat==='all'||item.dataset.cat===cat)?'block':'none');
  }));

  const reviews=[...document.querySelectorAll('.testimonial')];let idx=0;
  function showReview(n){if(!reviews.length)return;reviews.forEach(r=>r.classList.remove('active'));idx=(n+reviews.length)%reviews.length;reviews[idx].classList.add('active');}
  document.querySelector('[data-prev]')?.addEventListener('click',()=>showReview(idx-1));
  document.querySelector('[data-next]')?.addEventListener('click',()=>showReview(idx+1));
  if(reviews.length>1)setInterval(()=>showReview(idx+1),6500);

  const toast=document.querySelector('.toast');
  function showToast(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3500)}
  document.querySelectorAll('[data-appointment-form]').forEach(form=>form.addEventListener('submit',function(e){
    e.preventDefault();
    const fd=new FormData(form);const name=fd.get('name')||'';const phone=fd.get('phone')||'';const service=fd.get('service')||'General Consultation';const location=fd.get('location')||'Lajpat Nagar';const date=fd.get('date')||'Flexible';const message=fd.get('message')||'';
    const text=`Hello Adorable Clinic, I would like to request an appointment.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0APreferred clinic: ${encodeURIComponent(location)}%0APreferred date: ${encodeURIComponent(date)}%0AConcern: ${encodeURIComponent(message)}`;
    showToast('Opening WhatsApp to send your appointment request…');
    setTimeout(()=>window.open(`https://wa.me/919711150928?text=${text}`,'_blank','noopener'),500);
  }));
})();
