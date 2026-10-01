const HELP_CATEGORIES = [
  { id: 'toate', label: 'Toate' },
  { id: 'lectii', label: 'Lecții' },
  { id: 'ritm', label: 'Ritm' },
  { id: 'examen', label: 'Examen' },
  { id: 'cont', label: 'Cont' }
];

const HELP_ARTICLES = [
  {
    id: 'lectie',
    category: 'lectii',
    title: 'Cum deschizi o lecție',
    body: 'De pe prima pagină apeși Română sau Matematică. Alegi clasa, apoi un capitol. Citești lecția și abia după aceea treci la exerciții. Dacă ai lăsat un capitol la jumătate, butonul Continuă te duce înapoi acolo.'
  },
  {
    id: 'test',
    category: 'lectii',
    title: 'Testul de la capitol',
    body: 'După lecție poți da testul capitolului. Dacă greșești, răspunsul nu îți e dat gata. Îl mai încerci, iar greșeala ajunge în caiet ca să o repeți mai târziu.'
  },
  {
    id: 'caiet',
    category: 'ritm',
    title: 'Caietul de greșeli',
    body: 'Greșelile de la exerciții se strâng singure. Într-o zi primești cel mult 10 de repetat, la 1, 3, 7 și 21 de zile. Le găsești la Caiet, de pe prima pagină, când scrie că ai de recapitulat.'
  },
  {
    id: 'obiectiv-zi',
    category: 'ritm',
    title: 'Obiectivul zilei',
    body: 'Obiectivul zilnic e o lecție. Când ai deschis-o, ziua e gata. Cele trei misiuni de sub ea sunt în plus, dacă mai ai chef. Poți lipsi o zi: săptămâna cere 4 zile, nu șapte.'
  },
  {
    id: 'obiectiv',
    category: 'ritm',
    title: 'Obiectivul săptămânii',
    body: 'Obiectivul este 4 zile cu lecții în aceeași săptămână, de luni până duminică. Nu trebuie să stai mult și nu trebuie să vii în fiecare zi. Când ajungi la 4, furnicuța te felicită o singură dată în săptămâna aceea.'
  },
  {
    id: 'en',
    category: 'examen',
    title: 'Evaluarea Națională',
    body: 'La Evaluare Națională lucrezi ca la examen: subiecte de română și matematică pentru clasa a 8-a. Citește cerința de două ori înainte să răspunzi și verifică calculele la final. Furnicuța îți amintește asta când intri.'
  },
  {
    id: 'parinte',
    category: 'cont',
    title: 'Emailul părintelui',
    body: 'La cont scrii emailul părintelui. Nu confirmă contul. Primește un rezumat pe email și vede același fel de rezumat în zona de părinte: lecții, minute, teste. Nu primește mesajele tale către tutore.'
  },
  {
    id: 'privat',
    category: 'cont',
    title: 'Profilul rămâne privat',
    body: 'Numele tău de utilizator nu e un nume real. Prietenii te văd doar dacă îi accepți. Emailul și școala nu apar la alți copii.'
  },
  {
    id: 'telefon',
    category: 'cont',
    title: 'Pe telefon',
    body: 'Poți pune Sunt de 10 pe ecranul de pornire. Pe iPhone: Distribuie, apoi Adaugă pe ecranul de pornire. Pe Android: meniul browserului, apoi Adaugă pe ecranul de pornire sau Instalează aplicația.'
  },
  {
    id: 'pagina',
    category: 'cont',
    title: 'Dacă pagina nu se încarcă',
    body: 'Verifică internetul și reîncarcă pagina. Dacă tot vezi o variantă veche, închide aplicația și deschide-o din nou. Lecțiile nu stau salvate în telefon: se încarcă când ai internet.'
  }
];

function fold(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
}

function searchHelp(query = '', category = 'toate') {
  const needle = fold(query).trim();
  const group = category && category !== 'toate' ? category : '';
  return HELP_ARTICLES.filter(article => {
    if (group && article.category !== group) return false;
    if (!needle) return true;
    return fold(`${article.title} ${article.body}`).includes(needle);
  });
}

export { HELP_ARTICLES, HELP_CATEGORIES, searchHelp };
