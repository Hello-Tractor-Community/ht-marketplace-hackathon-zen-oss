'use client'
import Link from 'next/link'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import React, { useState } from 'react'
import { LogOut, ShoppingCart, UserRound } from 'lucide-react'
import { useUserStore } from '@/store/user-store'
import { logoutBuyer } from '@/apis/buyer/auth'
import { toast } from 'sonner'
import { logoutSeller } from '@/apis/seller/auth'

export default function TopNav() {
	const { name, role, isLoggedIn, logOut } = useUserStore((state) => state)
	const [openUserMenu, setOpenUserMenu] = useState(false)

	async function handleLogout() {
		logOut()

		if (role === 'buyer') {
			let response = await logoutBuyer()
			if (!response) return
			toast.success('Logged out successfully')
		} else {
			let response = await logoutSeller()
			if (!response) return
			toast.success('Logged out successfully')
		}
	}

	return (
		<section className='relative z-[1000] w-full border-b border-neutral-200 bg-gray-50 lg:fixed lg:left-0 lg:right-0 lg:top-0 lg:flex lg:px-32'>
			<div className='container flex h-full items-center justify-between p-1'>
				<h3 className='flex items-center font-[500]'>
					<span className='hidden md:inline-flex'>
						Welcome to Hello Tractor&nbsp;
					</span>
					<span className='-mt-0.5 ml-0.5 -rotate-45 animate-bounce text-htractor-hibiscus'>
						<ShoppingCart size={20} />
					</span>
				</h3>
				<div className='flex items-center'>
					<Link
						href='https://hellotractor.com/about-us'
						className='p-1 underline-offset-2 hover:underline'
					>
						<span className='mx-2 text-sm'>About</span>
					</Link>
					<Link
						href='https://hellotractor.com/contact'
						className='p-1 underline-offset-2 hover:underline'
					>
						<span className='mx-2 text-sm'>Contact</span>
					</Link>
					<Link
						href='https://hellotractor.com/pricing'
						className='p-1 underline-offset-2 hover:underline'
					>
						<span className='text-sm uppercase'>Request Demo</span>
					</Link>

					<div className='ml-2 flex h-full items-center hover:bg-neutral-100'>
						{isLoggedIn ? (
							<DropdownMenu>
								<DropdownMenuTrigger className='focus-visible:outline-none'>
									<div
										onClick={() =>
											setOpenUserMenu(!openUserMenu)
										}
										className='rounded-full border border-gray-200 p-1.5 hover:cursor-pointer hover:shadow'
									>
										<UserRound className='text-primary-500 h-4 w-4' />
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent className='mr-4 mt-0.5 rounded-none border border-t-2 border-gray-200 border-t-htractor md:mr-0'>
									<DropdownMenuLabel className='py-0 font-[500]'>
										{(
											<p className='flex items-center gap-1'>
												<UserRound className='text-primary-500 h-4 w-4' />
												{name}
											</p>
										) || 'Account'}
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem className='p-0'>
										<Link
											href='/account'
											className='w-full p-2'
										>
											Profile
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={handleLogout}
										className='cursor-pointer'
									>
										Logout
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Link
								href='/flow/login'
								className='flex cursor-pointer items-center gap-4'
							>
								<LogOut className='text-primary-500 h-4 w-4' />
								<span>Login</span>
							</Link>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
