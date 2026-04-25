import { Link } from "react-router-dom";

const NavLinks = ({ role, mobile = false, onNavigate }) => {
  const guestLinks = [
    { label: "Home", to: "/" },
    { label: "Browse Jobs", to: "/jobs" },
    { label: "About", to: "/about" },
  ];

  const studentLinks = [
    { label: "Dashboard", to: "/student/dashboard" },
    { label: "Browse Jobs", to: "/jobs" },
    { label: "Applications", to: "/applications" },
    { label: "Profile", to: "/user-profile" },
    { label: "Saved Jobs", to: "/saved-jobs" },
  ];

  const recruiterLinks = [
    { label: "Dashboard", to: "/recruiter/dashboard" },
    { label: "Manage Jobs", to: "/posted-jobs" },
    { label: "Post Job", to: "/post-jobs" },
    { label: "About", to: "/about" },
  ];

  let links = guestLinks;
  if (role === "STUDENT") links = studentLinks;
  if (role === "RECRUITER" || role === "ADMIN") links = recruiterLinks;

  return (
    <div className={mobile ? "flex flex-col gap-2" : "hidden items-center gap-6 md:flex"}>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          onClick={onNavigate}
          className="rounded-full px-3 py-2 text-sm font-semibold text-ink-700 transition hover:bg-white hover:text-brand-700"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
