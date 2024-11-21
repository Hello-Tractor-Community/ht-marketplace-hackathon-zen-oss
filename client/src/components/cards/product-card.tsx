import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import React from 'react'

interface ProductType {
	name: string
	slug: string
	reviews: any[]
	subProducts: any[]
}

export default function ProductCard({ loading }: { loading: boolean }) {
	return (
		<div className='group flex flex-col items-center gap-4 rounded-md border border-gray-200 pb-8 hover:shadow-xl'>
			<Link
				href={` /products`}
				className='relative flex items-center justify-center p-1'
			>
				{loading ? (
					<Skeleton className='h-[30vh]' />
				) : (
					<div
						style={{
							height: '20vh',
							width: '160px',
							position: 'relative',
							backgroundImage: `url('https://source.unsplash.com/160x200/?product')`,
							backgroundPosition: 'center center',
							backgroundSize: 'contain',
							backgroundRepeat: 'no-repeat'
						}}
					></div>
				)}

				<div className='absolute left-0 top-20'>
					<span className='rounded-r-md bg-yellow-600 px-2 py-1 text-base font-bold text-white'>
						- 30%
					</span>
				</div>
			</Link>

			<div className='flex-flex-col items-start gap-2 px-4'>
				<div className='ease-l inline-flex items-center text-slate-300 duration-300'>
					RATINGS
					<span className='ms-4 font-bold'>4</span>
				</div>

				<Link href={`/products/7`} className='relative flex '>
					<h1 className='my-4 h-14 text-clip text-pretty text-justify text-xs capitalize lg:text-sm'>
						This is the product name
					</h1>
				</Link>
			</div>

			<div className='relative mb-2 flex justify-between px-4'>
				<span className='bg-primary-900 absolute inset-y-2 left-0 h-2 w-2 rounded-r-full'>
					Some amounts here
				</span>
			</div>
		</div>
	)
}
