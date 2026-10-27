import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const counts={A:5,B:6,C:7,D:6,E:6,F:9,G:6,H:7,I:6,J:6,K:4};
const ids=Object.entries(counts).flatMap(([letter,count])=>Array.from({length:count},(_,i)=>letter+'-'+String(i+1).padStart(2,'0')));
const failures=[],warnings=[];
const required=['1. Quick answer','2. Learn the concept','3. Choose an approach','4. Understand the lifecycle','5. Do the work','6. Worked example and verification','7. Diagnose problems','8. Practice','9. Check understanding','10. Look it up later'];
const slug=s=>s.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-');
const fail=s=>failures.push(s);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=path.join(dir,e.name);return e.isDirectory()?walk(p):[p];});}
const files=walk(root), fileSet=new Set(files.map(p=>path.resolve(p))), lessonFiles=[];
for(const id of ids){
  const md=path.join(root,id[0],id+'.md'),html=path.join(root,id[0],id+'.html');
  if(!fs.existsSync(md)){fail('Missing lesson Markdown: '+id);continue;}
  if(!fs.existsSync(html))fail('Missing lesson HTML: '+id);
  lessonFiles.push(md);
  const t=fs.readFileSync(md,'utf8');
  if(!t.startsWith('# '+id+' — '))fail('Wrong title: '+id);
  for(const h of required)if(!t.includes('## '+h))fail('Missing section '+h+': '+id);
  const fence=String.fromCharCode(96).repeat(3);
  const fenceCount=t.split(fence).length-1;
  if(fenceCount%2)fail('Unclosed code fence: '+id);
  const procedures=(t.match(/^### Procedure \d+:/gm)||[]).length;
  const statuses=(t.match(/\*\*Status:\*\* NOT YET EXECUTED/g)||[]).length;
  if(!procedures||procedures!==statuses)fail('Procedure status mismatch '+id+': '+statuses+'/'+procedures);
  for(const label of ['Expected result:','Independent check:','Stop/rollback boundary:'])if(!t.includes(label))fail('Missing procedure field '+label+': '+id);
  if((t.match(new RegExp(fence+'mermaid','g'))||[]).length!==1)fail('Missing/duplicate diagram: '+id);
}
for(const file of files.filter(p=>p.endsWith('.md'))){
  const t=fs.readFileSync(file,'utf8'), re=/\[[^\]]*\]\(([^)]+)\)/g;
  let m;
  while((m=re.exec(t))){
    const target=m[1];
    if(/^(https?:|mailto:)/i.test(target))continue;
    const parts=target.split('#'),pathname=parts[0],anchor=parts[1];
    if(!pathname){
      if(anchor&&!new Set([...t.matchAll(/^#{1,6}\s+(.+)$/gm)].map(x=>slug(x[1]))).has(anchor))fail('Broken local anchor '+target+' in '+path.relative(root,file));
      continue;
    }
    const resolved=path.resolve(path.dirname(file),decodeURIComponent(pathname));
    if(!fileSet.has(resolved)){fail('Broken relative link '+target+' in '+path.relative(root,file));continue;}
    if(anchor&&pathname.endsWith('.md')){
      const dest=fs.readFileSync(resolved,'utf8');
      if(!new Set([...dest.matchAll(/^#{1,6}\s+(.+)$/gm)].map(x=>slug(x[1]))).has(anchor))fail('Broken heading anchor '+target+' in '+path.relative(root,file));
    }
  }
}
for(const file of files.filter(p=>p.endsWith('.md'))){
  const html=path.join(path.dirname(file),path.basename(file,'.md')+'.html');
  if(!fileSet.has(path.resolve(html)))fail('Missing HTML counterpart: '+path.relative(root,file));
}
for(const file of files.filter(p=>p.endsWith('.html'))){
  const t=fs.readFileSync(file,'utf8'), re=/(?:href|src)="([^"]+)"/gi;
  let m;
  while((m=re.exec(t))){
    const target=m[1];
    if(!target||target.startsWith('#')||/^(https?:|mailto:|data:|javascript:)/i.test(target))continue;
    const pathname=target.split(/[?#]/)[0];
    if(!pathname)continue;
    const resolved=path.resolve(path.dirname(file),decodeURIComponent(pathname));
    if(!fileSet.has(resolved))fail('Broken local HTML asset/link '+target+' in '+path.relative(root,file));
  }
}
const matrix=fs.readFileSync(path.join(root,'qa','topic-depth-matrix.md'),'utf8');
const matrixIds=[...matrix.matchAll(/^\| ([A-K]-\d{2}) \|/gm)].map(m=>m[1]);
if(matrixIds.length!==68||new Set(matrixIds).size!==68)fail('Topic matrix rows/unique IDs: '+matrixIds.length+'/'+new Set(matrixIds).size);
const ledger=fs.readFileSync(path.join(root,'qa','coverage-ledger.md'),'utf8');
const ledgerIds=[...ledger.matchAll(/^## \[([A-K]-\d{2}) /gm)].map(m=>m[1]);
if(ledgerIds.length!==68||new Set(ledgerIds).size!==68)fail('Ledger rows/unique IDs: '+ledgerIds.length+'/'+new Set(ledgerIds).size);
for(const letter of Object.keys(counts))if(!fs.existsSync(path.join(root,letter,'README.md'))||!fs.existsSync(path.join(root,letter,'README.html')))fail('Missing domain index: '+letter);
console.log('Lesson pages checked: '+lessonFiles.length+'; matrix rows: '+matrixIds.length+'; ledger rows: '+ledgerIds.length+'; Markdown and HTML local links checked.');
if(failures.length){console.error('FAILURES ('+failures.length+')\n'+failures.join('\n'));process.exitCode=1;}
else console.log('PASS: IDs, sections, procedure statuses/fields, diagrams, matrix, ledger, indexes, relative links, HTML counterparts, and HTML assets.');
