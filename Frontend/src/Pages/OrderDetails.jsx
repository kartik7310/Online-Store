import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [OrderDetails, setOrderDetails] = useState(null);
  useEffect(() => {
    const mockData = {
      id: id,
      createAt: new Date(),
      isPaid: true,
      paymentMethod: "Paypal",
      shippingMethod: "standard",
      isDelivered: true,
      shippingAddress: { city: "New York", county: "USA" },
      orderItems: [
        {
          productId: "1",
          name: "jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/150?random=1",
        },
        {
          productId: "2",
          name: "jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/150?random=2",
        },
        {
          productId: "3",
          name: "jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/150?random=1",
        },
      ],
    };
    setOrderDetails(mockData);
  }, [id]);
  console.log(id);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!OrderDetails ? (
        <p>No Order found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          {/* order info */}
          <div className="flex flex-col sm:flex-row justify-between mb">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order ID:#{OrderDetails.id}
              </h3>
              <p className="text-gray-700 ">
                {new Date(OrderDetails.createAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-cols items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  OrderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium  mb-2`}
              >
                {OrderDetails.isPaid ? "Approved" : "Pending"}
              </span>
              <span
                className={`${
                  OrderDetails.isDelivered
                    ? "bg-yellow text-green-700"
                    : "bg-yellow-50 text-yellow-300"
                } px-3 py-1 rounded-full text-sm font-medium  mb-2`}
              >
                {OrderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
              </span>
            </div>
            {/* customer,payment,shipping info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
                <p>Payment Method:{OrderDetails.paymentMethod}</p>
                <p>Status:{OrderDetails.isPaid ? "Paid" : "unPaid"}</p>
              </div>
            </div>
            {/* shipping Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
                <p>Shipping Method:{OrderDetails.shippingMethod}</p>
                <p>
                  Address:
                  {`${OrderDetails.shippingAddress.city},${OrderDetails.shippingAddress.county}`}
                </p>
              </div>
            </div>
          </div>
          {/* product list */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <table className="w-full mb-4 font-semibold">
              <thead className="bg-gray-100">
                <tr className="py-2 px-4">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Unit Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {OrderDetails.orderItems.map((items) => (
                  <tr key={items.productId} className="border-b">
                    <td className="py-2 px-4 flex items-center">
                      <img
                        src={items.image}
                        alt={items.name}
                        className="object-cover w-12 h-12 rounded-lg mr-4"
                      />
                      <Link
                        to={`/product/${items.productId}`}
                        className="text-blue-500 hover:underline"
                      >
                        {items.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4">{items.price}</td>
                    <td className="py-2 px-4">{items.quantity}</td>
                    <td className="py-2 px-4">{items.price*items.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* back to order link */}
          <Link to={"/my-orders"} className="text-blue-500 hover:underline">
          Back to my Orders</Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
