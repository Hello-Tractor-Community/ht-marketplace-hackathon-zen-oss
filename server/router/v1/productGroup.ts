import { Router } from 'express'
import * as ProductController from '../../controllers/product.Controller'

const router = Router()
router.post('/', ProductController.createProduct)
router.get('/', ProductController.getProduct)
router.get('/all', ProductController.getAllProducts)
router.get('/filter', ProductController.filterProducts)
router.put('/', ProductController.updateProduct)
router.delete('/', ProductController.deleteProduct)

export default router
