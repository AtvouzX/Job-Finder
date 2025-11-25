import type { Job, Company } from '@/types'

export const companies: Company[] = [
  {
    id: 'c1',
    name: 'Acme Corp',
    location: 'Jakarta, Indonesia',
    website: 'https://acme.example',
    description: 'A technology company specialized in building awesome software',
    logo: 'https://via.placeholder.com/64x64?text=AC',
  },
  {
    id: 'c2',
    name: 'Nusantara Systems',
    location: 'Bandung, Indonesia',
    website: 'https://nusantara.example',
    description: 'Cloud and infra focused company',
    logo: 'https://via.placeholder.com/64x64?text=NS',
  },
]

export const jobs: Job[] = [
  {
    id: 'j1',
    title: 'Frontend Engineer',
    companyId: 'c1',
    companyName: 'Acme Corp',
    location: 'Jakarta',
    isRemote: true,
    salary: 'IDR 8.000.000 - 15.000.000',
    description:
      'We are looking for a Frontend Engineer with experience in React and TypeScript to join our growing team and help build user-facing features.',
    postedDate: '2 days ago',
    benefits: ['Health Insurance', 'Flexible Hours', 'Remote Work'],
  },
  {
    id: 'j2',
    title: 'Backend Engineer',
    companyId: 'c2',
    companyName: 'Nusantara Systems',
    location: 'Bandung',
    isRemote: false,
    salary: 'IDR 12.000.000 - 20.000.000',
    description:
      'Experienced in Node.js, databases, and building resilient APIs. Join us to tackle interesting platform challenges.',
    postedDate: '1 week ago',
    benefits: ['Stock Options', 'Learning Budget', 'Team Events'],
  },
  {
    id: 'j3',
    title: 'Product Designer',
    companyId: 'c1',
    companyName: 'Acme Corp',
    location: 'Jakarta',
    isRemote: true,
    salary: 'IDR 10.000.000 - 18.000.000',
    description: 'Design delightful product experiences across web and mobile platforms.',
    postedDate: '3 days ago',
    benefits: ['Creative Freedom', 'Design Tools Budget', 'Health Insurance'],
  },
]
