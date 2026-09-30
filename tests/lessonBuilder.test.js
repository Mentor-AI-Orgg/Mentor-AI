import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { mathLesson, romanaLesson } from '../backend/src/data/lessonBuilder.js';
import { shapeLesson } from '../backend/src/data/lessonShape.js';
import { lessonsFor } from '../backend/src/data/gimnaziuLessons.js';
import { grade5Guide } from '../backend/src/data/romana5Litera.js';
import { grade8Guide } from '../backend/src/data/romana8Litera.js';
import { stripMarkers, lessonRecap } from '../backend/src/mentor/localMentor.js';
import LessonCard from '../frontend/components/LessonCard.jsx';
import { lessonHref, lessonIdFromHash, resolveAnchorId, splitBold } from '../frontend/lessonText.js';

function romanaSamples() {
  const units = [...grade5Guide().units, ...grade8Guide().units];
  return units
    .flatMap(unit => unit.lessons || [])
    .filter(lesson => lesson.theory && lesson.example && lesson.tryThis && lesson.recap)
    .slice(0, 3);
}

describe('lesson builder', () => {
  it('reface același platter ca helperul vechi, pentru 3 lecții de mate și 3 de română', () => {
    const math = [
      ...lessonsFor('matematica', 8, 'intervale').slice(0, 2),
      lessonsFor('matematica', 5, 'naturale')[0]
    ];
    math.forEach(lesson => {
      const built = mathLesson({
        id: lesson.id,
        title: lesson.title,
        theory: lesson.theory,
        example: lesson.example,
        practice: lesson.practice,
        mistakes: lesson.mistakes,
        tryThis: lesson.tryThis,
        recap: lesson.recap,
        figure: lesson.figure,
        formulas: lesson.formulas
      });
      expect(built.platter).toBe(lesson.platter);
    });

    romanaSamples().forEach(lesson => {
      const built = romanaLesson({
        id: lesson.id,
        title: lesson.title,
        theory: lesson.theory,
        example: lesson.example,
        tryThis: lesson.tryThis,
        recap: lesson.recap
      });
      expect(built.platter).toBe(lesson.platter);
    });
  });

  it('pune keyPoints în recap și scoate ** din platter, cu răspunsuri numerotate', () => {
    const built = mathLesson({
      id: 'demo',
      title: 'Demo',
      theory: 'Un **interval** este o bucată de axă.',
      example: 'x este în (0, 1).',
      practice: '1. 2 + 2.\n2. 3 + 1.\n3. 5 − 1.',
      answers: ['4', '4', '4'],
      mistakes: 'Nu închizi capătul deschis.',
      tryThis: 'Scrie un interval.',
      keyPoints: ['Paranteza rotundă taie capătul.', 'Paranteza dreaptă îl ține.'],
      extraExamples: [{ title: 'Încă un exemplu', text: 'Alt **caz**.' }]
    });
    expect(built.recap).toBe('Paranteza rotundă taie capătul. Paranteza dreaptă îl ține.');
    expect(built.platter).not.toContain('**');
    expect(built.platter).toContain('Exemplu lucrat:');
    expect(built.platter).toContain('Răspunsuri: 1) 4; 2) 4; 3) 4');
    expect(built.theory).toContain('**interval**');
  });
});

describe('shapeLesson', () => {
  it('lasă răspunsurile nenumerotate în practice și desparte doar forma 1)', () => {
    const old = shapeLesson({
      id: 'vechi',
      title: 'Vechi',
      platter: 'Teorie.\n\nExemplu lucrat: 2.',
      theory: 'Teorie.',
      example: '2.',
      practice: '1. Unu.\n\nRăspunsuri: 3/2. 3. 7.',
      tryThis: 'Încearcă.',
      recap: 'Gata.'
    });
    expect(old.practice).toContain('Răspunsuri:');
    expect(old.answers).toBeUndefined();

    const numbered = shapeLesson({
      id: 'nou',
      title: 'Nou',
      platter: 'Teorie.',
      theory: 'Teorie.',
      practice: '1. Unu.\n\nRăspunsuri: 1) 117; 2) 16; 3) 26',
      tryThis: 'Încearcă.',
      recap: 'Gata.',
      boxes: [{ type: 'regula', text: 'Regula stă.' }],
      keyPoints: ['Unu.', 'Doi.']
    });
    expect(numbered.practice).toBe('1. Unu.');
    expect(numbered.answers).toEqual(['117', '16', '26']);
    expect(numbered.boxes).toEqual([{ type: 'regula', text: 'Regula stă.' }]);
    expect(numbered.keyPoints).toEqual(['Unu.', 'Doi.']);
  });
});

