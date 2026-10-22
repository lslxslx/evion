
    

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

    let dirty = false;
    let busy = false;
    let pdfUrl = null;

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
      return Number($('c4').value || 0) > 0;
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
        input.value !== '' && Number(input.value) !== 0
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
        } else {
          element.value = data[key] ?? '';
        }
      });

      tr.querySelectorAll('[data-h]')
        .forEach((element, index) => {
          element.value = (data.hours || [])[index] ?? '';
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

      tr.querySelector('button').onclick = () => {
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
          (sum, value) => sum + Number(value || 0),
          0
        );

        tr.querySelector('[data-total]').textContent =
          Math.round(total * 1000000) / 1000000;
      });

      return result;
    }

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
      $('pdf').disabled = true;
      $('download').hidden = true;

      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        pdfUrl = null;
      }

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
        const groups = Number($('g' + index).value);
        const credits = Number($('c' + index).value || 0);

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
        ].some(input => Number(input.value || 0) !== 0);

        if (hasHours) {
          errors.push(
            'Ka orë praktike me zero kredite. ' +
            'Rivendosni kreditet te seksioni 02 për t’i korrigjuar.'
          );
        }
      }

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

    $('form').addEventListener('submit', event => {
      event.preventDefault();
    });

    $('form').addEventListener('input', event => {
      if (event.target.type !== 'file') changed();
    });

    $('form').addEventListener('change', event => {
      if (
        event.target.type === 'date' ||
        event.target.type === 'checkbox' ||
        event.target.type === 'radio'
      ) {
        if (event.target.name === 'cycleChoice') {
          $('cycle').value = event.target.value;
        }

        changed();
      }
    });

    function refreshWeeks() {
      $('lessons').tBodies[0].querySelectorAll('tr')
        .forEach(updateWeek);
    }

    $('start').addEventListener('input', refreshWeeks);
    $('start').addEventListener('change', refreshWeeks);

    $('add').onclick = () => {
      if ($('lessons').tBodies[0].rows.length >= 100) {
        alert('Maksimumi është 100 regjistrime.');
        return;
      }

      addRow();
      changed();
    };

    $('verify').onclick = () => {
      $('download').hidden = true;
      const result = updateTotals();
      const errors = validationErrors(result);

      if (errors.length) {
        showMessage(errors.join('\n'), 'error');
        $('pdf').disabled = true;
      } else {
        showMessage(
          'Verifikimi përfundoi. Të gjitha kategoritë ' +
          'përputhen me ngarkesën e parashikuar.',
          'success'
        );

        $('pdf').disabled = false;
      }
    };

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

    $('save').onclick = () => {
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

    $('load').onclick = () => $('file').click();

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
        data.rows.length > 100
      ) {
        throw new Error('Struktura e draftit është e pavlefshme.');
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
          data.rows.some(row => row.date && !internalDate(row.date));

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
          $('c' + index).value = data.credits[index] ?? 0;
          $('g' + index).value = data.groups[index] ?? 1;
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
          'Drafti u hap. Kontrolloni të dhënat dhe shtypni “Verifiko”.'
        );
      } catch (error) {
        alert('Drafti nuk u hap: ' + error.message);
      } finally {
        $('file').value = '';
      }
    };

    $('clear').onclick = () => {
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

      showMessage('Plotësoni formularin dhe shtypni “Verifiko”.');
    };

    function setBusy(value) {
      busy = value;

      $('form').querySelectorAll('input, textarea, button')
        .forEach(element => {
          element.disabled = value;
        });
    }

    $('pdf').onclick = async () => {
      const data = readForm();
      const errors = validationErrors(evaluate_(data));
      if (errors.length) {
        showMessage(errors.join('\n'), 'error');
        $('pdf').disabled = true;
        return;
      }
      $('download').hidden = true;
      setBusy(true);
      showMessage('Po gjenerohet PDF-ja…');
      try {
        const blob = await generatePdfBlob(data);
        if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        pdfUrl = URL.createObjectURL(blob);
        $('download').href = pdfUrl;
        $('download').download = pdfFilename(data);
        $('download').hidden = false;
        $('download').click();
        showMessage('PDF-ja u krijua. Nëse shkarkimi nuk filloi, shtypni “Shkarko PDF”.', 'success');
      } catch (error) {
        showMessage('PDF-ja nuk u gjenerua: ' + error.message + '\nMund të ruani draftin dhe të provoni përsëri.', 'error');
      } finally {
        setBusy(false);
      }
    };

    window.addEventListener('beforeunload', event => {
      if (dirty || busy) {
        event.preventDefault();
        event.returnValue = '';
      }
    });

    addRow();
    updateTotals();
    updatePracticeVisibility();
  