import Mascota from './mascot/Mascota.jsx';
import { STORY_TITLE } from '../config/mascot.js';

const StoryScene = ({ scene, onClose, compact = false }) => {
  if (!scene) return null;
  const lines = Array.isArray(scene.lines) ? scene.lines : [];
  return (
    <article className={`story-scene ${compact ? 'is-compact' : ''}`}>
      <Mascota mood={scene.mood || 'salut'} size={compact ? 'sm' : 'md'} />
      <div>
        {scene.chapterTitle && <p className="eyebrow">{scene.chapterTitle}</p>}
        {lines.map(line => <p key={line}>{line}</p>)}
        {onClose && (
          <button type="button" className="ghost-button" onClick={onClose}>Am citit</button>
        )}
      </div>
    </article>
  );
};

const StoryPop = ({ scene, onClose }) => {
  if (!scene) return null;
  return (
    <div className="chest-pop" role="dialog" aria-modal="true" aria-labelledby="story-pop-title">
      <div className="chest-card story-pop-card">
        <h2 id="story-pop-title" className="display-font chest-title">{STORY_TITLE}</h2>
        <StoryScene scene={scene} />
        <button type="button" className="accent-button" onClick={onClose}>Am citit</button>
      </div>
    </div>
  );
};

export default StoryScene;
export { StoryPop };
