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
  [
    'head',
    'Drejtuesi i departamentit',
    'Prof. Asoc. Dr. Luis Lamani'
  ],
  ['subject', 'Lënda', ''],
  ['program', 'Programi i studimit', ''],
  ['year', 'Viti akademik', '2026-2027'],
  ['semester', 'Semestri', 'I/II'],
  ['cycle', 'Cikli', '1'],
  ['start', 'Data e fillimit të semestrit', '']
];

const MAX_ROWS = 100;

let dirty = false;
let busy = false;
let verified = false;

const disabledStates = new Map();

// Ruajtje e përkohshme në skedën aktuale të shfletuesit.
const SESSION_KEY = 'upt-evidenca-form-v1';

function rememberForm() {
  try {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        version: 1,
        dateFormat: 'yyyy-MM-dd',
        data: readForm()
      })
    );

    return true;
  } catch {
    return false;
  }
}

function restoreForm() {
  let saved;

  try {
    saved = sessionStorage.getItem(SESSION_KEY);

    if (!saved) return false;

    const data = checkDraft(JSON.parse(saved));

    fields.forEach(([id, , defaultValue]) => {
      const value = data[id] ?? defaultValue;

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

    syncCycle();
    updatePracticeVisibility();
    updateTotals();

    dirty = true;
    verified = false;
    $('pdf').disabled = true;

    showMessage(
      'Plotësimet e mëparshme u rikthyen. ' +
      'Kontrollojini dhe shtypni “Verifiko”.'
    );

    return true;
  } catch {
    // Nëse kopja nuk lexohet, formulari nis normalisht.
    return false;
  }
}

// Përshtat butonin edhe nëse HTML-ja ka ende emërtimin e vjetër.
$('pdf').textContent = 'Printo / Ruaj PDF';
$('pdf').disabled = true;

// Lidhja e vjetër e shkarkimit nuk përdoret më.
if ($('download')) {
  $('download').remove();
}

// Pranon yyyy-MM-dd dhe datat e drafteve të vjetra dd.MM.yyyy.
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

function numericValue(value) {
  return Number(String(value || 0).trim().replace(',', '.'));
}

function round(value) {
  return Math.round(value * 1000000) / 1000000;
}

// Fushat bazë të evidencës.
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

    container.querySelectorAll('[name="cycleChoice"]')
      .forEach(radio => {
        radio.addEventListener('input', () => {
          $('cycle').value = radio.value;
        });
      });

    $('metadata').append(container);
    return;
  }

  const label = document.createElement('label');
  label.textContent = title;

  const input = document.createElement('input');
  input.id = id;
  input.type = id === 'start' ? 'date' : 'text';
  input.value = value;

  if (id !== 'start') {
    input.maxLength = 300;
  }

  label.append(input);
  $('metadata').append(label);
});

// Kreditet dhe grupet për të pesë kategoritë.
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

function updatePracticeVisibility() {
  const visible = hasPractice();

  $('lessons').querySelectorAll('[data-practice]')
    .forEach(cell => {
      cell.hidden = !visible;
    });

  $('lessons').classList.toggle('no-practice', !visible);

  const hasStoredHours = [
    ...$('lessons').querySelectorAll('[data-h="4"]')
  ].some(input =>
    input.value !== '' &&
    numericValue(input.value) !== 0
  );

  const warning = $('practice-warning');

  warning.hidden = visible || !hasStoredHours;

  warning.textContent = warning.hidden ? '' :
    'Ka orë praktike të regjistruara, por kreditet e praktikës ' +
    'janë zero. Orët janë ruajtur. Rivendosni kreditet e praktikës ' +
    'te seksioni 02 për t’i parë dhe korrigjuar.';
}

