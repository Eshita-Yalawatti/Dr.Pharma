import orderModel from "../models/orderModel.js";
import drugModel from "../models/drugModel.js";

// ===================== Cart Functions =====================

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, drugId, quantity } = req.body;

    const drug = await drugModel.findById(drugId);
    if (!drug) return res.json({ success: false, message: "Drug not found" });
    if (quantity > drug.stock) return res.json({ success: false, message: `Not enough stock for ${drug.name}` });

    // Find user's pending cart or create new
    let order = await orderModel.findOne({ userId, status: "pending" });
    if (!order) {
      order = new orderModel({ userId, drugs: [], totalAmount: 0, status: "pending" });
    }

    // Add or update item in cart
    const existingItemIndex = order.drugs.findIndex(d => d.drugId.toString() === drugId);
    if (existingItemIndex > -1) {
      order.drugs[existingItemIndex].quantity += quantity;
      order.drugs[existingItemIndex].price = drug.price;
    } else {
      order.drugs.push({ drugId, quantity, price: drug.price });
    }

    // Recalculate total
    order.totalAmount = order.drugs.reduce((sum, d) => sum + d.quantity * d.price, 0);

    await order.save();
    res.json({ success: true, message: "Item added to cart", order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, drugId } = req.body;

    const order = await orderModel.findOne({ userId, status: "pending" });
    if (!order) return res.json({ success: false, message: "No pending cart found" });

    order.drugs = order.drugs.filter(d => d.drugId.toString() !== drugId);

    // Recalculate total
    order.totalAmount = order.drugs.reduce((sum, d) => sum + d.quantity * d.price, 0);

    await order.save();
    res.json({ success: true, message: "Item removed from cart", order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ===================== Order Functions =====================

// Place an order
export const createOrder = async (req, res) => {
  try {
    const { userId, drugs } = req.body;

    let totalAmount = 0;

    // Calculate total and check stock
    for (let item of drugs) {
      const drug = await drugModel.findById(item.drugId);
      if (!drug) return res.json({ success: false, message: "Drug not found" });
      if (item.quantity > drug.stock) return res.json({ success: false, message: `Not enough stock for ${drug.name}` });

      totalAmount += item.quantity * drug.price;
    }

    const order = new orderModel({
      userId,
      drugs: drugs.map(d => ({
        drugId: d.drugId,
        quantity: d.quantity,
        price: d.price,
      })),
      totalAmount,
      status: "pending"
    });

    await order.save();

    // Reduce stock
    for (let item of drugs) {
      await drugModel.findByIdAndUpdate(item.drugId, { $inc: { stock: -item.quantity } });
    }

    res.json({ success: true, message: "Order placed", order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const { orderId, userId } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) return res.json({ success: false, message: "Order not found" });
    if (order.userId.toString() !== userId) return res.json({ success: false, message: "Unauthorized" });
    if (order.status !== "pending") return res.json({ success: false, message: "Cannot cancel completed order" });

    order.status = "cancelled";
    await order.save();

    // Restore stock
    for (let item of order.drugs) {
      await drugModel.findByIdAndUpdate(item.drugId, { $inc: { stock: item.quantity } });
    }

    res.json({ success: true, message: "Order cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId }).populate("drugs.drugId");
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
