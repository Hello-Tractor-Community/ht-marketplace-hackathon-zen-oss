'use client'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { BarChart } from 'lucide-react'

export default function Menus() {
	const [loading, setLoading] = useState(false)
	const [pages, setPages] = useState([])

	const handleCategory = () => {
		document.querySelector('#categoryList')?.classList.toggle('!hidden')
	}

	return (
		<section className='hidden w-full py-2 lg:flex'>
			<div className='container h-full w-full'>
				{loading && <div>Loading...</div>}
				<div className='flex w-full  justify-between rounded-md border border-gray-200 p-2'>
					<div className='flex items-center gap-8'>
						<div
							className='bg-primary-900 mx-1 flex w-[260px] cursor-pointer items-center justify-between gap-1 rounded-md px-6 py-3'
							onClick={handleCategory}
						>
							<span className='uppercase'>categories</span>
							<BarChart className='h-6 w-6 text-white' />
						</div>
						<div className='flex'>
							<Link
								className='hover:text-primary-900 text-xl font-medium capitalize'
								href={''}
							>
								TEst item
							</Link>
						</div>
					</div>
					<div className='text-primary-900 me-10 flex items-center text-xl font-medium capitalize'>
						Free shipping over 0$
					</div>
				</div>
			</div>
		</section>
	)
}
