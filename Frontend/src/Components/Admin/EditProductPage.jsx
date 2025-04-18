import React, { useState } from "react";
import { useParams } from "react-router-dom";

const EditProductPage = () => {
  const [product, setProduct] = useState({
    productName: "",
    Description: "",
    Price: "",
    StockCount: "",
    SKU: "",
    Size: [],
    Colors: [],

    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/150?random=1",
        alt: "Product images",
      },
      {
        url: "https://picsum.photos/150?random=2",
        alt: "Product images",
      },
    ],
  });
  const { id } = useParams();
  function handleOnchange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  function handleUploadImage(e) {
    const images = Array.from(e.target.files);
    console.log(images); // logs array of selected files
  }

  function handleForm(e) {
    e.preventDefault();
    console.log(product);
  }
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md ml-15 ">
      <h2 className="text-3xl font-bold mb-6">Edit Page</h2>
      <form onSubmit={handleForm}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleOnchange}
            className="w-3/4 border border-gray-300 rounded-md py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            type="text"
            name="Description"
            value={product.Description}
            onChange={handleOnchange}
            className="w-3/4 border border-gray-300 rounded-md py-1"
            rows={4}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="text"
            name="Price"
            value={product.Price}
            onChange={handleOnchange}
            className="w-3/4 border border-gray-300 rounded-md py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Count in Stock</label>
          <input
            type="text"
            name="StockCount"
            value={product.StockCount}
            onChange={handleOnchange}
            className="w-3/4 border border-gray-300 rounded-md py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="SKU"
            value={product.SKU}
            onChange={handleOnchange}
            className="w-3/4 border border-gray-300 rounded-md py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Color</label>
          <input
            type="text"
            name="Colors"
            value={product.Colors.join(",")}
            onChange={(e) =>
              setProduct({
                ...product,
                Colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-3/4 border border-gray-300 rounded-md py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Size</label>
          <input
            type="text"
            name="Size"
            value={product.Size?.join(",")}
            onChange={(e) =>
              setProduct({
                ...product,
                Size: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-3/4 border border-gray-300 rounded-md py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Materials</label>
          <input
            type="text"
            name="material"
            value={product.material}
            onChange={handleOnchange}
            className="w-3/4 border border-gray-300 rounded-md py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Gender</label>
          <input
            type="text"
            name="gender"
            value={product.gender}
            onChange={handleOnchange}
            className="w-3/4 border border-gray-300 rounded-md py-1"
            required
          />
        </div>

        {/* handleImage upload */}
        <div className="mb-4">
          <label className="font-semibold block mb-2 text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            multiple
            onChange={handleUploadImage}
            className="block w-full text-sm text-gray-700 
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-100 file:text-blue-700
               hover:file:bg-blue-200"
          />
        </div>
        <div className="flex gap-4 mt-4 ">
          {product.images.map((images, index) => (
            <img
              key={index}
              src={images.url}
              alt={images.alt || "Product image"}
              className="h-20 w-20 object-cover rounded-md shadow"
            />
          ))}
        </div>
        <button
          type="submit"
          className="py-2 px-2 rounded-lg bg-green-600 hover:bg-green-400 text-white mt-5 w-full cursor-pointer "
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
