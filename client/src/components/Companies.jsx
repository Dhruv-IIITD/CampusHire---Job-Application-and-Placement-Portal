import { partnerCompanies } from "../utils/data";

const Companies = () => {
  return (
    <section className="section-shell pt-0">
      <div className="page-shell">
        <div className="surface-card overflow-hidden p-6 sm:p-8">
          <div className="text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-ink-500">
              Recruiter-ready showcase
            </div>
            <h2 className="mt-3 text-3xl font-bold">Inspired by campus drives from familiar hiring brands</h2>
          </div>

          <div className="relative mt-8 flex overflow-hidden">
            <div className="flex min-w-full animate-marquee items-center gap-10 whitespace-nowrap pr-10">
              {partnerCompanies.map((company) => (
                <div
                  key={company}
                  className="inline-flex items-center gap-3 rounded-full border border-ink-100 bg-sand-50 px-5 py-3 text-sm font-semibold text-ink-700"
                >
                  <img src={`/companies/${company}.png`} alt={company} className="h-8 w-8 object-contain" />
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Companies;
