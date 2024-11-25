import React from 'react'
import { BadgeCheck, Cog, Info, MapPinned } from 'lucide-react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import Link from 'next/link'
import { Badge } from '../ui/badge'

interface TractorInfoProps {
	title: string
	price: number
	condition: string
	seller: {
		name: string
		rating: number
		totalRatings: number
		avatar: string
	}
}

export function TractorInfo({
	title,
	price,
	condition,
	seller
}: TractorInfoProps) {
	return (
		<div className='w-full space-y-6 p-6'>
			<h1 className='text-2xl font-[500] text-gray-900'>{title}</h1>

			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<img
						src={seller.avatar}
						alt={seller.name}
						className='h-8 w-8 rounded-full'
					/>
					<div>
						<p className='font-medium'>{seller.name}</p>
						<p className='flex items-center gap-1 text-sm text-blue-600'>
							<BadgeCheck className='h-4 w-4' />
							Verified Seller
						</p>
					</div>
				</div>
				<button className='text-htractor-sage underline-offset-2 hover:underline'>
					More from this seller
				</button>
			</div>

			<div>
				<div className='mb-2 flex items-baseline gap-2'>
					<span className='font-manrope text-3xl font-bold'>
						KES {price.toFixed(2)}
					</span>
				</div>
				<p className='text-sm text-gray-600'>
					Price may (vary) based on customer agreements made with
					seller*
				</p>
			</div>

			<div className='mt-1 flex w-full items-center gap-2'>
				<Badge
					variant='secondary'
					className='border border-gray-200 bg-white font-manrope font-normal capitalize text-black'
				>
					2023 Model
				</Badge>
				<Badge
					variant='secondary'
					className='border border-gray-200 bg-white font-manrope font-normal text-black'
				>
					25 HP
				</Badge>
				<Badge
					variant='secondary'
					className='flex items-center gap-0.5 border border-gray-200 bg-white font-manrope font-normal text-black'
				>
					<Cog size={14} />
					2034 Hours
				</Badge>

				<Badge
					variant='secondary'
					className='flex items-center gap-0.5 border border-gray-200 bg-white font-manrope font-normal text-black'
				>
					New
				</Badge>

                <Link href='/' className='text-sm hover:underline underline-offset-2 ml-auto hover:text-htractor-sage'>More Info...</Link>
			</div>

			<div className='flex items-center gap-2'>
				<span className='font-medium'>Condition:</span>
				<span>{condition}</span>
			</div>

			<div className='space-y-3'>
				<Button className='w-full rounded-full py-6 text-base'>
					Start Chat
				</Button>
				<Button
					variant='outline'
					className='w-full rounded-full py-6 text-base'
				>
					Add to Wishlist
				</Button>
			</div>

			<Separator className='my-4' />

			<div className=''>
				<div className=''>
					<span>Located in: </span>&nbsp;
					<Link
						href='/'
						className='text-htractor-sage underline-offset-2 hover:underline'
					>
						Rockville, Maryland, United States
					</Link>
				</div>
				<p className='mt-2 flex cursor-pointer items-center gap-2 text-htractor-sage underline-offset-2 hover:underline'>
					<MapPinned size={20} className='text-gray-900' /> See dealer
					in the map
				</p>
			</div>
		</div>
	)
}
