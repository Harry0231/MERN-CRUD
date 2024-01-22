import express from "express";
import { getAllData, loginController, registerController, updateController } from "../controllers/userController.js";

const router = express.Router();

// Register route
router.post("/register", registerController);

router.get("/register", getAllData);

router.patch("/register/:id", updateController);




//LOGIN || POST
router.post("/login", loginController);

export default router;
