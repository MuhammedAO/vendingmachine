import { IProductCreate, IProductUpdate } from "../interface/IProduct"
import ProductModel from "../models/ProductModel"

export const createProductDao = async (productData: IProductCreate) =>
  await ProductModel.create(productData)

export const updateProductDao = async (productData: IProductUpdate) => {
  return ProductModel.findOneAndUpdate({ _id: productData._id }, productData, {
    new: true,
  })
}
export const getProductByIdDao = async (id: string) => ProductModel.findById(id)

export const deleteProductByIdDao = async (id: string) => ProductModel.deleteOne({_id: id})
