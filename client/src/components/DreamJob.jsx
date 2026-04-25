import { ArrowRight, BriefcaseBusiness, GraduationCap, SearchCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { landingStats } from "../utils/data";

const DreamJob = () => {
  return (
    <section className="section-shell">
      <div className="page-shell grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            Resume-ready final year project
          </div>
          <div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Campus placements, job applications, and recruiter tracking in one clean portal.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-ink-600 sm:text-lg">
              CampusHire helps students build profiles, discover relevant jobs and internships,
              apply in a few clicks, and follow their application journey from applied to selected.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/jobs" className="btn-primary">
              Explore Openings
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link to="/signup" className="btn-secondary">
              Create Account
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {landingStats.map((item) => (
              <div key={item.label} className="muted-card p-4">
                <div className="text-2xl font-bold text-ink-950">{item.value}</div>
                <div className="mt-2 text-sm text-ink-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card relative overflow-hidden p-8 sm:p-10">
          <div className="absolute inset-0 bg-hero-grid" />
          <div className="relative space-y-5">
            <div className="inline-flex rounded-2xl bg-white px-4 py-3 shadow-soft">
              <GraduationCap className="text-brand-600" />
              <div className="ml-3">
                <div className="text-sm font-semibold text-ink-900">Student Dashboard</div>
                <div className="text-xs text-ink-600">Track jobs, status, and profile completion</div>
              </div>
            </div>
            <div className="ml-auto inline-flex animate-float rounded-2xl bg-ink-950 px-4 py-3 text-white shadow-soft">
              <BriefcaseBusiness className="text-brand-300" />
              <div className="ml-3">
                <div className="text-sm font-semibold">Recruiter Workspace</div>
                <div className="text-xs text-slate-300">Post jobs and shortlist applicants</div>
              </div>
            </div>
            <div className="inline-flex rounded-2xl bg-white px-4 py-3 shadow-soft">
              <SearchCheck className="text-brand-600" />
              <div className="ml-3">
                <div className="text-sm font-semibold text-ink-900">Smart Filtering</div>
                <div className="text-xs text-ink-600">Role, company, skills, location and compensation</div>
              </div>
            </div>

            <div className="surface-card relative mt-6 overflow-hidden border-brand-100 p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                Application Journey
              </div>
              <div className="mt-4 grid gap-3">
                {["Applied", "Under Review", "Shortlisted", "Interview", "Selected"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="rounded-2xl bg-sand-50 px-4 py-2 text-sm font-semibold text-ink-800">
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamJob;
