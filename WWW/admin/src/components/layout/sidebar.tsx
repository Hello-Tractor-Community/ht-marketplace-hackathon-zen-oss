'use client'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
	Globe,
	Settings,
	UsersRound,
	ChartSpline,
	Mail,
	Headset,
	Landmark,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import NavItem, { NavLogoutItem, NavSeparator } from './nav-item'
import MobileNav from './mobile-nav'
import Image from 'next/image'
import Link from 'next/link'

function SideBar() {
	const pathname = usePathname()
	const paths = pathname.split('/')
	const lastPath = paths[paths.length - 1]

	return (
		<>
			<MobileNav />
			<nav
				className={cn(
					'bottom-0 left-0 top-0 z-50 hidden h-full w-[250px] flex-col border-r bg-white md:fixed md:flex md:h-screen md:w-16 lg:w-[280px]'
				)}
			>
				<Link href='/' className='mx-auto'>
					<Image
						src='/HT_LOGO_CMYK_Orange.png'
						alt='logo'
						width={4142}
						height={1883}
						className='w-[200px]'
					/>
				</Link>

				<div className='mt-2 flex flex-col gap-1 lg:px-5'>
					<NavSeparator text='App' className='border-none' />

					<NavItem
						link='/admin'
						name='Dashboard'
						isSelect={lastPath == 'admin'}
						icon={<ChartSpline size={20} />}
					/>
					<NavItem
						link='/admin/users'
						name='Users'
						isSelect={lastPath == 'users'}
						icon={<UsersRound size={20} />}
					/>

					<NavItem
						link='/admin/transactions'
						name='Transactions'
						isSelect={lastPath == 'transactions'}
						icon={<Landmark size={20} />}
					/>

					<NavSeparator text='System' />

					<NavItem
						link='/admin/site'
						name='Site'
						isSelect={lastPath == 'site'}
						icon={<Globe size={20} />}
					/>

					<NavItem
						link='/admin/mail'
						name='E-Mail'
						isSelect={lastPath == 'mail'}
						icon={<Mail size={20} />}
					/>

					<NavItem
						link='/admin/support'
						name='Support'
						isSelect={lastPath == 'support'}
						icon={<Headset size={20} />}
					/>

					<NavItem
						link='/admin/settings'
						isSelect={lastPath == 'settings'}
						name='Settings'
						icon={<Settings size={20} />}
					/>

					<NavSeparator text='User' />

					<NavLogoutItem />
				</div>

				<div className='mt-auto flex flex-col'>
					<Separator orientation='horizontal' className='my-2' />
					<p className='flex items-center justify-center p-4 text-xs text-gray-700'>
						&copy;&nbsp;Hello Tractor
						<span>, {new Date().getFullYear()}</span>
					</p>
				</div>
			</nav>
		</>
	)
}

export default SideBar
