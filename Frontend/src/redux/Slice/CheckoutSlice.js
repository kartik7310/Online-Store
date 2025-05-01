import { createSlice,createAsyncThunk, isRejected } from "@reduxjs/toolkit";

import axios from "axios";
const createCheckout = createAsyncThunk("checkout/create",async(checkoutData,{rejectWithValue})=>{
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{checkoutData},{headers:{
      Authorization:`Bearer${localStorage.getItem('userToken')}`
    }});
    return response.data
  } catch (error) {
    console.error(error)
    rejectWithValue(error.response.data)
  }
})


const checkOutSlice  = createSlice({
  name:'checkout',
  initialState:{
    checkout:null,
    loading:false,

    error:null
  },
    reducers:{},
    extraReducers:(builder)=>{
     builder.addCase(checkout.pending,(state)=>{
      state.loading=true,
      state.error= null
      
     })  
     builder.addCase(checkout.fulfilled,(state,action)=>{
  state.loading =false
      state.checkout= action.payload

     })  
     builder.addCase(checkout.reject,(state)=>{
      state.loading=false,
      state.error= action.payload.error


     })  
    }
})
export default checkOutSlice.reducer;