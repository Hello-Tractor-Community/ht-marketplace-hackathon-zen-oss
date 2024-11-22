import { Router } from 'express'
import * as StoreController from '../../controllers/store.Controller'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = Router()

router.post('/', StoreController.createStore)
router.post('/logo', upload.array('image'), StoreController.storeLogoUpload)
router.get('/', StoreController.getStore)
router.get('/all', StoreController.getAllStores)
router.put('/', StoreController.updateStore)
router.delete('/', StoreController.deleteStore)


export default router
