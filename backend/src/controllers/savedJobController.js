const SavedJob = require('../models/SavedJob');

const savedJobController = {
  async getAllSavedJobs(req, res) {
    try {
      const filters = {
        job_id: req.query.job_id,
      };
      const savedJobs = await SavedJob.findAll(filters);
      res.json(savedJobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getSavedJobById(req, res) {
    try {
      const { id } = req.params;
      const savedJob = await SavedJob.findById(id);
      res.json(savedJob);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createSavedJob(req, res) {
    try {
      const savedJobData = req.body;
      const newSavedJob = await SavedJob.create(savedJobData);
      res.status(201).json(newSavedJob);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateSavedJob(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedSavedJob = await SavedJob.update(id, updates);
      res.json(updatedSavedJob);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteSavedJob(req, res) {
    try {
      const { id } = req.params;
      await SavedJob.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getSavedJobByJob(req, res) {
    try {
      const { jobId } = req.params;
      const savedJob = await SavedJob.findByJob(jobId);
      if (savedJob) {
        res.json(savedJob);
      } else {
        res.status(404).json({ error: 'Saved job not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = savedJobController;