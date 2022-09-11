import db from "../database/db.js";
import userSchema from "../utils/Schema.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

async function createUser(req, res) {
  const user = req.body;

  const validation = userSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const loginError = validation.error.details[0].message;
    return res.status(422).send(loginError);
  }

  const passwordHash = bcrypt.hashSync(user.password, 10);

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

async function createSession(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();

      await db.collection("sessions").insertOne({
        userId: user._id,
        token,
      });

      return res.status(200).send({ token });
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

async function deleteSession(req, res) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const session = await db.collection("sessions").findOne({ token });

    if (!session) {
      //  TODO:Mudar pra 401
      return res.sendStatus(409);
    }

    await db.collection("sessions").deleteOne({
      token,
    });
    console.log("Deletado");
    return res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
}

export { createUser, createSession, deleteSession };
