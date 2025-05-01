import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";

import axios from "axios";

//async thunk for get user used by admin
const getUser = createAsyncThunk(
  "admin/user",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/user`,
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

//async thunk for create user used by admin
const createUser = createAsyncThunk(
  "admin/user",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/create-user`,userData,
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

//async thunk for update user info used by admin
const updateUser = createAsyncThunk(
  "admin/user",
  async ({id,name,email,role}, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/user/${id}`,{name,email,role},
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

//async hunk for delete userinfo
const deleteUser = createAsyncThunk(
  "admin/user",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}`,
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

const adminSlice = createSlice({
  name:'admin',
  initialState:{
    user:[],
    error:null,
    loading:false
  }, 
   reducers:{},
   extraReducers:(builder)=>{
   builder
         // handle user
         .addCase(getUser.pending, (state) => {
           state.loading = true;
           state.error = null;
         })
         .addCase(getUser.fulfilled, (state, action) => {
           state.loading = false;
           state.user = action.payload
         })
         .addCase(getUser.rejected, (state, action) => {
           state.loading = false;
           state.error = action.error.message||"Failed to fetch cart ";
         })
         // handle addUser
         .addCase(createUser.pending, (state) => {
           state.loading = true;
           state.error = null;
         })
         .addCase(createUser.fulfilled, (state, action) => {
           state.loading = false;
           state.user = action.payload
         })
         .addCase(createUser.rejected, (state, action) => {
           state.loading = false;
           state.error = action.error.message||"Failed to fetch cart ";
         })
         // handle update
         .addCase(updateUser.pending, (state) => {
          state.loading = true
           state.error = null;
         })
         .addCase(updateUser.fulfilled, (state, action) => {
          const updateUser = action.payload
          const index= state.user.findIndex((user)=>user._id===updateUser._id)
          if(index !==-1){
           state.user[index] = updateUser
          }
         })
         .addCase(updateUser.rejected, (state, action) => {
           state.loading = false;
           state.error = action.error.message||"Failed to fetch cart ";
         })
         // handle remove user
         .addCase(deleteUser.pending, (state) => {
           state.loading = true;
           state.error = null;
         })
         .addCase(deleteUser.fulfilled, (state, action) => {
           state.user = action.filter.findIndex((user)=>user._id !==action.payload)

         })
         .addCase(deleteUser.rejected, (state, action) => {
           state.loading = false;
           state.error = action.error.message||"Failed to fetch cart ";
         })
        
   }
})

export default adminSlice.reducer;