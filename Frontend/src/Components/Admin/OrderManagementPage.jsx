import React, { useState } from "react";
import { FaRubleSign } from "react-icons/fa";

const OrderManagementPage = () => {
  const Order = [
    {
      OrderId: "123",
      customer: "Admin",
      price: 123,
      status: "processing",
    },
    {
      OrderId: "1234",
      customer: "Admin",
      price: 123,
      status: "processing",
    },
    {
      OrderId: "12345",
      customer: "Admin",
      price: 123,
      status: "processing",
    },
    {
      OrderId: "123456",
      customer: "Admin",
      price: 123,
      status: "processing",
    },
  ];

  function handleMarkButton(orderId) {
    console.log(orderId);
  }
  function handleSelect(orderId, status) {
    console.log({ id: orderId, status: status });
  }
  const [marked, setMarked] = useState(false);
  return (
    <div className="max-w-7xl mx-auto shadow md mt-8">
      <h2 className="text-2xl font-bold ">Order Management</h2>
      <div className="mb-4">
        <table className="w-full text-left text-gray-500 mt-8">
          <thead className="bg-gray-100 text-xs uppercase ">
            <tr>
              <th className="py-3 px-4">Order Id</th>
              <th className="py-3 px-4">CUSTOMER</th>
              <th className="py-3 px-4">TOTAL PRICE</th>
              <th className="py-3 px-4">STATUS</th>
              <th className="py-3 px-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {Order.length > 0 ? (
              Order.map((order) => (
                <tr
                  key={order.OrderId}
                  className="border-b border-gray-200 w-full hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4">#{order.OrderId}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4">{order.price}</td>
                  <td className="p-4">
                    <select
                      onChange={(e) =>
                        handleSelect(order.OrderId, e.target.value)
                      }
                      className="p-2  border-round bg-gray-300 rounded-md -mt-2 font-bold"
                    >
                      <option value="Processing">Processing</option>
                      <option value="shipped">shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleMarkButton(order.OrderId)}
                      className="py-1 px-2 w-40 bg-green-500 shadow text-white rounded-md cursor-pointer hover:bg-green-400"
                    >
                      Mark as complete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <td colSpan={4} className="p-4  text-center text-gray-500">
                No Product found
              </td>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagementPage;
