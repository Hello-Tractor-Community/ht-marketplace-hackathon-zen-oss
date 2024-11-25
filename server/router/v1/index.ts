import { Router } from 'express'
import { HttpStatusCode } from 'axios'
//import userGroup from './userGroup'
import sellerGroup from './sellerGroup'
import buyerGroup from './buyerGroup'
import wishlistGroup from './wishlistGroup'
import adminGroup from './adminGroup'
import reviewsGroup from './reviewsGroup'
import conversationGroup from './conversationGroup'
import productGroup from './productGroup'
import dealerGroup from './dealerGroup'

const router = Router()

// Core routes
router.get('/ping', (_, res) => {
	res.status(HttpStatusCode.Ok).json({ message: 'pong', alive: true })
})

// Route groups
router.use('/seller', sellerGroup)
router.use('/buyer', buyerGroup)
router.use('/admin', adminGroup)
router.use('/wishlist', wishlistGroup)
router.use('/reviews', reviewsGroup)
router.use('/conversation', conversationGroup)
router.use('/product', productGroup)
router.use('/dealer', dealerGroup)


export default router
