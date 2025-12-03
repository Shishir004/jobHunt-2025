import { createSlice } from "@reduxjs/toolkit";
const applicationSlice=createSlice({
    name:'application',
    initialState:{
        applications:[]
    },
    reducers:{
        setApplication:(state,action)=>{
            state.applications=action.payload
        }
    }
})
export const{setApplication}=applicationSlice.actions;
export default applicationSlice.reducer;
