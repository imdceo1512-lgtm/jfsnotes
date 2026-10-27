import fs from 'node:fs';
import path from 'node:path';
import { lessons } from './lessons.mjs';
import { lessons as seniorLessons } from './lessons_ijk.mjs';
import { overrides, titles as lessonTitles } from './lesson_overrides.mjs';
const iContentIds = {'I-01':'I-02','I-02':'I-03','I-03':'I-04','I-04':'I-05'};
for (const lesson of seniorLessons.filter(item => !['I-05','I-06'].includes(item.id))) {
  const oldId = lesson.id;
  if (iContentIds[oldId]) {
    lesson.id = iContentIds[oldId];
    lesson.related = (lesson.related || []).map(id => iContentIds[id] || id);
    if (lesson.id === 'I-05') lesson.refs = [
      ['IBM configuring access to Db2 data sources','https://www.ibm.com/docs/en/db2/12.1.x?topic=wrapper-configuring-access-db2-data-sources'],
      ['IBM federation pushdown analysis','https://www.ibm.com/docs/en/db2/12.1.x?topic=phases-federated-database-pushdown-analysis'],
      ['IBM federation database options','https://www.ibm.com/docs/en/db2/12.1.x?topic=options-database']
    ];
    if (lesson.id === 'I-02') lesson.refs = [
      ['IBM fix-pack installation methods','https://www.ibm.com/docs/en/db2/12.1.x?topic=environments-fix-pack-installation-methods'],
      ['IBM installFixPack','https://www.ibm.com/docs/en/db2/12.1.x?topic=commands-installfixpack-update-installed-db2-database-products'],
      ['IBM Db2 installation methods','https://www.ibm.com/docs/en/db2/12.1.x?topic=servers-db2-installation-methods']
    ];
    if (lesson.id === 'I-03') lesson.refs = [
      ['IBM upgrade readiness check','https://www.ibm.com/docs/en/db2/12.1?topic=tasks-verifying-that-your-databases-are-ready-upgrade'],
      ['IBM UPGRADE DATABASE','https://www.ibm.com/docs/en/db2/12.1.x?topic=commands-upgrade-database'],
      ['IBM upgrade restrictions','https://www.ibm.com/docs/en/db2/12.1.x?topic=servers-upgrade-restrictions']
    ];
    if (lesson.id === 'I-04') lesson.refs = [
      ['IBM cross-platform backup and restore','https://www.ibm.com/docs/en/db2/12.1.x?topic=dbrs-backup-restore-operations-between-different-operating-systems-hardware-platforms'],
      ['IBM EXPORT','https://www.ibm.com/docs/en/db2/12.1.x?topic=commands-export'],
      ['IBM LOAD','https://www.ibm.com/docs/en/db2/12.1.x?topic=utility-load-overview'],
      ['IBM db2move','https://www.ibm.com/docs/en/db2/12.1.x?topic=commands-db2move-database-movement-tool']
    ];
  }
  lessons.push(lesson);
}
for (const override of overrides) {
  const target = lessons.find(lesson => lesson.id === override.id);
  if (target) Object.assign(target, override);
  else lessons.push(override);
}
for (const [id, title] of Object.entries(lessonTitles)) lessons.find(lesson => lesson.id === id).title = title;
const addIssue = (id, issue) => lessons.find(lesson => lesson.id === id).issues.push({symptom:issue[0],evidence:issue[1],cause:issue[2],fix:issue[3],avoid:issue[4]});
const k1 = lessons.find(lesson => lesson.id === 'K-01');
k1.refs.push(
  ['IBM lock and deadlock event monitoring','https://www.ibm.com/docs/en/db2/12.1.x?topic=events-lock-deadlock-event-monitoring'],
  ['IBM SQL0289N table-space capacity guidance','https://www.ibm.com/docs/en/db2/12.1.0?topic=management-system-managed-space']
);
k1.scope.push('deadlock and lock-timeout distinction','tablespace-full symptom and capacity proof','DNS/port/TLS/authentication branch order');
k1.branches.push(
  ['Deadlock or lock timeout','Separate SQL deadlock victim from timeout and identify blocker/UOW.','Do not treat both as log-full symptoms.'],
  ['Tablespace capacity','Check tablespace state, container/filesystem, and growth limit.','Free filesystem bytes do not prove a tablespace can extend.'],
  ['Client connection failure','Walk DNS, route, listener, TLS, authentication, then database state.','TCP success alone does not prove a usable Db2 session.']
);
k1.commands.push({label:'Check data-space and mount capacity',command:'db2 list tablespaces show detail; df -hP /db2data',actor:'Instance owner and Linux host operator',target:'SAMPLE table spaces and mapped data mount',pre:'Map the selected table space containers to the actual mount; run read-only checks.',expected:'Tablespace state, utilization, and filesystem capacity are shown.',verify:'Compare affected object/container path, auto-resize limit, inode availability, and recent growth.',rollback:'Read-only; do not delete Db2 files or extend an unapproved volume.',lang:'bash'});
addIssue('K-01',['SQL0911N or repeated lock victim in the incident report','SQLCODE/SQLSTATE, reason code, deadlock event, lock chain, UOW age, and app retry ID','deadlock cycle or lock timeout causes rollback/retry load that may look like log pressure','identify blocker and transaction boundary; coordinate app retry policy and recheck lock waits','force the blocker without estimating rollback or duplicate request effects']);
addIssue('K-01',['SQL0289N or table-space extension failure','table-space state, container path, AUTORESIZE/max size, filesystem blocks/inodes, and db2diag','table space or container cannot allocate required extent','restore approved storage/capacity or correct scoped configuration, then validate state and application write','assume free filesystem bytes guarantee table-space headroom']);
const k2 = lessons.find(lesson => lesson.id === 'K-02');
k2.refs.push(
  ['IBM encrypted backups','https://www.ibm.com/docs/en/db2/12.1.x?topic=encryption-encrypted-backups'],
  ['IBM native encryption','https://www.ibm.com/docs/en/db2/12.1.x?topic=rest-db2-native-encryption']
);
k2.scope.push('offline versus online image recovery state','delta backup chain and required base image','wrong image/member/alias and encryption-key recovery');
k2.branches.push(
  ['Offline image','Restore image after offline backup and validate clean database state.','It may not require log rollforward.'],
  ['Online image','Restore online backup and apply required logs to a consistent endpoint.','Image completion alone may leave rollforward pending.'],
  ['Key or identity mismatch','Verify image database/member identity and retrieve required encryption key.','Do not overwrite the source or alter image identity.']
);
addIssue('K-02',['Encrypted image cannot be opened because key material is unavailable','image header, encryption options, key-manager audit, key label/version, and restore diagnostics','key escrow/credential or provider configuration is missing','retrieve the authorized matching key and test on isolated target before retry','generate a new key and assume it decrypts an existing backup']);
addIssue('K-02',['Wrong image or alias selected','image header, database/member identity, timestamp, history, and target alias','ambiguous filename or cross-member image selection','stop before restore continuation; select verified chain and isolated alias','replace the original database based on filename alone']);
const k3 = lessons.find(lesson => lesson.id === 'K-03');
k3.refs.push(
  ['IBM HADR failover procedure','https://www.ibm.com/docs/en/db2/12.1.x?topic=outage-performing-hadr-failover-operation'],
  ['IBM upgrade readiness check','https://www.ibm.com/docs/en/db2/12.1?topic=tasks-verifying-that-your-databases-are-ready-upgrade']
);
k3.commands.push({label:'Upgrade readiness gate',command:'db2ckupgrade PROD -l /db2upgrade/PROD.log',actor:'Instance owner / upgrade lead',target:'Rehearsal database and planned production database',pre:'Use target-version tool and required database state; inspect the complete log before scheduling.',expected:'Readiness output reports blockers and warnings for review.',verify:'Confirm all databases/partitions are covered and close every blocker before fix-pack/upgrade sequence.',rollback:'Read-only precheck; a pass does not authorize takeover or database upgrade.',lang:'bash'});
addIssue('K-03',['HADR transition or upgrade gate is blocked','HADR role/state, utility/upgrade status, log positions, db2diag, and fix-pack matrix','upgrade in progress, unsupported sequence, or standby outside takeover-eligible state','stop role change; finish/abort the documented maintenance phase and validate both endpoints','force takeover while upgrade state or fencing is unresolved']);
const k4 = lessons.find(lesson => lesson.id === 'K-04');
k4.expected += ' Capstone scoring covers target identification, evidence quality, safe action, independent verification, rollback/escalation, and stakeholder communication.';
k4.lab += ' Score each area against a stated rubric and record any critical safety failure separately from the numeric score.';
k4.checklist.push('Score target, evidence, action, verification, recovery/escalation, and communication separately.');
for (const lesson of lessons) {
  if (lesson.id === 'J-03' && lesson.commands[1]) lesson.commands[1].lang = 'python';
  lesson.verify ??= lesson.checks ?? ['Compare the post-state with the captured pre-state.', 'Confirm the intended service or data outcome independently of the command return code.'];
  lesson.lifecycleRule ??= lesson.stopRule ?? 'Stop when target, authority, state, or recovery boundary is uncertain.';
}

