const express=require("express");
const { registerCompany, getCompany, getCompanyById,updateCompany, deleteCompany } = require("../controllers/company.controllers");
const isAuthenticated = require("../midddlewares/isAuthenticated");
const singleUpload = require("../midddlewares/multer");
const router=express.Router();
router.post('/register',isAuthenticated,registerCompany)
router.get('/get',isAuthenticated,getCompany)
router.get('/:id',isAuthenticated,getCompanyById)
router.put('/update/company/:id',isAuthenticated,singleUpload,updateCompany)
router.delete('/delete/:id',isAuthenticated,deleteCompany)
module.exports=router;
