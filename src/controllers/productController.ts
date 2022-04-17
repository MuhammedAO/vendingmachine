import asyncHandler from "express-async-handler"
import {
  buyProductService,
  createProductService,
  deleteProductService,
  getProductsService,
  updateProductService,
} from "../services/productService"

const createProductController = asyncHandler(
  async (req, res) => await createProductService(req, res)
)

const getProductsController = asyncHandler(
  async (req, res) => await getProductsService(req, res)
)
const updateProductController = asyncHandler(
  async (req, res) => await updateProductService(req, res)
)
const deleteProductsController = asyncHandler(
  async (req, res) => await deleteProductService(req, res)
)
const buyProductsController = asyncHandler(
  async (req, res) => await buyProductService(req, res)
)


export {
  createProductController,
  getProductsController,
  updateProductController,
  deleteProductsController,
  buyProductsController
}
