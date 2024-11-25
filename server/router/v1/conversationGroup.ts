import { Router } from 'express'
import * as conversationsController from '../../controllers/conversation.Controller.ts'

const router = Router()

router.post('/', conversationsController.createConversation)
router.get('/messages', conversationsController.getMessagesInConversation)
router.get('/all', conversationsController.getConversations)
router.put('/', conversationsController.updateHasNewMsg)

export default router
