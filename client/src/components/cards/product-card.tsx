import Link from 'next/link'

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
					className='h-[300px] w-[300px] bg-contain bg-center bg-no-repeat'
				/>
			</div>

			<div className='mt-3 flex flex-col items-start justify-center'>
				<Link
					href={`/products/${product.model}`}
					className='line-clamp-2 underline-offset-2 hover:underline'
				>
					{product.model}
				</Link>
				<p className='font-manrope font-bold'>$3400</p>
			</div>
		</div>
	)
}
