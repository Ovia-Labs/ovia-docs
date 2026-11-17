/* Ovia Labs Docs — client behaviour: theme, drawer, search, TOC, copy links, roadmap filters. */
import './docs.css';

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
const store={get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}}};

/* ---------- theme (same storage key and cycle as ovialabs.xyz) ---------- */
const themeBtn=$('.themeBtn');
function applyTheme(){
 const t=store.get('ovia-theme')||'system';
 const dark=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme:dark)').matches);
 document.documentElement.dataset.theme=dark?'dark':'light';
 themeBtn.dataset.mode=t;themeBtn.setAttribute('aria-label','Change appearance (currently '+t+')');
}
themeBtn.addEventListener('click',()=>{const t=store.get('ovia-theme')||'system';store.set('ovia-theme',t==='system'?'light':t==='light'?'dark':'system');applyTheme()});
matchMedia('(prefers-color-scheme:dark)').addEventListener?.('change',applyTheme);
applyTheme();

/* ---------- mobile drawer ---------- */
const navToggle=$('.navToggle'),sidebar=$('#sidebar'),scrim=$('.scrim');
function setDrawer(open){
 document.body.classList.toggle('drawerOpen',open);navToggle.setAttribute('aria-expanded',String(open));scrim.hidden=!open;
 navToggle.setAttribute('aria-label',open?'Close documentation menu':'Open documentation menu');
 if(open)(sidebar.querySelector('[aria-current="page"]')||sidebar.querySelector('a'))?.focus();
}
navToggle.addEventListener('click',()=>setDrawer(!document.body.classList.contains('drawerOpen')));
scrim.addEventListener('click',()=>setDrawer(false));
sidebar.addEventListener('click',e=>{if(e.target.closest('a'))setDrawer(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('drawerOpen')){setDrawer(false);navToggle.focus()}});
$('[aria-current="page"]',sidebar)?.scrollIntoView({block:'center'});

