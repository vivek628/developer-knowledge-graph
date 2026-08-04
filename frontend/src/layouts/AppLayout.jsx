import { NavLink, Outlet } from 'react-router-dom';

const navigation = [
  ['Overview', '/'],
  ['Developers', '/developers'],
  ['Projects', '/projects'],
  ['Skills', '/skills'],
  ['Technologies', '/technologies'],
  ['Team Builder', '/team-builder'],
  ['My Teams', '/teams'],
  ['Network', '/network'],
];

export default function AppLayout() {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[248px_1fr]">
      <aside className="border-b border-black/6 bg-ink-950 px-4 py-4 text-white lg:fixed lg:inset-y-0 lg:w-[248px] lg:border-b-0">
        <NavLink to="/" className="flex items-center gap-3 px-2" aria-label="DevGraph home">
          <span className="grid size-10 place-items-center rounded-xl bg-brand-500 font-bold">DG</span>
          <span>
            <span className="block text-base font-semibold">DevGraph</span>
            <span className="block text-xs text-white/55">Engineering intelligence</span>
          </span>
        </NavLink>

        <nav className="mt-4 flex gap-1 overflow-x-auto pb-1 lg:mt-9 lg:block lg:space-y-1" aria-label="Main navigation">
          {navigation.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) => [
                'block shrink-0 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-white/12 text-white' : 'text-white/65 hover:bg-white/7 hover:text-white',
              ].join(' ')}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-5 left-5 right-5 hidden rounded-xl border border-white/10 bg-white/5 p-3 lg:block">
          <p className="text-xs font-medium text-white/80">Graph-powered discovery</p>
          <p className="mt-1 text-xs leading-5 text-white/45">Connected through CognoDB</p>
        </div>
      </aside>

      <main className="min-w-0 lg:col-start-2">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-7 lg:px-10 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
