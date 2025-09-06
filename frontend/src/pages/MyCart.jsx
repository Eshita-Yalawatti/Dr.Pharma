import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyCart = () => {
  const { cart, currencySymbol } = useContext(AppContext);

  // Safe calculation: undefined price or totalPrice handled
  const grandTotal = cart.reduce(
    (acc, item) => acc + (item.totalPrice || 0),
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Image</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Stock</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td className="border p-2">
                    <img
                      src={item.image || ""}
                      alt={item.name || ""}
                      className="h-12 w-12 object-contain"
                    />
                  </td>
                  <td className="border p-2">{item.name || "-"}</td>
                  <td className="border p-2">{item.stock || 0}</td>
                  <td className="border p-2">{item.quantity || 1}</td>
                  <td className="border p-2">
                    {currencySymbol}{" "}
                    {item.price !== undefined ? item.price.toFixed(2) : "0.00"}
                  </td>
                  <td className="border p-2">
                    {currencySymbol}{" "}
                    {item.totalPrice !== undefined
                      ? item.totalPrice.toFixed(2)
                      : "0.00"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right mt-4 font-semibold">
            Grand Total: {currencySymbol} {grandTotal.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;
