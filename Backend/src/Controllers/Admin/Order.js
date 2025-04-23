import Order from "../../Models/OrderItem.js";
async function getOrder(req,res) {
  try {
    const order = await Order.find({})
    if(order.length===0){
      return res.status(404).json('order not found')
    }
    return res.status(200).json(order)
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
async function updateStatus(req, res) {
  try {
    const { status } = req.body;
    const { id: orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ message: 'Order ID not provided' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // List of valid status values
    const allowedStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status provided' });
    }

    // Update status
    order.status = status;

    // Update delivery info if delivered
    if (status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }

    const updatedOrder = await order.save();
    return res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function deleteOrder(req, res) {
  try {
    const { id: orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ message: 'Order ID not provided' });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await Order.findByIdAndDelete(orderId);

    return res.status(200).json({ success: true, message: 'Order remove successfully' });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export {deleteOrder,updateStatus,getOrder}