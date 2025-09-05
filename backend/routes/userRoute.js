import express from "express";
import {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
  paymentStripe,
  verifyStripe,
} from "../controllers/userController.js";

import { addToCart, removeFromCart, createOrder, cancelOrder, getUserOrders } from "../controllers/orderController.js";


import upload from "../middleware/multer.js";
import authUser from "../middleware/authUser.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/payment-razorpay", authUser, paymentRazorpay);
userRouter.post("/verifyRazorpay", authUser, verifyRazorpay);
userRouter.post("/payment-stripe", authUser, paymentStripe);
userRouter.post("/verifyStripe", authUser, verifyStripe);

// ----- Cart & Orders (NEW) -----
userRouter.post("/cart/add", authUser, addToCart);
userRouter.post("/cart/remove", authUser, removeFromCart);
userRouter.post("/order/create", authUser, createOrder);
userRouter.post("/order/cancel", authUser, cancelOrder);
userRouter.get("/orders", authUser, getUserOrders);

export default userRouter;
