import { BriefcaseBusiness } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/userSlice";
import { apiRequest, getDashboardPath } from "../services";

const SignUpPage = () => {
  const user = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "STUDENT",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user.jwtToken) {
      navigate(getDashboardPath(user.accountType), { replace: true });
    }
  }, [navigate, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await apiRequest({
        url: "/auth/register",
        method: "POST",
        data: formData,
      });

      dispatch(login(response));
      navigate(getDashboardPath(response.accountType));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[0.95fr_1fr]">
      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-10">
        <div className="surface-card w-full max-w-xl p-8 sm:p-10">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">Get Started</div>
          <h1 className="mt-3 text-4xl font-bold">Create your CampusHire account</h1>
          <p className="mt-3 text-sm leading-7 text-ink-600">
            Choose a role and set up the account you will use during project demos or local testing.
          </p>

          {error ? <div className="mt-6 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div> : null}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="field-label">Role</label>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setFormData((previous) => ({ ...previous, accountType: "STUDENT" }))}
                  className={`rounded-2xl border px-4 py-4 text-left ${
                    formData.accountType === "STUDENT"
                      ? "border-brand-300 bg-brand-50 text-brand-700"
                      : "border-ink-200 bg-white text-ink-700"
                  }`}
                >
                  <div className="font-semibold">Student</div>
                  <div className="mt-1 text-sm">Browse jobs, build profile, and track applications.</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((previous) => ({ ...previous, accountType: "RECRUITER" }))}
                  className={`rounded-2xl border px-4 py-4 text-left ${
                    formData.accountType === "RECRUITER"
                      ? "border-brand-300 bg-brand-50 text-brand-700"
                      : "border-ink-200 bg-white text-ink-700"
                  }`}
                >
                  <div className="font-semibold">Recruiter / Admin</div>
                  <div className="mt-1 text-sm">Post jobs, review applicants, and update status.</div>
                </button>
              </div>
            </div>

            <div>
              <label className="field-label">Full Name</label>
              <input
                className="field-input"
                value={formData.name}
                onChange={(event) => setFormData((previous) => ({ ...previous, name: event.target.value }))}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="field-label">Email</label>
              <input
                className="field-input"
                type="email"
                value={formData.email}
                onChange={(event) => setFormData((previous) => ({ ...previous, email: event.target.value }))}
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label className="field-label">Password</label>
              <input
                className="field-input"
                type="password"
                value={formData.password}
                onChange={(event) => setFormData((previous) => ({ ...previous, password: event.target.value }))}
                placeholder="At least 6 characters"
              />
            </div>

            <button className="btn-primary w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-ink-600">
            Already registered?{" "}
            <Link to="/login" className="font-semibold text-brand-700 hover:text-brand-800">
              Login here
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden bg-sand-100 p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-950 text-white">
            <BriefcaseBusiness size={22} />
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-ink-950">CampusHire</div>
            <div className="text-sm text-ink-600">Placement and application portal</div>
          </div>
        </div>
        <div className="max-w-xl">
          <div className="text-5xl font-bold leading-tight">Believable, polished, and simple enough for a final-year demo.</div>
          <p className="mt-6 text-base leading-8 text-ink-600">
            The project covers authentication, profiles, jobs, applications, dashboards, and recruiter review flow
            without turning into an enterprise-only architecture exercise.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
