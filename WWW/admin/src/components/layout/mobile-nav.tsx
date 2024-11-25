import { cn } from '@/lib/utils'
import {
	ChartSpline,
	Globe,
	LogOut,
	Mail,
	Menu,
	PencilRuler,
	Settings,
	UsersRound,
	X
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import NavItem, { NavSeparator } from './nav-item'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

const MobileNav = () => {
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()
	const paths = pathname.split('/')
	const lastPath = paths[paths.length - 1]

	const navRef = useRef<HTMLElement | null>(null)

	function handleClickOutside(event: MouseEvent) {
		if (
			isOpen &&
			navRef.current &&
			!navRef.current.contains(event.target as Node)
		) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [isOpen])

	return (
		<aside>
			<div className='fixed right-0 top-0 z-30 flex w-full items-center justify-between rounded border border-b bg-white p-3 px-4 md:hidden'>
				<Link href='/'>
					<div className="h-[35px] w-[35px] bg-[url('/HT_LOGO_ICON_CMYK_300.png')] bg-contain bg-no-repeat" />
				</Link>

				{isOpen ? (
					<X size={32} onClick={() => setIsOpen((prev) => !prev)} />
				) : (
					<Menu
						size={32}
						onClick={() => setIsOpen((prev) => !prev)}
					/>
				)}
			</div>
			<nav
				ref={navRef}
				className={cn(
					'fixed bottom-0 flex left-0 top-0 z-50 h-full w-[250px] translate-x-[-250px] flex-col overflow-y-auto border-r bg-white px-2 py-4 transition-transform duration-300 ease-in-out md:hidden',
					{ 'translate-x-0': isOpen }
				)}
			>
				<div className='flex items-center justify-between'>
					<Link href='/'>
						<Image
							src='/HT_LOGO_CMYK_Orange.png'
							alt='logo'
							width={4142}
							height={1883}
							className='w-[150px]'
						/>
					</Link>
				</div>

				<div className='mt-4 flex flex-col gap-1'>
					<NavSeparator text='Analytics' className='border-none' />

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
						link='/admin/tools'
						name='Tools'
						isSelect={lastPath == 'tools'}
						icon={<PencilRuler size={20} />}
					/>

					<NavSeparator text='System' />

					<NavItem
						link='/admin/mailing'
						name='Mailing'
						isSelect={lastPath == 'mailing'}
						icon={<Mail size={20} />}
					/>

					<NavItem
						link='/admin/site'
						name='Site'
						isSelect={lastPath == 'site'}
						icon={<Globe size={20} />}
					/>

					<NavItem
						link='/admin/settings'
						isSelect={lastPath == 'settings'}
						name='Settings'
						icon={<Settings size={20} />}
					/>

					<NavSeparator text='User' />

					<NavItem
						link='/logout'
						name='Logout'
						icon={<LogOut size={20} />}
					/>
				</div>

				<div className='mt-auto flex flex-col'>
					<Separator orientation='horizontal' className='my-2' />
					<p className='flex items-center justify-center text-xs text-gray-700'>
						&copy;&nbsp;
						<span>Hello Tractor, {new Date().getFullYear()}</span>
					</p>
				</div>
			</nav>
		</aside>
	)
}

export default MobileNav
