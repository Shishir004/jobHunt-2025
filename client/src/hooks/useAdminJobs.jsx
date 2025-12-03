import axios from 'axios';
import { setAllAdminJobs, setAllJobs } from '../redux/jobslice'
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useAdminJobs = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchALLjobs=async()=>{
            try {
                const res=await axios.get("http://localhost:3000/api/job/getAdminJobs",{withCredentials:true})
                if(res.data.success)
                {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchALLjobs();
    },[])
}

export default useAdminJobs