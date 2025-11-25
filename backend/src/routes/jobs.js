const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.post('/', jobController.createJob);
router.post('/bulk', jobController.createJobsBulk);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);
router.get('/company/:companyId', jobController.getJobsByCompany);

module.exports = router;