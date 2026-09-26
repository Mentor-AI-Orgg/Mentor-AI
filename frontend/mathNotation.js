// Recunoaște fracțiile și puterile scrise cu / și ^, ca să poată fi desenate
// ca în caiet. Nu atinge cuvintele: „pentru/sau” rămâne text.

const SIGN = /^[-−]/;
const LETTER = /[A-Za-z]/;
const WORD_LETTER = /[A-Za-zăâîșțĂÂÎȘȚ]/;

function isMathGroup(inner) {
  if (/[A-Za-zăâîșțĂÂÎȘȚ]{2,}/.test(inner)) return false;
  if (!/[0-9A-Za-z]/.test(inner)) return false;
  return !/[^0-9A-Za-zăâîșțĂÂÎȘȚ\s·×+\-−:^/(),]/.test(inner);
}

function readBalanced(source, index) {
  if (source[index] !== '(') return null;
  let depth = 0;
  for (let cursor = index; cursor < source.length; cursor += 1) {
    if (source[cursor] === '(') depth += 1;
    else if (source[cursor] === ')') {
      depth -= 1;
      if (depth === 0) {
        return { end: cursor + 1, inner: source.slice(index + 1, cursor) };
      }
    }
  }
  return null;
}

function readSimpleAtom(source, index) {
  const digit = source.slice(index).match(/^\d+/);
  if (digit) return { end: index + digit[0].length, text: digit[0] };
  if (!LETTER.test(source[index] || '')) return null;
  if (WORD_LETTER.test(source[index + 1] || '')) return null;
  if (WORD_LETTER.test(source[index - 1] || '')) return null;
  return { end: index + 1, text: source[index] };
}

function readExponent(source, index) {
  if (source[index] === '(') {
    const group = readBalanced(source, index);
    if (!group || !isMathGroup(group.inner)) return null;
    return { end: group.end, text: group.inner };
  }
  const digit = source.slice(index).match(/^\d+/);
  if (digit) return { end: index + digit[0].length, text: digit[0] };
  if (!LETTER.test(source[index] || '')) return null;
  if (WORD_LETTER.test(source[index + 1] || '')) return null;
  return { end: index + 1, text: source[index] };
}

function readPiece(source, index) {
  if (source[index] === '(') {
    const group = readBalanced(source, index);
    if (!group || !isMathGroup(group.inner)) return null;
    const innerNodes = parseMath(group.inner);
    const only = innerNodes.length === 1 ? innerNodes[0] : null;
    const base = only && (only.kind === 'frac' || only.kind === 'pow')
      ? only
      : { kind: 'group', inner: group.inner };
    if (source[group.end] === '^') {
      const exp = readExponent(source, group.end + 1);
      if (exp) return { kind: 'pow', base, exp: exp.text, end: exp.end };
    }
    if (base.kind === 'group') return { kind: 'group', inner: group.inner, end: group.end };
    return { ...base, end: group.end };
  }

  const atom = readSimpleAtom(source, index);
  if (!atom) return null;
  if (source[atom.end] === '^') {
    const exp = readExponent(source, atom.end + 1);
    if (exp) {
      return {
        kind: 'pow',
        base: { kind: 'text', value: atom.text },
        exp: exp.text,
        end: exp.end
      };
    }
  }
  return { kind: 'atom', text: atom.text, end: atom.end };
}

function asNode(piece) {
  if (!piece) return null;
  if (piece.kind === 'atom') return { kind: 'text', value: piece.text };
  if (piece.kind === 'group') return { kind: 'math', value: piece.inner };
  const { end: _end, ...node } = piece;
  return node;
}

function parseFractionAt(source, index) {
  const left = readPiece(source, index);
  if (!left) return null;
  let slashAt = left.end;
  if (source[slashAt] === ' ' && source[slashAt + 1] === '/') slashAt += 1;
  if (source[slashAt] === '/') {
    let rightAt = slashAt + 1;
    if (source[rightAt] === ' ') rightAt += 1;
    const right = readPiece(source, rightAt);
    if (right) {
      return { kind: 'frac', num: asNode(left), den: asNode(right), end: right.end };
    }
  }
  if (left.kind === 'pow' || left.kind === 'frac') {
    const { end, ...node } = left;
    return { ...node, end };
  }
  return null;
}

function parseSigned(source, index) {
  if (!SIGN.test(source[index] || '')) return null;
  const before = source[index - 1] || '';
  if (before && !/[\s(=:+,·×]/.test(before)) return null;
  if (source[index + 1] === ' ') return null;
  const node = parseFractionAt(source, index + 1);
  if (!node || (node.kind !== 'frac' && node.kind !== 'pow')) return null;
  return { ...node, sign: '−' };
}

export function parseMath(input) {
  const source = String(input ?? '');
  const nodes = [];
  let index = 0;
  let buffer = '';
  const flush = () => {
    if (!buffer) return;
    nodes.push({ kind: 'text', value: buffer });
    buffer = '';
  };
  while (index < source.length) {
    const node = parseSigned(source, index) || parseFractionAt(source, index);
    if (node && node.end > index) {
      flush();
      nodes.push(node);
      index = node.end;
      continue;
    }
    buffer += source[index];
    index += 1;
  }
  flush();
  return nodes;
}

export function mathPlain(node) {
  if (!node) return '';
  if (node.kind === 'text' || node.kind === 'math') return node.value;
  if (node.kind === 'group') return `(${node.inner})`;
  if (node.kind === 'frac') {
    const body = `${mathPlain(node.num)} supra ${mathPlain(node.den)}`;
    return node.sign ? `minus ${body}` : body;
  }
  if (node.kind === 'pow') {
    const body = `${mathPlain(node.base)} la puterea ${node.exp}`;
    return node.sign ? `minus ${body}` : body;
  }
  return '';
}
