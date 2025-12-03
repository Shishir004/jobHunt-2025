import { setSingleCompany } from "../redux/companySlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewComapny = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    CompanyName: "",
  });

  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || "https://jobhunt-2025.onrender.com"}/api/company/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        const companyId = res.data.company._id;
        navigate(`/create/new/Company/${companyId}`);
        console.log("Company created successfully");
      }
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1a233a] to-[#101629] font-['Inter'] text-white px-4">
      <div className="w-full max-w-3xl p-6 sm:p-8 space-y-8 bg-[#1e2945] rounded-xl shadow-2xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            Your Company Name
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            What would you like to give your company name? You can change this later.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="company-name"
              className="text-sm font-medium text-gray-300"
            >
              Company Name
            </label>
            <input
              id="company-name"
              name="CompanyName"
              type="text"
              required
              className="w-full px-4 py-3 mt-2 bg-[#2a3858] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              placeholder="JobHunt, Microsoft etc."
              value={data.CompanyName}
              onChange={onChangeHandler}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-2 text-sm font-semibold text-gray-300 bg-transparent rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 transition duration-300"
              onClick={() => navigate("/admin/company")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition duration-300 shadow-lg shadow-blue-600/30"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewComapny;
