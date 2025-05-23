import React, { use, useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductDetails, similarProduct } from "../../redux/Slice/product";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, similarProduct, loading, error } = useSelector(
    (state) => state.product
  );
  const [user, guestId] = dispatch((state) => state.auth);
  const fetchId = id || productId;

  useEffect(() => {
    if (!fetchId) return;
    dispatch(fetchProductDetails(fetchId));
    dispatch(similarProduct({ id: fetchId }));
  }, [dispatch, fetchId]);

  const [mainImage, setMainImage] = useState(selectedProduct.images[0]?.url);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleQuantity = (action) => {
    setQuantity((prev) => {
      if (action === "minus") return prev > 1 ? prev - 1 : prev;
      if (action === "plus") return prev + 1;
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a color and size before adding to cart", {
        duration: 2000,
      });
      return;
    }
    setIsButtonDisabled(true);
    dispatch(
      addCart({
        productId: selectedProduct._id,
        quantity,
        size: selectedProduct._id,
        color: selectedProduct._id,
        guestId,
        userId: user?._id,
      })
    ).then(()=>{
      toast.success("Product added to cart successfully", {
        duration: 2000,
      });
    }).finally(()=>{
      setIsButtonDisabled(false);
    }
    );
  };

  useEffect(() => {
    if (selectedProduct.images.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, []);

if(loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText}
                className="w-20 h-20 object-cover cursor-pointer border"
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Main Thumbnail */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img src={mainImage} alt="product" className="rounded-2xl" />
            </div>
          </div>

          {/* Mobile Thumbnails */}
          <div className="md:hidden flex space-x-4 mb-4 items-center">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Right Section */}
          <div className="md:1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 line-through mb-1">
              {selectedProduct.originalPrice &&
                `$${selectedProduct.originalPrice}`}
            </p>
            <p className="text-gray-500 mb-2">${selectedProduct.price}</p>
            <p className="text-gray-500 mb-4">{selectedProduct.description}</p>

            {/* Color Selection */}
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color ? "ring-2 ring-black" : ""
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      filter:
                        selectedColor === color ? "none" : "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-4">
              <p className="text-gray-600">Size:</p>
              <div className="flex gap-3 mb-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded border ${
                      selectedSize === size ? "bg-black text-white" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-4">
              <p className="text-gray-600">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="px-4 py-1 bg-gray-200 rounded"
                  onClick={() => handleQuantity("minus")}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  className="px-4 py-1 bg-gray-200 rounded"
                  onClick={() => handleQuantity("plus")}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`text-white w-full px-6 py-2 rounded mt-3 ${
                isButtonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-black"
              }`}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Adding..." : "Add to Cart"}
            </button>

            {/* Product Characteristics */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-2xl text-gray-600 font-bold">
                Characteristics:
              </h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
          <ProductGrid products={similarProduct} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
