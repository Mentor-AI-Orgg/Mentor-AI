const LateNightCard = ({ onHome, onStay }) => (
  <section className="late-night-card" role="status" aria-label="E târziu">
    <p>🌙 E târziu! Seria ta e salvată pentru azi. Continuăm mâine?</p>
    <div className="late-night-actions">
      <button type="button" className="accent-button" onClick={onHome}>Pe mâine</button>
      <button type="button" className="ghost-button" onClick={onStay}>Mai fac puțin</button>
    </div>
  </section>
);

export default LateNightCard;
