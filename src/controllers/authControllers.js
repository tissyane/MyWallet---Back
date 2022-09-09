import bcrypt from "bcrypt";
import db from "../database/db.js";
import { userSchema } from "../utils/Schema.js";

async function createUser(req, res) {
  const user = req.body;

  const validation = userSchema.validate({ user });

  if (validation.error) {
    const loginError = validation.error.details[0].message;
    return res.status(422).send(loginError);
  }

  const passwordHash = bcrypt.hashSync(user.password, 10);

  await db.collection("users").insertOne({ ...user, password: passwordHash });

  res.sendStatus(201);
}

export { createUser };
