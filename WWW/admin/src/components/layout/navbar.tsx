import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

function Navbar() {
	return (
		<header className='fixed w-full'>
			<nav className='z-50 border-gray-200 bg-white py-2.5 shadow-sm dark:bg-gray-900'>
				<div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4'>
					<Link href='/' className='flex items-center'>
						<span className='self-center whitespace-nowrap text-2xl font-bold tracking-tight dark:text-white'>
							DeriPesa
						</span>
					</Link>
					<div className='flex items-center lg:order-2'>
						<Link
							href='/#call-to-action'
							className={cn(buttonVariants({}))}
						>
							Download
						</Link>
					</div>
					<div
						className='hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto'
						id='mobile-menu-2'
					>
						<ul className='mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8'>
							<li>
								<Link
									href='/'
									className='block rounded py-2 pl-3 pr-4  text-gray-700 dark:text-white lg:bg-transparent lg:p-0'
									aria-current='page'
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href='/#features'
									className='block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-emerald-600 lg:dark:hover:bg-transparent lg:dark:hover:text-white'
								>
									Features
								</Link>
							</li>
							<li>
								<Link
									href='/contact'
									className='block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-emerald-600 lg:dark:hover:bg-transparent lg:dark:hover:text-white'
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Navbar
