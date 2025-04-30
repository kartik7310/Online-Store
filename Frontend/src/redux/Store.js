import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Slice/authSlice"
export const store = configureStore({
  reducer: {authReducer},
})
export default store;
