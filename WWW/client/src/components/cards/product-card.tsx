import { cn } from '@/lib/utils'
import { Cog, Heart, MoveRight } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Badge } from '../ui/badge'

interface ProductCardProps {
	loading: boolean
	product: {
		model: string
		tractor_model_logo_url: string
	}
}

export default function ProductCard({ loading, product }: ProductCardProps) {
	return (
		<div className='mt-8 h-full w-full'>
			<div className='flex h-[250px] items-center justify-center overflow-hidden rounded-xl bg-slate-100 p-2'>
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

			<div className='mt-3 flex flex-col items-start justify-center'>
				<Link
					href={`/products/${product.model}`}
					className='line-clamp-2 underline-offset-2 hover:underline'
				>
					{product.model}
				</Link>

				<div className='mt-1 flex w-full flex-wrap items-center gap-1 3xl:flex-nowrap 3xl:justify-between'>
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

				<div className='mt-3  flex w-full items-center justify-between'>
					<p className='font-manrope font-bold'>$3400</p>
					<Link
						href={'/tractor'}
						className={cn(
							buttonVariants({ variant: 'outline', size: 'sm' })
						)}
					>
						View more
					</Link>
				</div>
			</div>
		</div>
	)
}
