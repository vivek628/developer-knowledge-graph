import { Link } from 'react-router-dom';
import Badge from './Badge.jsx';

export function initials(name) {
  return name.split(' ').map((part) => part[0]).slice(0, 2).join('');
}

export default function DeveloperCard({ developer }) {
  return (
    <Link to={`/developers/${developer.id}`} className="panel group block p-5 transition hover:-translate-y-0.5 hover:border-brand-500/25 hover:shadow-md">
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-sm font-bold text-brand-700">
          {initials(developer.name)}
        </span>
        <div className="min-w-0">
          <h2 className="truncate font-semibold text-ink-950 group-hover:text-brand-700">{developer.name}</h2>
          <p className="mt-0.5 truncate text-sm text-ink-500">{developer.designation}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>{developer.experience} years</Badge>
            {developer.team && <Badge tone="gray">{developer.team}</Badge>}
          </div>
        </div>
      </div>
    </Link>
  );
}
