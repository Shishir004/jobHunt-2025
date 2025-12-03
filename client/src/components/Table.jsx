import { useEffect } from "react";
import useGetappliedJobs from "../hooks/useGetAlluserAppliedJobs";
import { useSelector } from "react-redux";

const CheckCircleIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);
const XCircleIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
);
const ClockIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const AwardIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 17 17 23 15.79 13.88"></polyline></svg>
);
const CalendarIcon = ({ className, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);
const BriefcaseIcon = ({ className, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
);
const BuildingIcon = ({ className, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
);

const Table = ({ children, ...props }) => <table {...props}>{children}</table>;
const TableCaption = ({ children, ...props }) => <caption {...props}>{children}</caption>;
const TableHeader = ({ children, ...props }) => <thead {...props}>{children}</thead>;
const TableHead = ({ children, ...props }) => <th {...props}>{children}</th>;
const TableRow = ({ children, ...props }) => <tr {...props}>{children}</tr>;
const TableBody = ({ children, ...props }) => <tbody {...props}>{children}</tbody>;
const TableCell = ({ children, ...props }) => <td {...props}>{children}</td>;

const Badge = ({ status }) => {
  const getStatusInfo = (status) => {
    switch (status.toLowerCase()) {
      case 'selected':
        return { icon: <CheckCircleIcon size={16} />, className: 'bg-green-500/10 text-green-400 border-green-500/20' };
      case 'pending':
        return { icon: <ClockIcon size={16} />, className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' };
      case 'rejected':
        return { icon: <XCircleIcon size={16} />, className: 'bg-red-500/10 text-red-400 border-red-500/20' };
      default:
        return { icon: null, className: 'bg-gray-500/10 text-gray-400 border-gray-500/20' };
    }
  };
  const statusInfo = getStatusInfo(status);
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border ${statusInfo.className}`}>
      {statusInfo.icon}
      {status}
    </span>
  );
};

const AppliedTable = () => {
  useGetappliedJobs();
  const { allAppliedJobs } = useSelector((store) => store.job);

  if (allAppliedJobs.length === 0) {
    return <div className="text-white mt-10 text-center px-4">Fetching your applied jobs...</div>;
  }

  return (
    <div className="mt-12 w-full px-2 sm:px-4 lg:px-8">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full text-left min-w-[500px] sm:min-w-[600px]">
            <TableCaption className="p-4 sm:p-5 text-base sm:text-lg font-semibold text-left text-white bg-gray-900/50">
              A list of your applied jobs
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="p-3 sm:p-5 text-xs sm:text-sm font-semibold text-gray-400 tracking-wider whitespace-nowrap">
                  <CalendarIcon size={16} className="inline mr-2" />Date
                </TableHead>
                <TableHead className="p-3 sm:p-5 text-xs sm:text-sm font-semibold text-gray-400 tracking-wider whitespace-nowrap">
                  <BriefcaseIcon size={16} className="inline mr-2" />Job Role
                </TableHead>
                <TableHead className="p-3 sm:p-5 text-xs sm:text-sm font-semibold text-gray-400 tracking-wider whitespace-nowrap">
                  <BuildingIcon size={16} className="inline mr-2" />Company
                </TableHead>
                <TableHead className="p-3 sm:p-5 text-xs sm:text-sm font-semibold text-gray-400 tracking-wider">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-800">
              {allAppliedJobs.map((j) => (
                <TableRow key={j?._id} className="hover:bg-gray-900/50 transition-colors duration-200">
                  <TableCell className="p-3 sm:p-5 text-gray-300 text-sm">{j?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                  <TableCell className="p-3 sm:p-5 font-medium text-white text-sm">{j?.job?.title || "N/A"}</TableCell>
                  <TableCell className="p-3 sm:p-5 text-gray-300 text-sm">{j?.job?.companyId?.name || "N/A"}</TableCell>
                  <TableCell className="p-3 sm:p-5">
                    <Badge status={j?.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AppliedTable;
