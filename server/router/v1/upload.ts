import express from 'express'
import { createUploadthing } from 'uploadthing/express'

const router = express.Router()
const f = createUploadthing()

const uploadRouter = {
  productImage: f({ image: { maxFileSize: '4MB', maxFileCount: 10 } })
    .onUploadComplete(async ({ metadata, file }) => {
        console.log('Upload complete! Stored at', file.url)
    }),
}

router.post('/upload', async (req, res) => {
  try {
    const uploadResponse = await uploadRouter.productImage.handleUpload(
      req,
      res,
    )
    res.json({ status: 'success', data: uploadResponse })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Upload failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

export default router
