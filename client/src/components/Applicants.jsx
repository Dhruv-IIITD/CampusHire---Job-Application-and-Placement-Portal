import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { apiRequest } from "../services";
import { applicationStatusOptions, recruiterDashboardLinks } from "../utils/data";
import DashboardShell from "./DashboardShell";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import StatusBadge from "./StatusBadge";

const Applicants = () => {
  const { jobId } = useParams();
  const user = useSelector((state) => state.userDetail);
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const [jobResponse, applicationsResponse] = await Promise.all([
          apiRequest({ url: `/jobs/${jobId}` }),
          apiRequest({ url: `/applications/job/${jobId}`, token: user.jwtToken }),
        ]);
        setJob(jobResponse);
        setApplications(applicationsResponse);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId, user.jwtToken]);

  const handleStatusChange = async (applicationId, status) => {
    try {
      const updated = await apiRequest({
        url: `/applications/${applicationId}/status`,
        method: "PUT",
        data: { status },
        token: user.jwtToken,
      });

      setApplications((previous) =>
        previous.map((application) => (application.id === applicationId ? updated : application))
      );
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <DashboardShell
      title="Applicants"
      subtitle="Review each applicant's profile details and update their application stage."
      links={recruiterDashboardLinks}
    >
      {loading ? <LoadingState title="Loading applicants..." /> : null}
      {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div> : null}

      {!loading && job ? (
        <div className="surface-card p-6">
          <h2 className="text-2xl font-semibold">{job.title}</h2>
          <p className="mt-2 text-sm text-ink-600">
            {job.company} • {job.location} • Deadline {job.deadline}
          </p>
        </div>
      ) : null}

      {!loading ? (
        applications.length === 0 ? (
          <EmptyState
            title="No applications yet"
            message="Students have not applied to this opening yet. Once they do, you can shortlist or update status here."
          />
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div key={application.id} className="surface-card p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="text-xl font-semibold text-ink-950">{application.studentName}</div>
                    <div className="mt-2 text-sm text-ink-600">
                      {application.studentEmail} • {application.branch} • Graduation {application.graduationYear}
                    </div>
                    <div className="mt-2 text-sm text-ink-600">CGPA: {application.cgpa}</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {application.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-sand-100 px-3 py-1 text-xs font-semibold text-ink-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a href={application.resumeLink} target="_blank" rel="noreferrer" className="btn-secondary">
                        <ExternalLink size={16} className="mr-2" />
                        Resume
                      </a>
                      {application.linkedInUrl ? (
                        <a href={application.linkedInUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                          <ExternalLink size={16} className="mr-2" />
                          LinkedIn
                        </a>
                      ) : null}
                      {application.githubUrl ? (
                        <a href={application.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                          <ExternalLink size={16} className="mr-2" />
                          GitHub
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <StatusBadge status={application.status} />
                    <select
                      className="field-input min-w-52"
                      value={application.status}
                      onChange={(event) => handleStatusChange(application.id, event.target.value)}
                    >
                      {applicationStatusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.replaceAll("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : null}
    </DashboardShell>
  );
};

export default Applicants;
