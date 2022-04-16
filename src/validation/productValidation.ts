import { IProductCreate } from "../interface/IProduct";
import Joi from 'joi';


export const createProductValidation = (productData: IProductCreate) => {
  const schema = Joi.object({
    cost: Joi.number().required(),
    amountAvailable: Joi.number().required(),
    productName: Joi.string().required(),

  });

  return schema.validateAsync(productData);
}