import React, { useState } from "react";
import AppliedTable from "./Table";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetappliedJobs from "../hooks/useGetAlluserAppliedJobs";

// --- SVG Icon Components ---
const UserIcon = ({ className, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const EditIcon = ({ className, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const MailIcon = ({ className, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const PhoneIcon = ({ className, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const FileTextIcon = ({ className, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <line x1="10" y1="9" x2="8" y2="9"></line>
  </svg>
);

const SkillTag = ({ skill }) => (
  <span className="bg-gray-700 text-gray-300 text-xs sm:text-sm font-medium mr-2 mb-2 px-3 sm:px-4 py-1.5 rounded-full border border-gray-600 hover:bg-gray-600 transition-all duration-200">
    {skill}
  </span>
);

const Profile = () => {
  useGetappliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-8 rounded-2xl shadow-2xl border border-gray-700/50 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 sm:p-4 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 shadow-lg">
            <UserIcon className="text-white" size={28} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white break-words">{user?.fullName}</h2>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-medium text-sm sm:text-base">
              {user?.role}
            </p>
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors duration-200"
        >
          <EditIcon size={20} />
        </button>
      </div>

      {/* Bio */}
      <p className="text-gray-300 mb-8 leading-relaxed text-sm sm:text-base">{user?.profile?.bio}</p>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
        <div className="flex items-center text-gray-300 text-sm sm:text-base break-words">
          <MailIcon size={18} className="mr-4 text-gray-500" />
          <span>{user?.email}</span>
        </div>
        <div className="flex items-center text-gray-300 text-sm sm:text-base break-words">
          <PhoneIcon size={18} className="mr-4 text-gray-500" />
          <span>{user?.phoneNumber}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-8">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Skills</h3>
        <div className="flex flex-wrap">
          {Array.isArray(user?.profile?.skills) &&
            user.profile.skills.map((skill, index) => (
              <SkillTag key={index} skill={skill} />
            ))}
        </div>
      </div>

      {/* Resume */}
      <div className="mt-10">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Resume</h3>
        <div className="flex flex-col sm:flex-row sm:items-center p-4 bg-gray-900/70 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors duration-300 gap-4 sm:gap-0">
          <div className="flex items-center">
            <FileTextIcon size={24} className="text-purple-400 mr-4" />
            <span className="text-gray-200 font-medium text-sm sm:text-base truncate">
              {user?.profile?.resumeName}.pdf
            </span>
          </div>
          {user?.profile?.resume?.length > 0 && (
            <a
              href={user?.profile?.resume[0]?.replace("/upload/", "/upload/fl_attachment/")}
              download
              rel="noopener noreferrer"
              className="sm:ml-auto"
            >
              <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto">
                Download
              </button>
            </a>
          )}
        </div>
      </div>

      {/* Applied Jobs Table */}
      <div className="mt-8 overflow-x-auto">
        <AppliedTable />
      </div>

      {/* Update Profile Modal */}
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
