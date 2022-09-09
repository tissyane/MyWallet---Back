import express from "express";
import cors from "cors";
import joi from "joi";

import { createUser } from "./src/controllers/authControllers.js";

const app = express();
app.use(cors());
app.use(express.json());

const port = "5000";

app.post("/sign-up", createUser);

app.listen(port, () => console.log("Listening on port 5000!"));
