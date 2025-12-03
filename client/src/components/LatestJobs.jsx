// LatestJobs.jsx
import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const navigate=useNavigate();

  return (
    <div className="bg-slate-900 text-white py-20" onClick={()=>{navigate('/all/jobs')}}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text">
            Latest & Top
          </span>{" "}
          Job Openings
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allJobs.length <= 0 ? (
            <span>There are no jobs</span>
          ) : (
            allJobs.map((job) => (
              <JobCard
                key={job._id}
                companyName={job?.companyId?.name} 
                location={job.location}
                jobTitle={job.title}
                description={job.description}
                tags={[
                  { text: job.jobType, color: "blue" },
                  { text: `Experience: ${job.experience}+ yrs`, color: "red" },
                  { text: `Openings: ${job.position}`, color: "purple" },
                ]}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