function updateWeek(tr) {
  if (tr.dataset.manual === '1') return;

  tr.querySelector('[data-k="week"]').value = week_(
    internalDate(tr.querySelector('[data-k="date"]').value),
    internalDate($('start').value)
  );
}

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
      <td ${index === 4 ? 'data-practice' : ''}>
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

    if (element.type === 'checkbox') {
      element.checked = !!data[key];
    } else if (key === 'date') {
      element.value = internalDate(data[key]);
    } else if (
      element.type === 'number' &&
      data[key] != null &&
      data[key] !== ''
    ) {
      element.value = String(data[key]).replace(',', '.');
    } else {
      element.value = data[key] ?? '';
    }
  });

  tr.querySelectorAll('[data-h]')
    .forEach((element, index) => {
      const value = (data.hours || [])[index] ?? '';
      element.value = String(value).replace(',', '.');
    });

  tr.querySelector('[data-k="week"]')
    .addEventListener('input', event => {
      tr.dataset.manual = event.target.value ? '1' : '0';

      if (!event.target.value) {
        updateWeek(tr);
      }
    });

  const dateInput = tr.querySelector('[data-k="date"]');

  dateInput.addEventListener('input', () => updateWeek(tr));
  dateInput.addEventListener('change', () => updateWeek(tr));

  tr.querySelector('button.remove').onclick = () => {
    if (busy) return;

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

  $('lessons').tBodies[0].querySelectorAll('tr')
    .forEach(tr => {
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

rememberForm();

function showMessage(text, kind = '') {
  $('status').textContent = text;
  $('status').className = 'status ' + kind;
}

function syncCycle() {
  document.querySelectorAll('[name="cycleChoice"]')
    .forEach(radio => {
      radio.checked = radio.value === $('cycle').value;
    });
}

function changed() {
  syncCycle();
  updatePracticeVisibility();

  dirty = true;
  verified = false;
  $('pdf').disabled = true;

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

  $('lessons').tBodies[0].querySelectorAll('tr')
    .forEach((tr, index) => {
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

  // Kontrollon edhe vlera që shfletuesi nuk arrin
  // t’i interpretojë si numra gjatë plotësimit.
  $('form').querySelectorAll('input[type="number"]')
    .forEach(input => {
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

// Ngjarjet e formularit.
$('form').addEventListener('submit', event => {
  event.preventDefault();
});

$('form').addEventListener('input', event => {
  if (event.target.type === 'file' || busy) return;

  if (event.target.name === 'cycleChoice') {
    $('cycle').value = event.target.value;
  }

  changed();
});

$('form').addEventListener('change', event => {
  if (event.target.type === 'file' || busy) return;

  if (event.target.name === 'cycleChoice') {
    $('cycle').value = event.target.value;
  }

  if (event.target.matches('input, textarea, select')) {
    changed();
  }
});

function refreshWeeks() {
  $('lessons').tBodies[0].querySelectorAll('tr')
    .forEach(updateWeek);
}

$('start').addEventListener('input', refreshWeeks);
$('start').addEventListener('change', refreshWeeks);

// Shtimi i një regjistrimi.
$('add').onclick = () => {
  if (busy) return;

  if ($('lessons').tBodies[0].rows.length >= MAX_ROWS) {
    alert('Maksimumi është ' + MAX_ROWS + ' regjistrime.');
    return;
  }

  addRow();
  changed();
};

// Verifikimi përpara printimit.
$('verify').onclick = () => {
  if (busy) return;

  verified = false;
  $('pdf').disabled = true;

  try {
    const result = updateTotals();
    const errors = validationErrors(result);

    if (errors.length) {
      showMessage(errors.join('\n'), 'error');
      return;
    }

    verified = true;
    $('pdf').disabled = false;

    showMessage(
      'Verifikimi përfundoi. Të gjitha kategoritë ' +
      'përputhen me ngarkesën e parashikuar. ' +
      'Mund të vazhdoni me printimin ose ruajtjen si PDF.',
      'success'
    );
  } catch (error) {
    showMessage(
      'Verifikimi nuk u krye: ' + error.message,
      'error'
    );
  }
};

// Përdoret vetëm për shkarkimin e draftit JSON.
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;

  document.body.append(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

// Ruajtja e draftit.
$('save').onclick = () => {
  if (busy) return;

  const draft = {
    version: 1,
    dateFormat: 'yyyy-MM-dd',
    data: readForm()
  };

  const blob = new Blob(
    [JSON.stringify(draft, null, 2)],
    { type: 'application/json' }
  );

  downloadBlob(blob, 'Evidenca-draft.json');
  dirty = false;
};

$('load').onclick = () => {
  if (busy) return;
  $('file').click();
};

// Kontrolli i strukturës së draftit përpara importimit.
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

// Hapja e draftit.
$('file').onchange = async () => {
  const file = $('file').files[0];

  if (!file || busy) return;

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
      const value = data[id] ?? defaultValue;

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

// Formular i ri.
$('clear').onclick = () => {
  if (busy) return;

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

// Bllokon përkohësisht formularin gjatë përgatitjes së raportit.
// Pas përfundimit rikthen gjendjen e mëparshme të kontrolleve.
function setBusy(value) {
  if (value === busy) return;

  if (value) {
    disabledStates.clear();

    $('form')
      .querySelectorAll('input, textarea, select, button')
      .forEach(element => {
        disabledStates.set(element, element.disabled);
        element.disabled = true;
      });

    busy = true;
    return;
  }

  disabledStates.forEach((wasDisabled, element) => {
    if (element.isConnected) {
      element.disabled = wasDisabled;
    }
  });

  disabledStates.clear();
  busy = false;

  $('pdf').disabled = !verified;
}

// Printimi dhe ruajtja si PDF përmes shfletuesit.
$('pdf').onclick = async () => {
  if (busy) return;

  if (!verified) {
    showMessage(
      'Kryeni verifikimin përpara printimit.',
      'error'
    );

    $('pdf').disabled = true;
    return;
  }

  try {
    const data = readForm();
    const result = evaluate_(data);
    const errors = validationErrors(result);

    if (errors.length) {
      verified = false;
      $('pdf').disabled = true;

      showMessage(errors.join('\n'), 'error');
      return;
    }

    if (typeof printReport !== 'function') {
      throw new Error(
        'Funksioni i printimit nuk u ngarkua. ' +
        'Kontrolloni që pdf.js i ri të ngarkohet përpara app.js.'
      );
    }
    rememberForm();
    setBusy(true);
    showMessage('Po përgatitet evidenca për printim…');

    // printReport hap dritaren përpara pritjes së fonteve.
    await printReport(data);

    showMessage(
      'Për ta ruajtur evidencën, përdorni “Printo / Ruaj PDF” ' +
      'në dritaren e raportit dhe zgjidhni “Save as PDF”. ' +
      'Nëse e mbyllët raportin, mund ta hapni përsëri.'
    );
  } catch (error) {
    showMessage(
      'Printimi nuk u përgatit: ' + error.message +
      '\nMund të ruani draftin dhe të provoni përsëri.',
      'error'
    );
  } finally {
    if (busy) {
      setBusy(false);
    }
  }
};

// Printimi nuk e shënon draftin si të ruajtur.
window.addEventListener('beforeunload', event => {
  if (dirty || busy) {
    event.preventDefault();
    event.returnValue = '';
  }
});

// Nisja e formularit.
if (!restoreForm()) {
  // Pastron edhe ndonjë rikthim të pjesshëm.
  $('lessons').tBodies[0].replaceChildren();

  addRow();
  updateTotals();
  updatePracticeVisibility();
}

// Ruaj edhe kur faqja kalon në sfond.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    rememberForm();
  }
});

window.addEventListener('pagehide', rememberForm);
