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

})
