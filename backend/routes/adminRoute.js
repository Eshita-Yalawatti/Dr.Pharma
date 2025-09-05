import express from "express";
import {
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  addDoctor,
  allDoctors,
  adminDashboard,
  allDrugs,
  addDrugs,
  updateDrugs,
  deleteDrugs,
} from "../controllers/adminController.js";
import { changeAvailablity } from "../controllers/doctorController.js";
import authAdmin from "../middleware/authAdmin.js";
import upload from "../middleware/multer.js";

const adminRouter = express.Router();

// ----- Admin Auth -----
adminRouter.post("/login", loginAdmin);

// ----- Doctors -----
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.get("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailablity);

// ----- Appointments -----
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);

// ----- Dashboard -----
adminRouter.get("/dashboard", authAdmin, adminDashboard);

// ----- Drugs -----
adminRouter.get("/all-drugs", authAdmin, allDrugs);
adminRouter.post("/add-drug", authAdmin, addDrugs);
adminRouter.post("/update-drug", authAdmin, updateDrugs);
adminRouter.post("/delete-drug", authAdmin, deleteDrugs);
export default adminRouter;
