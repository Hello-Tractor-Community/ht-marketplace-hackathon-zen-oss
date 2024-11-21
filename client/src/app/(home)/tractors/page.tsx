'use client'
import React, { useState } from 'react'
import SidebarLeft from '@/components/home/product/sidebar'
import MainProduct from '@/components/home/product/main'

export default function Page() {
	const [loading, setLoading] = useState(false)
	const [minPrice, setMinPrice] = useState<number>(0)
	const [maxPrice, setMaxPrice] = useState<number>(10000)

	return (
		<section className='my-6 h-full w-full'>
			<div className='container h-full w-full'>
				<div className='flex h-full w-full gap-14'>
					<SidebarLeft
						minPrice={minPrice}
						maxPrice={maxPrice}
						loading={loading}
						setMinPrice={setMinPrice}
						setMaxPrice={setMaxPrice}
					/>
					<MainProduct
						minPrice={minPrice}
						maxPrice={maxPrice}
						loading={loading}
						setLoading={setLoading}
						setMinPrice={setMinPrice}
						setMaxPrice={setMaxPrice}
					/>
				</div>
			</div>
		</section>
	)
}
