import joi from "joi";

const walletSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
  type: joi.string().valid("income", "expense").required(),
});

export default walletSchema;
