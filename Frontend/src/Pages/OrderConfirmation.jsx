import React from "react";

const Checkout = {
  _id: "12345",
  createAt: new Date(),
  checkoutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "Black",
      size: "XL",
      price: "150",
      quantity: 1,
      image: "https://picsum.photos/150?random=1",
    },
    {
      productId: "2",
      name: "Jacket",
      color: "Black",
      size: "XL",
      price: "150",
      quantity: 1,
      image: "https://picsum.photos/150?random=2",
    },
  ],
  shippingAddress: {
    address: "123 Fashion Point",
    city: "New York",
    country: "USA",
  },
};

const OrderConfirmation = () => {
  const totalAmount = Checkout.checkoutItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  function calculateEstimateDelivery(createAt) {
    const estimated = new Date(createAt);
    estimated.setDate(estimated.getDate() + 3);
    return estimated.toLocaleDateString();
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-emerald-600">
              🎉 Order Placed Successfully!
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              A confirmation has been sent to your email.
            </p>
          </div>

          {Checkout && (
            <div>
              {/* Order Details */}
              <div className="border-b border-b-gray-200 rounded-lg p-4 mb-6 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order Details</p>
                    <p className="font-medium">Order ID: {Checkout._id}</p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(Checkout.createAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated Delivery</p>
                    <p className="text-emerald-600 font-semibold">
                      {calculateEstimateDelivery(Checkout.createAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-6">
                <h3 className=" text-lg font-semibold text-gray-700 mb-1">
                  Shipping Address
                </h3>
                <p className="text-gray-600 border-b border-b-gray-200">
                  {Checkout.shippingAddress.address},{" "}
                  {Checkout.shippingAddress.city},{" "}
                  {Checkout.shippingAddress.country}
                </p>
              </div>

              {/* Ordered Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b border-b-gray-200 pb-2">
                  Items Ordered
                </h3>
                {Checkout.checkoutItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center gap-4 py-4 border-b border-b-gray-200"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded border"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Color: {item.color} | Size: {item.size}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ${item.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-end mb-6">
                <div className="text-right">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Total:
                  </h3>
                  <p className="text-2xl font-bold text-emerald-600">
                    ${totalAmount}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg shadow transition-all duration-200">
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
