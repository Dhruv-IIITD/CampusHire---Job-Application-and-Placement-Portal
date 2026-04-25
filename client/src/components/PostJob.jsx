import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiRequest } from "../services";
import { jobTypeOptions, recruiterDashboardLinks } from "../utils/data";
import DashboardShell from "./DashboardShell";
import LoadingState from "./LoadingState";

const emptyJob = {
  title: "",
  company: "",
  location: "",
  jobType: "",
  compensation: "",
  requiredSkills: "",
  description: "",
  deadline: "",
};

const PostJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const user = useSelector((state) => state.userDetail);
  const [formData, setFormData] = useState(emptyJob);
  const [loading, setLoading] = useState(Boolean(jobId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        const job = await apiRequest({ url: `/jobs/${jobId}` });
        setFormData({
          ...job,
          requiredSkills: job.requiredSkills.join(", "),
          deadline: job.deadline,
        });
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...formData,
        requiredSkills: formData.requiredSkills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      await apiRequest({
        url: jobId ? `/jobs/${jobId}` : "/jobs",
        method: jobId ? "PUT" : "POST",
        data: payload,
        token: user.jwtToken,
      });

      navigate("/posted-jobs");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardShell title="Recruiter Workspace" subtitle="Create and manage company openings." links={recruiterDashboardLinks}>
        <LoadingState title="Loading job details..." />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title={jobId ? "Edit Job" : "Post New Job"}
      subtitle="Create realistic campus job and internship postings with clear skill and deadline details."
      links={recruiterDashboardLinks}
    >
      {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div> : null}

      <form onSubmit={handleSubmit} className="surface-card p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{jobId ? "Update opening" : "New campus opening"}</h2>
            <p className="mt-2 text-sm text-ink-600">
              Keep the role description short, clear, and realistic for campus hiring.
            </p>
          </div>
          <button className="btn-primary" disabled={saving}>
            {saving ? "Saving..." : jobId ? "Update Job" : "Publish Job"}
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div>
            <label className="field-label">Job Title</label>
            <input className="field-input" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div>
            <label className="field-label">Company</label>
            <input className="field-input" name="company" value={formData.company} onChange={handleChange} />
          </div>
          <div>
            <label className="field-label">Location</label>
            <input className="field-input" name="location" value={formData.location} onChange={handleChange} />
          </div>
          <div>
            <label className="field-label">Job Type</label>
            <select className="field-input" name="jobType" value={formData.jobType} onChange={handleChange}>
              <option value="">Select job type</option>
              {jobTypeOptions.map((jobType) => (
                <option key={jobType} value={jobType}>
                  {jobType}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Compensation</label>
            <input
              className="field-input"
              name="compensation"
              value={formData.compensation}
              onChange={handleChange}
              placeholder="8 LPA / 30,000 per month"
            />
          </div>
          <div>
            <label className="field-label">Deadline</label>
            <input className="field-input" type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
          </div>
        </div>

        <div className="mt-5">
          <label className="field-label">Required Skills</label>
          <input
            className="field-input"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            placeholder="React, Spring Boot, PostgreSQL"
          />
        </div>

        <div className="mt-5">
          <label className="field-label">Description</label>
          <textarea
            className="field-input min-h-40"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief role description, eligibility, and expectations."
          />
        </div>
      </form>
    </DashboardShell>
  );
};

export default PostJob;
