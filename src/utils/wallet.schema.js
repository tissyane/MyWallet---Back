import joi from "joi";

const walletSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
});

export default walletSchema;
