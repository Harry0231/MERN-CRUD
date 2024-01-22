import express from "express";
import {  getuserDataController, loginController, registerController } from "../controllers/userController.js";

const router = express.Router();

// Register route
router.post("/register", registerController);

router.get("/profile/:id", getuserDataController);


//LOGIN || POST
router.post("/login", loginController);

export default router;
