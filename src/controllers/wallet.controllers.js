import db from "../database/db.js";
import dayjs from "dayjs";

async function createIncomeTransaction(req, res) {
  const { value, description } = req.body;
  const session = res.locals.session;

  try {
    const user = await db.collection("users").findOne({ _id: session.userId });

    if (user) {
      const { insertedId } = await db.collection("transactions").insertOne({
        userId: session.userId,
        date: dayjs(Date.now()).format("DD/MM"),
        value: Number(value),
        description,
        typeSetting: "income",
      });
    }

    res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err);
    return;
  }
}

async function createExpenseTransaction(req, res) {
  const { value, description } = req.body;
  const session = res.locals.session;

  try {
    const user = await db.collection("users").findOne({ _id: session.userId });

    if (user) {
      const { insertedId } = await db.collection("transactions").insertOne({
        userId: session.userId,
        date: dayjs(Date.now()).format("DD/MM"),
        value: Number(value),
        description,
        typeSetting: "expense",
      });
    }

    res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err);
    return;
  }
}

async function showTransactions(req, res) {
  const session = res.locals.session;

  try {
    const transactions = await db
      .collection("transactions")
      .find({ userId: session.userId })
      .toArray();

    res.send(transactions);
  } catch (err) {
    res.status(500).send(err);
    return;
  }
}

export { createIncomeTransaction, createExpenseTransaction, showTransactions };
