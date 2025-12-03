import axios from 'axios';
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setCompaniez } from '../redux/companySlice';

const useGetAllCompanies = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchSingleCompany=async()=>{
            try {
                const res=await axios.get(`http://localhost:3000/api/company/get`,{withCredentials:true})
                if(res.data.success)
                {
                    dispatch(setCompaniez(res.data.companies));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleCompany();
    },[])
}

export default useGetAllCompanies