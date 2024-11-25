import ProductSearchCard from '@/components/cards/search-card'
import { DEFAULT_SLIDES } from '@/components/home/banner'

export default function Wishlist() {
	return (
		<div>
			<h1 className='py-2 font-manrope text-2xl font-medium'>
				Your favourite tractors
			</h1>
			<div className='mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2'>
				{DEFAULT_SLIDES.map((slide, i) => {
					return (
						<ProductSearchCard
							key={i}
							product={slide}
							className='bg-white p-4'
						/>
					)
				})}
			</div>
		</div>
	)
}
