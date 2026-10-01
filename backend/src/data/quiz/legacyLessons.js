// Lecția și nivelul itemilor vechi, înainte de băncile pe capitol.
// Nivelul este cel de azi: la grile, poziția în listă + 1; la teste,
// extrasurile au 1–3, iar banca continuă cu 4–7.

const LEGACY = {
  m5n1: { lesson: 'comparare', level: 1 },
  m5n2: { lesson: 'putere', level: 2 },
  m5n3: { lesson: 'ordine', level: 3 },
  m5n4: { lesson: 'criterii-2510', level: 4 },
  m5n5: { lesson: 'criterii-39', level: 5 },
  m5n6: { lesson: 'prime', level: 6 },
  m5n7: { lesson: 'recap-divizibilitate', level: 7 },

  m5f1: { lesson: 'fractie', level: 1 },
  m5f2: { lesson: 'amplificare', level: 2 },
  m5f3: { lesson: 'echivalente', level: 3 },
  m5f4: { lesson: 'adunare-fractii', level: 4 },
  m5f5: { lesson: 'parte-procent', level: 5 },
  m5f6: { lesson: 'scriere-zecimala', level: 6 },
  m5f7: { lesson: 'impartire-media', level: 7 },

  m5g1: { lesson: 'punct-plan', level: 1 },
  m5g2: { lesson: 'clasificare-unghi', level: 2 },
  m5g3: { lesson: 'clasificare-unghi', level: 3 },
  m5g4: { lesson: 'lungime', level: 4 },
  m5g5: { lesson: 'arie-unitati', level: 5 },
  m5g6: { lesson: 'volum-unitati', level: 6 },
  m5g7: { lesson: 'lungime-unitati', level: 7 },
  m5g8: { lesson: 'mijloc', level: 8 },

  m6m1: { lesson: 'relatii-multimi', level: 1 },
  m6m2: { lesson: 'operatii-multimi', level: 2 },
  m6m3: { lesson: 'operatii-multimi', level: 3 },
  m6m4: { lesson: 'descompunere', level: 4 },
  m6m5: { lesson: 'cmmdc', level: 5 },
  m6m6: { lesson: 'cmmmc', level: 6 },

  m6p1: { lesson: 'rapoarte', level: 1 },
  m6p2: { lesson: 'direct-invers', level: 2 },
  m6p3: { lesson: 'direct-invers', level: 3 },
  m6p4: { lesson: 'regula-trei', level: 4 },
  m6p5: { lesson: 'procente', level: 5 },
  m6p6: { lesson: 'proportii', level: 6 },

  m6i1: { lesson: 'multime-intregi', level: 1 },
  m6i2: { lesson: 'modul-comparare', level: 2 },
  m6i3: { lesson: 'adunare-intregi', level: 3 },
  m6i4: { lesson: 'numar-rational', level: 4 },
  m6i5: { lesson: 'ecuatii-intregi', level: 5 },
  m6i6: { lesson: 'ecuatii-intregi', level: 6 },

  m6t1: { lesson: 'opuse-varf', level: 1 },
  m6t2: { lesson: 'secanta', level: 2 },
  m6t3: { lesson: 'cerc-elemente', level: 3 },
  m6t4: { lesson: 'suma-unghiuri', level: 4 },
  m6t5: { lesson: 'triunghi-clasif', level: 5 },
  m6t6: { lesson: 'pitagora', level: 6 },
  m6t7: { lesson: 'congruenta', level: 7 },

  m7r1: { lesson: 'radical-patrat', level: 1 },
  m7r2: { lesson: 'irationale', level: 2 },
  m7r3: { lesson: 'multime-reale', level: 3 },
  m7r4: { lesson: 'rationalizare', level: 4 },
  m7r5: { lesson: 'recap-reale', level: 5 },
  m7r6: { lesson: 'aproximare-axa', level: 6 },

  m7e1: { lesson: 'egalitati', level: 1 },
  m7e2: { lesson: 'sisteme', level: 2 },
  m7e3: { lesson: 'metode-sistem', level: 3 },
  m7e4: { lesson: 'metode-sistem', level: 4 },
  m7e5: { lesson: 'sisteme', level: 5 },
  m7e6: { lesson: 'probleme-sisteme', level: 6 },

  m7d1: { lesson: 'axe', level: 1 },
  m7d2: { lesson: 'dependente-tabel', level: 2 },
  m7d3: { lesson: 'dependente-grafic', level: 3 },
  m7d4: { lesson: 'dependente-tabel', level: 4 },
  m7d5: { lesson: 'axe', level: 5 },
  m7d6: { lesson: 'dependente-grafic', level: 6 },

  m7g1: { lesson: 'paralelogram', level: 1 },
  m7g2: { lesson: 'trapez', level: 2 },
  m7g3: { lesson: 'unghi-inscris', level: 3 },
  m7g4: { lesson: 'thales', level: 4 },
  m7g5: { lesson: 'triunghiuri-asemenea', level: 5 },
  m7g6: { lesson: 'trigonometrie', level: 6 },
  m7g7: { lesson: 'lungime-disc', level: 7 },

  m8i1: { lesson: 'intervale-reale', level: 1 },
  m8i2: { lesson: 'inecuatie-axb', level: 2 },
  m8i3: { lesson: 'proprietati-inegalitati', level: 3 },
  m8i4: { lesson: 'operatii-intervale', level: 4 },
  m8i5: { lesson: 'operatii-intervale', level: 5 },
  m8i6: { lesson: 'recap-intervale', level: 6 },

  m8a1: { lesson: 'calcule-litere', level: 1 },
  m8a2: { lesson: 'formule-scurte', level: 2 },
  m8a3: { lesson: 'descompunere-formule', level: 3 },
  m8a4: { lesson: 'factor-grupare', level: 4 },
  m8a5: { lesson: 'fractii-domeniu', level: 5 },
  m8a6: { lesson: 'ecuatie-grad2', level: 6 },

  m8f1: { lesson: 'notiune-functie', level: 1 },
  m8f2: { lesson: 'functia-axb', level: 2 },
  m8f3: { lesson: 'indicatori', level: 3 },
  m8f4: { lesson: 'indicatori', level: 4 },
  m8f5: { lesson: 'indicatori', level: 5 },
  m8f6: { lesson: 'indicatori', level: 6 },

  m8s1: { lesson: 'puncte-plane', level: 1 },
  m8s2: { lesson: 'dreapta-paralela-plan', level: 2 },
  m8s3: { lesson: 'prisma', level: 3 },
  m8s4: { lesson: 'piramida', level: 4 },
  m8s5: { lesson: 'cilindru', level: 5 },
  m8s6: { lesson: 'recap-spatiu', level: 6 },

  e5n1: { lesson: 'putere', level: 4 },
  e5n2: { lesson: 'ordine', level: 5 },
  e5n3: { lesson: 'criterii-2510', level: 6 },
  e5n4: { lesson: 'prime', level: 7 },
  e5n5: { lesson: 'putere', level: 1 },
  e5n6: { lesson: 'ordine', level: 2 },
  e5n7: { lesson: 'criterii-39', level: 3 },

  e5f1: { lesson: 'adunare-fractii', level: 4 },
  e5f2: { lesson: 'amplificare', level: 5 },
  e5f3: { lesson: 'parte-procent', level: 6 },
  e5f4: { lesson: 'impartire-media', level: 7 },
  e5f5: { lesson: 'adunare-fractii', level: 1 },
  e5f6: { lesson: 'parte-procent', level: 2 },
  e5f7: { lesson: 'impartire-media', level: 3 },

  e5g1: { lesson: 'clasificare-unghi', level: 4 },
  e5g2: { lesson: 'lungime', level: 5 },
  e5g3: { lesson: 'arie-unitati', level: 6 },
  e5g4: { lesson: 'lungime-unitati', level: 7 },
  e5g5: { lesson: 'masura-unghi', level: 1 },
  e5g6: { lesson: 'mijloc', level: 2 },
  e5g7: { lesson: 'lungime-unitati', level: 3 },

  e6m1: { lesson: 'operatii-multimi', level: 4 },
  e6m2: { lesson: 'aplicatii-multimi', level: 5 },
  e6m3: { lesson: 'cmmdc', level: 6 },
  e6m4: { lesson: 'cmmmc', level: 7 },
  e6m5: { lesson: 'multimi-naturale', level: 1 },
  e6m6: { lesson: 'relatii-multimi', level: 2, point: 'apartine' },
  e6m7: { lesson: 'cmmdc', level: 3 },

  e6p1: { lesson: 'regula-trei', level: 4 },
  e6p2: { lesson: 'direct-invers', level: 5 },
  e6p3: { lesson: 'procente', level: 6 },
  e6p4: { lesson: 'proportii', level: 7 },
  e6p5: { lesson: 'regula-trei', level: 1 },
  e6p6: { lesson: 'procente', level: 2 },
  e6p7: { lesson: 'rapoarte', level: 3 },

  e6i1: { lesson: 'adunare-intregi', level: 4 },
  e6i2: { lesson: 'modul-comparare', level: 5 },
  e6i3: { lesson: 'ecuatii-intregi', level: 6 },
  e6i4: { lesson: 'adunare-rational', level: 7 },
  e6i5: { lesson: 'adunare-intregi', level: 1 },
  e6i6: { lesson: 'modul-comparare', level: 2 },
  e6i7: { lesson: 'inmultire-intregi', level: 3, point: 'inmultire' },

  e6t1: { lesson: 'isoscel', level: 4 },
  e6t2: { lesson: 'pitagora', level: 5 },
  e6t3: { lesson: 'cerc-elemente', level: 6 },
  e6t4: { lesson: 'opuse-varf', level: 7 },
  e6t5: { lesson: 'suma-unghiuri', level: 1 },
  e6t6: { lesson: 'pitagora', level: 2 },
  e6t7: { lesson: 'unghi-recap', level: 3, point: 'drept' },

  e7r1: { lesson: 'radical-patrat', level: 4 },
  e7r2: { lesson: 'estimare-radical', level: 5 },
  e7r3: { lesson: 'rationalizare', level: 6 },
  e7r4: { lesson: 'medie-geometrica', level: 7 },
  e7r5: { lesson: 'radical-patrat', level: 1 },
  e7r6: { lesson: 'radical-patrat', level: 2 },
  e7r7: { lesson: 'radical-patrat', level: 3, point: 'radical' },

  e7e1: { lesson: 'ecuatie-axb', level: 4 },
  e7e2: { lesson: 'sisteme', level: 5 },
  e7e3: { lesson: 'metode-sistem', level: 6 },
  e7e4: { lesson: 'recap-ecuati', level: 7 },
  e7e5: { lesson: 'ecuatie-axb', level: 1 },
  e7e6: { lesson: 'ecuatie-axb', level: 2, point: 'ecuatie' },
  e7e7: { lesson: 'ecuatie-axb', level: 3, point: 'ecuatie' },

  e7d1: { lesson: 'axe', level: 4 },
  e7d2: { lesson: 'axe', level: 5 },
  e7d3: { lesson: 'dependente-tabel', level: 6 },
  e7d4: { lesson: 'dependente-grafic', level: 7 },
  e7d5: { lesson: 'axe', level: 1 },
  e7d6: { lesson: 'axe', level: 2 },
  e7d7: { lesson: 'dependente-grafic', level: 3 },

  e7g1: { lesson: 'arii-dreptunghi', level: 4 },
  e7g2: { lesson: 'trigonometrie', level: 5 },
  e7g3: { lesson: 'aplicatii-asemanare', level: 6 },
  e7g4: { lesson: 'thales', level: 7 },
  e7g5: { lesson: 'patrat', level: 1 },
  e7g6: { lesson: 'arii-dreptunghi', level: 2, point: 'arie-drep' },
  e7g7: { lesson: 'paralelogram', level: 3, point: 'paralelogram' },

  e8i1: { lesson: 'inecuatie-axb', level: 4 },
  e8i2: { lesson: 'semne-fractii', level: 5 },
  e8i3: { lesson: 'intervale-reale', level: 6 },
  e8i4: { lesson: 'operatii-intervale', level: 7 },
  e8i5: { lesson: 'intervale-reale', level: 1 },
  e8i6: { lesson: 'inecuatie-axb', level: 2 },
  e8i7: { lesson: 'intervale-reale', level: 3, point: 'numar' },

  e8a1: { lesson: 'formule-scurte', level: 4 },
  e8a2: { lesson: 'descompunere-formule', level: 5 },
  e8a3: { lesson: 'factor-grupare', level: 6 },
  e8a4: { lesson: 'fractii-domeniu', level: 7 },
  e8a5: { lesson: 'formule-scurte', level: 1 },
  e8a6: { lesson: 'descompunere-formule', level: 2 },
  e8a7: { lesson: 'formule-scurte', level: 3, point: 'patrat' },

  e8f1: { lesson: 'functia-axb', level: 4 },
  e8f2: { lesson: 'indicatori', level: 5 },
  e8f3: { lesson: 'indicatori', level: 6 },
  e8f4: { lesson: 'indicatori', level: 7 },
  e8f5: { lesson: 'functia-axb', level: 1 },
  e8f6: { lesson: 'indicatori', level: 2 },
  e8f7: { lesson: 'indicatori', level: 3 },

  e8s1: { lesson: 'arii-prisma', level: 4 },
  e8s2: { lesson: 'arii-piramida', level: 5 },
  e8s3: { lesson: 'arii-cilindru', level: 6 },
  e8s4: { lesson: 'recap-spatiu', level: 7 },
  e8s5: { lesson: 'prisma', level: 1, point: 'cub' },
  e8s6: { lesson: 'prisma', level: 2, point: 'fata' },
  e8s7: { lesson: 'recap-spatiu', level: 3 }
};

function stampLegacy(item) {
  const meta = LEGACY[item.id];
  if (!meta) return item;
  if (meta.lesson) item.lesson = meta.lesson;
  if (Number.isInteger(meta.level)) item.level = meta.level;
  if (meta.point) item.point = meta.point;
  return item;
}

function stampLists(bank) {
  Object.values(bank).forEach(list => {
    if (Array.isArray(list)) list.forEach(stampLegacy);
  });
  return bank;
}

module.exports = { LEGACY, stampLegacy, stampLists };
