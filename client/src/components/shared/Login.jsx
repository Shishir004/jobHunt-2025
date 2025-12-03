import axios from "axios";
import React, { useState } from "react";
import { useToast } from "../shadcn/ToastContext.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authslice.js";
import AttractiveLoader from "../shadcn/Loader.jsx";
const Login = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector((store) => store.auth);
  console.log("LOADING STATE:", loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const finalData = {
      ...input,
      role: selectedRole,
    };
    const formData = new FormData();
    formData.append("email", finalData.email);
    formData.append("password", finalData.password);
    formData.append("role", finalData.role);
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        "https://jobhunt-2025.onrender.com/api/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setUser(res.data.user))

      if (res.data.success) {
        // navigate("/");
        showToast("This is a success toast!", "success", res.data.message);
        navigate("/");
      } else {
        showToast("This is a error toast!", "success", res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-700">
          <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Enter Account Details
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Join our community of professionals
          </p>

          <form className="space-y-6" onSubmit={onSubmitHandler}>
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
                  onChange={onChangeHandler}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-3 transition-colors duration-300"
                  placeholder="you@example.com"
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
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-3 transition-colors duration-300"
                  placeholder="••••••••"
                  value={input.password}
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
    login
  </button>
)}

          </form>

          {/* Login Link */}
          <p className="text-center text-gray-400 mt-8">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
