import express from 'express'
import { buyProductsController, createProductController, deleteProductsController, getProductsController, updateProductController } from '../controllers/productController'
import { authGuard } from '../middleware/authMiddleware'


const router = express.Router()

router.get('/', getProductsController)
router.post('/create', authGuard, createProductController)
router.put('/update/:id', authGuard, updateProductController)
router.delete('/delete/:id', authGuard, deleteProductsController)


//buy
router.post('/buy/:id/:productAmount', authGuard, buyProductsController)

export default router