const About = () => {
  return (
    <div className="page-shell section-shell">
      <div className="surface-card p-8 sm:p-10">
        <div className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">Project Story</div>
        <h1 className="mt-3 text-4xl font-bold">CampusHire - Job Application and Placement Portal</h1>
        <p className="page-subtitle">
          CampusHire is a polished student project that demonstrates how a campus placement portal can support both
          students and recruiters through one clear application workflow.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="muted-card p-6">
            <h2 className="text-2xl font-semibold">Problem Statement</h2>
            <p className="mt-3 text-sm leading-7 text-ink-600">
              Students often manage job applications across multiple emails, forms, and spreadsheets, while recruiters
              need a simple way to publish openings and review campus applicants. This project brings both sides into a
              structured placement portal with profile management, job discovery, applications, and status tracking.
            </p>
          </div>

          <div className="muted-card p-6">
            <h2 className="text-2xl font-semibold">What Makes It Strong</h2>
            <ul className="mt-3 space-y-3 text-sm leading-7 text-ink-600">
              <li>Role-based student and recruiter flows</li>
              <li>Clean REST API structure with validation and timestamps</li>
              <li>Application status pipeline from applied to selected</li>
              <li>Responsive UI suitable for demos, viva, and recruiter walkthroughs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
