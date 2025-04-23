import mongoose from "mongoose";

const checkoutItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    quantity: { type: Number },
  },
  { _id: false }
);
const checkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  checkoutItems: { type: [checkoutItemSchema], required: true },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod:{type:String,required:true},
  totalPrice:{type:Number,required:true},
  isPaid:{type:Boolean,default:false},
  paidAt:{type:Date},
  paymentStatus:{type:String,default:"pending"},
  paymentDetails:{type:mongoose.Schema.Types.Mixed},//store paypal-related details (transaction ID ,paypal response)
  isFinalized:{type:Boolean,default:false},
  finalizedAt:{type:Date}

},{timestamps:true})

const Checkout  = mongoose.model('Checkout',checkoutSchema)
export default Checkout;