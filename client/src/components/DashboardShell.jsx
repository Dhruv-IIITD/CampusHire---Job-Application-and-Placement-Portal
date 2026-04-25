import { Link } from "react-router-dom";

const DashboardShell = ({ title, subtitle, links, children }) => {
  return (
    <div className="page-shell section-shell">
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="surface-card h-fit p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Workspace</div>
          <h1 className="mt-3 text-2xl font-bold text-ink-950">{title}</h1>
          <p className="mt-3 text-sm leading-7 text-ink-600">{subtitle}</p>

          <div className="mt-6 space-y-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-ink-700 transition hover:border-brand-100 hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </aside>

        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardShell;
