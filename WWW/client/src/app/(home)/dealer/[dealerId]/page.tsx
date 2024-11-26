'use client'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'
import { Cog, Search, BadgeCheck, ArrowDownNarrowWide } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { DEFAULT_SLIDES } from '@/components/home/banner'
import ProductSearchCard from '@/components/cards/search-card'
import { SelectDropdown } from '@/components/home/filters'
import { toast } from 'sonner'

export default function DealerShop() {
	const [page, setPage] = useState<number>(1)
	const [search, setSearch] = useState<string>('')
	const [totalPages, setTotalPages] = useState<number>(1)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [filterData, setFilterData] = useState({
		enginehours: '',
		price: ''
	})

	const handlePageChange = (type: 'next' | 'back') => {
		if (type === 'next') {
			if (page === totalPages) return
			setPage(page + 1)
		} else {
			if (page === 1) return
			setPage(page - 1)
		}
	}

	async function handleSearch(type: 'clear' | 'search') {
		if (type === 'clear') {
			setSearch('')
			// TODO: CAll fetch listings
			return
		}

		if (search.length < 1) {
			return toast.error('Please enter a search query')
		}

		setIsLoading(true)
		let response: any
		setIsLoading(false)

		if (!response) return
		// UPdate state

		setTotalPages(1)
		setPage(1)
	}
	return (
		<section className='px-4 pb-32 pt-8  md:container lg:px-32'>
			<div className='rounded-lg border-4 border-gray-200 bg-white p-6'>
				<div className='flex flex-col gap-6 md:flex-row'>
					<img
						src={
							'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
						}
						alt='Profile'
						className='h-36 w-36 rounded-full border-4 border-white object-cover shadow-lg'
					/>
					<div>
						<p className='flex items-center gap-2 py-2 font-manrope text-2xl font-semibold'>
							Declan Motors Ltd{' '}
							<BadgeCheck className='h-5 w-5 text-blue-600' />
						</p>
						<p>
							Location:&nbsp;
							<span className='font-semibold'>
								Lagos, Nigeria
							</span>
						</p>
						<p className='mt-2 max-w-xl text-sm text-gray-600'>
							We are a leading tractor dealership in Nigeria. We
							offer a wide range of tractors and farm implements
							to meet the needs of our customers.
						</p>

						<p className='mt-2 cursor-pointer font-manrope text-xs font-[500] text-blue-600 underline-offset-2 hover:underline'>
							See on map
						</p>
					</div>
				</div>
			</div>

			<div>
				<div className='mt-4 flex items-center gap-12 overflow-x-auto'>
					<div className='flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-slate-100 p-1'>
						<p className='cursor-pointer rounded-full bg-gray-500 px-3 py-1 font-manrope text-xs text-white hover:bg-slate-200'>
							All
						</p>
						<p className='cursor-pointer rounded-full px-3 py-1 font-manrope text-xs hover:bg-slate-200 '>
							Used
						</p>
						<p className='cursor-pointer rounded-full px-3 py-1 font-manrope text-xs hover:bg-slate-200 '>
							New
						</p>
					</div>

					<div className='flex flex-1 items-center gap-2'>
						<div
							className={cn(
								'relative flex h-9 w-full items-center gap-2 rounded-xl border border-gray-200  px-4 py-6 font-manrope text-base shadow-none transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-htractor-hibiscus disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
							)}
						>
							<Search
								size={20}
								className={cn('text-muted-foreground')}
							/>
							<input
								placeholder='Search shop'
								className='flex h-9 min-w-[150px] bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed  disabled:opacity-50 md:w-full md:text-sm'
							/>
						</div>
					</div>

					<div className='flex items-center gap-2'>
						<SelectDropdown
							type='Engine Hours'
							icon={<Cog size={16} />}
							selectedItem={filterData.enginehours}
							setSelectedItem={(item) => {
								if (item !== null) {
									setFilterData({
										...filterData,
										enginehours: item
									})
								}
							}}
							listItems={[
								'0-500hrs',
								'500-1000hrs',
								'1000-2000hrs',
								'2000+hrs'
							]}
						/>

						<SelectDropdown
							type='Price'
							icon={<ArrowDownNarrowWide size={16} />}
							selectedItem={filterData.price}
							setSelectedItem={(item) => {
								if (item !== null) {
									setFilterData({
										...filterData,
										price: item
									})
								}
							}}
							listItems={['500k-1.5m', '2m-3m', '4m-5m', '5m+']}
						/>
					</div>
				</div>
			</div>

			<div className='mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2'>
				{DEFAULT_SLIDES.map((slide, i) => {
					return <ProductSearchCard key={i} product={slide} />
				})}
			</div>

			<div className='mt-12 rounded-lg border-4 border-gray-200 bg-white py-2'>
				<Pagination>
					<PaginationContent className='p-1'>
						<PaginationItem>
							<PaginationPrevious
								className='cursor-pointer text-gray-800'
								onClick={() => handlePageChange('back')}
							/>
						</PaginationItem>
						<PaginationItem className='text-gray-800'>
							{page}
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>{totalPages || 0}</PaginationItem>
						<PaginationItem>
							<PaginationNext
								className='cursor-pointer text-gray-800'
								onClick={() => handlePageChange('next')}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</section>
	)
}
