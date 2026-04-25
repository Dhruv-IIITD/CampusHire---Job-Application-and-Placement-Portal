import { Bookmark, BookmarkCheck, Building2, CalendarDays, IndianRupee, MapPin, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { removeSavedJob, saveJob } from "../redux/jobSlice";
import { apiRequest } from "../services";
import ApplicationStatusTracker from "./ApplicationStatusTracker";
import EmptyState from "./EmptyState";
import Footer from "./Footer";
import Header from "./Header";
import LoadingState from "./LoadingState";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetail);
  const savedJobs = useSelector((state) => state.jobs.savedJobs);
  const [job, setJob] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isSaved = useMemo(
    () => savedJobs.some((savedJob) => String(savedJob.id) === String(jobId)),
    [savedJobs, jobId]
  );

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const jobResponse = await apiRequest({ url: `/jobs/${jobId}` });
        setJob(jobResponse);

        if (user.jwtToken && user.accountType === "STUDENT") {
          const myApplications = await apiRequest({ url: "/applications/mine", token: user.jwtToken });
          const currentApplication = myApplications.find(
            (item) => String(item.jobId) === String(jobId)
          );
          setApplication(currentApplication || null);
        }
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [jobId, user.accountType, user.jwtToken]);

  const handleToggleSave = () => {
    if (!job) return;
    if (isSaved) {
      dispatch(removeSavedJob(job.id));
      setSuccess("Job removed from saved list.");
    } else {
      dispatch(saveJob(job));
      setSuccess("Job saved successfully.");
    }
  };

  const handleApply = async () => {
    if (!user.jwtToken) {
      navigate("/login");
      return;
    }

    setActionLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await apiRequest({
        url: `/applications/jobs/${jobId}`,
        method: "POST",
        token: user.jwtToken,
      });
      setApplication(response);
      setSuccess("Application submitted successfully.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="page-shell section-shell">
          <LoadingState title="Loading job details..." />
        </div>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Header />
        <div className="page-shell section-shell">
          <EmptyState title="Job not found" message="This job could not be loaded. It may have been removed." />
        </div>
        <Footer />
      </>
    );
  }

  const canManageJob =
    user.jwtToken &&
    (user.accountType === "ADMIN" ||
      (user.accountType === "RECRUITER" && String(user.id) === String(job.postedById)));

  return (
    <>
      <Header />
      <div className="page-shell section-shell space-y-6">
        {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div> : null}
        {success ? (
          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{success}</div>
        ) : null}

        <div className="surface-card p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                {job.jobType}
              </div>
              <h1 className="mt-4 text-4xl font-bold">{job.title}</h1>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-ink-600">
                <div className="flex items-center gap-2">
                  <Building2 size={16} />
                  {job.company}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee size={16} />
                  {job.compensation}
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  Deadline {job.deadline}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  {job.applicantCount} applicants
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <button onClick={handleToggleSave} className="btn-secondary">
                {isSaved ? <BookmarkCheck size={16} className="mr-2" /> : <Bookmark size={16} className="mr-2" />}
                {isSaved ? "Saved" : "Save Job"}
              </button>

              {user.accountType === "STUDENT" ? (
                <button onClick={handleApply} className="btn-primary" disabled={actionLoading || Boolean(application)}>
                  {application ? "Already Applied" : actionLoading ? "Applying..." : "Apply Now"}
                </button>
              ) : null}

              {!user.jwtToken ? (
                <button onClick={() => navigate("/login")} className="btn-primary">
                  Login to Apply
                </button>
              ) : null}

              {canManageJob ? (
                <Link to={`/applicants/${job.id}`} className="btn-primary">
                  View Applicants
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="surface-card p-6">
              <h2 className="text-2xl font-semibold">Role Description</h2>
              <p className="mt-4 text-sm leading-8 text-ink-600">{job.description}</p>
            </div>

            <div className="surface-card p-6">
              <h2 className="text-2xl font-semibold">Required Skills</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {job.requiredSkills.map((skill) => (
                  <span key={skill} className="rounded-full bg-sand-100 px-4 py-2 text-sm font-semibold text-ink-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {application ? <ApplicationStatusTracker status={application.status} /> : null}

            <div className="surface-card p-6">
              <h3 className="text-xl font-semibold">Recruiter Snapshot</h3>
              <p className="mt-4 text-sm leading-7 text-ink-600">
                Posted by <span className="font-semibold text-ink-900">{job.postedByName}</span>. This opening follows a
                simple campus hiring workflow where recruiters can review applications, shortlist candidates, and update
                their status.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobDetails;
