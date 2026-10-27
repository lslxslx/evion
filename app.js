/* (C) ルイス */
let _0x4c95a;
const $ = id => document['\u0067\u0065\u0074\u0045\u006C\u0065\u006D\u0065\u006E\u0074\u0042\u0079\u0049\u0064'](id);
_0x4c95a = 249510 ^ 249510;
let _0x9a23a;
const labels = ["\u004C\u0065\u006B\u0073\u0069\u006F\u006E", "\u0053\u0065\u006D\u0069\u006E\u0061\u0072", 'Laborator', 'Detyrë/projekt', 'Praktikë'];
_0x9a23a = (267262 ^ 267255) + (987394 ^ 987398);
const institution = {
  "university": 'UNIVERSITETI POLITEKNIK I TIRANËS',
  "faculty": 'FAKULTETI I GJEOLOGJISË DHE I MINIERAVE',
  "department": 'DEPARTAMENTI I GJEOLOGJISË SË ZBATUAR DHE I GJEOINFORMATIKËS'
};
const fields = [["\u0074\u0065\u0061\u0063\u0068\u0065\u0072", "\u0050\u0065\u0064\u0061\u0067\u006F\u0067\u002F\u0065\u0020\u0028\u0074\u0069\u0074\u0075\u006C\u006C\u0069\u002F\u0067\u0072\u0061\u0064\u0061\u0020\u0064\u0068\u0065\u0020\u0065\u006D\u0072\u0069\u0029", ''], ['head', "\u0044\u0072\u0065\u006A\u0074\u0075\u0065\u0073\u0069\u0020\u0069\u0020\u0064\u0065\u0070\u0061\u0072\u0074\u0061\u006D\u0065\u006E\u0074\u0069\u0074", "\u0050\u0072\u006F\u0066\u002E\u0020\u0041\u0073\u006F\u0063\u002E\u0020\u0044\u0072\u002E\u0020\u004C\u0075\u0069\u0073\u0020\u004C\u0061\u006D\u0061\u006E\u0069"], ["\u0073\u0075\u0062\u006A\u0065\u0063\u0074", 'Lënda', ''], ["\u0070\u0072\u006F\u0067\u0072\u0061\u006D", "\u0050\u0072\u006F\u0067\u0072\u0061\u006D\u0069\u0020\u0069\u0020\u0073\u0074\u0075\u0064\u0069\u006D\u0069\u0074", ''], ["\u0079\u0065\u0061\u0072", "\u0056\u0069\u0074\u0069\u0020\u0061\u006B\u0061\u0064\u0065\u006D\u0069\u006B", '2026-2027'], ['semester', 'Semestri', 'I/II'], ["\u0063\u0079\u0063\u006C\u0065", "\u0043\u0069\u006B\u006C\u0069", "\u0031"], ['start', "\u0044\u0061\u0074\u0061\u0020\u0065\u0020\u0066\u0069\u006C\u006C\u0069\u006D\u0069\u0074\u0020\u0074\u00EB\u0020\u0073\u0065\u006D\u0065\u0073\u0074\u0072\u0069\u0074", '']];
let _0xgf3dca;
const MAX_ROWS = 103861 ^ 103889;
_0xgf3dca = (717691 ^ 717695) + (645724 ^ 645727);
var _0x6a477e = (867255 ^ 867251) + (820826 ^ 820826);
const reportButton = $("\u0070\u0064\u0066");
_0x6a477e = '\u006B\u006D\u0070\u006E\u0063\u006F';
const printPdfButton = $('print-pdf');
let _0x88edad;
let dirty = false;
_0x88edad = 709517 ^ 709517;
let verified = false;
let pdfBusy = false;
let _0xef4db;
let formRevision = 478332 ^ 478332;
_0xef4db = (539834 ^ 539833) + (149291 ^ 149294);
reportButton['\u0074\u0079\u0070\u0065'] = 'button';
reportButton['\u0074\u0065\u0078\u0074\u0043\u006F\u006E\u0074\u0065\u006E\u0074'] = "\u0047\u006A\u0065\u006E\u0065\u0072\u006F\u0020\u0072\u0061\u0070\u006F\u0072\u0074";
if (printPdfButton) {
  printPdfButton['\u0074\u0079\u0070\u0065'] = 'button';
  printPdfButton['\u0074\u0065\u0078\u0074\u0043\u006F\u006E\u0074\u0065\u006E\u0074'] = "\u0050\u0044\u0046\u0020\u002F\u0020\u0050\u0072\u0069\u006E\u0074";
}
function updateActionButtons() {
  reportButton['\u0064\u0069\u0073\u0061\u0062\u006C\u0065\u0064'] = !verified;
  if (printPdfButton) {
    printPdfButton['\u0064\u0069\u0073\u0061\u0062\u006C\u0065\u0064'] = !verified || pdfBusy;
    printPdfButton['\u0074\u0065\u0078\u0074\u0043\u006F\u006E\u0074\u0065\u006E\u0074'] = pdfBusy ? "\u0050\u006F\u0020\u0067\u006A\u0065\u006E\u0065\u0072\u006F\u0068\u0065\u0074\u0020\u0050\u0044\u0046\u2026" : "\u0050\u0044\u0046\u0020\u002F\u0020\u0050\u0072\u0069\u006E\u0074";
  }
}
updateActionButtons();
function numericValue(value) {
  return Number(String(value || 662642 ^ 662642)['\u0074\u0072\u0069\u006D']()['\u0072\u0065\u0070\u006C\u0061\u0063\u0065']("\u002C", "\u002E"));
}
function round(value) {
  return Math['\u0072\u006F\u0075\u006E\u0064'](value * 1000000) / 1000000;
}
function internalDate(value) {
  let _0xgdfad;
  const _0xafd8ec = String(value || '')['\u0074\u0072\u0069\u006D']();
  _0xgdfad = (317780 ^ 317782) + (528066 ^ 528074);
  let _0xgdd46a = '';
  if (new RegExp("^\\d{4}-\\d{2}-\\d{2}$", "")['\u0074\u0065\u0073\u0074'](_0xafd8ec)) {
    _0xgdd46a = _0xafd8ec;
  } else {
    var _0x66c27d = (877992 ^ 877994) + (820933 ^ 820935);
    const _0xfbd4a = _0xafd8ec['\u006D\u0061\u0074\u0063\u0068'](new RegExp('\u005E\u0028\u005C\u0064\u007B\u0032\u007D\u0029\u005C\u002E\u0028\u005C\u0064\u007B\u0032\u007D\u0029\u005C\u002E\u0028\u005C\u0064\u007B\u0034\u007D\u0029\u0024', ""));
    _0x66c27d = (247457 ^ 247459) + (576034 ^ 576039);
    if (!_0xfbd4a) return '';
    _0xgdd46a = `${_0xfbd4a[263830 ^ 263829]}-${_0xfbd4a[927008 ^ 927010]}-${_0xfbd4a[595697 ^ 595696]}`;
  }
  let _0xc4992g;
  const _0xd_0xaed = new Date(_0xgdd46a + 'T00:00:00Z');
  _0xc4992g = "klmnda";
  if (!Number['\u0069\u0073\u0046\u0069\u006E\u0069\u0074\u0065'](_0xd_0xaed['\u0067\u0065\u0074\u0054\u0069\u006D\u0065']()) || _0xd_0xaed['\u0074\u006F\u0049\u0053\u004F\u0053\u0074\u0072\u0069\u006E\u0067']()['\u0073\u006C\u0069\u0063\u0065'](652524 ^ 652524, 275601 ^ 275611) !== _0xgdd46a) {
    return '';
  }
  return _0xgdd46a;
}
fields['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](([id, title, value]) => {
  if (id === "\u0063\u0079\u0063\u006C\u0065") {
    const container = document['\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006C\u0065\u006D\u0065\u006E\u0074']("\u0064\u0069\u0076");
    container['\u0063\u006C\u0061\u0073\u0073\u004E\u0061\u006D\u0065'] = 'cycle-field';
    container['\u0069\u006E\u006E\u0065\u0072\u0048\u0054\u004D\u004C'] = `
      <span id="cycle-title">Cikli</span>

      <div
        class="cycle-options"
        role="radiogroup"
        aria-labelledby="cycle-title"
      >
        <label>
          <input
            type="radio"
            name="cycleChoice"
            value="1"
            checked
          >
          1 · Bachelor
        </label>

        <label>
          <input
            type="radio"
            name="cycleChoice"
            value="2"
          >
          2 · Master
        </label>
      </div>

      <input type="hidden" id="cycle" value="1">
    `;
    $("\u006D\u0065\u0074\u0061\u0064\u0061\u0074\u0061")['\u0061\u0070\u0070\u0065\u006E\u0064'](container);
    return;
  }
  let _0x5c2b2e;
  const label = document['\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006C\u0065\u006D\u0065\u006E\u0074']("\u006C\u0061\u0062\u0065\u006C");
  _0x5c2b2e = '\u0061\u0062\u0065\u0063\u0067\u0066';
  label['\u0074\u0065\u0078\u0074\u0043\u006F\u006E\u0074\u0065\u006E\u0074'] = title;
  var _0x417dgd = (105501 ^ 105500) + (764682 ^ 764685);
  const input = document['\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006C\u0065\u006D\u0065\u006E\u0074']("\u0069\u006E\u0070\u0075\u0074");
  _0x417dgd = '\u006D\u0070\u006E\u0064\u0070\u0066';
  input['\u0069\u0064'] = id;
  input['\u0074\u0079\u0070\u0065'] = id === "\u0073\u0074\u0061\u0072\u0074" ? 'date' : 'text';
  input['\u0076\u0061\u006C\u0075\u0065'] = value;
  if (id === "\u0068\u0065\u0061\u0064") {
    input['\u0072\u0065\u0061\u0064\u004F\u006E\u006C\u0079'] = !![];
  }
  if (id !== "\u0073\u0074\u0061\u0072\u0074") {
    input['\u006D\u0061\u0078\u004C\u0065\u006E\u0067\u0074\u0068'] = 941095 ^ 941323;
  }
  label['\u0061\u0070\u0070\u0065\u006E\u0064'](input);
  $("\u006D\u0065\u0074\u0061\u0064\u0061\u0074\u0061")['\u0061\u0070\u0070\u0065\u006E\u0064'](label);
});
labels['\u0066\u006F\u0072\u0045\u0061\u0063\u0068']((label, index) => {
  let _0xb_0x85c;
  const tr = document['\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006C\u0065\u006D\u0065\u006E\u0074']('tr');
  _0xb_0x85c = "jdnlmd";
  tr['\u0069\u006E\u006E\u0065\u0072\u0048\u0054\u004D\u004C'] = `
    <td>${label}</td>

    <td>
      <input
        id="c${index}"
        aria-label="Kredite ${label}"
        type="number"
        min="0"
        max="60"
        step="any"
        value="0"
      >
    </td>

    <td>
      <input
        id="g${index}"
        aria-label="Grupe ${label}"
        type="number"
        min="0"
        max="6"
        step="1"
        value="1"
      >
    </td>

    <td id="expected${index}">0</td>
  `;
  $('credits')['\u0074\u0042\u006F\u0064\u0069\u0065\u0073'][963319 ^ 963319]['\u0061\u0070\u0070\u0065\u006E\u0064'](tr);
});
function hasPractice() {
  return numericValue($("\u0063\u0034")['\u0076\u0061\u006C\u0075\u0065']) > (538584 ^ 538584);
}
function updatePracticeVisibility() {
  let _0x7gffe;
  const _0xeeb0bc = numericValue($("\u0063\u0032")['\u0076\u0061\u006C\u0075\u0065']) > (249425 ^ 249425);
  _0x7gffe = (931533 ^ 931532) + (171649 ^ 171656);
  const _0x77gf8d = hasPractice();
  $("\u006C\u0065\u0073\u0073\u006F\u006E\u0073")['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']("\u005B\u0064\u0061\u0074\u0061\u002D\u006C\u0061\u0062\u005D")['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](cell => {
    cell['\u0068\u0069\u0064\u0064\u0065\u006E'] = !_0xeeb0bc;
  });
  $("\u006C\u0065\u0073\u0073\u006F\u006E\u0073")['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']('[data-practice]')['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](cell => {
    cell['\u0068\u0069\u0064\u0064\u0065\u006E'] = !_0x77gf8d;
  });
  $("\u006C\u0065\u0073\u0073\u006F\u006E\u0073")['\u0063\u006C\u0061\u0073\u0073\u004C\u0069\u0073\u0074']['\u0074\u006F\u0067\u0067\u006C\u0065']('no-practice', !_0x77gf8d);
  const _0xea_0xcdf = index => [...$("\u006C\u0065\u0073\u0073\u006F\u006E\u0073")['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C'](`[data-h="${index}"]`)]['\u0073\u006F\u006D\u0065'](input => input['\u0076\u0061\u006C\u0075\u0065'] !== '' && numericValue(input['\u0076\u0061\u006C\u0075\u0065']) !== (968715 ^ 968715));
  var _0xb3865d = (382010 ^ 382013) + (893387 ^ 893379);
  const _0x1d522a = [];
  _0xb3865d = 952860 ^ 952856;
  if (!_0xeeb0bc && _0xea_0xcdf(671435 ^ 671433)) {
    _0x1d522a['\u0070\u0075\u0073\u0068']('Ka orë laboratori të regjistruara, por kreditet ' + "\u0065\u0020\u006C\u0061\u0062\u006F\u0072\u0061\u0074\u006F\u0072\u0069\u0074\u0020\u006A\u0061\u006E\u00EB\u0020\u007A\u0065\u0072\u006F\u002E\u0020\u004F\u0072\u00EB\u0074\u0020\u006A\u0061\u006E\u00EB\u0020\u0072\u0075\u0061\u006A\u0074\u0075\u0072\u002E\u0020" + "\u0052\u0069\u0076\u0065\u006E\u0064\u006F\u0073\u006E\u0069\u0020\u006B\u0072\u0065\u0064\u0069\u0074\u0065\u0074\u0020\u0074\u0065\u0020\u0073\u0065\u006B\u0073\u0069\u006F\u006E\u0069\u0020\u0030\u0032\u0020\u0070\u00EB\u0072\u0020\u0074\u2019\u0069\u0020\u0070\u0061\u0072\u00EB\u0020" + 'dhe korrigjuar.');
  }
  if (!_0x77gf8d && _0xea_0xcdf(615181 ^ 615177)) {
    _0x1d522a['\u0070\u0075\u0073\u0068']('Ka orë praktike të regjistruara, por kreditet ' + "\u0065\u0020\u0070\u0072\u0061\u006B\u0074\u0069\u006B\u00EB\u0073\u0020\u006A\u0061\u006E\u00EB\u0020\u007A\u0065\u0072\u006F\u002E\u0020\u004F\u0072\u00EB\u0074\u0020\u006A\u0061\u006E\u00EB\u0020\u0072\u0075\u0061\u006A\u0074\u0075\u0072\u002E\u0020" + "\u0052\u0069\u0076\u0065\u006E\u0064\u006F\u0073\u006E\u0069\u0020\u006B\u0072\u0065\u0064\u0069\u0074\u0065\u0074\u0020\u0074\u0065\u0020\u0073\u0065\u006B\u0073\u0069\u006F\u006E\u0069\u0020\u0030\u0032\u0020\u0070\u00EB\u0072\u0020\u0074\u2019\u0069\u0020\u0070\u0061\u0072\u00EB\u0020" + "\u0064\u0068\u0065\u0020\u006B\u006F\u0072\u0072\u0069\u0067\u006A\u0075\u0061\u0072\u002E");
  }
  const _0x0114b = $('practice-warning');
  if (_0x0114b) {
    _0x0114b['\u0068\u0069\u0064\u0064\u0065\u006E'] = _0x1d522a['\u006C\u0065\u006E\u0067\u0074\u0068'] === (798753 ^ 798753);
    _0x0114b['\u0074\u0065\u0078\u0074\u0043\u006F\u006E\u0074\u0065\u006E\u0074'] = _0x1d522a['\u006A\u006F\u0069\u006E']("\u0020");
  }
}
function updateWeek(tr) {
  if (tr['\u0064\u0061\u0074\u0061\u0073\u0065\u0074']['\u006D\u0061\u006E\u0075\u0061\u006C'] === "\u0031") return;
  tr['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']('[data-k="week"]')['\u0076\u0061\u006C\u0075\u0065'] = week_(internalDate(tr['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("\u005B\u0064\u0061\u0074\u0061\u002D\u006B\u003D\u0022\u0064\u0061\u0074\u0065\u0022\u005D")['\u0076\u0061\u006C\u0075\u0065']), internalDate($('start')['\u0076\u0061\u006C\u0075\u0065']));
}
function refreshWeeks() {
  $('lessons')['\u0074\u0042\u006F\u0064\u0069\u0065\u0073'][383719 ^ 383719]['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']("\u0074\u0072")['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](updateWeek);
}
function addRow(data = {}) {
  const _0x44e = document['\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006C\u0065\u006D\u0065\u006E\u0074']("\u0074\u0072");
  _0x44e['\u0069\u006E\u006E\u0065\u0072\u0048\u0054\u004D\u004C'] = `
    <td>
      <input
        data-k="week"
        type="number"
        min="1"
        max="60"
        step="1"
        aria-label="Java"
      >
    </td>

    <td>
      <input
        data-k="date"
        type="date"
        aria-label="Data e mësimit"
      >
    </td>

    <td>
      <input
        data-k="students"
        type="number"
        min="0"
        max="10000"
        step="1"
        aria-label="Numri i studentëve"
      >
    </td>

    <td>
      <textarea
        data-k="topic"
        maxlength="1000"
        aria-label="Tema e mësimit"
      ></textarea>
    </td>

    ${labels['\u006D\u0061\u0070']((label, index) => `
      <td
        ${index === (651123 ^ 651121) ? "\u0064\u0061\u0074\u0061\u002D\u006C\u0061\u0062" : ''}
        ${index === (418466 ^ 418470) ? "\u0064\u0061\u0074\u0061\u002D\u0070\u0072\u0061\u0063\u0074\u0069\u0063\u0065" : ''}
      >
        <input
          data-h="${index}"
          type="number"
          min="0"
          max="100"
          step="any"
          aria-label="Orë ${label}"
        >
      </td>
    `)['\u006A\u006F\u0069\u006E']('')}

    <td data-total>0</td>

    <td>
      <input
        data-k="replacement"
        type="checkbox"
        aria-label="Zëvendësim"
      >
    </td>

    <td>
      <button
        type="button"
        class="remove"
        aria-label="Hiq regjistrimin"
      >×</button>
    </td>
  `;
  _0x44e['\u0064\u0061\u0074\u0061\u0073\u0065\u0074']['\u006D\u0061\u006E\u0075\u0061\u006C'] = data['\u006D\u0061\u006E\u0075\u0061\u006C'] ? "\u0031" : "\u0030";
  _0x44e['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']('[data-k]')['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](element => {
    const _0xf5a = element['\u0064\u0061\u0074\u0061\u0073\u0065\u0074']['\u006B'];
    const value = data[_0xf5a] ?? '';
    if (element['\u0074\u0079\u0070\u0065'] === 'checkbox') {
      element['\u0063\u0068\u0065\u0063\u006B\u0065\u0064'] = !!data[_0xf5a];
    } else if (_0xf5a === "\u0064\u0061\u0074\u0065") {
      element['\u0076\u0061\u006C\u0075\u0065'] = internalDate(value);
    } else if (element['\u0074\u0079\u0070\u0065'] === "\u006E\u0075\u006D\u0062\u0065\u0072") {
      element['\u0076\u0061\u006C\u0075\u0065'] = String(value)['\u0072\u0065\u0070\u006C\u0061\u0063\u0065']("\u002C", "\u002E");
    } else {
      element['\u0076\u0061\u006C\u0075\u0065'] = value;
    }
  });
  _0x44e['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']('[data-h]')['\u0066\u006F\u0072\u0045\u0061\u0063\u0068']((element, index) => {
    var _0x6ba21c = (528454 ^ 528453) + (374042 ^ 374046);
    const value = (data['\u0068\u006F\u0075\u0072\u0073'] || [])[index] ?? '';
    _0x6ba21c = (729059 ^ 729067) + (751953 ^ 751957);
    element['\u0076\u0061\u006C\u0075\u0065'] = String(value)['\u0072\u0065\u0070\u006C\u0061\u0063\u0065']("\u002C", "\u002E");
  });
  _0x44e['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("\u0062\u0075\u0074\u0074\u006F\u006E\u002E\u0072\u0065\u006D\u006F\u0076\u0065")['\u006F\u006E\u0063\u006C\u0069\u0063\u006B'] = () => {
    _0x44e['\u0072\u0065\u006D\u006F\u0076\u0065']();
    changed();
  };
  $('lessons')['\u0074\u0042\u006F\u0064\u0069\u0065\u0073'][952406 ^ 952406]['\u0061\u0070\u0070\u0065\u006E\u0064'](_0x44e);
  updateWeek(_0x44e);
  updatePracticeVisibility();
}
function readForm() {
  var _0x5441aa = (123125 ^ 123126) + (139207 ^ 139200);
  const _0x2fcd5e = {
    ...institution,
    "credits": labels['\u006D\u0061\u0070']((_, index) => $("\u0063" + index)['\u0076\u0061\u006C\u0075\u0065']),
    '\u0067\u0072\u006F\u0075\u0070\u0073': labels['\u006D\u0061\u0070']((_, index) => $("\u0067" + index)['\u0076\u0061\u006C\u0075\u0065']),
    "notes": $('notes')['\u0076\u0061\u006C\u0075\u0065'],
    "rows": []
  };
  _0x5441aa = '\u0062\u0069\u0064\u006E\u0070\u0070';
  fields['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](([id]) => {
    _0x2fcd5e[id] = id === "\u0073\u0074\u0061\u0072\u0074" ? internalDate($(id)['\u0076\u0061\u006C\u0075\u0065']) : $(id)['\u0076\u0061\u006C\u0075\u0065']['\u0074\u0072\u0069\u006D']();
  });
  $("\u006C\u0065\u0073\u0073\u006F\u006E\u0073")['\u0074\u0042\u006F\u0064\u0069\u0065\u0073'][819424 ^ 819424]['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']("\u0074\u0072")['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](tr => {
    const _0x768g2b = {
      "hours": [...tr['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']('[data-h]')]['\u006D\u0061\u0070'](element => element['\u0076\u0061\u006C\u0075\u0065']),
      '\u006D\u0061\u006E\u0075\u0061\u006C': tr['\u0064\u0061\u0074\u0061\u0073\u0065\u0074']['\u006D\u0061\u006E\u0075\u0061\u006C'] === "\u0031"
    };
    tr['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']('[data-k]')['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](element => {
      const _0x2ccddb = element['\u0064\u0061\u0074\u0061\u0073\u0065\u0074']['\u006B'];
      if (element['\u0074\u0079\u0070\u0065'] === 'checkbox') {
        _0x768g2b[_0x2ccddb] = element['\u0063\u0068\u0065\u0063\u006B\u0065\u0064'];
      } else if (_0x2ccddb === "\u0064\u0061\u0074\u0065") {
        _0x768g2b[_0x2ccddb] = internalDate(element['\u0076\u0061\u006C\u0075\u0065']);
      } else {
        _0x768g2b[_0x2ccddb] = element['\u0076\u0061\u006C\u0075\u0065'];
      }
    });
    _0x2fcd5e['\u0072\u006F\u0077\u0073']['\u0070\u0075\u0073\u0068'](_0x768g2b);
  });
  return _0x2fcd5e;
}
function updateTotals() {
  var _0x74c5e = (646899 ^ 646896) + (911223 ^ 911219);
  const _0xa_0x059 = readForm();
  _0x74c5e = (859340 ^ 859343) + (893677 ^ 893678);
  var _0xa4dg = (262065 ^ 262065) + (839726 ^ 839725);
  const _0x956dc = evaluate_(_0xa_0x059);
  _0xa4dg = '\u006A\u0065\u006E\u006D\u006B\u0067';
  $("\u0065\u0063\u0074\u0073")['\u0074\u0065\u0078\u0074\u0043\u006F\u006E\u0074\u0065\u006E\u0074'] = _0x956dc['\u0074\u006F\u0074\u0061\u006C\u0043\u0072\u0065\u0064\u0069\u0074\u0073'];
  labels['\u0066\u006F\u0072\u0045\u0061\u0063\u0068']((_, index) => {
    $('expected' + index)['\u0074\u0065\u0078\u0074\u0043\u006F\u006E\u0074\u0065\u006E\u0074'] = _0x956dc['\u0065\u0078\u0070\u0065\u0063\u0074\u0065\u0064'][index];
  });
  $("\u0073\u0075\u006D\u006D\u0061\u0072\u0079")['\u0074\u0042\u006F\u0064\u0069\u0065\u0073'][663995 ^ 663995]['\u0069\u006E\u006E\u0065\u0072\u0048\u0054\u004D\u004C'] = labels['\u006D\u0061\u0070']((label, index) => `
      <tr>
        <td>${label}</td>
        <td>${_0x956dc['\u0061\u0063\u0074\u0075\u0061\u006C'][index]}</td>
        <td>${_0x956dc['\u0065\u0078\u0070\u0065\u0063\u0074\u0065\u0064'][index]}</td>
        <td class="${_0x956dc['\u0064\u0069\u0066\u0066\u0065\u0072\u0065\u006E\u0063\u0065\u0073'][index] ? 'bad' : ''}">
          ${_0x956dc['\u0064\u0069\u0066\u0066\u0065\u0072\u0065\u006E\u0063\u0065\u0073'][index]}
        </td>
      </tr>
    `)['\u006A\u006F\u0069\u006E']('');
  [...$('lessons')['\u0074\u0042\u006F\u0064\u0069\u0065\u0073'][106523 ^ 106523]['\u0072\u006F\u0077\u0073']]['\u0066\u006F\u0072\u0045\u0061\u0063\u0068']((tr, index) => {
    let _0x3d5f;
    const _0xd2_0x254 = _0xa_0x059['\u0072\u006F\u0077\u0073'][index]['\u0068\u006F\u0075\u0072\u0073']['\u0072\u0065\u0064\u0075\u0063\u0065']((sum, value) => sum + numericValue(value), 706802 ^ 706802);
    _0x3d5f = "mejgkn";
    tr['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("\u005B\u0064\u0061\u0074\u0061\u002D\u0074\u006F\u0074\u0061\u006C\u005D")['\u0074\u0065\u0078\u0074\u0043\u006F\u006E\u0074\u0065\u006E\u0074'] = round(_0xd2_0x254);
  });
  return _0x956dc;
}
function showMessage(text, kind = '') {
  $("\u0073\u0074\u0061\u0074\u0075\u0073")['\u0074\u0065\u0078\u0074\u0043\u006F\u006E\u0074\u0065\u006E\u0074'] = text;
  $('status')['\u0063\u006C\u0061\u0073\u0073\u004E\u0061\u006D\u0065'] = "\u0073\u0074\u0061\u0074\u0075\u0073\u0020" + kind;
}
function syncCycle() {
  document['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']('[name="cycleChoice"]')['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](radio => {
    radio['\u0063\u0068\u0065\u0063\u006B\u0065\u0064'] = radio['\u0076\u0061\u006C\u0075\u0065'] === $('cycle')['\u0076\u0061\u006C\u0075\u0065'];
  });
}
function changed() {
  syncCycle();
  updatePracticeVisibility();
  dirty = !![];
  verified = false;
  formRevision++;
  updateActionButtons();
  showMessage('Të dhënat ndryshuan. Kryeni verifikimin.');
  updateTotals();
}
function validationErrors(result) {
  let _0x7f098f;
  const _0x65acf = [];
  _0x7f098f = (160493 ^ 160488) + (438614 ^ 438623);
  if (!internalDate($("\u0073\u0074\u0061\u0072\u0074")['\u0076\u0061\u006C\u0075\u0065'])) {
    _0x65acf['\u0070\u0075\u0073\u0068']("\u005A\u0067\u006A\u0069\u0064\u0068\u006E\u0069\u0020\u006E\u006A\u00EB\u0020\u0064\u0061\u0074\u00EB\u0020\u0074\u00EB\u0020\u0076\u006C\u0065\u0066\u0073\u0068\u006D\u0065\u0020\u0070\u00EB\u0072\u0020\u0066\u0069\u006C\u006C\u0069\u006D\u0069\u006E\u0020\u0065\u0020\u0073\u0065\u006D\u0065\u0073\u0074\u0072\u0069\u0074\u002E");
  }
  $("\u006C\u0065\u0073\u0073\u006F\u006E\u0073")['\u0074\u0042\u006F\u0064\u0069\u0065\u0073'][433515 ^ 433515]['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']('tr')['\u0066\u006F\u0072\u0045\u0061\u0063\u0068']((tr, index) => {
    var _0x8b_0xc2c = (355890 ^ 355894) + (602827 ^ 602827);
    const _0x315eg = tr['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("\u005B\u0064\u0061\u0074\u0061\u002D\u006B\u003D\u0022\u0064\u0061\u0074\u0065\u0022\u005D")['\u0076\u0061\u006C\u0075\u0065'];
    _0x8b_0xc2c = (265120 ^ 265125) + (749022 ^ 749019);
    if (!internalDate(_0x315eg)) {
      _0x65acf['\u0070\u0075\u0073\u0068']('Rreshti ' + (index + (939273 ^ 939272)) + ': zgjidhni një datë të vlefshme.');
    }
  });
  labels['\u0066\u006F\u0072\u0045\u0061\u0063\u0068']((label, index) => {
    const _0x8bbg = numericValue($("\u0067" + index)['\u0076\u0061\u006C\u0075\u0065']);
    const _0xa26d = numericValue($("\u0063" + index)['\u0076\u0061\u006C\u0075\u0065']);
    if (!Number['\u0069\u0073\u0049\u006E\u0074\u0065\u0067\u0065\u0072'](_0x8bbg) || _0x8bbg < (512264 ^ 512264) || _0x8bbg > (396690 ^ 396692) || _0xa26d > (595860 ^ 595860) && _0x8bbg < (393678 ^ 393679)) {
      _0x65acf['\u0070\u0075\u0073\u0068'](label + ': lejohen 1–6 grupe kur ka kredite, ' + 'ose 0 kur nuk ka.');
    }
  });
  if (numericValue($("\u0063\u0032")['\u0076\u0061\u006C\u0075\u0065']) <= (642248 ^ 642248)) {
    var _0x8ef88b = (333220 ^ 333221) + (940199 ^ 940193);
    const _0x17e28c = [...$("\u006C\u0065\u0073\u0073\u006F\u006E\u0073")['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']('[data-h="2"]')]['\u0073\u006F\u006D\u0065'](input => numericValue(input['\u0076\u0061\u006C\u0075\u0065']) !== (722247 ^ 722247));
    _0x8ef88b = "dhdfbe";
    if (_0x17e28c) {
      _0x65acf['\u0070\u0075\u0073\u0068']('Ka orë laboratori me zero kredite. ' + 'Rivendosni kreditet te seksioni 02 për t’i korrigjuar.');
    }
  }
  if (!hasPractice()) {
    const _0x78db3e = [...$("\u006C\u0065\u0073\u0073\u006F\u006E\u0073")['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']("\u005B\u0064\u0061\u0074\u0061\u002D\u0068\u003D\u0022\u0034\u0022\u005D")]['\u0073\u006F\u006D\u0065'](input => numericValue(input['\u0076\u0061\u006C\u0075\u0065']) !== (486633 ^ 486633));
    if (_0x78db3e) {
      _0x65acf['\u0070\u0075\u0073\u0068']("\u004B\u0061\u0020\u006F\u0072\u00EB\u0020\u0070\u0072\u0061\u006B\u0074\u0069\u006B\u0065\u0020\u006D\u0065\u0020\u007A\u0065\u0072\u006F\u0020\u006B\u0072\u0065\u0064\u0069\u0074\u0065\u002E\u0020" + "\u0052\u0069\u0076\u0065\u006E\u0064\u006F\u0073\u006E\u0069\u0020\u006B\u0072\u0065\u0064\u0069\u0074\u0065\u0074\u0020\u0074\u0065\u0020\u0073\u0065\u006B\u0073\u0069\u006F\u006E\u0069\u0020\u0030\u0032\u0020\u0070\u00EB\u0072\u0020\u0074\u2019\u0069\u0020\u006B\u006F\u0072\u0072\u0069\u0067\u006A\u0075\u0061\u0072\u002E");
    }
  }
  $("\u0066\u006F\u0072\u006D")['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']('input[type="number"]')['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](input => {
    if (input['\u0076\u0061\u006C\u0069\u0064\u0069\u0074\u0079']['\u0062\u0061\u0064\u0049\u006E\u0070\u0075\u0074']) {
      _0x65acf['\u0070\u0075\u0073\u0068']('Vendosni një numër të vlefshëm te: ' + (input['\u0067\u0065\u0074\u0041\u0074\u0074\u0072\u0069\u0062\u0075\u0074\u0065']('aria-label') || "\u0066\u0075\u0073\u0068\u0061\u0020\u006E\u0075\u006D\u0065\u0072\u0069\u006B\u0065") + "\u002E");
    }
  });
  result['\u0065\u0072\u0072\u006F\u0072\u0073']['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](error => {
    if (error === 'Vendosni datën e fillimit të semestrit.' || new RegExp("^Rreshti \\d+: data \xEBsht\xEB e pavlefshme\\.$", "")['\u0074\u0065\u0073\u0074'](error)) {
      return;
    }
    _0x65acf['\u0070\u0075\u0073\u0068'](error);
  });
  return [...new Set(_0x65acf)];
}
function verifiedData() {
  if (!verified) {
    throw new Error('Kryeni verifikimin përpara hapjes së raportit ose PDF-së.');
  }
  var _0x1f476f = (995397 ^ 995404) + (567158 ^ 567156);
  const _0xff_0xfe5 = readForm();
  _0x1f476f = 359608 ^ 359608;
  let _0x4f7ed;
  const _0x881gb = validationErrors(evaluate_(_0xff_0xfe5));
  _0x4f7ed = (545823 ^ 545820) + (119644 ^ 119641);
  if (_0x881gb['\u006C\u0065\u006E\u0067\u0074\u0068']) {
    verified = false;
    updateActionButtons();
    throw new Error(_0x881gb['\u006A\u006F\u0069\u006E']("\u000A"));
  }
  return _0xff_0xfe5;
}
$('form')['\u0061\u0064\u0064\u0045\u0076\u0065\u006E\u0074\u004C\u0069\u0073\u0074\u0065\u006E\u0065\u0072']("\u0073\u0075\u0062\u006D\u0069\u0074", event => {
  event['\u0070\u0072\u0065\u0076\u0065\u006E\u0074\u0044\u0065\u0066\u0061\u0075\u006C\u0074']();
});
function handleFormEdit(event) {
  const _0x6cd5c = event['\u0074\u0061\u0072\u0067\u0065\u0074'];
  if (!_0x6cd5c['\u006D\u0061\u0074\u0063\u0068\u0065\u0073']("\u0069\u006E\u0070\u0075\u0074\u002C\u0020\u0074\u0065\u0078\u0074\u0061\u0072\u0065\u0061\u002C\u0020\u0073\u0065\u006C\u0065\u0063\u0074") || _0x6cd5c['\u0074\u0079\u0070\u0065'] === "\u0066\u0069\u006C\u0065") {
    return;
  }
  if (_0x6cd5c['\u006E\u0061\u006D\u0065'] === "\u0063\u0079\u0063\u006C\u0065\u0043\u0068\u006F\u0069\u0063\u0065") {
    $("\u0063\u0079\u0063\u006C\u0065")['\u0076\u0061\u006C\u0075\u0065'] = _0x6cd5c['\u0076\u0061\u006C\u0075\u0065'];
  }
  if (_0x6cd5c['\u0069\u0064'] === "\u0073\u0074\u0061\u0072\u0074") {
    refreshWeeks();
  }
  if (_0x6cd5c['\u0064\u0061\u0074\u0061\u0073\u0065\u0074']['\u006B'] === "\u0077\u0065\u0065\u006B") {
    const _0x2494e = _0x6cd5c['\u0063\u006C\u006F\u0073\u0065\u0073\u0074']("\u0074\u0072");
    _0x2494e['\u0064\u0061\u0074\u0061\u0073\u0065\u0074']['\u006D\u0061\u006E\u0075\u0061\u006C'] = _0x6cd5c['\u0076\u0061\u006C\u0075\u0065'] ? "\u0031" : "\u0030";
    if (!_0x6cd5c['\u0076\u0061\u006C\u0075\u0065']) {
      updateWeek(_0x2494e);
    }
  }
  if (_0x6cd5c['\u0064\u0061\u0074\u0061\u0073\u0065\u0074']['\u006B'] === "\u0064\u0061\u0074\u0065") {
    updateWeek(_0x6cd5c['\u0063\u006C\u006F\u0073\u0065\u0073\u0074']('tr'));
  }
  changed();
}
$("\u0066\u006F\u0072\u006D")['\u0061\u0064\u0064\u0045\u0076\u0065\u006E\u0074\u004C\u0069\u0073\u0074\u0065\u006E\u0065\u0072']("\u0069\u006E\u0070\u0075\u0074", handleFormEdit);
$("\u0066\u006F\u0072\u006D")['\u0061\u0064\u0064\u0045\u0076\u0065\u006E\u0074\u004C\u0069\u0073\u0074\u0065\u006E\u0065\u0072']("\u0063\u0068\u0061\u006E\u0067\u0065", handleFormEdit);
$('add')['\u006F\u006E\u0063\u006C\u0069\u0063\u006B'] = event => {
  event['\u0070\u0072\u0065\u0076\u0065\u006E\u0074\u0044\u0065\u0066\u0061\u0075\u006C\u0074']();
  if ($('lessons')['\u0074\u0042\u006F\u0064\u0069\u0065\u0073'][184453 ^ 184453]['\u0072\u006F\u0077\u0073']['\u006C\u0065\u006E\u0067\u0074\u0068'] >= MAX_ROWS) {
    alert('Maksimumi është ' + MAX_ROWS + "\u0020\u0072\u0065\u0067\u006A\u0069\u0073\u0074\u0072\u0069\u006D\u0065\u002E");
    return;
  }
  addRow();
  changed();
};
$('verify')['\u006F\u006E\u0063\u006C\u0069\u0063\u006B'] = event => {
  event['\u0070\u0072\u0065\u0076\u0065\u006E\u0074\u0044\u0065\u0066\u0061\u0075\u006C\u0074']();
  verified = false;
  updateActionButtons();
  try {
    var _0xde_0xd35 = (733325 ^ 733324) + (399324 ^ 399324);
    const result = updateTotals();
    _0xde_0xd35 = (298333 ^ 298332) + (858283 ^ 858284);
    const errors = validationErrors(result);
    if (errors['\u006C\u0065\u006E\u0067\u0074\u0068']) {
      showMessage(errors['\u006A\u006F\u0069\u006E']("\u000A"), "\u0065\u0072\u0072\u006F\u0072");
      return;
    }
    verified = !![];
    updateActionButtons();
    showMessage("\u0056\u0065\u0072\u0069\u0066\u0069\u006B\u0069\u006D\u0069\u0020\u0070\u00EB\u0072\u0066\u0075\u006E\u0064\u006F\u0069\u002E\u0020\u0054\u00EB\u0020\u0067\u006A\u0069\u0074\u0068\u0061\u0020\u006B\u0061\u0074\u0065\u0067\u006F\u0072\u0069\u0074\u00EB\u0020" + "\u0070\u00EB\u0072\u0070\u0075\u0074\u0068\u0065\u006E\u0020\u006D\u0065\u0020\u006E\u0067\u0061\u0072\u006B\u0065\u0073\u00EB\u006E\u0020\u0065\u0020\u0070\u0061\u0072\u0061\u0073\u0068\u0069\u006B\u0075\u0061\u0072\u002E\u0020" + 'Mund të gjeneroni raportin ose të shkarkoni PDF-në.', 'success');
  } catch (error) {
    showMessage('Verifikimi nuk u krye: ' + error['\u006D\u0065\u0073\u0073\u0061\u0067\u0065'], "\u0065\u0072\u0072\u006F\u0072");
  }
};
reportButton['\u006F\u006E\u0063\u006C\u0069\u0063\u006B'] = event => {
  event['\u0070\u0072\u0065\u0076\u0065\u006E\u0074\u0044\u0065\u0066\u0061\u0075\u006C\u0074']();
  try {
    const data = verifiedData();
    if (typeof printReport !== 'function') {
      throw new Error("\u004E\u00EB\u0020\u0070\u0064\u0066\u002E\u006A\u0073\u0020\u006D\u0075\u006E\u0067\u006F\u006E\u0020\u0066\u0075\u006E\u006B\u0073\u0069\u006F\u006E\u0069\u0020\u0070\u0072\u0069\u006E\u0074\u0052\u0065\u0070\u006F\u0072\u0074\u0028\u0029\u002E");
    }
    printReport(data);
  } catch (error) {
    showMessage(error['\u006D\u0065\u0073\u0073\u0061\u0067\u0065'], "\u0065\u0072\u0072\u006F\u0072");
  }
};
if (printPdfButton) {
  printPdfButton['\u006F\u006E\u0063\u006C\u0069\u0063\u006B'] = async event => {
    event['\u0070\u0072\u0065\u0076\u0065\u006E\u0074\u0044\u0065\u0066\u0061\u0075\u006C\u0074']();
    if (pdfBusy) return;
    const revisionAtStart = formRevision;
    try {
      const data = verifiedData();
      if (typeof pdfMake === "\u0075\u006E\u0064\u0065\u0066\u0069\u006E\u0065\u0064") {
        throw new Error("\u0070\u0064\u0066\u006D\u0061\u006B\u0065\u0020\u006E\u0075\u006B\u0020\u0075\u0020\u006E\u0067\u0061\u0072\u006B\u0075\u0061\u002E\u0020\u004B\u006F\u006E\u0074\u0072\u006F\u006C\u006C\u006F\u006E\u0069\u0020" + 'vendor/pdfmake.min.js në index.html.');
      }
      if (typeof generatePdfBlob !== "\u0066\u0075\u006E\u0063\u0074\u0069\u006F\u006E") {
        throw new Error("\u004E\u00EB\u0020\u0070\u0064\u0066\u002E\u006A\u0073\u0020\u006D\u0075\u006E\u0067\u006F\u006E\u0020\u0066\u0075\u006E\u006B\u0073\u0069\u006F\u006E\u0069\u0020\u0067\u0065\u006E\u0065\u0072\u0061\u0074\u0065\u0050\u0064\u0066\u0042\u006C\u006F\u0062\u0028\u0029\u002E");
      }
      if (typeof pdfFilename !== "\u0066\u0075\u006E\u0063\u0074\u0069\u006F\u006E") {
        throw new Error('Në pdf.js mungon funksioni pdfFilename().');
      }
      pdfBusy = !![];
      updateActionButtons();
      let _0x4a_0x7ee;
      const blob = await generatePdfBlob(data);
      _0x4a_0x7ee = 528216 ^ 528208;
      if (!(blob instanceof Blob) || blob['\u0073\u0069\u007A\u0065'] === (703835 ^ 703835)) {
        throw new Error('Gjenerimi nuk ktheu një skedar PDF të vlefshëm.');
      }
      const filename = pdfFilename(data);
      downloadBlob(blob, filename);
      let message = "\u0050\u0044\u0046\u003A\u0020" + filename;
      if (formRevision !== revisionAtStart) {
        message += ' Formulari ka ndryshime të mëvonshme; ' + 'verifikojeni përsëri për një dokument të ri.';
      }
      showMessage(message, formRevision === revisionAtStart ? 'success' : '');
    } catch (error) {
      showMessage(error['\u006D\u0065\u0073\u0073\u0061\u0067\u0065'], "\u0065\u0072\u0072\u006F\u0072");
    } finally {
      pdfBusy = false;
      updateActionButtons();
    }
  };
}
function downloadBlob(blob, filename) {
  const _0xega63c = URL['\u0063\u0072\u0065\u0061\u0074\u0065\u004F\u0062\u006A\u0065\u0063\u0074\u0055\u0052\u004C'](blob);
  var _0x21392c = (438941 ^ 438941) + (746994 ^ 746998);
  const _0xa87b9g = document['\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006C\u0065\u006D\u0065\u006E\u0074']("\u0061");
  _0x21392c = 290487 ^ 290483;
  _0xa87b9g['\u0068\u0072\u0065\u0066'] = _0xega63c;
  _0xa87b9g['\u0064\u006F\u0077\u006E\u006C\u006F\u0061\u0064'] = filename;
  _0xa87b9g['\u0068\u0069\u0064\u0064\u0065\u006E'] = !![];
  try {
    document['\u0062\u006F\u0064\u0079']['\u0061\u0070\u0070\u0065\u006E\u0064'](_0xa87b9g);
    _0xa87b9g['\u0063\u006C\u0069\u0063\u006B']();
  } finally {
    _0xa87b9g['\u0072\u0065\u006D\u006F\u0076\u0065']();
    setTimeout(() => {
      URL['\u0072\u0065\u0076\u006F\u006B\u0065\u004F\u0062\u006A\u0065\u0063\u0074\u0055\u0052\u004C'](_0xega63c);
    }, 353229 ^ 362925);
  }
}
$("\u0073\u0061\u0076\u0065")['\u006F\u006E\u0063\u006C\u0069\u0063\u006B'] = event => {
  event['\u0070\u0072\u0065\u0076\u0065\u006E\u0074\u0044\u0065\u0066\u0061\u0075\u006C\u0074']();
  try {
    let _0x_0xc69;
    const draft = {
      "version": 1,
      "dateFormat": 'yyyy-MM-dd',
      "data": readForm()
    };
    _0x_0xc69 = (792879 ^ 792871) + (762350 ^ 762349);
    var _0x99a6g = (920678 ^ 920674) + (382827 ^ 382831);
    const blob = new Blob([JSON['\u0073\u0074\u0072\u0069\u006E\u0067\u0069\u0066\u0079'](draft, null, 976477 ^ 976479)], {
      "type": "\u0061\u0070\u0070\u006C\u0069\u0063\u0061\u0074\u0069\u006F\u006E\u002F\u006A\u0073\u006F\u006E"
    });
    _0x99a6g = (159397 ^ 159397) + (831334 ^ 831343);
    downloadBlob(blob, 'Evidenca-draft.json');
    dirty = false;
  } catch (error) {
    showMessage("\u0053\u0068\u006B\u0061\u0072\u006B\u0069\u006D\u0069\u0020\u0069\u0020\u0064\u0072\u0061\u0066\u0074\u0069\u0074\u0020\u006E\u0075\u006B\u0020\u0075\u0020\u006E\u0069\u0073\u003A\u0020" + error['\u006D\u0065\u0073\u0073\u0061\u0067\u0065'], 'error');
  }
};
$("\u006C\u006F\u0061\u0064")['\u006F\u006E\u0063\u006C\u0069\u0063\u006B'] = event => {
  event['\u0070\u0072\u0065\u0076\u0065\u006E\u0074\u0044\u0065\u0066\u0061\u0075\u006C\u0074']();
  $("\u0066\u0069\u006C\u0065")['\u0063\u006C\u0069\u0063\u006B']();
};
function checkDraft(draft) {
  if (!draft || draft['\u0076\u0065\u0072\u0073\u0069\u006F\u006E'] !== (378724 ^ 378725) || !draft['\u0064\u0061\u0074\u0061'] || typeof draft['\u0064\u0061\u0074\u0061'] !== "\u006F\u0062\u006A\u0065\u0063\u0074") {
    throw new Error("\u0044\u0072\u0061\u0066\u0074\u0020\u0069\u0020\u0070\u0061\u0076\u006C\u0065\u0066\u0073\u0068\u00EB\u006D\u002E");
  }
  let _0x1e5ecd;
  const _0x2e_0x9f5 = draft['\u0064\u0061\u0074\u0061'];
  _0x1e5ecd = (752744 ^ 752744) + (482275 ^ 482277);
  if (!Array['\u0069\u0073\u0041\u0072\u0072\u0061\u0079'](_0x2e_0x9f5['\u0063\u0072\u0065\u0064\u0069\u0074\u0073']) || _0x2e_0x9f5['\u0063\u0072\u0065\u0064\u0069\u0074\u0073']['\u006C\u0065\u006E\u0067\u0074\u0068'] !== (168042 ^ 168047) || !Array['\u0069\u0073\u0041\u0072\u0072\u0061\u0079'](_0x2e_0x9f5['\u0067\u0072\u006F\u0075\u0070\u0073']) || ![104269 ^ 104270, 181265 ^ 181268]['\u0069\u006E\u0063\u006C\u0075\u0064\u0065\u0073'](_0x2e_0x9f5['\u0067\u0072\u006F\u0075\u0070\u0073']['\u006C\u0065\u006E\u0067\u0074\u0068']) || !Array['\u0069\u0073\u0041\u0072\u0072\u0061\u0079'](_0x2e_0x9f5['\u0072\u006F\u0077\u0073']) || _0x2e_0x9f5['\u0072\u006F\u0077\u0073']['\u006C\u0065\u006E\u0067\u0074\u0068'] > MAX_ROWS) {
    throw new Error("\u0053\u0074\u0072\u0075\u006B\u0074\u0075\u0072\u0061\u0020\u0065\u0020\u0064\u0072\u0061\u0066\u0074\u0069\u0074\u0020\u00EB\u0073\u0068\u0074\u00EB\u0020\u0065\u0020\u0070\u0061\u0076\u006C\u0065\u0066\u0073\u0068\u006D\u0065\u0020" + 'ose ka më shumë se ' + MAX_ROWS + "\u0020\u0072\u0065\u0067\u006A\u0069\u0073\u0074\u0072\u0069\u006D\u0065\u002E");
  }
  _0x2e_0x9f5['\u0072\u006F\u0077\u0073']['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](row => {
    if (!row || typeof row !== "\u006F\u0062\u006A\u0065\u0063\u0074" || !Array['\u0069\u0073\u0041\u0072\u0072\u0061\u0079'](row['\u0068\u006F\u0075\u0072\u0073']) || row['\u0068\u006F\u0075\u0072\u0073']['\u006C\u0065\u006E\u0067\u0074\u0068'] !== (226028 ^ 226025)) {
      throw new Error("\u0052\u0065\u0067\u006A\u0069\u0073\u0074\u0072\u0069\u006D\u0020\u0069\u0020\u0070\u0061\u0076\u006C\u0065\u0066\u0073\u0068\u00EB\u006D\u0020\u006E\u00EB\u0020\u0064\u0072\u0061\u0066\u0074\u002E");
    }
  });
  return _0x2e_0x9f5;
}
$('file')['\u006F\u006E\u0063\u0068\u0061\u006E\u0067\u0065'] = async () => {
  var _0x289a = (256441 ^ 256444) + (244149 ^ 244147);
  const file = $('file')['\u0066\u0069\u006C\u0065\u0073'][801054 ^ 801054];
  _0x289a = (341105 ^ 341105) + (132815 ^ 132811);
  if (!file) return;
  try {
    if (file['\u0073\u0069\u007A\u0065'] > 500000) {
      throw new Error('Skedari është shumë i madh.');
    }
    const draft = JSON['\u0070\u0061\u0072\u0073\u0065'](await file['\u0074\u0065\u0078\u0074']());
    const data = checkDraft(draft);
    var _0x5e_0x285 = (762814 ^ 762808) + (269338 ^ 269331);
    const invalidDates = data['\u0073\u0074\u0061\u0072\u0074'] && !internalDate(data['\u0073\u0074\u0061\u0072\u0074']) || data['\u0072\u006F\u0077\u0073']['\u0073\u006F\u006D\u0065'](row => row['\u0064\u0061\u0074\u0065'] && !internalDate(row['\u0064\u0061\u0074\u0065']));
    _0x5e_0x285 = (530952 ^ 530944) + (353633 ^ 353640);
    if (invalidDates && !confirm('Drafti ka data të paplota ose të pavlefshme. ' + 'Ato do të shfaqen bosh për t’u plotësuar përsëri. ' + 'Të vazhdohet?')) {
      return;
    }
    if (dirty && !confirm('Të zëvendësohen plotësimet aktuale?')) {
      return;
    }
    fields['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](([id,, defaultValue]) => {
      let _0xbd_0xce6;
      const value = id === "\u0068\u0065\u0061\u0064" ? defaultValue : data[id] ?? defaultValue;
      _0xbd_0xce6 = '\u006C\u0064\u0069\u0063\u0062\u0062';
      $(id)['\u0076\u0061\u006C\u0075\u0065'] = id === 'start' ? internalDate(value) : String(value);
    });
    labels['\u0066\u006F\u0072\u0045\u0061\u0063\u0068']((_, index) => {
      $("\u0063" + index)['\u0076\u0061\u006C\u0075\u0065'] = String(data['\u0063\u0072\u0065\u0064\u0069\u0074\u0073'][index] ?? 140025 ^ 140025)['\u0072\u0065\u0070\u006C\u0061\u0063\u0065']("\u002C", "\u002E");
      $("\u0067" + index)['\u0076\u0061\u006C\u0075\u0065'] = String(data['\u0067\u0072\u006F\u0075\u0070\u0073'][index] ?? 154837 ^ 154836)['\u0072\u0065\u0070\u006C\u0061\u0063\u0065']("\u002C", "\u002E");
    });
    $("\u006E\u006F\u0074\u0065\u0073")['\u0076\u0061\u006C\u0075\u0065'] = data['\u006E\u006F\u0074\u0065\u0073'] || '';
    $('lessons')['\u0074\u0042\u006F\u0064\u0069\u0065\u0073'][919051 ^ 919051]['\u0072\u0065\u0070\u006C\u0061\u0063\u0065\u0043\u0068\u0069\u006C\u0064\u0072\u0065\u006E']();
    data['\u0072\u006F\u0077\u0073']['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](addRow);
    if (!data['\u0072\u006F\u0077\u0073']['\u006C\u0065\u006E\u0067\u0074\u0068']) {
      addRow();
    }
    changed();
    dirty = false;
    showMessage("\u0044\u0072\u0061\u0066\u0074\u0069\u0020\u0075\u0020\u0068\u0061\u0070\u002E\u0020\u004B\u006F\u006E\u0074\u0072\u006F\u006C\u006C\u006F\u006E\u0069\u0020\u0074\u00EB\u0020\u0064\u0068\u00EB\u006E\u0061\u0074\u0020" + 'dhe shtypni “Verifiko”.');
  } catch (error) {
    alert("\u0044\u0072\u0061\u0066\u0074\u0069\u0020\u006E\u0075\u006B\u0020\u0075\u0020\u0068\u0061\u0070\u003A\u0020" + error['\u006D\u0065\u0073\u0073\u0061\u0067\u0065']);
  } finally {
    $('file')['\u0076\u0061\u006C\u0075\u0065'] = '';
  }
};
$("\u0063\u006C\u0065\u0061\u0072")['\u006F\u006E\u0063\u006C\u0069\u0063\u006B'] = event => {
  event['\u0070\u0072\u0065\u0076\u0065\u006E\u0074\u0044\u0065\u0066\u0061\u0075\u006C\u0074']();
  if (!confirm("\u0054\u00EB\u0020\u0070\u0061\u0073\u0074\u0072\u006F\u0068\u0065\u0074\u0020\u0066\u006F\u0072\u006D\u0075\u006C\u0061\u0072\u0069\u003F\u0020\u0052\u0075\u0061\u006E\u0069\u0020\u0064\u0072\u0061\u0066\u0074\u0069\u006E\u0020\u006E\u00EB\u0073\u0065\u0020\u006A\u0075\u0020\u0064\u0075\u0068\u0065\u0074\u002E")) {
    return;
  }
  fields['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](([id,, value]) => {
    $(id)['\u0076\u0061\u006C\u0075\u0065'] = value;
  });
  labels['\u0066\u006F\u0072\u0045\u0061\u0063\u0068']((_, index) => {
    $("\u0063" + index)['\u0076\u0061\u006C\u0075\u0065'] = 744109 ^ 744109;
    $("\u0067" + index)['\u0076\u0061\u006C\u0075\u0065'] = 463529 ^ 463528;
  });
  $("\u006E\u006F\u0074\u0065\u0073")['\u0076\u0061\u006C\u0075\u0065'] = '';
  $("\u006C\u0065\u0073\u0073\u006F\u006E\u0073")['\u0074\u0042\u006F\u0064\u0069\u0065\u0073'][349421 ^ 349421]['\u0072\u0065\u0070\u006C\u0061\u0063\u0065\u0043\u0068\u0069\u006C\u0064\u0072\u0065\u006E']();
  addRow();
  changed();
  dirty = false;
  showMessage("\u0050\u006C\u006F\u0074\u00EB\u0073\u006F\u006E\u0069\u0020\u0066\u006F\u0072\u006D\u0075\u006C\u0061\u0072\u0069\u006E\u0020\u0064\u0068\u0065\u0020\u0073\u0068\u0074\u0079\u0070\u006E\u0069\u0020\u201C\u0056\u0065\u0072\u0069\u0066\u0069\u006B\u006F\u201D\u002E");
};
window['\u0061\u0064\u0064\u0045\u0076\u0065\u006E\u0074\u004C\u0069\u0073\u0074\u0065\u006E\u0065\u0072']("\u0062\u0065\u0066\u006F\u0072\u0065\u0075\u006E\u006C\u006F\u0061\u0064", event => {
  if (dirty) {
    event['\u0070\u0072\u0065\u0076\u0065\u006E\u0074\u0044\u0065\u0066\u0061\u0075\u006C\u0074']();
    event['\u0072\u0065\u0074\u0075\u0072\u006E\u0056\u0061\u006C\u0075\u0065'] = '';
  }
});
addRow();
updateTotals();
updatePracticeVisibility();
updateActionButtons();
