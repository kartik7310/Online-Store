import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

//function to get cart from localStorage
const getCartStorage = ()=>{
  const cartData =localStorage.getItem('Cart');
  return cartData?JSON.parse(cartData):{products:[]}
}

//save data to localStorage
const addCartStorage = (data)=>{
localStorage.setItem('Cart',JSON.stringify(data));

}

//fetch cart for a user or guest
export const fetchCart = createAsyncThunk("cart/fetchCart",async({userId,guestId},{rejectWithValue})=>{
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
      params:{userId,guestId}})
      return response.data
  } catch (error) {
    console.error(error);
     return rejectWithValue(error.response.data)
    
  }
})

//add cart for user or guest

export const addCart = createAsyncThunk("cart/addCart",async({ productId, color, size, guestID, quantity, userId }
  ,{rejectWithValue})=>{
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addCart`,{
      productId,color,size,guestID,quantity,userId
})
      return response.data
  } catch (error) {
    console.error(error);
     return rejectWithValue(error.response.data)
    
  }
})

//update the quantity of cart
export const updateCartQuantity = createAsyncThunk(
  'cart/updateCart',
  async ({ productId, quantity, color, size, guestID, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/updateCart`,
        { productId, quantity, color, size, guestID, userId }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//remove an item form cart

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async ({ productId, quantity, color, size, guestID, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/remove`,
        {
          data: { productId, quantity, color, size, guestID, userId }
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


//merge 


export const mergeCart = createAsyncThunk(
  'cart/merge',
  async ({userId,guestID }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/merge`,{userId,guestID},
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('userToken')}`
          }
        }
       
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: getCartStorage(),
    products: [],       
    loading: false,
    error: null,
  },
  reducers: {
    removeCart: (state) => {
      state.cart = { Product: [] };
      localStorage.removeItem('cart')
    },
  },
  extraReducers: (builder) => {
    builder
      // handle fetchProductByFilters
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message||"Failed to fetch cart ";
      })

      // handle addCart 
      .addCase(addCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload
      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message||"Failed to fetch cart ";
      })

      // handle updateQuantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message||"Failed to fetch cart ";
      })

      // handle removeCart
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message||"Failed to fetch cart ";
      })
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload
      })
      .addCase(merge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message||"Failed to fetch cart ";
      })
  },
});

export const{removeCart} = cartSlice.actions;
export default cartSlice.reducer