const root = path.resolve(import.meta.dirname, '..');
const domainNames = {
  A: 'Host, Linux, and operational readiness',
  B: 'Db2 LUW foundations and architecture',
  C: 'SQL, catalogs, objects, storage, and utilities',
  D: 'Security and connectivity',
  E: 'Monitoring, diagnostics, and incident evidence',
  F: 'Logging, backup, restore, and recovery',
  G: 'HA/DR, replication, and topology operations',
  H: 'SQL performance, concurrency, and maintenance',
  I: 'Change, upgrades, migration, and architecture',
  J: 'Automation and operational engineering',
  K: 'Senior DBA scenarios and capstone'
};
const esc = s => String(s ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const mdLink = (label, href) => `[${label}](${href})`;
const code = s => `\`${s}\``;
const info = l => `**Procedure status: NOT YET EXECUTED.** This is a teaching procedure for Db2 LUW 12.1.0 on Linux x86-64, single-member topology. The exact fix pack is not pinned. Engine commands run on the Db2 server as the named instance/database authority; client checks run on the client; OS commands run on the named host and normally require read-only access. Windows, AIX, DPF, and pureScale differences are called out where material. The supplied environment has no Db2 CLI or disposable Db2 server, so no lab command is claimed as executed. Before production use, confirm each command against the installed fix pack and local change controls.`;

function list(xs) { return (xs || []).map(x => `- ${x}`).join('\n'); }
function cell(xs) { return (xs || []).join('; ').replaceAll('|', '\\|').replaceAll('\n', ' '); }
function linkRefs(refs) { return (refs || []).map(([label, href]) => `- [${label}](${href})`).join('\n'); }
function lessonMd(l) {
  const branchRows = l.branches.map(b => `| ${b[0]} | ${b[1]} | ${b[2]} |`).join('\n');
  const cmds = l.commands.map((c, i) => `### Procedure ${i + 1}: ${c.label}\n\n**Status:** NOT YET EXECUTED. **Run as:** ${c.actor}. **Target:** ${c.target}. **Authority/prerequisite:** ${c.pre.replace(/[.]+$/, '')}.\n\n\`\`\`${c.lang || 'bash'}\n${c.command}\n\`\`\`\n\n**Expected result:** ${c.expected}\n\n**Independent check:** ${c.verify}\n\n**Stop/rollback boundary:** ${c.rollback}`).join('\n\n');
  const issues = l.issues.map(i => `| ${i.symptom} | ${i.evidence} | ${i.cause} | ${i.fix} | ${i.avoid} |`).join('\n');
  const refs = linkRefs(l.refs);
  return `# ${l.id} — ${l.title}\n\n${info(l)}\n\n## 1. Quick answer\n\n${l.quick}\n\n**Safest first step:** ${l.first}\n\n## 2. Learn the concept\n\n${l.concept}\n\n### Working model\n\n${l.model}\n\n\`\`\`mermaid\n${l.diagram}\n\`\`\`\n\n## 3. Choose an approach\n\n| Variant | Choose it when | Do not choose it when / boundary |\n|---|---|---|\n${branchRows}\n\n## 4. Understand the lifecycle\n\n${list(l.lifecycle)}\n\n**Pause/retry/stop/rollback rule:** ${l.lifecycleRule}\n\n## 5. Do the work\n\n### Precheck\n\n${list(l.precheck)}\n\n### Scoped procedures\n\n${cmds}\n\n## 6. Worked example and verification\n\n${l.example}\n\n**Expected state/result:** ${l.expected}\n\n**Independent verification:**\n\n${list(l.verify)}\n\n## 7. Diagnose problems\n\n| Symptom or verified error | Evidence to collect | Likely cause | Safe correction and recheck | Avoid |\n|---|---|---|---|---|\n${issues}\n\n## 8. Practice\n\n${l.lab}\n\n## 9. Check understanding\n\n**Question:** ${l.question}\n\n**Answer and reasoning:** ${l.answer}\n\n## 10. Look it up later\n\n### Short checklist\n\n${list(l.checklist)}\n\n### Related lessons\n\n${l.related.map(x => mdLink(x, `../${x[0]}/${x}.md`)).join(' · ')}\n\n### Authoritative references\n\n${refs}\n\n---\n\n[Domain index](README.md) · [Course index](../README.md) · [Glossary](../GLOSSARY.md)\n`;
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
}

for (const l of lessons) {
  const folder = path.join(root, l.id[0]);
  write(path.join(folder, `${l.id}.md`), lessonMd(l));
}

// Domain indexes
for (const letter of Object.keys(domainNames)) {
  const subset = lessons.filter(l => l.id.startsWith(`${letter}-`));
  const index = `# ${letter} — ${domainNames[letter]}\n\n${subset.map(l => `- [${l.id} ${l.title}](${l.id}.md) — ${l.quick}`).join('\n')}\n\n[Course index](../README.md) · [Curriculum map](../CURRICULUM_MAP.md)\n`;
  write(path.join(root, letter, 'README.md'), index);
}

// 68-row topic-depth matrix. Cells describe evidence, not an assertion of execution.
const matrixHeader = '| ID | Lesson | Distinct branches/types and lifecycle | Valid examples | Expected result and verification | Failure branches | Diagram, lab, assessment, references |\n|---|---|---|---|---|---|---|';
const matrixRows = lessons.map(l => `| ${l.id} | ${l.title} | ${cell([...l.branches.map(b => `${b[0]}: ${b[1]}`), ...l.lifecycle])} | ${cell(l.commands.map(c => `${c.label}: ${c.command}`))} | ${cell([l.expected, ...l.verify])} | ${cell(l.issues.map(i => `${i.symptom}: ${i.fix}`))} | ${cell([`diagram ${l.id}`, l.lab, l.question, ...(l.refs || []).map(r => r[0])])} |`).join('\n');
write(path.join(root, 'qa', 'topic-depth-matrix.md'), `# Topic Depth Matrix\n\nThis matrix contains one row per lesson. It ties every lesson to variants, phases, example syntax, verification, failure treatment, a diagram, practice, assessment, and direct references. **It records authored coverage, not lab execution.**\n\n${matrixHeader}\n${matrixRows}\n`);

// Coverage ledger: leaf-scope evidence points to specific sections in a lesson.
const ledger = `# Microtopic coverage ledger\n\nEach leaf below is evidenced by the lesson's approach table, lifecycle, scoped procedures, verification, and issue table. The matrix is a navigation aid; lesson evidence is the coverage criterion.\n\n${lessons.map(l => `## [${l.id} ${l.title}](../${l.id[0]}/${l.id}.md)\n\n${list(l.scope.map(s => `**${s}** — see [Approach](../${l.id[0]}/${l.id}.md#3-choose-an-approach), [Lifecycle](../${l.id[0]}/${l.id}.md#4-understand-the-lifecycle), [Procedures](../${l.id[0]}/${l.id}.md#5-do-the-work), [verification](../${l.id[0]}/${l.id}.md#6-worked-example-and-verification), and [diagnosis](../${l.id[0]}/${l.id}.md#7-diagnose-problems).`))}`).join('\n\n')}`;
write(path.join(root, 'qa', 'coverage-ledger.md'), ledger);

// Course navigation and indexes
const rows = Object.entries(domainNames).map(([letter, name]) => `| ${letter} | ${name} | ${lessons.filter(l => l.id.startsWith(`${letter}-`)).length} | [Open domain](./${letter}/README.md) |`).join('\n');
write(path.join(root, 'CURRICULUM_MAP.md'), `# Curriculum map — 68 lesson route\n\nPrimary baseline is Db2 LUW 12.1.0 on Linux x86-64 with a disposable single-member database. Progress from host operations to incident leadership. DPF and pureScale are treated as distinct topology branches where their commands or failure modes differ.\n\n| Domain | Scope | Lessons | Index |\n|---|---|---:|---|\n${rows}\n\n## Lesson sequence\n\n${lessons.map(l => `- [${l.id} — ${l.title}](./${l.id[0]}/${l.id}.md)`).join('\n')}\n\nSee [coverage ledger](./qa/coverage-ledger.md) and [Topic Depth Matrix](./qa/topic-depth-matrix.md).\n`);

// Command, issue, and lab indexes
write(path.join(root, 'COMMAND_INDEX.md'), `# Command and SQL index\n\nCommands are for synthetic lab names. Each lesson states execution identity, target, required authority, expected result, independent verification, and stop boundary. All are **not yet executed** here.\n\n${lessons.map(l => `## ${l.id} ${l.title}\n\n${l.commands.map(c => `- ${code(c.command)} — ${c.label} ([lesson](./${l.id[0]}/${l.id}.md#5-do-the-work))`).join('\n')}`).join('\n\n')}\n`);
write(path.join(root, 'TROUBLESHOOTING_INDEX.md'), `# Troubleshooting index\n\n${lessons.map(l => `## ${l.id} ${l.title}\n\n${l.issues.map(i => `- **${i.symptom}** — ${i.cause}; evidence: ${i.evidence}. [Safe response](./${l.id[0]}/${l.id}.md#7-diagnose-problems)`).join('\n')}`).join('\n\n')}\n`);
write(path.join(root, 'LAB_INDEX.md'), `# Lab index\n\nAll labs are designed for disposable systems. No lab is marked executed because no Db2 installation was available.\n\n${lessons.map(l => `- [${l.id} ${l.title}](./${l.id[0]}/${l.id}.md#8-practice) — ${l.lab.split('\n')[0]}`).join('\n')}\n`);

// HTML conversion: semantic, self-contained page shell; prose uses installed Ink Free / Comic Sans fallback, code remains monospace.
const css = `:root{color-scheme:light;--ink:#252b3a;--paper:#fffdf6;--accent:#125f75}*{box-sizing:border-box}body{margin:0;background:#ece9df;color:var(--ink);font:19px/1.55 "Ink Free","Comic Sans MS",cursive,sans-serif}main{max-width:980px;margin:28px auto;padding:36px 54px;background:var(--paper);box-shadow:0 3px 22px #0002;border:1px solid #ddd}h1,h2,h3{line-height:1.2;color:#153d52}h1{font-size:2.1em;border-bottom:2px solid #9cb8bc;padding-bottom:.35em}h2{margin-top:1.5em;border-bottom:1px solid #bdced0}a{color:var(--accent)}table{width:100%;border-collapse:collapse;font:15px/1.4 "Segoe UI",sans-serif;margin:1em 0}th,td{border:1px solid #b7c6c6;padding:8px;vertical-align:top}th{background:#e5f0ed}pre,code{font:14px/1.5 Consolas,"Cascadia Mono",monospace;background:#f1f3f4;border-radius:4px}pre{padding:14px;overflow:auto;border-left:4px solid #58848a}blockquote{border-left:4px solid #88a;padding-left:14px}li{margin:.25em 0}.meta{font:14px/1.4 "Segoe UI",sans-serif;background:#eef5f4;padding:12px}.mermaid{font:14px/1.4 Consolas,monospace;background:#f5f6f7;padding:14px;white-space:pre-wrap}nav{font:14px "Segoe UI",sans-serif;margin-bottom:18px}.small{font-size:14px}`;
write(path.join(root, 'assets', 'course.css'), css);

function inline(s, currentFile) {
  let out = esc(s);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    let target = href;
    if (!/^(?:https?:|#|mailto:)/i.test(target) && target.endsWith('.md')) target = target.slice(0, -3) + '.html';
    return `<a href="${esc(target)}">${label}</a>`;
  });
  return out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
function renderMd(src, currentFile) {
  const lines = src.split(/\r?\n/); let html = '', para = [], listType = '', inCode = false, codeLines = [], codeLang = '', table = false;
  const flushPara = () => { if (para.length) { html += `<p>${inline(para.join(' '), currentFile)}</p>`; para = []; } };
  const closeList = () => { if (listType) { html += `</${listType}>`; listType = ''; } };
  for (let n = 0; n < lines.length; n++) {
    const line = lines[n];
    if (line.startsWith('```')) { flushPara(); closeList(); if (!inCode) { inCode = true; codeLang = line.slice(3).trim(); codeLines = []; } else { const tag = codeLang === 'mermaid' ? 'pre class="mermaid"' : 'pre'; html += `<${tag}>${esc(codeLines.join('\n'))}</pre>`; inCode = false; } continue; }
    if (inCode) { codeLines.push(line); continue; }
    if (/^\|.*\|$/.test(line) && /^\|?[\s:|\-]+\|?$/.test(lines[n + 1] || '')) { flushPara(); closeList(); table = true; const heads = line.split('|').slice(1,-1); html += '<table><thead><tr>'+heads.map(x=>`<th>${inline(x.trim(),currentFile)}</th>`).join('')+'</tr></thead><tbody>'; n += 1; while (n + 1 < lines.length && /^\|.*\|$/.test(lines[n+1])) { n++; const vals=lines[n].split('|').slice(1,-1); html += '<tr>'+vals.map(x=>`<td>${inline(x.trim(),currentFile)}</td>`).join('')+'</tr>'; } html += '</tbody></table>'; table = false; continue; }
    if (!line.trim()) { flushPara(); closeList(); continue; }
    if (/^---+$/.test(line.trim())) { flushPara(); closeList(); html += '<hr>'; continue; }
    const h = line.match(/^(#{1,6})\s+(.*)$/); if (h) { flushPara(); closeList(); const level=h[1].length; const text=h[2]; const slug=text.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-'); html += `<h${level} id="${slug}">${inline(text,currentFile)}</h${level}>`; continue; }
    const li = line.match(/^\s*[-*]\s+(.*)$/); if (li) { flushPara(); if (listType !== 'ul') { closeList(); html += '<ul>'; listType='ul'; } html += `<li>${inline(li[1],currentFile)}</li>`; continue; }
    const ol = line.match(/^\s*\d+\.\s+(.*)$/); if (ol) { flushPara(); if (listType !== 'ol') { closeList(); html += '<ol>'; listType='ol'; } html += `<li>${inline(ol[1],currentFile)}</li>`; continue; }
    if (line.startsWith('> ')) { flushPara(); closeList(); html += `<blockquote>${inline(line.slice(2),currentFile)}</blockquote>`; continue; }
    closeList(); para.push(line.trim());
  }
  flushPara(); closeList();
  return html;
}
function htmlPage(title, body, relCss, nav) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><link rel="stylesheet" href="${relCss}"><script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js" defer></script></head><body><main><nav>${nav}</nav>${body}</main><script>window.addEventListener('load',()=>{if(window.mermaid){mermaid.initialize({startOnLoad:false,theme:'neutral'});mermaid.run();}});</script></body></html>`;
}
for (const l of lessons) {
  const file = path.join(root, l.id[0], `${l.id}.md`);
  const content = fs.readFileSync(file, 'utf8');
  const body = renderMd(content, file).replace(/<pre class="mermaid">/g, '<pre class="mermaid">');
  const html = htmlPage(`${l.id} — ${l.title}`, body, '../assets/course.css', `<a href="README.html">Domain index</a> · <a href="../index.html">Course home</a>`);
  write(file.replace(/\.md$/, '.html'), html);
}
for (const letter of Object.keys(domainNames)) {
  const f = path.join(root, letter, 'README.md');
  write(f.replace(/\.md$/, '.html'), htmlPage(domainNames[letter], renderMd(fs.readFileSync(f, 'utf8'), f), '../assets/course.css', `<a href="../index.html">Course home</a>`));
}

const rootReadme = `# Db2 LUW DBA Course — 12.1 baseline\n\nA progressive, searchable reference course with 68 lessons from host operations through senior DBA scenarios. Primary examples target Db2 LUW 12.1.0 on Linux x86-64 and a disposable single-member lab. The exact fix pack is intentionally not asserted because no lab server is available. Read the [scope and navigation map](./CURRICULUM_MAP.md), then enter a domain below.\n\n**Build status:** The package passed static Markdown and HTML link checks and is copied to the requested T: destination. Visual browser inspection and Db2 lab execution remain outstanding.\n\n**Use boundary:** notes are an original learning resource; they do not replace IBM support guidance, local change approval, recovery drills, or production experience. Every lesson identifies command context, authority, prechecks, expected result, independent check, and an escalation boundary. No password, private key, production identifier, or customer data is used.\n\n| Domain | Topic | Lessons |\n|---|---|---:|\n${Object.entries(domainNames).map(([k,v])=>`| ${k} | [${v}](./${k}/README.md) | ${lessons.filter(l=>l.id.startsWith(`${k}-`)).length} |`).join('\n')}\n\n## Reference tools\n\n- [Curriculum map](./CURRICULUM_MAP.md)\n- [Glossary](./GLOSSARY.md)\n- [Command and SQL index](./COMMAND_INDEX.md)\n- [Troubleshooting index](./TROUBLESHOOTING_INDEX.md)\n- [Lab index](./LAB_INDEX.md)\n- [QA and coverage evidence](./qa/README.md)\n- [Topic Depth Matrix](./qa/topic-depth-matrix.md)\n- [Coverage ledger](./qa/coverage-ledger.md)\n- [HTML reader](./index.html)\n\nGitHub renders Markdown using its own standard interface fonts. The companion HTML stylesheet uses the installed Windows **Ink Free** handwritten-style font for prose and Consolas for commands; if Ink Free is unavailable, it falls back to Comic Sans MS and then a system cursive font.\n`;
write(path.join(root, 'README.md'), rootReadme);
write(path.join(root, 'index.html'), htmlPage('Db2 LUW DBA Course', renderMd(rootReadme, path.join(root,'README.md')), './assets/course.css', '68 lessons · Db2 12.1 baseline'));

function collectMarkdown(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? collectMarkdown(full) : (entry.isFile() && full.endsWith('.md') ? [full] : []);
  });
}
for (const file of collectMarkdown(root)) {
  const source = fs.readFileSync(file, 'utf8');
  const title = source.match(/^#\s+(.+)$/m)?.[1] || path.basename(file, '.md');
  const cssPath = path.relative(path.dirname(file), path.join(root, 'assets', 'course.css')).split(path.sep).join('/');
  const homePath = path.relative(path.dirname(file), path.join(root, 'index.html')).split(path.sep).join('/');
  const domain = path.relative(root, file).split(path.sep)[0];
  const domainNav = /^[A-K]$/.test(domain) && !file.endsWith(path.join(domain, 'README.md')) ? '<a href="README.html">Domain index</a> · ' : '';
  write(file.replace(/\.md$/, '.html'), htmlPage(title, renderMd(source, file), cssPath, `${domainNav}<a href="${homePath}">Course home</a>`));
}

console.log(`Generated ${lessons.length} lessons, 11 domain indexes, matrix, ledger, and HTML pages in ${root}`);
