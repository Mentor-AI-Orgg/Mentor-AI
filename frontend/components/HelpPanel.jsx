import { useMemo, useState } from 'react';
import { HELP_CATEGORIES, searchHelp } from '../help/articles.js';
import { askApp } from '../help/ask.js';
import Mascota from './mascot/Mascota.jsx';

const HelpPanel = ({ heading = 'Ajutor', onNavigate }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('toate');
  const [askText, setAskText] = useState('');
  const [reply, setReply] = useState(null);
  const articles = useMemo(() => searchHelp(query, category), [query, category]);

  const ask = event => {
    event.preventDefault();
    setReply(askApp(askText));
  };

  return (
    <section className="help-panel" aria-label={heading}>
      <div className="eyebrow">Ajutor</div>
      <h2 className="display-font">{heading}</h2>
      <form className="help-ask" onSubmit={ask}>
        <label className="field-label">
          Întreabă despre aplicație
          <input
            className="field form-input help-search"
            value={askText}
            onChange={event => setAskText(event.target.value)}
            placeholder="De exemplu: unde sunt setările?"
          />
        </label>
        <button type="submit" className="accent-button">Întreabă</button>
      </form>
      {reply && (
        <div className="help-answer surface" role="status">
          <p>{reply.answer}</p>
          {reply.screen && onNavigate ? (
            <button
              type="button"
              className="accent-button"
              onClick={() => onNavigate(reply.screen, reply.extras || {})}
            >
              Du-mă acolo
            </button>
          ) : null}
        </div>
      )}
      <label className="field-label">
        Caută în ghid
        <input
          className="field form-input help-search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="De exemplu: caiet, examen, telefon"
        />
      </label>
      <div className="help-cats" role="tablist" aria-label="Categorii">
        {HELP_CATEGORIES.map(item => (
          <button
            key={item.id}
            type="button"
            className={`grade-chip ${category === item.id ? 'selected' : ''}`}
            aria-pressed={category === item.id}
            onClick={() => setCategory(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {articles.length === 0 && (
        <div className="empty-with-mascot">
          <Mascota mood="thinking" size="md" />
          <p>Nu am găsit nimic pentru căutarea asta. Încearcă alt cuvânt.</p>
        </div>
      )}
      {articles.map(article => (
        <article key={article.id} className="surface help-article" id={`ajutor-${article.id}`}>
          <h3 className="display-font">{article.title}</h3>
          <p>{article.body}</p>
        </article>
      ))}
    </section>
  );
};

export default HelpPanel;
