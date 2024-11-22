'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Heart, Search } from 'lucide-react'

export default function Main() {
	const [openSearchMobile, setOpenSearchMobile] = useState(false)
	return (
		<section className='container mt-[80px] flex w-full items-center gap-12 py-8'>
			<div
				className={cn(
					'flex items-center gap-4 ',
					openSearchMobile && ' hidden lg:flex'
				)}
			>
				<div className='flex'>
					<Image
						src='/HT_LOGO_CMYK_Orange.jpg'
						alt='logo'
						width={4142}
						height={1883}
						className='w-[200px]'
					/>
				</div>
			</div>

			<SearchTractor />

			<div className='flex flex-col items-center'>
				<Heart />
				<p className='text-sm'>Wishlist</p>
			</div>
		</section>
	)
}

const SearchTractor = () => {
	const [isFocused, setIsFocused] = useState(false)

	const animation = {
		hide: { y: 82, opacity: 0 },
		show: { y: 55, opacity: 1 }
	}
	return (
		<div className='relative w-full'>
			<div
				className={cn(
					'relative flex h-9 w-full items-center gap-2 rounded-md border border-input bg-slate-50  px-4 py-6 font-manrope text-base shadow-none transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-htractor-hibiscus disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					{ 'ring-1 ring-htractor-hibiscus': isFocused }
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

			<motion.div
				initial='hide'
				animate={isFocused ? 'show' : 'hide'}
				variants={animation}
				transition={{ duration: 0.3 }}
				className={cn(
					'absolute top-0 z-40 h-80 w-full border border-border p-4 rounded-md bg-white',
					{ flex: isFocused, hidden: !isFocused }
				)}
			>
				<p>Search Results go here</p>
			</motion.div>
		</div>
	)
}
