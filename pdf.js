/* Raporti HTML dhe PDF A4 me pdfmake / Comfortaa. */

function pdfFilename(data) {
  return (
    'Evidenca_' + data.subject + '_' + data.teacher
  )
    .replace(/[^\p{L}\p{N}_-]/gu, '_')
    .slice(0, 130) + '.pdf';
}


// =====================================================
// RAPORTI HTML
// =====================================================

function reportHtml(data, result) {
  const escape = value => String(value ?? '')
    .replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[character]));

  const number = value =>
    Number(String(value || 0).replace(',', '.'));

  const sum = values =>
    Math.round(
      values.reduce(
        (total, value) => total + number(value),
        0
      ) * 1000000
    ) / 1000000;

  const labels = [
    'Leksion',
    'Seminar',
    'Lab.',
    'Det./Proj.',
    'Praktikë'
  ];

  const regularFont = new URL(
    'fonts/Comfortaa-Regular.ttf',
    document.baseURI
  ).href;

  const boldFont = new URL(
    'fonts/Comfortaa-Bold.ttf',
    document.baseURI
  ).href;

  const cells = values => values.map(value => `
    <td class="num">${escape(value)}</td>
  `).join('');

  const creditRows = labels.map((label, index) => `
    <tr>
      <td>${label}</td>
      <td class="num">${escape(data.credits[index] || 0)}</td>
      <td class="num">${escape(data.groups[index])}</td>
    </tr>
  `).join('');

  const lessonRows = data.rows.map(row => `
    <tr>
      <td class="num">
        ${escape(row.week)}${row.replacement ? ' *' : ''}
      </td>

      <td class="date">
        ${escape(row.date.split('-').reverse().join('.'))}
      </td>

      <td class="num">${escape(row.students)}</td>

      <td class="topic">${escape(row.topic)}</td>

      ${cells(
        row.hours.map(value => number(value) || '')
      )}

      <td class="num daily-total">
        ${sum(row.hours)}
      </td>
    </tr>
  `).join('');

  const notes = String(data.notes || '')
    .trim()
    .replace(/^\*+\s*/, '');

  const title = pdfFilename(data).replace(/\.pdf$/i, '');

  return `
<!doctype html>
<html lang="sq">
<head>
  <meta charset="utf-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  >

  <title>${escape(title)}</title>

  <style>
    @font-face {
      font-family: "Comfortaa";
      src: url("${escape(regularFont)}") format("truetype");
      font-weight: 400;
      font-style: normal;
    }

    @font-face {
      font-family: "Comfortaa";
      src: url("${escape(boldFont)}") format("truetype");
      font-weight: 700;
      font-style: normal;
    }

    @page {
      size: A4 portrait;
      margin: 10mm 7mm;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    html {
      background: #f1eef4;
    }

    body {
      margin: 0;
      color: #171717;
      font-family: "Comfortaa", Arial, sans-serif;
      font-size: 9px;
      font-weight: 400;
      line-height: 1.4;
    }

    .toolbar {
      padding: 14px 18px;
      background: #fff;
      border-bottom: 1px solid #ded3e6;
      font-family: Arial, sans-serif;
      font-size: 14px;
    }

    .toolbar-inner {
      max-width: 196mm;
      margin: auto;
    }

    .toolbar p {
      margin: 10px 0 0;
      line-height: 1.5;
    }

    .preview {
      overflow-x: auto;
      padding: 20px 12px;
    }

    .sheet {
      width: 210mm;
      min-height: 297mm;
      margin: auto;
      padding: 10mm 7mm;
      background: #fff;
      box-shadow: 0 3px 18px #00000012;
    }

    p {
      margin: 0 0 5px;
    }

    h1 {
      margin: 22px 0 12px;
      font-size: 14px;
      font-weight: 700;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    td,
    th {
      padding: 6px 3px;
      vertical-align: top;
      overflow-wrap: anywhere;
    }

    th {
      font-weight: 400;
      text-align: left;
    }

    thead {
      display: table-header-group;
    }

    tr {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .num {
      text-align: center;
    }

    .date {
      text-align: center;
      white-space: nowrap;
    }

    .topic {
      white-space: pre-wrap;
    }

    .top {
      margin-bottom: 18px;
    }

    .top > tbody > tr > td {
      padding: 0 3px;
    }

    .metadata {
      width: 66%;
    }

    .plan-container {
      width: 34%;
    }

    .plan td,
    .plan th {
      padding: 3px;
    }

    .plan th {
      background: #eee;
      text-align: center;
    }

    .credits-total td {
      background: #f2f2f2;
      font-weight: 700;
    }

    .data td {
      border-bottom: 1px solid #e3e3e3;
    }

    .data thead th {
      background: #eee;
      color: #222;
      text-align: center;
      vertical-align: middle;
      font-size: 8.5px;
      white-space: nowrap;
      overflow-wrap: normal;
    }

    .data thead tr:first-child th {
      padding: 7px 3px 3px;
    }

    .data thead tr:last-child th {
      padding: 7px 3px 9px;
      border-bottom: 1px solid #999;
    }

    .data .daily-total,
    .data thead .daily-total {
      font-weight: 700;
    }

    .data .total td {
      background: #eee;
      font-weight: 700;
    }

    .data .expected td {
      font-weight: 400;
    }

    .signature {
      margin-top: 45px;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .signature td {
      width: 50%;
    }

    .signature p {
      margin-top: 10px;
    }

    .signature .head {
      text-align: right;
    }

    .notes {
      margin-top: 55px;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      orphans: 3;
      widows: 3;
    }

    @media print {
      html,
      body {
        background: #fff;
      }

      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .toolbar {
        display: none;
      }

      .preview {
        overflow: visible;
        padding: 0;
      }

      .sheet {
        width: auto;
        min-height: 0;
        margin: 0;
        padding: 0;
        box-shadow: none;
      }
    }
  </style>
</head>

<body>
  <div class="toolbar">
    <div class="toolbar-inner">
      <strong>Printimi / Ruajtja si PDF</strong>

      <p>
        Përdorni ⌘P në Mac, Ctrl+P në Windows
        ose menunë File → Print.
      </p>

      <p id="print-status" role="status">
        Po përgatitet dokumenti…
      </p>
    </div>
  </div>

  <div class="preview">
    <main class="sheet">
      <p>${escape(data.university)}</p>
      <p>${escape(data.faculty)}</p>
      <p>${escape(data.department)}</p>

      <h1>
        EVIDENCË E NGARKESËS MËSIMORE ${escape(data.year)}
      </h1>

      <table class="top">
        <tbody>
          <tr>
            <td class="metadata">
              <p>LËNDA: ${escape(data.subject)}</p>
              <p>PROGRAMI: ${escape(data.program)}</p>
              <p>CIKLI: ${escape(data.cycle)}</p>
              <p>
                SEMESTRI:
                ${escape(String(data.semester).toUpperCase())}
              </p>
            </td>

            <td class="plan-container">
              <table class="plan">
                <colgroup>
                  <col style="width:46%">
                  <col style="width:27%">
                  <col style="width:27%">
                </colgroup>

                <thead>
                  <tr>
                    <th></th>
                    <th>ECTS</th>
                    <th>Grupe</th>
                  </tr>
                </thead>

                <tbody>
                  ${creditRows}

                  <tr class="credits-total">
                    <td>ECTS tot.</td>
                    <td class="num">
                      ${escape(result.totalCredits)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="data">
        <colgroup>
          <col style="width:5%">
          <col style="width:11%">
          <col style="width:6%">
          <col style="width:34%">
          <col style="width:7%">
          <col style="width:7%">
          <col style="width:7%">
          <col style="width:7%">
          <col style="width:7%">
          <col style="width:9%">
        </colgroup>

        <thead>
          <tr>
            <th colspan="4"></th>
            <th colspan="5">Orë faktike</th>
            <th></th>
          </tr>

          <tr>
            <th>Java</th>
            <th>Data</th>
            <th>Nr. Std.</th>
            <th>Tema e mësimit</th>

            ${labels.map(label => `
              <th>${label}</th>
            `).join('')}

            <th class="daily-total">Shuma / dt.</th>
          </tr>
        </thead>

        <tbody>
          ${lessonRows}

          <tr class="total">
            <td colspan="4">Shuma totale</td>
            ${cells(result.actual)}
            <td class="num">${sum(result.actual)}</td>
          </tr>

          <tr class="expected">
            <td colspan="4">
              Shuma sipas krediteve dhe grupeve për
              ngarkesën sipas parashikimit.
            </td>

            ${cells(result.expected)}

            <td class="num">${sum(result.expected)}</td>
          </tr>
        </tbody>
      </table>

      <p style="margin-top: 25px;">
        Deklaroj se të dhënat e paraqitura në këtë evidencë
        pasqyrojnë ngarkesën mësimore të realizuar prej meje.
      </p>

      <table class="signature">
        <tbody>
          <tr>
            <td>
              DEKLARUES
              <p>${escape(data.teacher)}</p>
            </td>

            <td class="head">
              DREJTUES DEPARTAMENTI
              <p>${escape(data.head)}</p>
            </td>
          </tr>
        </tbody>
      </table>

      ${notes ? `
        <p class="notes">* ${escape(notes)}</p>
      ` : ''}
    </main>
  </div>
</body>
</html>
  `;
}


