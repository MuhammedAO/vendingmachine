import Joi from 'joi'
import { IUserCreate, IUserLogin } from '../interface/IUser';

export const registerUserValidation = (userData: IUserCreate) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),

  });

  return schema.validateAsync(userData);
};
export const loginUserValidation = (userData: IUserLogin) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validateAsync(userData);
};