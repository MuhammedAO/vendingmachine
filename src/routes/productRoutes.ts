import express from 'express'
import { authGuard } from '../middleware/authMiddleware'
import { createProductService, deleteProductService, getProductsService, updateProductService } from '../services/productService'


const router = express.Router()

router.get('/', getProductsService)
router.post('/create', authGuard, createProductService)
router.put('/update/:id', authGuard, updateProductService)
router.delete('/delete/:id', authGuard, deleteProductService)

export default router