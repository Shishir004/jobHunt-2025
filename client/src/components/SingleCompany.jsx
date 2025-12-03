import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AttractiveLoader from "./shadcn/Loader";
import axios from "axios";
import { useSelector } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";

const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);

const SingleCompany = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleComapny } = useSelector((store) => store.company);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const navigate = useNavigate();
  const params = useParams();
  const companyid = params.id;

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onFilehandler = (e) => {
    const file = e.target.files?.[0];
    setData({ ...data, file });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("website", data.website);
    formData.append("location", data.location);
    if (data.file) formData.append("file", data.file);

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:3000/api/company/update/company/${companyid}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      navigate("/admin/company");
      setSingleCompany(res.data.company);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData({
      name: singleComapny.name || "",
      description: singleComapny.description || "",
      website: singleComapny.website || "",
      location: singleComapny.location || "",
      file: null,
    });
  }, [singleComapny]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1a233a] to-[#101629] text-white font-['Inter'] p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 -left-20 w-72 h-72 bg-pink-600 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div
        className={`relative max-w-4xl mx-auto transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-slate-900/40 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center mb-8 sm:mb-10 gap-4">
            <button
              onClick={() => navigate("/create/new/Company")}
              className="flex items-center text-gray-400 hover:text-white font-semibold transition-colors duration-300"
            >
              <BackArrowIcon />
              Back
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Company Setup
              </span>
            </h1>
          </div>

          {/* Form */}
          <form className="space-y-8" onSubmit={onSubmitHandler}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={onChangeHandler}
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows="3"
                  name="description"
                  value={data.description}
                  onChange={onChangeHandler}
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                ></textarea>
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={data.website}
                  onChange={onChangeHandler}
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={data.location}
                  onChange={onChangeHandler}
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Logo Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Logo
                </label>
                <label
                  htmlFor="logo-upload"
                  className="w-full flex flex-col sm:flex-row items-center justify-center px-4 py-3 bg-slate-800/60 border-2 border-dashed border-slate-600 rounded-lg text-gray-400 hover:text-white hover:border-blue-500 cursor-pointer transition-all"
                >
                  <UploadIcon />
                  <span className="truncate max-w-full sm:max-w-xs">
                    {data?.file?.name || "Choose a file"}
                  </span>
                </label>
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={onFilehandler}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              {loading ? (
                <div className="flex justify-center">
                  <AttractiveLoader />
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all transform hover:scale-105"
                >
                  UPDATE
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleCompany;
