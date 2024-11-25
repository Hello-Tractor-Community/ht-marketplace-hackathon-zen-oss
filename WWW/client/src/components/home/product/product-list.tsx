import React from 'react'
import { ShoppingBasket } from 'lucide-react'
import ProductCard from '@/components/cards/product-card'

export default function ProductList({ loading }: { loading: boolean }) {
	return (
		<>
			<div className='relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5'>
				{true ? (
					<ProductCard loading={loading} />
				) : (
					<div>Loading ...</div>
				)}
			</div>
			{loading === false && (
				<div className='flex w-full flex-col items-center justify-center gap-10  px-20 py-20'>
					<ShoppingBasket className='font-bold' size={100} />
					<h1 className='flex text-center  text-2xl font-medium'>
						No Product Found
					</h1>
				</div>
			)}
		</>
	)
}
