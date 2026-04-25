import { BriefcaseBusiness, LayoutDashboard, LogOut, Menu, UserCircle2, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { getDashboardPath } from "../services";
import NavLinks from "./NavLinks";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetail);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const dashboardPath = getDashboardPath(user.accountType);

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/85 backdrop-blur">
      <div className="page-shell flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-950 text-white shadow-soft">
            <BriefcaseBusiness size={20} />
          </div>
          <div>
            <div className="font-display text-xl font-bold text-ink-950">CampusHire</div>
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand-700">
              Placement Portal
            </div>
          </div>
        </Link>

        <NavLinks role={user.accountType} />

        <div className="hidden items-center gap-3 md:flex">
          {user.jwtToken ? (
            <>
              <button onClick={() => navigate(dashboardPath)} className="btn-secondary">
                <LayoutDashboard size={16} className="mr-2" />
                Dashboard
              </button>
              <button onClick={() => navigate("/user-profile")} className="btn-secondary">
                <UserCircle2 size={16} className="mr-2" />
                {user.name?.split(" ")[0] || "Profile"}
              </button>
              <button onClick={handleLogout} className="btn-primary">
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="btn-secondary">
                Login
              </button>
              <button onClick={() => navigate("/signup")} className="btn-primary">
                Get Started
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex rounded-2xl border border-ink-200 bg-white p-3 text-ink-900 md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink-100 bg-sand-50 md:hidden">
          <div className="page-shell py-4">
            <NavLinks role={user.accountType} mobile onNavigate={() => setMobileOpen(false)} />
            <div className="mt-4 flex flex-col gap-3">
              {user.jwtToken ? (
                <>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate(dashboardPath);
                    }}
                    className="btn-secondary"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/user-profile");
                    }}
                    className="btn-secondary"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="btn-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/login");
                    }}
                    className="btn-secondary"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/signup");
                    }}
                    className="btn-primary"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
