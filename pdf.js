/* Raport A4 në skedë të re, pa pdfmake. */

function pdfFilename(data) {
  return (
    'Evidenca_' + data.subject + '_' + data.teacher
  )
    .replace(/[^\p{L}\p{N}_-]/gu, '_')
    .slice(0, 130) + '.pdf';
}

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
      <td class="num">
        ${escape(data.credits[index] || 0)}
      </td>
      <td class="num">
        ${escape(data.groups[index])}
      </td>
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

    .toolbar button {
      padding: 11px 18px;
      border: 0;
      border-radius: 7px;
      background: #4a5281;
      color: #fff;
      font: inherit;
      cursor: pointer;
    }

    .toolbar button:disabled {
      opacity: 0.5;
      cursor: wait;
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
      margin-top: 30px;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .signature td {
      width: 50%;
    }

    .signature p {
      margin-top: 5px;
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
      <button id="print-button" type="button" disabled>
        Printo / Ruaj PDF
      </button>

      <p id="print-status" role="status">
        Po përgatitet dokumenti…
      </p>

      <p>
        Për ta ruajtur, zgjidhni “Save as PDF” në
        dritaren e printimit. Përdorni A4 dhe orientim vertikal.
      </p>

      <p>
        Kur të përfundoni, mbylleni këtë skedë për
        t’u kthyer te formulari.
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

      <table class="signature">
        <tbody>
          <tr>
            <td>
              PEDAGOG/E
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

// Hap raportin. Nuk thërret printimin automatikisht.
function printReport(data) {
  if (!data || JSON.stringify(data).length > 500000) {
    throw new Error(
      'Formulari mungon ose është shumë i madh.'
    );
  }

  const result = evaluate_(data);

  if (result.errors.length) {
    throw new Error(result.errors.join('\n'));
  }

  // Ky kod ekzekutohet vetëm brenda skedës së raportit.
  const reportScript = `
    <script>
      (() => {
        const button =
          document.getElementById('print-button');

        const status =
          document.getElementById('print-status');

        let printing = false;

        button.type = 'button';

        button.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();

          if (printing) return;

          printing = true;

          try {
            // Printo vetëm dokumentin e kësaj skede.
            window.print();
          } finally {
            printing = false;
          }
        });

        function enablePrint(message) {
          button.disabled = false;
          status.textContent = message;
        }

        async function prepareReport() {
          let timer;

          try {
            if (document.fonts) {
              const fonts = await Promise.race([
                Promise.all([
                  document.fonts.load('400 9px "Comfortaa"'),
                  document.fonts.load('700 14px "Comfortaa"')
                ]),

                new Promise((_, reject) => {
                  timer = setTimeout(() => {
                    reject(new Error('Fonti nuk u ngarkua.'));
                  }, 10000);
                })
              ]);

              if (!fonts.every(list => list.length > 0)) {
                throw new Error('Fonti mungon.');
              }
            }

            enablePrint(
              'Dokumenti është gati. Shtypni “Printo / Ruaj PDF”. ' +
              'Pas përfundimit mund ta mbyllni këtë skedë.'
            );
          } catch {
            enablePrint(
              'Comfortaa nuk u ngarkua. Mund të printoni ' +
              'me fontin rezervë ose ta rihapni raportin.'
            );
          } finally {
            clearTimeout(timer);
          }
        }

        prepareReport();
      })();
    <\/script>
  `;

  const html = reportHtml(data, result).replace(
    '</body>',
    reportScript + '\n</body>'
  );

  // Dokument i pavarur: nuk përdor document.write().
  const blob = new Blob(
    [html],
    { type: 'text/html;charset=utf-8' }
  );

  const reportUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = reportUrl;
  link.target = '_blank';

  // Raporti nuk ka lidhje window.opener me formularin.
  link.rel = 'noopener noreferrer';

  document.body.appendChild(link);
  link.click();
  link.remove();

  // Lë kohë për ngarkimin e raportit përpara lirimit të URL-së.
  setTimeout(() => {
    URL.revokeObjectURL(reportUrl);
  }, 600000);
}
