import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../services";
import { updateProfile } from "../redux/userSlice";
import { branchOptions, studentDashboardLinks } from "../utils/data";
import DashboardShell from "./DashboardShell";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";

const currentYear = new Date().getFullYear();
const graduationYears = Array.from({ length: 7 }, (_, index) => currentYear + index);

const defaultProfile = (user) => ({
  name: user.name || "",
  email: user.email || "",
  branch: "",
  graduationYear: currentYear,
  cgpa: "",
  skills: "",
  resumeLink: "",
  linkedInUrl: "",
  githubUrl: "",
  headline: "",
  about: "",
});

const UserProfile = () => {
  const user = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(defaultProfile(user));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profileExists, setProfileExists] = useState(false);

  const completion = useMemo(() => {
    const fields = [
      formData.name,
      formData.email,
      formData.branch,
      formData.graduationYear,
      formData.cgpa,
      formData.skills,
      formData.resumeLink,
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  }, [formData]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await apiRequest({ url: "/students/profile", token: user.jwtToken });
        setFormData({
          ...profile,
          skills: profile.skills.join(", "),
        });
        setProfileExists(true);
      } catch (requestError) {
        if (requestError.status !== 404) {
          setError(requestError.message);
        }
        setFormData(defaultProfile(user));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, user.jwtToken]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...formData,
        cgpa: Number(formData.cgpa),
        graduationYear: Number(formData.graduationYear),
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const savedProfile = await apiRequest({
        url: "/students/profile",
        method: "PUT",
        data: payload,
        token: user.jwtToken,
      });

      setFormData({
        ...savedProfile,
        skills: savedProfile.skills.join(", "),
      });
      setProfileExists(true);
      setSuccess("Profile saved successfully.");
      dispatch(updateProfile({ name: savedProfile.name, email: savedProfile.email }));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardShell
        title="Student Profile"
        subtitle="Complete your placement profile before applying to jobs."
        links={studentDashboardLinks}
      >
        <LoadingState title="Loading profile..." />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title="Student Profile"
      subtitle="Maintain one clean profile that recruiters can review across all your applications."
      links={studentDashboardLinks}
    >
      {error ? (
        <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div>
      ) : null}
      {success ? (
        <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{success}</div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={handleSubmit} className="surface-card p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Profile Details</h2>
              <p className="mt-2 text-sm text-ink-600">
                Add academic details, skills, and resume links for placement applications.
              </p>
            </div>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : profileExists ? "Update Profile" : "Save Profile"}
            </button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div>
              <label className="field-label">Full Name</label>
              <input className="field-input" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label className="field-label">Email</label>
              <input className="field-input bg-ink-50" name="email" value={formData.email} readOnly />
            </div>
            <div>
              <label className="field-label">Branch</label>
              <select className="field-input" name="branch" value={formData.branch} onChange={handleChange}>
                <option value="">Select branch</option>
                {branchOptions.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Graduation Year</label>
              <select
                className="field-input"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
              >
                {graduationYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">CGPA</label>
              <input
                className="field-input"
                name="cgpa"
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="field-label">Headline</label>
              <input
                className="field-input"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="Aspiring Full Stack Developer"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="field-label">Skills</label>
            <input
              className="field-input"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Java, Spring Boot, React, SQL"
            />
          </div>

          <div className="mt-5">
            <label className="field-label">Resume Link</label>
            <input
              className="field-input"
              name="resumeLink"
              value={formData.resumeLink}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label className="field-label">LinkedIn</label>
              <input
                className="field-input"
                name="linkedInUrl"
                value={formData.linkedInUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <label className="field-label">GitHub</label>
              <input
                className="field-input"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="field-label">About</label>
            <textarea
              className="field-input min-h-36"
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Write a short summary about your interests, projects, and placement goals."
            />
          </div>
        </form>

        <div className="space-y-6">
          <div className="surface-card p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Completion</div>
            <div className="mt-4 text-4xl font-bold">{completion}%</div>
            <div className="mt-4 h-3 rounded-full bg-ink-100">
              <div className="h-3 rounded-full bg-brand-600" style={{ width: `${completion}%` }} />
            </div>
            <p className="mt-4 text-sm leading-7 text-ink-600">
              Profiles with strong academic details, skills, and a resume link are easier for recruiters to review.
            </p>
          </div>

          <div className="surface-card p-6">
            <h3 className="text-xl font-semibold">Preview</h3>
            {formData.name ? (
              <div className="mt-5 space-y-3">
                <div>
                  <div className="text-2xl font-bold">{formData.name}</div>
                  <div className="text-sm text-brand-700">{formData.headline || "Add a short headline"}</div>
                </div>
                <div className="text-sm text-ink-600">
                  {formData.branch || "Branch"} • {formData.graduationYear || "Year"} • CGPA {formData.cgpa || "--"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean)
                    .map((skill) => (
                      <span key={skill} className="rounded-full bg-sand-100 px-3 py-1 text-xs font-semibold text-ink-700">
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            ) : (
              <EmptyState
                title="Start your profile"
                message="Once you add your academic and placement details, the preview card will update automatically."
              />
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default UserProfile;
