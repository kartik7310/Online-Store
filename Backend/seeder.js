import mongoose from "mongoose";
import Product from "./src/Models/Product.js";
import products from "./src/data/products.js";
import User from "./src/Models/User.js";
import Cart from "./src/Models/Cart.js";
const mongodbURL ='mongodb://localhost:27017/onlineStore';
mongoose.connect(mongodbURL)
async function seedData(){
  try {
    //clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    //create a default admin user
    const createUser = await User.create({
      name:'Admin User',
      email:'admin@example.com',
      password:'123456',
      role:'admin'

    })

    //assign the default user Id to each product
    const userId = createUser._id
    const sampleProduct  = products.map((product)=>{
      return {...product,user:userId}
    })

    //insert the products into the database
    await Product.insertMany(sampleProduct)
    console.log("product data seed successfully");
    process.exit();
    
  } catch (error) {
    console.log('Error seeding the data',error)
    process.exit(1)
  }
}
seedData()