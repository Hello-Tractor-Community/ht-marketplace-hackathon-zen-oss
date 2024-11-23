import { Router } from 'express'
import * as BuyerController from '../../controllers/buyer.Controller'
const router = Router()

router.post('/', BuyerController.createBuyer)
router.post('/login', BuyerController.loginBuyer)
router.get('/google', BuyerController.googleSSO)
router.get('/callback', BuyerController.googleSSOCallback)
router.get('/logout', BuyerController.logoutBuyer)
router.get('/', BuyerController.getBuyer)
router.get('/all', BuyerController.getAllBuyers)
router.put('/', BuyerController.updateBuyerDetails)
router.put('/password', BuyerController.updateBuyerPassword)
router.delete('/', BuyerController.deleteBuyer)

export default  router
