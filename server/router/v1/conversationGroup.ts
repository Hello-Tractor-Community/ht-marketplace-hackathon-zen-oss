import { Router } from 'express'
import * as conversationsController from '../../controllers/conversation.Controller.ts'
import { sellerAndBuyerAuth } from '../../middleware/userAuth.ts'

const router = Router()

router.post('/', sellerAndBuyerAuth, conversationsController.createConversation)
router.get('/messages', sellerAndBuyerAuth, conversationsController.getMessagesInConversation)
router.get('/all', sellerAndBuyerAuth, conversationsController.getAllConversations)
router.put('/', sellerAndBuyerAuth, conversationsController.updateHasNewMsg)

export default router
