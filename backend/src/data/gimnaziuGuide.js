// Ghid intern pentru Sunt de 10, clasele 5–8, doar Română și Matematică.
//
// Sursa de orientare: programa școlară oficială aprobată prin
// OMEN nr. 3393/28.02.2017 (Ministerul Educației), publicată în
// Monitorul Oficial nr. 164 bis / 07.03.2017. Am citit programele
// de Limba și literatura română și de Matematică pentru gimnaziu
// de pe site-uri ale ministerului / inspectoratelor (edu.ro, ISJ).
//
// Nu copiem manuale de pe manuale.edu.ro și nu reluăm textul
// programelor. Mai jos sunt rezumate în cuvintele noastre: ce am
// înțeles că trebuie să știe un elev, pe ani, ca mentorul să
// ghideze fără să predea dintr-un manual anume.

const { lessonsFor } = require('./gimnaziuLessons');
const { grade5Guide } = require('./romana5Litera');
const { grade6Guide } = require('./romana6Litera');
const { grade7Guide } = require('./romana7Litera');
const { grade8Guide } = require('./romana8Litera');
const { shapeUnit } = require('./lessonShape');
const { glossaryFor } = require('./chapterGlossary');
const { dailyQuote, formatQuote } = require('./quotes');
const { listGeometryAtlas } = require('./geometryAtlas');

const SOURCE = {
  authority: "Ministerul Educației",
  ordinance: "OMEN 3393/28.02.2017",
  published: "Monitorul Oficial nr. 164 bis / 07.03.2017",
  portal: "https://www.edu.ro/Ordin_ministru_3393_2017",
  textbooks: "https://www.manuale.edu.ro/",
  disclaimer:
    "La clasa a V-a, româna urmează cuprinsul manualului Litera, A1249. La clasa a VI-a, manualul Litera, A1470, este parcurs până la capăt: recapitularea inițială, Unitățile 1–6 și încheierea anului. La clasa a VII-a, manualul Litera, A1732, cuprinde recapitularea inițială, Unitatea 1 până la capăt, Unitatea 2 până la capăt, Unitatea 3, Tărâmul sentimentelor, până la capăt, Unitatea 4, Lumea teatrului, până la capăt, Unitatea 5, Călător prin lume, până la capăt, Unitatea 6, Privind către mine, până la capăt, și recapitularea finală. La clasa a VIII-a, manualul Litera, A1954, este parcurs până la capăt: testul inițial, Unitatea 1, Călătoria, Unitatea 2, O lume plină de sentimente, Unitatea 3, Valori și atitudini, până la recapitulare, Unitatea 4, Tradiție și inovație, până la turismul cultural, Unitatea 5, Modele și antimodele, până la recapitulare, și Unitatea 6, Familia și comunitatea, până la recapitulare. Foile de evaluare finală și fișa de observare nu sunt lecții. Planul principal ține itemii care aduc puncte la Evaluarea Națională: compunerea, caracterizarea, coerența, timpurile, anafora și originalitatea, pe lângă subordonate, figuri și fonetică. Planul secundar păstrează, scurt, atitudinile orale, jargonul, argoul și proiectele. Textul lecțiilor e un rezumat propriu: nu copiem fragmentele și exercițiile."
};

const GRADES = [5, 6, 7, 8];
const SUBJECT_IDS = ["matematica", "romana"];

const SUBJECT_ALIASES = {
  matematica: "matematica",
  mate: "matematica",
  math: "matematica",
  mathematics: "matematica",
  romana: "romana",
  română: "romana",
  romanian: "romana",
  "limba romana": "romana",
  "limba română": "romana",
  llr: "romana"
};

function normalizeGrade(value) {
  const raw = String(value == null ? "" : value).trim().toLowerCase();
  if (!raw) return 5;
  const digits = raw.match(/[5-8]/);
  if (digits) return Number(digits[0]);
  if (raw.includes("viii") || raw.includes("8")) return 8;
  if (raw.includes("vii") || raw.includes("7")) return 7;
  if (raw.includes("vi") || raw.includes("6")) return 6;
  if (raw.includes("v") || raw === "5") return 5;
  return 5;
}

