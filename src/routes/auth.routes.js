import express from "express";
import {
  createUser,
  createSession,
  deleteSession,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/sign-up", createUser);

router.post("/sign-in", createSession);

router.delete("/sign-out", deleteSession);

export default router;
