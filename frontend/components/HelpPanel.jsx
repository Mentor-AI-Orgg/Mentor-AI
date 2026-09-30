import { useMemo, useState } from 'react';
import { HELP_CATEGORIES, searchHelp } from '../help/articles.js';

const HelpPanel = ({ heading = 'Ajutor' }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('toate');
  const articles = useMemo(() => searchHelp(query, category), [query, category]);

  return (
    <section className="help-panel" aria-label={heading}>
      <div className="eyebrow">Ajutor</div>
      <h2 className="display-font">{heading}</h2>
      <label className="field-label">
        Caută
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
      {articles.length === 0 && <p>Nu am găsit nimic pentru căutarea asta. Încearcă alt cuvânt.</p>}
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
