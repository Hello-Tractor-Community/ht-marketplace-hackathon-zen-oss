'use client'
import React, { useEffect, useState } from 'react'
import { DEFAULT_SLIDES } from './banner'
import { Button } from '../ui/button'

export default function CallToAction() {
	const [loading, setLoading] = useState(false)

	return (
		<section className='my-28 lg:mx-36 bg-white px-6 py-10 rounded-xl'>
			<div className='container h-full w-full'>
				{loading && <div>Loading...</div>}
				<div className='flex w-full flex-wrap justify-center gap-4  xl:justify-between'>
					<div className='flex flex-col items-center gap-4 xl:items-start '>
						<h1 className='text-center text-2xl font-manrope font-bold'>
							Lets Grow Together
						</h1>
						<h2 className='mt-4 max-w-md text-sm'>
							Get access to timely and affordable mechanization
							service whenever you need it. Whether you are
							getting a new or used tractor, we have got you
							covered.
						</h2>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col gap-2 p-4 rounded-lg'>
								<div
									style={{
										backgroundImage: `url(${DEFAULT_SLIDES[1].tractor_model_logo_url})`
									}}
									className='h-[200px] w-[200px] bg-contain bg-center bg-no-repeat'
								/>
							<Button variant="ghost" className='text-base w-full'>Buy New </Button>
						</div>

						<div className='flex flex-col gap-2 p-4'>
								<div
									style={{
										backgroundImage: `url(${DEFAULT_SLIDES[2].tractor_model_logo_url})`
									}}
									className='h-[200px] w-[200px] bg-contain bg-center bg-no-repeat'
								/>
							<Button variant="ghost" className='text-base w-full'>Buy Used</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
