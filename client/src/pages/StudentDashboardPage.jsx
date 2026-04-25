import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardShell from "../components/DashboardShell";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingState from "../components/LoadingState";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { apiRequest } from "../services";
import { studentDashboardLinks } from "../utils/data";

const StudentDashboardPage = () => {
  const user = useSelector((state) => state.userDetail);
  const [dashboard, setDashboard] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [dashboardResponse, applicationsResponse] = await Promise.all([
          apiRequest({ url: "/dashboard/student", token: user.jwtToken }),
          apiRequest({ url: "/applications/mine", token: user.jwtToken }),
        ]);

        setDashboard(dashboardResponse);
        setApplications(applicationsResponse);
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
        title="Student Dashboard"
        subtitle="Track profile readiness, explore open jobs, and stay updated on your current applications."
        links={studentDashboardLinks}
      >
        {loading ? <LoadingState title="Loading student dashboard..." /> : null}
        {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div> : null}

        {dashboard && !loading ? (
          <>
            {!dashboard.profileComplete ? (
              <div className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800">
                Complete your profile before applying.{" "}
                <Link to="/user-profile" className="font-semibold underline">
                  Open profile form
                </Link>
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Available Jobs" value={dashboard.totalJobs} />
              <StatCard label="My Applications" value={dashboard.totalApplications} accent="bg-sky-50 text-sky-700" />
              <StatCard label="Under Review" value={dashboard.underReview} accent="bg-amber-50 text-amber-700" />
              <StatCard label="Selected" value={dashboard.selected} accent="bg-emerald-50 text-emerald-700" />
            </div>

            <div className="surface-card p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Recent Applications</h2>
                  <p className="mt-2 text-sm text-ink-600">Latest updates across your job and internship applications.</p>
                </div>
                <Link to="/applications" className="btn-secondary">
                  View All
                </Link>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-sand-50">
                    <tr className="text-left text-xs uppercase tracking-[0.2em] text-ink-500">
                      <th className="px-4 py-4">Role</th>
                      <th className="px-4 py-4">Company</th>
                      <th className="px-4 py-4">Applied On</th>
                      <th className="px-4 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.slice(0, 5).map((application) => (
                      <tr key={application.id} className="border-t border-ink-100">
                        <td className="px-4 py-4 font-semibold text-ink-900">{application.jobTitle}</td>
                        <td className="px-4 py-4 text-sm text-ink-600">{application.company}</td>
                        <td className="px-4 py-4 text-sm text-ink-600">
                          {new Date(application.appliedAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={application.status} />
                        </td>
                      </tr>
                    ))}
                    {applications.length === 0 ? (
                      <tr>
                        <td className="px-4 py-8 text-sm text-ink-600" colSpan="4">
                          You have not applied to any jobs yet.
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

export default StudentDashboardPage;
