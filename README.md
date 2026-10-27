# EVION — Evidenca dhe përmbledhja e ngarkesës mësimore

Aplikacion web për plotësimin e evidencave mësimore, verifikimin e orëve, gjenerimin e dokumenteve dhe përmbledhjen e ngarkesës së pedagogëve.

Aplikacioni hapet pa identifikim dhe punon në shfletues.

**Hap aplikacionin:** https://lslxslx.github.io/evion/

## 1. Si përdoret formulari

### 01 · Të dhënat e evidencës

Plotësohen të dhënat bazë:

- Pedagogu dhe drejtuesi i departamentit.
- Viti akademik.
- Lënda dhe programi i studimit.
- Cikli i studimit.
- Semestri.
- Data e fillimit të semestrit.

Universiteti, fakulteti dhe departamenti paraqiten në krye të formularit.

Data e fillimit të semestrit përdoret për llogaritjen automatike të javës së çdo regjistrimi.

### 02 · Kreditet dhe ngarkesa

Vendosen kreditet dhe numri i grupeve për:

- Leksione.
- Seminare.
- Laboratorë.
- Detyra/projekte.
- Praktikë.

Lejohen deri në 6 grupe për kategori. Kur një kategori ka kredite, duhet të ketë të paktën një grup.

Orët e parashikuara llogariten sipas formulave të zbatuara në aplikacion:

| Kategoria | Cikli I | Cikli II |
| - | - | - |
| Leksione | Kredite × 12 × grupe | Kredite × 10 × grupe |
| Seminare | Kredite × 14 × grupe | Kredite × 12 × grupe |
| Laboratorë | Kredite × 20 × grupe | Kredite × 20 × grupe |
| Detyra/projekte | Kredite × 5 | Kredite × 5 |
| Praktikë | Kredite × 20 | Kredite × 20 |

ECTS totale është shuma e krediteve të kategorive, pa shumëzim me grupet.

### 03 · Regjistrimet e mësimit

Për çdo regjistrim plotësohen:

- Data.
- Numri i studentëve.
- Tema e mësimit.
- Orët sipas kategorive.
- Shenja e zëvendësimit, kur është e nevojshme.

Java propozohet automatikisht sipas intervaleve 7-ditore nga fillimi i semestrit. Ajo mund të korrigjohet manualisht. Fshirja e vlerës rikthen llogaritjen automatike.

Kolonat e laboratorit dhe të praktikës shfaqen kur kategoritë përkatëse kanë kredite.

Kolona “Shuma / dt.” mbledh orët e atij regjistrimi. Nëse ka disa regjistrime për të njëjtën datë, raporti narrativ i bashkon për kontrollin e totalit ditor.

Regjistrimet e shënuara si zëvendësime paraqiten me simbolin `*` në PDF-në e evidencës.

Fusha “Shënime dhe referenca për zëvendësimet” përdoret për sqarime, numra shkresash dhe referenca.

### 04 · Verifikimi dhe dokumentet

Butoni **Verifiko** kontrollon plotësimin e të dhënave dhe përputhjen e orëve faktike me orët e parashikuara për çdo kategori.

Diferenca llogaritet:

**Orët e parashikuara − Orët faktike**

- Vlerë pozitive: mungojnë orë.
- Vlerë negative: janë tejkaluar orët.
- Zero: orët përputhen.

Kur **verifikimi përfundon** pa gabime, **mund të shkarkohet PDF**-ja e evidencës ose të gjenerohet raporti.

## 2. Dokumentet që gjenerohen

### PDF / Print — Evidenca tabelore

Butoni **PDF / Print** gjeneron dhe shkarkon drejtpërdrejt PDF-në.

Dokumenti përmban:

- Të dhënat e institucionit dhe të lëndës.
- Kreditet dhe grupet.
- Tabelën e regjistrimeve mësimore.
- Totalet faktike dhe orët e parashikuara.
- Deklaratën dhe emrat për firmosje.
- Kodin QR me të dhënat përmbledhëse.

Datat paraqiten në formatin `dd.MM.yyyy`.

Për zëvendësimet, në këtë dokument mbetet vetëm simboli `*`. Teksti i shënimeve paraqitet te raporti narrativ.

Emri i skedarit ka formën:

`Evidence_EmriLendes_EmriPedagogut.pdf`

Hapësirat dhe karakteret e papërshtatshme zëvendësohen me `_`.

### Gjenero raport — Raporti narrativ

Butoni **Gjenero raport** hap raportin në një skedë të re.

Raporti përmban:

- Të dhënat e lëndës dhe kreditet.
- Numrin e javëve me regjistrime mësimore.
- Datën dhe javën e regjistrimit të parë dhe të fundit.
- Orët faktike kundrejt orëve të përcaktuara sipas krediteve.
- Totalin e orëve.
- Datat me më shumë se 8 orë mësimore, të theksuara me të kuqe.
- Shënimet dhe referencat për zëvendësimet.
- Deklaratën, emrin e deklaruesit dhe kodin QR.

