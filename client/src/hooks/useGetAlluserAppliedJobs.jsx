import { setAllAppliedJobs } from "../redux/jobslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from"react-redux";


const useGetappliedJobs = () => {
    const dispatch=useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res =await axios.get("/api/application/getAllAppliedJobs", {
          withCredentials: true,
        });
        if(res.data.success)
        {
          dispatch(setAllAppliedJobs(res.data.application))
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  },[dispatch]);
};
export default useGetappliedJobs;
