import { readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ProfessorScreen } from '../frontend/components/StudyScreens.jsx';
import TestReview from '../frontend/components/TestReview.jsx';
import { MASCOT_NAME } from '../frontend/config/mascot.js';
import {
  activeChat,
  adoptExistingMessages,
  appendMessage,
  chatsForScope,
  defaultTitle,
  emptyState,
  loadTutorChats,
  nameChatsFromLesson,
  openProblemChat,
  removeChat,
  renameChat,
  saveTutorChats,
  scopeFromSelection,
  scopeKey,
  selectChat,
  startNewChat,
  tutorChatStorageKey
} from '../frontend/tutorChats.js';

const mathLesson = { subject: 'matematica', grade: 5, lessonId: 'fractii', lessonTitle: 'Fracții' };
const roLesson = { subject: 'romana', grade: 6, lessonId: 'diftong', lessonTitle: 'Diftongul' };

function memoryStorage(seed = {}) {
  const data = { ...seed };
  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null;
    },
    setItem(key, value) {
      data[key] = String(value);
    },
    removeItem(key) {
      delete data[key];
    }
  };
}

function ask(state, scope, content) {
  const opened = startNewChat(state, scope);
  const id = activeChat(opened, scope).id;
  return appendMessage(opened, id, { role: 'user', content });
}

