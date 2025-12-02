const Job = require('../models/Job');

const jobController = {
  async getAllJobs(req, res) {
    try {
      // Pass query params through to model for filtering
      const filters = {
        q: req.query.q,
        location: req.query.location,
        is_remote: req.query.is_remote === 'true' ? true : req.query.is_remote === 'false' ? false : undefined,
        employment_type: req.query.employment_type,
        salary_min: req.query.salary_min ? parseInt(req.query.salary_min) : undefined,
        salary_max: req.query.salary_max ? parseInt(req.query.salary_max) : undefined,
      }
      const jobs = await Job.findAll(filters);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getJobById(req, res) {
    try {
      const { id } = req.params;
      const job = await Job.findById(id);
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createJob(req, res) {
    try {
      let jobData = req.body;
      // Generate slug from title if not provided
      if (!jobData.slug && jobData.title) {
        jobData.slug = jobData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      }
      const newJob = await Job.create(jobData);
      res.status(201).json(newJob);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createJobsBulk(req, res) {
    try {
      const jobArray = req.body
      if (!Array.isArray(jobArray)) {
        return res.status(400).json({ error: 'Request body must be an array of jobs' })
      }

      // Validate and generate slugs if missing
      const prepared = jobArray.map((j) => {
        const jobData = { ...j }
        if (!jobData.title) {
          throw new Error('Each job must include a title')
        }
        if (!jobData.slug) {
          jobData.slug = jobData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
        }
        return jobData
      })

      const newJobs = await Job.createBulk(prepared)
      res.status(201).json(newJobs)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async updateJob(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedJob = await Job.update(id, updates);
      res.json(updatedJob);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteJob(req, res) {
    try {
      const { id } = req.params;
      await Job.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getJobsByCompany(req, res) {
    try {
      const { companyId } = req.params;
      const jobs = await Job.findByCompany(companyId);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = jobController;