import express from "express";
import {
  getAllData,
  getDataByIdController,
  createDataController,
  updateDataController,
  deleteDataController,
} from "../controllers/dataController.js";

const router = express.Router();

router.get("/data", getAllData);
router.get("/data/:id", getDataByIdController);
router.post("/data", createDataController);
router.patch("/data/:id", updateDataController);
router.delete("/data/:id", deleteDataController);

export default router;
