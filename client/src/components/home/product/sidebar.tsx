import React, { Fragment, useEffect, useState } from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import { Star } from 'lucide-react'
import FiltersPrice from './filter-price'

export default function SidebarLeft({
	minPrice,
	maxPrice,
	loading,
	setMinPrice,
	setMaxPrice
}: {
	minPrice: number
	maxPrice: number
	loading: boolean
	setMinPrice: (value: number) => void
	setMaxPrice: (value: number) => void
}) {
	return (
		<div className='hidden h-full w-full max-w-[280px] flex-col gap-8 xl:flex'>
			{/* categories  */}
			<div className='relative flex w-full flex-col'>
				<div className='relative flex w-full'>
					<h1 className='after:bg-primary-700 w-full border-b border-b-gray-300 pb-2 text-xl font-bold capitalize after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[80px]'>
						Product Categories
					</h1>
				</div>
				<div className='my-4 flex'>
					<CategoriesAccordion className='w-full' />
				</div>
			</div>

			{/* filters */}
			<div className='relative flex w-full flex-col'>
				<div className='relative flex w-full'>
					<h1 className='after:bg-primary-700 w-full border-b border-b-gray-300 pb-2 text-xl font-bold capitalize after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[80px]'>
						Filters
					</h1>
				</div>
				<div className='my-4 flex'>
					<FiltersPrice
						loading={loading}
						minPrice={minPrice}
						maxPrice={maxPrice}
						setMinPrice={setMinPrice}
						setMaxPrice={setMaxPrice}
					/>
				</div>
			</div>

			{/* Latest products */}
			<div className='relative flex w-full flex-col'>
				<div className='relative flex w-full'>
					<h1 className='after:bg-primary-700 w-full border-b border-b-gray-300 pb-2 text-xl font-bold capitalize after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[80px]'>
						Latest Products
					</h1>
				</div>
				<div className='flex-flex-col my-4'>
					<LatestProducts />
				</div>
			</div>
		</div>
	)
}

function CategoriesAccordion({ className }: { className: string }) {
	const [loading, setLoading] = useState(false)

	return (
		<Accordion type='single' collapsible className={className}>
			{true ? (
				<AccordionItem value={`item-1`}>
					<AccordionTrigger
						className={cn('capitalize', '[&>svg]:hidden')}
					>
						<Link href={`/categories/products`}>Item link</Link>
					</AccordionTrigger>
					<AccordionContent>
						<div className='flex flex-col gap-4'>
							<Link
								href={`/categories/products`}
								className='hover:text-primary-900 min-w-40 capitalize'
							>
								Sub item link
							</Link>
						</div>
					</AccordionContent>
				</AccordionItem>
			) : (
				<div className='flex flex-col gap-4 py-4'>
					{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
						(item: number) => (
							<Skeleton key={item} className='h-4 w-full' />
						)
					)}
				</div>
			)}
		</Accordion>
	)
}


function LatestProducts() {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)

	return (
		<div className='mt-4 flex flex-col gap-10'>
			{true ? (
				<Fragment>
					<div className='flex items-center gap-8'>
						<Link href={`/products`}>
							<Image
								width='100'
								height='100'
								alt='product'
								src={''}
							/>
						</Link>

						<div className='flex flex-col gap-10'>
							<Link href={`/products/`}>
								<h1 className='text-sm capitalize'>
									Item name hre
								</h1>
							</Link>

							<div className='mt-4 flex justify-between gap-2'>
								400
							</div>

							<div className='inline-flex items-center'>
								<Star size={16} />
								<span className='ms-4'>4.0</span>
							</div>
						</div>
					</div>
				</Fragment>
			) : (
				<div className='flex flex-col gap-4'>
					{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
						(item: number) => (
							<Skeleton key={item} className='h-4 w-full' />
						)
					)}
				</div>
			)}
		</div>
	)
}
