import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CompaniesTable = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const { companiez, searchCompany } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companiez);

  const handleDropdownToggle = (id) => {
    setOpenDropdownIndex(openDropdownIndex === id ? null : id);
  };

  const handleDeleteJobs = async (userID) => {
    try {
      const res = await axios.delete(
        `https://jobhunt-2025.onrender.com/api/company/delete/${userID}`,
        { withCredentials: true }
      );
      setFilterCompany((prev) => prev.filter((c) => c._id !== userID));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const myfilteredcompanies = companiez.filter((c) => {
      if (!searchCompany) return true;
      return c?.name?.toLowerCase().includes(searchCompany.toLowerCase());
    });
    setFilterCompany(myfilteredcompanies);
  }, [companiez, searchCompany]);

  return (
    <div className="w-full">
      {/* Desktop & Tablet Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300 min-w-[600px]">
          <thead className="text-xs text-gray-400 uppercase bg-slate-800/50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4">Logo</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterCompany.length > 0 ? (
              filterCompany.map((company) => (
                <tr
                  key={company?._id}
                  className="border-b border-slate-700 hover:bg-slate-800/60 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <img
                      src={company.logo}
                      alt="logo"
                      className="h-10 w-10 object-contain rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                    {company?.name}
                  </td>
                  <td className="px-6 py-4">
                    {company?.createdAt.split("T")[0]}
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button
                      className="p-2 rounded-full hover:bg-slate-700 transition-colors duration-200"
                      onClick={() => handleDropdownToggle(company?._id)}
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    {openDropdownIndex === company?._id && (
                      <div className="absolute right-4 mt-2 bg-slate-800 text-white text-sm rounded shadow z-10 min-w-[100px]">
                        <button
                          className="block px-4 py-2 hover:bg-slate-700 w-full text-left"
                          onClick={() => {
                            handleDeleteJobs(company?._id);
                            setOpenDropdownIndex(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  A list of your recent registered companies will appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {filterCompany.length > 0 ? (
          filterCompany.map((company) => (
            <div
              key={company?._id}
              className="bg-slate-800 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={company.logo}
                  alt="logo"
                  className="h-12 w-12 object-contain rounded-full"
                />
                <div>
                  <h3 className="text-white font-semibold">{company?.name}</h3>
                  <p className="text-gray-400 text-xs">
                    {company?.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-slate-700 transition-colors duration-200"
                  onClick={() => handleDropdownToggle(company?._id)}
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                {openDropdownIndex === company?._id && (
                  <div className="absolute right-0 mt-2 bg-slate-800 text-white text-sm rounded shadow z-10 min-w-[100px]">
                    <button
                      className="block px-4 py-2 hover:bg-slate-700 w-full text-left"
                      onClick={() => {
                        handleDeleteJobs(company?._id);
                        setOpenDropdownIndex(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No registered companies found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CompaniesTable;
