import axios from "axios";
import { setSingleJob } from "../redux/jobslice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const JobTag = ({ text, value }) => (
  <span className="text-xs sm:text-sm font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-md px-3 py-1 whitespace-nowrap">
    {text} {value}
  </span>
);

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;

      try {
        const res = await axios.get(`/api/job/getAllJobsById/${jobId}`, {
          withCredentials: true,
        });

        if (res.data?.success && res.data?.jobs) {
          const jobData = res.data.jobs;
          dispatch(setSingleJob(jobData));

          const applied = jobData.applications?.some(
            (application) =>
              application === user?._id || application.applicant === user?._id
          );

          setIsApplied(!!applied);
        } else {
          console.error("Job data not found:", res.data);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `/api/application/apply/job/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedApplications = [
          ...(singleJob.applications || []),
          { applicant: user?._id },
        ];
        dispatch(
          setSingleJob({ ...singleJob, applications: updatedApplications })
        );
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  return (
    <div className="mt-8 w-full max-w-5xl mx-auto bg-gray-800 p-5 sm:p-8 rounded-2xl shadow-2xl border border-gray-700/50 font-sans text-white">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="w-full sm:w-auto">
          <h2 className="text-2xl sm:text-3xl font-bold">{singleJob?.title}</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            <JobTag text={singleJob?.position} />
            <JobTag text={singleJob?.jobType} />
            <JobTag text={singleJob?.Salary} value="rs" />
          </div>
        </div>

        <button
          onClick={applyJobHandler}
          disabled={isApplied}
          className={`w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200 ${
            isApplied ? "cursor-not-allowed opacity-60" : ""
          }`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </button>
      </div>

      <div className="border-t border-gray-700/50 my-6"></div>

      {/* Job Details */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          Job Description
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-gray-300">
          <DetailItem label="Role" value={singleJob?.title} />
          <DetailItem label="Location" value={singleJob?.location} />
          <DetailItem
            label="Description"
            value={singleJob?.description}
            colSpan
          />
          <DetailItem label="Experience" value={singleJob?.experience} />
          <DetailItem label="Salary" value={`${singleJob?.Salary} rs`} />
          <DetailItem
            label="Total Applicants"
            value={singleJob?.applications?.length || 0}
          />
          <DetailItem
            label="Posted Date"
            value={singleJob?.createdAt?.split("T")[0]}
          />
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, colSpan }) => (
  <div className={`flex flex-col ${colSpan ? "md:col-span-2" : ""}`}>
    <span className="text-sm text-gray-400 font-semibold">{label}</span>
    <span className="text-base text-white mt-1 break-words">{value}</span>
  </div>
);

export default JobDescription;