function normalizeSubject(value) {
  const raw = String(value == null ? "" : value).trim().toLowerCase();
  if (!raw) return "matematica";
  if (SUBJECT_ALIASES[raw]) return SUBJECT_ALIASES[raw];
  if (raw.includes("rom")) return "romana";
  if (raw.includes("mate") || raw.includes("math")) return "matematica";
  return "matematica";
}

const GUIDES = {
  matematica: {
    5: {
      title: "Matematică, clasa a V-a",
      howISeeIt:
        "Anul ăsta e podul de la aritmetica din primar către gimnaziu. Numerele naturale acoperă scrierea, axa, compararea, aproximările, cele patru operații, puterile, metodele și divizibilitatea. Fracțiile ordinare continuă cu echivalența, axa, numerele mixte, c.m.m.d.c., c.m.m.m.c. și operațiile, iar zecimalele adaugă virgula, perioada și media. La sfârșitul capitolului de fracții organizezi datele: frecvență, bare și media setului. Apoi vin figurile: punct, dreaptă, segment, unghi, congruență, simetrie și unitățile de lungime, arie și volum. Lucrăm intuitiv: mai întâi desen, estimare, exemplu din viață, abia apoi formulă.",
      units: [
        {
          id: "naturale",
          title: "Numere naturale",
          inOwnWords:
            "Scrii și citești numere, le pui pe axă, le compari și le aproximezi. Apoi aduni, scazi, înmulțești și împarți, cu rest sau fără. Înveți puterile, pătratele perfecte, baza 2 și ordinea operațiilor. Rezolvi probleme prin reducere la unitate, comparație, desen, mers invers sau falsă ipoteză. La sfârșit recunoști divizorii, multiplii, criteriile și numerele prime.",
          toc: [
            "Curiozități din lumea numerelor naturale",
            "Scrierea și citirea numerelor naturale",
            "Reprezentarea numerelor naturale pe axă",
            "Compararea și ordonarea numerelor naturale",
            "Aproximări și estimări",
            "Recapitulare: numere naturale",
            "Adunarea numerelor naturale",
            "Scăderea numerelor naturale",
            "Înmulțirea numerelor naturale",
            "Împărțirea cu rest zero",
            "Împărțirea cu rest",
            "Recapitulare: operații",
            "Puterea cu exponent natural",
            "Reguli de calcul cu puteri",
            "Compararea puterilor",
            "Pătratul unui număr natural",
            "Scrierea în baza 10 și în baza 2",
            "Ordinea efectuării operațiilor",
            "Recapitulare: puteri",
            "Metoda reducerii la unitate",
            "Metoda comparației",
            "Metoda figurativă",
            "Metoda mersului invers",
            "Metoda falsei ipoteze",
            "Recapitulare: metode aritmetice",
            "Divizor și multiplu",
            "Divizor comun și multiplu comun",
            "Criteriile de divizibilitate cu 2, 5 și 10",
            "Criteriile de divizibilitate cu 3 și cu 9",
            "Numere prime și numere compuse",
            "Recapitulare: divizibilitate"
          ]
        },
        {
          id: "fractii",
          title: "Fracții ordinare și zecimale",
          inOwnWords:
            "Fracția taie un întreg în părți egale. Înveți felurile ei, echivalența, compararea, axa, numerele mixte, c.m.m.d.c. și c.m.m.m.c., apoi adunarea, înmulțirea, procentul, împărțirea și puterea. Zecimala este aceeași valoare scrisă cu virgulă: o compari, o rotunjești, o calculezi, recunoști perioada și o aduci înapoi la fracție. Media și problemele cu unități de măsură închid capitolul.",
          toc: [
            "Fractali: triunghiul și pătratul",
            "Fracția ordinară",
            "Fracții echivalente",
            "Compararea fracțiilor ordinare",
            "Fracții pe axa numerelor",
            "Numere mixte",
            "Cel mai mare divizor comun",
            "Amplificare și simplificare",
            "Cel mai mic multiplu comun și numitorul comun",
            "Recapitulare: fracții ordinare",
            "Adunarea și scăderea fracțiilor",
            "Înmulțirea fracțiilor",
            "Fracție dintr-un număr și procentul",
            "Împărțirea fracțiilor",
            "Puterea unei fracții",
            "Recapitulare: operații cu fracții",
            "Un tabel pentru un șir de date",
            "Scrierea fracțiilor zecimale",
            "Compararea fracțiilor zecimale",
            "Aproximări și zecimale pe axă",
            "Recapitulare: scrierea zecimalelor",
            "Adunarea și scăderea zecimalelor",
            "Înmulțirea zecimalelor",
            "Împărțirea cu rezultat zecimal și media",
            "De la fracție ordinară la zecimală periodică",
            "Împărțirea a două zecimale",
            "De la zecimală la fracție ordinară",
            "Numărul rațional pozitiv și ordinea operațiilor",
            "Metode cu fracții și unități de măsură",
            "Recapitulare: fracții zecimale",
            "Tabelul de frecvențe",
            "Grafice și media unui set de date",
            "Recapitulare: organizarea datelor"
          ]
        },
        {
          id: "geometrie",
          title: "Elemente de geometrie și unități de măsură",
          inOwnWords:
            "Punctul, dreapta și planul deschid geometria. Înveți semidreapta, segmentul, semiplanul și poziția a două drepte. Măsori lungimea, găsești mijlocul și construiești unghiul cu raportorul. Clasifici unghiurile, calculezi cu grade și minute, recunoști figuri congruente și axa de simetrie. La urmă treci lungimi, arii și volume dintr-o unitate în alta și calculezi perimetrul, aria dreptunghiului și volumul cutiei.",
          toc: [
            "Punct, dreaptă, plan",
            "Punctul și dreapta. Puncte coliniare",
            "Semidreaptă, segment, semiplan",
            "Poziții relative a două drepte",
            "Distanța și segmente congruente",
            "Mijlocul unui segment",
            "Recapitulare: punct, dreaptă, segment",
            "Unghiul: vârf, laturi, interior",
            "Măsura unui unghi",
            "Clasificări și unghiuri congruente",
            "Grade și minute",
            "Recapitulare: unghiuri",
            "Figuri congruente",
            "Axă de simetrie",
            "Recapitulare: congruență și simetrie",
            "Unități pentru lungime și perimetrul",
            "Unități pentru arie",
            "Unități pentru volum și capacitate",
            "Recapitulare: geometrie și unități"
          ]
        }
      ]
    },
    6: {
      title: "Matematică, clasa a VI-a",
      howISeeIt:
        "Manualul Litera, clasa a VI-a, merge în ordinea asta: mulțimi și divizibilitate, rapoarte și proporții, numere întregi, numere raționale, apoi geometria. La geometrie înveți unghiul cu minute și secunde, paralelele, perpendiculara, cercul și triunghiul, până la Pitagora.",
      units: [
        {
          id: "multimi",
          title: "Mulțimi. Mulțimea numerelor naturale",
          inOwnWords:
            "Mulțimea strânge obiecte distincte. Înveți apartenența, incluziunea, reuniunea, intersecția și diferența. Apoi divizibilitatea în ℕ: criterii, descompunere în prime, c.m.m.d.c., c.m.m.m.c. și proprietățile cu care justifici.",
          toc: [
            "Mulțimi. Mulțimea numerelor naturale",
            "Relații între mulțimi",
            "Reuniunea, intersecția, diferența",
            "Aplicații cu mulțimi",
            "Divizibilitate în ℕ",
            "Descompunerea în factori primi",
            "Cel mai mare divizor comun",
            "Cel mai mic multiplu comun",
            "Proprietăți ale divizibilității",
            "Recapitulare: mulțimi și divizibilitate"
          ]
        },
        {
          id: "proportii",
          title: "Rapoarte și proporții",
          inOwnWords:
            "Raportul compară două mărimi de aceeași unitate. Proporția are extremi și mezi. Mărimile direct proporționale țin raportul, cele invers proporționale țin produsul. Procentul, graficele și probabilitatea sunt tot părți dintr-un întreg.",
          toc: [
            "Rapoarte",
            "Proporții",
            "Șir de rapoarte egale",
            "Mărimi direct și invers proporționale",
            "Regula de trei simplă",
            "Procente",
            "Grafice și frecvențe",
            "Probabilități",
            "Recapitulare: rapoarte și proporții"
          ]
        },
        {
          id: "intregi-rationale",
          title: "Numere întregi și numere raționale",
          inOwnWords:
            "ℤ adaugă numerele negative. Modulul este distanța până la zero. Înveți semnele la operații, puterile, ecuațiile și inecuațiile în ℤ. ℚ strânge fracțiile echivalente, cu axă, operații, exponenți întregi și ecuații.",
          toc: [
            "Mulțimea numerelor întregi",
            "Modulul și compararea",
            "Adunarea și scăderea în ℤ",
            "Înmulțirea în ℤ",
            "Împărțirea în ℤ",
            "Puterea unui număr întreg",
            "Calcule cu adunări și scăderi",
            "Ordinea operațiilor în ℤ",
            "Ecuații în ℤ",
            "Inecuații în ℤ",
            "Probleme cu ecuații în ℤ",
            "Recapitulare: numere întregi",
            "Numărul rațional",
            "Axa și modulul în ℚ",
            "Compararea numerelor raționale",
            "Adunarea și scăderea în ℚ",
            "Înmulțirea și împărțirea în ℚ",
            "Puterea cu exponent întreg",
            "Ordinea operațiilor în ℚ",
            "Ecuații în ℚ",
            "Probleme cu ecuații în ℚ",
            "Recapitulare: numere raționale"
          ]
        },
        {
          id: "triunghi",
          title: "Unghiuri, paralele, cerc și triunghi",
          inOwnWords:
            "Unghiurile se calculează în grade, minute și secunde. Paralelele și secanta dau criterii. Perpendiculara măsoară distanța. Cercul are rază, diametru și unghi la centru. Triunghiul are suma 180°, linii importante, congruență și Pitagora.",
          toc: [
            "Unghiuri: recapitulare și completări",
            "Unghiuri complementare și suplementare",
            "Unghiuri opuse la vârf",
            "Unghiuri adiacente",
            "Drepte paralele",
            "Unghiuri formate cu o secantă",
            "Criterii de paralelism",
            "Paralele în figuri",
            "Drepte perpendiculare",
            "Mediatoarea unui segment",
            "Simetrie față de o dreaptă",
            "Cercul și elementele lui",
            "Unghi la centru",
            "Poziții: dreaptă și cerc, două cercuri",
            "Recapitulare: unghiuri, paralele, cerc",
            "Triunghiul. Clasificare. Perimetru",
            "Suma unghiurilor. Unghi exterior",
            "Construcția triunghiurilor",
            "Bisectoarele triunghiului",
            "Mediatoarele triunghiului",
            "Înălțimile triunghiului",
            "Medianele triunghiului",
            "Congruența triunghiurilor",
            "Criterii de congruență",
            "Congruența triunghiurilor dreptunghice",
            "Metoda triunghiurilor congruente",
            "Puncte pe bisectoare și pe mediatoare",
            "Triunghiul isoscel",
            "Triunghiul echilateral",
            "Triunghiul dreptunghic și Pitagora",
            "Recapitulare: triunghiul și clasa a VI-a"
          ]
        }
      ]
    },
    7: {
      title: "Matematică, clasa a VII-a",
      howISeeIt:
        "Întâi numerele reale: radicali, iraționale, modul, medii și ecuația x^2 = a. Apoi ecuațiile și sistemele liniare. Organizarea datelor înseamnă produs cartezian, axe și dependențe, fără noțiunea de funcție. Geometria urmează ordinea din manual: patrulater, cerc, asemănare, relații metrice. Formulele de calcul prescurtat, descompunerea algebrică și raționalizarea cu conjugată rămân la clasa a VIII-a.",
      units: [
        {
          id: "reale",
          title: "Numere reale și radicali",
          inOwnWords:
            "Rădăcina pătrată desface un pătrat. Iraționalele au zecimale infinite, fără perioadă. Calculezi cu radicali, raționalizezi un numitor de forma a√b, folosești media ponderată și media geometrică, apoi rezolvi x^2 = a.",
          toc: [
            "Ne amintim din clasa a VI-a",
            "Rădăcina pătrată a unui pătrat perfect",
            "Rădăcina pătrată a unui rațional",
            "Estimarea rădăcinii pătrate",
            "Numere iraționale",
            "Mulțimea numerelor reale",
            "Scoaterea factorilor de sub radical",
            "Introducerea factorilor sub radical",
            "Aproximare și reprezentare pe axă",
            "Compararea numerelor reale",
            "Modulul unui număr real",
            "Operații cu numere reale",
            "Puteri ale numerelor reale",
            "Raționalizarea numitorului a√b",
            "Ordinea operațiilor",
            "Media aritmetică ponderată",
            "Media geometrică",
            "Ecuații de forma x^2 = a",
            "Recapitulare: numere reale"
          ]
        },
        {
          id: "ecuati",
          title: "Ecuații și sisteme liniare",
          inOwnWords:
            "O ecuație este un cântar: ce faci într-o parte faci și în cealaltă. ax + b = 0 are o soluție, niciuna sau o infinitate. Un sistem cere o pereche care ține în ambele ecuații. O afli prin substituție sau prin reducere, apoi o verifici în poveste.",
          toc: [
            "Egalități echivalente și identități",
            "Ecuația ax + b = 0",
            "Ecuații cu două necunoscute",
            "Sisteme de două ecuații",
            "Metoda substituției și metoda reducerii",
            "Probleme cu ecuații și sisteme",
            "Recapitulare: ecuații și sisteme"
          ]
        },
        {
          id: "date",
          title: "Organizarea datelor",
          inOwnWords:
            "Produsul cartezian strânge perechile ordonate. Axele Ox și Oy așază punctele, distanțele și mijlocul unui segment. O dependență dă un singur corespondent pentru fiecare element, prin diagramă, tabel sau grafic.",
          toc: [
            "Produsul cartezian",
            "Sistem de axe ortogonale",
            "Dependențe prin diagrame și tabele",
            "Dependențe prin grafice",
            "Recapitulare: organizarea datelor"
          ]
        },
        {
          id: "geo7",
          title: "Patrulater, cerc, asemănare, metrică",
          inOwnWords:
            "Patrulaterul aduce paralelogramul, dreptunghiul, rombul, pătratul, trapezul și ariile, inclusiv linia mijlocie în triunghi și centrul de greutate. Cercul aduce coarde, unghiul înscris, tangente, poligoane regulate, lungimea și aria. Asemănarea pleacă de la Thales. În triunghiul dreptunghic apar proiecțiile, Pitagora și sinusul.",
          toc: [
            "Patrulater convex și suma unghiurilor",
            "Paralelogramul",
            "Condiții pentru paralelogram",
            "Linia mijlocie și centrul de greutate",
            "Dreptunghiul",
            "Rombul",
            "Pătratul",
            "Trapezul",
            "Linia mijlocie a trapezului",
            "Perimetru și aria pătratului și a dreptunghiului",
            "Aria paralelogramului",
            "Aria triunghiului",
            "Aria rombului",
            "Aria trapezului",
            "Recapitulare: patrulaterul",
            "Coarde și arce",
            "Unghi înscris",
            "Tangente",
            "Poligoane regulate",
            "Lungimea cercului și aria discului",
            "Recapitulare: cercul",
            "Segmente proporționale",
            "Paralele echidistante",
            "Teorema lui Thales",
            "Reciproca lui Thales",
            "Împărțirea în părți proporționale",
            "Triunghiuri asemenea",
            "Criterii de asemănare",
            "Aplicații practice ale asemănării",
            "Recapitulare: asemănarea",
            "Proiecții ortogonale",
            "Teorema înălțimii",
            "Teorema catetei",
            "Teorema lui Pitagora și reciproca",
            "Sinus, cosinus, tangentă, cotangentă",
            "Rezolvarea triunghiului dreptunghic",
            "Aplicații în poligoane regulate",
            "Recapitulare: relații metrice și clasa a VII-a"
          ]
        }
      ]
    },
    8: {
      title: "Matematică, clasa a VIII-a",
      howISeeIt:
        "Programa ține nucleul, iar acesta este planul principal: intervale și inecuații, calculul cu litere și formulele scurte, ecuația de gradul II prin completarea pătratului, funcția f(x) = ax + b, frecvența, media, mediana, modul, amplitudinea, geometria în spațiu, ariile și volumele. Planul secundar rămâne scurt: formula cu Δ, Thales în spațiu, poreclele de demonstrație și corpurile lui Platon. Nu se învață pași de click.",
      units: [
        {
          id: "intervale",
          title: "Intervale și inecuații",
          inOwnWords:
            "O mulțime se scrie printr-o proprietate, un interval este o bucată de axă, iar inecuația ax + b întreabă pentru ce x rămâne adevărată. Sensul se întoarce când înmulțești sau împarți cu un număr negativ.",
          toc: [
            "Ne amintim din clasa a VII-a",
            "Mulțimi descrise printr-o proprietate",
            "Relații și operații cu mulțimi",
            "Axa și submulțimi ale dreptei",
            "Intervale de numere reale",
            "Operații cu intervale",
            "Proprietăți ale inegalităților",
            "Inecuația ax + b",
            "Inecuații cu paranteze, fracții și regula semnelor",
            "Recapitulare: intervale și inecuații"
          ]
        },
        {
          id: "algebric",
          title: "Calcul algebric",
          inOwnWords:
            "Termenii asemenea se reduc. (a ± b)^2 și a^2 − b^2 se descompun și raționalizează. Fracția algebrică cere numitor nenul. Ecuația de gradul II se rezolvă formând un pătrat sau un produs. Formula cu Δ este plan secundar.",
          toc: [
            "Calcule cu numere reale și litere",
            "Pătratul sumei și al diferenței. Diferența de pătrate",
            "Raționalizarea cu conjugată",
            "Factor comun și grupare",
            "Descompunere cu formule de calcul prescurtat",
            "Trinomul și alte descompuneri",
            "Fracții algebrice. Domeniu",
            "Operații cu fracții algebrice",
            "Ecuația de gradul al doilea",
            "Plan secundar: formula cu Δ",
            "Probleme cu ecuații de gradul al doilea",
            "Recapitulare: calcul algebric"
          ]
        },
        {
          id: "functii",
          title: "Funcții și statistică",
          inOwnWords:
            "O funcție dă fiecărui x un singur f(x). f(x) = ax + b are graficul o dreaptă sau o bucată de dreaptă. La date, frecvența, media, mediana, modul și amplitudinea spun ce face setul.",
          toc: [
            "Noțiunea de funcție",
            "Graficul unei funcții",
            "Funcția f(x) = ax + b",
            "Funcții pe un interval. Lecturi grafice",
            "Sortare și frecvență",
            "Tabel, bare și poligon",
            "Media, mediana, modul și amplitudinea",
            "Recapitulare: funcții și statistică"
          ]
        },
        {
          id: "spatiu",
          title: "Geometrie în spațiu",
          inOwnWords:
            "Puncte, drepte și plane, apoi piramida, prisma, cilindrul și conul. Paralelismul, perpendicularitatea, proiecțiile și diedrul pregătesc ariile și volumele, inclusiv trunchiurile și sfera. Thales în spațiu rămâne plan secundar.",
          toc: [
            "Puncte, drepte și plane",
            "Drepte în spațiu și determinarea planului",
            "Dreapta și planul",
            "Plane secante și plane paralele",
            "Piramida și desfășurarea ei",
            "Prisma dreaptă și desfășurarea ei",
            "Cilindrul circular drept",
            "Conul circular drept",
            "Unghiul a două drepte în spațiu",
            "Dreaptă paralelă cu un plan",
            "Plane paralele tăiate de o secantă",
            "Secțiuni paralele cu baza și trunchiuri",
            "Plan secundar: Thales în spațiu",
            "Dreaptă perpendiculară pe un plan",
            "Distanța dintre plane paralele",
            "Plane perpendiculare și secțiuni",
            "Proiecții pe un plan",
            "Unghiul dintre o dreaptă și un plan",
            "Unghiul diedru",
            "Teorema celor trei perpendiculare",
            "Distanțe în corpuri",
            "Unghiuri în corpuri",
            "Aria și volumul prismei",
            "Aria și volumul piramidei",
            "Trunchiul de piramidă regulată",
            "Aria și volumul cilindrului",
            "Aria și volumul conului",
            "Trunchiul de con",
            "Sfera",
            "Recapitulare: geometrie în spațiu și clasa a VIII-a"
          ]
        }
      ]
    }
  },
  romana: {
    5: grade5Guide(),
    6: grade6Guide(),
    7: grade7Guide(),
    8: grade8Guide()
  }
};

