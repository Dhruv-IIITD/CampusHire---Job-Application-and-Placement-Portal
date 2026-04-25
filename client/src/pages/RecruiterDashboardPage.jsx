import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardShell from "../components/DashboardShell";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingState from "../components/LoadingState";
import StatCard from "../components/StatCard";
import { apiRequest } from "../services";
import { recruiterDashboardLinks } from "../utils/data";

const RecruiterDashboardPage = () => {
  const user = useSelector((state) => state.userDetail);
  const [dashboard, setDashboard] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [dashboardResponse, jobsResponse] = await Promise.all([
          apiRequest({ url: "/dashboard/recruiter", token: user.jwtToken }),
          apiRequest({ url: "/jobs/mine", token: user.jwtToken }),
        ]);

        setDashboard(dashboardResponse);
        setJobs(jobsResponse);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user.jwtToken]);

  return (
    <div className="min-h-screen">
      <Header />
      <DashboardShell
        title="Recruiter Dashboard"
        subtitle="Monitor job postings, applicant volume, and the latest candidate updates from a single workspace."
        links={recruiterDashboardLinks}
      >
        {loading ? <LoadingState title="Loading recruiter dashboard..." /> : null}
        {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div> : null}

        {dashboard && !loading ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Total Jobs" value={dashboard.totalJobs} />
              <StatCard label="Applications" value={dashboard.totalApplications} accent="bg-sky-50 text-sky-700" />
              <StatCard label="Shortlisted" value={dashboard.shortlisted} accent="bg-indigo-50 text-indigo-700" />
              <StatCard label="Selected" value={dashboard.selected} accent="bg-emerald-50 text-emerald-700" />
            </div>

            <div className="surface-card p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Recent Job Postings</h2>
                  <p className="mt-2 text-sm text-ink-600">Review active openings and jump to applicant screening.</p>
                </div>
                <Link to="/post-jobs" className="btn-primary">
                  Post a Job
                </Link>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-sand-50">
                    <tr className="text-left text-xs uppercase tracking-[0.2em] text-ink-500">
                      <th className="px-4 py-4">Role</th>
                      <th className="px-4 py-4">Type</th>
                      <th className="px-4 py-4">Deadline</th>
                      <th className="px-4 py-4">Applicants</th>
                      <th className="px-4 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.slice(0, 5).map((job) => (
                      <tr key={job.id} className="border-t border-ink-100">
                        <td className="px-4 py-4">
                          <div className="font-semibold text-ink-900">{job.title}</div>
                          <div className="mt-1 text-sm text-ink-600">{job.company}</div>
                        </td>
                        <td className="px-4 py-4 text-sm text-ink-600">{job.jobType}</td>
                        <td className="px-4 py-4 text-sm text-ink-600">{job.deadline}</td>
                        <td className="px-4 py-4 text-sm font-semibold text-ink-900">{job.applicantCount}</td>
                        <td className="px-4 py-4">
                          <Link to={`/applicants/${job.id}`} className="btn-secondary">
                            View Applicants
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {jobs.length === 0 ? (
                      <tr>
                        <td className="px-4 py-8 text-sm text-ink-600" colSpan="5">
                          No jobs posted yet.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : null}
      </DashboardShell>
      <Footer />
    </div>
  );
};

export default RecruiterDashboardPage;
