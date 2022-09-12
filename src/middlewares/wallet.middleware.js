import walletSchema from "../utils/wallet.schema.js";

function validate(req, res, next) {
  const validation = walletSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const walletError = validation.error.details.map(
      (detail) => detail.message
    );
    return res.status(422).send(walletError);
  }

  next();
}

export default validate;
