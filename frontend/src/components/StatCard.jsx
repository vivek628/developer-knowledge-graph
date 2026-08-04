export default function StatCard({ label, value, hint }) {
  return (
    <article className="panel p-5">
      <p className="text-sm font-medium text-ink-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink-950">{value ?? '—'}</p>
      {hint && <p className="mt-2 text-xs text-ink-500">{hint}</p>}
    </article>
  );
}
