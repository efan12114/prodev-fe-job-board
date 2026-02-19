import React, { useState } from 'react';
import { Job } from '../types';
import { X, MapPin, Briefcase, DollarSign, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useJobs } from '../context/JobContext';

interface JobModalProps {
  job: Job;
  onClose: () => void;
}

export const JobModal: React.FC<JobModalProps> = ({ job, onClose }) => {
  const { applyForJob } = useJobs();
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', coverLetter: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await applyForJob({
        jobId: job.id,
        ...formData
      });
      setStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-zinc-400" />
        </button>

        <div className="p-8">
          {!isApplying ? (
            <>
              <div className="mb-8">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">
                  {job.company}
                </span>
                <h2 id="modal-title" className="text-3xl font-bold text-zinc-900 mb-4">
                  {job.title}
                </h2>
                <div className="flex flex-wrap gap-4 text-zinc-500 text-sm">
                  <div className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {job.location}</div>
                  <div className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> {job.category}</div>
                  <div className="flex items-center"><DollarSign className="w-4 h-4 mr-1" /> {job.salary}</div>
                </div>
              </div>

              <div className="prose prose-zinc max-w-none mb-8">
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">About the role</h3>
                <p className="text-zinc-600 leading-relaxed">
                  {job.description}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>

              <button 
                onClick={() => setIsApplying(true)}
                className="w-full py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200"
              >
                Apply Now
              </button>
            </>
          ) : (
            <div className="py-4">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-zinc-900 mb-2">Application Sent!</h3>
                  <p className="text-zinc-500">Good luck with your application for {job.title}.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-6">Apply for {job.title}</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-zinc-700 mb-2">Full Name</label>
                      <input
                        required
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-zinc-700 mb-2">Email Address</label>
                      <input
                        required
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="coverLetter" className="block text-sm font-semibold text-zinc-700 mb-2">Cover Letter (Optional)</label>
                      <textarea
                        id="coverLetter"
                        rows={4}
                        value={formData.coverLetter}
                        onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
                        placeholder="Tell us why you're a great fit..."
                      />
                    </div>
                    
                    {status === 'error' && (
                      <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
                    )}

                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setIsApplying(false)}
                        className="flex-1 py-4 bg-zinc-100 text-zinc-600 font-bold rounded-2xl hover:bg-zinc-200 transition-all"
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        disabled={status === 'submitting'}
                        className="flex-[2] py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200 disabled:opacity-50"
                      >
                        {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
