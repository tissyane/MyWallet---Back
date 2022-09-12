import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import walletRoutes from "./routes/wallet.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes, walletRoutes);

const port = "5000";

app.listen(port, () => console.log("Listening on port 5000!"));
