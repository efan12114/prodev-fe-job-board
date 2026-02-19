import React from 'react';
import { useJobs } from '../context/JobContext';

const categories = ['All', 'Engineering', 'Design', 'Management', 'Marketing'];
const experienceLevels = ['All', 'Entry-Level', 'Mid-Level', 'Senior'];
const locations = ['All', 'Remote', 'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA'];

export const FilterSidebar: React.FC = () => {
  const { filters, setFilters } = useJobs();

  const handleChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <aside className="w-full md:w-64 space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-black/5">
      <div>
        <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Category</h3>
        <div className="space-y-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleChange('category', cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                filters.category === cat
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-600 hover:bg-zinc-50'
              }`}
              aria-pressed={filters.category === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Experience Level</h3>
        <div className="space-y-2">
          {experienceLevels.map(exp => (
            <button
              key={exp}
              onClick={() => handleChange('experience', exp)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                filters.experience === exp
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-600 hover:bg-zinc-50'
              }`}
              aria-pressed={filters.experience === exp}
            >
              {exp}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Location</h3>
        <select
          value={filters.location}
          onChange={(e) => handleChange('location', e.target.value)}
          className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          aria-label="Filter by location"
        >
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
    </aside>
  );
};
