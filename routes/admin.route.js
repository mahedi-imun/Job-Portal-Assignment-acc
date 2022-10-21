const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const verifyToken = require("../middleware/verifyToken")
const authorization = require("../middleware/authorization")

router.get('/candidate', adminController.getCandidate)
router.get('/admin/manager/', adminController.getManager)
router.get('/candidate/:id',verifyToken,  authorization('Admin') ,adminController.getCandidateId)

module.exports = router;