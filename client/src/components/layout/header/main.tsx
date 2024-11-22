'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Heart, Search } from 'lucide-react'
import { UserWishlist } from '@/components/modals/wishlist'
import { Button } from '@/components/ui/button'

export default function Main() {
	const [openSearchMobile, setOpenSearchMobile] = useState(false)
	return (
		<section className='container mt-[45px] flex w-full items-center gap-12 py-8'>
			<div
				className={cn(
					'flex items-center gap-4 ',
					openSearchMobile && ' hidden lg:flex'
				)}
			>
				<div className='flex'>
					<Image
						src='/HT_LOGO_CMYK_Orange.png'
						alt='logo'
						width={4142}
						height={1883}
						className='w-[250px]'
					/>
				</div>
			</div>

			<SearchTractor />

			<UserWishlist />
		</section>
	)
}

const SearchTractor = () => {
	const [isFocused, setIsFocused] = useState(false)

	const animation = {
		hide: { y: 82, opacity: 0 },
		show: { y: 0, opacity: 1 }
	}
	return (
		<section className='flex w-full flex-row items-center gap-2'>
			<div className='relative w-full'>
				<div
					className={cn(
						'absolute -top-9 z-40 w-full border border-transparent p-2',
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
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
								className='flex h-9 w-full bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
							/>
						</div>
					</div>

					<motion.div
						initial='hide'
						animate={isFocused ? 'show' : 'hide'}
						variants={animation}
						transition={{ duration: 0.3 }}
						className={cn('z-40 h-80 w-full overflow-y-auto p-4', {
							flex: isFocused,
							hidden: !isFocused
						})}
					>
						<p>Search Results go here</p>
					</motion.div>
				</div>
			</div>

			<Button
				variant='default'
				size='lg'
				className='w-[150px] rounded-md px-4 py-6 text-base text-white shadow-none'
			>
				Search tractor
			</Button>
		</section>
	)
}
