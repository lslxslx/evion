/* (C) ルイス */

const $ = id => document.getElementById(id);

const labels = [
  'Leksion',
  'Seminar',
  'Laborator',
  'Detyrë/projekt',
  'Praktikë'
];

const institution = {
  university: 'UNIVERSITETI POLITEKNIK I TIRANËS',
  faculty: 'FAKULTETI I GJEOLOGJISË DHE I MINIERAVE',
  department:
    'DEPARTAMENTI I GJEOLOGJISË SË ZBATUAR DHE I GJEOINFORMATIKËS'
};

const fields = [
  ['teacher', 'Pedagog/e (titulli/grada dhe emri)', ''],
  ['head', 'Drejtuesi i departamentit', 'Prof. Asoc. Dr. Luis Lamani'],
  ['subject', 'Lënda', ''],
  ['program', 'Programi i studimit', ''],
  ['year', 'Viti akademik', '2026-2027'],
  ['semester', 'Semestri', 'I/II'],
  ['cycle', 'Cikli', '1'],
  ['start', 'Data e fillimit të semestrit', '']
];

const MAX_ROWS = 100;

const reportButton = $('pdf');
const printPdfButton = $('print-pdf');

let dirty = false;
let verified = false;
let pdfBusy = false;
let formRevision = 0;

reportButton.type = 'button';
reportButton.textContent = 'Gjenero raport';

if (printPdfButton) {
  printPdfButton.type = 'button';
  printPdfButton.textContent = 'PDF / Print';
}

function updateActionButtons() {
  reportButton.disabled = !verified;

  if (printPdfButton) {
    printPdfButton.disabled = !verified || pdfBusy;
    printPdfButton.textContent = pdfBusy
      ? 'Po gjenerohet PDF…'
      : 'PDF / Print';
  }
}

updateActionButtons();

function numericValue(value) {
  return Number(String(value || 0).trim().replace(',', '.'));
}

function round(value) {
  return Math.round(value * 1000000) / 1000000;
}

// Pranon yyyy-MM-dd dhe dd.MM.yyyy.
function internalDate(value) {
  const text = String(value || '').trim();
  let iso = '';

  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    iso = text;
  } else {
    const match = text.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

    if (!match) return '';

    iso = `${match[3]}-${match[2]}-${match[1]}`;
  }

  const date = new Date(iso + 'T00:00:00Z');

  if (
    !Number.isFinite(date.getTime()) ||
    date.toISOString().slice(0, 10) !== iso
  ) {
    return '';
  }

  return iso;
}

