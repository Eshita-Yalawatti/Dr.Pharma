// src/context/AppContext.jsx
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "৳";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(false);

  // ================= GET DOCTORS =================
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error(error.message);
    }
  };

  // ================= GET DRUGS =================
  const getDrugsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/drug/list`);
      if (data.success) {
        setDrugs(data.drugs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching drugs:", error);
      toast.error(error.message);
    }
  };

  // 🛒 CART STATE
  const [cart, setCart] = useState([]);

  const addToCart = (drug, qty) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === drug._id);
      if (existing) {
        return prev.map((item) =>
          item._id === drug._id
            ? {
                ...item,
                qty: item.qty + qty,
                subtotal: (item.qty + qty) * item.price,
              }
            : item
        );
      } else {
        return [...prev, { ...drug, qty, subtotal: qty * drug.price }];
      }
    });
    toast.success(`${drug.name} added to cart`);
  };

  const removeFromCart = (drugId) => {
    setCart((prev) => prev.filter((item) => item._id !== drugId));
  };

  const clearCart = () => setCart([]);

  // ================= GET USER PROFILE =================
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) setUserData(data.userData);
      else toast.error(data.message);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error(error.message);
    }
  };

  // ================= LOAD INITIAL DATA =================
  useEffect(() => {
    getDoctorsData();
    getDrugsData();
  }, []);

  // ================= LOAD USER DATA WHEN TOKEN CHANGES =================
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    }
  }, [token]);

  // ================= CONTEXT VALUE =================
  const value = {
    setCart,
    doctors,
    drugs,
    getDoctorsData,
    getDrugsData,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
