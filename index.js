import express from "express";
import cors from "cors";

import {
  createUser,
  createSession,
  deleteSession,
} from "./src/controllers/auth.controllers.js";
import {
  createIncomeTransaction,
  createExpenseTransaction,
  showTransactions,
} from "./src/controllers/wallet.controllers.js";

const app = express();
app.use(cors());
app.use(express.json());

const port = "5000";

app.post("/sign-up", createUser);

app.post("/sign-in", createSession);

app.delete("/sign-out", deleteSession);

app.post("/transactions/income", createIncomeTransaction);

app.post("/transactions/expense", createExpenseTransaction);

app.get("/transactions", showTransactions);

app.listen(port, () => console.log("Listening on port 5000!"));