describe('bold și cardul lecției', () => {
  it('închide doar perechile de **', () => {
    expect(splitBold('un **termen** și **deschis')).toEqual([
      { strong: false, text: 'un ' },
      { strong: true, text: 'termen' },
      { strong: false, text: ' și **deschis' }
    ]);
    expect(splitBold('fără marcaj')).toEqual([{ strong: false, text: 'fără marcaj' }]);
  });

  it('randă o lecție nouă cu căsuțe, pliabile, formule și De reținut', () => {
    const html = renderToStaticMarkup(createElement(LessonCard, {
      lessonIndex: 0,
      initiallyOpen: true,
      entry: {
        id: 'demo',
        title: 'Intervalul',
        theory: 'Un **interval** este o bucată.',
        example: 'Pasul 1.\n\nPasul 2.',
        practice: '1. A.\n2. B.\n3. C.',
        answers: ['1', '2', '3'],
        mistakes: 'Nu confunzi capetele.',
        tryThis: 'Scrie tu unul.',
        keyPoints: ['Rotund taie.', 'Drept ține.'],
        formulas: ['[a, b] ține capetele'],
        boxes: [{ type: 'definitie', title: 'Interval', text: 'Bucată de axă.' }],
        extraExamples: [{ title: 'Încă un exemplu', text: 'Alt tip de problemă.' }],
        more: [{ title: 'Vezi mai mult: demonstrația', text: 'Caz particular.' }],
        seeAlso: [{ key: 'matematica:8:algebric', lesson: 'descompunere-factori' }]
      }
    }));
    const order = [
      'lectie-demo',
      'Interval.',
      'Formule.',
      '[a, b] ține capetele',
      'Teorie.',
      '<strong>interval</strong>',
      'Exemplu lucrat.',
      'Încă un exemplu',
      'Exersează.',
      'Vezi răspunsurile',
      '1) ',
      'Greșeli frecvente.',
      'Încearcă tu.',
      'De reținut.',
      'Vezi mai mult: demonstrația',
      'Lecțiile complete:',
      '#/lectii/matematica/8/algebric/lectie-descompunere-factori'
    ];
    let cursor = 0;
    order.forEach(piece => {
      const at = html.indexOf(piece, cursor);
      expect(at, piece).toBeGreaterThanOrEqual(0);
      cursor = at + piece.length;
    });
    expect(html).toContain('~');
    expect(html).toContain('min');
  });

  it('păstrează secțiunile unei lecții vechi și nu dublează formulele desenate', () => {
    const oldHtml = renderToStaticMarkup(createElement(LessonCard, {
      lessonIndex: 1,
      initiallyOpen: true,
      entry: {
        id: 'vechi',
        title: 'Adunarea',
        theory: 'Aduni unitățile.',
        example: '2 + 3 = 5.',
        practice: '1. 1 + 1.',
        mistakes: 'Nu uiți transportul.',
        tryThis: 'Fă o adunare.',
        recap: 'Adunarea strânge.'
      }
    }));
    expect(oldHtml).toContain('Teorie.');
    expect(oldHtml).toContain('Exemplu.');
    expect(oldHtml).toContain('Exersează.');
    expect(oldHtml).toContain('Greșeli frecvente.');
    expect(oldHtml).toContain('Învață și tu.');
    expect(oldHtml).toContain('Recapitulare.');
    expect(oldHtml).not.toContain('Vezi răspunsurile');
    expect(oldHtml).not.toContain('De reținut');
    expect(oldHtml).not.toContain('Încă un exemplu');

    const closed = renderToStaticMarkup(createElement(LessonCard, {
      lessonIndex: 2,
      entry: {
        id: 'inchisa',
        title: 'Închisă',
        theory: 'Text.',
        example: 'Exemplu.',
        tryThis: 'Tu.',
        recap: 'Gata.'
      }
    }));
    expect(closed).not.toMatch(/\sopen(=|>|\s)/);

    const drawn = renderToStaticMarkup(createElement(LessonCard, {
      lessonIndex: 0,
      initiallyOpen: true,
      entry: {
        id: 'cu-figura',
        title: 'Axa',
        figure: 'number-line',
        formulas: ['MN = |x_N − x_M|'],
        theory: 'Axa are origine.',
        example: 'De la 1 la 4 sunt 3.',
        tryThis: 'Măsoară.',
        recap: 'Distanța e modulul.'
      }
    }));
    expect(drawn.match(/MN = \|x_N − x_M\|/g)).toHaveLength(1);
    expect(drawn).not.toContain('Formule.');
    expect(drawn).toContain('Recap.');

    const bare = renderToStaticMarkup(createElement(LessonCard, {
      lessonIndex: 0,
      initiallyOpen: true,
      entry: {
        id: 'fara-figura',
        title: 'Formulă',
        formulas: ['A = L · l'],
        theory: 'Aria dreptunghiului.',
        example: '2 · 3 = 6.',
        tryThis: 'Calculează una.',
        recap: 'Aria e produsul.'
      }
    }));
    expect(bare).toContain('Formule.');
    expect(bare).toContain('A = L · l');
  });
});

describe('ancore și mentor', () => {
  it('rezolvă id-ul vechi prin lessonAliases și construiește linkul', () => {
    const lessons = [{ id: 'multimi-8' }];
    expect(resolveAnchorId(lessons, { 'relatii-multimi': 'multimi-8' }, 'relatii-multimi')).toBe('multimi-8');
    expect(resolveAnchorId(lessons, {}, 'multimi-8')).toBe('multimi-8');
    expect(resolveAnchorId(lessons, {}, 'lipsa')).toBe('');
    expect(lessonIdFromHash('#lectie-relatii-multimi')).toBe('relatii-multimi');
    expect(lessonIdFromHash('#/lectii/matematica/8/intervale/lectie-multimi-8')).toBe('multimi-8');
    expect(lessonHref({ key: 'matematica:8:algebric', lesson: 'descompunere-factori' }))
      .toBe('#/lectii/matematica/8/algebric/lectie-descompunere-factori');
  });

  it('nu citează ** și poate folosi keyPoints în loc de recap', () => {
    expect(stripMarkers('**termen** și **deschis')).toBe('termen și **deschis');
    expect(lessonRecap({ keyPoints: ['Prima idee.', 'A doua.'], recap: 'text vechi' })).toBe('Prima idee. A doua.');
    expect(lessonRecap({ recap: 'text vechi' })).toBe('text vechi');
  });
});
