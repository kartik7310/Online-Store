import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";

import axios from "axios";

//async thunk for get product used by admin only
const fetchProduct = createAsyncThunk(
  "admin/product",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/product`,
        {
          headers: {
            Authorization: `Bearer${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data
    } catch (error) {
      console.error(error);
      rejectWithValue(error.response.data)
    }
  }
);

const adminProductSlice = createSlice({
  name:'adminProduct',
  initialState:{
    product:[],
    error:null,
    loading:false
  }, 
   reducers:{},
   extraReducers:(builder)=>{
    // handle user
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload
    })
    .addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message||"Failed to fetch cart ";
    })
   }
})
export default adminProductSlice.reducer;