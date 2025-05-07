import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Slice/authSlice"
import productReducer from "./Slice/product"
import cartReducer from "./Slice/CartSlice"
import checkoutReducer from "./Slice/CheckoutSlice"
import orderReducer from "./Slice/OrderSlice"
import adminReducer from "./Slice/AdminSlice"
import adminProductReducer from "./Slice/AdminProductSlice"
import adminOrderReducer from "./Slice/AdminOrderSlice"
export const store = configureStore({
  reducer: authReducer,
  products:productReducer,
  cart:cartReducer,
  checkout:checkoutReducer,
  order:orderReducer,
  adminProduct:adminProductReducer,
  adminOrderReducer:adminOrderReducer,
  admin:adminReducer


})
export default store;
