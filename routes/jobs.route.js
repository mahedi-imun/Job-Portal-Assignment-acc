const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobs.controller');
const verifyToken = require('../middleware/verifyToken')
const authorization = require("../middleware/authorization")

router.post('/jobs', jobController.createJob);
router.get('/manager/jobs',verifyToken, jobController.getJob);
router.get('/manager/jobs/:id', authorization("Admin"), jobController.getJobById);
router.patch('/jobs/:id', jobController.updateJob)


module.exports = router;