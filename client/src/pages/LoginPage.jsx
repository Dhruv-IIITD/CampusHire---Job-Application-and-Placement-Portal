import { BriefcaseBusiness } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/userSlice";
import { apiRequest, getDashboardPath } from "../services";

const LoginPage = () => {
  const user = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
        url: "/auth/login",
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
    <div className="grid min-h-screen lg:grid-cols-[1fr_0.95fr]">
      <div className="hidden bg-ink-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-ink-950">
            <BriefcaseBusiness size={22} />
          </div>
          <div>
            <div className="font-display text-2xl font-bold">CampusHire</div>
            <div className="text-sm text-slate-300">Placement portal for students and recruiters</div>
          </div>
        </div>
        <div>
          <div className="max-w-lg text-5xl font-bold leading-tight">Track campus opportunities with a cleaner workflow.</div>
          <p className="mt-6 max-w-lg text-base leading-8 text-slate-300">
            Sign in to manage student profiles, browse jobs, review applicants, and update hiring status from one place.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-10">
        <div className="surface-card w-full max-w-xl p-8 sm:p-10">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">Welcome Back</div>
          <h1 className="mt-3 text-4xl font-bold">Login to CampusHire</h1>
          <p className="mt-3 text-sm leading-7 text-ink-600">
            Use your student or recruiter account to continue.
          </p>

          {error ? <div className="mt-6 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div> : null}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="field-label">Email</label>
              <input
                className="field-input"
                type="email"
                value={formData.email}
                onChange={(event) => setFormData((previous) => ({ ...previous, email: event.target.value }))}
                placeholder="student@example.com"
              />
            </div>
            <div>
              <label className="field-label">Password</label>
              <input
                className="field-input"
                type="password"
                value={formData.password}
                onChange={(event) => setFormData((previous) => ({ ...previous, password: event.target.value }))}
                placeholder="Enter your password"
              />
            </div>
            <button className="btn-primary w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-sm text-ink-600">
            Need an account?{" "}
            <Link to="/signup" className="font-semibold text-brand-700 hover:text-brand-800">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
