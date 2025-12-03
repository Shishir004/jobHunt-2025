const express=require('express');
const { postJob, getAllJobs, getAllJobsById, getAdminJobs } = require('../controllers/job.controllers');
const isAuthenticated = require('../midddlewares/isAuthenticated');
const router=express.Router();
router.post("/postJob",isAuthenticated,postJob);
router.get("/getAllJobs",getAllJobs);
router.get("/getAllJobsById/:id",isAuthenticated,getAllJobsById)
router.get("/getAdminJobs",isAuthenticated,getAdminJobs)

module.exports=router;