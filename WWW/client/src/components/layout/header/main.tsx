'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { UserWishlist } from '@/components/modals/wishlist'
import { Button } from '@/components/ui/button'
import Filters from '@/components/home/filters'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/user-store'
import { QueryKeys } from '@/types'
import { debounce } from 'lodash'

export default function Main() {
	return (
		<section className='2xl:container 2xl:mt-[45px] 3xl:px-14'>
			<div className='flex w-full flex-col items-start md:flex-row'>
				<div className={cn('flex items-center gap-4')}>
					<Link href='/'>
						<Image
							src='/HT_LOGO_CMYK_Orange.png'
							alt='logo'
							width={4142}
							height={1883}
							className='w-[250px]'
						/>
					</Link>
				</div>

				<div className='mt-6 flex w-full flex-row items-start px-4 2xl:gap-12'>
					<SearchTractor />

					<UserWishlist />
				</div>
			</div>

			<Filters className='my-2' />
		</section>
	)
}

const SearchTractor = () => {
	const [isFocused, setIsFocused] = useState(false)
	const [previousSearches, setPreviousSearches] = useState<
		{ query: string; url: string }[]
	>([])
	const { queryParams, setQueryParams } = useUserStore((state) => state)
	const router = useRouter()
	const containerRef = useRef<HTMLDivElement>(null)

	const animation = {
		hide: { y: 82, opacity: 0 },
		show: { y: 0, opacity: 1 }
	}

	const debouncedSetQueryParams = debounce(
		(key: QueryKeys, value: string) => {
			setQueryParams({ ...queryParams, [key]: value })
		}
	)

	function handleSearch() {
		if (typeof window == 'undefined') return

		const searchParams = new URLSearchParams()
		for (const key in queryParams) {
			if (!queryParams[key as QueryKeys]) continue
			searchParams.set(key, queryParams[key as QueryKeys])
		}

		let newUrl =
			window.location.origin + '/search/' + '?' + searchParams.toString()

		router.push(newUrl)
	}

	function getPreviousSearches() {
		const searches = localStorage.getItem('ht-past-search')
		if (searches) {
			setPreviousSearches(JSON.parse(searches))
		}
	}

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsFocused(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		getPreviousSearches()
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])


	useEffect(() => {
		if (typeof window == 'undefined') return

		const searchParams = new URLSearchParams(window.location.search)
		const newQueryParams = {} as Record<QueryKeys, string>

		for (const key in queryParams) {
			const value = searchParams.get(key)
			if (value) newQueryParams[key as QueryKeys] = value
		}

		setQueryParams(newQueryParams)
	}, [])
	return (
		<section className='mt-2 flex w-full flex-col gap-4 md:mt-0 md:flex-row md:items-center 2xl:grid 2xl:grid-cols-10 2xl:place-items-center 2xl:gap-0'>
			<div
				className='relative w-full flex-1 2xl:col-span-9 2xl:flex-none'
				ref={containerRef}
			>
				<div
					className={cn(
						'absolute top-0 z-[500] -mt-[35px] w-full border border-transparent md:p-2',
						{
							'rounded-xl border-border bg-white': isFocused
						}
					)}
				>
					<div className='flex flex-row items-center gap-2'>
						<div
							className={cn(
								'relative flex h-9 w-full items-center gap-2 rounded-xl border-2 border-htractor-charcoal  px-4 py-6 font-manrope text-base shadow-none transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-htractor-hibiscus disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
							)}
						>
							<Search
								size={20}
								className={cn('text-muted-foreground', {
									'text-htractor-charcoal': isFocused
								})}
							/>
							<input
								placeholder='Find a tractor'
								onChange={(e) =>
									debouncedSetQueryParams(
										'userQuery',
										e.target.value
									)
								}
                                defaultValue={queryParams.userQuery}
								onFocus={() => setIsFocused(true)}
								className='hidden h-9 w-full bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed  disabled:opacity-50 md:flex md:text-sm'
							/>

							<input
								placeholder='Find a tractor'
                                defaultValue={queryParams.userQuery}
								onChange={(e) =>
									debouncedSetQueryParams(
										'userQuery',
										e.target.value
									)
								}
								className='flex h-9 w-full bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed  disabled:opacity-50 md:hidden md:text-sm'
							/>
						</div>
					</div>

					<motion.div
						initial='hide'
						animate={isFocused ? 'show' : 'hide'}
						variants={animation}
						transition={{ duration: 0.3 }}
						className={cn(
							'z-40 flex h-80 w-full flex-col overflow-y-auto p-4',
							{
								flex: isFocused,
								hidden: !isFocused
							}
						)}
					>
						<p className='font-[500] underline underline-offset-2'>
							Previous Searches
						</p>

						<div className='mt-4 flex h-full w-full flex-col'>
							{previousSearches.length < 1 ? (
								<p className='my-auto text-center text-muted-foreground'>
									No previous searches
								</p>
							) : (
								previousSearches.map((search, index) => (
									<div
										key={'search-history' + index}
										className='flex items-center gap-2'
									>
										<Search size={20} />
										<p>{search.query}</p>
									</div>
								))
							)}
						</div>
					</motion.div>
				</div>
			</div>

			<Button
				variant='default'
				size='lg'
				onClick={handleSearch}
				className='mt-4 rounded-md px-4 py-6 text-base text-white shadow-none md:ml-9 md:mt-0 3xl:w-[150px]'
			>
				Search tractor
			</Button>
		</section>
	)
}
