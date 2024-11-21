import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'
import "./custom.css"
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { m } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

export default function Banner() {
	return (
		<section>
			<div className='container h-full w-full'>
				<div className='grid-hero grid'>
					<CategoryList className='grid-area-categories me-4 hidden w-[280px] lg:flex' />
					<HomeSlide className='grid-area-swiper' />
				</div>
			</div>
		</section>
	)
}

function CategoryList({ className }: { className: string }) {
	const [loading, setLoading] = useState(false)
	const [categories, setCategories] = useState([])
	const router = useRouter()

	return (
		<div
			id='categoryList'
			className={`flex flex-col gap-4 p-4 ${className}`}
		>
			{loading && <div>Loading...</div>}

			<div className='hover:text-primary-800 group group relative inline-flex w-full items-center capitalize hover:cursor-pointer'>
				<div className='flex w-full items-center gap-4'>
					<span>Test Item</span>
					<ChevronRight className='ms-auto' />
				</div>

				<div>
					<div className='mt-100 absolute left-0 z-40 hidden w-[600px] grid-cols-3 gap-4 bg-white p-4 text-black shadow-md group-hover:grid'>
						<Link
							href={`/categories/products`}
							className='hover-text-primary-700 min-w-40 '
						>
							Sub Item 2
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

function HomeSlide({ className }: { className?: string }) {
	const animation = {
		hide: { x: 82, opacity: 0 },
		show: { x: 0, opacity: 1 }
	}
	const [loading, setLoading] = useState(false)
	const [slides, setSlides] = useState([])

	return (
		<Swiper
			autoplay={{
				delay: 5000,
				disableOnInteraction: false
			}}
			spaceBetween={50}
			slidesPerView={1}
			navigation={false}
			pagination={true}
			modules={[Autoplay, Navigation, Pagination]}
			className={cn('mySwiper h-full w-full shadow-xl', className)}
		>
			<SwiperSlide
				className='[&>button:block]  relative'
				style={{
					height: '600px',
					width: '100%',
					backgroundSize: 'cover',
					backgroundPosition: 'top'
				}}
			>
				{true ? (
					<div className='lg:top-30 absolute left-10 top-60 m-auto grid w-fit grid-cols-1  place-content-start justify-items-start  gap-8 capitalize text-white drop-shadow-2xl lg:left-10'>
						<m.h1
							initial={animation.hide}
							whileInView={animation.show}
							transition={{ delay: 0.3 }}
							className='text-xl font-bold tracking-widest lg:text-2xl'
						>
							Item title here
						</m.h1>
						<m.h2 className=' lowwercase max-w-60 text-left text-sm leading-8 tracking-widest lg:max-w-screen-md lg:text-xl'>
							Item subtitle goes here
						</m.h2>
						<m.a
							className='rounded-sm bg-white p-3 text-black shadow-white hover:bg-black hover:text-white  hover:shadow-lg'
							href={`/links/here`}
						>
							Link name
						</m.a>
					</div>
				) : (
					<div className='flex h-full w-full items-center justify-center '>
						<Button
							className='hover:bg-primary-800 p-8 text-2xl hover:shadow-2xl'
							variant='link'
							size='lg'
						>
							<Link
								className='uppercase text-white'
								href={`links/here`}
							>
								shop
							</Link>
						</Button>
					</div>
				)}
			</SwiperSlide>
		</Swiper>
	)
}
