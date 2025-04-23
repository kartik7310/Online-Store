
import Checkout from "../Models/CheckoutItems.js";
import Order from "../Models/OrderItem.js";
import Cart from "../Models/Cart.js";
//post route
//crete checkout a new checkout session
//protected route
async function createCheckout(req, res) {
  const { checkoutItems, paymentMethod, shippingAddress, totalPrice } = req.body;
  const { id: userId } = req.user;

  if (!Array.isArray(checkoutItems) || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: userId,
      checkoutItems,
      paymentMethod,
      totalPrice,
      shippingAddress,
      paymentStatus: "pending",
      isPaid: false,
    });

    console.log(`Checkout session created for user: ${userId}`);

    return res.status(200).json(newCheckout);
  } catch (error) {
    console.error("Error creating checkout:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

//route put /api/checkout/:id/pay
// update checkout to mark as paid after complete successful payment
async function updateCheckout(req, res) {
  const { paymentDetails, paymentStatus } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID not provided" });
  }

  try {
    const checkout = await Checkout.findById(id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();

      await checkout.save();
      return res.status(200).json(checkout);
    } else {
      return res.status(400).json({ message: "Invalid payment status" });
    }
  } catch (error) {
    console.error("Error updating checkout:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

//route post /api/checkout/:id/finalize
//finalize and checkout and convert to an order after payment confirmation
//route private

async function finalized(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID not provided" });
    }

    let checkout = await Checkout.findById(id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout does not exist" });
    }

    if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout is already finalized" });
    }

    if (!checkout.isPaid) {
      return res.status(400).json({ message: "Checkout is not paid" });
    }

    if (!checkout.checkoutItems || checkout.checkoutItems.length === 0) {
      return res.status(400).json({ message: "No items in checkout" });
    }

    const finalOrder = await Order.create({
      user: checkout.user,
      paymentMethod: checkout.paymentMethod,
      shippingAddress: checkout.shippingAddress,
      orderItems: checkout.checkoutItems,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      isDelivered: false,
      paymentStatus: checkout.paymentStatus,
      paymentDetails: checkout.paymentDetails,
    });
      
      
    checkout.isFinalized = true;
    checkout.finalizedAt = Date.now();
    await checkout.save();

    await Cart.findOneAndDelete({ user: checkout.user });

    return res.status(200).json(finalOrder);
  } catch (error) {
    console.error("Error finalizing order:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export { createCheckout, updateCheckout,finalized  };
