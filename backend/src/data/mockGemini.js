//mock gemini
const GEMINI_MOCK_RESPONSES = {
      ro: "✨ [Gemini 1.5 Pro] Interesantă perspectivă! Gândește-te la exemple concrete din viața de zi cu zi. Cum se aplică această noțiune în realitate? Dă-mi un exemplu personal și apoi vom extinde conceptul. Ce analogii îți vin în minte? Fă o comparație cu ceva cunoscut! 🌟",
      en: "✨ [Gemini 1.5 Pro] Interesting perspective! Think about concrete examples from everyday life. How does this concept apply in reality? Give me a personal example and then we'll expand the concept. What analogies come to your mind? Make a comparison with something familiar! 🌟",
      fr: "✨ [Gemini 1.5 Pro] Perspective intéressante! Pense à des exemples concrets de la vie quotidienne. Comment ce concept s'applique-t-il dans la réalité? Donne-moi un exemple personnel et ensuite nous développerons le concept. Quelles analogies te viennent à l'esprit? Fais une comparaison avec quelque chose de familier! 🌟",
      de: "✨ [Gemini 1.5 Pro] Interessante Perspektive! Denke an konkrete Beispiele aus dem Alltag. Wie lässt sich dieses Konzept in der Realität anwenden? Gib mir ein persönliches Beispiel und dann erweitern wir das Konzept. Welche Analogien fallen dir ein? Vergleiche es mit etwas Bekanntem! 🌟",
      es: "✨ [Gemini 1.5 Pro] ¡Perspectiva interesante! Piensa en ejemplos concretos de la vida cotidiana. ¿Cómo se aplica este concepto en la realidad? Dame un ejemplo personal y luego ampliaremos el concepto. ¿Qué analogías te vienen a la mente? ¡Haz una comparación con algo familiar! 🌟",
      it: "✨ [Gemini 1.5 Pro] Prospettiva interessante! Pensa a esempi concreti dalla vita quotidiana. Come si applica questo concetto nella realtà? Dammi un esempio personale e poi espanderemo il concetto. Quali analogie ti vengono in mente? Fai un confronto con qualcosa di familiare! 🌟",
      ru: "✨ [Gemini 1.5 Pro] Интересная перспектива! Подумай о конкретных примерах из повседневной жизни. Как это понятие применяется в реальности? Дай мне личный пример, а затем мы расширим понятие. Какие аналогии приходят тебе в голову? Сравни с чем-то знакомым! 🌟",
      hu: "✨ [Gemini 1.5 Pro] Érdekes perspektíva! Gondolj konkrét példákra a mindennapi életből. Hogyan alkalmazható ez a fogalom a valóságban? Adj egy személyes példát, aztán kibővítjük a fogalmat. Milyen analógiák jutnak eszedbe? Hasonlítsd össze valami ismerőssel! 🌟",
      tr: "✨ [Gemini 1.5 Pro] İlginç bir bakış açısı! Günlük hayattan somut örneklere düşün. Bu kavram gerçekte nasıl uygulanır? Bana kişisel bir örnek ver, sonra kavramı genişleteceğiz. Aklına hangi benzetmeler geliyor? Tanıdık bir şeyle karşılaştır! 🌟",
      zh: "✨ [Gemini 1.5 Pro] 有趣的观点！想想日常生活中的具体例子。这个概念在现实中如何应用？给我一个个人例子，然后我们会扩展这个概念。你想到什么类比？和熟悉的东西做个比较！🌟",
      ja: "✨ [Gemini 1.5 Pro] 興味深い視点です！日常生活の具体的な例を考えてみてください。この概念は現実にどう適用されますか？個人的な例を教えてください、それから概念を拡張していきます。どんな類推が思い浮かびますか？馴染みのあるものと比較してみてください！🌟"
};

function pickGeminiMockReply(lang) {
  return GEMINI_MOCK_RESPONSES[lang] || GEMINI_MOCK_RESPONSES['ro'];
}

module.exports = { GEMINI_MOCK_RESPONSES, pickGeminiMockReply };
