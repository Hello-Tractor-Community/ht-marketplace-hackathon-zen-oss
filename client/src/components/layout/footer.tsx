import Link from 'next/link'

export default function Footer() {
	return (
		<footer className='mb-20 py-4 lg:mb-0'>
			<div className='container h-full w-full'>
				<div className='flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:justify-between'>
					<h1 className='text-xl font-bold'>Hello Tractor</h1>
					<ul className='mb-6 flex flex-wrap items-center justify-center text-sm font-medium text-gray-500 sm:mb-0'>
						<li>
							<Link
								href='#'
								className='me-4 hover:underline md:me-6'
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href='#'
								className='me-4 hover:underline md:me-6'
							>
								Privacy policy
							</Link>
						</li>
						<li>
							<Link
								href='#'
								className='me-4 hover:underline md:me-6'
							>
								Contact Us
							</Link>
						</li>
					</ul>
				</div>
				<hr className='my-6 border-gray-200 ' />

				<div className='flex items-center justify-center gap-4 py-4 text-center'>
					<span className='text-center text-sm text-gray-500'>
						@2024
					</span>
					<Link href='#' className='hover:underline'>
						Hello Tractor
					</Link>
					All right reserved
				</div>
			</div>
		</footer>
	)
}
