export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">{eyebrow}</p>}
        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-ink-950 sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-500">{description}</p>}
      </div>
      {action}
    </header>
  );
}
