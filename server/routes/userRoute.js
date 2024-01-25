import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/userController.js";

const router = express.Router();

// Register route
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

export default router;
