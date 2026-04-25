import { Bookmark, BookmarkCheck, Building2, IndianRupee, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ job, isSaved, onToggleSave, actionLabel = "View Details", actionLink }) => {
  const targetLink = actionLink || `/jobs/${job.id}`;

  return (
    <div className="surface-card flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sand-100">
            <img
              src={`/companies/${job.company}.png`}
              alt={job.company}
              className="h-8 w-8 object-contain"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div>
            <div className="text-lg font-semibold text-ink-950">{job.title}</div>
            <div className="mt-1 flex items-center gap-2 text-sm text-ink-600">
              <Building2 size={15} />
              {job.company}
            </div>
          </div>
        </div>

        {onToggleSave ? (
          <button
            onClick={() => onToggleSave(job)}
            className="rounded-full border border-ink-200 p-2 text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
            aria-label={isSaved ? "Remove saved job" : "Save job"}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="status-chip bg-sand-100 text-ink-700">{job.jobType}</span>
        <span className="status-chip bg-brand-50 text-brand-700">{job.applicantCount} applicants</span>
        <span className="status-chip bg-ink-100 text-ink-700">{new Date(job.deadline).toLocaleDateString()}</span>
      </div>

      <div className="mt-5 space-y-3 text-sm text-ink-600">
        <div className="flex items-center gap-2">
          <MapPin size={15} />
          {job.location}
        </div>
        <div className="flex items-center gap-2">
          <IndianRupee size={15} />
          {job.compensation}
        </div>
      </div>

      <p className="mt-5 flex-1 text-sm leading-7 text-ink-600">{job.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {job.requiredSkills.slice(0, 4).map((skill) => (
          <span key={skill} className="rounded-full bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-700">
            {skill}
          </span>
        ))}
      </div>

      <Link to={targetLink} className="btn-primary mt-6">
        {actionLabel}
      </Link>
    </div>
  );
};

export default JobCard;
