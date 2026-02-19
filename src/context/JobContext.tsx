import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Job, Filters, ApplicationData } from '../types';

interface JobContextType {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  fetchJobs: () => Promise<void>;
  applyForJob: (data: ApplicationData) => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    category: 'All',
    location: 'All',
    experience: 'All',
  });

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.category !== 'All') params.append('category', filters.category);
      if (filters.location !== 'All') params.append('location', filters.location);
      if (filters.experience !== 'All') params.append('experience', filters.experience);

      const response = await fetch(`/api/jobs?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const applyForJob = async (data: ApplicationData) => {
    const response = await fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Failed to submit application');
    }
  };

  return (
    <JobContext.Provider value={{ jobs, loading, error, filters, setFilters, fetchJobs, applyForJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
