import db from "../database/db.js";
import walletSchema from "../utils/wallet.schema.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

async function createTransaction(req, res) {
  const { value, description, type } = req.body;
  const token = req.headers.authorization?.replace("Bearer ", "");

  const validation = walletSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const walletError = validation.error.details.map(
      (detail) => detail.message
    );
    return res.status(422).send(walletError);
  }

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      res.sendStatus(401);
    }
    const user = await db.collection("users").findOne({ _id: session.userId });

    if (user) {
      await db.collection("transactions").insertOne({
        data: dayjs(Date.now()).format("DD/MM"),
        value,
        description,
        type,
      });
    }

    res.sendStatus();
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err);
    return;
  }
}

export { createTransaction };
