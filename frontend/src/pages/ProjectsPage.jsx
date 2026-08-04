import Badge from '../components/Badge.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { EmptyState, ErrorState, LoadingState } from '../components/StatePanel.jsx';
import { useApi } from '../hooks/useApi.js';

export default function ProjectsPage() {
  const { data, error, loading, retry } = useApi('/projects');

  return (
    <>
      <PageHeader eyebrow="Delivery" title="Projects" description="Explore the products, their owners, and the technologies behind them." />
      {loading && <LoadingState label="Loading projects" />}
      {error && <ErrorState message={error} onRetry={retry} />}
      {!loading && !error && data.length === 0 && <EmptyState title="No projects yet" />}
      {!loading && !error && <div className="grid gap-4 lg:grid-cols-2">{data.map(({ project, technologies, company }) => <article key={project.id} className="panel p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{company?.name}</p><h2 className="mt-1 text-lg font-semibold">{project.name}</h2></div><Badge tone={project.status === 'Active' ? 'green' : project.status === 'Planned' ? 'amber' : 'gray'}>{project.status}</Badge></div><p className="mt-3 text-sm leading-6 text-ink-500">{project.description}</p><div className="mt-4 flex flex-wrap gap-2">{technologies.map((technology) => <Badge key={technology.id} tone="gray">{technology.name}</Badge>)}</div></article>)}</div>}
    </>
  );
}