// 01 · Të dhënat e evidencës.
fields.forEach(([id, title, value]) => {
  if (id === 'cycle') {
    const container = document.createElement('div');
    container.className = 'cycle-field';

    container.innerHTML = `
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

    $('metadata').append(container);
    return;
  }

  const label = document.createElement('label');
  label.textContent = title;

  const input = document.createElement('input');
  input.id = id;
  input.type = id === 'start' ? 'date' : 'text';
  input.value = value;

  if (id === 'head') {
    input.readOnly = true;
  }

  if (id !== 'start') {
    input.maxLength = 300;
  }

  label.append(input);
  $('metadata').append(label);
});

// 02 · Kreditet dhe grupet.
labels.forEach((label, index) => {
  const tr = document.createElement('tr');

  tr.innerHTML = `
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

  $('credits').tBodies[0].append(tr);
});

function hasPractice() {
  return numericValue($('c4').value) > 0;
}

// Fsheh ose shfaq Lab. dhe Praktikë.
// Orët e regjistruara nuk fshihen.
function updatePracticeVisibility() {
  const labVisible = numericValue($('c2').value) > 0;
  const practiceVisible = hasPractice();

  $('lessons').querySelectorAll('[data-lab]').forEach(cell => {
    cell.hidden = !labVisible;
  });

  $('lessons').querySelectorAll('[data-practice]').forEach(cell => {
    cell.hidden = !practiceVisible;
  });

  $('lessons').classList.toggle('no-practice', !practiceVisible);

  const hasStoredHours = index => [
    ...$('lessons').querySelectorAll(`[data-h="${index}"]`)
  ].some(input =>
    input.value !== '' && numericValue(input.value) !== 0
  );

  const messages = [];

  if (!labVisible && hasStoredHours(2)) {
    messages.push(
      'Ka orë laboratori të regjistruara, por kreditet ' +
      'e laboratorit janë zero. Orët janë ruajtur. ' +
      'Rivendosni kreditet te seksioni 02 për t’i parë ' +
      'dhe korrigjuar.'
    );
  }

  if (!practiceVisible && hasStoredHours(4)) {
    messages.push(
      'Ka orë praktike të regjistruara, por kreditet ' +
      'e praktikës janë zero. Orët janë ruajtur. ' +
      'Rivendosni kreditet te seksioni 02 për t’i parë ' +
      'dhe korrigjuar.'
    );
  }

  const warning = $('practice-warning');

  if (warning) {
    warning.hidden = messages.length === 0;
    warning.textContent = messages.join(' ');
  }
}

function updateWeek(tr) {
  if (tr.dataset.manual === '1') return;

  tr.querySelector('[data-k="week"]').value = week_(
    internalDate(tr.querySelector('[data-k="date"]').value),
    internalDate($('start').value)
  );
}

function refreshWeeks() {
  $('lessons').tBodies[0].querySelectorAll('tr').forEach(updateWeek);
}

// 03 · Regjistrimet.
function addRow(data = {}) {
  const tr = document.createElement('tr');

  tr.innerHTML = `
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

    ${labels.map((label, index) => `
      <td
        ${index === 2 ? 'data-lab' : ''}
        ${index === 4 ? 'data-practice' : ''}
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
    `).join('')}

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

  tr.dataset.manual = data.manual ? '1' : '0';

  tr.querySelectorAll('[data-k]').forEach(element => {
    const key = element.dataset.k;
    const value = data[key] ?? '';

    if (element.type === 'checkbox') {
      element.checked = !!data[key];
    } else if (key === 'date') {
      element.value = internalDate(value);
    } else if (element.type === 'number') {
      element.value = String(value).replace(',', '.');
    } else {
      element.value = value;
    }
  });

  tr.querySelectorAll('[data-h]').forEach((element, index) => {
    const value = (data.hours || [])[index] ?? '';
    element.value = String(value).replace(',', '.');
  });

  tr.querySelector('button.remove').onclick = () => {
    tr.remove();
    changed();
  };

  $('lessons').tBodies[0].append(tr);

  updateWeek(tr);
  updatePracticeVisibility();
}

function readForm() {
  const data = {
    ...institution,
    credits: labels.map((_, index) => $('c' + index).value),
    groups: labels.map((_, index) => $('g' + index).value),
    notes: $('notes').value,
    rows: []
  };

  fields.forEach(([id]) => {
    data[id] = id === 'start'
      ? internalDate($(id).value)
      : $(id).value.trim();
  });

  $('lessons').tBodies[0].querySelectorAll('tr').forEach(tr => {
    const row = {
      hours: [...tr.querySelectorAll('[data-h]')]
        .map(element => element.value),
      manual: tr.dataset.manual === '1'
    };

    tr.querySelectorAll('[data-k]').forEach(element => {
      const key = element.dataset.k;

      if (element.type === 'checkbox') {
        row[key] = element.checked;
      } else if (key === 'date') {
        row[key] = internalDate(element.value);
      } else {
        row[key] = element.value;
      }
    });

    data.rows.push(row);
  });

  return data;
}

function updateTotals() {
  const data = readForm();
  const result = evaluate_(data);

  $('ects').textContent = result.totalCredits;

  labels.forEach((_, index) => {
    $('expected' + index).textContent = result.expected[index];
  });

  $('summary').tBodies[0].innerHTML = labels
    .map((label, index) => `
      <tr>
        <td>${label}</td>
        <td>${result.actual[index]}</td>
        <td>${result.expected[index]}</td>
        <td class="${result.differences[index] ? 'bad' : ''}">
          ${result.differences[index]}
        </td>
      </tr>
    `).join('');

  [...$('lessons').tBodies[0].rows].forEach((tr, index) => {
    const total = data.rows[index].hours.reduce(
      (sum, value) => sum + numericValue(value),
      0
    );

    tr.querySelector('[data-total]').textContent = round(total);
  });

  return result;
}

function showMessage(text, kind = '') {
  $('status').textContent = text;
  $('status').className = 'status ' + kind;
}

function syncCycle() {
  document.querySelectorAll('[name="cycleChoice"]').forEach(radio => {
    radio.checked = radio.value === $('cycle').value;
  });
}

function changed() {
  syncCycle();
  updatePracticeVisibility();

  dirty = true;
  verified = false;
  formRevision++;

  updateActionButtons();
  showMessage('Të dhënat ndryshuan. Kryeni verifikimin.');
  updateTotals();
}

function validationErrors(result) {
  const errors = [];

  if (!internalDate($('start').value)) {
    errors.push(
      'Zgjidhni një datë të vlefshme për fillimin e semestrit.'
    );
  }

  $('lessons').tBodies[0].querySelectorAll('tr').forEach((tr, index) => {
    const value = tr.querySelector('[data-k="date"]').value;

    if (!internalDate(value)) {
      errors.push(
        'Rreshti ' + (index + 1) +
        ': zgjidhni një datë të vlefshme.'
      );
    }
  });

  labels.forEach((label, index) => {
    const groups = numericValue($('g' + index).value);
    const credits = numericValue($('c' + index).value);

    if (
      !Number.isInteger(groups) ||
      groups < 0 ||
      groups > 6 ||
      (credits > 0 && groups < 1)
    ) {
      errors.push(
        label + ': lejohen 1–6 grupe kur ka kredite, ' +
        'ose 0 kur nuk ka.'
      );
    }
  });

  if (numericValue($('c2').value) <= 0) {
    const hasLabHours = [
      ...$('lessons').querySelectorAll('[data-h="2"]')
    ].some(input => numericValue(input.value) !== 0);

    if (hasLabHours) {
      errors.push(
        'Ka orë laboratori me zero kredite. ' +
        'Rivendosni kreditet te seksioni 02 për t’i korrigjuar.'
      );
    }
  }

  if (!hasPractice()) {
    const hasHours = [
      ...$('lessons').querySelectorAll('[data-h="4"]')
    ].some(input => numericValue(input.value) !== 0);

    if (hasHours) {
      errors.push(
        'Ka orë praktike me zero kredite. ' +
        'Rivendosni kreditet te seksioni 02 për t’i korrigjuar.'
      );
    }
  }

  $('form').querySelectorAll('input[type="number"]').forEach(input => {
    if (input.validity.badInput) {
      errors.push(
        'Vendosni një numër të vlefshëm te: ' +
        (input.getAttribute('aria-label') || 'fusha numerike') +
        '.'
      );
    }
  });

  result.errors.forEach(error => {
    if (
      error === 'Vendosni datën e fillimit të semestrit.' ||
      /^Rreshti \d+: data është e pavlefshme\.$/.test(error)
    ) {
      return;
    }

    errors.push(error);
  });

  return [...new Set(errors)];
}

function verifiedData() {
  if (!verified) {
    throw new Error(
      'Kryeni verifikimin përpara hapjes së raportit ose PDF-së.'
    );
  }

  const data = readForm();
  const errors = validationErrors(evaluate_(data));

  if (errors.length) {
    verified = false;
    updateActionButtons();
    throw new Error(errors.join('\n'));
  }

  return data;
}

// Ndalon ringarkimin e formularit nga submit.
$('form').addEventListener('submit', event => {
  event.preventDefault();
});

function handleFormEdit(event) {
  const target = event.target;

  if (
    !target.matches('input, textarea, select') ||
    target.type === 'file'
  ) {
    return;
  }

  if (target.name === 'cycleChoice') {
    $('cycle').value = target.value;
  }

  if (target.id === 'start') {
    refreshWeeks();
  }

  if (target.dataset.k === 'week') {
    const tr = target.closest('tr');
    tr.dataset.manual = target.value ? '1' : '0';

    if (!target.value) {
      updateWeek(tr);
    }
  }

  if (target.dataset.k === 'date') {
    updateWeek(target.closest('tr'));
  }

  changed();
}

$('form').addEventListener('input', handleFormEdit);
$('form').addEventListener('change', handleFormEdit);

// Shto regjistrim.
$('add').onclick = event => {
  event.preventDefault();

  if ($('lessons').tBodies[0].rows.length >= MAX_ROWS) {
    alert('Maksimumi është ' + MAX_ROWS + ' regjistrime.');
    return;
  }

  addRow();
  changed();
};

// Verifiko formularin.
$('verify').onclick = event => {
  event.preventDefault();

  verified = false;
  updateActionButtons();

  try {
    const result = updateTotals();
    const errors = validationErrors(result);

    if (errors.length) {
      showMessage(errors.join('\n'), 'error');
      return;
    }

    verified = true;
    updateActionButtons();

    showMessage(
      'Verifikimi përfundoi. Të gjitha kategoritë ' +
      'përputhen me ngarkesën e parashikuar. ' +
      'Mund të gjeneroni raportin ose të shkarkoni PDF-në.',
      'success'
    );
  } catch (error) {
    showMessage(
      'Verifikimi nuk u krye: ' + error.message,
      'error'
    );
  }
};

// Hap raportin narrativ HTML.
reportButton.onclick = event => {
  event.preventDefault();

  try {
    const data = verifiedData();

    if (typeof printReport !== 'function') {
      throw new Error(
        'Në pdf.js mungon funksioni printReport().'
      );
    }

    printReport(data);
  } catch (error) {
    showMessage(error.message, 'error');
  }
};

// Shkarkon PDF-në pa prompt dhe pa hapur skedë të re.
if (printPdfButton) {
  printPdfButton.onclick = async event => {
    event.preventDefault();

    if (pdfBusy) return;

    const revisionAtStart = formRevision;

    try {
      const data = verifiedData();

      if (typeof pdfMake === 'undefined') {
        throw new Error(
          'pdfmake nuk u ngarkua. Kontrolloni ' +
          'vendor/pdfmake.min.js në index.html.'
        );
      }

      if (typeof generatePdfBlob !== 'function') {
        throw new Error(
          'Në pdf.js mungon funksioni generatePdfBlob().'
        );
      }

      if (typeof pdfFilename !== 'function') {
        throw new Error(
          'Në pdf.js mungon funksioni pdfFilename().'
        );
      }

      pdfBusy = true;
      updateActionButtons();

      const blob = await generatePdfBlob(data);

      if (!(blob instanceof Blob) || blob.size === 0) {
        throw new Error(
          'Gjenerimi nuk ktheu një skedar PDF të vlefshëm.'
        );
      }

      const filename = pdfFilename(data);
      const downloadFile = new Blob(
        [blob],
        { type: 'application/octet-stream' }
      );

downloadBlob(downloadFile, filename);

      let message = 'PDF: ' + filename;

      if (formRevision !== revisionAtStart) {
        message +=
          ' Formulari ka ndryshime të mëvonshme; ' +
          'verifikojeni përsëri për një dokument të ri.';
      }

      showMessage(
        message,
        formRevision === revisionAtStart ? 'success' : ''
      );
    } catch (error) {
      showMessage(error.message, 'error');
    } finally {
      pdfBusy = false;
      updateActionButtons();
    }
  };
}

// Përdoret për PDF-në dhe draftin JSON.
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.hidden = true;

  try {
    document.body.append(link);
    link.click();
  } finally {
    link.remove();

    // Pastrim i URL-së pas nisjes së shkarkimit.
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 60000);
  }
}

// Ruaj draftin.
$('save').onclick = event => {
  event.preventDefault();

  try {
    const draft = {
      version: 1,
      dateFormat: 'yyyy-MM-dd',
      data: readForm()
    };

    const blob = new Blob(
      [JSON.stringify(draft, null, 2)],
      { type: 'application/json' }
    );

    const now = new Date();
    const downloadDate = [
      String(now.getDate()).padStart(2, '0'),
      String(now.getMonth() + 1).padStart(2, '0'),
      now.getFullYear()
    ].join('.');
    
    downloadBlob(blob, `formular_evidence_${downloadDate}.json`);
    
    dirty = false;
  } catch (error) {
    showMessage(
      'Shkarkimi i draftit nuk u nis: ' + error.message,
      'error'
    );
  }
};

$('load').onclick = event => {
  event.preventDefault();
  $('file').click();
};

function checkDraft(draft) {
  if (
    !draft ||
    draft.version !== 1 ||
    !draft.data ||
    typeof draft.data !== 'object'
  ) {
    throw new Error('Draft i pavlefshëm.');
  }

  const data = draft.data;

  if (
    !Array.isArray(data.credits) ||
    data.credits.length !== 5 ||
    !Array.isArray(data.groups) ||
    ![3, 5].includes(data.groups.length) ||
    !Array.isArray(data.rows) ||
    data.rows.length > MAX_ROWS
  ) {
    throw new Error(
      'Struktura e draftit është e pavlefshme ' +
      'ose ka më shumë se ' + MAX_ROWS + ' regjistrime.'
    );
  }

  data.rows.forEach(row => {
    if (
      !row ||
      typeof row !== 'object' ||
      !Array.isArray(row.hours) ||
      row.hours.length !== 5
    ) {
      throw new Error('Regjistrim i pavlefshëm në draft.');
    }
  });

  return data;
}

// Hap draftin.
$('file').onchange = async () => {
  const file = $('file').files[0];

  if (!file) return;

  try {
    if (file.size > 500000) {
      throw new Error('Skedari është shumë i madh.');
    }

    const draft = JSON.parse(await file.text());
    const data = checkDraft(draft);

    const invalidDates =
      (data.start && !internalDate(data.start)) ||
      data.rows.some(row =>
        row.date && !internalDate(row.date)
      );

    if (
      invalidDates &&
      !confirm(
        'Drafti ka data të paplota ose të pavlefshme. ' +
        'Ato do të shfaqen bosh për t’u plotësuar përsëri. ' +
        'Të vazhdohet?'
      )
    ) {
      return;
    }

    if (
      dirty &&
      !confirm('Të zëvendësohen plotësimet aktuale?')
    ) {
      return;
    }

    fields.forEach(([id, , defaultValue]) => {
      const value = id === 'head'
        ? defaultValue
        : (data[id] ?? defaultValue);

      $(id).value = id === 'start'
        ? internalDate(value)
        : String(value);
    });

    labels.forEach((_, index) => {
      $('c' + index).value = String(
        data.credits[index] ?? 0
      ).replace(',', '.');

      $('g' + index).value = String(
        data.groups[index] ?? 1
      ).replace(',', '.');
    });

    $('notes').value = data.notes || '';
    $('lessons').tBodies[0].replaceChildren();

    data.rows.forEach(addRow);

    if (!data.rows.length) {
      addRow();
    }

    changed();
    dirty = false;

    showMessage(
      'Drafti u hap. Kontrolloni të dhënat ' +
      'dhe shtypni “Verifiko”.'
    );
  } catch (error) {
    alert('Drafti nuk u hap: ' + error.message);
  } finally {
    $('file').value = '';
  }
};

// Pastron formularin vetëm pas konfirmimit.
$('clear').onclick = event => {
  event.preventDefault();

  if (!confirm(
    'Të pastrohet formulari? Ruani draftin nëse ju duhet.'
  )) {
    return;
  }

  fields.forEach(([id, , value]) => {
    $(id).value = value;
  });

  labels.forEach((_, index) => {
    $('c' + index).value = 0;
    $('g' + index).value = 1;
  });

  $('notes').value = '';
  $('lessons').tBodies[0].replaceChildren();

  addRow();
  changed();
  dirty = false;

  showMessage(
    'Plotësoni formularin dhe shtypni “Verifiko”.'
  );
};

// Paralajmëron kur mbyllet ose ringarkohet formulari.
window.addEventListener('beforeunload', event => {
  if (dirty) {
    event.preventDefault();
    event.returnValue = '';
  }
});

// Ekzekutohet vetëm kur ngarkohet faqja e formularit.
addRow();
updateTotals();
updatePracticeVisibility();
updateActionButtons();
