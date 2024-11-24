'use client'
import Link from 'next/link'
import { m } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LogOut, Mail, ShoppingCart, User, UserRound } from 'lucide-react'

export default function TopNav() {
	const [openUserMenu, setOpenUserMenu] = useState(false)

	return (
		<section className='relative z-[1000] hidden w-full border-b border-neutral-200 bg-gray-50 lg:fixed lg:left-0 lg:right-0 lg:top-0 lg:flex lg:px-32'>
			<div className='container flex h-full items-center justify-between p-1'>
				<h3 className='flex items-center font-[500]'>
					Welcome to Hello Tractor&nbsp;
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
						{true ? (
							<div className=''>
								<div
									onClick={() =>
										setOpenUserMenu(!openUserMenu)
									}
									className='rounded-full border border-gray-200 p-1.5 hover:cursor-pointer hover:shadow'
								>
									<UserRound className='text-primary-500 h-4 w-4' />
								</div>
								<UserMenu openUserMenu={openUserMenu} />
							</div>
						) : (
							<Link
								href='/signin'
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

function UserMenu({ openUserMenu }: { openUserMenu: boolean }) {
	return (
		openUserMenu && (
			<m.div
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className='absolute right-0 top-10 z-20 flex w-[320px] flex-col items-center justify-center gap-4 rounded-md bg-white px-4 py-8 shadow-2xl'
			>
				<h4>Welcome to the website</h4>

				{true && (
					<div className='flex items-center gap-4'>
						<Image
							src={
								'https://cdn-icons-png.flaticon.com/128/236/236831.png'
							}
							width='80'
							height='80'
							alt='image profil'
						/>

						<div className='flex flex-col items-center justify-center gap-2'>
							<span className='text-primary-800 text-xl font-bold capitalize'>
								Welcom back
							</span>
							<h4 className='text-primary-800 font-bold capitalize'>
								John Does
							</h4>

							<Button
								onClick={() => {}}
								variant='outline'
								size='icon'
								className='flex w-28 justify-around gap-4 '
							>
								<LogOut className='' />
								Sign-out
							</Button>
						</div>
					</div>
				)}

				{true && (
					<ul className='flex w-full flex-col items-start gap-4'>
						<li>
							<hr />
						</li>
						<li className='w-full items-center py-2 hover:bg-neutral-50'>
							<Link href='/account/dashboard'>Dashboard</Link>
						</li>

						<li className='w-full items-center py-2 hover:bg-neutral-50'>
							<Link href='/account/profil'>Account</Link>
						</li>

						<li className='w-full items-center py-2 hover:bg-neutral-50'>
							<Link href='/account/order'>My orders</Link>
						</li>

						<li className='w-full items-center py-2 hover:bg-neutral-50'>
							<Link href='/account/address'>My address</Link>
						</li>
					</ul>
				)}
			</m.div>
		)
	)
}
