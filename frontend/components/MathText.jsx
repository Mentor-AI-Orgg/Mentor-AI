import { mathPlain, parseMath } from '../mathNotation.js';

function MathNode({ node }) {
  if (!node) return null;
  if (node.kind === 'text') return node.value;
  if (node.kind === 'math') return <MathText text={node.value} />;
  if (node.kind === 'group') {
    return (
      <>
        (<MathText text={node.inner} />)
      </>
    );
  }
  if (node.kind === 'pow') {
    return (
      <span className="math-pow">
        {node.sign ? <span className="math-sign">{node.sign}</span> : null}
        <MathNode node={node.base} />
        <sup className="math-sup"><MathText text={node.exp} /></sup>
      </span>
    );
  }
  if (node.kind === 'frac') {
    return (
      <span className="math-signed">
        {node.sign ? <span className="math-sign" aria-hidden="true">{node.sign}</span> : null}
        <span className="math-frac" role="img" aria-label={mathPlain(node)}>
          <span aria-hidden="true" className="math-num"><MathNode node={node.num} /></span>
          <span aria-hidden="true" className="math-bar" />
          <span aria-hidden="true" className="math-den"><MathNode node={node.den} /></span>
        </span>
      </span>
    );
  }
  return null;
}

export default function MathText({ text }) {
  const nodes = parseMath(text);
  if (!nodes.length) return null;
  return nodes.map((node, index) => <MathNode key={`${node.kind}-${index}`} node={node} />);
}
