import Order from "../Models/OrderItem.js";

async function MyOrder(req, res) {
  try {
    const { id: userId } = req.user;
    if (!userId) {
      return res.status(400).json("userId not provide");
    }
    const order = await Order.find({ user: userId }).sort({ createAt: -1 });
    if (!order) {
      return res.status(404).json("order not found");
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching similar products:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function getOrderById(req, res) {
  try {
    const { id: userId } = req.user;
    if (!userId) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const { orderId } = req.params;
    if (!orderId) {
      return res.status(400).json({ message: "Order ID not provided" });
    }

    const orderDetails = await Order.findOne({
      _id: orderId,
      user: userId,
    }).populate("user", "name email"); // Populate user details

    if (!orderDetails) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(orderDetails);
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export { MyOrder, getOrderById };
