import Badge from '../components/Badge.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { EmptyState, ErrorState, LoadingState } from '../components/StatePanel.jsx';
import { useApi } from '../hooks/useApi.js';

const settings = {
  skills: { title: 'Skills', description: 'Capabilities represented across the engineering organization.', itemKey: 'skill', countKey: 'developerCount', countLabel: 'developers' },
  technologies: { title: 'Technologies', description: 'Tools and platforms powering active and completed projects.', itemKey: 'technology', countKey: 'projectCount', countLabel: 'projects' },
};

export default function CatalogPage({ type }) {
  const config = settings[type];
  const { data, error, loading, retry } = useApi(`/${type}`);

  return (
    <>
      <PageHeader eyebrow="Knowledge catalog" title={config.title} description={config.description} />
      {loading && <LoadingState label={`Loading ${type}`} />}
      {error && <ErrorState message={error} onRetry={retry} />}
      {!loading && !error && data.length === 0 && <EmptyState title={`No ${type} yet`} />}
      {!loading && !error && <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{data.map((row) => { const item = row[config.itemKey]; return <article key={item.id} className="panel flex items-center justify-between gap-3 p-4"><div className="min-w-0"><p className="truncate text-sm font-semibold">{item.name}</p>{item.category && <p className="mt-1 text-xs text-ink-500">{item.category}</p>}</div><Badge tone="gray">{row[config.countKey]} {config.countLabel}</Badge></article>; })}</div>}
    </>
  );
}
