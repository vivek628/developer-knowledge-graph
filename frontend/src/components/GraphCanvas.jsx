import { useEffect, useMemo, useRef } from 'react';

export const nodeColors = {
  Developer: '#23845b',
  Project: '#3b82f6',
  Skill: '#d97706',
  Technology: '#7c3aed',
  Repository: '#db2777',
  Team: '#0891b2',
  Company: '#64748b',
};

export const graphNodeTypes = Object.keys(nodeColors);

export default function GraphCanvas({ graph, search = '', visibleTypes = graphNodeTypes, onSelect, height = 620 }) {
  const containerRef = useRef(null);
  const cytoscapeRef = useRef(null);
  const selectHandlerRef = useRef(onSelect);
  selectHandlerRef.current = onSelect;

  const elements = useMemo(() => {
    const visible = new Set(visibleTypes);
    const nodes = graph.nodes
      .filter((node) => visible.has(node.type))
      .map((node) => ({ data: { ...node, color: nodeColors[node.type] || '#64748b' } }));
    const nodeIds = new Set(nodes.map((node) => node.data.id));
    const edges = graph.edges
      .filter((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target))
      .map((edge) => ({ data: edge }));

    return [...nodes, ...edges];
  }, [graph, visibleTypes]);

  // Cytoscape owns the canvas inside this element. Destroying the instance on
  // cleanup prevents duplicate canvases during navigation and React Strict Mode.
  useEffect(() => {
    let instance;
    let resizeObserver;
    let cancelled = false;

    async function createGraph() {
      // Cytoscape is the largest frontend dependency. Loading it only when a
      // graph mounts keeps the dashboard's initial download comfortably small.
      const { default: cytoscape } = await import('cytoscape');
      if (cancelled) return;

      instance = cytoscape({
      container: containerRef.current,
      elements,
      wheelSensitivity: 0.18,
      minZoom: 0.2,
      maxZoom: 2.5,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(color)',
            'border-color': '#ffffff',
            'border-width': 2,
            color: '#34413a',
            label: 'data(label)',
            'font-family': 'Inter, system-ui, sans-serif',
            'font-size': 9,
            'font-weight': 600,
            'text-background-color': '#ffffff',
            'text-background-opacity': 0.9,
            'text-background-padding': 2,
            'text-margin-y': 7,
            'text-valign': 'bottom',
            height: 27,
            width: 27,
          },
        },
        {
          selector: 'node[type = "Developer"]',
          style: { height: 38, width: 38, 'font-size': 10 },
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'line-color': '#cfd6d1',
            'target-arrow-color': '#cfd6d1',
            'target-arrow-shape': 'triangle',
            'arrow-scale': 0.65,
            opacity: 0.62,
            width: 1.2,
          },
        },
        { selector: '.faded', style: { opacity: 0.08 } },
        { selector: 'node.matched', style: { 'border-color': '#17201c', 'border-width': 4, height: 46, width: 46, 'z-index': 10 } },
        { selector: ':selected', style: { 'border-color': '#17201c', 'border-width': 4 } },
      ],
      layout: {
        name: 'cose',
        animate: false,
        randomize: true,
        componentSpacing: 55,
        nodeRepulsion: () => 4800,
        idealEdgeLength: () => 85,
      },
      });

      instance.on('tap', 'node', (event) => selectHandlerRef.current?.(event.target.data()));
      instance.on('tap', (event) => {
        if (event.target === instance) selectHandlerRef.current?.(null);
      });

      resizeObserver = new ResizeObserver(() => instance.resize());
      resizeObserver.observe(containerRef.current);
      cytoscapeRef.current = instance;
    }

    createGraph();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      instance?.destroy();
      cytoscapeRef.current = null;
    };
  }, [elements]);

  // Search keeps context visible but dims non-matches, then moves the matching
  // nodes into view. Clearing the input restores and fits the complete graph.
  useEffect(() => {
    const instance = cytoscapeRef.current;
    if (!instance) return;

    const query = search.trim().toLowerCase();
    instance.elements().removeClass('faded matched');

    if (!query) {
      instance.fit(undefined, 35);
      return;
    }

    const matches = instance.nodes().filter((node) => node.data('label').toLowerCase().includes(query));
    instance.elements().addClass('faded');
    matches.removeClass('faded').addClass('matched');
    matches.connectedEdges().removeClass('faded');
    matches.neighborhood('node').removeClass('faded');

    if (matches.length) instance.animate({ fit: { eles: matches, padding: 90 }, duration: 250 });
  }, [search, elements]);

  function changeZoom(multiplier) {
    const instance = cytoscapeRef.current;
    if (!instance) return;
    instance.zoom({ level: instance.zoom() * multiplier, renderedPosition: { x: instance.width() / 2, y: instance.height() / 2 } });
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#fbfcfa]" style={{ height }}>
      <div ref={containerRef} className="size-full" role="application" aria-label="Interactive developer knowledge graph" />
      <div className="absolute right-3 top-3 flex overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
        <button type="button" onClick={() => changeZoom(1.2)} className="grid size-9 place-items-center text-lg hover:bg-black/5" aria-label="Zoom in">+</button>
        <button type="button" onClick={() => changeZoom(0.8)} className="grid size-9 place-items-center border-l border-black/8 text-lg hover:bg-black/5" aria-label="Zoom out">−</button>
        <button type="button" onClick={() => cytoscapeRef.current?.fit(undefined, 35)} className="border-l border-black/8 px-3 text-xs font-semibold hover:bg-black/5">Fit</button>
      </div>
    </div>
  );
}
