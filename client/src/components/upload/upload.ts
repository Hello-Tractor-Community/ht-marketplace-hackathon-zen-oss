'use client'
import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

export const UploadButton = generateUploadButton({
    url: 'https://mighty-dingo-54.telebit.io/api/uploadthing'
});

export const UploadDropzone = generateUploadDropzone({
    url: 'https://mighty-dingo-54.telebit.io/api/uploadthing'
})