describe('chat-urile tutorelui', () => {
  it('dă titlul lecției, iar întrebarea nu îl schimbă', () => {
    expect(
      defaultTitle({ lessonTitle: 'Diftongul', firstQuestion: 'prezintă-mi ce este un diftong' })
    ).toBe('Diftongul');
    let state = startNewChat(emptyState(), roLesson);
    const id = activeChat(state, roLesson).id;
    state = appendMessage(state, id, { role: 'user', content: 'prezintă-mi ce este un diftong' });
    expect(activeChat(state, roLesson).title).toBe('Diftongul');
    expect(activeChat(state, roLesson).messages).toHaveLength(1);
  });

  it('numește chatul fără lecție după prima întrebare', () => {
    const scope = { subject: 'matematica', grade: 5 };
    let state = startNewChat(emptyState(), scope);
    const id = activeChat(state, scope).id;
    expect(activeChat(state, scope).title).toBe('Chat nou');
    state = appendMessage(state, id, { role: 'user', content: 'Ce este o fracție?' });
    state = appendMessage(state, id, { role: 'assistant', content: 'O parte dintr-un întreg.' });
    expect(activeChat(state, scope).title).toBe('Ce este o fracție?');
  });

  it('păstrează numele scris de copil după reîncărcare', () => {
    const scope = { subject: 'matematica' };
    const storage = memoryStorage();
    let state = startNewChat(emptyState(), scope);
    const id = activeChat(state, scope).id;
    state = renameChat(state, id, '  Fracțiile mele  ');
    state = appendMessage(state, id, { role: 'user', content: 'Ce este o fracție?' });
    saveTutorChats(state, { storage, owner: 'Elev@Test' });
    const loaded = loadTutorChats({ storage, owner: 'elev@test' });
    const chat = activeChat(loaded, scope);
    expect(chat.title).toBe('Fracțiile mele');
    expect(chat.titleCustom).toBe(true);
    expect(chat.messages.map((item) => item.content)).toEqual(['Ce este o fracție?']);
    expect(renameChat(loaded, chat.id, '   ').chats.find((item) => item.id === chat.id).title).toBe(
      'Fracțiile mele'
    );
  });

  it('ține mesajele fiecărui chat când treci de la unul la altul', () => {
    const scope = { subject: 'romana' };
    let state = ask(emptyState(), scope, 'Ce este un diftong?');
    const first = activeChat(state, scope);
    state = appendMessage(state, first.id, {
      role: 'assistant',
      content: 'Două vocale în aceeași silabă.'
    });
    state = startNewChat(state, scope);
    const second = activeChat(state, scope);
    expect(second.id).not.toBe(first.id);
    expect(second.conversationId).not.toBe(first.conversationId);
    state = appendMessage(state, second.id, { role: 'user', content: 'Dă-mi un exemplu.' });
    state = selectChat(state, scope, first.id);
    expect(activeChat(state, scope).messages.map((item) => item.content)).toEqual([
      'Ce este un diftong?',
      'Două vocale în aceeași silabă.'
    ]);
    state = selectChat(state, scope, second.id);
    expect(activeChat(state, scope).messages.map((item) => item.content)).toEqual([
      'Dă-mi un exemplu.'
    ]);
    expect(chatsForScope(state, scope)).toHaveLength(2);
  });

  it('nu amestecă lecția de matematică cu lecția de română', () => {
    let state = ask(emptyState(), mathLesson, 'Explică fracțiile');
    state = ask(state, roLesson, 'prezintă-mi ce este un diftong');
    expect(chatsForScope(state, mathLesson).map((chat) => chat.messages[0].content)).toEqual([
      'Explică fracțiile'
    ]);
    expect(chatsForScope(state, roLesson).map((chat) => chat.messages[0].content)).toEqual([
      'prezintă-mi ce este un diftong'
    ]);
    expect(chatsForScope(state, { subject: 'matematica' })).toEqual([]);
    expect(chatsForScope(state, { subject: 'romana' })).toEqual([]);
    expect(scopeKey({ ...mathLesson, grade: 8 })).toBe(scopeKey(mathLesson));
  });

  it('fără lecție, ține chat-urile separate pe materie', () => {
    let state = ask(emptyState(), { subject: 'matematica', grade: 5 }, 'Ce este o fracție?');
    state = ask(state, { subject: 'romana', grade: 8 }, 'Ce este un diftong?');
    expect(chatsForScope(state, { subject: 'matematica', grade: 7 })).toHaveLength(1);
    expect(chatsForScope(state, { subject: 'romana', grade: 5 })[0].title).toBe(
      'Ce este un diftong?'
    );
    expect(
      scopeFromSelection({
        subject: 'romana',
        grade: 6,
        lesson: { id: 'diftong', title: 'Diftongul', subject: 'matematica' }
      }).lessonId
    ).toBe('');
  });

  it('pune mesajele vechi într-un singur chat și nu le șterge', () => {
    const legacy = [
      { role: 'user', content: 'Ce este o fracție?' },
      { role: 'assistant', content: 'O parte dintr-un întreg.' }
    ];
    let state = ask(emptyState(), mathLesson, 'păstrez explicația nouă');
    const keptId = activeChat(state, mathLesson).id;
    state = adoptExistingMessages(state, legacy, mathLesson);
    expect(state.chats).toHaveLength(2);
    expect(state.chats.find((chat) => chat.id === keptId).messages[0].content).toBe(
      'păstrez explicația nouă'
    );
    const imported = state.chats.find((chat) => chat.id !== keptId);
    expect(imported.messages.map((item) => item.content)).toEqual([
      'Ce este o fracție?',
      'O parte dintr-un întreg.'
    ]);

    const storage = memoryStorage();
    storage.setItem(tutorChatStorageKey('ana'), JSON.stringify(legacy));
    const loaded = loadTutorChats({ storage, owner: 'ana' });
    expect(loaded.chats).toHaveLength(1);
    expect(loaded.chats[0].messages).toHaveLength(2);
    expect(loaded.chats[0].title).toBe('Ce este o fracție?');
    const again = adoptExistingMessages(loaded, legacy, { subject: 'matematica' });
    expect(again.chats).toHaveLength(1);
  });

  it('umple chatul gol cu mesajele vechi, în loc să le arunce', () => {
    const scope = { subject: 'romana', lessonId: 'diftong', lessonTitle: 'Diftongul' };
    const state = startNewChat(emptyState(), scope);
    const id = activeChat(state, scope).id;
    const next = adoptExistingMessages(
      state,
      [
        { role: 'user', content: 'mesaj vechi' },
        { role: 'assistant', content: 'răspuns vechi' }
      ],
      scope
    );
    expect(next.chats).toHaveLength(1);
    expect(next.chats[0].id).toBe(id);
    expect(next.chats[0].messages.map((item) => item.content)).toEqual([
      'mesaj vechi',
      'răspuns vechi'
    ]);
    expect(next.chats[0].title).toBe('Diftongul');
  });

  it('al doilea chat din aceeași lecție primește un nume deosebit', () => {
    let state = startNewChat(emptyState(), mathLesson, { now: 1 });
    state = appendMessage(state, activeChat(state, mathLesson).id, {
      role: 'user',
      content: 'prima'
    });
    state = startNewChat(state, mathLesson, { now: 2 });
    expect(activeChat(state, mathLesson).title).toBe('Fracții 2');
    expect(chatsForScope(state, mathLesson).map((chat) => chat.title)).toEqual([
      'Fracții',
      'Fracții 2'
    ]);
  });

  it('pune titlul lecției pe un chat încă nenumit', () => {
    const scope = { subject: 'romana', lessonId: 'diftong', lessonTitle: '' };
    let state = startNewChat(emptyState(), scope);
    state = nameChatsFromLesson(state, { ...scope, lessonTitle: 'Diftongul' });
    expect(activeChat(state, scope).title).toBe('Diftongul');
    state = renameChat(state, activeChat(state, scope).id, 'Vocalele mele');
    state = nameChatsFromLesson(state, { ...scope, lessonTitle: 'Alt titlu' });
    expect(activeChat(state, scope).title).toBe('Vocalele mele');
  });

  it('mută chat-urile locale pe cont o singură dată', () => {
    const storage = memoryStorage();
    storage.setItem(
      tutorChatStorageKey(''),
      JSON.stringify({
        messages: [{ role: 'user', content: 'întrebarea veche' }],
        subject: 'romana'
      })
    );
    const loaded = loadTutorChats({ storage, owner: 'maria' });
    expect(loaded.chats).toHaveLength(1);
    expect(loaded.chats[0].subject).toBe('romana');
    expect(storage.getItem(tutorChatStorageKey(''))).toBeNull();
    expect(loadTutorChats({ storage, owner: 'maria' }).chats[0].messages[0].content).toBe(
      'întrebarea veche'
    );
    expect(loadTutorChats({ storage, owner: 'ion' }).chats).toEqual([]);
  });

  it('arată pe ecran Chat nou și Schimbă numele', () => {
    const source = readFileSync(
      new URL('../frontend/components/StudyScreens.jsx', import.meta.url),
      'utf8'
    );
    expect(source).toContain('Chat nou');
    expect(source).toContain('Schimbă numele');
    expect(source).toContain('Numele chatului');
    expect(source).toContain('Nu am înțeles');
    expect(source).toContain('mentor-unclear');
  });

  it('o prezintă pe mascotă ca tutore și nu mai arată diagnosticarea', () => {
    const source = readFileSync(
      new URL('../frontend/components/StudyScreens.jsx', import.meta.url),
      'utf8'
    );
    const css = readFileSync(new URL('../frontend/styles.css', import.meta.url), 'utf8');
    const home = readFileSync(
      new URL('../frontend/screens/HomeScreen.jsx', import.meta.url),
      'utf8'
    );
    expect(source).toContain('MASCOT_NAME');
    expect(source).toContain('Mascota');
    expect(source).toContain('mentor-avatar');
    expect(source).toContain('Ce învățăm azi?');
    expect(source).toContain('!message.diagnostic');
    expect(source).not.toMatch(/Diagnosticare|diagMode|runDiagnostics|fa-stethoscope/);
    expect(source).not.toContain('Zecița');
    expect(css).toContain('.mentor-avatar');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(home).toContain('Da, hai!');
    expect(home).toContain('Nu acum');
  });

  it('păstrează paragrafele din răspuns, ca bula să nu lipească frazele', () => {
    const owner = 'para@test';
    const scope = { subject: 'matematica', grade: 5 };
    const storage = memoryStorage();
    const raw = 'Stăm pe exercițiul ăsta.\n\nÎntrebarea: Calculează.\n\nRegula este: Întâi puterile.';
    let state = startNewChat(emptyState(), scope);
    const id = activeChat(state, scope).id;
    state = appendMessage(state, id, { role: 'assistant', content: ` \u0000${raw}\r\n\n\nGata.` });
    expect(activeChat(state, scope).messages[0].content).toBe(`${raw}\n\nGata.`);
    expect(activeChat(state, scope).messages[0].content).not.toMatch(/[.!?»][A-ZĂÂÎȘȚŞŢ]/);
    saveTutorChats(state, { storage, owner });
    const previous = globalThis.localStorage;
    globalThis.localStorage = storage;
    try {
      const html = renderToStaticMarkup(
        createElement(ProfessorScreen, {
          userData: { name: 'Ana', email: owner, class: '5', subject: 'matematica', mentorLeft: 4 },
          studyFocus: { subject: 'matematica', grade: '5' }
        })
      );
      expect(html.match(/mentor-paragraph/g)).toHaveLength(4);
      expect(html).toContain('Regula este: Întâi puterile.');
      expect(html).not.toContain('ăsta.Întrebarea');
    } finally {
      if (previous === undefined) delete globalThis.localStorage;
      else globalThis.localStorage = previous;
    }
  });

  it('pune numele și avatarul lângă răspuns și ascunde raportul de diagnosticare', () => {
    const owner = 'maria@test';
    const scope = { subject: 'matematica', grade: 6 };
    const storage = memoryStorage();
    let state = startNewChat(emptyState(), scope);
    const id = activeChat(state, scope).id;
    state = appendMessage(state, id, { role: 'user', content: 'Ce este o fracție?' });
    state = appendMessage(state, id, {
      role: 'assistant',
      content: 'O fracție este o parte dintr-un întreg.'
    });
    state = appendMessage(state, id, { role: 'user', content: 'verifică sistemul' });
    state = appendMessage(state, id, {
      role: 'assistant',
      content: 'Memorie - funcționează',
      diagnostic: true,
      allOk: true
    });
    saveTutorChats(state, { storage, owner });
    const previous = globalThis.localStorage;
    globalThis.localStorage = storage;
    try {
      const html = renderToStaticMarkup(
        createElement(ProfessorScreen, {
          userData: {
            name: 'Maria',
            email: owner,
            class: '6',
            subject: 'matematica',
            mentorLeft: 4
          },
          studyFocus: { subject: 'matematica', grade: '6' }
        })
      );
      expect(html).toContain('Salut, Maria!');
      expect(html).toContain(MASCOT_NAME);
      expect(html).toContain('Ce învățăm azi?');
      expect(html).toContain('src="/mascot/explica.png"');
      expect(html).toContain('data-mood="explica"');
      expect(html).toContain('mentor-avatar');
      expect(html).toContain('O fracție este o parte dintr-un întreg.');
      expect(html).toContain('Nu am înțeles');
      expect(html).not.toContain('funcționează');
      expect(html).not.toContain('Diagnosticare');
      expect(html).not.toContain('diag-report');
    } finally {
      if (previous === undefined) delete globalThis.localStorage;
      else globalThis.localStorage = previous;
    }
  });

  it('schimbă starea lângă exercițiu: mândră când nimerești, încurajare când încă nu e clar', () => {
    const owner = 'stare@test';
    const scope = { subject: 'matematica', grade: 5 };
    const storage = memoryStorage();
    let state = openProblemChat(emptyState(), scope, {
      source: 'quiz',
      id: 'e5n5',
      prompt: 'Calculează 2³.',
      lessonTitle: 'Puteri'
    });
    const id = activeChat(state, scope).id;
    state = appendMessage(state, id, { role: 'user', content: '7' });
    state = appendMessage(state, id, {
      role: 'assistant',
      content: 'Mai încet. Îți repet regula, tot fără rezultat.'
    });
    saveTutorChats(state, { storage, owner });
    const previous = globalThis.localStorage;
    globalThis.localStorage = storage;
    try {
      const guide = renderToStaticMarkup(createElement(ProfessorScreen, {
        userData: { name: 'Ana', email: owner, class: '5', subject: 'matematica', mentorLeft: 4 },
        studyFocus: { subject: 'matematica', grade: '5' }
      }));
      expect(guide).toContain('data-mood="incurajeaza"');
      expect(guide).toContain('Exercițiul din test');
    } finally {
      if (previous === undefined) delete globalThis.localStorage;
      else globalThis.localStorage = previous;
    }

    const review = renderToStaticMarkup(createElement(TestReview, {
      items: [
        { id: 'a', ok: false, prompt: 'Calculează 2³.', given: '7', sample: '8' },
        { id: 'b', ok: true, prompt: 'Altul.', given: 'da', sample: 'da' }
      ]
    }));
    expect(review).toContain('data-mood="mandru"');
    expect(review).toContain('Unele au ieșit.');
    const allWrong = renderToStaticMarkup(createElement(TestReview, {
      items: [{ id: 'a', ok: false, prompt: 'Calculează 2³.', given: '7', sample: '8' }]
    }));
    expect(allWrong).toContain('data-mood="incurajeaza"');
    const allRight = renderToStaticMarkup(createElement(TestReview, {
      items: [{ id: 'a', ok: true, prompt: 'Calculează 2³.', given: '8', sample: '8' }]
    }));
    expect(allRight).toContain('data-mood="sarbatoare"');
    expect(allRight).toContain('Le-ai nimerit.');
  });

  it('șterge un chat și lasă restul, inclusiv pe cel din altă materie', () => {
    let state = startNewChat(emptyState(), mathLesson, {
      now: 1,
      id: 'unu',
      conversationId: 'conv-unu'
    });
    state = appendMessage(state, 'unu', { role: 'user', content: 'prima' });
    state = startNewChat(state, mathLesson, { now: 2, id: 'doi', conversationId: 'conv-doi' });
    state = appendMessage(state, 'doi', { role: 'user', content: 'a doua' });
    state = openProblemChat(
      state,
      mathLesson,
      { source: 'quiz', id: 'e5n5', prompt: 'Calculează 2³.', lessonTitle: 'Puteri' },
      { now: 3, id: 'problema', conversationId: 'conv-problema' }
    );
    state = appendMessage(state, 'problema', { role: 'user', content: 'nu înțeleg' });
    state = startNewChat(state, roLesson, { now: 4, id: 'alta', conversationId: 'conv-alta' });
    state = appendMessage(state, 'alta', { role: 'user', content: 'română' });

    const untouched = removeChat(state, mathLesson, 'alta');
    expect(chatsForScope(untouched, roLesson).map((chat) => chat.id)).toEqual(['alta']);
    expect(chatsForScope(untouched, mathLesson)).toHaveLength(3);

    let next = removeChat(state, mathLesson, 'problema');
    expect(next.chats.find((chat) => chat.id === 'problema')).toBeUndefined();
    expect(chatsForScope(next, mathLesson).map((chat) => chat.id)).toEqual(['unu', 'doi']);
    expect(activeChat(next, mathLesson).id).toBe('doi');
    expect(activeChat(next, roLesson).messages[0].content).toBe('română');

    next = removeChat(next, mathLesson, 'unu');
    expect(activeChat(next, mathLesson).id).toBe('doi');
    next = removeChat(next, mathLesson, 'doi');
    const left = chatsForScope(next, mathLesson);
    expect(left).toHaveLength(1);
    expect(left[0].messages).toEqual([]);
    expect(left[0].id).not.toBe('doi');
    expect(chatsForScope(next, roLesson)).toHaveLength(1);
    expect(activeChat(next, roLesson).id).toBe('alta');
  });

  it('pune un X de 44px lângă fiecare chat și cere confirmarea', () => {
    const source = readFileSync(
      new URL('../frontend/components/StudyScreens.jsx', import.meta.url),
      'utf8'
    );
    const css = readFileSync(new URL('../frontend/styles.css', import.meta.url), 'utf8');
    expect(source).toContain('Ștergi conversația?');
    expect(source).toContain('Anulează');
    expect(source).toContain('mentor-chat-delete');
    expect(source).toContain('MentorAPI.deleteChat');
    expect(css).toMatch(/\.mentor-chat-delete \{[^}]*min-height:\s*44px/);
    expect(css).toMatch(/\.mentor-chat-delete \{[^}]*min-width:\s*44px/);

    const owner = 'sterge@test';
    const scope = { subject: 'matematica', grade: 5 };
    const storage = memoryStorage();
    let state = startNewChat(emptyState(), scope, { now: 1, id: 'unu', conversationId: 'c1' });
    state = appendMessage(state, 'unu', { role: 'user', content: 'prima' });
    state = startNewChat(state, scope, { now: 2, id: 'doi', conversationId: 'c2' });
    state = openProblemChat(
      state,
      scope,
      { source: 'quiz', id: 'e5n1', prompt: 'Calculează 3² × 2³ − 4².' },
      { now: 3, id: 'legat', conversationId: 'c3' }
    );
    saveTutorChats(state, { storage, owner });
    const previous = globalThis.localStorage;
    globalThis.localStorage = storage;
    try {
      const html = renderToStaticMarkup(
        createElement(ProfessorScreen, {
          userData: { name: 'Ana', email: owner, class: '5', subject: 'matematica', mentorLeft: 4 },
          studyFocus: { subject: 'matematica', grade: '5' }
        })
      );
      expect(html.match(/mentor-chat-delete/g)).toHaveLength(3);
      expect(html).toContain('aria-label="Șterge conversația');
      expect(html).toContain('Chat nou');
    } finally {
      if (previous === undefined) delete globalThis.localStorage;
      else globalThis.localStorage = previous;
    }
  });
});
