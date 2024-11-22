import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { cn } from '@/lib/utils'
import './custom.css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'
import ProductCard from '../cards/product-card'
import { DEFAULT_SLIDES } from './banner'
import Link from 'next/link'

interface FeaturesProductsProps {
	title: string
	link: string
	className?: string
	products: typeof DEFAULT_SLIDES
}

export default function FeaturesProducts({
	title,
	link,
	className,
	products
}: FeaturesProductsProps) {
	const [loading, setLoading] = useState(false)

	return (
		<section className={cn('relative space-y-6 lg:mx-32', className)}>
			<div className='container h-full w-full'>
				<div className=' flex w-full items-center justify-between'>
					<h1 className='text-center capitalize font-manrope text-2xl font-bold'>
						{title}
					</h1>
					<Link
						href={link}
						className='font-[500] underline-offset-2 hover:underline'
					>
						See all
					</Link>
				</div>

				<Swiper
					breakpoints={{
						360: {
							slidesPerView: 1,
							spaceBetween: 40
						},
						575: {
							slidesPerView: 2,
							spaceBetween: 40
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 40
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 40
						},
						1280: {
							slidesPerView: 5,
							spaceBetween: 40
						}
					}}
					autoplay={{
						delay: 25000,
						disableOnInteraction: false
					}}
					spaceBetween={50}
					slidesPerView={1}
					navigation={true}
					pagination={true}
					modules={[Autoplay, Navigation, Pagination]}
					className={cn('h-full w-full')}
				>
					{products.map((slide, index) => {
						return (
							<SwiperSlide
								key={'tract' + index}
								style={{
									backgroundColor: 'transparent'
								}}
							>
								<ProductCard
									loading={loading}
									product={slide}
								/>
							</SwiperSlide>
						)
					})}
				</Swiper>
			</div>
		</section>
	)
}
