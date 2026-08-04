export function LoadingState({ label = 'Loading data' }) {
  return (
    <div className="panel grid min-h-52 place-items-center p-8" role="status">
      <div className="text-center">
        <span className="mx-auto block size-7 animate-spin rounded-full border-2 border-brand-100 border-t-brand-600" />
        <p className="mt-3 text-sm text-ink-500">{label}…</p>
      </div>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="panel border-red-200 bg-red-50 p-7 text-center" role="alert">
      <p className="font-semibold text-red-900">Unable to load this page</p>
      <p className="mt-2 text-sm text-red-700">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800">
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title = 'Nothing found', description }) {
  return (
    <div className="panel p-10 text-center">
      <p className="font-semibold text-ink-950">{title}</p>
      {description && <p className="mt-2 text-sm text-ink-500">{description}</p>}
    </div>
  );
}
