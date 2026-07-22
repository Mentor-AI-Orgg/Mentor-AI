// GPTZero-style simu
// Swap detect() detector de API nevoit

const ACADEMIC_TERMS = ["deci","prin urmare","așadar","în concluzie","este important de menționat","se poate observa","therefore","thus","in conclusion","it is important to note","it can be observed","donc","ainsi","en conclusion","il est important de noter","daher","also","zusammenfassend","es ist wichtig zu bemerken","por lo tanto","así","en conclusión","es importante mencionar","quindi","pertanto","in conclusione","è importante notare","поэтому","таким образом","в заключение","важно отметить","tehát","így","összefoglalva","fontos megjegyezni","bu nedenle","böylece","sonuç olarak","belirtmek önemlidir","因此","所以","综上所述","值得注意的是","したがって","つまり","結論として","注目すべきこと"];

function generateSuggestions(aiProb, docClass) {
  if (docClass === "authentic") {
    return [
      "✅ Textul arată autentic. Stilul natural și variațiile specifice elevului sunt evidente.",
      "💡 Continuă să încurajezi scrisul original și creativitatea.",
      "📚 Propune elevului să citească în continuare pentru a-și îmbogăți vocabularul."
    ];
  } else if (docClass === "mixed") {
    return [
      "⚠️ Textul conține elemente atât umane, cât și AI. Poate fi vorba de corectare gramaticală cu AI.",
      "🗣️ Recomandă o discuție orală cu elevul despre conținutul textului.",
      "📝 Cere elevului să rescrie textul cu cuvintele lui, fără ajutor digital."
    ];
  }
  return [
    "🔴 Scor ridicat de AI detectat. Vocabularul academic și structura perfectă sugerează generare artificială.",
    "🎯 Intervenție pedagogică necesară: discută cu elevul despre procesul de scriere.",
    "📖 Propune exerciții de scriere creativă fără acces la AI pentru a dezvolta stilul propriu.",
    "👁️ Monitorizează activitatea elevului pe platformă pentru a identifica tipare."
  ];
}

async function detect({ text }) {
  const start = Date.now();
  const lower = (text || "").toLowerCase();

  const indicators = {
    complexWords: lower.split(/\s+/).filter(w => w.length > 12).length,
    perfectPunctuation: (lower.match(/,\s/g) || []).length > 5 && (lower.match(/\.\s/g) || []).length > 3,
    repetitive: lower.split(/\s+/).length > 0 ? new Set(lower.split(/\s+/)).size / lower.split(/\s+/).length : 1,
    length: lower.length,
    academicTerms: ACADEMIC_TERMS.filter(t => lower.includes(t)).length,
    perfectGrammar: (text.match(/[A-Z][a-z]+/g) || []).length > 10
  };

  let score = 30;
  if (indicators.complexWords > 3) score += 15;
  if (indicators.perfectPunctuation) score += 10;
  if (indicators.repetitive > 0.7) score -= 10;
  if (indicators.length < 100) score -= 20;
  if (indicators.academicTerms > 2) score += 15;
  if (indicators.perfectGrammar) score += 10;
  score = Math.max(5, Math.min(95, score + (Math.floor(Math.random() * 20) - 10)));

  let verdict, code, confidence;
  if (score < 20) { verdict = "✅ Text autentic (uman)"; code = "authentic"; confidence = "high"; }
  else if (score < 50) { verdict = "⚠️ Posibil amestec uman + AI"; code = "mixed"; confidence = "medium"; }
  else if (score < 75) { verdict = "🔴 Probabil generat de AI"; code = "likely_ai"; confidence = "medium"; }
  else { verdict = "🔴 Text generat de AI"; code = "ai"; confidence = "high"; }

  return {
    ai_probability: Math.round(score * 10) / 10,
    verdict,
    verdict_code: code,
    confidence,
    details: { indicators, mode: "ai_analysis" },
    suggestions: generateSuggestions(score, code),
    processing_time_ms: Date.now() - start,
    engine: "gptzero_sim"
  };
}

module.exports = { detect };
