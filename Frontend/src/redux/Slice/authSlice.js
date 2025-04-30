import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//reterive the user from localStorage if present

const userFormLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//guestId also retrival

const guestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", guestId);

//initial  state
const initialState = {
  user: userFormLocalStorage,
  guestId: guestId,
  loading: false,
  error: null,
};

// async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      console.log(userData);

      const response = await axios.post(
        "http://localhost:8000/api/v1/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.user);

      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.user.token);

      return response.data.user; //return user object from response
    } catch (error) {
      console.log(error.response.data);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registration = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      console.log(userData);
      
      const response = await axios.post(
        "http://localhost:8000/api/v1/register",
        userData
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      console.log(response.error.data.message);
      
      return rejectWithValue(error.response.data.message);
    }
  }
);

//slice

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.data = null;
      state.guestId = `guest_${new Date().getTime()}`; //reset guestId on logout
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
