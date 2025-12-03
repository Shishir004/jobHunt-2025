import {createSlice} from "@reduxjs/toolkit"


const companySlice=createSlice({
    name:'comapny',
    initialState:{
        singleComapny:null,
        companiez:[],
        searchCompany:''
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleComapny=action.payload
        },
        setCompaniez:(state,action)=>{
            state.companiez=action.payload;
        },
        setSearchCompany:(state,action)=>{
            state.searchCompany=action.payload;
        }
    }
})
export const {setSingleCompany ,setCompaniez , setSearchCompany} = companySlice.actions;
export default companySlice.reducer;