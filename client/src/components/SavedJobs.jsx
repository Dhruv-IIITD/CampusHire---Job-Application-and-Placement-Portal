import { BookmarkMinus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeSavedJob } from "../redux/jobSlice";
import { studentDashboardLinks } from "../utils/data";
import DashboardShell from "./DashboardShell";
import EmptyState from "./EmptyState";
import JobCard from "./JobCard";

const SavedJobs = () => {
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.jobs.savedJobs);

  return (
    <DashboardShell
      title="Saved Jobs"
      subtitle="Keep interesting roles here and revisit them before applying."
      links={studentDashboardLinks}
    >
      {savedJobs.length === 0 ? (
        <EmptyState
          title="No saved jobs"
          message="Use the bookmark icon on a job card to keep openings aside for later review."
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {savedJobs.map((job) => (
            <div key={job.id} className="relative">
              <JobCard job={job} actionLabel="View Job" />
              <button
                onClick={() => dispatch(removeSavedJob(job.id))}
                className="absolute right-6 top-6 rounded-full border border-rose-200 bg-white p-2 text-rose-700"
                aria-label="Remove saved job"
              >
                <BookmarkMinus size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
};

export default SavedJobs;
