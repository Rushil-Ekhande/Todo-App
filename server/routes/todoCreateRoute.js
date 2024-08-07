import express from "express";
import { todoCreateController } from "../controllers/todoCreateController.js";
import { getAuthToken } from "../middlewares/getAuthTokenMiddleware.js";
import { getTodoController } from "../controllers/getTodoController.js";
import deleteTodo from "../controllers/deleteTodo.js";

const router = express.Router();

router.post("/", getAuthToken, todoCreateController);
router.post("/get-todo", getAuthToken, getTodoController);
router.delete('/delete/:todoId',getAuthToken ,deleteTodo);

export default router;