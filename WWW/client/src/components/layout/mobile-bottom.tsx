import Link from 'next/link'
import React from 'react'
import { FolderKanban, Home, ShoppingCart, User } from 'lucide-react'

export default function MobileBottom() {
	return (
		<div className='fixed bottom-0 left-0 z-[1000] flex h-20 w-full border-t border-t-gray-300 bg-white px-10 shadow-md lg:hidden'>
			<div className='items-cente flex w-full justify-center gap-8'>
				<Link
					href='/products'
					className='group flex flex-col items-center justify-center gap-1'
				>
					<FolderKanban className='group-hover:text-primary-900 h-5 w-5 group-hover:font-bold' />
					<span>Categories</span>
				</Link>
				<Link
					href='/'
					className='group flex flex-col items-center justify-center gap-1'
				>
					<Home className='group-hover:text-primary-900 h-5 w-5 group-hover:font-bold' />
					<span>Home</span>
				</Link>
				<Link
					href='/cart'
					className='group relative flex flex-col items-center justify-center gap-1'
				>
					<ShoppingCart className='group-hover:text-primary-900 h-5 w-5 group-hover:font-bold' />
					<span className='grid-place-content-center absolute -right-1 top-2 grid h-4 w-4 rounded-full bg-red-600 text-center text-sm text-white'>
						0
					</span>
					<span>Cart</span>
				</Link>
				<Link
					href='/signin'
					className='group flex flex-col items-center justify-center gap-1'
				>
					<User className='group-hover:text-primary-900 h-5 w-5 group-hover:font-bold' />
					<span>Account</span>
				</Link>
			</div>
		</div>
	)
}
