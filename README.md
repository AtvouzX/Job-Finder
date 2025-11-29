# JobFinder

JobFinder is a job search web application built with React + TypeScript on the frontend and a Node.js + Express backend. It uses Supabase as the database/backend-as-a-service for storing company and job data. The UI uses shadcn/ui and Tailwind CSS. It also supports PWA features via Vite PWA plugin.


## Table of Contents
- About
- Features
- Tech Stack
- Project Structure
- Local Setup
  - Prerequisites
  - Running the backend
  - Running the frontend
- Environment Variables
- API Endpoints
- Seeding Data
- Contributing
- Troubleshooting

## About
JobFinder provides a minimal but practical set of features to browse job listings and companies. It includes:
- Search & filters for jobs (keyword, location, remote, salary range)
- Company detail pages that list job openings for a company
- Save favorite jobs in the browser using localStorage
- PWA support for installable experience and offline caching

## Features (What this project actually has)
- Job listing and detail views
- Company listing and detail views
- Search and real filters implemented on the backend (Supabase) and frontend
- Saved jobs are stored locally (localStorage)
- PWA support via vite-plugin-pwa
- Responsive UI (desktop and mobile) using Tailwind CSS and shadcn components

## Tech Stack
- Frontend: React, TypeScript, Vite, Tailwind CSS, shadcn ui, React Query, React Router
- Backend: Node.js, Express, Supabase (Postgres)
- Other: Lucide icons, Vite PWA plugin

## Project Structure
- `frontend/`: React application
- `backend/`: Express + Supabase API

## Local Setup

### Prerequisites
- Node.js
- pnpm (or npm/yarn if you prefer, but commands below assume pnpm)

### Running the Backend
1. Create a `.env` file in `backend/` with the following values:

```env
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
PORT=3000 # optional
```

2. Install dependencies and start the server:

```powershell
cd backend
pnpm install
pnpm dev # runs nodemon for local dev
# or pnpm start to run once with Node
```

The backend listens on `http://localhost:3000` by default (or the value of `PORT`).

### Running the Frontend
1. Create a `.env` at `frontend/.env` (or update the existing file) and set the API base url:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_LOGO_DEV_API_KEY=pk_your_api_key
``` 

2. Install and run the frontend:

```powershell
cd frontend
pnpm install
pnpm dev
```

This runs Vite dev server (default port is 5173). Open `http://localhost:5173` to view the app.

### Build & Preview
To build and preview the frontend:

```powershell
cd frontend
pnpm build
pnpm preview
```

To run the backend in production (simple):

```powershell
cd backend
pnpm start
```

## Environment Variables

### Backend
- `SUPABASE_URL` — URL of your Supabase instance
- `SUPABASE_ANON_KEY` — Anon API key for Supabase
- `PORT` — (optional) Backend port

### Frontend
- `VITE_API_BASE_URL` — URL of the backend API, e.g. `http://localhost:3000/api` or your deployed API
- `VITE_LOGO_DEV_API_KEY` — (optional) third-party service key used for generating company logos in development

## API Endpoints (Backend)
The backend exposes RESTful endpoints.

### Jobs
- GET `/api/jobs` — Get all jobs with optional query parameters:
  - `q` — free text search across title & description
  - `location` — search by location
  - `is_remote` — `true` or `false` (filter remote or on-site)
  - `salary_min` — minimum salary
  - `salary_max` — maximum salary

- GET `/api/jobs/:id` — Get job by ID
- POST `/api/jobs` — Create a new job (request body: job data)
- POST `/api/jobs/bulk` — Insert multiple jobs in bulk
- PUT `/api/jobs/:id` — Update a job by ID
- DELETE `/api/jobs/:id` — Delete job by ID
- GET `/api/jobs/company/:companyId` — Get all jobs by a given company ID

### Companies
- GET `/api/companies` — List companies with optional `q` and `location` query parameters
- GET `/api/companies/:id` — Get company detail (includes `job_count` via query)
- POST `/api/companies` — Create a company
- POST `/api/companies/bulk` — Bulk create companies
- PUT `/api/companies/:id` — Update company
- DELETE `/api/companies/:id` — Delete company

## Seeding Data
You can seed the database by calling the bulk endpoints:

```powershell
# Example using curl (JSON array of companies or jobs)
curl -X POST http://localhost:3000/api/companies/bulk -H "Content-Type: application/json" -d "[ { \"name\": \"Acme\", \"website\": \"https://acme.com\" } ]"

curl -X POST http://localhost:3000/api/jobs/bulk -H "Content-Type: application/json" -d "[ { \"title\": \"Software Engineer\", \"company_id\": \"<company-id>\" } ]"
```

## Saved Jobs
Saved jobs are stored in the browser's `localStorage`, not persisted to the backend. Use the `Saved` view to see jobs you bookmarked locally.

## Contributing
Contributions are welcome. Feel free to open issues or PRs for bug fixes, improvements, and documentation.

1. Fork the repository
2. Create a feature branch
3. Run `pnpm install` in both `frontend` and `backend`
4. Run the dev scripts and make your changes
5. Submit a PR to the `main` branch

## Troubleshooting
- If Supabase API returns errors, verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set in the backend `.env`.
- If the frontend cannot reach the backend, check `VITE_API_BASE_URL` and that the backend is running.
- If builds fail, ensure Node and pnpm are up-to-date and run `pnpm i` again.

