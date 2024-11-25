'use client'

import { DEFAULT_SLIDES } from '@/components/home/banner'
import ProductSearchCard from '@/components/cards/search-card'

export default function Search() {
	return (
		<section className='px-4 md:container pb-32  pt-8 lg:px-32'>
			<h1 className='text-2xl font-[500]'>Available tractors.</h1>
			<div className='mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2'>
				{DEFAULT_SLIDES.map((slide, i) => {
					return <ProductSearchCard key={i} product={slide} />
				})}
			</div>
		</section>
	)
}
