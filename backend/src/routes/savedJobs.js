const express = require('express');
const router = express.Router();
const savedJobController = require('../controllers/savedJobController');

router.get('/', savedJobController.getAllSavedJobs);
router.get('/:id', savedJobController.getSavedJobById);
router.post('/', savedJobController.createSavedJob);
router.put('/:id', savedJobController.updateSavedJob);
router.delete('/:id', savedJobController.deleteSavedJob);
router.get('/job/:jobId', savedJobController.getSavedJobByJob);

module.exports = router;