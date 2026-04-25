import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../components/EmptyState";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JobCard from "../components/JobCard";
import LoadingState from "../components/LoadingState";
import SearchJobs from "../components/SearchJobs";
import { removeSavedJob, saveJob } from "../redux/jobSlice";
import { apiRequest } from "../services";

const initialFilters = {
  title: "",
  location: "",
  company: "",
  skills: "",
  jobType: "",
  compensation: "",
};

const FindJobs = () => {
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.jobs.savedJobs);
  const [filters, setFilters] = useState(initialFilters);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async (appliedFilters = filters) => {
    setLoading(true);
    setError("");

    try {
      const cleanedFilters = Object.fromEntries(
        Object.entries(appliedFilters).filter(([, value]) => value)
      );
      const response = await apiRequest({
        url: "/jobs",
        params: cleanedFilters,
      });
      setJobs(response);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(initialFilters);
  }, []);

  const handleToggleSave = (job) => {
    const exists = savedJobs.some((savedJob) => savedJob.id === job.id);
    if (exists) {
      dispatch(removeSavedJob(job.id));
    } else {
      dispatch(saveJob(job));
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="page-shell section-shell">
        <div className="max-w-3xl">
          <h1 className="page-title">Browse Campus Opportunities</h1>
          <p className="page-subtitle">
            Search openings by title, company, location, skills, job type, and compensation.
          </p>
        </div>

        <div className="mt-8">
          <SearchJobs
            filters={filters}
            onChange={(event) => setFilters((previous) => ({ ...previous, [event.target.name]: event.target.value }))}
            onSearch={() => fetchJobs(filters)}
            onReset={() => {
              setFilters(initialFilters);
              fetchJobs(initialFilters);
            }}
          />
        </div>

        {error ? <div className="mt-6 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div> : null}

        <div className="mt-8">
          {loading ? (
            <LoadingState title="Loading opportunities..." />
          ) : jobs.length === 0 ? (
            <EmptyState
              title="No matching jobs found"
              message="Try clearing one or two filters to discover more openings."
            />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSaved={savedJobs.some((savedJob) => savedJob.id === job.id)}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FindJobs;
