import Joi from "joi";

const billSchema = Joi.object({
  group_id: Joi.number().required(),
  amount: Joi.number().required(),
  description: Joi.string().trim().required(),
});

export default billSchema;
