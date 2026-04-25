import { placementSteps } from "../utils/data";

const Working = () => {
  return (
    <section className="section-shell">
      <div className="page-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-card bg-ink-950 p-8 text-white">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-300">Portal Flow</div>
          <h2 className="mt-3 text-3xl font-bold text-white">A clean student-to-recruiter journey</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Students move from profile completion to job discovery and tracked applications, while recruiters manage
            openings and candidate updates from a single dashboard.
          </p>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">Outcome</div>
            <div className="mt-3 text-2xl font-bold">Simple enough to explain, complete enough to impress.</div>
          </div>
        </div>

        <div className="space-y-4">
          {placementSteps.map((step, index) => (
            <div key={step.title} className="surface-card flex gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-lg font-bold text-white">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Working;
