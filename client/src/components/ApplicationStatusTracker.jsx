import StatusBadge from "./StatusBadge";

const orderedStatuses = ["APPLIED", "UNDER_REVIEW", "SHORTLISTED", "INTERVIEW", "SELECTED"];

const ApplicationStatusTracker = ({ status }) => {
  const currentIndex = orderedStatuses.indexOf(status);
  const rejected = status === "REJECTED";

  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Application Status</h3>
          <p className="mt-1 text-sm text-ink-600">Track the current stage of this application.</p>
        </div>
        <StatusBadge status={status} />
      </div>

      {rejected ? (
        <div className="mt-5 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">
          This application has been closed by the recruiter.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {orderedStatuses.map((item, index) => {
            const completed = index <= currentIndex;
            return (
              <div key={item} className="flex items-center gap-3 md:flex-col md:items-start">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                    completed ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-500"
                  }`}
                >
                  {index + 1}
                </div>
                <div className={`text-sm font-semibold ${completed ? "text-ink-950" : "text-ink-500"}`}>
                  {item.replaceAll("_", " ")}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ApplicationStatusTracker;
