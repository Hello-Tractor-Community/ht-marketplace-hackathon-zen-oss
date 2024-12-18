import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'

interface ImageGalleryProps {
	images: string[]
}

export function TractorGallery({ images }: ImageGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)

	const nextImage = () => {
		setCurrentIndex((prev) => (prev + 1) % images.length)
	}

	const prevImage = () => {
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
	}

	return (
		<div className='relative flex flex-col lg:flex-row'>
			<div className='relative mx-auto h-fit w-fit md:aspect-square'>
				<div className='mx-auto rounded-lg bg-slate-100 md:w-full'>
					<div
						style={{
							backgroundImage: `url(${images[currentIndex]})`
						}}
						className='relative mx-auto h-[300px] w-[300px] bg-contain bg-center bg-no-repeat md:h-[750px] md:w-[750px] lg:h-[800px] lg:w-[800px]'
					></div>
				</div>

				<button
					onClick={prevImage}
					className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 transition-colors hover:bg-white hover:text-htractor-hibiscus'
					aria-label='Previous image'
				>
					<ChevronLeft className='h-6 w-6' />
				</button>
				<button
					onClick={nextImage}
					className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 transition-colors hover:bg-white hover:text-htractor-hibiscus'
					aria-label='Next image'
				>
					<ChevronRight className='h-6 w-6' />
				</button>

				<div className='absolute right-4 top-4 rounded-lg bg-white p-1 text-htractor-charcoal hover:cursor-pointer hover:text-htractor'>
					<Expand className='h-6 w-6' />
				</div>
			</div>

			<div className='mt-4 flex max-w-[350px] gap-2 overflow-x-auto px-4 md:max-w-full lg:flex-col'>
				{images.map((img, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors
              ${currentIndex === index ? 'border-blue-600' : 'border-transparent'}`}
					>
						<img
							src={img}
							alt={`Thumbnail ${index + 1}`}
							className='h-full w-full object-cover'
						/>
					</button>
				))}
			</div>
		</div>
	)
}
