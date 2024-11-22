import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { HttpStatusCode } from 'axios'
import { Request, Response } from 'express'
import { IServerResponse } from '../types'

interface IUploadImage {
  req: Request
  res: Response<IServerResponse>
  Model: any
  modelName: string
  imageField: string
  maxFiles?: number
}

const uploadDir = path.resolve(__dirname, '..', 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const FILE_TYPE_MAP: Record<string, string> = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/webp': 'webp',
}

export const deleteImages = async (images: string[]) => {
  for (const image of images) {
    const imagePath = path.join(uploadDir, image)
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
    }
  }
}

export const processImage = async (file: Express.Multer.File) => {
  const fileName = file.originalname.replace(/ /g, '-')
  const newName = `img-${Date.now()}-${fileName.split('.')[0]}.webp`

  // Process and convert the image
  const processedImg = await sharp(file.buffer)
    .toFormat('webp', { quality: 90 })
    .toBuffer()

  // Save the processed image
  const filePath = path.join(uploadDir, newName)
  fs.writeFileSync(filePath, processedImg)

  return newName
}

export const uploadImages = async ({
  req,
  res,
  Model,
  modelName,
  imageField,
  maxFiles = 10,
}: IUploadImage) => {
  try {
    const files = req.files as Express.Multer.File[]

    // Check if any files were uploaded
    if (!files || files.length === 0) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'No files uploaded.',
        data: null,
      })
    }

    // Check if number of files exceeds limit
    if (files.length > maxFiles) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: `Maximum ${maxFiles} files allowed.`,
        data: null,
      })
    }

    // Validate file types
    const invalidFiles = files.filter(file => !FILE_TYPE_MAP[file.mimetype])
    if (invalidFiles.length > 0) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'One or more files have unsupported format.',
        data: null,
      })
    }

    // Get the document from the database
    const docId = res.locals.userId
    const document = await Model.findOne({ seller_id: docId })

    if (!document) {
      return res.status(HttpStatusCode.NotFound).json({
        status: 'error',
        message: `${modelName} not found.`,
        data: null,
      })
    }

    // Initialize image field as array if it doesn't exist
    if (!Array.isArray(document[imageField])) {
      document[imageField] = []
    }

    // Process all images
    const processedImages = await Promise.all(
      files.map(file => processImage(file))
    )

    // Add new images to the document
    document[imageField].push(...processedImages)
    await document.save()

    res.status(HttpStatusCode.Created).json({
      status: 'success',
      message: `${files.length} images have been uploaded successfully!`,
      data: document,
    })

  } catch (error) {
    console.error('Error uploading images:', error)
    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error uploading images.',
      data: null,
    })
  }
}