Kategoritë me zero kredite nuk shfaqen në përshkrimin narrativ të orëve.

Datat e zëvendësimeve merren nga regjistrimet e shënuara me `*`, renditen dhe paraqiten pa përsëritje. Ato shfaqen edhe kur fusha e shënimeve është bosh.

Nëse ka tekst në fushën e shënimeve, ai paraqitet poshtë me etiketën **Shënime:**.

Nëse nuk ka regjistrime të shënuara si zëvendësime, shfaqet mesazhi:

“Nuk janë bërë zëvendësime.”

Për printim ose ruajtje si PDF përdoret funksioni i shfletuesit:

- **Mac:** `⌘P`.
- **Windows:** `Ctrl+P`.
- **iPhone / iPad:** menuja Share / Ndaj → Print.

Emri i raportit ka formën:

`Raport_EmriLendes_EmriDeklaruesit`

Skeda e raportit mund të mbahet e hapur për printime të përsëritura. Mbyllja e saj nuk e pastron formularin origjinal.

## 3. Vazhdoni më vonë

Formulari ofron:

- **Shkarko draftin:** ruan të dhënat e plota të formularit në një skedar JSON, për të vazhduar më vonë nga kudo.
- **Hap draftin:** ngarkon një draft JSON për të vazhduar plotësimin.
- **Formular i ri:** nis një evidencë të re.
- **Përmbledhja e ngarkesës mësimore:** hap faqen e grumbullimit të evidencave.

Ruajeni draftin përpara mbylljes së formularit. Mos e përdorni skedën e hapur si kopjen e vetme të punës.

## 4. Kodi QR

PDF-ja e evidencës dhe raporti narrativ përmbajnë një kod QR.

QR-ja ruan një përmbledhje JSON me:

- Pedagogun.
- Lëndën dhe programin.
- Vitin akademik, semestrin dhe ciklin.
- Numrin maksimal të studentëve të regjistruar në evidencë.
- Kreditet, grupet dhe orët faktike për kategoritë aktive.

**QR-ja nuk përmban draftin e plotë të formularit.** Ajo nuk ruan temat, të gjitha datat, regjistrimet ditore ose shënimet.

Për të rikthyer formularin e plotë përdoret skedari i krijuar nga **Shkarko draftin**.

QR-ja përmban të dhëna JSON, jo një lidhje web. Kamera e zakonshme e telefonit mund ta njohë si tekst; për ta përfshirë në përmbledhje përdoret skanuesi i aplikacionit.

## 5. Përmbledhja e ngarkesës mësimore

Faqja `/permbledhje/` grumbullon të dhënat e disa evidencave.

Evidencat mund të merren përmes:

- Skanimit të QR-së me kamerë.
- Ngarkimit të një fotografie me QR.
- Ngarkimit të një PDF-je që përmban QR.
- Importimit të skedarëve JSON të përmbledhjes.

Pas leximit, të dhënat paraqiten për kontroll dhe shtim në regjistër.

Importimi i PDF-së kërkon kodin QR; aplikacioni nuk nxjerr të dhënat nga teksti ose tabela e një PDF-je të zakonshme.

### Si bashkohen të dhënat

Për të njëjtin pedagog, evidencat e lëndëve të ndryshme kontribuojnë në totalet e kategorive përkatëse.

Për çdo kategori mblidhen:

- Numri i studentëve.
- Numri i grupeve.
- Orët faktike.

Numri i studentëve merret si maksimumi i regjistruar në secilën evidencë dhe përfshihet një herë për çdo kategori aktive të asaj evidence.

Ky total përfaqëson mbledhjen sipas evidencave; nuk është numër studentësh unikë në të gjitha lëndët.

Orët faktike mblidhen drejtpërdrejt dhe nuk shumëzohen përsëri me grupet.

Shembull: pesë lëndë me nga një grup leksioni kontribuojnë me pesë grupe leksioni dhe me shumën e orëve të tyre.

### Identifikimi i evidencave

Evidenca identifikohet nga kombinimi:

- Pedagog.
- Lëndë.
- Program.
- Vit akademik.
- Semestër.
- Cikël.

Një evidencë identike nuk duhet të shtohet dy herë. Kur importohet një version i ndryshuar me të njëjtin identifikim, aplikacioni kërkon konfirmim për zëvendësimin.

### Filtrat dhe tabela përmbledhëse

Të dhënat filtrohen sipas pedagogut, vitit akademik dhe semestrit.

Tabela paraqet:

- Leksione.
- Seminare/ushtrime.
- Laboratorë.
- Projekte/detyra kursi.
- Shumën e orëve në auditor.
- Praktikën mësimore.
- Zërat e tjerë mbështetës të parashikuar në tabelë.
- Shumën e orëve mbështetëse.
- Shumën totale.

