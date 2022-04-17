import asyncHandler from "express-async-handler"
import { createProductValidation } from "../validation/productValidation"
import {
  createProductDao,
  deleteProductByIdDao,
  getProductByIdDao,
  getProductsDao,
  updateProductDao,
} from "../dao/productDAO"
import { Request, Response } from "express"

import ProductModel from "../models/ProductModel"
import { getUserByIdDao } from "../dao/userDAO"
import { acceptableCoins } from "./userService"

const createProductService = async (req: any, res: Response) => {
  const { cost, productName, amountAvailable } = req.body

  if (!acceptableCoins.includes(cost))
  throw new Error("Products can only cost 5,10,20,50,100 cents")


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
}

const getProductsService = async (req: Request, res: Response) => {
  const products = await getProductsDao()
  res.json(products)
}

const updateProductService = async (req: any, res: Response) => {
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
}

const deleteProductService = async (req: any, res: Response) => {
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
}

const buyProductService = async (req: any, res:Response) => {
  const { id, productAmount } = req.params
  const { role, deposit } = await getUserByIdDao(req.user._id)

  if (role !== "buyer") throw new Error("Only buyers can purchase products!")

  const product = await getProductByIdDao(id)
  const { cost, amountAvailable } = product
  const totalSum = cost * productAmount
  const checkIfChange = parseInt(deposit) - totalSum

  if (productAmount > amountAvailable)
    throw new Error(
      `You cannot purchase ${productAmount} quantities of this product. There's only ${amountAvailable} available`
    )
  if (cost > deposit)
    throw new Error("You do not have sufficient funds to buy this product")
  if (totalSum > deposit)
    throw new Error(
      `You do not have sufficient funds to purchase ${productAmount} quantities of this product`
    )

  if (product) {
    res.status(200).json({
      totalAmountSpent: totalSum,
      productPurchased: product,
      changeAfterPurchase: checkIfChange,
    })
  } else {
    res.status(404)
    throw new Error("product not found")
  }
}

export {
  createProductService,
  getProductsService,
  updateProductService,
  deleteProductService,
  buyProductService,
}
