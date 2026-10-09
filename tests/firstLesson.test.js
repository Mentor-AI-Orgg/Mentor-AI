import { describe, expect, it } from 'vitest';
import { firstLessonExtras, firstUnitFromGuide, homeLessonCta, lessonIntent } from '../frontend/firstLesson.js';
import { parseAppHash } from '../frontend/appRoutes.js';

describe('prima lecție', () => {
  it('alege materia și clasa, iar evaluarea națională deschide traseul EN', () => {
    expect(lessonIntent({ class: '6', subject: 'romana' })).toEqual({
      track: null,
      subject: 'romana',
      grade: 6
    });
    expect(lessonIntent({ class: '7', exam: 'evaluare', subject: 'matematica' })).toEqual({
      track: 'en',
      subject: 'matematica',
      grade: 8
    });
    expect(lessonIntent({})).toEqual({ track: null, subject: 'matematica', grade: 5 });
  });

  it('deschide primul capitol și prima lecție din ghid', () => {
    const guide = {
      units: [
        { id: 'naturale', title: 'Numere', lessons: [{ id: 'citire', title: 'Citirea' }, { id: 'adunare' }] }
      ]
    };
    expect(firstUnitFromGuide(guide)).toEqual({
      chapterId: 'naturale',
      lessonId: 'citire',
      title: 'Citirea'
    });
    expect(firstLessonExtras({ class: '6' }, guide)).toEqual({
      subject: 'matematica',
      grade: 6,
      track: null,
      chapter: 'naturale',
      lessonId: 'citire'
    });
    expect(firstLessonExtras({ class: '8', exam: 'evaluare' }, null).track).toBe('en');
    expect(firstLessonExtras({ class: '8', exam: 'evaluare' }, null).chapter).toBeNull();
  });

  it('pune pe acasă continuarea sau prima lecție', () => {
    expect(homeLessonCta(null)).toEqual({ label: 'Începe prima lecție', mode: 'first' });
    expect(homeLessonCta({ chapterId: 'triunghi', title: 'Triunghiul' })).toEqual({
      label: 'Continuă de unde ai rămas',
      mode: 'continue'
    });
  });

  it('ține lecția în adresă ca să se deschidă după reîmprospătare', () => {
    const route = parseAppHash('#/lectii/matematica/6/naturale/lectie-citire');
    expect(route.screen).toBe('learn');
    expect(route.extras.chapter).toBe('naturale');
    expect(route.extras.lessonId).toBe('citire');
    expect(parseAppHash('#/incepe').screen).toBe('start-lesson');
  });
});
