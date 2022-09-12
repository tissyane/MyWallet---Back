import express from "express";
import {
  validateSignUp,
  validateSignin,
} from "../middlewares/auth.middleware.js";
import {
  createUser,
  createSession,
  deleteSession,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/sign-in", validateSignin, createSession);

router.post("/sign-up", validateSignUp, createUser);

router.delete("/sign-out", deleteSession);

export default router;
