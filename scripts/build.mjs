/* Ovia Labs Docs — static site generator.
   Markdown in content/ → static HTML in dist/ (one file per page, clean URLs).
   Client assets (client/) are bundled with Vite. Brand assets come from public/. Run: npm run build */
import {build as viteBuild} from 'vite';
import {Marked} from 'marked';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const CLIENT=path.join(ROOT,'client');
const CONTENT=path.join(ROOT,'content');
const OUT=path.join(ROOT,'dist');
const SITE='https://docs.ovialabs.xyz';
const MAIN='https://ovialabs.xyz';

const readJSON=f=>JSON.parse(fs.readFileSync(path.join(CONTENT,f),'utf8'));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slugify=s=>s.toLowerCase().replace(/<[^>]+>/g,'').replace(/&[a-z]+;/g,'').replace(/[`'’"]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const urlOf=slug=>slug?'/'+slug:'/';

export const STATUS={
 completed:'Completed','in-progress':'In Progress',planned:'Planned',research:'Research',conditional:'Conditional',
 dev:'In Development',prd:'PRD Phase',proposed:'Proposed',future:'Future Concept','not-specified':'Not Yet Specified',draft:'Draft',live:'Live',beta:'Public Beta'
};
const badge=(k,extra='')=>STATUS[k]?`<span class="status s-${k}${extra}"><i aria-hidden="true"></i>${STATUS[k]}</span>`:'';

/* ---------- front matter ---------- */
function parse(file){
 const raw=fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n');
 const m=raw.match(/^---\n([\s\S]*?)\n---\n?/);
 const fm={};
 if(m)for(const line of m[1].split('\n')){
  const i=line.indexOf(':');if(i<0)continue;
  const k=line.slice(0,i).trim();let v=line.slice(i+1).trim();
  if(v.startsWith('[')&&v.endsWith(']'))v=v.slice(1,-1).split(',').map(x=>x.trim()).filter(Boolean);
  else v=v.replace(/^["']|["']$/g,'');
  fm[k]=v;
 }
 return{fm,body:m?raw.slice(m[0].length):raw};
}

/* ---------- markdown → html with docs extensions ---------- */
function renderMarkdown(md,ctx){
 const headings=[];const used=new Set();
 const renderer={};
 renderer.heading=function({tokens,depth}){
  const html=this.parser.parseInline(tokens);
  const bare=html.replace(/<span class="status [^"]*"><i aria-hidden="true"><\/i>[^<]*<\/span>/g,'').trim();
  let id=slugify(bare)||'section';let n=2;while(used.has(id))id=slugify(bare)+'-'+n++;used.add(id);
  if(depth===2||depth===3)headings.push({depth,id,text:bare.replace(/<[^>]+>/g,'')});
  if(depth===1)return `<h1>${html}</h1>`;
  return `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-label="Copy link to this section" data-copy-link>#</a>${html}</h${depth}>\n`;
 };
 renderer.table=function(token){
  const cell=(c,h)=>{const t=h?'th':'td';const a=c.align?` style="text-align:${c.align}"`:'';return `<${t}${h?' scope="col"':''}${a}>${this.parser.parseInline(c.tokens)}</${t}>`};
  const head='<tr>'+token.header.map(c=>cell(c,true)).join('')+'</tr>';
  const rows=token.rows.map(r=>'<tr>'+r.map(c=>cell(c,false)).join('')+'</tr>').join('');
  return `<div class="tableWrap" tabindex="0" role="region" aria-label="Table"><table><thead>${head}</thead><tbody>${rows}</tbody></table></div>\n`;
 };
 renderer.code=function({text,lang}){
  return `<div class="codeBlock"><div class="codeHead"><span>${esc(lang||'text')}</span><button type="button" class="copyCode">Copy</button></div><pre><code>${esc(text)}</code></pre></div>\n`;
 };
 renderer.link=function({href,title,tokens}){
  const text=this.parser.parseInline(tokens);
  const ext=/^https?:\/\//.test(href)&&!href.startsWith(SITE);
  return `<a href="${esc(href)}"${title?` title="${esc(title)}"`:''}${ext?' target="_blank" rel="noopener noreferrer" class="ext"':''}>${text}${ext?'<span class="srOnly"> (opens in a new tab)</span>':''}</a>`;
 };
 // Callouts: > [!NOTE] Optional title
 renderer.blockquote=function({tokens}){
  let html=this.parser.parse(tokens);
  const m=html.match(/^<p>\[!(NOTE|STATUS|WARNING|LIMITATION|PROPOSAL|OPEN)\]\s*([^\n<]*)(?:\n|<br>)?/);
  if(!m)return `<blockquote>${html}</blockquote>\n`;
  const kind=m[1].toLowerCase();const labels={note:'Note',status:'Status',warning:'Important',limitation:'Limitation',proposal:'Proposal',open:'Open question'};
  const title=m[2].trim()||labels[kind];
  html=html.slice(m[0].length);if(html.startsWith('</p>'))html=html.slice(4);else html='<p>'+html;
  return `<aside class="callout c-${kind}" role="note"><p class="calloutTitle">${title}</p>${html}</aside>\n`;
 };
 const md2=new Marked({gfm:true,renderer});
 let src=md.replace(/\{\{status:([a-z-]+)\}\}/g,(_,k)=>badge(k));
 for(const[k,fn]of Object.entries(ctx.blocks||{}))src=src.replaceAll(`{{${k}}}`,()=>fn());
 const html=md2.parse(src);
 return{html,headings};
}

