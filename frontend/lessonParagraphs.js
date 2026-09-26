const NEXT_SENTENCE = /([.!?])\s+(?=[A-ZĂÂÎȘȚ„«])/g;
const ABBREVIATIONS = /^(nr|art|etc|vol|pag|ed|cf|op|dl|dna|sv|id|cap|fig|obs|cca|aprox|dom|prof|univ)$/i;

function isAbbreviation(word) {
  const bare = String(word || '').replace(/^[„«"']+|[”»"']+$/g, '');
  if (/^[A-ZĂÂÎȘȚ]$/.test(bare)) return true;
  return ABBREVIATIONS.test(bare);
}

export function splitSentences(block) {
  const parts = [];
  let start = 0;
  const re = new RegExp(NEXT_SENTENCE.source, 'g');
  let match;
  while ((match = re.exec(block))) {
    const before = block.slice(start, match.index);
    const word = before.match(/(\S+)$/)?.[1] || '';
    if (isAbbreviation(word)) continue;
    parts.push(block.slice(start, match.index + 1).trim());
    start = match.index + match[0].length;
  }
  const tail = block.slice(start).trim();
  if (tail) parts.push(tail);
  return parts.filter(Boolean);
}

export function splitLessonParagraphs(text, maxChars = 380) {
  const source = String(text || '').replace(/\r\n/g, '\n').trim();
  if (!source) return [];
  const blocks = source.split(/\n\n+/).map(part => part.trim()).filter(Boolean);
  const paragraphs = [];
  blocks.forEach(block => {
    if (block.length <= maxChars) {
      paragraphs.push(block);
      return;
    }
    const sentences = splitSentences(block);
    let buffer = '';
    sentences.forEach(sentence => {
      const next = buffer ? `${buffer} ${sentence}` : sentence;
      if (buffer && next.length > maxChars) {
        paragraphs.push(buffer);
        buffer = sentence;
      } else {
        buffer = next;
      }
    });
    if (buffer) paragraphs.push(buffer);
  });
  return paragraphs;
}
