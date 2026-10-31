(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const closeMenu = () => {document.body.classList.remove('nav-open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Mở menu');};
  menuButton?.addEventListener('click',() => {
    const open = !document.body.classList.contains('nav-open');
    document.body.classList.toggle('nav-open',open);
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',open?'Đóng menu':'Mở menu');
  });
  document.querySelectorAll('.mobile-nav a').forEach(link=>link.addEventListener('click',closeMenu));
  window.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  window.addEventListener('resize',()=>{if(window.innerWidth>820)closeMenu();});
  window.ELARION_initReveal = function(root = document) {
    if(!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets=[...root.querySelectorAll('.tribe-card, .team-card, .mechanic-grid article, .box-item, .tease-copy, .story-heading, .story-copy')];
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
    }),{rootMargin:'0px 0px -20px 0px',threshold:.08});
    targets.forEach(t=>{t.classList.add('reveal');observer.observe(t);});
  };
  window.ELARION_initReveal();
})();