// =====================================================
// HAPJA E RAPORTIT HTML
// =====================================================

function printReport(data) {
  const serialized = JSON.stringify(data);

  if (!data || !serialized || serialized.length > 500000) {
    throw new Error(
      'Formulari mungon ose është shumë i madh.'
    );
  }

  const result = evaluate_(data);

  if (result.errors.length) {
    throw new Error(result.errors.join('\n'));
  }

  const prefix = 'evion-report-transfer-';
  const now = Date.now();
  const lifetime = 15 * 60 * 1000;

  const id = crypto.randomUUID();
  const key = prefix + id;

  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const storedKey = localStorage.key(i);

      if (!storedKey || !storedKey.startsWith(prefix)) {
        continue;
      }

      try {
        const item = JSON.parse(
          localStorage.getItem(storedKey)
        );

        if (
          !item ||
          !Number.isFinite(item.createdAt) ||
          now - item.createdAt > lifetime
        ) {
          localStorage.removeItem(storedKey);
        }
      } catch {
        localStorage.removeItem(storedKey);
      }
    }

    localStorage.setItem(
      key,
      JSON.stringify({
        createdAt: now,
        data: JSON.parse(serialized)
      })
    );
  } catch {
    throw new Error(
      'Shfletuesi nuk lejoi ruajtjen e përkohshme të raportit. ' +
      'Kontrolloni cilësimet e ruajtjes për këtë faqe.'
    );
  }

  const reportUrl = new URL(
    'raporti.html',
    document.baseURI
  );

  reportUrl.hash = id;

  const link = document.createElement('a');

  link.href = reportUrl.href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  document.body.appendChild(link);
  link.click();
  link.remove();
}


