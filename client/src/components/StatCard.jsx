const StatCard = ({ label, value, accent = "bg-brand-50 text-brand-700" }) => {
  return (
    <div className="surface-card p-5">
      <div className={`inline-flex rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${accent}`}>
        {label}
      </div>
      <div className="mt-5 text-3xl font-bold text-ink-950">{value}</div>
    </div>
  );
};

export default StatCard;
