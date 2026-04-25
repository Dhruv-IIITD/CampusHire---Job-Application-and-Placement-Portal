const LoadingState = ({ title = "Loading data...", message = "Please wait while we fetch the latest information." }) => {
  return (
    <div className="surface-card flex flex-col items-center justify-center gap-3 p-10 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-100 border-t-brand-500" />
      <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
      <p className="max-w-md text-sm text-ink-600">{message}</p>
    </div>
  );
};

export default LoadingState;