function getGuide(subject, grade) {
  const sid = normalizeSubject(subject);
  const g = normalizeGrade(grade);
  const entry = GUIDES[sid][g];
  return {
    subject: sid,
    grade: g,
    source: SOURCE,
    ...entry,
    quote: formatQuote(dailyQuote()),
    units: (entry.units || []).map(unit => shapeUnit({
      ...unit,
      lessons: Array.isArray(unit.lessons) && unit.lessons.length
        ? unit.lessons
        : lessonsFor(sid, g, unit.id),
      glossary: Array.isArray(unit.glossary) && unit.glossary.length
        ? unit.glossary
        : glossaryFor(sid, g, unit.id)
    })),
    atlas: sid === 'matematica' ? listGeometryAtlas(g) : null
  };
}

function listCatalog() {
  return {
    source: SOURCE,
    grades: GRADES,
    subjects: [
      { id: "matematica", name: { ro: "Matematică", en: "Mathematics" }, icon: "fa-square-root-alt" },
      { id: "romana", name: { ro: "Limba și literatura română", en: "Romanian language and literature" }, icon: "fa-book" }
    ],
    guides: SUBJECT_IDS.flatMap(subject =>
      GRADES.map(grade => {
        const guide = getGuide(subject, grade);
        return {
          subject,
          grade,
          title: guide.title,
          howISeeIt: guide.howISeeIt,
          units: guide.units
        };
      })
    )
  };
}

