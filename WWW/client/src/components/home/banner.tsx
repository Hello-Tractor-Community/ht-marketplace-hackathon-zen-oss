import React, { useState } from 'react'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'
import './custom.css'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { buttonVariants } from '@/components/ui/button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Image from 'next/image'

export const DEFAULT_SLIDES = [
	{
		model: 'Sonalika DI-35',
		tractor_model_logo_url:
			'https://ht-mobileassets.s3.amazonaws.com/tractorModels/DI-35-removebg-preview.png'
	},
	{
		model: 'Case IH JX90',
		tractor_model_logo_url:
			'https://ht-mobileassets.s3.amazonaws.com/tractorModels/Case_IH_JX90.png'
	},
	{
		model: 'John Deere 6095B',
		tractor_model_logo_url:
			'https://ht-mobileassets.s3.amazonaws.com/tractorModels/6095B-removebg-preview.png'
	},
	{
		model: 'Sonalika DI-75',
		tractor_model_logo_url:
			'https://ht-mobileassets.s3.amazonaws.com/tractorModels/DI-75-removebg-preview.png'
	},
	{
		model: 'John Deere 6XXXB OOS',
		tractor_model_logo_url:
			'https://ht-mobileassets.s3.amazonaws.com/tractorModels/JD_6XXXB_OOS.png'
	}
]

export default function Banner() {
	return (
		<section className='mt-8 lg:mx-32'>
			<div className='container h-full w-full'>
				<div className=''>
					<HomeSlide className='grid-area-swiper' />
				</div>
			</div>
		</section>
	)
}

function HomeSlide({ className }: { className?: string }) {
	const [loading, setLoading] = useState(false)
	const [slides, setSlides] = useState(DEFAULT_SLIDES)
	const [colorIndex, setColorIndex] = useState(0)

	const colors = ['#93c393', '#93c2c6', '#2f1c54']

	const animation = {
		title: {
			hide: { x: 82, opacity: 0 },
			show: { x: 0, opacity: 1 }
		},
		subtitle: {
			hide: { x: 82, opacity: 0 },
			show: { x: 0, opacity: 1 }
		},
		button: {
			hide: { x: 82, opacity: 0 },
			show: { x: 0, opacity: 1 }
		}
	}
	return (
		<Swiper
			autoplay={{
				delay: 4000,
				disableOnInteraction: false
			}}
			spaceBetween={50}
			slidesPerView={1}
			navigation={false}
			pagination={true}
			onActiveIndexChange={() => {
				if (colorIndex == colors.length - 1) {
					setColorIndex(0)
				}
				setColorIndex((prev) => prev + 1)
			}}
			modules={[Autoplay, Navigation, Pagination]}
			className={cn('h-full w-full ', className)}
		>
			{slides.map((slide, index) => {
				return (
					<SwiperSlide
						key={'tract' + index}
						style={{
							height: '500px',
							width: '100%',
							backgroundColor: colors[colorIndex]
						}}
					>
						<div className='flex w-full items-center justify-between py-36 px-28'>
							<div className='grid w-fit grid-cols-1  place-content-start justify-items-start  gap-2 capitalize'>
								<motion.h1
									initial={animation.title.hide}
									whileInView={animation.title.show}
									transition={{ delay: 0.3 }}
									className={cn(
										'font-sans text-xl font-semibold capitalize lg:text-4xl line-clamp-1',
										{ 'text-white': colorIndex == 2 }
									)}
								>
									{slide.model}
								</motion.h1>
								<motion.h2
									initial={animation.subtitle.hide}
									whileInView={animation.subtitle.show}
									transition={{ delay: 0.25 }}
									className={cn(
										'max-w-60 font-sans text-left text-sm leading-8 lg:max-w-screen-md lg:text-xl',
										{ 'text-white': colorIndex == 2 }
									)}
								>
									{slide.model}
								</motion.h2>
								<motion.a
									initial={animation.button.hide}
									whileInView={animation.button.show}
									transition={{ delay: 0.2 }}
									className={cn(
										buttonVariants({ variant: 'default' }),
										'rounded px-4 py-6 text-lg text-white mt-4 w-[150px] text-center'
									)}
									href={`/links/here`}
								>
									Buy now
								</motion.a>
							</div>

							<Image
								width={800}
								height={800}
								src={slide.tractor_model_logo_url}
								alt={slide.model}
								className='max-w-[55%]'
							/>
						</div>
					</SwiperSlide>
				)
			})}
		</Swiper>
	)
}
