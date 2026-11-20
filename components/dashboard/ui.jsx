import { FiInbox } from "react-icons/fi";

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-1 text-sm muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ title, children, className = "", action }) {
  return (
    <section className={`card-surface p-5 sm:p-6 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h3 className="text-lg font-bold">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatCard({ label, value, icon: Icon, tone = "primary" }) {
  const tones = { primary: "bg-primary/10 text-primary", accent: "bg-accent/20 text-warning", info: "bg-info/10 text-info", success: "bg-success/10 text-success" };
  return (
    <div className="card-surface flex items-center gap-4 p-5">
      <span className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${tones[tone]}`}><Icon size={26} /></span>
      <div className="min-w-0">
        <p className="text-sm font-semibold muted">{label}</p>
        <p className="truncate text-2xl font-extrabold leading-tight">{value}</p>
      </div>
    </div>
  );
}

export function EmptyState({ title = "Nothing here yet", text, action }) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-base-200 text-primary"><FiInbox size={28} /></span>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      {text && <p className="mt-1.5 max-w-sm text-sm muted">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3 p-5">
      {Array.from({ length: rows }).map((_, i) => <div key={i} className="skeleton-line h-12 w-full" />)}
    </div>
  );
}

// Wraps a table with loading, error and empty states.
export function TableCard({ loading, error, empty, emptyProps, children }) {
  return (
    <div className="card-surface overflow-hidden">
      {loading ? <TableSkeleton /> : error ? (
        <div className="p-6"><div className="alert alert-error">{error}</div></div>
      ) : empty ? <EmptyState {...emptyProps} /> : <div className="overflow-x-auto">{children}</div>}
    </div>
  );
}

export function EquipmentThumb({ src, name, sub }) {
  return (
    <div className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="size-12 shrink-0 rounded-lg object-cover bg-base-200" />
      <div className="min-w-0">
        <p className="max-w-[220px] truncate font-bold">{name}</p>
        {sub && <p className="text-xs muted">{sub}</p>}
      </div>
    </div>
  );
}
