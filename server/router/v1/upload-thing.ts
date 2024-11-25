import { Logger } from 'borgen'
import { createUploadthing, type FileRouter } from 'uploadthing/express'

const f = createUploadthing()

export const uploadRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  tractorImageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 6,
    },
  }).onUploadComplete((data) => {
    Logger.info({
      message: `Upload complete! ${data}`,
      messageColor: 'greenBright',
      infoColor: 'whiteBright',
    })
  }),
} satisfies FileRouter

export type OurFileRouter = typeof uploadRouter
