import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const token = `Bearer ${localStorage.getItem("userToken")}`;

// Get Orders
export const getOrders = createAsyncThunk(
  "AdminOrder/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admin/fetch-orders`, {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Status
export const updateOrderStatus = createAsyncThunk(
  "AdminOrder/update-status",
  async ({ orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/admin/update-status/${orderId}`,
        { status: orderStatus },
        { headers: { Authorization: token } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete Order
export const deleteOrder = createAsyncThunk(
  "AdminOrder/delete",
  async (orderId, { rejectWithValue }) => {
    try {
 await axios.delete(
        `${BACKEND_URL}/api/admin/delete-order/${orderId}`,
        { headers: { Authorization: token } }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "AdminOrder",
  initialState: {
    orders: [],
    error: null,
    totalOrders: 0,
    totalSales: 0,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
      //calculate the total sales
      const totalSales = action.payload.reduce((acc,order)=>{
        return acc + order.totalPrice
      },0)
      state.totalSales = totalSales
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Order Status  
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
       const updateOrder = action.payload;
       const index = state.orders.findIndex((product)=>product._id===updateOrder._id)
       if(index !==-1){
        state.orders[index]=updateOrder
       }
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(order => order._id !== action.payload.orderId);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;
