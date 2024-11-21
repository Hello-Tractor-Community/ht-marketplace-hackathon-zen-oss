import 'swiper/css'
import './custom.css'
import React from 'react'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { cn } from '@/lib/utils'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Headset, CreditCard, LockKeyhole, Truck, Calendar } from 'lucide-react'

export default function Payments() {
	return (
		<section className='mt-4'>
			<div className='container h-full w-full'>
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
					className={cn('mySwiper h-full w-full border shadow-xl')}
				>
					<SwiperSlide className='relative py-10'>
						<div
							className='flex items-center justify-center gap-8
            after:translate-x-14 after:bg-neutral-200 lg:after:h-10 lg:after:w-[2px]'
						>
							<Headset className='h6 text-primary-900 w-6' />
							<div className='flex flex-col justify-center'>
								<h1 className='font-bold uppercase'>24/7</h1>
								<h2 className='text-sm font-normal'>
									Support every time
								</h2>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className='relative py-10'>
						<div className='flex items-center justify-center gap-4 after:translate-x-14 after:bg-neutral-200 lg:after:h-10 lg:after:w-[2px]'>
							<CreditCard className='h6 text-primary-900 w-6' />
							<div className='flex flex-col'>
								<h1 className='font-bold uppercase'>
									accept payment
								</h1>
								<h2 className='text-sm font-normal'>
									visa, paypal, master
								</h2>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className='relative py-10'>
						<div className='flex items-center justify-center gap-4 after:translate-x-14 after:bg-neutral-200 lg:after:h-10 lg:after:w-[2px]'>
							<LockKeyhole className='h6 text-primary-900 w-6' />
							<div className='flex flex-col'>
								<h1 className='font-bold uppercase'>
									secured payment
								</h1>
								<h2 className='text-sm font-normal'>
									100% secured
								</h2>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className='relative py-10'>
						<div className='flex items-center justify-center gap-4 after:translate-x-14 after:bg-neutral-200 lg:after:h-10 lg:after:w-[2px]'>
							<Truck className='h6 text-primary-900 w-6' />
							<div className='flex flex-col'>
								<h1 className='font-bold uppercase'>
									free shipping
								</h1>
								<h2 className='text-sm font-normal'>
									over over 300$
								</h2>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className='relative py-10'>
						<div className='flex items-center justify-center gap-4 after:translate-x-14 after:bg-neutral-200 lg:after:h-10 lg:after:w-[2px]'>
							<Calendar className='h6 text-primary-900 w-6' />
							<div className='flex flex-col'>
								<h1 className='font-bold uppercase'>
									30 days return
								</h1>
								<h2 className='text-sm font-normal'>
									30 days guarentee
								</h2>
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</section>
	)
}
