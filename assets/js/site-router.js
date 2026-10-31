/**
 * ELARION: navigation without visible page-name paths or .html filenames.
 * All views are bundled in index.html as inert templates to keep offline
 * (file://) and static hosting previews consistent. No framework required.
 */
(() => {
  'use strict';
  const views = ['home', 'character', 'product', 'about'];
  const titles = {
    home: 'Home', character: 'Character', product: 'Product', about: 'About Us'
  };
  const main = document.querySelector('#main-content');
  if (!main) return;
  document.body.classList.add('spa-mode');
  const homeMarkup = main.innerHTML;
  const baseURL = new URL('./', document.baseURI);
  // Opening /index.html explicitly on a web server should show just /.
  if (/^https?:$/.test(location.protocol) && location.pathname.endsWith('/index.html')) {
    try { history.replaceState(history.state, '', baseURL.pathname + location.search); } catch (_) {}
  }

  const pathToPage = (url) => {
    if (url.origin !== baseURL.origin) return null;
    const root = baseURL.pathname;
    const path = url.pathname;
    if (path === root || path === root + 'index.html') return 'home';
    for (const page of views.slice(1)) {
      if (path === root + page + '/' || path === root + page + '/index.html' || path === root + page) return page;
    }
    return null;
  };

  function setActiveNavigation(page) {
    document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav .nav-link').forEach(link => {
      const href = new URL(link.getAttribute('href'), baseURL);
      const active = pathToPage(href) === page;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  function display(page, {character = null, profile = false, fromHistory = false} = {}) {
    if (!views.includes(page)) page = 'home';
    if (page === 'home') main.innerHTML = homeMarkup;
    else main.innerHTML = document.querySelector('#view-' + page)?.innerHTML || homeMarkup;
    document.body.classList.remove(...views.map(v => 'page-' + v));
    document.body.classList.add('page-' + page);
    document.title = titles[page] + ' | ELARION: War of Six Elements';
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      page === 'home' ? 'Khám phá thế giới sáu tộc hệ trong ELARION: War of Six Elements.' :
      page === 'character' ? 'Khám phá các nhân vật và sáu tộc hệ của ELARION.' :
      page === 'product' ? 'Khám phá board game chiến thuật ELARION: War of Six Elements.' :
      'Tìm hiểu về đội ngũ sáng tạo dự án ELARION.');
    setActiveNavigation(page);
    document.body.classList.remove('nav-open');
    document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
    if (page === 'character') window.ELARION_initCharacters?.(character);
    window.ELARION_initReveal?.(main);
    if (profile && page === 'character') {
      requestAnimationFrame(() => document.querySelector('#profile')?.scrollIntoView({block:'start'}));
    } else {
      window.scrollTo({top: 0, behavior: 'instant'});
    }
    if (!fromHistory) {
      // Same visible URL for every view; browser Back still switches pages.
      try { history.pushState({elarionPage:page, character, profile}, '', location.pathname); } catch (_) {}
    }
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank' || link.hasAttribute('download')) return;
    const raw = link.getAttribute('href');
    if (raw.startsWith('#')) {
      const target = document.getElementById(raw.slice(1));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({block:'start',behavior:'smooth'});
      return;
    }
    let url;
    try { url = new URL(raw, baseURL); } catch (_) { return; }
    const page = pathToPage(url);
    if (!page) return;
    event.preventDefault();
    const character = url.searchParams.get('character');
    display(page, {character, profile:page === 'character' && url.hash === '#profile'});
  });

  window.addEventListener('popstate', event => {
    const state = event.state;
    display(state?.elarionPage || 'home', {
      character:state?.character || null,
      profile: Boolean(state?.profile), fromHistory:true
    });
  });

  // A browser reload can preserve the selected view through history.state.
  const state = history.state;
  if (state?.elarionPage && state.elarionPage !== 'home') {
    display(state.elarionPage, {
      character:state.character || null,
      profile:Boolean(state.profile),fromHistory:true
    });
  } else {
    setActiveNavigation('home');
  }
})();
