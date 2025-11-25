export interface Company {
  id: string
  name: string
  location?: string
  website?: string
  description?: string
  logo?: string
}

export interface Job {
  id: string
  title: string
  companyId: string
  companyName: string
  location?: string
  isRemote?: boolean
  salary?: string
  description?: string
  postedDate?: string
  benefits?: string[]
}

export interface UserProfile {
  id: string
  name: string
  email?: string
}
