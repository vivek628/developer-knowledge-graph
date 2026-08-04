import { Link, useLocation } from 'react-router-dom';
import Badge from '../components/Badge.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { EmptyState, ErrorState, LoadingState } from '../components/StatePanel.jsx';
import { useApi } from '../hooks/useApi.js';

function getCoverage(team, members) {
  const required = team.requiredSkills || [];
  if (!required.length) return 100;
  const knownSkills = new Set(members.flatMap((member) => member.skills || []).map((skill) => skill.toLowerCase()));
  const covered = required.filter((skill) => knownSkills.has(skill.toLowerCase())).length;
  return Math.round((covered / required.length) * 100);
}

export default function TeamsDashboardPage() {
  const location = useLocation();
  const { data, error, loading, retry } = useApi('/teams/project-teams');

  return (
    <>
      <PageHeader
        eyebrow="Project staffing"
        title="My teams"
        description="Saved project teams and the graph relationships connecting their members."
        action={<Link to="/team-builder" className="rounded-xl bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-700">Create a team</Link>}
      />

      {location.state?.message && <div className="mb-5 rounded-xl border border-brand-500/20 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700" role="status">{location.state.message}</div>}
      {loading && <LoadingState label="Loading saved teams" />}
      {error && <ErrorState message={error} onRetry={retry} />}
      {!loading && !error && data.length === 0 && <EmptyState title="No project teams yet" description="Use Team Builder to select developers and create your first team." />}

      {!loading && !error && data.length > 0 && (
        <div className="grid gap-5 xl:grid-cols-2">
          {data.map(({ team, members }) => {
            const coverage = getCoverage(team, members);
            return (
              <article key={team.id} className="panel p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">{team.name}</h2>
                    <p className="mt-1 text-xs text-ink-500">Created {new Date(team.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Badge tone={coverage === 100 ? 'green' : 'amber'}>{coverage}% coverage</Badge>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Required skills</p>
                  <div className="mt-2 flex flex-wrap gap-2">{team.requiredSkills.map((skill) => <Badge key={skill}>{skill}</Badge>)}</div>
                </div>

                <div className="mt-5 border-t border-black/7 pt-5">
                  <div className="mb-3 flex justify-between text-xs font-semibold uppercase tracking-wide text-ink-500"><span>Members</span><span>{members.length}</span></div>
                  <div className="space-y-2">
                    {members.map((member) => (
                      <Link key={member.id} to={`/developers/${member.id}`} className="flex items-center justify-between rounded-lg bg-black/[0.025] px-3 py-2.5 hover:bg-brand-50">
                        <div><p className="text-sm font-semibold">{member.name}</p><p className="mt-0.5 text-xs text-ink-500">{member.designation}</p></div>
                        <span className="text-sm text-brand-600">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
