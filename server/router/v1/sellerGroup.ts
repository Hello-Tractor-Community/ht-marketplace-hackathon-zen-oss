import { Router } from 'express'
import * as SellerController from '../../controllers/seller.Controller'
import { sellerAuth } from '../../middleware/userAuth'
import { adminSellerAuth } from '../../middleware/useradminAuth'

const router = Router()

router.post('/', SellerController.createSeller)
router.post('/login', SellerController.loginSeller)
router.get('/logout', sellerAuth, SellerController.logoutSeller)
router.get('/', SellerController.getSeller)
router.get('/all', SellerController.getAllSellers)
router.get('/search', SellerController.searchSeller)
router.put('/', sellerAuth, SellerController.updateSellerDetails)
router.put('/password', sellerAuth, SellerController.updateSellerPassword)
router.delete('/', adminSellerAuth, SellerController.deleteSeller)


export default router