/* ---------- data-driven blocks ---------- */
function roadmapBlock(rm){
 const legend=rm.legend.map(k=>`<li>${badge(k)}<span>${esc(rm.legendText[k])}</span></li>`).join('');
 const filters=['all',...rm.legend].map(k=>`<button type="button" class="chipBtn" data-filter="${k}" aria-pressed="${k==='all'}">${k==='all'?'All':STATUS[k]}</button>`).join('');
 const phases=rm.phases.map(p=>{
  const items=p.milestones.map(m=>`<li class="ms" data-status="${m.status}">${badge(m.status)}<div><b>${esc(m.title)}</b>${m.detail?`<p>${esc(m.detail)}</p>`:''}${m.evidence?`<p class="evidence"><span>Evidence:</span> ${esc(m.evidence)}</p>`:''}${m.dependsOn?`<p class="deps"><span>Depends on:</span> ${esc(m.dependsOn)}</p>`:''}</div></li>`).join('');
  return `<li class="phase" id="${p.id}" data-status="${p.status}"><div class="phaseHead"><span class="phaseNum">${esc(p.number)}</span><div><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p></div>${badge(p.status)}</div>${p.gate?`<p class="gate"><span>Exit criteria:</span> ${esc(p.gate)}</p>`:''}<ul class="msList">${items}</ul></li>`;
 }).join('');
 return `<div class="roadmap" data-roadmap><p class="rmNote">${esc(rm.note)} <span class="rmDate">Status reviewed ${esc(rm.reviewed)}.</span></p><div class="rmLegend"><ul aria-label="Status legend">${legend}</ul></div><div class="rmFilters" role="group" aria-label="Filter milestones by status">${filters}</div><ol class="phases">${phases}</ol><p class="rmEmpty" hidden>No milestones match this filter.</p></div>`;
}
function statusTableBlock(meta){
 return `<div class="tableWrap" tabindex="0" role="region" aria-label="Component status"><table><thead><tr><th scope="col">Component</th><th scope="col">Status</th><th scope="col">What exists today</th></tr></thead><tbody>${meta.components.map(c=>`<tr><td><b>${esc(c.name)}</b></td><td>${badge(c.status)}</td><td>${esc(c.today)}</td></tr>`).join('')}</tbody></table></div>`;
}
function revisionsBlock(meta){
 return `<div class="tableWrap" tabindex="0" role="region" aria-label="Revision history"><table><thead><tr><th scope="col">Version</th><th scope="col">Date</th><th scope="col">Status</th><th scope="col">Changes</th></tr></thead><tbody>${meta.revisions.map(r=>`<tr><td><b>${esc(r.version)}</b></td><td>${esc(r.date)}</td><td>${esc(r.status)}</td><td>${esc(r.changes)}</td></tr>`).join('')}</tbody></table></div>`;
}
function wpMetaBlock(meta){
 const w=meta.whitepaper;
 return `<dl class="docMeta"><div><dt>Version</dt><dd>${esc(w.version)}</dd></div><div><dt>Status</dt><dd>${badge('draft')} ${esc(w.status)}</dd></div><div><dt>Publication</dt><dd>${esc(w.publication)}</dd></div><div><dt>Date</dt><dd>${esc(w.date)}</dd></div><div><dt>Last updated</dt><dd>${esc(w.updated)}</dd></div><div><dt>Author</dt><dd>Ovia Labs</dd></div></dl>`;
}
function wpContentsBlock(nav){
 const g=nav.find(x=>x.id==='whitepaper');
 return `<ol class="wpContents">${g.items.filter(i=>i.slug!=='whitepaper').map((i,n)=>`<li><a href="${urlOf(i.slug)}"><span>${String(n+1).padStart(2,'0')}</span>${esc(i.title)}</a></li>`).join('')}</ol>`;
}

