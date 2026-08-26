// GPTZero-style simu
// Swap detect() detector de API nevoit

const ACADEMIC_TERMS = ["deci","prin urmare","așadar","în concluzie","este important de menționat","se poate observa","therefore","thus","in conclusion","it is important to note","it can be observed","donc","ainsi","en conclusion","il est important de noter","daher","also","zusammenfassend","es ist wichtig zu bemerken","por lo tanto","así","en conclusión","es importante mencionar","quindi","pertanto","in conclusione","è importante notare","поэтому","таким образом","в заключение","важно отметить","tehát","így","összefoglalva","fontos megjegyezni","bu nedenle","böylece","sonuç olarak","belirtmek önemlidir","因此","所以","综上所述","值得注意的是","したがって","つまり","結論として","注目すべきこと"];

function generateSuggestions(aiProb, docClass) {
  if (docClass === "authentic") {
    return [
      "Scorul demonstrativ e scăzut. Folosește-l doar ca punct de discuție, nu ca verdict.",
      "Încurajează scrisul original: cere elevului să explice un paragraf cu voce tare.",
      "Detectorul nu înlocuiește o conversație cu elevul despre cum a lucrat."
    ];
  } else if (docClass === "mixed") {
    return [
      "Scor mixt — poate fi corectare gramaticală, șablon sau pur și simplu un text îngrijit.",
      "Întreabă elevul cum a construit textul, în loc să tratezi scorul ca pe o acuzare.",
      "Cere o rescriere scurtă, cu cuvintele lui, ca exercițiu, nu ca pedeapsă."
    ];
  }
  return [
    "Scorul demonstrativ e ridicat, dar euristicile greșesc des (texte formale, traduceri, elevi foarte corecți).",
    "Discută procesul de scriere. Nu folosi acest scor în evaluare sau ca dovadă de copiat.",
    "Un exercițiu oral sau o ciornă scrisă în clasă spune mai mult decât detectorul."
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
  if (score < 20) { verdict = "Scor demonstrativ: textul seamănă a scris uman"; code = "authentic"; confidence = "demo"; }
  else if (score < 50) { verdict = "Scor demonstrativ: posibil amestec uman + AI"; code = "mixed"; confidence = "demo"; }
  else if (score < 75) { verdict = "Scor demonstrativ: textul are trăsături asociate cu AI"; code = "likely_ai"; confidence = "demo"; }
  else { verdict = "Scor demonstrativ: textul seamănă a generat de AI"; code = "ai"; confidence = "demo"; }

  return {
    demo: true,
    disclaimer: "Instrument demonstrativ bazat pe euristici locale (lungimea cuvintelor, termeni academici, un jitter aleator). Nu este un detector real și nu trebuie folosit ca dovadă.",
    ai_probability: Math.round(score * 10) / 10,
    verdict,
    verdict_code: code,
    confidence,
    details: { indicators, mode: "heuristic_demo" },
    suggestions: generateSuggestions(score, code),
    processing_time_ms: Date.now() - start,
    engine: "heuristic_demo"
  };
}

module.exports = { detect };
