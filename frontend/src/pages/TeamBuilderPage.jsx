import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../components/Badge.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { EmptyState, ErrorState } from '../components/StatePanel.jsx';
import api, { getApiErrorMessage } from '../services/api.js';

export default function TeamBuilderPage() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState('React, GraphQL');
  const [teamName, setTeamName] = useState('');
  const [results, setResults] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function findDevelopers(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSelectedIds([]);

    try {
      const response = await api.get('/teams/recommend', { params: { skills, limit: 10 } });
      setResults(response.data.data);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }

  function toggleDeveloper(developerId) {
    setSelectedIds((current) =>
      current.includes(developerId)
        ? current.filter((id) => id !== developerId)
        : [...current, developerId],
    );
  }

  async function saveTeam() {
    setError('');
    if (!teamName.trim()) {
      setError('Enter a name for this team.');
      return;
    }
    if (!selectedIds.length) {
      setError('Select at least one developer.');
      return;
    }

    setSaving(true);
    try {
      const requiredSkills = skills.split(',').map((skill) => skill.trim()).filter(Boolean);
      await api.post('/teams/project-teams', {
        name: teamName.trim(),
        requiredSkills,
        developerIds: selectedIds,
      });
      navigate('/teams', { state: { message: `${teamName.trim()} was created successfully.` } });
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageHeader eyebrow="Planning" title="Build a capable team" description="Find developers by required skills, choose the right people, name the team, and save it to the graph." />

      <form onSubmit={findDevelopers} className="panel flex flex-col gap-3 p-5 sm:flex-row">
        <label className="flex-1">
          <span className="mb-2 block text-sm font-semibold">Required skills</span>
          <input value={skills} onChange={(event) => setSkills(event.target.value)} placeholder="React, GraphQL, Node.js" className="focus-ring w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
        </label>
        <button disabled={loading} className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-wait disabled:opacity-60 sm:self-end">
          {loading ? 'Finding matches…' : 'Recommend developers'}
        </button>
      </form>

      {error && <div className="mt-5"><ErrorState message={error} /></div>}

      {results && (
        <section className="mt-7">
          <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-semibold">Choose team members</h2>
              <p className="mt-1 text-sm text-ink-500">Select one or more recommended developers.</p>
            </div>
            <p className="text-sm font-semibold text-brand-700">{selectedIds.length} selected</p>
          </div>

          {results.length === 0 && <EmptyState title="No matching developers" description="Try fewer or different skills." />}
          {results.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {results.map((item) => {
                const selected = selectedIds.includes(item.developer.id);
                return (
                  <label key={item.developer.id} className={`panel cursor-pointer p-5 transition ${selected ? 'border-brand-500 ring-2 ring-brand-500/15' : 'hover:border-brand-500/25'}`}>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" checked={selected} onChange={() => toggleDeveloper(item.developer.id)} className="mt-1 size-4 accent-brand-600" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div><p className="font-semibold">{item.developer.name}</p><p className="mt-1 text-sm text-ink-500">{item.developer.designation}</p></div>
                          <Badge tone="blue">{item.coveragePercent}% match</Badge>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">{item.matchedSkills.map((skill) => <Badge key={skill.id}>{skill.name}</Badge>)}</div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          )}

          {results.length > 0 && (
            <div className="panel mt-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-end">
              <label className="flex-1">
                <span className="mb-2 block text-sm font-semibold">Team name</span>
                <input value={teamName} onChange={(event) => setTeamName(event.target.value)} maxLength={80} placeholder="Example: Atlas Launch Team" className="focus-ring w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
              </label>
              <button type="button" onClick={saveTeam} disabled={saving || !selectedIds.length} className="rounded-xl bg-ink-950 px-6 py-3 text-sm font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-45">
                {saving ? 'Creating team…' : 'Create team'}
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
}
