import Cart from "../Models/Cart.js";

async function getUser(userId, guestID) {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestID) {
    return await Cart.findOne({ 
      guestID });
  }
  return null;
}



export default getUser;