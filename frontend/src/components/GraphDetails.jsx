import Badge from './Badge.jsx';
import { nodeColors } from './GraphCanvas.jsx';

export default function GraphDetails({ node }) {
  if (!node) {
    return <div className="rounded-xl bg-black/[0.025] p-5 text-center text-sm text-ink-500">Click a node to inspect its details.</div>;
  }

  const hiddenKeys = new Set(['id', 'name', 'nodeType']);
  const properties = Object.entries(node.properties || {}).filter(([key, value]) =>
    !hiddenKeys.has(key) && value !== null && value !== '',
  );

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="size-3 rounded-full" style={{ backgroundColor: nodeColors[node.type] }} />
        <Badge tone="gray">{node.type}</Badge>
      </div>
      <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{node.label}</h3>
      <dl className="mt-5 space-y-3">
        {properties.map(([key, value]) => (
          <div key={key}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-500">{key.replace(/([A-Z])/g, ' $1')}</dt>
            <dd className="mt-1 break-words text-sm text-ink-700">{String(value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
