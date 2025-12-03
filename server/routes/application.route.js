const express=require('express');
const { applyJob, getAllAppliedJobs, getApplicants, updateStatus } = require('../controllers/application.controller');
const isAuthenticated = require('../midddlewares/isAuthenticated');
const router=express.Router();
router.post('/apply/job/:id',isAuthenticated,applyJob);
router.get('/getAllAppliedJobs',isAuthenticated,getAllAppliedJobs);
router.get('/get/Applicants/:id',getApplicants);
router.post('/update/status/:id',updateStatus);
module.exports=router;