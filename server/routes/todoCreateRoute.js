import express from "express";
import { todoCreateController } from "../controllers/todoCreateController.js";
import { getAuthToken } from "../middlewares/getAuthTokenMiddleware.js";
import { getTodoController } from "../controllers/getTodoController.js";

const router = express.Router();

router.post("/", getAuthToken, todoCreateController);
router.post("/get-todo", getAuthToken, getTodoController);

export default router;