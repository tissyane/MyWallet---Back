import db from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

async function createUser(req, res) {
  const user = req.body;

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

      return res.status(200).send({ token, name: user.name });
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
      return res.sendStatus(401);
    }

    await db.collection("sessions").deleteOne({
      token,
    });

    return res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
}

export { createUser, createSession, deleteSession };