/* ---------- layout ---------- */
function sidebar(nav,current){
 return nav.map(g=>`<div class="navGroup${g.items.some(i=>i.slug===current)?' hasActive':''}"><p class="navTitle">${esc(g.title)}</p><ul>${g.items.map(i=>{
  const href=i.href||urlOf(i.slug);const active=!i.href&&i.slug===current;
  return `<li><a href="${href}"${active?' aria-current="page"':''}${i.href?' class="sub"':''}>${esc(i.title)}</a></li>`;
 }).join('')}</ul></div>`).join('');
}
function shell({page,nav,assets,meta,body,toc,crumbs,prevNext,isHome}){
 const title=page.slug==='404'?'Page not found | Ovia Labs Docs':(isHome?'Ovia Labs Docs | Whitepaper, Roadmap and Product Documentation':`${page.title} | Ovia Labs Docs`);
 const canonical=SITE+urlOf(page.slug==='404'?'':page.slug);
 const desc=page.description||meta.description;
 const ld={'@context':'https://schema.org','@type':isHome?'WebSite':'TechArticle',name:title,headline:page.title,description:desc,url:canonical,inLanguage:'en',publisher:{'@type':'Organization',name:'Ovia Labs',url:MAIN+'/',logo:SITE+'/ovia-logo.png'},...(isHome?{}:{dateModified:page.updated,isPartOf:{'@type':'WebSite',name:'Ovia Labs Docs',url:SITE+'/'}})};
 return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${page.slug==='404'?'<meta name="robots" content="noindex">':`<link rel="canonical" href="${canonical}">`}
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#f2f2f8">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0c0d14">
<meta property="og:type" content="${isHome?'website':'article'}">
<meta property="og:site_name" content="Ovia Labs Docs">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/og-docs.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Ovia Labs Docs. How Ovia Labs works.">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${SITE}/og-docs.png">
<meta name="twitter:image:alt" content="Ovia Labs Docs. How Ovia Labs works.">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/bricolage-grotesque-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${assets.css}">
<script>(function(){try{var t=localStorage.getItem('ovia-theme');var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.dataset.theme=d?'dark':'light'}catch(e){}})();</script>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script type="module" src="${assets.js}"></script>
</head>
<body class="${isHome?'isHome':''}">
<a class="skipLink" href="#content">Skip to content</a>
<div class="progress" aria-hidden="true"><i></i></div>
<header class="topbar">
 <button type="button" class="iconBtn navToggle" aria-label="Open documentation menu" aria-expanded="false" aria-controls="sidebar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
 <a class="brand" href="/" aria-label="Ovia Labs Docs home"><img src="/ovia-logo.png" alt="Ovia Labs" width="103" height="28"><span>Docs</span></a>
 <button type="button" class="searchTrigger" aria-haspopup="dialog" aria-label="Search the documentation"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><span>Search docs</span><kbd>Ctrl K</kbd></button>
 <nav class="topNav" aria-label="Primary">
  <a href="/whitepaper"${page.slug.startsWith('whitepaper')?' aria-current="true"':''}>Whitepaper</a>
  <a href="/roadmap"${page.slug==='roadmap'?' aria-current="true"':''}>Roadmap</a>
  <a href="${MAIN}" class="ext">ovialabs.xyz<span aria-hidden="true"> ↗</span></a>
  <a href="https://protect.ovialabs.xyz" class="launch">Launch Protect</a>
 </nav>
 <button type="button" class="iconBtn themeBtn" aria-label="Change appearance"><svg class="tSun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="tMoon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg><svg class="tSys" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg></button>
</header>
<div class="layout${isHome?' home':''}">
 <aside class="sidebar" id="sidebar" aria-label="Documentation">
  <nav aria-label="Documentation sections">${sidebar(nav,page.slug)}</nav>
  <a class="backMain" href="${MAIN}">← Back to ovialabs.xyz</a>
 </aside>
 <div class="scrim" hidden></div>
 <main id="content" class="main" tabindex="-1">
  ${crumbs}
  ${body}
  ${prevNext}
  <footer class="docFoot"><p>© 2026 Ovia Labs · Documentation v${esc(meta.docsVersion)} · Last updated ${esc(page.updated)}</p><p>Ovia Protect, Ovia Network and the OVIA Token are in development, research or proposal stages. Nothing in this documentation is financial, legal or investment advice. <a href="/resources/disclaimers">Disclaimers</a></p></footer>
 </main>
 ${toc}
</div>
<div class="searchDialog" role="dialog" aria-modal="true" aria-label="Search the documentation" hidden>
 <div class="searchBox">
  <div class="searchField"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input type="search" placeholder="Search the docs, e.g. unlimited approval" aria-label="Search query" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="searchResults" aria-autocomplete="list"><button type="button" class="closeSearch" aria-label="Close search">Esc</button></div>
  <ul id="searchResults" class="searchResults" role="listbox" aria-label="Search results"></ul>
  <p class="searchHint" aria-live="polite">Type at least two characters. Use ↑ ↓ to move and Enter to open.</p>
 </div>
</div>
</body>
</html>`;
}

/* ---------- build ---------- */
const plain=html=>html.replace(/<(script|style)[\s\S]*?<\/\1>/g,'').replace(/<a class="anchor"[^>]*>#<\/a>/g,'').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();

export async function buildDocs({quiet=false}={}){
 const t0=Date.now();
 fs.rmSync(OUT,{recursive:true,force:true});
 await viteBuild({configFile:false,root:CLIENT,base:'/',logLevel:quiet?'silent':'warn',publicDir:false,
  build:{outDir:OUT,emptyOutDir:false,manifest:true,assetsDir:'assets',rollupOptions:{input:path.join(CLIENT,'main.js')}}});
 const manifest=JSON.parse(fs.readFileSync(path.join(OUT,'.vite','manifest.json'),'utf8'));
 const entry=manifest['main.js'];
 const assets={js:'/'+entry.file,css:'/'+entry.css[0]};
 fs.rmSync(path.join(OUT,'.vite'),{recursive:true,force:true});

 const nav=readJSON('nav.json');const meta=readJSON('meta.json');const rm=readJSON('roadmap.json');
 const order=[];for(const g of nav)for(const i of g.items)if(!i.href&&!order.includes(i.slug))order.push(i.slug);
 const groupOf=slug=>nav.find(g=>g.items.some(i=>i.slug===slug&&!i.href));
 const blocks={roadmap:()=>roadmapBlock(rm),'status-table':()=>statusTableBlock(meta),revisions:()=>revisionsBlock(meta),'whitepaper-meta':()=>wpMetaBlock(meta),'whitepaper-contents':()=>wpContentsBlock(nav)};

 const pages=[];
 for(const slug of[...order,'404']){
  const file=path.join(CONTENT,(slug||'index')+'.md');
  if(!fs.existsSync(file))throw new Error('Missing content file for "'+slug+'": '+file);
  const{fm,body}=parse(file);
  const{html,headings}=renderMarkdown(body,{blocks});
  const text=plain(html);
  pages.push({slug,title:fm.title,description:fm.description,status:fm.status,updated:fm.updated||meta.updated,related:fm.related||[],html,headings,words:text.split(' ').length,text,lead:fm.lead});
 }
 const bySlug=Object.fromEntries(pages.map(p=>[p.slug,p]));
 for(const p of pages)for(const r of p.related)if(!bySlug[r])throw new Error(`Page "${p.slug}" lists unknown related page "${r}"`);
 // every sidebar link to a section must point at a real heading
 for(const g of nav)for(const i of g.items)if(i.href&&i.href.includes('#')){
  const[u,id]=i.href.split('#');const pg=bySlug[u.replace(/^\//,'')];
  if(!pg||!pg.headings.some(h=>h.id===id)&&!pg.html.includes(`id="${id}"`))throw new Error(`Sidebar link ${i.href} has no matching section`);
 }
 // internal links inside content must resolve to a page
 for(const p of pages)for(const m of p.html.matchAll(/href="(\/[^"#]*)(#[^"]*)?"/g)){
  const target=m[1]==='/'?'':m[1].slice(1);
  if(!bySlug[target]&&!/\.(png|xml|txt|json)$/.test(target))throw new Error(`Broken internal link ${m[0]} on page "${p.slug||'home'}"`);
  if(m[2]&&m[2].length>1){const id=decodeURIComponent(m[2].slice(1));const pg=bySlug[target];
   if(pg&&!pg.html.includes(`id="${id}"`))throw new Error(`Broken anchor ${m[0]} on page "${p.slug||'home'}"`);}
 }
 // same-page anchors
 for(const p of pages)for(const m of p.html.matchAll(/href="#([^"]+)"/g)){
  if(!p.html.includes(`id="${decodeURIComponent(m[1])}"`))throw new Error(`Broken same-page anchor #${m[1]} on page "${p.slug||'home'}"`);
 }

 const index=[];
 for(const p of pages){
  const isHome=p.slug==='';const is404=p.slug==='404';
  const g=groupOf(p.slug);const i=order.indexOf(p.slug);
  const prev=i>0?bySlug[order[i-1]]:null,next=i>=0&&i<order.length-1?bySlug[order[i+1]]:null;
  const crumbs=isHome||is404?'':`<nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Docs</a></li>${g&&g.title!==p.title?`<li><span>${esc(g.title)}</span></li>`:''}<li><span aria-current="page">${esc(p.title)}</span></li></ol></nav>`;
  const mins=Math.max(1,Math.round(p.words/220));
  const head=isHome||is404?'':`<header class="docHead"><h1>${esc(p.title)}</h1>${p.lead?`<p class="docLead">${esc(p.lead)}</p>`:''}<div class="docInfo">${p.status?badge(p.status):''}<span>Updated ${esc(p.updated)}</span><span>${mins} min read</span></div></header>`;
  const related=p.related.length?`<section class="related" aria-labelledby="related-title"><h2 id="related-title" class="relTitle">Related</h2><ul>${p.related.map(r=>`<li><a href="${urlOf(r)}"><b>${esc(bySlug[r].title)}</b><span>${esc(bySlug[r].description||'')}</span></a></li>`).join('')}</ul></section>`:'';
  const body=`<article class="doc${isHome?' docHome':''}">${head}<div class="prose">${p.html}</div>${related}</article>`;
  const prevNext=isHome||is404?'':`<nav class="pager" aria-label="Previous and next pages">${prev?`<a class="prev" href="${urlOf(prev.slug)}"><span>Previous</span><b>${esc(prev.title)}</b></a>`:'<span></span>'}${next?`<a class="next" href="${urlOf(next.slug)}"><span>Next</span><b>${esc(next.title)}</b></a>`:''}</nav>`;
  const toc=p.headings.length>1&&!isHome?`<aside class="toc" aria-label="On this page"><p class="tocTitle">On this page</p><ul>${p.headings.map(h=>`<li class="d${h.depth}"><a href="#${h.id}">${esc(h.text)}</a></li>`).join('')}</ul></aside>`:'';
  const html=shell({page:p,nav,assets,meta,body,toc,crumbs,prevNext,isHome});
  const outFile=path.join(OUT,(isHome?'index':p.slug)+'.html');
  fs.mkdirSync(path.dirname(outFile),{recursive:true});fs.writeFileSync(outFile,html);
  if(is404)continue;
  // search index: one entry per page intro + one per h2/h3 section
  const parts=p.html.split(/(?=<h[23] id=")/);
  parts.forEach((part,k)=>{
   const m=part.match(/^<h[23] id="([^"]+)">/);
   const heading=m?plain(part.match(/^<h[23][^>]*>([\s\S]*?)<\/h[23]>/)[1]):'';
   const txt=plain(m?part.replace(/^<h[23][^>]*>[\s\S]*?<\/h[23]>/,''):part).slice(0,900);
   if(!txt&&!heading)return;
   index.push({p:p.title,g:g?g.title:'',h:heading,u:urlOf(p.slug)+(m?'#'+m[1]:''),x:k===0&&p.description?(p.description+' '+txt).slice(0,900):txt});
  });
 }
 fs.writeFileSync(path.join(OUT,'search-index.json'),JSON.stringify(index));

 // static files: brand assets from public/
 const pub=path.join(ROOT,'public');
 for(const f of['favicon.ico','favicon-16x16.png','favicon-32x32.png','apple-touch-icon.png','ovia-logo.png','ovia-mark.png','og-docs.png'])fs.copyFileSync(path.join(pub,f),path.join(OUT,f));
 fs.cpSync(path.join(pub,'fonts'),path.join(OUT,'fonts'),{recursive:true});
 fs.writeFileSync(path.join(OUT,'robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
 fs.writeFileSync(path.join(OUT,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${order.map(s=>`  <url><loc>${SITE}${urlOf(s)}</loc><lastmod>${bySlug[s].updated}</lastmod></url>`).join('\n')}\n</urlset>\n`);
 // Cloudflare Pages headers (ignored by Vercel, which uses vercel.json)
 fs.writeFileSync(path.join(OUT,'_headers'),`/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  X-Frame-Options: DENY\n\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/fonts/*\n  Cache-Control: public, max-age=31536000, immutable\n`);
 if(!quiet)console.log(`Docs built: ${pages.length} pages, ${index.length} search entries → dist (${Date.now()-t0} ms)`);
 return{pages,order};
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 buildDocs().catch(e=>{console.error(e.message||e);process.exit(1)});
}
