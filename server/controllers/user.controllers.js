const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDatauri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");
const registerUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "something is missing", success: false });
    }
    const isemail = await User.findOne({ email });
    if (isemail) {
      return res.status(400).json({
        message: "Email already exist with this email",
        success: false,
      });
    }
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Phone number already registered" });
    }
    const isFile=req.file;
    let profilePhotoUrl  ='';
    if(isFile)
    {
      const fileUri=getDatauri(isFile);
      const cloudResponse=await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl=cloudResponse.secure_url;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto:profilePhotoUrl
      }
    });
    return res
      .status(200)
      .json({ message: "user created successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "please enter credentials", success: false });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "email do not exist", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "password do not match", success: false });
    }
    if (user.role !== role) {
      return res
        .status(400)
        .json({ message: "role do not match", success: false });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, { httpOnly: true, sameSite: "strict" })
      .json({
        message: `WELCOME BACK${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const logOut = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "strict",
      })
      .json({ message: "Logout successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    // ✅ If file exists, upload to Cloudinary
    if (file) {
      const fileUri = getDatauri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw",
      });

      if (cloudResponse) {
        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeName = file.originalname;
      }
    }

    // ✅ Parse skills
    let skillsArray;
    if (skills) {
      try {
        skillsArray = JSON.parse(skills);
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Invalid skills format", success: false });
      }
    }

    // ✅ Update other fields
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.bio = bio;
    if (skillsArray) user.skills = skillsArray;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Failed to update data", success: false });
  }
};

module.exports = { registerUser, loginUser, logOut, updateProfile };
