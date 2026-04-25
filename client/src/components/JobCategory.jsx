import { Briefcase, ChartNoAxesColumn, ShieldCheck } from "lucide-react";
import { portalHighlights } from "../utils/data";

const icons = [Briefcase, ChartNoAxesColumn, ShieldCheck];

const JobCategory = () => {
  return (
    <section className="section-shell pt-0">
      <div className="page-shell">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">Core Features</div>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Built to demonstrate the complete placement process</h2>
          <p className="page-subtitle">
            The project focuses on believable campus placement workflows instead of enterprise-heavy complexity.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {portalHighlights.map((item, index) => {
            const Icon = icons[index];
            return (
              <div key={item.title} className="surface-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JobCategory;
