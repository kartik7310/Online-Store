import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";

import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const token = `Bearer${localStorage.getItem("userToken")}`

//async thunk for get product used by admin only
const fetchProduct = createAsyncThunk(
  "admin/fetchProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/product`,
        {
          headers: {
            Authorization:token ,
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

//async thunk for update product admin only
const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async (productId,productData, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/product/${productId}`,productData,
        {
          headers: {
            Authorization:token ,
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

//async thunk for create product admin only
const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/product/create`,productData,
        {
          headers: {
            Authorization:token ,
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

//async thunk for update product admin only
const deleteProduct = createAsyncThunk(
  "admin/updateProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/admin/product/${productId}`,
        {
          headers: {
            Authorization:token ,
          },
        }
      );
      return productId
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
    // handle fetch product
    builder
    .addCase(fetchProduct.pending, (state) => {
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
    
    //handle createProduct
    .addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = push(action.payload)
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message||"Failed to fetch cart ";
    })

    //handleUpdate product
    .addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      const data = action.payload;
      const index = state.product.findIndex((product)=>product._id===data._id);
      if(index !==-1){
        state.product[index] = data
      }
    })
    .addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message||"Failed to fetch cart ";
    })

    //handle delete product
    .addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      
    const data = action.payload;
     state.product = state.product.filter((product)=>product._id !==data._id)
     
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message||"Failed to fetch cart ";
    })
   }
})
export default adminProductSlice.reducer;