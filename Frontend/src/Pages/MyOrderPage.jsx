import React, { useEffect, useState } from "react";
import { FaCity } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyorderPage = () => {
  const navigate = useNavigate()
  const [order, setOrder] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      const mockData = [
        {
          _id: "12345",
          createdAt: new Date(),
          shippingAddress: {
            city: "New York",
            country: "USA",
          },
          orderItems: [
            {
              name: "product 1",
              image: "https://picsum.photos/500/500?random=1"
              ,
            },
          ],
          totalPrice: 1000,
          isPaid: true,
        },
        {
          _id: "123234",
          createdAt: new Date(),
          shippingAddress: {
            city: "muzaffarnagar",
            country: "India",
          },
          orderItems: [
            {
              name: "product 1",
              image: "https://picsum.photos/500/500?random=2",
            },
          ],
          totalPrice: 1000,
          isPaid: true,
        },
      ];
      setOrder(mockData)
    },1000);
  },[]);

  function handleClick(orderId){
   navigate(`/order/${orderId}`)
  }
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="text-xl sm:text-2xl font-bold mb-6">My Orders</div>
      <div className="relative shadow md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">OrderId</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
           {order.length>0?(
            order.map((order)=>(
            <tr key={order._id} className="border-b hover:border-gray-50 cursor-pointer">
              <td className="py-2 px-2 sm:py-4 sm:px-4">
                <img 
                className="h-10 w-10 sm:w-12 sm:h-12 rounded object-cover"
                src={order.orderItems[0].image} alt={order.orderItems[0].name} />
              </td>
              <td onClick={()=>handleClick(order._id)} className="py-2 px-2  sm:py-4 px-4 font-medium text-gray-900 whitespace-nowrap">#{order._id}
              
              </td>
              <td className="py-2 px-2 sm:py-4 sm:px-4 ">
                {new Date(order.createdAt).toLocaleDateString()}{" "}
                {new Date(order.createdAt).toLocaleTimeString()}
              </td>
              <td className="py-2 px-2 sm:py-4 sm:px-4">
               {order.shippingAddress?`${order.shippingAddress.city},${order.shippingAddress.country}`:N/A}
              </td>
              <td className="py-2 px-2 sm:py-4 sm:px-4">
               {order.orderItems.length}
              </td>
              <td className="py-2 px-2 sm:py-4 sm:px-4">
               ${order.totalPrice}
              </td>
              <td className="py-2 px-2 sm:py-4 sm:px-4">
  <span
    className={`inline-block px-2 py-1 rounded text-sm font-medium ${
      order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
    }`}
  >
    {order.isPaid ? "Paid" : "Unpaid"}
  </span>
</td>

            </tr>
              
            ))
           ):(
            <tr>
              <td
              colSpan={7}
              className="py-4 px-4 text-center text-gray-500">
                You have no orders
              </td>
            </tr>
           )}
          </tbody>
        </table>
      </div>

    </div>
  )
  
};

export default MyorderPage;
