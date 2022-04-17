import Joi from 'joi'
import { IUserCreate, IUserLogin } from '../interface/IUser';

export const registerUserValidation = (userData: IUserCreate) => {
  const schema = Joi.object({
    username: Joi.string().required().min(2),
    password: Joi.string().required().min(2),
    role: Joi.string().required(),

  });

  return schema.validateAsync(userData);
};
export const loginUserValidation = (userData: IUserLogin) => {
  const schema = Joi.object({
    username: Joi.string().required().min(2),
    password: Joi.string().required().min(2),
  });

  return schema.validateAsync(userData);
};