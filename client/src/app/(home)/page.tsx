'use client'

import Banner, { DEFAULT_SLIDES } from '@/components/home/banner'
import CallToAction from '@/components/home/cta'
import FeaturesProducts from '@/components/home/featured'
import { UploadButton, UploadDropzone } from '@/components/upload/upload'

export default function Home() {
	return (
		<div className='mb-36'>
			<div className='bg-red-500'>
				<UploadDropzone
					endpoint='imageUploader'
					onClientUploadComplete={(res) => {
						// Do something with the response
						console.log('Files: ', res)
						alert('Upload Completed')
					}}
					onUploadError={(error: Error) => {
						// Do something with the error.
						alert(`ERROR! ${error.message}`)
					}}
				/>
			</div>
			<Banner />
			<FeaturesProducts
				title='Your recently viewed tractors'
				link='/'
				products={DEFAULT_SLIDES}
				className='mt-24'
			/>

			<CallToAction />

			<FeaturesProducts
				title='Brand New tractors'
				link='/'
				products={DEFAULT_SLIDES}
				className='mt-24'
			/>

			<FeaturesProducts
				title='Used tractors'
				link='/'
				products={DEFAULT_SLIDES}
				className='mt-24'
			/>
		</div>
	)
}
