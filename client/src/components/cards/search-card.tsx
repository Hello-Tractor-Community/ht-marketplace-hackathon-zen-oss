import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'
import { buttonVariants } from '../ui/button'
import { BadgeCheck, Cog, Heart } from 'lucide-react'

interface ProductCardProps {
	className?: string
	product: {
		model: string
		tractor_model_logo_url: string
	}
}

export default function ProductSearchCard({
	product,
	className
}: ProductCardProps) {
	return (
		<div
			className={cn(
				'flex h-full w-full flex-row rounded-xl border border-gray-200 p-2',
				className
			)}
		>
			<div className='flex h-fit flex-col'>
				<div className='flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl bg-slate-100 p-2'>
					<div
						style={{
							backgroundImage: `url(${product.tractor_model_logo_url})`
						}}
						className='relative h-[300px] w-[300px] bg-contain bg-center bg-no-repeat'
					>
						<div className='absolute left-0 top-10'>
							<Badge
								variant='secondary'
								className='border bg-white font-manrope font-normal text-black'
							>
								New
							</Badge>
						</div>
						<div className='absolute right-0 top-10 text-htractor-charcoal hover:cursor-pointer hover:text-htractor'>
							<Heart size={24} />
						</div>
					</div>
				</div>

				<Link
					href='/tractor'
					className={cn(
						buttonVariants({ variant: 'outline' }),
						'mt-4 w-full rounded-full py-6 text-base'
					)}
				>
					View Tractor
				</Link>

				<Separator className='my-4' />

				<div className=''>
					<div className=''>
						<span>Located in: </span>&nbsp;
						<Link
							href='/map'
							className='text-htractor-sage underline-offset-2 hover:underline'
						>
							Rockville, Maryland, United States
						</Link>
					</div>
				</div>
			</div>

			<div className='h-fit space-y-6 p-6'>
				<h1 className='text-2xl font-[500] text-gray-900'>
					{product.model}
				</h1>

				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<div>
							<Link
								href={'/dealer/7uf93hf0sf02'}
								className='font-medium underline-offset-2 hover:underline'
							>
								John Does
							</Link>
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
							KES 500,000.00
						</span>
					</div>
					<p className='text-sm text-gray-600'>
						Price may (vary) based on customer agreements made with
						seller*
					</p>
				</div>

				<div className='flex items-center gap-2'>
					<span className='font-medium'>Condition:</span>
					<span>New</span>
				</div>

				<div className='flex w-full items-center gap-2'>
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
				</div>
			</div>
		</div>
	)
}
