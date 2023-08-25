import Joi from "joi";

const groupsSchema = Joi.object({
  name: Joi.string().required(),
});

export default groupsSchema;
