import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";

const cart = {
  products: [
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
  ],
  totalPrice: 195,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleFrom(e) {
    e.preventDefault();
    console.log(shippingAddress);
    setCheckoutId(1214);
  }

  function handlePaymentSuccess(Details) {
    console.log("Payment success", Details);
    navigate("/order-confirmation");
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-12 px-6">
      {/* Left Section */}
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-semibold uppercase mb-6 tracking-wide text-gray-800">
          Checkout
        </h2>

        <form onSubmit={handleFrom} className="space-y-6">
          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-medium text-gray-700 mb-4">
              Contact Details
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                value="user@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                disabled
              />
            </div>
          </div>

          {/* Delivery Section */}
          <div>
            <h3 className="text-xl font-medium text-gray-700 mb-4">
              Delivery Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={shippingAddress.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={shippingAddress.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="123 Main Street"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="New York"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="10001"
                  required
                />
              </div>
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="USA"
                required
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="982412155"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white
         py-3 rounded-lg"
              >
                Continue to payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay With Paypal</h3>
                {/* paypal button */}
                <PaypalButton
                  amount={10}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) =>
                    console.log("Payment failed .Try again !", err)
                  }
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {/* right section */}
      <div className="bg-gray-70 p-6 rounded-lg">
        <h3 className="text-lg mb-4 border-b border-b-gray-300">
          Order Summary
        </h3>
        <div className=" py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b border-b-gray-300"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-22 h-22 object-cover mr-4 rounded-lg"
                />
                <div>
                  <h2 className="text-md">{product.name}</h2>
                  <p className="text-gray-500">Size:{product.size}</p>
                  <p className="text-gray-500">Color:{product.color}</p>
                </div>
              </div>
              <p className="text-xl">${product?.price.toLocaleString()}</p>
            </div>
          ))}
          <div className="flex justify-between items-center text-lg mb-4">
            <p>Subtotal</p>
            <p>${cart.totalPrice?.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center text-lg">
            <p>shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between items-center text-lg mt-4 border-t border-t-gray-300 pt-4">
            <p>Total</p>
            <p>${cart.totalPrice?.toLocaleString()}</p>
          </div>
        </div>
        
    
      </div>
    </div>
  );
};

export default Checkout;
