import express from "express";

import {
  createIncomeTransaction,
  createExpenseTransaction,
  showTransactions,
} from "../controllers/wallet.controllers.js";

const router = express.Router();

router.post("/transactions/income", createIncomeTransaction);

router.post("/transactions/expense", createExpenseTransaction);

router.get("/transactions", showTransactions);

export default router;
