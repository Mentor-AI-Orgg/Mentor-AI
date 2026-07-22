// mock claude

const CLAUDE_MOCK_RESPONSES = {
      ro: {
        math: "🧮 Pentru această problemă de matematică, începe prin a identifica datele cunoscute. Care sunt variabilele? Scrie-le pe o foaie și aplică formula generală. Încearcă să descompui problema în pași mici. Ce pași crezi că ar trebui să urmezi? Începe cu ce știi! 💪",
        bio: "🧬 ADN-ul conține informația genetică organizată în gene. Fiecare genă codifică o proteină. Replicarea ADN-ului este semi-conservativă. Ce știi deja despre structura dublei elice? Desenează-o mental și identifică legăturile de hidrogen! Ce rol au bazele azotate? 🤔",
        physics: "⚡ Legea lui Ohm: V = I × R. Tensiunea este direct proporțională cu curentul. Energia cinetică: Ec = mv²/2. Care dintre aceste formule crezi că se aplică aici? Încearcă să identifici ce știi și ce nu știi. Ce unități de măsură sunt implicate? 🔍",
        chemistry: "🧪 O reacție chimică presupune transformarea substanțelor de reacție în produși. Verifică bilanțul masic: masa reactanților = masa produsilor. Ce elemente chimice recunoști în formulă? Încearcă să echilibrezi ecuația pas cu pas! Ce valențe au elementele? 🔬",
        history: "🏛️ Contextul istoric este esențial! Identifică cauzele, desfășurarea și consecințele evenimentului. Cine erau actorii principali și ce interese aveau? Pune-te în locul lor și gândește-te ce decizii ai fi luat. Ce surse istorice ai consultat? 🌍",
        geography: "🌍 Geografia fizică studiază relieful, clima și hidrografia. Geografia umană: populație și așezări. Ce factori naturali influențează zona? Fă o hartă mentală! Ce tip de climă predomină și de ce? 🗺️",
        english: "🇬🇧 English grammar has 12 tenses. Present Simple for habitual actions. Which tense fits your sentence? Try to identify time markers! Look for words like 'always', 'yesterday', 'tomorrow'. What do they tell you about the time? 📚",
        french: "🇫🇷 Le français a 3 groupes de verbes: -er, -ir, -re. Quel groupe appartient le verbe que tu veux conjuguer? Essaie de trouver le radical et les terminaisons. Quelle est la règle générale pour ce groupe? Regarde les terminaisons au présent! 🎯",
        german: "🇩🇪 Im Deutschen gibt es 4 Fälle: Nominativ, Akkusativ, Dativ, Genitiv. Welcher Fall passt hier? Denke an die Artikel: der/die/das, den/die/das, dem/der/dem. Versuche, einen Satz mit dem richtigen Artikel zu bilden! 🧠",
        spanish: "🇪🇸 El español tiene 3 conjugaciones: -ar, -er, -ir. ¿A qué conjugación pertenece el verbo? Intenta identificar la raíz y las terminaciones. ¿Qué tiempo verbal necesitas? ¡Piensa en los marcadores temporales como 'ayer', 'mañana', 'siempre'! 🌟",
        italian: "🇮🇹 L'italiano ha 3 coniugazioni: -are, -ere, -ire. A quale coniugazione appartiene il verbo? Prova a identificare la radice e le desinenze. Quale tempo verbale ti serve? Pensa ai marker temporali! ✨",
        russian: "🇷🇺 В русском языке 3 склонения существительных. К какому склонению относится слово? Подумай о окончаниях в именительном падеже (-а, -о, -я, -е). Попробуй составить предложение с правильным окончанием! 🎯",
        hungarian: "🇭🇺 A magyarban 18 eset van! Melyik eset illik ide? Gondolj a ragokra: -ban/-ben, -hoz/-hez, -tól/-től. Próbálj meg egy mondatot a megfelelő raggal alkotni! A toldalékok a szó végén vannak. 📖",
        turkish: "🇹🇷 Türkçede 6 vakit var. Hangi vakit burada uygun? Zaman belirteçlerini düşün: dün, bugün, yarın, her zaman. Fiil çekimindeki ekleri ve kuralları hatırlamaya çalış. Doğru ekleri kullanarak bir cümle kurmayı dene! 🎯",
        chinese: "🇨🇳 中文有四个声调。哪个声调适合这个字？想想声母和韵母。试着用正确的声调造一个句子！汉字有偏旁部首，你能认出来吗？比如'氵'表示和水有关。 🀄",
        japanese: "🇯🇵 日本語には3種類の文字があります：ひらがな、カタカナ、漢字。どの文字を使うべきですか？文の構造を考えてみてください。主語は何ですか？動詞は最後に来ます！助詞「は」「が」「を」の違いを考えてみて。 🎌",
        default: "🎓 Excelentă întrebare! Haide să vedem împreună cum putem aborda acest subiect. Începe prin a descompune problema în pași mici și ușor de înțeles. Ce știi deja despre acest domeniu? Ce concepte îți sună familiare? Scrie-mi ce știi sigur și construim împreună! 🤔"
      },
      en: { default: "🎓 Excellent question! Let's see together how we can approach this topic. Start by breaking the problem into small, easy-to-understand steps. What do you already know about this field? What concepts sound familiar? Write down what you know for sure and we'll build together! 🤔" },
      fr: { default: "🎓 Excellente question! Voyons ensemble comment aborder ce sujet. Commence par décomposer le problème en petites étapes simples. Que sais-tu déjà dans ce domaine? Quels concepts te semblent familiers? Écris-moi ce que tu sais sûrement et construisons ensemble! 🤔" },
      de: { default: "🎓 Ausgezeichnete Frage! Lass uns gemeinsam sehen, wie wir dieses Thema angehen können. Beginne damit, das Problem in kleine, leicht verständliche Schritte zu zerlegen. Was weißt du bereits in diesem Bereich? Welche Konzepte klingen dir vertraut? Schreib mir auf, was du sicher weißt, und wir bauen gemeinsam! 🤔" },
      es: { default: "🎓 ¡Excelente pregunta! Veamos juntos cómo podemos abordar este tema. Comienza descomponiendo el problema en pequeños pasos fáciles de entender. ¿Qué ya sabes sobre este campo? ¿Qué conceptos te suenan familiares? ¡Escríbeme lo que sabes con seguridad y construiremos juntos! 🤔" },
      it: { default: "🎓 Ottima domanda! Vediamo insieme come affrontare questo argomento. Inizia scomponendo il problema in piccoli passaggi facili da capire. Cosa sai già di questo campo? Quali concetti ti sembrano familiari? Scrivimi cosa sai di sicuro e costruiremo insieme! 🤔" },
      ru: { default: "🎓 Отличный вопрос! Давайте вместе посмотрим, как мы можем подойти к этой теме. Начни с разбиения проблемы на маленькие, легко понятные шаги. Что ты уже знаешь в этой области? Какие концепции звучат знакомо? Напиши мне, что ты знаешь точно, и будем строить вместе! 🤔" },
      hu: { default: "🎓 Kiváló kérdés! Lássuk együtt, hogyan közelíthetjük meg ezt a témát. Kezdd azzal, hogy a problémát kis, könnyen érthető lépésekre bontod. Mit tudsz már ebben a területen? Mely fogalmak hangzanak ismerősen? Írd meg, mit tudsz biztosan, és együtt építkezünk! 🤔" },
      tr: { default: "🎓 Mükemmel soru! Birlikte bu konuyu nasıl ele alabileceğimize bakalım. Problemi küçük, kolay anlaşılır adımlara bölerek başla. Bu alanda zaten ne biliyorsun? Hangi kavramlar tanıdık geliyor? Bana kesin olarak bildiğini yaz ve birlikte inşa edelim! 🤔" },
      zh: { default: "🎓 好问题！让我们一起看看如何处理这个主题。首先把问题分解成小的、容易理解的步骤。你在这个领域已经知道什么？哪些概念听起来很熟悉？把你确定知道的写下来，我们一起构建！🤔" },
      ja: { default: "🎓 素晴らしい質問です！一緒にこのテーマにどうアプローチするか考えてみましょう。問題を小さく、わかりやすいステップに分解することから始めてください。この分野ですでに何を知っていますか？どの概念が馴染み深いですか？確実に知っていることを書いてください、一緒に構築していきましょう！🤔" }
};

