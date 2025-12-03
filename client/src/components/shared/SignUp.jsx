import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../shadcn/ToastContext";
import AttractiveLoader from "../shadcn/Loader";
import { useDispatch, useSelector } from "react-redux";
const Signup = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  });
  const dispatch=useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const fileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };
  // In your Signup.jsx component

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", selectedRole);
    if (input.file) {
      formData.append("file", input.file); // ⬅️ This must match multer's `.single("file")`
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // ⬅️ Crucial for file upload
          },
        }
      );

      if (res.data.success) {
        showToast("Registration successful! Redirecting...", "success");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      showToast(
        error.response?.data?.message || "Registration failed.",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-700">
          <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Create Account
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Join our community of professionals
          </p>

          <form className="space-y-6" onSubmit={onSubmitHandler}>
            {/* Full Name Input */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* User Icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={input.fullName}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-3 transition-colors duration-300"
                  placeholder="John Doe"
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* Mail Icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={input.email}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-3 transition-colors duration-300"
                  placeholder="you@example.com"
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* Phone Icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={onChangeHandler}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-3 transition-colors duration-300"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* Lock Icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <rect
                      width="18"
                      height="11"
                      x="3"
                      y="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={input.password}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-3 transition-colors duration-300"
                  placeholder="••••••••"
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-4">
                {/* Student Option */}
                <div
                  onClick={() => setSelectedRole("STUDENT")}
                  className={`cursor-pointer p-4 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-300 
          ${
            selectedRole === "STUDENT"
              ? "bg-blue-500/20 border-blue-500 text-white"
              : "bg-gray-700 border-gray-600 text-gray-400 hover:border-gray-500 hover:bg-gray-600/50"
          }`}
                >
                  {/* Graduation Cap Icon SVG */}
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
                    className="mb-2"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c0 1.66 4 3 6 3s6-1.34 6-3v-5"></path>
                  </svg>
                  <span className="font-semibold">Student</span>
                </div>

                {/* Recruiter Option */}
                <div
                  onClick={() => setSelectedRole("RECRUITER")}
                  className={`cursor-pointer p-4 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-300 
          ${
            selectedRole === "RECRUITER"
              ? "bg-blue-500/20 border-blue-500 text-white"
              : "bg-gray-700 border-gray-600 text-gray-400 hover:border-gray-500 hover:bg-gray-600/50"
          }`}
                >
                  {/* Briefcase Icon SVG */}
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
                    className="mb-2"
                  >
                    <rect
                      width="20"
                      height="14"
                      x="2"
                      y="7"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <span className="font-semibold">Recruiter</span>
                </div>
              </div>
            </div>

            {/* Profile Picture Upload */}
            <div>
              <label
                htmlFor="profile-picture"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Profile Picture
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  id="profile-picture"
                  onChange={fileHandler}
                  className="absolute w-0 h-0 opacity-0"
                />
                <label
                  htmlFor="profile-picture"
                  className="flex items-center justify-center w-full px-4 py-3 bg-gray-700 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-300"
                >
                  {/* FileUp Icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 mr-3"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" x2="12" y1="3" y2="15"></line>
                  </svg>
                  <span className="text-gray-300 truncate">{fileName}</span>
                </label>
              </div>
            </div>

            {/* Signup Button */}
            {loading ? (
              <div className="flex items-center justify-center w-full py-10">
                <AttractiveLoader />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
              >
                Sign up
              </button>
            )}
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-400 mt-8">
            Already have an account?{" "}
            <a
              href="login"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
