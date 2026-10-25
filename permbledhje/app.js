'use strict';

const CATEGORIES = [
  ['leksione', 'Leksione'],
  ['seminare', 'Seminare/ushtrime'],
  ['laboratore', 'Laboratorë'],
  ['detyra', 'Projekt / Detyra kursi'],
  ['praktika', 'Praktika mësimore']
];
const STORE_KEY = 'evion-summary-register-v1';
const MAX_RECORDS = 2000;
const round = n => Math.round(n * 1e6) / 1e6;
const normalized = s => s.normalize('NFC').trim().replace(/\s+/g, ' ').toLowerCase();
const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Vetëm formati përmbledhës i QR-së; nuk interpreton draftin e formularit.
function validateEvidence(raw) {
  if (!raw || raw.type !== 'evion-summary' || raw.version !== 1) {
    throw new Error('Ky nuk është JSON përmbledhës i evidencës (evion-summary, version 1).');
  }
  function text(key) {
    if (typeof raw[key] !== 'string' || !raw[key].trim() || raw[key].length > 300) {
      throw new Error('Fushë e pavlefshme: ' + key);
    }
    return raw[key].normalize('NFC').trim().replace(/\s+/g, ' ');
  }
  function num(value, name, max, integer = false) {
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > max || (integer && !Number.isInteger(value))) {
      throw new Error('Vlerë e pavlefshme: ' + name);
    }
    return round(value);
  }
  const item = {
    type:'evion-summary', version:1,
    teacher:text('teacher'), subject:text('subject'), program:text('program'),
    year:text('year'), semester:text('semester').toUpperCase(),
    cycle:num(raw.cycle, 'cikli', 2, true),
    students:num(raw.students, 'studentët', 10000, true), categories:[]
  };
  if (![1,2].includes(item.cycle)) throw new Error('Cikli duhet të jetë 1 ose 2.');
  const year = item.year.match(/^(\d{4})\s*-\s*(\d{4})$/);
  if (!year || +year[2] !== +year[1] + 1) throw new Error('Viti akademik është i pavlefshëm.');
  item.year = year[1] + '-' + year[2];
  if (!Array.isArray(raw.categories) || !raw.categories.length || raw.categories.length > 5) throw new Error('Kategoritë janë të pavlefshme.');
  const seen = new Set();
  for (const c of raw.categories) {
    if (!c || !CATEGORIES.some(([code]) => code === c.code) || seen.has(c.code)) throw new Error('Kategori e panjohur ose e përsëritur.');
    seen.add(c.code);
    const category = {
      code:c.code, credits:num(c.credits, 'kreditet', 60),
      students:num(c.students, 'studentët e kategorisë', 10000, true),
      groups:num(c.groups, 'grupet', 6, true),
      hours:num(c.hours, 'orët', 10000)
    };
    if (category.credits <= 0 || category.groups < 1 || category.students !== item.students) throw new Error('Kreditet, grupet ose maksimumi i studentëve nuk përputhen.');
    item.categories.push(category);
  }
  item.categories.sort((a,b) => CATEGORIES.findIndex(([c]) => c === a.code) - CATEGORIES.findIndex(([c]) => c === b.code));
  return item;
}

// Ky kombinim identifikon një evidencë semestrale të një lënde.
function evidenceKey(item) {
  return JSON.stringify([item.teacher,item.subject,item.program,item.year,item.semester,String(item.cycle)].map(normalized));
}
function sameEvidence(a,b) {
  return evidenceKey(a) === evidenceKey(b) && a.students === b.students && JSON.stringify(a.categories) === JSON.stringify(b.categories);
}
function parseImport(text) {
  if (text.length > 5000000) throw new Error('JSON-i është shumë i madh.');
  let raw;
  try { raw = JSON.parse(text); } catch { throw new Error('Teksti nuk është JSON i vlefshëm.'); }
  if (raw && raw.type === 'evion-collection' && raw.version === 1) {
    if (!Array.isArray(raw.evidences) || raw.evidences.length > MAX_RECORDS) throw new Error('Lista e evidencave është e pavlefshme.');
    return raw.evidences.map(validateEvidence);
  }
  return [validateEvidence(raw)];
}
function aggregate(items) {
  const totals = Object.fromEntries(CATEGORIES.map(([code]) => [code,{students:0,groups:0,hours:0}]));
  for (const item of items) for (const c of item.categories) {
    totals[c.code].students += c.students;
    totals[c.code].groups += c.groups;
    totals[c.code].hours = round(totals[c.code].hours + c.hours);
  }
  return totals;
}

