'use client'

import { DEFAULT_SLIDES } from '@/components/home/banner'
import ProductSearchCard from '@/components/cards/search-card'
import { useUserStore } from '@/store/user-store'
import { useEffect } from 'react'

export default function Search() {
	const { queryParams } = useUserStore((state) => state)

    async function handleSearch() {
        // Make api call
    }

	useEffect(() => {
        handleSearch()
    }, [queryParams])
	return (
		<section className='px-4 pb-32 pt-8  md:container lg:px-32'>
			<h1 className='text-2xl font-[500]'>Available tractors.</h1>
			<div className='mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2'>
				{DEFAULT_SLIDES.map((slide, i) => {
					return <ProductSearchCard key={i} product={slide} />
				})}
			</div>
		</section>
	)
}