/* ---------- copy link to section, copy code ---------- */
function toast(msg){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';t.setAttribute('role','status');document.body.appendChild(t)}t.textContent=msg;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),1600)}
async function copy(text){try{await navigator.clipboard.writeText(text);return true}catch{return false}}
document.addEventListener('click',async e=>{
 const a=e.target.closest('[data-copy-link]');
 if(a){e.preventDefault();const url=location.origin+location.pathname+a.getAttribute('href');history.replaceState(null,'',a.getAttribute('href'));document.getElementById(a.getAttribute('href').slice(1))?.scrollIntoView({behavior:reduced()?'auto':'smooth'});toast((await copy(url))?'Link to section copied':'Link: '+url);return}
 const b=e.target.closest('.copyCode');
 if(b){const ok=await copy(b.closest('.codeBlock').querySelector('code').innerText);b.textContent=ok?'Copied':'Copy failed';setTimeout(()=>b.textContent='Copy',1500)}
});

/* ---------- reading progress ---------- */
const bar=$('.progress i');
function progress(){const h=document.documentElement;const max=h.scrollHeight-h.clientHeight;bar.style.transform=`scaleX(${max>0?Math.min(1,h.scrollTop/max):0})`}
addEventListener('scroll',progress,{passive:true});progress();

/* ---------- table of contents: highlight the section in view ---------- */
const tocLinks=$$('.toc a');
if(tocLinks.length&&'IntersectionObserver'in window){
 const targets=tocLinks.map(a=>document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);
 const visible=new Map();
 const io=new IntersectionObserver(es=>{
  es.forEach(e=>visible.set(e.target.id,e.isIntersecting));
  const first=targets.find(t=>visible.get(t.id))||targets.filter(t=>t.getBoundingClientRect().top<120).pop();
  tocLinks.forEach(a=>a.classList.toggle('on',first&&a.hash==='#'+first.id));
 },{rootMargin:'-80px 0px -65% 0px'});
 targets.forEach(t=>io.observe(t));
}
/* sidebar entries that point at a section of the current page */
const subLinks=$$('.sidebar a.sub').filter(a=>a.pathname===location.pathname);
function markSub(){const id=location.hash.slice(1);subLinks.forEach(a=>a.toggleAttribute('aria-current',a.hash==='#'+id))}
if(subLinks.length){addEventListener('hashchange',markSub);markSub()}

/* ---------- search ---------- */
const dialog=$('.searchDialog'),input=$('input',dialog),list=$('#searchResults'),hint=$('.searchHint',dialog);
let index=null,results=[],active=-1,lastFocus=null;
async function loadIndex(){if(index)return index;try{index=await (await fetch('/search-index.json')).json()}catch{index=[]}return index}
function openSearch(){lastFocus=document.activeElement;dialog.hidden=false;document.body.classList.add('searching');input.value='';render([]);hint.textContent='Type at least two characters. Use ↑ ↓ to move and Enter to open.';input.focus();loadIndex()}
function closeSearch(){dialog.hidden=true;document.body.classList.remove('searching');lastFocus?.focus?.()}
$('.searchTrigger').addEventListener('click',openSearch);
$('.closeSearch').addEventListener('click',closeSearch);
dialog.addEventListener('click',e=>{if(e.target===dialog)closeSearch()});
document.addEventListener('keydown',e=>{
 const typing=/input|textarea|select/i.test(document.activeElement?.tagName||'');
 if((e.key==='k'&&(e.ctrlKey||e.metaKey))||(e.key==='/'&&!typing&&dialog.hidden)){e.preventDefault();dialog.hidden?openSearch():closeSearch()}
 else if(e.key==='Escape'&&!dialog.hidden){e.preventDefault();closeSearch()}
});
const norm=s=>s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'');
function search(q){
 const terms=norm(q).split(/[^a-z0-9-]+/).filter(t=>t.length>1);
 if(!terms.length)return[];
 const out=[];
 for(const e of index){
  const P=norm(e.p),H=norm(e.h),X=norm(e.x);let score=0,ok=true;
  for(const t of terms){
   const s=(P.includes(t)?6:0)+(H.includes(t)?4:0)+(X.includes(t)?1+Math.min(2,X.split(t).length-2):0);
   if(!s){ok=false;break}score+=s;
  }
  if(ok){if(H&&terms.every(t=>H.includes(t)))score+=5;out.push({e,score})}
 }
 return out.sort((a,b)=>b.score-a.score).slice(0,12).map(r=>r.e);
}
const escH=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function snippet(text,terms){
 const T=norm(text);let at=-1;for(const t of terms){at=T.indexOf(t);if(at>=0)break}
 const start=Math.max(0,at-60);let s=(start?'…':'')+text.slice(start,start+170)+(text.length>start+170?'…':'');
 s=escH(s);for(const t of terms)s=s.replace(new RegExp('('+t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig'),'<mark>$1</mark>');
 return s;
}
function render(list_){
 results=list_;active=list_.length?0:-1;
 const terms=norm(input.value).split(/[^a-z0-9-]+/).filter(t=>t.length>1);
 list.innerHTML=list_.map((r,i)=>`<li role="option" id="sr${i}" aria-selected="${i===active}"><a href="${r.u}"><span class="srPath">${escH(r.g?r.g+' › ':'')}${escH(r.p)}</span><b>${escH(r.h||r.p)}</b><span class="srText">${snippet(r.x,terms)}</span></a></li>`).join('');
 input.setAttribute('aria-activedescendant',active>=0?'sr'+active:'');
}
function move(d){if(!results.length)return;active=(active+d+results.length)%results.length;$$('li',list).forEach((li,i)=>li.setAttribute('aria-selected',String(i===active)));input.setAttribute('aria-activedescendant','sr'+active);$('#sr'+active)?.scrollIntoView({block:'nearest'})}
input.addEventListener('input',async()=>{
 await loadIndex();const q=input.value.trim();
 if(q.length<2){render([]);hint.textContent='Type at least two characters. Use ↑ ↓ to move and Enter to open.';return}
 const r=search(q);render(r);
 hint.textContent=r.length?`${r.length} result${r.length===1?'':'s'}. Use ↑ ↓ to move and Enter to open.`:`No results for “${q}”. Try a broader term, like “approval”, “roadmap” or “token”.`;
});
input.addEventListener('keydown',e=>{
 if(e.key==='ArrowDown'){e.preventDefault();move(1)}
 else if(e.key==='ArrowUp'){e.preventDefault();move(-1)}
 else if(e.key==='Enter'&&active>=0){e.preventDefault();location.href=results[active].u;closeSearch()}
 else if(e.key==='Tab'){e.preventDefault();$('.closeSearch').focus()}
});
$('.closeSearch').addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();input.focus()}});

/* ---------- roadmap filters ---------- */
const rm=$('[data-roadmap]');
if(rm){
 const btns=$$('.chipBtn',rm),ms=$$('.ms',rm),phases=$$('.phase',rm),empty=$('.rmEmpty',rm);
 btns.forEach(b=>b.addEventListener('click',()=>{
  const f=b.dataset.filter;btns.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
  let shown=0;
  ms.forEach(m=>{const on=f==='all'||m.dataset.status===f;m.hidden=!on;if(on)shown++});
  phases.forEach(p=>{p.classList.toggle('dim',f!=='all'&&!$$('.ms',p).some(m=>!m.hidden))});
  empty.hidden=shown>0;
 }));
}
