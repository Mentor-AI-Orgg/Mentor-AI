import { dailyQuote, quoteFor, formatQuote } from '../quotes.js';

const QuoteCard = ({ seed, className = '' }) => {
  const entry = seed == null ? dailyQuote() : quoteFor(seed);
  return (
    <p className={`quote-card ${className}`}>
      <span className="quote-text">„{entry.text}”</span>
      <span className="quote-by"> — {entry.by}</span>
    </p>
  );
};

export default QuoteCard;
export { formatQuote };
