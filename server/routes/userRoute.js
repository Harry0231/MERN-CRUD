import express from "express";
import {  getUserDataController, loginController, registerController } from "../controllers/userController.js";

const router = express.Router();

// Register route
router.post("/register", registerController);

router.get("/profile/:id", getUserDataController);


//LOGIN || POST
router.post("/login", loginController);

export default router;
