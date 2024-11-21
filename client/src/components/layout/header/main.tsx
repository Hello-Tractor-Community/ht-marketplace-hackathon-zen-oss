'use client'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

export default function Main() {
	const [openSearchMobile, setOpenSearchMobile] = useState(false)
	return (
		<section className='w-full py-2'>
			<div className='container h-full w-full'>
				<div className='flex h-[84px] w-full items-center justify-between lg:gap-x-24'>
					<div
						className={cn(
							'flex items-center gap-4 ',
							openSearchMobile && ' hidden lg:flex'
						)}
					>
						<div className='flex'>
							<h1 className='text-2xl font-bold'>
								Hello Tractor
							</h1>
						</div>
					</div>
					<div className='flex w-full items-center justify-end gap-2 lg:hidden'></div>
					<Input />
				</div>
			</div>
		</section>
	)
}
