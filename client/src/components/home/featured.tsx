import React, {  useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { cn } from '@/lib/utils'
import './custom.css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'
import ProductCard from '../cards/product-card'

export default function FeaturesProducts() {
	const [loading, setLoading] = useState(false)
	const [products, setProducts] = useState([])

	return (
		<section className='relative py-10'>
			<div className='container h-full w-full'>
				<div className='relative flex w-full'>
					<h1 className='after:bg-primary-700 w-full border-b border-b-gray-300 pb-2 text-xl font-bold capitalize after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[80px]'>
						Feature Heading
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
					navigation={false}
					pagination={true}
					modules={[Autoplay, Navigation, Pagination]}
					className={cn('mySwiper h-full w-full')}
				>
					<SwiperSlide className='relative py-10'>
						<ProductCard loading={loading} />
					</SwiperSlide>
				</Swiper>
			</div>
		</section>
	)
}
