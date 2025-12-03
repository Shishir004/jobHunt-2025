const { registerUser, loginUser, logOut, updateProfile } = require("../controllers/user.controllers");
const isAuthenticated = require("../midddlewares/isAuthenticated");
const express=require('express');
const singleUpload = require("../midddlewares/multer");
const router=express.Router();
router.post('/register',singleUpload,registerUser);
router.post('/login',loginUser);
router.delete('/logout',logOut);
router.put('/update-profile',isAuthenticated,singleUpload,updateProfile);
module.exports=router;


