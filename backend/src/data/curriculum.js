// limbi
const LANGUAGES = [
    { id: 'ro', name: 'Română', flag: '🇷🇴' },
    { id: 'en', name: 'English', flag: '🇬🇧' },
    { id: 'fr', name: 'Français', flag: '🇫🇷' },
    { id: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { id: 'es', name: 'Español', flag: '🇪🇸' },
    { id: 'it', name: 'Italiano', flag: '🇮🇹' },
    { id: 'ru', name: 'Русский', flag: '🇷🇺' },
    { id: 'hu', name: 'Magyar', flag: '🇭🇺' },
    { id: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { id: 'zh', name: '中文', flag: '🇨🇳' },
    { id: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

const SUBJECTS = [
      { id: "matematica", name: { ro: "Matematică", en: "Mathematics", fr: "Mathématiques", de: "Mathematik", es: "Matemáticas", it: "Matematica", ru: "Математика", hu: "Matematika", tr: "Matematik", zh: "数学", ja: "数学" }, cycles: ["primar","gimnazial","liceu"], icon: "fa-square-root-alt" },
      { id: "romana", name: { ro: "Limba Română", en: "Romanian", fr: "Roumain", de: "Rumänisch", es: "Rumano", it: "Romeno", ru: "Румынский", hu: "Román", tr: "Rumence", zh: "罗马尼亚语", ja: "ルーマニア語" }, cycles: ["primar","gimnazial","liceu"], icon: "fa-book" },
      { id: "fizica", name: { ro: "Fizică", en: "Physics", fr: "Physique", de: "Physik", es: "Física", it: "Fisica", ru: "Физика", hu: "Fizika", tr: "Fizik", zh: "物理", ja: "物理学" }, cycles: ["gimnazial","liceu"], icon: "fa-atom" },
      { id: "chimie", name: { ro: "Chimie", en: "Chemistry", fr: "Chimie", de: "Chemie", es: "Química", it: "Chimica", ru: "Химия", hu: "Kémia", tr: "Kimya", zh: "化学", ja: "化学" }, cycles: ["gimnazial","liceu"], icon: "fa-flask" },
      { id: "biologie", name: { ro: "Biologie", en: "Biology", fr: "Biologie", de: "Biologie", es: "Biología", it: "Biologia", ru: "Биология", hu: "Biológia", tr: "Biyoloji", zh: "生物学", ja: "生物学" }, cycles: ["gimnazial","liceu"], icon: "fa-dna" },
      { id: "istorie", name: { ro: "Istorie", en: "History", fr: "Histoire", de: "Geschichte", es: "Historia", it: "Storia", ru: "История", hu: "Történelem", tr: "Tarih", zh: "历史", ja: "歴史" }, cycles: ["primar","gimnazial","liceu"], icon: "fa-landmark" },
      { id: "geografie", name: { ro: "Geografie", en: "Geography", fr: "Géographie", de: "Geographie", es: "Geografía", it: "Geografia", ru: "География", hu: "Földrajz", tr: "Coğrafya", zh: "地理", ja: "地理学" }, cycles: ["gimnazial","liceu"], icon: "fa-globe-europe" },
      { id: "engleza", name: { ro: "Engleză", en: "English", fr: "Anglais", de: "Englisch", es: "Inglés", it: "Inglese", ru: "Английский", hu: "Angol", tr: "İngilizce", zh: "英语", ja: "英語" }, cycles: ["primar","gimnazial","liceu"], icon: "fa-language" },
      { id: "franceza", name: { ro: "Franceză", en: "French", fr: "Français", de: "Französisch", es: "Francés", it: "Francese", ru: "Французский", hu: "Francia", tr: "Fransızca", zh: "法语", ja: "フランス語" }, cycles: ["gimnazial","liceu"], icon: "fa-language" },
      { id: "germana", name: { ro: "Germană", en: "German", fr: "Allemand", de: "Deutsch", es: "Alemán", it: "Tedesco", ru: "Немецкий", hu: "Német", tr: "Almanca", zh: "德语", ja: "ドイツ語" }, cycles: ["gimnazial","liceu"], icon: "fa-language" },
      { id: "spaniola", name: { ro: "Spaniolă", en: "Spanish", fr: "Espagnol", de: "Spanisch", es: "Español", it: "Spagnolo", ru: "Испанский", hu: "Spanyol", tr: "İspanyolca", zh: "西班牙语", ja: "スペイン語" }, cycles: ["gimnazial","liceu"], icon: "fa-language" },
      { id: "italiana", name: { ro: "Italiană", en: "Italian", fr: "Italien", de: "Italienisch", es: "Italiano", it: "Italiano", ru: "Итальянский", hu: "Olasz", tr: "İtalyanca", zh: "意大利语", ja: "イタリア語" }, cycles: ["gimnazial","liceu"], icon: "fa-language" },
      { id: "rusa", name: { ro: "Rusă", en: "Russian", fr: "Russe", de: "Russisch", es: "Ruso", it: "Russo", ru: "Русский", hu: "Orosz", tr: "Rusça", zh: "俄语", ja: "ロシア語" }, cycles: ["gimnazial","liceu"], icon: "fa-language" },
      { id: "maghiara", name: { ro: "Maghiară", en: "Hungarian", fr: "Hongrois", de: "Ungarisch", es: "Húngaro", it: "Ungherese", ru: "Венгерский", hu: "Magyar", tr: "Macarca", zh: "匈牙利语", ja: "ハンガリー語" }, cycles: ["gimnazial","liceu"], icon: "fa-language" },
      { id: "turca", name: { ro: "Turcă", en: "Turkish", fr: "Turc", de: "Türkisch", es: "Turco", it: "Turco", ru: "Турецкий", hu: "Török", tr: "Türkçe", zh: "土耳其语", ja: "トルコ語" }, cycles: ["gimnazial","liceu"], icon: "fa-language" },
      { id: "chineza", name: { ro: "Chineză", en: "Chinese", fr: "Chinois", de: "Chinesisch", es: "Chino", it: "Cinese", ru: "Китайский", hu: "Kínai", tr: "Çince", zh: "中文", ja: "中国語" }, cycles: ["gimnazial","liceu"], icon: "fa-language" },
      { id: "japoneza", name: { ro: "Japoneză", en: "Japanese", fr: "Japonais", de: "Japanisch", es: "Japonés", it: "Giapponese", ru: "Японский", hu: "Japán", tr: "Japonca", zh: "日语", ja: "日本語" }, cycles: ["gimnazial","liceu"], icon: "fa-language" },
      { id: "informatica", name: { ro: "Informatică", en: "Computer Science", fr: "Informatique", de: "Informatik", es: "Informática", it: "Informatica", ru: "Информатика", hu: "Informatika", tr: "Bilişim", zh: "计算机", ja: "情報科学" }, cycles: ["gimnazial","liceu"], icon: "fa-laptop-code" },
      { id: "evaluare", name: { ro: "Evaluare Națională", en: "National Assessment", fr: "Évaluation Nationale", de: "Nationale Bewertung", es: "Evaluación Nacional", it: "Valutazione Nazionale", ru: "Нац. оценка", hu: "Orsz. értékelés", tr: "Ulusal Değerlendirme", zh: "国家评估", ja: "全国評価" }, cycles: ["gimnazial"], icon: "fa-clipboard-check" },
      { id: "bac", name: { ro: "Bacalaureat", en: "Baccalaureate", fr: "Baccalauréat", de: "Abitur", es: "Bachillerato", it: "Maturità", ru: "ЕГЭ", hu: "Érettségi", tr: "Lise Diploması", zh: "高考", ja: "バカロレア" }, cycles: ["liceu"], icon: "fa-graduation-cap" }
];

const CYCLES = [
      { id: "primar", name: { ro: "Primar", en: "Primary", fr: "Primaire", de: "Primar", es: "Primaria", it: "Primaria", ru: "Начальная", hu: "Alsó tagozat", tr: "İlkokul", zh: "小学", ja: "小学校" }, classes: [1,2,3,4] },
      { id: "gimnazial", name: { ro: "Gimnazial", en: "Middle School", fr: "Collège", de: "Sekundar I", es: "Secundaria", it: "Secondaria", ru: "Средняя", hu: "Felső tagozat", tr: "Ortaokul", zh: "初中", ja: "中学校" }, classes: [5,6,7,8] },
      { id: "liceu", name: { ro: "Liceal", en: "High School", fr: "Lycée", de: "Sekundar II", es: "Bachillerato", it: "Superiore", ru: "Старшая", hu: "Középiskola", tr: "Lise", zh: "高中", ja: "高校" }, classes: [9,10,11,12] }
];
module.exports = { LANGUAGES, SUBJECTS, CYCLES };
