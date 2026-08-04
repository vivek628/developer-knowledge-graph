import { Link, useParams } from 'react-router-dom';
import Badge from '../components/Badge.jsx';
import { initials } from '../components/DeveloperCard.jsx';
import { ErrorState, LoadingState } from '../components/StatePanel.jsx';
import { useApi } from '../hooks/useApi.js';
import ProfileGraph from '../components/ProfileGraph.jsx';

function ProfileSection({ title, children }) {
  return <section className="panel p-5 sm:p-6"><h2 className="mb-4 text-lg font-semibold">{title}</h2>{children}</section>;
}

export default function DeveloperPage() {
  const { developerId } = useParams();
  const profile = useApi(`/developers/${developerId}`);
  const reviewers = useApi(`/developers/${developerId}/recommend-reviewers?limit=5`);
  const gaps = useApi(`/developers/${developerId}/skill-gaps`);

  if (profile.loading) return <LoadingState label="Loading developer profile" />;
  if (profile.error) return <ErrorState message={profile.error} onRetry={profile.retry} />;

  const { developer, skills, projects, repositories, team, collaborators, mentor } = profile.data;

  return (
    <>
      <Link to="/developers" className="mb-5 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700">← Developer directory</Link>
      <header className="panel mb-6 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <span className="grid size-20 place-items-center rounded-2xl bg-brand-100 text-2xl font-bold text-brand-700">{initials(developer.name)}</span>
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-[-0.03em]">{developer.name}</h1>
            <p className="mt-1 text-ink-500">{developer.designation}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>{developer.experience} years experience</Badge>
              {team && <Badge tone="gray">{team.name}</Badge>}
            </div>
          </div>
          <a href={`mailto:${developer.email}`} className="focus-ring rounded-lg border border-black/10 px-4 py-2 text-center text-sm font-semibold sm:ml-auto">Contact</a>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <div className="space-y-6">
          <ProfileSection title="Skills"><div className="flex flex-wrap gap-2">{skills.map((skill) => <Badge key={skill.id}>{skill.name}</Badge>)}</div></ProfileSection>
          <ProfileSection title="Projects"><div className="space-y-3">{projects.map((project) => <div key={project.id} className="rounded-xl bg-black/[0.025] p-4"><div className="flex justify-between gap-3"><p className="font-semibold">{project.name}</p><Badge tone={project.status === 'Active' ? 'green' : 'gray'}>{project.status}</Badge></div><p className="mt-1 text-sm leading-6 text-ink-500">{project.description}</p></div>)}</div></ProfileSection>
          <ProfileSection title="Repositories"><div className="space-y-2">{repositories.map((repository) => <a key={repository.id} href={repository.githubUrl} target="_blank" rel="noreferrer" className="block rounded-lg border border-black/7 px-4 py-3 text-sm font-semibold hover:border-brand-500/30 hover:text-brand-700">{repository.name} ↗</a>)}</div></ProfileSection>
          <ProfileSection title="Developer graph"><ProfileGraph developerId={developerId} /></ProfileSection>
        </div>

        <div className="space-y-6">
          <ProfileSection title="Collaborators"><div className="space-y-2">{collaborators.map((person) => <Link key={person.id} to={`/developers/${person.id}`} className="flex items-center justify-between rounded-lg px-2 py-2 text-sm font-medium hover:bg-brand-50 hover:text-brand-700"><span>{person.name}</span><span>→</span></Link>)}</div></ProfileSection>
          <ProfileSection title="Mentor">{mentor ? <Link to={`/developers/${mentor.id}`} className="text-sm font-semibold text-brand-700">{mentor.name} →</Link> : <p className="text-sm text-ink-500">No mentor relationship recorded.</p>}</ProfileSection>
          <ProfileSection title="Recommended reviewers">
            {reviewers.loading && <p className="text-sm text-ink-500">Finding reviewers…</p>}
            {reviewers.error && <p className="text-sm text-red-700">{reviewers.error}</p>}
            {reviewers.data?.map((item) => <div key={item.developer.id} className="mb-3 rounded-xl bg-black/[0.025] p-3 last:mb-0"><div className="flex justify-between gap-3"><Link to={`/developers/${item.developer.id}`} className="text-sm font-semibold hover:text-brand-700">{item.developer.name}</Link><Badge tone="blue">Score {item.score}</Badge></div><p className="mt-1 text-xs text-ink-500">{item.sharedProjects.length} projects · {item.sharedRepositories.length} repositories · {item.sharedTechnologies.length} technologies</p></div>)}
          </ProfileSection>
          <ProfileSection title="Suggested learning">
            {gaps.loading && <p className="text-sm text-ink-500">Analyzing skill gaps…</p>}
            {gaps.error && <p className="text-sm text-red-700">{gaps.error}</p>}
            {gaps.data?.slice(0, 3).map((item) => <div key={item.project.id} className="mb-3 last:mb-0"><p className="text-sm font-semibold">{item.project.name}</p><div className="mt-2 flex flex-wrap gap-1.5">{item.missingSkills.map((skill) => <Badge key={skill.id} tone="amber">{skill.name}</Badge>)}</div></div>)}
          </ProfileSection>
        </div>
      </div>
    </>
  );
}