// =====================================================
// PËRMBAJTJA E PDF-SË ME PDFMAKE
// =====================================================

function reportDefinition(data, result) {
  const num = value =>
    Number(String(value || 0).replace(',', '.'));

  const sum = values =>
    Math.round(
      values.reduce(
        (total, value) => total + num(value),
        0
      ) * 1000000
    ) / 1000000;

  const labels = [
    'Leksion',
    'Seminar',
    'Lab.',
    'Det./Proj.',
    'Praktikë'
  ];

  const text = value =>
    String(value == null ? '' : value);

  const cell = (value, extra = {}) => ({
    text: text(value),
    alignment: 'center',
    ...extra
  });

  const head = (value, extra = {}) =>
    cell(value, {
      fillColor: '#eeeeee',
      margin: [0, 3, 0, 3],
      ...extra
    });

  const body = [
    [
      head('', { colSpan: 4 }),
      {},
      {},
      {},
      head('Orë faktike', { colSpan: 5 }),
      {},
      {},
      {},
      {},
      head('')
    ],

    [
      'Java',
      'Data',
      'Nr. Std.',
      'Tema e mësimit',
      ...labels,
      'Shuma / dt.'
    ].map((label, index) =>
      head(label, { bold: index === 9 })
    )
  ];

  data.rows.forEach(row => {
    body.push([
      cell(
        text(row.week) +
        (row.replacement ? ' *' : '')
      ),

      cell(
        row.date.split('-').reverse().join('.')
      ),

      cell(row.students),

      { text: row.topic },

      ...row.hours.map(value =>
        cell(num(value) || '')
      ),

      cell(sum(row.hours), {
        bold: true
      })
    ]);
  });

  const totalIndex = body.length;

  body.push([
    {
      text: 'Shuma totale',
      colSpan: 4,
      bold: true
    },
    {},
    {},
    {},

    ...result.actual.map(value =>
      cell(value, { bold: true })
    ),

    cell(sum(result.actual), {
      bold: true
    })
  ]);

  body.push([
    {
      text:
        'Shuma sipas krediteve dhe grupeve për ' +
        'ngarkesën sipas parashikimit.',
      colSpan: 4
    },
    {},
    {},
    {},

    ...result.expected.map(value => cell(value)),

    cell(sum(result.expected))
  ]);

  const pageWidth = 595.28;
  const margin = 31.18;
  const contentWidth = pageWidth - 2 * margin;

  const widths = [
    5, 11, 6, 34, 7, 7, 7, 7, 7, 9
  ].map(percentage =>
    (contentWidth - 40) * percentage / 100
  );

  const plan = [
    [
      head(''),
      head('ECTS'),
      head('Grupe')
    ],

    ...labels.map((label, index) => [
      { text: label },
      cell(data.credits[index] || 0),
      cell(data.groups[index])
    ]),

    [
      {
        text: 'ECTS tot.',
        bold: true,
        fillColor: '#f2f2f2'
      },

      cell(result.totalCredits, {
        bold: true,
        fillColor: '#f2f2f2'
      }),

      {
        text: '',
        fillColor: '#f2f2f2'
      }
    ]
  ];

  const definition = {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    pageMargins: [margin, margin, margin, margin],

    info: {
      title:
        'Evidencë e ngarkesës mësimore — ' +
        data.subject,
      author: data.teacher
    },

    defaultStyle: {
      font: 'Comfortaa',
      fontSize: 7,
      color: '#171717',
      lineHeight: 1.15
    },

    content: [
      {
        text: data.university,
        margin: [0, 0, 0, 4]
      },
      {
        text: data.faculty,
        margin: [0, 0, 0, 4]
      },
      {
        text: data.department,
        margin: [0, 0, 0, 4]
      },

      {
        text:
          'EVIDENCË E NGARKESËS MËSIMORE ' +
          data.year,
        fontSize: 11,
        bold: true,
        margin: [0, 16, 0, 10]
      },

      {
        columns: [
          {
            width: '66%',
            stack: [
              {
                text: 'LËNDA: ' + data.subject,
                margin: [0, 0, 0, 5]
              },
              {
                text: 'PROGRAMI: ' + data.program,
                margin: [0, 0, 0, 5]
              },
              {
                text: 'CIKLI: ' + data.cycle,
                margin: [0, 0, 0, 5]
              },
              {
                text:
                  'SEMESTRI: ' +
                  String(data.semester).toUpperCase()
              }
            ]
          },

          {
            width: '34%',

            table: {
              headerRows: 1,
              widths: ['46%', '27%', '27%'],
              body: plan
            },

            layout: {
              hLineWidth: () => 0,
              vLineWidth: () => 0,
              paddingLeft: () => 2,
              paddingRight: () => 2,
              paddingTop: () => 2,
              paddingBottom: () => 2
            }
          }
        ]
      },

      {
        margin: [0, 14, 0, 0],

        table: {
          headerRows: 2,
          keepWithHeaderRows: 1,
          dontBreakRows: true,
          widths,
          body
        },

        layout: {
          hLineWidth: index =>
            index >= 2 ? 0.4 : 0,

          vLineWidth: () => 0,

          hLineColor: index =>
            index === 2 ? '#999999' : '#e3e3e3',

          paddingLeft: () => 2,
          paddingRight: () => 2,
          paddingTop: () => 4,
          paddingBottom: () => 4,

          fillColor: index =>
            index === totalIndex ? '#eeeeee' : null
        }
      },

      // Vetëdeklarimi dhe firmat, pa vijë nën emrin.
      {
        unbreakable: true,
        margin: [0, 23, 0, 0],

        stack: [
          {
            text:
              'Deklaroj se të dhënat e paraqitura në këtë evidencë ' +
              'pasqyrojnë ngarkesën mësimore të realizuar prej meje.',
            margin: [0, 0, 0, 30]
          },

          {
            columns: [
              {
                width: '50%',

                stack: [
                  {
                    text: 'DEKLARUES'
                  },
                  {
                    text: data.teacher,
                    margin: [0, 5, 8, 0]
                  }
                ]
              },

              {
                width: '50%',
                alignment: 'right',

                stack: [
                  {
                    text: 'DREJTUES DEPARTAMENTI'
                  },
                  {
                    text: data.head,
                    margin: [0, 5, 0, 0]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  const notes = text(data.notes)
    .trim()
    .replace(/^\*+\s*/, '');

  if (notes) {
    definition.content.push({
      text: '* ' + notes,
      margin: [0, 41, 0, 0]
    });
  }

  return definition;
}


// =====================================================
// GJENERIMI I PDF-SË — PDFMAKE 0.2.20
// =====================================================

async function generatePdfBlob(data) {
  if (
    !data ||
    JSON.stringify(data).length > 500000
  ) {
    throw new Error(
      'Formulari mungon ose është shumë i madh.'
    );
  }

  const result = evaluate_(data);

  if (result.errors.length) {
    throw new Error(result.errors.join('\n'));
  }

  if (typeof pdfMake === 'undefined') {
    throw new Error(
      'Gjeneruesi i PDF-së nuk u ngarkua. ' +
      'Kontrolloni vendor/pdfmake.min.js.'
    );
  }

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(
        new Error(
          'Gjenerimi zgjati shumë. ' +
          'Rifreskoni dhe provoni përsëri.'
        )
      );
    }, 60000);

    try {
      pdfMake
        .createPdf(reportDefinition(data, result))
        .getBuffer(bytes => {
          clearTimeout(timer);

          resolve(
            new Blob(
              [bytes],
              { type: 'application/pdf' }
            )
          );
        });
    } catch (error) {
      clearTimeout(timer);
      reject(error);
    }
  });
}
