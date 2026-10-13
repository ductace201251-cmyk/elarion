(() => {
  const characters = window.ELARION_CHARACTERS || [];
  const shell=document.getElementById('profile');
  const buttons=[...document.querySelectorAll('[data-character]')];
  if(!shell || characters.length===0) return;
  const text = (v) => String(v??'');
  const escapeHtml = s => text(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const slugMap=new Map(characters.map(c=>[c.slug,c]));
  let active='';
  let activeTab='overview';
  const tabs = [ ['overview','Tổng quan'],['ability','Năng lực'],['story','Cốt truyện'] ];
  function field(label,val){return `<div class="profile-field"><small>${escapeHtml(label)}</small><strong>${escapeHtml(val)}</strong></div>`;}
  function renderTabPanel(c){
    if(activeTab==='ability')return `<p>${escapeHtml(c.ability)}</p>`;
    if(activeTab==='story')return `<p>${escapeHtml(c.story)}</p>`;
    return `<p><strong style="color:#e7c47d">Tính cách.</strong> ${escapeHtml(c.personality)}</p><p><strong style="color:#e7c47d">Sở thích.</strong> ${escapeHtml(c.interests)}</p>`;
  }
  function selectCharacter(slug,{scroll=false,updateURL=true}={}){
    const c=slugMap.get(slug)||characters[0];
    active=c.slug;activeTab='overview';
    buttons.forEach(btn=>{const chosen=btn.dataset.character===active;btn.classList.toggle('is-selected',chosen);btn.setAttribute('aria-pressed',String(chosen));});
    const i=characters.findIndex(x=>x.slug===active);
    shell.style.setProperty('--profile-accent',c.accent);
    shell.innerHTML=`<div class="profile-topline"><span>CHARACTER FILE / ${escapeHtml(c.faction.toUpperCase())}</span><span class="profile-count">0${i+1} / 06</span></div>
    <div class="profile-main"><div class="profile-visual"><img src="assets/images/${c.slug}-full.webp" alt="Minh họa nhân vật ${escapeHtml(c.name)}" width="720" height="1050"><span class="profile-visual-label">0${i+1}</span></div>
    <div class="profile-content"><span class="kicker">${escapeHtml(c.faction)} / ${escapeHtml(c.element)}</span><h2 class="profile-name">${escapeHtml(c.name)}</h2><p class="profile-role">${escapeHtml(c.role)}</p>
    <div class="profile-data-grid">${field('TUỔI',c.age)}${field('CHIỀU CAO',c.height)}${field('GIỚI TÍNH',c.gender)}${field('PHONG CÁCH',c.style)}</div>
    <div class="profile-tabs" role="tablist" aria-label="Thông tin nhân vật">${tabs.map(([id,label])=>`<button class="profile-tab" role="tab" type="button" id="tab-${id}" data-tab="${id}" aria-controls="character-tabpanel" aria-selected="${activeTab===id}" tabindex="${activeTab===id?'0':'-1'}">${label}</button>`).join('')}</div>
    <div class="profile-tabpanel" id="character-tabpanel" role="tabpanel" aria-labelledby="tab-${activeTab}" tabindex="0">${renderTabPanel(c)}</div>
    <div class="profile-mini-action"><span>ELARION / WAR OF SIX ELEMENTS</span><button type="button" id="next-character">Nhân vật tiếp theo →</button></div></div></div>`;
    const panel=shell.querySelector('.profile-tabpanel');
    shell.querySelectorAll('[data-tab]').forEach(tab=>tab.addEventListener('click',()=>{
      activeTab=tab.dataset.tab;
      shell.querySelectorAll('[data-tab]').forEach(t=>{const on=t.dataset.tab===activeTab;t.setAttribute('aria-selected',String(on));t.setAttribute('tabindex',on?'0':'-1');});
      panel.setAttribute('aria-labelledby','tab-'+activeTab);panel.innerHTML=renderTabPanel(c);
    }));
    shell.querySelector('.profile-tabs')?.addEventListener('keydown',e=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
      e.preventDefault();const idx=tabs.findIndex(a=>a[0]===activeTab);const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(idx+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
      shell.querySelector(`[data-tab="${tabs[next][0]}"]`)?.click();shell.querySelector(`[data-tab="${tabs[next][0]}"]`)?.focus();
    });
    shell.querySelector('#next-character')?.addEventListener('click',()=>selectCharacter(characters[(i+1)%characters.length].slug,{scroll:true}));
    if(updateURL){const url=new URL(window.location.href);url.searchParams.set('character',c.slug);url.hash='profile';try { history.replaceState(null,'',url); } catch (error) { /* Local file previews may restrict history updates. */ }}
    if(scroll){shell.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
  }
  buttons.forEach(btn=>btn.addEventListener('click',()=>selectCharacter(btn.dataset.character,{scroll:true})));
  const initial=new URLSearchParams(location.search).get('character');
  selectCharacter(initial||'noctis',{scroll:false,updateURL:!!initial});
  if(location.hash==='#profile'&&initial){requestAnimationFrame(()=>shell.scrollIntoView({block:'start'}));}
})();
