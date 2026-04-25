import { BriefcaseBusiness, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-ink-100 bg-white/90">
      <div className="page-shell grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-950 text-white">
              <BriefcaseBusiness size={20} />
            </div>
            <div>
              <div className="font-display text-xl font-bold">CampusHire</div>
              <div className="text-sm text-ink-600">Job Application and Placement Portal</div>
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-ink-600">
            A final-year student project focused on campus placements, application tracking,
            recruiter workflows, and a clean recruiter-ready demo experience.
          </p>
          <div className="flex items-center gap-3 text-ink-600">
            <div className="rounded-full border border-ink-200 p-2">
              <Mail size={16} />
            </div>
            <div className="rounded-full border border-ink-200 p-2">
              <Linkedin size={16} />
            </div>
            <div className="rounded-full border border-ink-200 p-2">
              <Github size={16} />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink-500">
            Quick Links
          </div>
          <div className="space-y-3 text-sm text-ink-700">
            <Link to="/jobs" className="block hover:text-brand-700">
              Browse Openings
            </Link>
            <Link to="/student/dashboard" className="block hover:text-brand-700">
              Student Dashboard
            </Link>
            <Link to="/recruiter/dashboard" className="block hover:text-brand-700">
              Recruiter Dashboard
            </Link>
            <Link to="/about" className="block hover:text-brand-700">
              Project Overview
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink-500">
            Highlights
          </div>
          <div className="space-y-3 text-sm text-ink-700">
            <p>Role-based flows for students and recruiters</p>
            <p>Application status tracker with recruiter updates</p>
            <p>Modern responsive interface built with React and Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