if (typeof document !== 'undefined') initPage();

function initPage() {
  const $ = id => document.getElementById(id);
  let records = [], queue = [], running = false, scanBusy = false;
  const message = (text, kind = '') => { $('status').textContent = text; $('status').className = kind; };
  const hours = n => n.toFixed(2);
  function loadRecords() {
    const stored = localStorage.getItem(STORE_KEY);
    const items = stored ? parseImport(stored) : [];
    const keys = new Set();
    for (const item of items) {
      if (keys.has(evidenceKey(item))) throw new Error('Ruajtja përmban evidenca të dyfishta. Eksportoni të dhënat për kontroll.');
      keys.add(evidenceKey(item));
    }
    return items;
  }
  function saveRecords(next) {
    if (next.length > MAX_RECORDS) throw new Error('Lejohen deri në ' + MAX_RECORDS + ' evidenca.');
    // Nëse ruajtja dështon, gjendja aktuale nuk ndryshohet.
    localStorage.setItem(STORE_KEY, JSON.stringify({type:'evion-collection',version:1,evidences:next}));
    records = next;
  }
  function download(data, filename) {
    const url = URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
    const a = document.createElement('a'); a.href=url; a.download=filename;
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url),60000);
  }
  function filename(item) {
    return ('Permbledhje_'+item.subject+'_'+item.teacher).replace(/[^\p{L}\p{N}_-]/gu,'_').slice(0,130)+'.json';
  }
  function fillSelect(id, values, allLabel) {
    const selected = $(id).value;
    $(id).replaceChildren();
    if (allLabel) $(id).add(new Option(allLabel,''));
    for (const [value,label] of values) $(id).add(new Option(label,value));
    if (values.some(([v]) => v === selected)) $(id).value = selected;
  }
  function refreshFilters() {
    const teachers = new Map(records.map(r => [normalized(r.teacher),r.teacher]));
    fillSelect('teacher',[...teachers].sort((a,b)=>a[1].localeCompare(b[1])));
    const own = records.filter(r => normalized(r.teacher) === $('teacher').value);
    fillSelect('year',[...new Set(own.map(r=>r.year))].sort().reverse().map(v=>[v,v]),'Të gjitha vitet');
    const inYear = own.filter(r=>!$('year').value || r.year === $('year').value);
    fillSelect('semester',[...new Set(inYear.map(r=>r.semester))].sort().map(v=>[v,v]),'Të gjithë semestrat');
  }
  function selectedRecords() {
    return records.filter(r => normalized(r.teacher) === $('teacher').value && (!$('year').value || r.year === $('year').value) && (!$('semester').value || r.semester === $('semester').value));
  }
  function rowCells(c) {
    return `<td class="number">${c.students}</td><td class="number">${c.groups}</td><td class="number">${hours(c.hours)}</td>`;
  }
  function categoryRows(item) {
    return item.categories.map(c=>`<tr><td>${CATEGORIES.find(([code])=>code===c.code)[1]}</td>${rowCells(c)}</tr>`).join('');
  }
  function render() {
    const selected = selectedRecords(), totals = aggregate(selected);
    $('selection').textContent = selected.length ? selected[0].teacher + ' · ' + selected.length + ' evidenca të përfshira' : 'Nuk ka evidenca për këtë përzgjedhje.';
    const sum1 = round(CATEGORIES.slice(0,4).reduce((s,[code])=>s+totals[code].hours,0));
    const sum2 = totals.praktika.hours;
    const subtotal = (label,value,cls='total') => `<tr class="${cls}"><td></td><td>${label}</td><td></td><td></td><td class="number">${hours(value)}</td><td></td></tr>`;
    let rows = CATEGORIES.slice(0,4).map(([code,label],i)=>`<tr><td>${i+1}</td><td>${label}</td>${rowCells(totals[code])}<td>${i===0?'Në auditor':''}</td></tr>`).join('');
    rows += subtotal('Shuma 1',sum1);
    rows += `<tr><td>5</td><td>Praktika mësimore</td>${rowCells(totals.praktika)}<td>Suplementare</td></tr>`;
    ['Udhëheqje Diplome Bachelor','Udhëheqje Diplome Master','Udhëheqje Doktorature','Oponencë Doktorature','Juri Doktorature'].forEach((label,i)=>{
      rows += `<tr><td>${i+6}</td><td>${label}</td><td>—</td><td>—</td><td>—</td><td></td></tr>`;
    });
    $('summary').innerHTML = rows+subtotal('Shuma 2',sum2)+subtotal('Shuma (1 + 2)',round(sum1+sum2),'grand');
    $('details').replaceChildren();
    for (const item of selected) {
      const detail=document.createElement('details'), title=document.createElement('summary');
      title.textContent = `${item.subject} · ${item.program} · ${item.year} · Semestri ${item.semester} · Cikli ${item.cycle}`;
      detail.append(title);
      const body=document.createElement('div'); body.className='scroll';
      body.innerHTML=`<table><thead><tr><th>Kategoria</th><th>Studentë</th><th>Grupe</th><th>Orë</th></tr></thead><tbody>${categoryRows(item)}</tbody></table>`;
      detail.append(body);
      const actions=document.createElement('div'); actions.className='actions';
      const out=document.createElement('button'); out.type='button'; out.className='secondary'; out.textContent='Shkarko JSON'; out.onclick=()=>download(item,filename(item));
      const remove=document.createElement('button'); remove.type='button'; remove.className='danger'; remove.textContent='Hiq evidencën';
      remove.onclick=()=>{
        if (!confirm('Të hiqet evidenca e lëndës '+item.subject+'?')) return;
        try {
          saveRecords(loadRecords().filter(r=>evidenceKey(r)!==evidenceKey(item)));
          refreshFilters(); render(); renderPreview(); message('Evidenca u hoq.');
        } catch(e){message('Nuk u ruajt ndryshimi: '+e.message,'error');}
      };
      actions.append(out,remove);detail.append(actions);$('details').append(detail);
    }
    if (!selected.length) $('details').textContent='Evidencat e importuara do të shfaqen këtu.';
    $('export').disabled=!records.length;
  }
  function renderPreview() {
    const item=queue[0]; $('preview').hidden=!item;
    if(!item)return;
    $('queue-count').textContent=queue.length+' evidenca në pritje për kontroll.';
    $('preview-meta').textContent=`${item.teacher} · ${item.subject} · ${item.program} · ${item.year} · Semestri ${item.semester} · Cikli ${item.cycle}`;
    $('preview-rows').innerHTML=categoryRows(item);
    const old=records.find(r=>evidenceKey(r)===evidenceKey(item));
    const duplicate=old && sameEvidence(old,item);
    $('add').disabled=Boolean(duplicate);
    $('add').textContent=old&&!duplicate?'Zëvendëso evidencën':'Shto në përmbledhje';
    $('duplicate-note').textContent=duplicate?'Kjo evidencë është importuar më parë. Nuk do të dyfishohet.':old?'Ekziston një evidencë për këtë pedagog, lëndë, program, cikël, vit dhe semestër. Të dhënat ndryshojnë; mund ta zëvendësoni.':'';
  }
  function stage(items) {
    if(queue.length+items.length>MAX_RECORDS)throw new Error('Shumë evidenca në pritje.');
    queue.push(...items);renderPreview();
    if(items.length) $('preview').scrollIntoView({behavior:'smooth',block:'start'});
  }
  $('add').onclick=()=>{
    if(!queue.length)return;
    try {
      const item=queue[0], next=loadRecords();
      const index=next.findIndex(r=>evidenceKey(r)===evidenceKey(item));
      if(index>=0) {
        if(sameEvidence(next[index],item)) { records=next;renderPreview();message('Kjo evidencë është importuar më parë.');return; }
        if(!confirm('Të zëvendësohet evidenca ekzistuese? Totalet e vjetra do të zëvendësohen me të rejat.'))return;
        next[index]=item;
      } else next.push(item);
      saveRecords(next);queue.shift();refreshFilters();$('teacher').value=normalized(item.teacher);refreshFilters();render();renderPreview();message('Evidenca u ruajt dhe totalet u përditësuan.','success');
    } catch(e){message('Nuk u shtua evidenca: '+e.message,'error');}
  };
  $('skip').onclick=()=>{queue.shift();renderPreview();};
  $('download').onclick=()=>{if(queue[0])download(queue[0],filename(queue[0]));};
  $('export').onclick=()=>{
    try {const latest=loadRecords();download({type:'evion-collection',version:1,evidences:latest},'Permbledhje-evidencat.json');}
    catch(e){message(e.message,'error');}
  };
  for(const id of ['teacher','year','semester'])$(id).onchange=()=>{refreshFilters();render();};
  $('json').onclick=()=>$('json-file').click();
  $('json-file').onchange=async()=>{
    const files=[...$('json-file').files];
    try {
      if(files.length>100)throw new Error('Zgjidhni deri në 100 skedarë njëherësh.');
      const incoming=[];
      for(const file of files){
        if(file.size>5000000)throw new Error(file.name+': skedari është shumë i madh.');
        try{incoming.push(...parseImport(await file.text()));}
        catch(e){throw new Error(file.name+': '+e.message);}
      }
      stage(incoming);message('Të dhënat u lexuan. Kontrollojini përpara shtimit.');
    }catch(e){message(e.message,'error');}
    finally{$('json-file').value='';}
  };

  const video = $('camera-video');
  let stream = null, cameraToken = 0, scanTimer = null, cancelFile = false;
  const pause = () => new Promise(resolve => setTimeout(resolve, 0));
  function requireDecoder() {
    if (typeof jsQR !== 'function') throw new Error('Nuk u ngarkua vendor/jsQR.js. Kontrolloni që folderi vendor është publikuar.');
  }
  function scanControls() {
    $('scan').disabled = scanBusy || running;
    $('photo').disabled = scanBusy || running;
    $('pdf').disabled = scanBusy || running;
    $('stop').disabled = !scanBusy && !running;
    $('stop').textContent = scanBusy && !running ? 'Anulo' : 'Ndalo kamerën';
  }
  function stopCamera() {
    cameraToken++;
    clearTimeout(scanTimer);
    if (stream) stream.getTracks().forEach(track => track.stop());
    stream = null; running = false;
    video.pause(); video.srcObject = null;
    $('reader').hidden = true;
    scanControls();
  }
  // Lexon një rajon pa deformim dhe ruan kufirin e bardhë të QR-së.
  function decodeRegion(source, x, y, w, h, maxSide = 1800) {
    const scale = Math.min(1, maxSide / Math.max(w, h));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(w * scale));
    canvas.height = Math.max(1, Math.round(h * scale));
    const context = canvas.getContext('2d', {willReadFrequently:true});
    context.fillStyle = '#fff'; context.fillRect(0,0,canvas.width,canvas.height);
    context.drawImage(source,x,y,w,h,0,0,canvas.width,canvas.height);
    const pixels = context.getImageData(0,0,canvas.width,canvas.height);
    const code = jsQR(pixels.data,pixels.width,pixels.height,{inversionAttempts:'attemptBoth'});
    canvas.width=canvas.height=1;
    return code ? code.data : null;
  }
  async function scanSurface(source, width, height) {
    requireDecoder();
    // E gjithë faqja, pastaj pjesë të mbivendosura në rezolucion më të lartë.
    const regions = [[0,0,width,height,1800],[0,0,width,height,3000]];
    for (const y of [0.5,0.25,0]) {
      regions.push([0,height*y,width,height*0.5,2200]);
    }
    for (const y of [0.5,0.25,0]) for (const x of [0,0.25,0.5]) {
      regions.push([width*x,height*y,width*0.5,height*0.5,1800]);
    }
    let invalid = null;
    for (const region of regions) {
      if(cancelFile) throw new Error('Leximi u anulua.');
      await pause();
      const text = decodeRegion(source,...region);
      if(text) {
        try { return parseImport(text); } catch(e) { invalid=e; }
      }
    }
    if(invalid)throw invalid;
    return null;
  }
  $('scan').onclick = async () => {
    if(scanBusy||running)return;
    scanBusy=true;cancelFile=false;scanControls();
    const token=++cameraToken;
    try {
      requireDecoder();
      if(!window.isSecureContext || !navigator.mediaDevices?.getUserMedia)throw new Error('Kamera kërkon HTTPS dhe lejen e shfletuesit.');
      $('reader').hidden=false;
      video.muted=true;video.autoplay=true;video.playsInline=true;
      video.setAttribute('playsinline','');video.setAttribute('webkit-playsinline','');
      const acquired=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}}});
      if(token!==cameraToken){acquired.getTracks().forEach(t=>t.stop());return;}
      stream=acquired;video.srcObject=stream;
      await video.play();
      if(token!==cameraToken)return;
      running=true;
      message('Kamera është aktive. Afrojeni QR-në, mbajeni të plotë në pamje dhe prisni fokusimin.');
      function tick(){
        if(!running||token!==cameraToken)return;
        try {
          if(video.readyState>=2 && video.videoWidth){
            const w=video.videoWidth,h=video.videoHeight;
            const text=decodeRegion(video,0,0,w,h,1600);
            if(text){
              const items=parseImport(text);stopCamera();stage(items);
              message('QR-ja u lexua. Kontrolloni të dhënat.','success');return;
            }
          }
        }catch(e){stopCamera();message(e.message,'error');return;}
        scanTimer=setTimeout(tick,200);
      }
      tick();
    }catch(e){
      if(token===cameraToken){stopCamera();message('Kamera nuk u hap: '+(e.message||String(e))+'. Provoni ngarkimin e fotos ose PDF-së.','error');}
    }finally{scanBusy=false;scanControls();}
  };
  $('stop').onclick=()=>{cancelFile=true;stopCamera();message('Leximi u ndal.');};
  $('photo').onclick=()=>$('photo-file').click();
  $('photo-file').onchange=async()=>{
    const file=$('photo-file').files[0];if(!file)return;
    stopCamera();scanBusy=true;cancelFile=false;scanControls();
    const url=URL.createObjectURL(file);
    try{
      if(file.size>20000000)throw new Error('Fotoja duhet të jetë më e vogël se 20 MB.');
      message('Po lexohet fotografia…');
      const image=new Image();
      await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(new Error('Formati i fotos nuk u hap. Provoni JPEG ose PNG.'));image.src=url;});
      const items=await scanSurface(image,image.naturalWidth,image.naturalHeight);
      if(!items)throw new Error('Nuk u gjet QR e lexueshme. Provoni screenshot më të qartë ose ngarkoni PDF-në origjinale.');
      stage(items);message('QR-ja u lexua nga fotografia.','success');
    }catch(e){message(e.message||String(e),'error');}
    finally{URL.revokeObjectURL(url);scanBusy=false;scanControls();$('photo-file').value='';}
  };
  $('pdf').onclick=()=>$('pdf-file').click();
  $('pdf-file').onchange=async()=>{
    const file=$('pdf-file').files[0];if(!file)return;
    stopCamera();scanBusy=true;cancelFile=false;scanControls();
    let task=null, doc=null;
    const canvas=document.createElement('canvas');
    try{
      requireDecoder();
      if(file.size>30000000)throw new Error('PDF-ja duhet të jetë më e vogël se 30 MB.');
      message('Po hapet PDF-ja…');
      const pdfjs=await import('./vendor/pdf.mjs');
      pdfjs.GlobalWorkerOptions.workerSrc=new URL('./vendor/pdf.worker.mjs',document.baseURI).href;
      task=pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer()),isEvalSupported:false});
      task.onPassword=()=>{task.destroy();};
      doc=await task.promise;
      if(doc.numPages>100)throw new Error('Lejohen PDF deri në 100 faqe.');
      const found=new Map();let invalidPages=0;
      for(let pageNo=1;pageNo<=doc.numPages;pageNo++){
        if(cancelFile)throw new Error('Leximi u anulua.');
        message(`Po kërkohet QR në faqen ${pageNo} nga ${doc.numPages}…`);
        const page=await doc.getPage(pageNo);
        const base=page.getViewport({scale:1});
        const scale=Math.min(3,3200/Math.max(base.width,base.height));
        const viewport=page.getViewport({scale});
        canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
        const context=canvas.getContext('2d',{willReadFrequently:true});
        await page.render({canvasContext:context,viewport,background:'rgb(255,255,255)'}).promise;
        try{
          const items=await scanSurface(canvas,canvas.width,canvas.height);
          if(items)for(const item of items)found.set(JSON.stringify(item),item);
        }catch(e){if(cancelFile)throw e;invalidPages++;}
        page.cleanup();canvas.width=canvas.height=1;
      }
      if(!found.size)throw new Error(invalidPages?'U gjet QR, por nuk përmban përmbledhje EVION të vlefshme.':'Nuk u gjet QR e lexueshme. Përdorni PDF-në origjinale me QR, jo një fotografi të paqartë.');
      stage([...found.values()]);message(`U lexuan ${found.size} përmbledhje nga PDF-ja. Kontrollojini përpara shtimit.`+(invalidPages?' Disa faqe kishin QR me të dhëna të pavlefshme.':''),'success');
    }catch(e){message('PDF-ja nuk u importua: '+(e.message||String(e)),'error');}
    finally{
      canvas.width=canvas.height=1;
      if(task)await task.destroy().catch(()=>{});
      scanBusy=false;scanControls();$('pdf-file').value='';
    }
  };
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelFile=true;stopCamera();}});
  window.addEventListener('pagehide',stopCamera);
  window.addEventListener('storage',event=>{
    if(event.key!==STORE_KEY)return;
    try{records=loadRecords();refreshFilters();render();renderPreview();}catch(e){message(e.message,'error');}
  });
  try{records=loadRecords();}catch(e){message('Të dhënat e ruajtura nuk u lexuan: '+e.message+' Nuk janë fshirë.','error');}
  refreshFilters();render();
}
