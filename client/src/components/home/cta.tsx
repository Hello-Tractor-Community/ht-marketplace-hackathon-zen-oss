import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'

export default function Cta() {
	const [loading, setLoading] = useState(false)

	return (
		<section
			className='lg:[500px] my-10 bg-red-500 flex w-full flex-col gap-4 sm:h-[200px]'
			style={{
				height: '500px',
				width: '100%',
				backgroundImage: `url('https://source.unsplash.com/1600x900/?product')`,
				backgroundPosition: 'top',
				backgroundSize: 'cover'
			}}
		>
			<div className='flex h-full items-center justify-around gap-20'>
				<h1 className='text-[100px] font-bold uppercase text-white'>
					Title here
				</h1>

				<h2 className='text-[60px] font-bold capitalize text-white'>
					Subtitle here
				</h2>

				<Button variant='link' size='default'>
					Link here
				</Button>
			</div>
		</section>
	)
}
