const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["STUDENT", "RECRUITER"],
    required: true
  },
  profile: {
    bio: { type: String, default: "" },
    skills: [{ type: String }],
    resume: [{ type: String }],
    resumeName: { type: String },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    },
    profilePhoto: {
      type: String,
      default: ""
    }
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
