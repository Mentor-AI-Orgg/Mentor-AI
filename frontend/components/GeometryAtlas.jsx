import { useMemo, useState } from 'react';
import GeoFigure from './GeoFigure.jsx';

const GeometryAtlas = ({ atlas }) => {
  const [tab, setTab] = useState('plane');
  const [spinId, setSpinId] = useState('');
  const plane = atlas?.plane || [];
  const space = atlas?.space || [];
  const counts = useMemo(() => ({
    plane: plane.length,
    space: space.length
  }), [plane.length, space.length]);
  if (!atlas || !(atlas.plane || atlas.space)) return null;
  const items = tab === 'space' ? space : plane;

  return (
    <section className="geo-atlas surface" aria-label="Atlas de figuri geometrice">
      <div className="eyebrow">Atlas · programa de gimnaziu</div>
      <h2 className="display-font">{atlas.title || 'Figuri geometrice'}</h2>
      <p>Toate figurile din programa de gimnaziu: plane și în spațiu. La fiecare ai desenul, formulele și ce trebuie să reții. La corpuri, apasă „Învârte” — se rotește, ca o machetă.</p>
      <div className="geo-atlas-tabs" role="tablist">
        <button
          type="button"
          className={`grade-chip ${tab === 'plane' ? 'selected' : ''}`}
          onClick={() => setTab('plane')}
        >
          Figuri plane ({counts.plane})
        </button>
        <button
          type="button"
          className={`grade-chip ${tab === 'space' ? 'selected' : ''}`}
          onClick={() => setTab('space')}
        >
          Corpuri în spațiu ({counts.space})
        </button>
      </div>
      <div className="geo-atlas-grid">
        {items.map(entry => (
          <article key={entry.id} className="geo-atlas-card">
            <h3>{entry.name}</h3>
            <p className="geo-atlas-grade">Din clasa a {entry.fromGrade}-a</p>
            <GeoFigure
              kind={entry.id}
              caption={entry.name}
              formulas={entry.formulas}
              info={entry.info}
              flat={tab !== 'space' || spinId !== entry.id}
            />
            {tab === 'space' && (
              <button
                type="button"
                className="ghost-button result-action"
                onClick={() => setSpinId(spinId === entry.id ? '' : entry.id)}
              >
                {spinId === entry.id ? 'Desenul plat' : 'Învârte 3D'}
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default GeometryAtlas;
