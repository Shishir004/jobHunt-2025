import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import Job from './Job';                     // This is your component for a single job card
import useGetALLjobs from '../hooks/useGetALLjobs';
import { setSearchForTheJobUsingKeyword } from '../redux/jobslice';

const Browse = () => {
  // Get the array of jobs from your Redux store
  const dispatch=useDispatch();
  const { allJobs } = useSelector((store) => store.job);
  useGetALLjobs();
  useEffect(()=>{
    return(()=>{
      dispatch(setSearchForTheJobUsingKeyword(''))
    })
  })
  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="font-bold text-xl my-10">
        {/* Use the actual array's length */}
        Search Results ({allJobs ? allJobs.length : 0})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Map over the 'allJobs' array, not the 'Job' component */}
        {allJobs && allJobs.map((job) => (
          // For each job object in the array, render the Job component
          <Job key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Browse;