const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidate.controller');
const uploader = require('../middleware/uploader');

router.post('/file-upload', uploader.array('image'), candidateController.fileUpload)
router.get('/jobs', candidateController.getJobsCandidate)
router.get('/jobs/:id', candidateController.getJobById)
router.post('/jobs/:id/apply', candidateController.applyJob)

module.exports = router;