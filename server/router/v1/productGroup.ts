import { Router } from 'express'
import * as ProductController from '../../controllers/product.Controller'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


const router = Router()
router.post('/', upload.array('images'), ProductController.createProduct)
router.get('/', ProductController.getProduct)
router.get('/all', ProductController.getAllProducts)
router.get('/filter', ProductController.filterProducts)
router.put('/', upload.array('images'), ProductController.updateProduct)
router.delete('/', ProductController.deleteProduct)


export default router

