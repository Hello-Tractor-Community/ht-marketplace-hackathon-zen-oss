import { Router } from 'express'
import * as SellerController from '../../controllers/seller.Controller'

const router = Router()

router.post('/', SellerController.createSeller)
router.post('/login', SellerController.loginSeller)
router.get('/logout', SellerController.logoutSeller)
router.get('/', SellerController.getSeller)
router.get('/all', SellerController.getAllSellers)
router.get('/search', SellerController.searchSeller)
router.put('/', SellerController.updateSellerDetails)
router.put('/phone', SellerController.updateSellerPhone)
router.put('/password', SellerController.updateSellerPassword)
router.delete('/', SellerController.deleteSeller)


export default router
