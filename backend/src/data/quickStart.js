// Trei întrebări foarte ușoare din primul capitol de matematică al clasei.
// Răspunsul corect rămâne pe server. Același elev primește mereu aceeași ordine.

const crypto = require('crypto');
const { AWARDS } = require('./progressEngine');

const QUIZ_XP = AWARDS.quick_start.xp;

const CHAPTERS = {
  5: {
    chapterId: 'naturale',
    title: 'Numere naturale',
    questions: [
      {
        id: 'qs5-mare',
        question: 'Care număr e mai mare?',
        options: ['14', '19', 'Sunt egale'],
        correct: 1
      },
      {
        id: 'qs5-suma',
        question: 'Cât face 6 + 3?',
        options: ['8', '9', '63'],
        correct: 1
      },
      {
        id: 'qs5-par',
        question: 'Care număr e par?',
        options: ['7', '8', '9'],
        correct: 1
      }
    ]
  },
  6: {
    chapterId: 'multimi',
    title: 'Mulțimi',
    questions: [
      {
        id: 'qs6-in',
        question: '2 face parte din mulțimea {1, 2, 3}?',
        options: ['Da', 'Nu', 'Doar dacă e par'],
        correct: 0
      },
      {
        id: 'qs6-comun',
        question: 'Ce au în comun {1, 2} și {2, 4}?',
        options: ['Doar 1', 'Doar 2', 'Nimic'],
        correct: 1
      },
      {
        id: 'qs6-vida',
        question: 'O mulțime fără niciun element este…',
        options: ['plină', 'vidă', 'primă'],
        correct: 1
      }
    ]
  },
  7: {
    chapterId: 'reale',
    title: 'Numere reale',
    questions: [
      {
        id: 'qs7-rad',
        question: 'Cât este rădăcina pătrată din 9?',
        options: ['3', '6', '81'],
        correct: 0
      },
      {
        id: 'qs7-jumatate',
        question: '1/2 este același lucru cu…',
        options: ['0,5', '2', '1,2'],
        correct: 0
      },
      {
        id: 'qs7-real',
        question: 'Numărul 4 este…',
        options: ['doar o literă', 'un număr real', 'un unghi'],
        correct: 1
      }
    ]
  },
  8: {
    chapterId: 'intervale',
    title: 'Intervale',
    questions: [
      {
        id: 'qs8-intre',
        question: '3 este între 1 și 5?',
        options: ['Da', 'Nu', 'Doar dacă e par'],
        correct: 0
      },
      {
        id: 'qs8-inchis',
        question: 'Intervalul închis [2, 4] îl conține pe 2?',
        options: ['Da', 'Nu', 'Doar pe 4'],
        correct: 0
      },
      {
        id: 'qs8-mic',
        question: 'Care număr e mai mic?',
        options: ['0', '−2', 'Sunt egale'],
        correct: 1
      }
    ]
  }
};

function gradeOf(value) {
  const grade = Number(String(value || '').match(/[5-8]/)?.[0]);
  return CHAPTERS[grade] ? grade : 5;
}

function hashInt(text) {
  return crypto.createHash('sha256').update(String(text)).digest().readUInt32BE(0);
}

function rng(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function shuffle(list, rand) {
  const next = list.slice();
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(rand() * (index + 1));
    const hold = next[index];
    next[index] = next[swap];
    next[swap] = hold;
  }
  return next;
}

function quizFor(userId, grade) {
  const level = gradeOf(grade);
  const chapter = CHAPTERS[level];
  const questions = chapter.questions.map(item => {
    const options = shuffle(item.options, rng(hashInt(`${userId}:${item.id}`)));
    const correctAt = options.indexOf(item.options[item.correct]);
    return {
      id: item.id,
      question: item.question,
      options,
      correctAt
    };
  });
  return {
    subject: 'matematica',
    grade: level,
    chapterId: chapter.chapterId,
    title: chapter.title,
    questions
  };
}

function publicQuestions(questions) {
  return (questions || []).map(item => ({
    id: item.id,
    question: item.question,
    options: item.options
  }));
}

function countCorrect(questions, answers) {
  const byId = new Map((questions || []).map(item => [item.id, item]));
  const seen = new Set();
  let correct = 0;
  (answers || []).forEach(answer => {
    const item = byId.get(answer.id);
    if (!item || seen.has(answer.id)) return;
    seen.add(answer.id);
    if (Number(answer.choice) === item.correctAt) correct += 1;
  });
  return correct;
}

module.exports = {
  QUIZ_XP,
  gradeOf,
  quizFor,
  publicQuestions,
  countCorrect
};
