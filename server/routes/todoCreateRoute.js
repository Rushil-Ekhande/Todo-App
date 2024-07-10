import express from "express";
import { todoCreateController } from "../controllers/todoCreateController.js";

const router = express.Router();

router.post("/", todoCreateController);

export default router;