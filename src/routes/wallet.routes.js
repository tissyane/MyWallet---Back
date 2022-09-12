import express from "express";
import WalletMiddleware from "../middlewares/wallet.middleware.js";
import userMiddleware from "../middlewares/user.middleware.js";

import {
  createIncomeTransaction,
  createExpenseTransaction,
  showTransactions,
} from "../controllers/wallet.controllers.js";

const router = express.Router();

router.use(userMiddleware);

router.get("/transactions", showTransactions);

router.use(WalletMiddleware);

router.post("/transactions/income", createIncomeTransaction);

router.post("/transactions/expense", createExpenseTransaction);

export default router;
