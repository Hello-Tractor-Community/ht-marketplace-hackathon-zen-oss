'use client'

import {
	generateUploadButton,
	generateUploadDropzone
} from '@uploadthing/react'

export const UploadButton = generateUploadButton({
	url: process.env.NEXT_PUBLIC_UPLOAD_URL + '/api/uploadthing'
})

export const UploadDropzone = generateUploadDropzone({
	url: process.env.NEXT_PUBLIC_UPLOAD_URL + '/api/uploadthing'
})
