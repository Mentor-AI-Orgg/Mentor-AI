//mock gpt4o
const GPT4O_MOCK_RESPONSES = {
      ro: "🤖 [GPT-4o] Bună observație! Pentru a te ghida corect, am nevoie să știi că fiecare problemă are mai multe fațete. Încearcă să identifici CE anume nu înțelegi — conceptul, formula sau aplicarea? Scrie-mi ce știi sigur și vom construi împreună de acolo! Împărțim problema în bucăți mici? 🏗️",
      en: "🤖 [GPT-4o] Good observation! To guide you properly, I need to know what exactly you don't understand — the concept, the formula, or the application? Tell me what you know for sure and we'll build from there together! Let's break the problem into small pieces? 🏗️",
      fr: "🤖 [GPT-4o] Bonne observation! Pour te guider correctement, j'ai besoin de savoir ce que tu ne comprends pas exactement — le concept, la formule ou l'application? Dis-moi ce tu sais sûrement et nous construirons ensemble à partir de là! Décomposons le problème en petits morceaux? 🏗️",
      de: "🤖 [GPT-4o] Gute Beobachtung! Um dich richtig zu führen, muss ich wissen, was genau du nicht verstehst — das Konzept, die Formel oder die Anwendung? Sag mir, was du sicher weißt, und wir bauen gemeinsam darauf auf! Zerlegen wir das Problem in kleine Stücke? 🏗️",
      es: "🤖 [GPT-4o] ¡Buena observación! Para guiarte correctamente, necesito saber qué es exactamente lo que no entiendes — ¿el concepto, la fórmula o la aplicación? ¡Dime lo que sabes con seguridad y construiremos juntos desde ahí! ¿Dividamos el problema en pedacitos? 🏗️",
      it: "🤖 [GPT-4o] Ottima osservazione! Per guidarti correttamente, ho bisogno di sapere cosa non capisci esattamente — il concetto, la formula o l'applicazione? Dimmi cosa sai di sicuro e costruiremo insieme da lì! Dividiamo il problema in piccoli pezzi? 🏗️",
      ru: "🤖 [GPT-4o] Хорошее наблюдение! Чтобы правильно направить тебя, мне нужно знать, что именно ты не понимаешь — концепцию, формулу или применение? Скажи мне, что ты знаешь точно, и мы будем строить вместе оттуда! Разобьём проблему на маленькие кусочки? 🏗️",
      hu: "🤖 [GPT-4o] Jó megfigyelés! Hogy helyesen irányíthassalak, tudnom kell, mit nem értesz pontosan — a fogalmat, a képletet vagy az alkalmazást? Mondd el, mit tudsz biztosan, és együtt építkezünk onnan! Osszuk fel a problémát kis darabokra? 🏗️",
      tr: "🤖 [GPT-4o] İyi gözlem! Seni doğru yönlendirmek için tam olarak ne anlamadığını bilmem gerekiyor — kavramı, formülü mü yoksa uygulamayı mı? Bana kesin olarak bildiğini söyle ve birlikte oradan inşa edelim! Problemi küçük parçalara bölelim mi? 🏗️",
      zh: "🤖 [GPT-4o] 观察得很好！为了正确引导你，我需要知道你到底不理解什么——概念、公式还是应用？告诉我你确定知道什么，我们会一起从这里开始构建！把问题分成小块？🏗️",
      ja: "🤖 [GPT-4o] 良い観察です！正しく導くために、あなたが何を正確に理解していないのか知る必要があります——概念、公式、それとも応用？確実に知っていることを教えてください、そこから一緒に構築していきましょう！問題を小さく分けましょうか？🏗️"
};

function pickGpt4oMockReply(lang) {
  return GPT4O_MOCK_RESPONSES[lang] || GPT4O_MOCK_RESPONSES['ro'];
}

module.exports = { GPT4O_MOCK_RESPONSES, pickGpt4oMockReply };
