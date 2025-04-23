import Cart from "../Models/Cart.js";
import Product from "../Models/Product.js";
import getUser from "../Utils/helper.js";

async function createCart(req, res) {
  try {
    const { productId, color, size, guestID, quantity, userId } = req.body;

    if (!productId || !color || !size || !quantity) {
      return res.status(400).json("All details are mandatory");
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json("Product not found");
    }

    let cart = await getUser(userId, guestID); // ✅ Will return cart if exists
    console.log(cart);

    if (cart) {
      const productIndex = cart.product.findIndex(
        (p) =>
          p.productId.toString() === productId.toString() &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        cart.product[productIndex].quantity = quantity;
      } else {
        cart.product.push({
          productId,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      cart.totalPrice = cart.product.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        user: userId || undefined,
        guestID: guestID || "guest_" + new Date().getTime(),
        product: [
          {
            productId,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.status(200).json(newCart);
    }
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

//update the quantity controller;
async function updateCart(req, res) {
  try {
    const { productId, quantity, color, size, guestID, userId } = req.body;
    let cart = await getUser(userId, guestID);
    console.log(cart);

    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }
    console.log(cart);

    const findIndex = cart.product.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (findIndex > -1) {
      //update quantity
      if (quantity > 0) {
        cart.product[findIndex].quantity = quantity;
      } else {
        cart.product.splice(findIndex, 1); // remove product if quantity is zero
      }

      cart.totalPrice = cart.product.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json("product not found in cart");
    }
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

//delete cart
async function deleteCart(req, res) {
  try {
    const { productId, quantity, color, size, guestID, userId } = req.body;
    let cart = await getUser(userId, guestID);
    console.log(cart);

    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }
    const productIndex = cart.product.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      //delete product from cart
      cart.product.splice(productIndex, 1);
      cart.totalPrice = cart.product.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json("cart not found");
    }
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function getCart(req, res) {
  try {
    const { userId, guestID } = req.query;
    const cart = await getUser(userId, guestID);
    if (!cart) {
      return res.status(404).json("cart not found");
    }
    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

//post route
//merge  guest cart into user on  login

async function merge(req,res) {
  const{guestID} = req.body;
  const {userID} = req.user
  try {
   const guestCart = await Cart.findOne({guestID})
   const userCart = await Cart.findOne({user:userID})
   if(guestCart.product.length===0){
    return res.status(400).json("Guest cart are empty")
   }
   if(userCart){
    
   }
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
export { createCart, updateCart, deleteCart,getCart };
