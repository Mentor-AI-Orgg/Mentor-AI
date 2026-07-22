// securiate plus

const SAFETY_REFUSAL_TEXT = {
        ro: "🛡️ Hei! Am detectat că întrebarea ta nu este adecvată pentru platforma noastră educațională. Încearcă să reformulezi folosind cuvinte potrivite școlii! Mentor AI este aici să te ajute să ÎNVEȚI, nu să facem lucruri inadecvate. 📚",
        en: "🛡️ Hey! I detected that your question is not appropriate for our educational platform. Try to rephrase using school-appropriate words! Mentor AI is here to help you LEARN, not to do inappropriate things. 📚",
        fr: "🛡️ Hé! J'ai détecté que ta question n'est pas appropriée pour notre plateforme éducative. Essaie de reformuler avec des mots appropriés à l'école! Mentor AI est là pour t'aider à APPRENDRE, pas pour faire des choses inappropriées. 📚",
        de: "🛡️ Hey! Ich habe erkannt, dass deine Frage nicht für unsere Bildungsplattform geeignet ist. Versuche, sie mit schulgerechten Worten umzuformulieren! Mentor AI ist hier, um dir beim LERNEN zu helfen, nicht um unangemessene Dinge zu tun. 📚",
        es: "🛡️ ¡Oye! Detecté que tu pregunta no es apropiada para nuestra plataforma educativa. ¡Intenta reformularla usando palabras apropiadas para la escuela! Mentor AI está aquí para ayudarte a APRENDER, no para hacer cosas inapropiadas. 📚",
        it: "🛡️ Ehi! Ho rilevato che la tua domanda non è appropriata per la nostra piattaforma educativa. Prova a riformularla usando parole appropriate per la scuola! Mentor AI è qui per aiutarti a IMPARARE, non per fare cose inappropriare. 📚",
        ru: "🛡️ Эй! Я обнаружил, что твой вопрос не подходит для нашей образовательной платформы. Попробуй переформулировать, используя школьно-подходящие слова! Mentor AI здесь, чтобы помочь тебе УЧИТЬСЯ, а не делать неподобающие вещи. 📚",
        hu: "🛡️ Hé! Észleltem, hogy a kérdésed nem megfelelő az oktatási platformunkhoz. Próbáld átfogalmazni iskolához illő szavakkal! A Mentor AI azért van itt, hogy segítsen TANULNI, nem hogy nem megfelelő dolgokat tegyünk. 📚",
        tr: "🛡️ Hey! Sorunun eğitim platformumuz için uygun olmadığını tespit ettim. Okula uygun kelimeler kullanarak yeniden ifade etmeye çalış! Mentor AI burada ÖĞRENMENE yardım etmek için, uygunsuz şeyler yapmak için değil. 📚",
        zh: "🛡️ 嘿！我检测到你的问题不适合我们的教育平台。尝试用适合学校的词语重新表述！Mentor AI 在这里帮助你学习，而不是做不合适的事情。📚",
        ja: "🛡️ ねえ！あなたの質問が私たちの教育プラットフォームに適していないことを検出しました。学校に適した言葉を使って言い換えてみてください！Mentor AI はあなたが学ぶのを助けるためにここにいます。不適切なことをするためではありません。📚"
};

