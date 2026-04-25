import { Quote } from "lucide-react";
import { testimonials } from "../utils/data";

const Testimonials = () => {
  return (
    <section className="section-shell">
      <div className="page-shell">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">Why it feels complete</div>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Designed to make project demos easier to understand</h2>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="surface-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sand-100 text-brand-700">
                <Quote size={20} />
              </div>
              <p className="mt-5 text-sm leading-7 text-ink-700">"{testimonial.quote}"</p>
              <div className="mt-6">
                <div className="font-semibold text-ink-950">{testimonial.name}</div>
                <div className="text-sm text-ink-500">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
