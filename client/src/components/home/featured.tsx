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

export default function FeaturesProducts() {
	const [loading, setLoading] = useState(false)
	const [products, setProducts] = useState([])

	return (
		<section className='relative lg:mx-32 space-y-6'>
			<div className='container h-full w-full'>
				<div className='relative flex w-full'>
					<h1 className='text-center text-2xl font-bold font-manrope'>
						Your recently viewed tractors
					</h1>
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
					{DEFAULT_SLIDES.map((slide, index) => {
						return (
							<SwiperSlide key={'tract' + index}
                            style={{
                                backgroundColor:"transparent"
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
