const Job = require('../models/Job');

const jobController = {
  async getAllJobs(req, res) {
    try {
      const jobs = await Job.findAll();
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
      const jobData = req.body;
      const newJob = await Job.create(jobData);
      res.status(201).json(newJob);
    } catch (error) {
      res.status(500).json({ error: error.message });
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