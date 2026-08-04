import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return <div className="panel p-10 text-center"><p className="text-sm font-semibold text-brand-600">404</p><h1 className="mt-2 text-2xl font-semibold">Page not found</h1><p className="mt-2 text-sm text-ink-500">The page you requested does not exist.</p><Link to="/" className="mt-5 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Return to dashboard</Link></div>;
}
