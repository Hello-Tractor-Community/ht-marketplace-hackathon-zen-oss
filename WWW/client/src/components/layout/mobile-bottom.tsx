import Link from 'next/link'
import React from 'react'
import {
	Home,
	Map,
	Search,
	UserRound
} from 'lucide-react'

export default function MobileBottom() {
	return (
		<div className='fixed bottom-0 left-0 z-[1000] flex h-20 w-full border-t border-t-gray-300 bg-white px-10 shadow-md lg:hidden'>
			<div className='items-cente flex w-full justify-center gap-8'>
				<Link
					href='/search'
					className='group flex flex-col items-center justify-center gap-1'
				>
					<Search className='group-hover:text-primary-900 h-5 w-5 group-hover:font-bold' />
					<span>Search</span>
				</Link>
				<Link
					href='/'
					className='group flex flex-col items-center justify-center gap-1'
				>
					<Home className='group-hover:text-primary-900 h-5 w-5 group-hover:font-bold' />
					<span>Home</span>
				</Link>
				<Link
					href='/map'
					className='group flex flex-col items-center justify-center gap-1'
				>
					<Map className='group-hover:text-primary-900 h-5 w-5 group-hover:font-bold' />
					<span>Maps</span>
				</Link>
				<Link
					href='/account'
					className='group flex flex-col items-center justify-center gap-1'
				>
					<UserRound className='group-hover:text-primary-900 h-5 w-5 group-hover:font-bold' />
					<span>Profile</span>
				</Link>
			</div>
		</div>
	)
}
