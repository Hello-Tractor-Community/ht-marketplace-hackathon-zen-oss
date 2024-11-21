'use client'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function TopCategories() {
	const [loading, setLoading] = useState(false)
	const [categories, setCategories] = useState([])

	return (
		<section className='w-full py-10'>
			<div className='container h-full w-full'>
				{loading && <div>Loading...</div>}
				<div className='flex w-full flex-wrap justify-center gap-10 xl:flex-nowrap xl:justify-between'>
					<div className='flex flex-col items-center gap-4 xl:items-start '>
						<h1 className='text-center text-2xl font-bold leading-8 lg:text-left'>
							Top Categories in Sales and Trending
						</h1>
						<h2 className='mt-4 max-w-screen-md text-center text-sm'>
							Last mont up to 1500+ Products Sales From this
							category. You can choose a Product from from here
							and save money
						</h2>
					</div>

					<div className='grid grid-cols-2 gap-4 md:grid-cols-4 '>
						<Link
							href={`/categories/item/products`}
							className='hover:border-primary-200 flex max-w-xl cursor-pointer flex-col items-center justify-between gap-12 gap-y-2 rounded-md border border-gray-200 px-10 py-4'
						>
							<Image
								src={''}
								alt='category'
								width='50'
								height='50'
							/>
							<h3 className='text-center text-sm capitalize'>
								Category name
							</h3>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
