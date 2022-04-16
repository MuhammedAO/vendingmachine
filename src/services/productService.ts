import asyncHandler from "express-async-handler"
import { createProductValidation } from "../validation/productValidation"
import {
  createProductDao,
  deleteProductByIdDao,
  getProductByIdDao,
  updateProductDao,
} from "../dao/productDAO"
import ProductModel from "../models/ProductModel"
import { getUserByIdDao } from "../dao/userDAO"

const createProductService = asyncHandler(async (req: any, res) => {
  const { cost, productName, amountAvailable } = req.body
  const id = req.user._id

  const { role } = await getUserByIdDao(id)

  if (role !== "seller") throw new Error("Only sellers can create products!")

  await createProductValidation(req.body)

  const product = await createProductDao({
    cost,
    productName,
    amountAvailable,
    sellerId: id,
  })

  if (product) {
    res.status(201).json({
      _id: product._id,
      cost: product.cost,
      productName: product.productName,
      amountAvailable: product.amountAvailable,
      sellerId: product.sellerId,
    })
  } else {
    res.status(400)
    throw new Error("invalid product data")
  }
})

const getProductsService = asyncHandler(async (req, res) => {
  const products = await ProductModel.find({})
  res.json(products)
})

const updateProductService = asyncHandler(async (req: any, res) => {
  const { cost, productName, amountAvailable } = req.body
  const product = await getProductByIdDao(req.params.id)
  const potentialSellerId = req.user._id
  const productSellerId = product.sellerId
  const { _id } = product
  if (productSellerId !== potentialSellerId.toString())
    throw new Error("You cannot update a product created by another seller")

  if (product) {
    const updatedProduct = await updateProductDao({
      _id,
      cost,
      productName,
      amountAvailable,
    })
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

const deleteProductService = asyncHandler(async (req: any, res) => {
  const product = await getProductByIdDao(req.params.id)
  const potentialSellerId = req.user._id
  const productSellerId = product.sellerId
  if (productSellerId !== potentialSellerId.toString())
    throw new Error("You cannot delete a product created by another seller")
  if (product) {
    await deleteProductByIdDao(product.id)
    res.json({ message: "Product deleted!" })
  } else {
    res.status(404)
    throw new Error("user not found")
  }
})

export {
  createProductService,
  getProductsService,
  updateProductService,
  deleteProductService,
}
