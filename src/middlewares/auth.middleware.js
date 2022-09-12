import { signUpSchema, signInSchema } from "../utils/auth.schema.js";

function validateSignUp(req, res, next) {
  const validation = signUpSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const signUpError = validation.error.details.map(
      (detail) => detail.message
    );
    return res.status(422).send(signUpError);
  }

  next();
}

function validateSignin(req, res, next) {
  const validation = signInSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const signInError = validation.error.details.map(
      (detail) => detail.message
    );
    return res.status(422).send(signInError);
  }

  next();
}

export { validateSignUp, validateSignin };
