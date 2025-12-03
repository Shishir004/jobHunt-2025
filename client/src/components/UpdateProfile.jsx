import React, { useState } from "react";
import AttractiveLoader from "./shadcn/Loader";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoading, setUser } from "../redux/authslice";
// import { useToast } from "./shadcn/ToastContext";

// --- SVG Icons for Form Fields ---

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.76a11.034 11.034 0 006.364 6.364l.76-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const BioIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 11-2 0V4H6a1 1 0 110-2h8a1 1 0 011 1v12a3 3 0 11-6 0V4a1 1 0 11-2 0V4z"
      clipRule="evenodd"
    />
  </svg>
);

const SkillsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M11.3 1.046A1 1 0 0112 2v5.268l4.162.832a1 1 0 01.838 1.162l-1.333 6.667a1 1 0 01-1.162.838l-4.162-.833V18a1 1 0 01-1 1h-1a1 1 0 01-1-1v-5.268l-4.162-.832a1 1 0 01-.838-1.162l1.333-6.667a1 1 0 011.162-.838L9 7.268V2a1 1 0 011-1h1.3zM12 16V9.932l-2.162-.432-1.333 6.667L12 16z"
      clipRule="evenodd"
    />
  </svg>
);

const ResumeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
      clipRule="evenodd"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
// const {showToast}=useToast();

// --- Reusable Form Field Component with Icon ---
const FormField = ({
  icon,
  label,
  type = "text",
  placeholder,
  value,
  name,
  changeEventHandler,
}) => (
  <div>
    <label className="text-sm font-medium text-gray-300 mb-2 block">
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={changeEventHandler}
        className="w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
      />
    </div>
  </div>
);

// --- Updated Profile Modal ---
const UpdateProfile = ({ open, setOpen }) => {
  if (!open) return null;
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispath = useDispatch();
  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: user?.profile?.file || null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    const skillsArray = input.skills.split(",").map((skill) => skill.trim());
    formData.append("skills", JSON.stringify(skillsArray));
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        "https://jobhunt-2025.onrender.com/api/user/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispath(setUser(res.data.user));
        console.log("Updated user: ", res.data.user);
        // showToast('updated successfully','success',res.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("AXIOS ERROR:", error.response?.data || error.message);
      // showToast('updated successfully','error',res.data.message);
    }
    finally{
      setLoading(false)
    }
    setOpen(false);
  };
  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1e293b] w-full max-w-lg rounded-2xl shadow-2xl border border-gray-700/50 transform transition-all duration-300 ease-in-out"
      >
        <form onSubmit={onSubmitHandler}>
          {/* Modal Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-700">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Update Profile
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-full p-1.5 transition-colors"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <div className="space-y-5">
              <FormField
                icon={<UserIcon />}
                label="Full Name"
                value={input.fullName}
                name="fullName"
                changeEventHandler={changeEventHandler}
              />
              <FormField
                icon={<EmailIcon />}
                label="Email Address"
                type="email"
                value={input.email}
                name="email"
                changeEventHandler={changeEventHandler}
              />
              <FormField
                icon={<PhoneIcon />}
                label="Phone Number"
                type="tel"
                value={input.phoneNumber}
                name="phoneNumber"
                changeEventHandler={changeEventHandler}
              />
              <FormField
                icon={<BioIcon />}
                label="Bio"
                value={input.bio}
                name="bio"
                changeEventHandler={changeEventHandler}
              />
              <FormField
                icon={<SkillsIcon />}
                label="Skills"
                value={input.skills}
                name="skills"
                changeEventHandler={changeEventHandler}
                placeholder="e.g., React, Node.js"
              />

              {/* Custom File Input */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Resume
                </label>
                <div className="relative">
                  <label
                    htmlFor="file-upload"
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 hover:bg-gray-600 cursor-pointer flex items-center"
                  >
                    <ResumeIcon />
                    <span className="ml-2">
                      {input.file ? input.file.name : "Choose File"}
                    </span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    name="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={fileChangeHandler}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-5 border-t border-gray-700">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <div className="ml-50"><AttractiveLoader/></div> : "Update Your Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateProfile;
