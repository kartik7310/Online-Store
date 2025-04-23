import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {

    email: {
      type: String,
      required: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please provide a valid email'],
      unique: true,
    },
   subscribeAt:{type:Date,default:Date.now}
  },
  { timestamps: true }
);
const subscribe = mongoose.model('Subscribe',subscriberSchema)
export default subscribe;