import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { cn } from '@/lib/utils'
import './custom.css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'
import Link from 'next/link'

export default function BrandList() {
	const [loading, setLoading] = useState(false)
	const [brands, setBrands] = useState([])

	useEffect(() => {
		const getProducts = () => {
			setLoading(true)
			axios
				.get(process.env.NEXT_PUBLIC_API_URL + '/api/brands')
				.then((response) => {
					setBrands(response.data.data)
				})
				.catch((error) => {
					console.log(error.message)
				})
				.finally(() => {
					setLoading(false)
				})
		}
		getProducts()
	}, [])

	return (
		<section className='relative py-10'>
			<div className='container h-full w-full'>
				{loading && <div>Loading...</div>}
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
					className={cn(
						'mySwiper flex w-full justify-between gap-10 border border-gray-200 py-10'
					)}
				>
					<SwiperSlide className='relative py-6'>
						<Link href='#'>Tractor brand</Link>
					</SwiperSlide>
				</Swiper>
			</div>
		</section>
	)
}
