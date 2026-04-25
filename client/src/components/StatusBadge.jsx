const statusStyles = {
  APPLIED: "bg-slate-100 text-slate-700",
  UNDER_REVIEW: "bg-amber-100 text-amber-800",
  SHORTLISTED: "bg-sky-100 text-sky-800",
  INTERVIEW: "bg-indigo-100 text-indigo-800",
  REJECTED: "bg-rose-100 text-rose-700",
  SELECTED: "bg-emerald-100 text-emerald-700",
};

const labelMap = {
  APPLIED: "Applied",
  UNDER_REVIEW: "Under Review",
  SHORTLISTED: "Shortlisted",
  INTERVIEW: "Interview",
  REJECTED: "Rejected",
  SELECTED: "Selected",
};

const StatusBadge = ({ status }) => {
  return (
    <span className={`status-chip ${statusStyles[status] || "bg-slate-100 text-slate-700"}`}>
      {labelMap[status] || status}
    </span>
  );
};

export default StatusBadge;
