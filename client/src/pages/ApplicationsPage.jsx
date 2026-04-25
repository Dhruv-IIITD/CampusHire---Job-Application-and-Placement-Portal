import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ApplicationStatusTracker from "../components/ApplicationStatusTracker";
import DashboardShell from "../components/DashboardShell";
import EmptyState from "../components/EmptyState";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingState from "../components/LoadingState";
import StatusBadge from "../components/StatusBadge";
import { apiRequest } from "../services";
import { studentDashboardLinks } from "../utils/data";

const ApplicationsPage = () => {
  const user = useSelector((state) => state.userDetail);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await apiRequest({ url: "/applications/mine", token: user.jwtToken });
        setApplications(response);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user.jwtToken]);

  return (
    <div className="min-h-screen">
      <Header />
      <DashboardShell
        title="My Applications"
        subtitle="Review every application, recruiter status update, and recent activity in one place."
        links={studentDashboardLinks}
      >
        {loading ? <LoadingState title="Loading applications..." /> : null}
        {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div> : null}

        {!loading ? (
          applications.length === 0 ? (
            <EmptyState
              title="No applications yet"
              message="Browse jobs and apply to your first opening to start tracking progress here."
              action={
                <Link to="/jobs" className="btn-primary">
                  Browse Jobs
                </Link>
              }
            />
          ) : (
            <div className="space-y-5">
              {applications.map((application) => (
                <div key={application.id} className="space-y-4">
                  <div className="surface-card p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold">{application.jobTitle}</h2>
                        <p className="mt-2 text-sm text-ink-600">
                          {application.company} • Applied on {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <StatusBadge status={application.status} />
                        <Link to={`/jobs/${application.jobId}`} className="btn-secondary">
                          Open Job
                        </Link>
                      </div>
                    </div>
                  </div>
                  <ApplicationStatusTracker status={application.status} />
                </div>
              ))}
            </div>
          )
        ) : null}
      </DashboardShell>
      <Footer />
    </div>
  );
};

export default ApplicationsPage;
