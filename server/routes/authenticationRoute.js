import express from "express";
import { Login, Resgister } from "../controllers/AuthenticationController.js";
const router = express.Router();

router.post('/register', Resgister);
router.post('/login', Login); 

export default router;