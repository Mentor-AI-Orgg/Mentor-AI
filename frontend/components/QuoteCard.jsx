import { dailyQuote, quoteFor, quoteForGrade, formatQuote } from '../quotes.js';

const QuoteCard = ({ seed, grade, className = '' }) => {
  const entry = (grade != null && grade !== ''
    ? quoteForGrade(grade, seed)
    : (seed == null ? dailyQuote() : quoteFor(seed))) || { text: '', by: '' };
  return (
    <p className={`quote-card ${className}`}>
      <span className="quote-text">„{entry.text}”</span>
      <span className="quote-by"> — {entry.by}</span>
    </p>
  );
};

export default QuoteCard;
export { formatQuote };
