import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    color: String,
    size: String,
    Image: String,
    price: String,
    quantity: { type: Number, default: 1 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  guestID: String,
  product: [cartItemSchema],
  totalPrice: { type: Number, default: 1 },
},{timestamps:true});

const Cart  = mongoose.model('Cart',cartSchema)
export default Cart;

