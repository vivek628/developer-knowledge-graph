export default function Badge({ children, tone = 'green' }) {
  const tones = {
    green: 'bg-brand-50 text-brand-700',
    gray: 'bg-black/5 text-ink-700',
    amber: 'bg-amber-50 text-amber-800',
    blue: 'bg-blue-50 text-blue-700',
  };

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}
