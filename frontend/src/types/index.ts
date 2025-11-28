export interface Company {
  id: string
  name: string
  slug?: string
  location?: string
  website?: string
  description?: string
  job_count?: number
  rating?: number
  review_count?: number
  contact_email?: string
  created_at?: string
}

export interface Job {
  id: string
  company_id: string
  title: string
  slug?: string
  location?: string
  is_remote?: boolean
  salary_min?: number
  salary_max?: number
  salary_currency?: string
  short_description?: string
  description?: string
  benefits?: unknown[]
  tags?: string[]
  posted_at?: string
  expires_at?: string
  is_published?: boolean
  created_at?: string
  updated_at?: string
  companies?: {
    name: string
    website?: string
    contact_email?: string
  }
}

export interface UserProfile {
  id: string
  name: string
  email?: string
}
