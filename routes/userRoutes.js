import express from "express";
import { login, logout, regsiter } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/register").post(regsiter);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
