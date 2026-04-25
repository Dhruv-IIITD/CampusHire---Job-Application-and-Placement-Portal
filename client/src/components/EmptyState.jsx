const EmptyState = ({ title, message, action }) => {
  return (
    <div className="surface-card p-10 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
        <span className="text-xl font-bold">?</span>
      </div>
      <h3 className="text-xl font-semibold text-ink-950">{title}</h3>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-ink-600">{message}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
};

export default EmptyState;
