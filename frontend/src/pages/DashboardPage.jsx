import { Link } from 'react-router-dom';
import Badge from '../components/Badge.jsx';
import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import { ErrorState, LoadingState } from '../components/StatePanel.jsx';
import { useApi } from '../hooks/useApi.js';

export default function DashboardPage() {
  const dashboard = useApi('/dashboard');
  const developers = useApi('/developers');

  if (dashboard.loading || developers.loading) return <LoadingState label="Building your overview" />;
  if (dashboard.error) return <ErrorState message={dashboard.error} onRetry={dashboard.retry} />;
  if (developers.error) return <ErrorState message={developers.error} onRetry={developers.retry} />;

  const stats = [
    ['Developers', dashboard.data.developerCount], ['Projects', dashboard.data.projectCount],
    ['Skills', dashboard.data.skillCount], ['Technologies', dashboard.data.technologyCount],
    ['Repositories', dashboard.data.repositoryCount], ['Teams', dashboard.data.teamCount],
  ];

  return (
    <>
      <PageHeader eyebrow="Workspace overview" title="Engineering knowledge, connected." description="See who knows what, where they have contributed, and how your teams collaborate." />

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6" aria-label="Graph totals">
        {stats.map(([label, value]) => <StatCard key={label} label={label} value={value} />)}
      </section>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <section className="panel p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Recent developers</h2>
              <p className="mt-1 text-sm text-ink-500">People available in the knowledge graph</p>
            </div>
            <Link to="/developers" className="text-sm font-semibold text-brand-600 hover:text-brand-700">View all</Link>
          </div>
          <div className="mt-5 divide-y divide-black/6">
            {developers.data.slice(0, 5).map((developer) => (
              <Link key={developer.id} to={`/developers/${developer.id}`} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold hover:text-brand-700">{developer.name}</p>
                  <p className="truncate text-xs text-ink-500">{developer.designation}</p>
                </div>
                <span className="shrink-0 text-xs text-ink-500">{developer.experience} yrs</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="panel p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Popular skills</h2>
          <p className="mt-1 text-sm text-ink-500">Most represented across developers</p>
          <div className="mt-5 space-y-3">
            {dashboard.data.popularSkills.map(({ skill, developerCount }) => (
              <div key={skill.id} className="flex items-center justify-between gap-3">
                <Badge tone="gray">{skill.name}</Badge>
                <span className="text-xs font-medium text-ink-500">{developerCount} developers</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
