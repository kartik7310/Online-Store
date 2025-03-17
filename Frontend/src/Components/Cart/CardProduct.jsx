// 
import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const CardProduct = () => {
  const productCart = [
    {
      id: 1,
      name: "T-Shirt",
      image: "https://picsum.photos/200?random=1",
      color: "Black",
      price: 12,
      quantity: 1,
      size: 30,
    },
    {
      id: 2,
      name: "Pant",
      image: "https://picsum.photos/200?random=2",
      color: "White",
      price: 12,
      quantity: 1,
      size: 50,
    },
    {
      id: 2,
      name: "Pant",
      image: "https://picsum.photos/200?random=2",
      color: "White",
      price: 12,
      quantity: 1,
      size: 50,
    },
    {
      id: 2,
      name: "Pant",
      image: "https://picsum.photos/200?random=2",
      color: "White",
      price: 12,
      quantity: 1,
      size: 50,
    },
    {
      id: 2,
      name: "Pant",
      image: "https://picsum.photos/200?random=2",
      color: "White",
      price: 12,
      quantity: 1,
      size: 50,
    },
    {
      id: 2,
      name: "Pant",
      image: "https://picsum.photos/200?random=2",
      color: "White",
      price: 12,
      quantity: 1,
      size: 50,
    },
    {
      id: 2,
      name: "Pant",
      image: "https://picsum.photos/200?random=2",
      color: "White",
      price: 12,
      quantity: 1,
      size: 50,
    },
    {
      id: 2,
      name: "Pant",
      image: "https://picsum.photos/200?random=2",
      color: "White",
      price: 12,
      quantity: 1,
      size: 50,
    },
  ];

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Shopping Cart</h1>
      {productCart.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between py-4 border-b"
        >
          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="h-20 w-20 object-cover rounded-lg"
          />

          {/* Product Details */}
          <div className="flex-1 ml-4">
            <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 text-sm">
              Size: <span className="font-medium">{product.size}</span> | Color:{" "}
              <span className="font-medium">{product.color}</span>
            </p>
            <p className="text-gray-900 font-bold mt-1">${product.price.toLocaleString()}</p>
          </div>

          {/* Quantity Buttons */}
          <div className="flex items-center space-x-3">
            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-lg cursor-pointer">
              -
            </button>
            <span className="font-semibold">{product.quantity}</span>
            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-lg cursor-pointer">
              +
            </button>
          </div>
          <div className="m-2 cursor-pointer">
            <RiDeleteBin3Line className="h-5 w-5"/>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default CardProduct;
