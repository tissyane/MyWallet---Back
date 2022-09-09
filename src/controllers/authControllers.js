import db from "../database/db.js";
import { userSchema } from "../utils/Schema.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

async function createUser(req, res) {
  const user = req.body;

  // const validation = userSchema.validate({ user });

  // if (validation.error) {
  //   const loginError = validation.error.details[0].message;
  //   return res.status(422).send(loginError);
  // }

  const passwordHash = bcrypt.hashSync(user.password.toString(), 10);

  try {
    const isUser = await db.collection("users").findOne({ email: user.email });

    if (isUser) {
      return res.status(409).send("Usuário já cadastrado");
    }
    await db.collection("users").insertOne({ ...user, password: passwordHash });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
}

export { createUser };
