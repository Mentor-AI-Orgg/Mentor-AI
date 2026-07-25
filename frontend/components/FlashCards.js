const { useState } = React;

const FlashCard = ({ card, flipped, onFlip }) => (
  <div className={`flashcard ${flipped ? 'is-flipped' : ''}`} onClick={onFlip} role="button" tabIndex={0}
    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onFlip(); } }}>
    <div className="flashcard-inner">
      <div className="flashcard-face flashcard-front">
        <span className="eyebrow">Întrebare</span>
        <p>{card.question}</p>
        <small>Atinge pentru răspuns</small>
      </div>
      <div className="flashcard-face flashcard-back">
        <span className="eyebrow">Răspuns</span>
        <p>{card.answer}</p>
      </div>
    </div>
  </div>
);

const FlashCards = ({ userData, presetTopics = [] }) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [known, setKnown] = useState({});
  const [source, setSource] = useState('');

  const generate = async topic => {
    const finalTopic = topic || customPrompt.trim();
    if (!finalTopic || loading) return;
    setLoading(true);
    setFlipped(false);
    setIndex(0);
    setKnown({});
    setSource(finalTopic);

    const result = await window.MentorAPI.generateFlashcards({
      topic: finalTopic,
      subject: userData?.profile || 'matematica',
      class_level: userData?.class || 'liceu',
      language: userData?.language || 'ro',
      count: 6
    });

    if (result.success && result.data?.cards?.length) {
      setCards(result.data.cards);
    } else {
      setCards([
        { id: 'fc_fallback_0', question: `Ce știi deja despre „${finalTopic}”?`, answer: 'Notează 2 idei, apoi verifică-le cu materialul de curs.' },
        { id: 'fc_fallback_1', question: `Dă un exemplu pentru „${finalTopic}”.`, answer: 'Gândește-te la o aplicație concretă, din viața reală.' }
      ]);
    }
    setLoading(false);
  };

  const markKnown = value => {
    setKnown(prev => ({ ...prev, [cards[index].id]: value }));
    if (index < cards.length - 1) {
      setIndex(i => i + 1);
      setFlipped(false);
    }
  };

  const known_count = Object.values(known).filter(Boolean).length;
  const reviewed = Object.keys(known).length;

  return (
    <section className="flashcards-card surface">
      <div className="focus-timer-head">
        <div>
          <div className="eyebrow">Flashcarduri</div>
          <h3 className="display-font">Repetiție rapidă.</h3>
        </div>
        {cards.length > 0 && <span className="learn-chip"><i className="fas fa-check" /> {known_count}/{reviewed} știute</span>}
      </div>

      {presetTopics.length > 0 && (
        <div className="flashcards-presets">
          {presetTopics.map(t => (
            <button key={t} type="button" className="focus-preset-btn" onClick={() => generate(t)} disabled={loading}>{t}</button>
          ))}
        </div>
      )}

      <div className="flashcards-custom-row">
        <input
          value={customPrompt}
          onChange={e => setCustomPrompt(e.target.value)}
          placeholder="Sau scrie orice subiect / lipește un text de lecție..."
          onKeyDown={e => { if (e.key === 'Enter') generate(); }}
        />
        <button type="button" className="accent-button" onClick={() => generate()} disabled={loading || !customPrompt.trim()}>
          {loading ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-wand-magic-sparkles" />}
        </button>
      </div>

      {loading && (
        <div className="flashcard-skeleton skeleton" aria-hidden="true"></div>
      )}

      {!loading && cards.length > 0 && (
        <>
          <div className="flashcards-progress-track"><div style={{ width: `${((index) / cards.length) * 100}%` }}></div></div>
          <FlashCard card={cards[index]} flipped={flipped} onFlip={() => setFlipped(f => !f)} />
          <div className="flashcards-nav">
            <button type="button" className="ghost-button" disabled={index === 0} onClick={() => { setIndex(i => Math.max(0, i - 1)); setFlipped(false); }}>
              <i className="fas fa-arrow-left" />
            </button>
            <div className="flashcards-nav-actions">
              <button type="button" className="flashcard-mark unknown" onClick={() => markKnown(false)}><i className="fas fa-xmark" /> Nu știu</button>
              <button type="button" className="flashcard-mark known" onClick={() => markKnown(true)}><i className="fas fa-check" /> Știu</button>
            </div>
            <button type="button" className="ghost-button" disabled={index === cards.length - 1} onClick={() => { setIndex(i => Math.min(cards.length - 1, i + 1)); setFlipped(false); }}>
              <i className="fas fa-arrow-right" />
            </button>
          </div>
          <div className="flashcards-meta">Cardul {index + 1} din {cards.length} · subiect: {source}</div>
        </>
      )}

      {!loading && cards.length === 0 && (
        <p className="flashcards-empty">Alege un modul de mai sus sau scrie un subiect pentru a genera flashcarduri.</p>
      )}
    </section>
  );
};

window.FlashCards = FlashCards;