Zërat si udhëheqjet e diplomave dhe angazhimet e doktoraturës nuk plotësohen automatikisht nga QR-ja aktuale e evidencës.

### Eksportimi

- **Eksporto të gjitha evidencat:** shkarkon koleksionin e evidencave të ruajtura si JSON.
- **Eksporto JSON** te një evidencë: shkarkon vetëm atë evidencë.
- **Eksporto CSV:** shkarkon vetëm tabelën përmbledhëse të seksionit 03, sipas paraqitjes aktuale.

CSV-ja përdor ndarësin `;`. Për përputhshmëri me programet ku shfaqeshin probleme kodimi, shkronjat `ë` dhe `ç` zëvendësohen me `e` dhe `c`, ndërsa vizat tipografike zëvendësohen me `-`.

## 6. Ruajtja e të dhënave

Aplikacioni nuk ka një databazë të përbashkët në server dhe nuk krijon llogari përdoruesish.

- Drafti i formularit ruhet nga përdoruesi si skedar JSON.
- Regjistri i përmbledhjes ruhet në `localStorage` të shfletuesit.
- Raporti përdor një kopje të përkohshme në `localStorage` për hapjen e skedës së re dhe një kopje në `sessionStorage` të skedës së raportit.

Regjistri i përmbledhjes nuk sinkronizohet automatikisht ndërmjet telefonit, kompjuterit ose shfletuesve të ndryshëm.

Pastrimi i të dhënave të shfletuesit mund ta fshijë regjistrin lokal. Eksportoni evidencat në JSON për kopje rezervë dhe transferim.

PDF-të dhe QR-të përmbajnë emra dhe të dhëna të ngarkesës mësimore. Kushdo që ka dokumentin mund të lexojë përmbledhjen e ruajtur në QR.

## 7. Kamera dhe skanimi

Për përdorimin e kamerës mbajeni QR-në të plotë brenda pamjes, përdorni ndriçim të mirë dhe shmangni reflektimet.

Zona e videos në faqe paraqitet në formë katrore.

Nëse kamera nuk e lexon QR-në, provoni ngarkimin e fotografisë ose të PDF-së origjinale.

Cilësia e leximit varet nga madhësia dhe dendësia e QR-së, fokusi i kamerës dhe cilësia e figurës.

## 8. Skedarët kryesorë

| Skedari / dosja | Funksioni |
| --- | --- |
| `.` | Struktura e formularit kryesor dhe lidhja e skripteve |
| `.` | Paraqitja e formularit dhe përshtatja për ekranet e vogla |
| `.` | Ndërveprimi me formularin, regjistrimet, draftet dhe butonat |
| `.` | Verifikimi, formulat, totalet dhe llogaritja e javës |
| `.` | PDF-ja tabelore, raporti narrativ dhe të dhënat e QR-së |
| `.` | Hapja dhe paraqitja e raportit në skedë të veçantë |
| `.` | Fontet lokale Comfortaa |
| `.` | Bibliotekat për gjenerimin e PDF-së dhe fontet për pdfmake |
| `.` | Faqja e skanimit, importimit dhe përmbledhjes së evidencave |

### Funksionet kryesore në `pdf.js`

| Funksioni | Përgjegjësia |
| -- | --- |
| -- | Përgatit emrin e PDF-së |
| -- | Gjeneron HTML-në e raportit narrativ |
| -- | Transferon të dhënat dhe hap raportin |
| -- | Ndërton përmbajtjen e PDF-së për pdfmake |
| -- | Gjeneron skedarin PDF |
| -- | Ndërton përmbledhjen për QR-në |
| -- | Serializon përmbledhjen në JSON |
| -- | Paraqet QR-në në raportin HTML |

## 9. Publikimi dhe përditësimi

Aplikacioni publikohet përmes GitHub Pages. Versioni aktual 2026.11.3l

Raportet e hapura më parë mund të mbajnë përmbajtjen e vjetër.

Për prova lokale përdorni një server lokal, jo hapjen e drejtpërdrejtë të skedarit `index.html` me `file://`.

## 10. Kufizime të rëndësishme

- Lejohen 1–100 regjistrime mësimore për evidencë.
- Gjenerimi i dokumenteve kërkon kalimin e verifikimit.
- QR-ja është përmbledhje dhe nuk zëvendëson draftin JSON.
- Emërtimet shumë të gjata mund të tejkalojnë kufirin e përcaktuar për përmbajtjen e QR-së.
- Raporti mund të zgjatet në disa faqe kur ka shumë data ose shënime.
- Fontet ose bibliotekat e lidhura me CDN kërkojnë lidhje interneti për t’u ngarkuar.
- Nuk ka sinkronizim automatik ose arkiv të përbashkët ndërmjet përdoruesve.

## Rrjedha e përdorimit

**Plotëso formularin → Verifiko → Shkarko evidencën / Gjenero raportin → Lexo QR-në te Përmbledhja → Kontrollo dhe shto evidencën → Eksporto totalet.**
