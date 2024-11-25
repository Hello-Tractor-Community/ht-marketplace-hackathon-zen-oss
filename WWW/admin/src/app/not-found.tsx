'use client'

import Link from 'next/link'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export default function NotFound() {
	return (
		<section className='bg-ducky'>
			<div className='container mx-auto flex min-h-screen items-center px-6 py-12'>
				<div className='mx-auto flex max-w-sm flex-col items-center text-center'>
					<div className='hidden items-center justify-center lg:flex'>
						<DotLottieReact
							src='https://assets-v2.lottiefiles.com/a/b5e42e6c-1188-11ee-ad15-e3551091f0b9/V9ZYVH9ZSi.lottie'
							height={500}
							width={500}
							loop
							autoplay
						/>
					</div>

					<Link href='/' className='flex items-center'>
						<span className='self-center whitespace-nowrap text-3xl font-bold tracking-tight dark:text-white'>
							DeriPesa
						</span>
					</Link>
					<p className='mt-2 text-gray-700'>
						The page you are looking for doesn't exist... Go home?
					</p>

					<div className='mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto'>
						<Link
							href='/'
							className='cursor-pointer rounded-full bg-primary px-6 py-2 text-white hover:bg-primary/80'
						>
							Go home
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
