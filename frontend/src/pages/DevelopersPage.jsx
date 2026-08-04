import { useMemo, useState } from 'react';
import DeveloperCard from '../components/DeveloperCard.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { EmptyState, ErrorState, LoadingState } from '../components/StatePanel.jsx';
import { useApi } from '../hooks/useApi.js';

export default function DevelopersPage() {
  const { data, error, loading, retry } = useApi('/developers');
  const [search, setSearch] = useState('');

  const filteredDevelopers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query || !data) return data || [];
    return data.filter((developer) =>
      [developer.name, developer.designation, developer.team].some((value) => value?.toLowerCase().includes(query)),
    );
  }, [data, search]);

  return (
    <>
      <PageHeader
        eyebrow="People"
        title="Developer directory"
        description="Search engineers by name, role, or team, then open a profile to explore their connected work."
        action={<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search developers…" aria-label="Search developers" className="focus-ring w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm sm:w-64" />}
      />
      {loading && <LoadingState label="Loading developers" />}
      {error && <ErrorState message={error} onRetry={retry} />}
      {!loading && !error && filteredDevelopers.length === 0 && <EmptyState description="Try a different name, role, or team." />}
      {!loading && !error && filteredDevelopers.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredDevelopers.map((developer) => <DeveloperCard key={developer.id} developer={developer} />)}
        </div>
      )}
    </>
  );
}
