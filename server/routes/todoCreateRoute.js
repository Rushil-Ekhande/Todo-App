import express from "express";
import { todoCreateController } from "../controllers/todoCreateController.js";
import { getAuthToken } from "../middlewares/getAuthTokenMiddleware.js";

const router = express.Router();

router.post("/", getAuthToken, todoCreateController);

export default router;