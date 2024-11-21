"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
	AlignJustify,
	BadgeDollarSign,
	BookUser,
	LayoutDashboard,
	LogOut,
	User
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function SidebarAccount() {
	const [openSidebar, setSidebar] = useState(false)

	const router = useRouter()
	return (
		<div className='relative h-screen'>
			<Button
				className='absolute left-0 top-0'
				type='button'
				variant='default'
				onClick={() => setSidebar(!openSidebar)}
			>
				<AlignJustify />
			</Button>

			<aside
				className={cn(
					'absolute left-0 top-10 z-40 h-full w-64 -translate-x-full bg-white shadow-md transition-transform xl:relative xl:translate-x-0',
					openSidebar && 'translate-x-0'
				)}
				aria-label='sidebar'
			>
				<div className='h-full overflow-auto bg-gray-50 px-3 py-4 '>
					<ul className='flex flex-col gap-10 space-y-2 font-medium'>
						<li>
							<Image
								width='80'
								height='80'
								alt='product'
								src={
									'https://cdn-icons-png.flaticon.com/128/236/236831.png'
								}
							/>
						</li>

						<li>
							<Link
								className='flex items-center rounded-lg p-2 text-gray-900'
								href='/account/wishlist'
							>
								<LayoutDashboard />
								<span className='ms-3'>Dashboard</span>
							</Link>
						</li>

						<li>
							<Link
								className='flex items-center rounded-lg p-2 text-gray-900'
								href='/account/profile'
							>
								<User />
								<span className='ms-3'>Profile</span>
							</Link>
						</li>

						<li>
							<Link
								className='flex items-center rounded-lg p-2 text-gray-900'
								href='/account/chats'
							>
								<BadgeDollarSign />
								<span className='ms-3'>Order</span>
							</Link>
						</li>

						<li>
							<Button
								onClick={() => {
									signOut()
									router.push('/')
								}}
								className='flex items-center '
							>
								<LogOut />
								<span className='ms-3'>LogOut</span>
							</Button>
						</li>
					</ul>
				</div>
			</aside>
		</div>
	)
}
