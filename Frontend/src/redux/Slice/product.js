import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//async thunk for fetch products by collection and optional filters
export const fetchProductByFilters = createAsyncThunk("products/fetchFilters",async({
  Collection,
  size,
  color,
  gender,
  minPrice,
  maxPrice,
  sortBy,
  search,
  category,
  material,
  brand,

})=>{
  const query = new URLSearchParams();
  if(Collection) query.append("collection",Collection);
  if(size) query.append("size",size);
  if(color) query.append("color",color);
  if(gender) query.append("gender",gender);
  if(minPrice) query.append("minPrice",minPrice);
  if(maxPrice) query.append("maxPrice",maxPrice);
  if(sortBy) query.append("sortBy",sortBy);
  if(search) query.append("search",search);
  if(category) query.append("category",category);
  if(material) query.append("material",material);
  if(brand) query.append("brand",brand);
const response =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`)
return response.data;

})

//async thunk to fetch single product by id
export const fetchProductDetails = createAsyncThunk("products/fetchFilters",async(id)=>{
const response   = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
return response.data;
})

//async thunk to update product data
export const updateProduct = createAsyncThunk("product/update",async({id,productData})=>{
  const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,productData,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('userToken')}`
    }
  });

  return response.data
  
})

// async thunk for similar product
export const similarProduct = createAsyncThunk("product/update",async(id)=>{
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`)

  return response.data;
})

//slice for product
const productSlice = createSlice({
  name:'product',
  initialState:{
    products:[],
    selectedProduct:null, //store the details of single product
    similarProduct:[],
    loading:false,
    error:null,
    filters:{
      category:'',
      Collection:'',
      size:'',
      color:'',
      gender:'',
      minPrice:'',
      maxPrice:'',
      sortBy:'',
      search:'',
      category:'',
      material:'',
      brand:'',

    }
  }
,
reducers:{
  setFilters:(state,action)=>{
    state.filters = {...state.filters,...action.data}
  },
  clearFilters: (state,action)=>{
    state.filters = {
      category:'',
      Collection:'',
      size:'',
      color:'',
      gender:'',
      minPrice:'',
      maxPrice:'',
      sortBy:'',
      search:'',
      category:'',
      material:'',
      brand:'',

    }
  }
  },
 extraReducers: (builder) => {
    builder
     //handle fetchProduct with filter
      .addCase(fetchProductByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload)?action.data:[]
      })
      .addCase(fetchProductByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     //handle  fetch single product with details

     .addCase(fetchProductDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
     })
     .addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = Array.isArray(action.payload)?action.data:[]
     })
     .addCase(fetchProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
     })
      //handle update product
    .addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.updateProduct = action.payload;
      const index = state.updateProduct.findIndex((product)=>product._id ===updateProduct._id);
      if(index!==-1){
        state.updateProduct[index]= updateProduct
      }
    })
    .addCase(fetchProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
      //handle similar product
    .addCase(similarProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(similarProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.similarProduct =action.payload
     
    })
    .addCase(similarProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
  },

})

export const{setFilters,clearFilters} = productSlice.actions;
export default productSlice.reducer;
