import Joi from "joi";

const accountSchema = Joi.object({
  group_id: Joi.number().required(),
  user_id: Joi.number().required(),
});

export default accountSchema;
