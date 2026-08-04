import { useMemo, useState } from 'react';
import GraphCanvas, { graphNodeTypes, nodeColors } from '../components/GraphCanvas.jsx';
import GraphDetails from '../components/GraphDetails.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { EmptyState, ErrorState, LoadingState } from '../components/StatePanel.jsx';
import { useApi } from '../hooks/useApi.js';

export default function NetworkPage() {
  const { data, error, loading, retry } = useApi('/graph/network');
  const [search, setSearch] = useState('');
  const [visibleTypes, setVisibleTypes] = useState(graphNodeTypes);
  const [selectedNode, setSelectedNode] = useState(null);

  const presentTypes = useMemo(() => graphNodeTypes.filter((type) =>
    data?.nodes.some((node) => node.type === type),
  ), [data]);

  function toggleType(type) {
    setSelectedNode(null);
    setVisibleTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type],
    );
  }

  return (
    <>
      <PageHeader eyebrow="Relationships" title="Developer network" description="Explore people, expertise, delivery, and collaboration as one connected system." />

      {loading && <LoadingState label="Loading knowledge graph" />}
      {error && <ErrorState message={error} onRetry={retry} />}
      {!loading && !error && data.nodes.length === 0 && <EmptyState title="The graph is empty" description="Run the backend seed command to add sample data." />}

      {!loading && !error && data.nodes.length > 0 && (
        <>
          <div className="panel mb-4 flex flex-col gap-4 p-4">
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search any node…" aria-label="Search graph nodes" className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm" />
            <div className="flex flex-wrap gap-2" aria-label="Filter node types">
              {presentTypes.map((type) => {
                const active = visibleTypes.includes(type);
                return <button key={type} type="button" onClick={() => toggleType(type)} aria-pressed={active} className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${active ? 'border-black/10 bg-white text-ink-950' : 'border-transparent bg-black/4 text-ink-500 opacity-55'}`}><span className="size-2 rounded-full" style={{ backgroundColor: nodeColors[type] }} />{type}</button>;
              })}
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
            <section className="panel overflow-hidden p-2">
              <GraphCanvas graph={data} search={search} visibleTypes={visibleTypes} onSelect={setSelectedNode} />
            </section>
            <aside className="panel p-5">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Node details</p>
              <GraphDetails node={selectedNode} />
              <div className="mt-6 border-t border-black/7 pt-5 text-xs leading-5 text-ink-500">
                <p><strong className="text-ink-700">{data.nodes.length}</strong> nodes</p>
                <p><strong className="text-ink-700">{data.edges.length}</strong> relationships</p>
                <p className="mt-3">Drag nodes to rearrange. Scroll or use the controls to zoom. Drag the background to pan.</p>
              </div>
            </aside>
          </div>
        </>
      )}
    </>
  );
}
