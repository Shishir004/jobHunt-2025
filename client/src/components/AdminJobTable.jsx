import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobTable = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  const handleDropdownToggle = (id) => {
    setOpenDropdownIndex(openDropdownIndex === id ? null : id);
  };

  useEffect(() => {
    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });

    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-slate-800/50">
            <tr>
              <th className="px-6 py-4">Company Name</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterJobs.length > 0 ? (
              filterJobs.map((job) => (
                <tr
                  key={job?._id}
                  className="border-b border-slate-700 hover:bg-slate-800/60 transition-colors duration-200"
                >
                  <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                    {job?.companyId?.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                    {job?.title}
                  </td>
                  <td className="px-6 py-4">{job?.createdAt.split('T')[0]}</td>
                  <td className="px-6 py-4 text-right relative">
                    <button
                      className="p-2 rounded-full hover:bg-slate-700 transition-colors duration-200"
                      onClick={() => handleDropdownToggle(job?._id)}
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    {openDropdownIndex === job?._id && (
                      <div className="absolute right-4 mt-2 bg-slate-800 text-white text-sm rounded shadow z-10">
                        <button
                          className="block px-4 py-2 hover:bg-slate-700 w-full text-left"
                          onClick={() => {
                            navigate(`/total/applicants/${job?._id}`);
                          }}
                        >
                          Show Total Applicants
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  A list of your recently posted jobs will appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {filterJobs.length > 0 ? (
          filterJobs.map((job) => (
            <div
              key={job?._id}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-semibold">{job?.title}</h3>
                  <p className="text-gray-400 text-sm">{job?.companyId?.name}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {job?.createdAt.split('T')[0]}
                  </p>
                </div>
                <div className="relative">
                  <button
                    className="p-2 rounded-full hover:bg-slate-700 transition-colors duration-200"
                    onClick={() => handleDropdownToggle(job?._id)}
                  >
                    <MoreHorizontal className="w-5 h-5 text-gray-300" />
                  </button>
                  {openDropdownIndex === job?._id && (
                    <div className="absolute right-0 mt-2 bg-slate-800 text-white text-sm rounded shadow z-10">
                      <button
                        className="block px-4 py-2 hover:bg-slate-700 w-full text-left"
                        onClick={() => {
                          navigate(`/total/applicants/${job?._id}`);
                        }}
                      >
                        Show Total Applicants
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500">
            A list of your recently posted jobs will appear here.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminJobTable;
