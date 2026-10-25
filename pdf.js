/* Raport narrativ HTML dhe PDF. (C) ルイス */

// =====================================================
// EMRI I PDF-SË
// =====================================================

function pdfFilename(data) {
  return (
    'Evidence_' + data.subject + '_' + data.teacher
  )
    .replace(/[^\p{L}\p{N}_-]/gu, '_')
    .replace(/_+/g, '_')
    .slice(0, 130)
    .replace(/_+$/, '') + '.pdf';
}

// =====================================================
// RAPORTI NARRATIV HTML
// =====================================================

function reportHtml(data, result) {
  const escape = value =>
    String(value ?? '').replace(/[&<>"']/g, character => ({
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

  const formatNumber = value =>
    String(number(value)).replace('.', ',');

  const formatDate = value =>
    value.split('-').reverse().join('.');

  const labels = [
    'Leksion',
    'Seminar',
    'Lab.',
    'Det./Proj.',
    'Praktikë'
  ];

  const title = (
    'Raport_' + data.subject + '_' + data.teacher
  )
    .replace(/[^\p{L}\p{N}_-]/gu, '_')
    .replace(/_+/g, '_')
    .replace(/_+$/, '');

  const regularFont = new URL(
    'fonts/Comfortaa-Regular.ttf',
    document.baseURI
  ).href;

  const boldFont = new URL(
    'fonts/Comfortaa-Bold.ttf',
    document.baseURI
  ).href;

  const creditRows = labels
    .map((label, index) => `
      <tr>
        <td>${label}</td>
        <td class="num">
          ${escape(data.credits[index] || 0)}
        </td>
        <td class="num">
          ${escape(data.groups[index])}
        </td>
      </tr>
    `)
    .join('');

  // Renditja nuk ndryshon regjistrimet origjinale.
  const sortedRows = [...data.rows].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  const weeks = [
    ...new Set(
      data.rows.map(row => number(row.week))
    )
  ].sort((a, b) => a - b);

  const first = sortedRows[0];
  const last = sortedRows[sortedRows.length - 1];

  const introduction = first
    ? `
      <p>
        Lënda <strong>${escape(data.subject)}</strong>
        është zhvilluar në
        <strong>${weeks.length} javë regjistrime mësimore</strong>,
        nga java <strong>${escape(first.week)}</strong>
        më <strong>${formatDate(first.date)}</strong>
        deri në javën <strong>${escape(last.week)}</strong>
        më <strong>${formatDate(last.date)}</strong>.
      </p>
    `
    : `
      <p>Nuk ka regjistrime mësimore.</p>
    `;

  const categoryNames = [
    'Leksionet',
    'Seminaret',
    'Laboratorët',
    'Detyrat/projektet',
    'Praktika'
  ];

  const categorySummary = categoryNames
    .map((label, index) => {
      // Kategoritë me zero kredite nuk shfaqen.
      if (number(data.credits[index]) <= 0) {
        return '';
      }

      return `
        <p>
          <strong>${label}:</strong>
          janë realizuar
          <strong>${formatNumber(result.actual[index])} orë</strong>
          nga
          <strong>${formatNumber(result.expected[index])} orë</strong>
          të përcaktuara sipas krediteve.
        </p>
      `;
    })
    .join('');

  // Bashkon orët e regjistrimeve të së njëjtës datë.
  const hoursByDate = new Map();

  data.rows.forEach(row => {
    const hours = hoursByDate.get(row.date) || [
      0, 0, 0, 0, 0
    ];

    row.hours.forEach((value, index) => {
      hours[index] = sum([hours[index], value]);
    });

    hoursByDate.set(row.date, hours);
  });

  const dailyNames = [
    'leksion',
    'seminar',
    'laborator',
    'detyrë/projekt',
    'praktikë'
  ];

  const overEight = [...hoursByDate.entries()]
    .sort(([dateA], [dateB]) =>
      dateA.localeCompare(dateB)
    )
    .filter(([, hours]) => sum(hours) > 8);

  const dailySummary = overEight.length
    ? overEight
        .map(([date, hours]) => {
          const parts = hours
            .map((value, index) =>
              value > 0
                ? `${formatNumber(value)} orë ${dailyNames[index]}`
                : ''
            )
            .filter(Boolean);

          const detail = parts.length > 1
            ? parts.slice(0, -1).join(', ') +
              ' dhe ' +
              parts[parts.length - 1]
            : parts[0];

          return `
            <p class="over-eight">
              Në datën <strong>${formatDate(date)}</strong>
              janë zhvilluar ${escape(detail)},
              me një total prej
              <strong>${formatNumber(sum(hours))} orësh</strong>.
            </p>
          `;
        })
        .join('')
    : `
      <p>
        Nuk ka data me më shumë se 8 orë mësimore
        të regjistruara.
      </p>
    `;

  const notes = String(data.notes || '')
    .trim()
    .replace(/^\*+\s*/, '');

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

    .narrative {
      margin-top: 24px;
      font-size: 10px;
      line-height: 1.8;
    }

    .narrative h2 {
      margin: 20px 0 10px;
      font-size: 11px;
      color: #4a5281;
      break-after: avoid;
      page-break-after: avoid;
    }

    .narrative p {
      margin: 0 0 10px;
      orphans: 3;
      widows: 3;
    }

    .narrative .total {
      padding-top: 10px;
      border-top: 1px solid #ddd;
    }

    .over-eight {
      color: #b91c1c;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .declaration {
      margin-top: 25px;
    }

    .signature {
      margin-top: 45px;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .signature p {
      margin-top: 10px;
      overflow-wrap: anywhere;
    }

    .notes {
      margin-top: 55px;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      orphans: 3;
      widows: 3;
    }

    /* QR në qendër horizontalisht, pa tekst. */
    .evidence-qr {
      padding: 0;
      margin: 0;
      border: none;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .evidence-qr-image {
      width: 30mm;
      margin: 0 0 0 auto;
    }

    .evidence-qr-image svg {
      display: block;
      width: 100%;
      height: auto;
    }

    @media print {
  html,
  body {
    margin: 0;
    padding: 0;
    background: #fff;
  }

  body {
    font-size: 9px;
    line-height: 1.3;

    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .toolbar {
    display: none !important;
  }

  .preview {
    overflow: visible;
    margin: 0;
    padding: 0;
  }

  .sheet {
    width: auto;
    min-height: 0;
    margin: 0;
    padding: 0;
    box-shadow: none;
  }

  p {
    margin: 0 0 3px;
  }

  h1 {
    margin: 12px 0 8px;
    font-size: 13px;
    line-height: 1.3;
  }

  .top {
    margin-bottom: 10px;
  }

  .plan td,
  .plan th {
    padding: 2px 3px;
  }

  .narrative {
    margin-top: 12px;
    font-size: 9px;
    line-height: 1.4;
  }

  .narrative h2 {
    margin: 10px 0 5px;
    font-size: 10px;
    line-height: 1.3;

    break-after: avoid;
    page-break-after: avoid;
  }

  .narrative p {
    margin: 0 0 5px;
    orphans: 2;
    widows: 2;
  }

  .narrative .total {
    padding-top: 6px;
  }

  .declaration {
    margin-top: 12px;
    line-height: 1.4;
  }

  .signature {
    margin-top: 18px;

    break-inside: avoid;
    page-break-inside: avoid;
  }

  .signature p {
    margin: 5px 0 0;
  }

  .evidence-qr {
    margin: 0;
    padding: 0;
    border: none;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .evidence-qr-image {
    width: 30mm;
    margin: 0 0 0 auto;
  }

  .evidence-qr-image svg {
    display: block;
    width: 100%;
    height: auto;
  }

  .notes {
    margin-top: 12px;
    font-size: 8px;
    line-height: 1.35;

    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  .over-eight {
    color: #b91c1c !important;

    break-inside: avoid;
    page-break-inside: avoid;
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
        RAPORT I NGARKESËS MËSIMORE ${escape(data.year)}
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

      <section class="narrative">
        <h2>Përmbledhje e zhvillimit të lëndës</h2>

        ${introduction}

        <h2>Ngarkesa mësimore e realizuar</h2>

        ${categorySummary}

        <p class="total">
          Në total janë realizuar
          <strong>${formatNumber(sum(result.actual))} orë</strong>
          nga
          <strong>${formatNumber(sum(result.expected))} orë</strong>
          të përcaktuara sipas krediteve dhe grupeve.
        </p>

        <h2>Datat me më shumë se 8 orë mësimore</h2>

        ${dailySummary}
      </section>

      <p class="declaration">
        Deklaroj se të dhënat e paraqitura në këtë raport
        pasqyrojnë ngarkesën mësimore të realizuar prej meje.
      </p>

      <div class="signature">
        DEKLARUES
        <p>${escape(data.teacher)}</p>

        ${evidenceQrHtml(data, result)}
      </div>

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

  if (
    !data ||
    !serialized ||
    serialized.length > 500000
  ) {
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

      if (
        !storedKey ||
        !storedKey.startsWith(prefix)
      ) {
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
// PËRMBAJTJA E PDF-SË TABELORE ME PDFMAKE
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

      {
        text: row.topic
      },

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

    ...result.expected.map(value =>
      cell(value)
    ),

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
      {
        text: label
      },

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

    pageMargins: [
      margin,
      margin,
      margin,
      margin
    ],

    info: {
      title: pdfFilename(data).replace(/\.pdf$/i, ''),
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

      // Deklarata, firmat dhe QR-ja qëndrojnë së bashku.
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
          },

          // QR në qendër të gjerësisë së faqes, pa tekst.
          {
            qr: evidenceQrText(data, result),
            eccLevel: 'M',
            fit: 84,
            foreground: '#1a1a1a',
            background: '#ffffff',
            alignment: 'left',
            margin: [0, 20, 0, 0]
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
              {
                type: 'application/pdf'
              }
            )
          );
        });
    } catch (error) {
      clearTimeout(timer);
      reject(error);
    }
  });
}

// =====================================================
// QR — TË DHËNAT PËRMBLEDHËSE TË EVIDENCËS
// =====================================================

function evidenceQrData(data, result) {
  const number = value =>
    Number(
      String(value ?? 0).trim().replace(',', '.')
    );

  const round = value =>
    Math.round(value * 1000000) / 1000000;

  const cleanText = value =>
    String(value ?? '').trim().normalize('NFC');

  // Maksimumi merret një herë nga e gjithë evidenca.
  const students = Math.max(
    0,
    ...data.rows.map(row => number(row.students))
  );

  const categoryCodes = [
    'leksione',
    'seminare',
    'laboratore',
    'detyra',
    'praktika'
  ];

  const categories = [];

  categoryCodes.forEach((code, index) => {
    const credits = number(data.credits[index]);

    // Kategoritë me zero kredite nuk përfshihen.
    if (!(credits > 0)) return;

    categories.push({
      code,
      credits: round(credits),
      students,
      groups: number(data.groups[index]),

      // Orët faktike nuk shumëzohen përsëri me grupet.
      hours: round(result.actual[index])
    });
  });

  return {
    type: 'evion-summary',
    version: 1,

    teacher: cleanText(data.teacher),
    subject: cleanText(data.subject),
    program: cleanText(data.program),

    year: cleanText(data.year),
    semester: cleanText(data.semester).toUpperCase(),
    cycle: number(data.cycle),

    students,
    categories
  };
}

// =====================================================
// QR — SERIALIZIMI NË JSON
// =====================================================

function evidenceQrText(data, result) {
  const summary = evidenceQrData(data, result);

  /*
    Përdorim karaktere ASCII brenda QR-së.
    Shkronjat shqipe rikthehen nga JSON.parse().
  */
  const serialized = JSON.stringify(summary).replace(
    /[\u007f-\uffff]/g,
    character =>
      '\\u' +
      character
        .charCodeAt(0)
        .toString(16)
        .padStart(4, '0')
  );

  // Nuk shkurtojmë ose humbasim të dhëna.
  if (serialized.length > 2200) {
    throw new Error(
      'Përmbledhja është tepër e gjatë për QR-në. ' +
      'Shkurtoni emërtimet e gjata të lëndës, programit ' +
      'ose pedagogut dhe provoni përsëri.'
    );
  }

  return serialized;
}

// =====================================================
// QR — PARAQITJA NË RAPORTIN HTML
// =====================================================

function evidenceQrHtml(data, result) {
  if (typeof qrcode !== 'function') {
    throw new Error(
      'Biblioteka QR nuk u ngarkua. Kontrolloni ' +
      'lidhjen e qrcode.js te raporti.html.'
    );
  }

  const qr = qrcode(0, 'M');

  qr.addData(
    evidenceQrText(data, result),
    'Byte'
  );

  qr.make();

  // Hapësira e bardhë rreth QR-së ruhet për skanimin.
  const svg = qr.createSvgTag({
    cellSize: 2,
    margin: 8,
    scalable: true
  });

  return `
    <div class="evidence-qr">
      <div class="evidence-qr-image">
        ${svg}
      </div>
    </div>
  `;
}
