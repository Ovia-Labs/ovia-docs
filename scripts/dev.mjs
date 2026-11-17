/* Local docs preview with rebuild on change.  npm run dev  →  http://localhost:4174
   npm run preview serves the existing build without watching. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildDocs} from './build.mjs';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const OUT=path.join(ROOT,'dist');
const WATCH=!process.argv.includes('--no-watch');
const PORT=Number(process.env.PORT||4174);
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.ico':'image/x-icon','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain'};

let building=null,queued=false;
async function rebuild(){
 if(building){queued=true;return}
 building=buildDocs({quiet:true}).then(()=>console.log('Rebuilt '+new Date().toLocaleTimeString())).catch(e=>console.error('Build failed: '+e.message));
 await building;building=null;if(queued){queued=false;rebuild()}
}
if(WATCH){
 await buildDocs();
 for(const dir of['content','client','public'])fs.watch(path.join(ROOT,dir),{recursive:true},()=>rebuild());
}else if(!fs.existsSync(path.join(OUT,'index.html'))){console.error('No build found. Run npm run build first.');process.exit(1)}

http.createServer((req,res)=>{
 let p=decodeURIComponent(new URL(req.url,'http://x').pathname);
 if(p.endsWith('/')&&p!=='/')p=p.slice(0,-1);
 const tries=p==='/'?['index.html']:[p.slice(1),p.slice(1)+'.html',p.slice(1)+'/index.html'];
 for(const t of tries){const f=path.join(OUT,t);if(f.startsWith(OUT)&&fs.existsSync(f)&&fs.statSync(f).isFile()){res.writeHead(200,{'content-type':TYPES[path.extname(f)]||'application/octet-stream'});return fs.createReadStream(f).pipe(res)}}
 res.writeHead(404,{'content-type':TYPES['.html']});fs.createReadStream(path.join(OUT,'404.html')).pipe(res);
}).listen(PORT,()=>console.log(`Ovia Labs Docs → http://localhost:${PORT}`));
