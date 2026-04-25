import { FilePenLine, Trash2, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiRequest } from "../services";
import { recruiterDashboardLinks } from "../utils/data";
import ConfirmBox from "./ConfirmBox";
import DashboardShell from "./DashboardShell";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";

const PostedJobs = () => {
  const user = useSelector((state) => state.userDetail);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);

  const stats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return {
      totalJobs: jobs.length,
      activeJobs: jobs.filter((job) => job.deadline >= today).length,
      totalApplicants: jobs.reduce((sum, job) => sum + job.applicantCount, 0),
    };
  }, [jobs]);

  const fetchJobs = async () => {
    try {
      const response = await apiRequest({ url: "/jobs/mine", token: user.jwtToken });
      setJobs(response);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async () => {
    try {
      await apiRequest({
        url: `/jobs/${selectedJobId}`,
        method: "DELETE",
        token: user.jwtToken,
      });
      setJobs((previous) => previous.filter((job) => job.id !== selectedJobId));
      setSelectedJobId(null);
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <DashboardShell
      title="Manage Jobs"
      subtitle="Review active postings, edit opening details, and check the number of applicants for each role."
      links={recruiterDashboardLinks}
    >
      {loading ? <LoadingState title="Loading recruiter jobs..." /> : null}
      {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div> : null}

      {!loading ? (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="surface-card p-5">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-500">Total Jobs</div>
              <div className="mt-3 text-3xl font-bold">{stats.totalJobs}</div>
            </div>
            <div className="surface-card p-5">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-500">Active Jobs</div>
              <div className="mt-3 text-3xl font-bold">{stats.activeJobs}</div>
            </div>
            <div className="surface-card p-5">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-500">Total Applicants</div>
              <div className="mt-3 text-3xl font-bold">{stats.totalApplicants}</div>
            </div>
          </div>

          {jobs.length === 0 ? (
            <EmptyState
              title="No job postings yet"
              message="Publish your first job or internship opening to start receiving applications."
              action={
                <Link to="/post-jobs" className="btn-primary">
                  Post a New Job
                </Link>
              }
            />
          ) : (
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-sand-50">
                    <tr className="text-left text-xs uppercase tracking-[0.2em] text-ink-500">
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Deadline</th>
                      <th className="px-6 py-4">Applicants</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => {
                      const active = job.deadline >= new Date().toISOString().split("T")[0];
                      return (
                        <tr key={job.id} className="border-t border-ink-100 align-top">
                          <td className="px-6 py-5">
                            <div className="font-semibold text-ink-950">{job.title}</div>
                            <div className="mt-1 text-sm text-ink-600">
                              {job.company} • {job.location}
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm text-ink-700">{job.jobType}</td>
                          <td className="px-6 py-5 text-sm text-ink-700">{job.deadline}</td>
                          <td className="px-6 py-5 text-sm font-semibold text-ink-900">{job.applicantCount}</td>
                          <td className="px-6 py-5">
                            <span
                              className={`status-chip ${
                                active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {active ? "Open" : "Closed"}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex flex-wrap gap-2">
                              <Link to={`/post-jobs/${job.id}`} className="btn-secondary">
                                <FilePenLine size={16} className="mr-2" />
                                Edit
                              </Link>
                              <Link to={`/applicants/${job.id}`} className="btn-secondary">
                                <Users size={16} className="mr-2" />
                                Applicants
                              </Link>
                              <button onClick={() => setSelectedJobId(job.id)} className="btn-secondary text-rose-700">
                                <Trash2 size={16} className="mr-2" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : null}

      <ConfirmBox
        isOpen={Boolean(selectedJobId)}
        onClose={() => setSelectedJobId(null)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this job posting?"
        confirmText="Delete Job"
      />
    </DashboardShell>
  );
};

export default PostedJobs;
