// src/pages/MyCart.jsx
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MyCart = () => {
  const {
    cart,
    setCart,
    backendUrl,
    token,
    currencySymbol,
    loadUserCart,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const [discount, setDiscount] = useState(0);
  const [isPaid, setIsPaid] = useState(false);

  // Calculate subtotal dynamically
  const subtotal = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const total = subtotal - discount;

  // Remove item from cart
  const removeItem = async (drugId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cart/remove`,
        { drugId },
        { headers: { token } }
      );
      if (data.success) {
        await loadUserCart(); // refresh cart from backend
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Apply discount (example 10%)
  const applyDiscount = () => {
    if (discount > 0) return toast.info("Discount already applied");
    const disc = subtotal * 0.1; // 10% discount
    setDiscount(disc);
    toast.success("10% discount applied!");
  };

  // Handle Pay Now (simulate)
  const handlePayNow = () => {
    if (cart.length === 0) return toast.info("Cart is empty");
    setIsPaid(true);
    toast.success("Payment successful!");
  };

  // Handle Order Now
  const handleOrderNow = async () => {
    if (!isPaid) return toast.info("Please pay first");
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/order/create`,
        {},
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Order placed successfully!");
        setCart([]);
        setIsPaid(false);
        navigate("/my-orders");
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadUserCart(); // load cart initially
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 sm:px-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Cart</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/drugs")}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Add More
          </button>
          <button
            onClick={() => navigate("/my-orders")}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Order History
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.length === 0 && <p>Your cart is empty.</p>}
        {cart.map((item) => (
          <div
            key={item._id || item.drugId._id}
            className="flex justify-between items-center border rounded p-4 bg-white"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-contain"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600">
                  Quantity: {item.quantity} | Unit Price: {currencySymbol}
                  {item.price}
                </p>
                <p className="text-gray-700 font-medium">
                  Total: {currencySymbol}
                  {item.quantity * item.price}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeItem(item._id || item.drugId._id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="border rounded p-4 bg-white space-y-2">
        <p className="text-lg font-semibold">Order Summary</p>
        <p>
          Subtotal: {currencySymbol}
          {subtotal.toFixed(2)}
        </p>
        <p>
          Discount: {currencySymbol}
          {discount.toFixed(2)}
        </p>
        <p className="font-semibold">
          Total: {currencySymbol}
          {total.toFixed(2)}
        </p>

        <div className="flex gap-3 mt-3 flex-wrap">
          <button
            onClick={applyDiscount}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Get 10% Discount
          </button>
          <button
            onClick={handlePayNow}
            className={`px-4 py-2 rounded text-white ${
              isPaid
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
            disabled={isPaid}
          >
            {isPaid ? "Paid" : "Pay Now"}
          </button>
          <button
            onClick={handleOrderNow}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
              !isPaid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isPaid}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
