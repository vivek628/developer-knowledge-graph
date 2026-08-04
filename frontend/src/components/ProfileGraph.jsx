import { useState } from 'react';
import { useApi } from '../hooks/useApi.js';
import GraphCanvas, { graphNodeTypes, nodeColors } from './GraphCanvas.jsx';
import GraphDetails from './GraphDetails.jsx';
import { ErrorState, LoadingState } from './StatePanel.jsx';

export default function ProfileGraph({ developerId }) {
  const { data, error, loading, retry } = useApi(`/graph/developers/${developerId}`);
  const [selectedNode, setSelectedNode] = useState(null);

  if (loading) return <LoadingState label="Building developer graph" />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  const presentTypes = graphNodeTypes.filter((type) => data.nodes.some((node) => node.type === type));

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-2">
        {presentTypes.map((type) => <span key={type} className="flex items-center gap-1.5 text-xs text-ink-500"><span className="size-2 rounded-full" style={{ backgroundColor: nodeColors[type] }} />{type}</span>)}
      </div>
      <GraphCanvas graph={data} visibleTypes={presentTypes} onSelect={setSelectedNode} height={430} />
      {selectedNode && <div className="mt-4 rounded-xl border border-black/7 p-4"><GraphDetails node={selectedNode} /></div>}
    </div>
  );
}
