import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { backendUrl, token, currencySymbol } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/orders`, {
        headers: { token },
      });
      if (data.success) setOrders(data.orders);
      else setOrders([]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  if (!orders.length)
    return <p className="text-center mt-10 text-gray-600">No orders yet</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-5">My Orders</h2>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-300 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">Order ID: {order._id}</p>
              <span
                className={`font-semibold ${
                  order.status === "completed"
                    ? "text-green-600"
                    : order.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {order.status.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-700 font-medium mb-2">
              Total: {currencySymbol}
              {order.totalAmount}
            </p>
            <div className="grid gap-2">
              {order.drugs.map((item) => (
                <div
                  key={item.drugId._id}
                  className="flex justify-between text-sm border-b py-1"
                >
                  <p>{item.drugId.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>
                    {currencySymbol}
                    {item.quantity * item.drugId.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
