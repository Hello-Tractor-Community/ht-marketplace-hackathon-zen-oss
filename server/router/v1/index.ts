import { Router } from 'express'
//import userGroup from './userGroup'
import sellerGroup from './sellerGroup'
import buyerGroup from './buyerGroup'
import { HttpStatusCode } from 'axios'

const router = Router()

// Core routes
router.get('/ping', (_, res) => {
	res.status(HttpStatusCode.Ok).json({ message: 'pong', alive: true })
})

// Route groups
router.use('/seller', sellerGroup)
router.use('/buyer', buyerGroup)


export default router
