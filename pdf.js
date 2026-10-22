/* PDF A4 me tekst të përzgjedhshëm dhe font Comfortaa të përfshirë. */
function pdfFilename(data) {
  return ('Evidenca_' + data.subject + '_' + data.teacher)
    .replace(/[^\p{L}\p{N}_-]/gu, '_').slice(0, 130) + '.pdf';
}
function reportDefinition(data, result) {
  const num = v => Number(String(v || 0).replace(',', '.'));
  const sum = list => Math.round(list.reduce((a,v) => a + num(v), 0) * 1e6) / 1e6;
  const labels = ['Leksion','Seminar','Lab.','Det./Proj.','Praktikë'];
  const text = value => String(value == null ? '' : value);
  const cell = (v, extra={}) => ({text:text(v), alignment:'center', ...extra});
  const head = (v, extra={}) => cell(v, {fillColor:'#eeeeee', margin:[0,3,0,3], ...extra});
  const body = [
    [head('',{colSpan:4}),{},{},{},head('Orë faktike',{colSpan:5}),{},{},{},{},head('')],
    ['Java','Data','Nr. Std.','Tema e mësimit',...labels,'Shuma / dt.'].map((s,i) => head(s,{bold:i===9}))
  ];
  data.rows.forEach(row => body.push([
    cell(text(row.week) + (row.replacement ? ' *' : '')),
    cell(row.date.split('-').reverse().join('.')),
    cell(row.students), {text:row.topic},
    ...row.hours.map(v => cell(num(v) || '')),
    cell(sum(row.hours),{bold:true})
  ]));
  const totalIndex = body.length;
  body.push([
    {text:'Shuma totale',colSpan:4,bold:true},{},{},{},
    ...result.actual.map(v => cell(v,{bold:true})),cell(sum(result.actual),{bold:true})
  ]);
  body.push([
    {text:'Shuma sipas krediteve dhe grupeve për ngarkesën sipas parashikimit.',colSpan:4},{},{},{},
    ...result.expected.map(v=>cell(v)),cell(sum(result.expected))
  ]);
  const pageWidth = 595.28, margin = 31.18;
  const contentWidth = pageWidth - 2*margin;
  const widths = [5,11,6,34,7,7,7,7,7,9].map(p => (contentWidth - 40)*p/100);
  const plan = [
    [head(''),head('ECTS'),head('Grupe')],
    ...labels.map((s,i)=>[{text:s},cell(data.credits[i] || 0),cell(data.groups[i])]),
    [{text:'ECTS tot.',bold:true,fillColor:'#f2f2f2'},cell(result.totalCredits,{bold:true,fillColor:'#f2f2f2'}),{text:'',fillColor:'#f2f2f2'}]
  ];
  const definition = {
    pageSize:'A4', pageOrientation:'portrait', pageMargins:[margin,margin,margin,margin],
    info:{title:'Evidencë e ngarkesës mësimore — '+data.subject,author:data.teacher},
    defaultStyle:{font:'Comfortaa',fontSize:7,color:'#171717',lineHeight:1.15},
    content:[
      {text:data.university,margin:[0,0,0,4]},
      {text:data.faculty,margin:[0,0,0,4]},
      {text:data.department,margin:[0,0,0,4]},
      {text:'EVIDENCË E NGARKESËS MËSIMORE '+data.year,fontSize:11,bold:true,margin:[0,16,0,10]},
      {columns:[
        {width:'66%',stack:[
          {text:'LËNDA: '+data.subject,margin:[0,0,0,5]},
          {text:'PROGRAMI: '+data.program,margin:[0,0,0,5]},
          {text:'CIKLI: '+data.cycle,margin:[0,0,0,5]},
          {text:'SEMESTRI: '+String(data.semester).toUpperCase()}
        ]},
        {width:'34%',table:{headerRows:1,widths:['46%','27%','27%'],body:plan},layout:{
          hLineWidth:()=>0,vLineWidth:()=>0,paddingLeft:()=>2,paddingRight:()=>2,paddingTop:()=>2,paddingBottom:()=>2
        }}
      ]},
      {margin:[0,14,0,0],table:{headerRows:2,keepWithHeaderRows:1,dontBreakRows:true,widths,body},layout:{
        hLineWidth:i=>i>=2?0.4:0,vLineWidth:()=>0,
        hLineColor:i=>i===2?'#999999':'#e3e3e3',
        paddingLeft:()=>2,paddingRight:()=>2,paddingTop:()=>4,paddingBottom:()=>4,
        fillColor:i=>i===totalIndex?'#eeeeee':null
      }},
      {unbreakable:true,margin:[0,23,0,0],columns:[
        {width:'50%',stack:[{text:'PEDAGOG/E'},{text:data.teacher,margin:[0,5,0,0]}]},
        {width:'50%',alignment:'right',stack:[{text:'DREJTUES DEPARTAMENTI'},{text:data.head,margin:[0,5,0,0]}]}
      ]}
    ]
  };
  const notes = text(data.notes).trim().replace(/^\*+\s*/, '');
  if (notes) definition.content.push({text:'* '+notes,margin:[0,41,0,0]});
  return definition;
}
async function generatePdfBlob(data) {
  if (!data || JSON.stringify(data).length > 500000) throw new Error('Formulari mungon ose është shumë i madh.');
  const result = evaluate_(data);
  if (result.errors.length) throw new Error(result.errors.join('\n'));
  if (typeof pdfMake === 'undefined') throw new Error('Gjeneruesi i PDF-së nuk u ngarkua. Rifreskoni faqen.');
  // getBuffer with a callback is the API of the bundled pdfmake 0.2.20.
  return new Promise((resolve,reject) => {
    const timer = setTimeout(()=>reject(new Error('Gjenerimi zgjati shumë. Rifreskoni dhe provoni përsëri.')),60000);
    try {
      pdfMake.createPdf(reportDefinition(data,result)).getBuffer(bytes => {
        clearTimeout(timer);
        resolve(new Blob([bytes],{type:'application/pdf'}));
      });
    } catch(error) { clearTimeout(timer); reject(error); }
  });
}
