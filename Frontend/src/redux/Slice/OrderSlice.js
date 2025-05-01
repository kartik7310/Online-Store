import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";

import axios from "axios";

const fetchUserOrder = createAsyncThunk(
  "order/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/my-order`,
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

const getOrderDetails = createAsyncThunk(
  "order/details",
  async (orderID, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/${orderID}`,
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

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],       
    loading: false,
    error: null,
    totalOrders: 0,      
    orderDetails: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchUserOrder
      .addCase(fetchUserOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      })

      // Handle getOrderDetails
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload; 
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch order details";
      });
  }
});

export default orderSlice.reducer;