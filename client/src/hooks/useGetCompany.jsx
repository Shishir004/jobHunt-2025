import axios from 'axios';
import { setAllJobs } from '../redux/jobslice'
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetCompany = (companyId) => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchSingleCompany=async()=>{
            try {
                const res=await axios.get(`https://jobhunt-2025.onrender.com/api/company/${companyId}`,{withCredentials:true})
                if(res.data.success)
                {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleCompany();
    },[companyId , dispatch])
}

export default useGetCompany