function buildMentorContext(subject, grade) {
  const guide = getGuide(subject, grade);
  const units = guide.units.map(unit => `- ${unit.title}: ${unit.inOwnWords}`).join("\n");
  const manualLine = guide.manual
    ? `Manual de structură: ${guide.manual.title}, ${guide.manual.author}, ${guide.manual.publisher}, ${guide.manual.year}, aprobat prin ${guide.manual.approval}. Nu cita fragmente din el.`
    : "";
  return [
    `Ești mentor doar pentru gimnaziu (clasele 5–8), materiile Limba și literatura română și Matematică.`,
    `Elevul este în clasa a ${guide.grade}-a, materia: ${guide.subject === "romana" ? "Limba și literatura română" : "Matematică"}.`,
    `Cum stă materia acum: ${guide.howISeeIt}`,
    manualLine,
    guide.units.length
      ? `Unități, în ordinea cuprinsului, rezumate aici, nu citate din manual:\n${units}`
      : "Nu există încă unități pentru clasa asta. Nu inventa un manual.",
    `Dacă întrebarea e din altă materie sau de liceu, spune politicos că aici lucrăm doar română și matematică de gimnaziu și propune o punte (de exemplu: un text de fizică se poate citi ca text explicativ la română; o formulă de liceu se reduce la ce știe deja din clasa lui).`,
    `Nu copia lecții din manuale. Explică cu cuvintele tale, cu un exemplu cotidian, apoi o întrebare ghidată.`,
    SOURCE.disclaimer
  ].filter(Boolean).join("\n");
}

module.exports = {
  SOURCE,
  GRADES,
  SUBJECT_IDS,
  GUIDES,
  normalizeGrade,
  normalizeSubject,
  getGuide,
  listCatalog,
  buildMentorContext
};