const DIRECT_ANSWER_GUARD_TEXT = {
        ro: "🤔 Observ că cauți un răspuns direct. Ca mentorul tău, nu pot să-ți dau „pe tavă” soluția — asta nu te-ar ajuta să înveți! În schimb, hai să abordăm împreună:\n\n1️⃣ Ce știi deja despre subiect?\n2️⃣ Care sunt datele problemei?\n3️⃣ Ce concepte îți sună familiare?\n\nRăspunde-mi la aceste întrebări și te voi ghida pas cu pas! 💪",
        en: "🤔 I notice you're looking for a direct answer. As your mentor, I can't give you the solution on a silver platter — that wouldn't help you learn! Instead, let's approach it together:\n\n1️⃣ What do you already know about the subject?\n2️⃣ What are the problem's data?\n3️⃣ What concepts sound familiar?\n\nAnswer these questions and I'll guide you step by step! 💪",
        fr: "🤔 Je remarque que tu cherches une réponse directe. En tant que ton mentor, je ne peux pas te donner la solution sur un plateau d'argent — ça ne t'aiderait pas à apprendre! Au lieu de ça, abordons-le ensemble:\n\n1️⃣ Que sais-tu déjà sur le sujet?\n2️⃣ Quelles sont les données du problème?\n3️⃣ Quels concepts te semblent familiers?\n\nRéponds à ces questions et je te guiderai pas à pas! 💪",
        de: "🤔 Ich bemerke, dass du nach einer direkten Antwort suchst. Als dein Mentor kann ich dir die Lösung nicht auf dem Silbertablett servieren — das würde dir nicht beim Lernen helfen! Stattdessen lass es uns gemeinsam angehen:\n\n1️⃣ Was weißt du bereits über das Thema?\n2️⃣ Was sind die Daten des Problems?\n3️⃣ Welche Konzepte klingen dir vertraut?\n\nBeantworte diese Fragen und ich werde dich Schritt für Schritt führen! 💪",
        es: "🤔 Noto que buscas una respuesta directa. Como tu mentor, no puedo darte la solución en bandeja de plata — ¡eso no te ayudaría a aprender! En su lugar, abordémoslo juntos:\n\n1️⃣ ¿Qué ya sabes sobre el tema?\n2️⃣ ¿Cuáles son los datos del problema?\n3️⃣ ¿Qué conceptos te suenan familiares?\n\n¡Responde estas preguntas y te guiaré paso a paso! 💪",
        it: "🤔 Noto che stai cercando una risposta diretta. Come tuo mentore, non posso darti la soluzione su un piatto d'argento — quello non ti aiuterebbe a imparare! Invece, affrontiamolo insieme:\n\n1️⃣ Cosa sai già sull'argomento?\n2️⃣ Quali sono i dati del problema?\n3️⃣ Quali concetti ti sembrano familiari?\n\nRispondi a queste domande e ti guiderò passo dopo passo! 💪",
        ru: "🤔 Я замечаю, что ты ищешь прямой ответ. Как твой наставник, я не могу дать тебе решение на блюдечке — это не поможет тебе учиться! Вместо этого давай подойдём к этому вместе:\n\n1️⃣ Что ты уже знаешь о теме?\n2️⃣ Какие данные задачи?\n3️⃣ Какие концепции звучат знакомо?\n\nОтветь на эти вопросы, и я проведу тебя шаг за шагом! 💪",
        hu: "🤔 Észreveszem, hogy közvetlen választ keresel. Mint a mentorod, nem adhatom meg a megoldást ezüsttálcán — ez nem segítene a tanulásban! Ehelyett közelítsük meg együtt:\n\n1️⃣ Mit tudsz már a témáról?\n2️⃣ Mik a probléma adatai?\n3️⃣ Mely fogalmak hangzanak ismerősen?\n\nVálaszolj ezekre a kérdésekre, és lépésről lépésre vezetlek! 💪",
        tr: "🤔 Doğrudan bir cevap aradığını fark ediyorum. Mentorun olarak, sana çözümü gümüş tepside sunamam — bu senin öğrenmene yardımcı olmaz! Bunun yerine birlikte ele alalım:\n\n1️⃣ Konu hakkında zaten ne biliyorsun?\n2️⃣ Problemin verileri neler?\n3️⃣ Hangi kavramlar tanıdık geliyor?\n\nBu soruları yanıtla ve seni adım adım yönlendireceğim! 💪",
        zh: "🤔 我注意到你在寻找直接答案。作为你的导师，我不能把解决方案放在银盘上交给你——这不会帮助你学习！相反，让我们一起面对它：\n\n1️⃣ 关于这个主题你已经知道什么？\n2️⃣ 问题的数据是什么？\n3️⃣ 哪些概念听起来很熟悉？\n\n回答这些问题，我会一步步引导你！💪",
        ja: "🤔 直接な答えを探していることに気づきました。あなたのメンターとして、銀の皿に乗せて解決策を渡すことはできません——それは学習の助けになりません！代わりに、一緒に取り組みましょう：\n\n1️⃣ このテーマについてすでに何を知っていますか？\n2️⃣ 問題のデータは何ですか？\n3️⃣ どの概念が馴染み深いですか？\n\nこれらの質問に答えてください、そうすれば一歩一歩導きます！💪"
};

const ALL_ENGINES_DOWN_TEXT = "⚠️ Momentan toate serverele AI sunt ocupate. Te rog să încerci din nou în câteva secunde. Între timp, încearcă să rezolvi singur folosind manualul! 💪";

module.exports = { SAFETY_REFUSAL_TEXT, DIRECT_ANSWER_GUARD_TEXT, ALL_ENGINES_DOWN_TEXT };
