import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useAdminJobs from '../hooks/useAdminJobs';
import { setSearchJobByText } from '../redux/jobslice';
import AdminJobTable from './AdminJobTable';

const AdminJobs = () => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState('');
  const dispatch = useDispatch();

  useAdminJobs(); // Custom hook to fetch jobs

  useEffect(() => {
    dispatch(setSearchJobByText(filterData));
  }, [filterData, dispatch]);

  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-slate-900/50">
      {/* Search and Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Filter by role"
            value={filterData}
            onChange={(e) => setFilterData(e.target.value)}
            className="w-full bg-slate-900/70 border border-slate-700 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 transition-colors duration-200"
          />
        </div>

        {/* Post Jobs Button */}
        <button
          onClick={() => navigate('/admin/jobs/post')}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Post Jobs
        </button>
      </div>

      {/* Table Wrapper for Mobile Scroll */}
      <div className="overflow-x-auto">
        <AdminJobTable />
      </div>
    </div>
  );
};

export default AdminJobs;
