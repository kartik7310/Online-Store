import React from "react";
import { Link } from "react-router-dom";
const ProductManagement = () => {
  
  const product = [
    {
      id: 123,
      name: "t-shirt",
      price: 120,
      details: "PRINT-REs",
    },
    {
      id: 1234,
      name: "t-shirt",
      price: 120,
      details: "PRINT-REs",
    },
    {
      id: 125,
      name: "t-shirt",
      price: 120,
      details: "PRINT-REs",
    },
  ];

  function handleEditUser(userId) {
    console.log(userId);
  }

  function handleDeleteUser(userId) {
    if(window.confirm('Are you really want to delete the product'))
    console.log(userId);
  }
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Product Management</h2>
      <div className="mt-8">
        <table className="w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase ">
            <tr>
              <th className="py-3 px-4">NAME</th>
              <th className="py-3 px-4">PRICE</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {product.length > 0
              ? product.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 w-full hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.price}</td>
                    <td className="p-4">{product.details}</td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleDeleteUser(product.id)}
                          className="bg-red-500 py-1 px-3 rounded text-white"
                        >
                          Delete
                        </button>
                       <Link to={`/admin/product/${product.id}/edit`}>
                       <button
                          onClick={() => handleEditUser(product.id)}
                          className="bg-yellow-500 py-1 px-3 rounded text-white"
                        >
                          Edit
                        </button>
                       </Link>
                      </div>
                    </td>
                  </tr>
                ))
              : (
                <td colSpan={4} className="p-4  text-center text-gray-500" >
                  No Product found
                </td>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
