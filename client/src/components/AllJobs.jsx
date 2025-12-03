import React from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

const AllJobs = () => {
  const { allJobs, searchForTheJobUsingKeyword } = useSelector(
    (store) => store.job
  );

  // Filter the jobs based on the criteria from the Redux store
  const filteredJobs = allJobs?.filter((job) => {
    if (!job || typeof job !== "object") return false;

    const { Industry, Location, Salary } = searchForTheJobUsingKeyword;

    // Location filter
    const locationMatch =
      !Location ||
      job.location?.toLowerCase() === Location.toLowerCase();

    // Industry filter
    const industryMatch =
      !Industry ||
      job.category?.toLowerCase() === Industry.toLowerCase();

    // Salary filter
    let salaryMatch = true;
    if (Salary) {
      const salaryRange = Salary.replace(/LPA/i, "").trim().split("-");
      if (salaryRange.length === 2) {
        const minSalary = parseFloat(salaryRange[0]);
        const maxSalary = parseFloat(salaryRange[1]);
        const jobSalary = parseFloat(job.salary);

        if (
          !isNaN(minSalary) &&
          !isNaN(maxSalary) &&
          !isNaN(jobSalary) &&
          (jobSalary < minSalary || jobSalary > maxSalary)
        ) {
          salaryMatch = false;
        }
      }
    }

    return locationMatch && industryMatch && salaryMatch;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Filter Card */}
        <div className="lg:w-1/4 w-full">
          <FilterCard />
        </div>

        {/* Right Column: Job Listings */}
        <div className="lg:w-3/4 w-full">
          {filteredJobs?.length <= 0 ? (
            <div className="text-center py-20 bg-[#161B22] rounded-xl">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-200">
                No Jobs Found
              </h2>
              <p className="text-gray-500 mt-3 text-sm sm:text-base">
                No jobs match your current filters. Try clearing them or refining your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
