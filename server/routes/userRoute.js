import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/userController.js";
import multer from 'multer';

const router = express.Router();

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Register route
router.post('/register', upload.single('profilePic'), registerController);

//LOGIN || POST
router.post("/login", loginController);

export default router;
