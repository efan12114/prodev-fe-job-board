import React from 'react';
import { JobProvider } from './context/JobContext';
import { FilterSidebar } from './components/FilterSidebar';
import { JobCard } from './components/JobCard';
import { useJobs } from './context/JobContext';
import { Search, Briefcase, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

const JobBoard: React.FC = () => {
  const { jobs, loading, error } = useJobs();

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ProDev FE</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#" className="hover:text-zinc-900 transition-colors">Find Jobs</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Companies</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Salaries</a>
          </div>
          <button className="px-4 py-2 bg-zinc-900 text-white text-sm font-bold rounded-xl hover:bg-zinc-800 transition-all">
            Post a Job
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-white border-b border-zinc-200 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6"
          >
            Find your next <span className="text-zinc-400 italic">dream role</span>
          </motion.h1>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto mb-10">
            The leading platform for frontend developers and designers to find high-impact opportunities at top-tier companies.
          </p>
          
          <div className="max-w-3xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by job title, keyword, or company..."
              className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900 shadow-sm"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <FilterSidebar />

          {/* Job List */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-zinc-900">
                {loading ? 'Searching...' : `${jobs.length} Jobs Found`}
              </h2>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span>Sort by:</span>
                <select className="bg-transparent font-semibold text-zinc-900 focus:outline-none">
                  <option>Newest</option>
                  <option>Salary</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-zinc-300 animate-spin mb-4" />
                <p className="text-zinc-500 font-medium">Fetching latest opportunities...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-100 p-8 rounded-2xl text-center">
                <p className="text-red-600 font-semibold mb-2">Oops! Something went wrong.</p>
                <p className="text-red-500 text-sm">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold"
                >
                  Try Again
                </button>
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white border border-zinc-200 p-12 rounded-2xl text-center">
                <p className="text-zinc-500 font-medium">No jobs found matching your criteria.</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 text-zinc-900 font-bold underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <Briefcase className="w-5 h-5" />
            <span className="font-bold text-lg tracking-tight">ProDev FE</span>
          </div>
          <p className="text-zinc-400 text-sm">
            © 2026 ProDev FE. All rights reserved. Built for the modern web.
          </p>
          <div className="flex gap-6 text-zinc-400 text-sm">
            <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <JobProvider>
      <JobBoard />
    </JobProvider>
  );
}
