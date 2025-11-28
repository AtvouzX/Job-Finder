import { useQuery } from '@tanstack/react-query'
import { api, type Company, type Job } from '@/lib/api'

// Query keys for consistent caching
export const queryKeys = {
  companies: ['companies'] as const,
  company: (id: string) => ['companies', id] as const,
  jobs: ['jobs'] as const,
  job: (id: string) => ['jobs', id] as const,
  jobsByCompany: (companyId: string) => ['jobs', 'company', companyId] as const,
}

// Companies hooks
export const useCompanies = (filters?: { q?: string; location?: string }) => {
  return useQuery<Company[]>({
    queryKey: [...queryKeys.companies, filters ? { ...filters } : {}],
    queryFn: () => api.getCompanies(filters),
  })
}

export const useCompany = (id: string) => {
  return useQuery<Company>({
    queryKey: queryKeys.company(id),
    queryFn: () => api.getCompany(id),
    enabled: !!id,
  })
}

// Jobs hooks
export const useJobs = (filters?: { q?: string; location?: string; is_remote?: boolean; salary_min?: number; salary_max?: number }) => {
  return useQuery<Job[]>({
    queryKey: [...queryKeys.jobs, filters ? { ...filters } : {}],
    queryFn: () => api.getJobs(filters),
  })
}

export const useJob = (id: string) => {
  return useQuery<Job>({
    queryKey: queryKeys.job(id),
    queryFn: () => api.getJob(id),
    enabled: !!id,
  })
}

export const useJobsByCompany = (companyId: string) => {
  return useQuery<Job[]>({
    queryKey: queryKeys.jobsByCompany(companyId),
    queryFn: () => api.getJobsByCompany(companyId),
    enabled: !!companyId,
  })
}

// Top companies hook (sorted by rating)
export const useTopCompanies = (limit: number = 15) => {
  return useQuery<Company[]>({
    queryKey: [...queryKeys.companies, 'top', limit],
    queryFn: async () => {
      const companies = await api.getCompanies()
      return companies
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, limit)
    },
  })
}