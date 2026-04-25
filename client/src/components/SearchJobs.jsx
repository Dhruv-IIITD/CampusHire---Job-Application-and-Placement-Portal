import { RotateCcw, Search } from "lucide-react";

const SearchJobs = ({ filters, onChange, onSearch, onReset }) => {
  return (
    <div className="surface-card p-5 sm:p-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <label className="field-label">Role or Title</label>
          <input
            className="field-input"
            name="title"
            value={filters.title}
            onChange={onChange}
            placeholder="Frontend Developer"
          />
        </div>
        <div>
          <label className="field-label">Company</label>
          <input
            className="field-input"
            name="company"
            value={filters.company}
            onChange={onChange}
            placeholder="Microsoft"
          />
        </div>
        <div>
          <label className="field-label">Location</label>
          <input
            className="field-input"
            name="location"
            value={filters.location}
            onChange={onChange}
            placeholder="Bengaluru"
          />
        </div>
        <div>
          <label className="field-label">Skills</label>
          <input
            className="field-input"
            name="skills"
            value={filters.skills}
            onChange={onChange}
            placeholder="React, Java, SQL"
          />
        </div>
        <div>
          <label className="field-label">Job Type</label>
          <input
            className="field-input"
            name="jobType"
            value={filters.jobType}
            onChange={onChange}
            placeholder="Internship / Full Time"
          />
        </div>
        <div>
          <label className="field-label">Compensation</label>
          <input
            className="field-input"
            name="compensation"
            value={filters.compensation}
            onChange={onChange}
            placeholder="6 LPA / 25k stipend"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button onClick={onSearch} className="btn-primary">
          <Search size={16} className="mr-2" />
          Apply Filters
        </button>
        <button onClick={onReset} className="btn-secondary">
          <RotateCcw size={16} className="mr-2" />
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchJobs;
