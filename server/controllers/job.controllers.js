const Job = require("../models/job.model");

const postJob=async (req,res)=>{
    try {
        const {title,description,requirements,Salary,location,jobType,experience,companyId,position}=req.body;
        const userId=req.id;
        if(!title || !description || !requirements || !Salary || !experience || !location|| !jobType || !companyId || !position)
        {
            return res.status(400).json({message:"Enter every field",success:false});
        }
        const job =await Job.create({
            title,
            description,
            requirements : requirements.split(","),
            Salary,
            location,
            jobType,
            companyId,
            position,
            experience,
            createdBy:userId
        })
        return res.status(200).json({message:"Job posted successfully",job,success:true})

    } catch (error) {
        console.log(error);
    }
}
// student
// Assuming query params: ?keyword=...&location=...

const getAllJobs = async (req, res) => {
  try {
    const { keyword = "", location, jobType, minSalary, industry } = req.query;

    const query = {
      $and: [
        {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        },
      ],
    };

    if (location) {
      query.$and.push({ location: { $regex: location, $options: "i" } });
    }

    if (jobType) {
      query.$and.push({ jobType: jobType }); // Exact match
    }

    if (minSalary) {
      query.$and.push({ Salary: { $gte: parseInt(minSalary) } });
    }

    // Note: For filtering by company.industry, use match after populate
    const jobs = await Job.find(query)
      .populate({
        path: "companyId",
      })
      .sort({ createdAt: -1 });

    // If industry filter exists, manually filter jobs after populate
    const filteredJobs = industry
      ? jobs.filter(
          (job) =>
            job.companyId?.industry &&
            job.companyId.industry.toLowerCase() === industry.toLowerCase()
        )
      : jobs;

    return res.status(200).json({
      success: true,
      message: filteredJobs.length
        ? "Filtered jobs found"
        : "No jobs match the filters",
      jobs: filteredJobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// student
const getAllJobsById=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const jobs=await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!jobs)
        {
            return res.status(404).json({message:"job not found"})
        }
        return res.status(200).json({message:"job fetched",success:true,jobs});
    } catch (error) {
        
    }
}
// admin
const getAdminJobs=async(req,res)=>{
    try {
        const adminId=req.id;
        const jobs=await Job.find({createdBy:adminId}).populate({
            path:'companyId'
        })
        if(!jobs)
        {
            return res.status(404).json({message:"job not found"})
        }
        return res.status(200).json({message:"job fetched",success:true,jobs});
    } catch (error) {
        console.log(error);
    }
}
module.exports={postJob,getAllJobs,getAllJobsById,getAdminJobs};