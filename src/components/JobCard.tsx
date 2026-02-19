import React, { useState } from 'react';
import { Job } from '../types';
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import { JobModal } from './JobModal';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:border-zinc-300 transition-all cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsModalOpen(true)}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
              {job.title}
            </h3>
            <p className="text-zinc-500 font-medium">{job.company}</p>
          </div>
          <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-semibold rounded-full uppercase tracking-wider">
            {job.experience_level}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-zinc-500 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            {job.location}
          </div>
          <div className="flex items-center text-zinc-500 text-sm">
            <Briefcase className="w-4 h-4 mr-2" />
            {job.category}
          </div>
          <div className="flex items-center text-zinc-500 text-sm">
            <DollarSign className="w-4 h-4 mr-2" />
            {job.salary}
          </div>
          <div className="flex items-center text-zinc-500 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            {new Date(job.posted_at).toLocaleDateString()}
          </div>
        </div>

        <button 
          className="w-full py-2 bg-zinc-50 text-zinc-900 font-semibold rounded-xl hover:bg-zinc-900 hover:text-white transition-all"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          View Details
        </button>
      </div>

      {isModalOpen && (
        <JobModal job={job} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};
