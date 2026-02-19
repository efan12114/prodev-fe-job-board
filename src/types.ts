export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  experience_level: string;
  salary: string;
  description: string;
  posted_at: string;
}

export interface Filters {
  category: string;
  location: string;
  experience: string;
}

export interface ApplicationData {
  jobId: number;
  fullName: string;
  email: string;
  coverLetter: string;
}