// Picks a subject-specific scaffolding reply based on keywords in the student's message.
function pickClaudeMockReply(lastMsgLower, lang) {
  const langR = CLAUDE_MOCK_RESPONSES[lang] || CLAUDE_MOCK_RESPONSES['ro'];
  let response = langR.default;
  const lastMsg = lastMsgLower;
    if (lastMsg.includes('mate') || lastMsg.includes('algebra') || lastMsg.includes('geometrie') || lastMsg.includes('integral') || lastMsg.includes('math') || lastMsg.includes('equation') || lastMsg.includes('équation') || lastMsg.includes('gleichung') || lastMsg.includes('ecuación') || lastMsg.includes('equazione') || lastMsg.includes('уравнен') || lastMsg.includes('egyenlet') || lastMsg.includes('denklem') || lastMsg.includes('方程') || lastMsg.includes('方程式')) {
      response = langR.math || langR.default;
    } else if (lastMsg.includes('bio') || lastMsg.includes('adn') || lastMsg.includes('celul') || lastMsg.includes('genetic') || lastMsg.includes('dna') || lastMsg.includes('cell') || lastMsg.includes('cellule') || lastMsg.includes('zelle') || lastMsg.includes('célula') || lastMsg.includes('cellula') || lastMsg.includes('клетк') || lastMsg.includes('sejt') || lastMsg.includes('hücre') || lastMsg.includes('细胞') || lastMsg.includes('細胞')) {
      response = langR.bio || langR.default;
    } else if (lastMsg.includes('fizic') || lastMsg.includes('electro') || lastMsg.includes('energie') || lastMsg.includes('forta') || lastMsg.includes('physics') || lastMsg.includes('force') || lastMsg.includes('physique') || lastMsg.includes('physik') || lastMsg.includes('física') || lastMsg.includes('fisica') || lastMsg.includes('физик') || lastMsg.includes('fizika') || lastMsg.includes('fizik') || lastMsg.includes('物理') || lastMsg.includes('物理')) {
      response = langR.physics || langR.default;
    } else if (lastMsg.includes('chimie') || lastMsg.includes('reactie') || lastMsg.includes('molecul') || lastMsg.includes('chemistry') || lastMsg.includes('chemical') || lastMsg.includes('chimie') || lastMsg.includes('chemie') || lastMsg.includes('química') || lastMsg.includes('chimica') || lastMsg.includes('хими') || lastMsg.includes('kémia') || lastMsg.includes('kimya') || lastMsg.includes('化学') || lastMsg.includes('化学')) {
      response = langR.chemistry || langR.default;
    } else if (lastMsg.includes('istorie') || lastMsg.includes('razboi') || lastMsg.includes('revolutie') || lastMsg.includes('history') || lastMsg.includes('war') || lastMsg.includes('histoire') || lastMsg.includes('geschichte') || lastMsg.includes('historia') || lastMsg.includes('storia') || lastMsg.includes('истори') || lastMsg.includes('történelem') || lastMsg.includes('tarih') || lastMsg.includes('历史') || lastMsg.includes('歴史')) {
      response = langR.history || langR.default;
    } else if (lastMsg.includes('geografie') || lastMsg.includes('relief') || lastMsg.includes('clima') || lastMsg.includes('geography') || lastMsg.includes('climate') || lastMsg.includes('géographie') || lastMsg.includes('geographie') || lastMsg.includes('geografía') || lastMsg.includes('geografia') || lastMsg.includes('географ') || lastMsg.includes('földrajz') || lastMsg.includes('coğrafya') || lastMsg.includes('地理') || lastMsg.includes('地理')) {
      response = langR.geography || langR.default;
    } else if (lastMsg.includes('engl') || lastMsg.includes('grammar') || lastMsg.includes('tense') || lastMsg.includes('anglais') || lastMsg.includes('englisch') || lastMsg.includes('inglés') || lastMsg.includes('inglese') || lastMsg.includes('английск') || lastMsg.includes('angol') || lastMsg.includes('ingilizce') || lastMsg.includes('英语') || lastMsg.includes('英語')) {
      response = langR.english || langR.default;
    } else if (lastMsg.includes('franc') || lastMsg.includes('français') || lastMsg.includes('französisch') || lastMsg.includes('frances') || lastMsg.includes('francese') || lastMsg.includes('французск') || lastMsg.includes('francia') || lastMsg.includes('fransızca') || lastMsg.includes('法语') || lastMsg.includes('フランス語')) {
      response = langR.french || langR.default;
    } else if (lastMsg.includes('german') || lastMsg.includes('deutsch') || lastMsg.includes('allemand') || lastMsg.includes('alemán') || lastMsg.includes('tedesco') || lastMsg.includes('немецк') || lastMsg.includes('német') || lastMsg.includes('almanca') || lastMsg.includes('德语') || lastMsg.includes('ドイツ語')) {
      response = langR.german || langR.default;
    } else if (lastMsg.includes('span') || lastMsg.includes('español') || lastMsg.includes('espagnol') || lastMsg.includes('spanisch') || lastMsg.includes('spagnolo') || lastMsg.includes('испанск') || lastMsg.includes('spanyol') || lastMsg.includes('ispanyolca') || lastMsg.includes('西班牙语') || lastMsg.includes('スペイン語')) {
      response = langR.spanish || langR.default;
    } else if (lastMsg.includes('ital') || lastMsg.includes('italiano') || lastMsg.includes('italien') || lastMsg.includes('italiano') || lastMsg.includes('итальянск') || lastMsg.includes('olasz') || lastMsg.includes('italyanca') || lastMsg.includes('意大利语') || lastMsg.includes('イタリア語')) {
      response = langR.italian || langR.default;
    } else if (lastMsg.includes('rus') || lastMsg.includes('русск') || lastMsg.includes('russe') || lastMsg.includes('russisch') || lastMsg.includes('ruso') || lastMsg.includes('russo') || lastMsg.includes('orosz') || lastMsg.includes('rusça') || lastMsg.includes('俄语') || lastMsg.includes('ロシア語')) {
      response = langR.russian || langR.default;
    } else if (lastMsg.includes('maghiar') || lastMsg.includes('hongr') || lastMsg.includes('magyar') || lastMsg.includes('hungarian') || lastMsg.includes('hongrois') || lastMsg.includes('ungarisch') || lastMsg.includes('ungherese') || lastMsg.includes('венгерск') || lastMsg.includes('macarca') || lastMsg.includes('匈牙利语') || lastMsg.includes('ハンガリー語')) {
      response = langR.hungarian || langR.default;
    } else if (lastMsg.includes('turc') || lastMsg.includes('türk') || lastMsg.includes('turque') || lastMsg.includes('türkisch') || lastMsg.includes('turco') || lastMsg.includes('турецк') || lastMsg.includes('török') || lastMsg.includes('土耳其语') || lastMsg.includes('トルコ語')) {
      response = langR.turkish || langR.default;
    } else if (lastMsg.includes('chinez') || lastMsg.includes('中文') || lastMsg.includes('chinois') || lastMsg.includes('chinesisch') || lastMsg.includes('chino') || lastMsg.includes('cinese') || lastMsg.includes('китайск') || lastMsg.includes('kínai') || lastMsg.includes('çince') || lastMsg.includes('中文') || lastMsg.includes('中国語')) {
      response = langR.chinese || langR.default;
    } else if (lastMsg.includes('japon') || lastMsg.includes('日本') || lastMsg.includes('japonais') || lastMsg.includes('japanisch') || lastMsg.includes('japonés') || lastMsg.includes('giapponese') || lastMsg.includes('японск') || lastMsg.includes('japán') || lastMsg.includes('japonca') || lastMsg.includes('日语') || lastMsg.includes('日本語')) {
      response = langR.japanese || langR.default;
    }
  return response;
}

module.exports = { CLAUDE_MOCK_RESPONSES, pickClaudeMockReply };
