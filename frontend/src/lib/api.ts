const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export interface Company {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  website?: string;
  location?: string;
  rating?: number;
  review_count?: number;
  created_at?: string;
}

export interface Job {
  id: string;
  company_id: string;
  title: string;
  slug?: string;
  is_remote?: boolean;
  location?: string;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  employment_type?: string;
  short_description?: string;
  description?: string;
  benefits?: string[];
  tags?: string[];
  posted_at?: string;
  expires_at?: string;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
  companies?: {
    name: string;
    website?: string;
  };
}

export const api = {
  async getCompanies(): Promise<Company[]> {
    const response = await fetch(`${API_BASE_URL}/companies`);
    if (!response.ok) {
      throw new Error('Failed to fetch companies');
    }
    return response.json();
  },

  async getCompany(id: string): Promise<Company> {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch company');
    }
    return response.json();
  },

  async getJobs(): Promise<Job[]> {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    return response.json();
  },

  async getJob(id: string): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch job');
    }
    return response.json();
  },

  async getJobsByCompany(companyId: string): Promise<Job[]> {
    const response = await fetch(`${API_BASE_URL}/jobs/company/${companyId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs by company');
    }
    return response.json();
  },
};