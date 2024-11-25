import { Router } from 'express'
import * as DealerController from '../../controllers/dealer.Controller'

const router = Router()

router.get('/all', DealerController.getAllDealers)
router.get('/', DealerController.getDealer)

export default router
