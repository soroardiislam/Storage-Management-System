import Joi from "joi";

export const createUserValidation = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "manager", "staff").required(),
  isActive: Joi.boolean(),
});

export const updateUserValidation = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  role: Joi.string().valid("admin", "manager", "staff"),
  isActive: Joi.boolean(),
});
