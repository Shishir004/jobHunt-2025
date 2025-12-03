const Company = require("../models/company.model");
const getDatauri=require('../utils/datauri')
const cloudinary = require("../utils/cloudinary");

// const registerCompany = async (req, res) => {
//   try {
//     const { CompanyName } = req.body;
//     if (!CompanyName) {
//       return res.status(400).json({ message: "please provide the details" });
//     }
//     let company = await Company.findOne({ CompanyName });
//     if (company) {
//       return res
//         .status(400)
//         .json({ message: "Company Already exist", success: false });
//     }
//     company = await Company.create({
//       name: CompanyName,
//       userId: req.id,
//     });
//     return res
//       .status(200)
//       .json({
//         message: "Company registered successfully",
//         company,
//         success: true,
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };


const registerCompany = async (req, res) => {
  try {
    const CompanyName = req.body.CompanyName || req.body.name || req.body.companyName;
    const name = CompanyName && String(CompanyName).trim().toLowerCase();

    if (!name) {
      return res.status(400).json({ message: "Please provide the company name", success: false });
    }

    // ensure authenticated
    const userId = req.id || (req.user && (req.user.id || req.user._id));
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: login required", success: false });
    }

    // duplicate check uses DB field `name`
    const existing = await Company.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Company already exists", success: false });
    }

    const company = await Company.create({ name, userId });
    return res.status(201).json({ message: "Company registered successfully", success: true, company });
  } catch (error) {
    console.error("registerCompany error:", error);
    // handle duplicate race-condition when unique index exists
    if (error.code === 11000) {
      return res.status(400).json({ message: "Company already exists", success: false });
    }
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId }).sort({createdAt:-1});
    if (!companies) {
      return res.status(400).json({ message: "Company not found created" });
    }
    return res
      .status(200)
      .json({ message: "Company found sucessfully", success: true, companies });
  } catch (error) {
    console.log(error);
  }
};
const getCompanyById = async (req, res) => {
  try {
    const Companyid = req.params.id;
    const company = await Company.findById(Companyid);
    if (!company) {
      res.status(400).json({ message: "Couldn't not found Comapny with this id" });
    }
    return res
      .status(200)
      .json({ message: "Company found Sucessfully", company });
  } catch (error) {
    console.log(error);
  }
};
const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    let logo;

    // ✅ only upload if file exists
    if (file) {
      const fileUri = getDatauri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    if (!name || !description) {
      return res.status(400).json({ message: "Couldn't update Information" });
    }

    // Include logo only if available
    const data = {
      name,
      description,
      website,
      location,
      ...(logo && { logo }),
    };

    const updatedData = await Company.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!updatedData) {
      return res.status(400).json({ message: "Couldn't update the data" });
    }

    return res.status(200).json({
      message: "Data updated successfully",
      updatedData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCompany=async (req,res)=>{
  const companyId=req.params.id;
  if(!companyId)
  {
    return res.status(400).json({message:"company not found", success:false})
  }
  const deleteCompany=await Company.findByIdAndDelete(companyId);
  if(!deleteCompany)
  {
    return res.status(400).json({message:"can not delete company",success:false})
  }
  return res.status(200).json({message:"company deleted successfully"})
}
module.exports = { registerCompany, getCompany, getCompanyById, updateCompany , deleteCompany};