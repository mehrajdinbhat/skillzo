import express from "express";
// import { signup } from "../Controller/user.controller.js";
import {
  login,
  signup,
  logout,
  purchases,
} from "../Controller/user.controller.js";
import userMiddleware from "../Middleware/user.mid.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/purchases", userMiddleware, purchases);

export default router;
