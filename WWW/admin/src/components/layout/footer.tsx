import Link from 'next/link'
import { Instagram, Mail, Twitter } from 'lucide-react'

export const Footer = () => {
	return (
		<footer className='bg-white dark:bg-gray-800'>
			<div className='mx-auto max-w-screen-xl p-4 py-6 md:pt-8 lg:pt-16'>
				<div className='grid grid-cols-2 place-items-center items-start gap-8 md:grid-cols-3'>
					<div>
						<h3 className='mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white'>
							Help center
						</h3>
						<ul className='text-gray-500 dark:text-gray-400'>

							<li className='mb-4'>
								<Link
									href='email:support@deripesa.com'
									className='hover:underline'
								>
								Email
								</Link>
							</li>
							<li className='mb-4'>
								<Link
									target='_blank'
									href='https://instagram.com/deri_pesa'
									className='hover:underline'
								>
									Instagram
								</Link>
							</li>
							<li className='mb-4'>
								<Link
									target='_blank'
									href='https://x.com/deri_pesa'
									className='hover:underline'
								>
									Twitter
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className='mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white'>
							Company
						</h3>
						<ul className='text-gray-500 dark:text-gray-400'>
							<li className='mb-4'>
								<Link href='/legal/privacy' className='hover:underline'>
									Privacy Policy
								</Link>
							</li>
							<li className='mb-4'>
								<Link href='/legal/terms' className='hover:underline'>
								    Terms and Conditions
								</Link>
							</li>
							<li className='mb-4'>
								<Link href='/contact' className='hover:underline'>
									Contact Us
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className='mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white'>
							Download
						</h3>
						<ul className='text-gray-500 dark:text-gray-400'>
							<li className='mb-4'>
								<Link href='/#call-to-action' className='hover:underline'>
									iOS
								</Link>
							</li>
							<li className='mb-4'>
								<Link href='/#call-to-action' className='hover:underline'>
									Android
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<hr className='my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8' />
				<div className='text-center'>
					<Link
						href='/'
						className='mb-5 flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white'
					>
						DeriPesa
					</Link>
					<span className='block text-center text-sm text-gray-500 dark:text-gray-400'>
						&copy; {new Date().getFullYear()} DeriPesa. All Rights
						Reserved.
					</span>
					<ul className='mt-5 flex justify-center space-x-5'>
						<li>
							<Link href='email:support@deripesa.com'>
								<Mail
									size={24}
									className='text-gray-500 hover:text-gray-800 dark:text-gray-400'
								/>
							</Link>
						</li>
						<li>
							<Link target='_blank' href='https://instagram.com/deri_pesa'>
								<Instagram
									size={24}
									className='text-gray-500 hover:text-gray-800 dark:text-gray-400'
								/>
							</Link>
						</li>
						<li>
							<Link target='_blank' href='https://x.com/deri_pesa'>
								<Twitter
									size={24}
									className='text-gray-500 hover:text-gray-800 dark:text-gray-400'
								/>
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className='flex items-center justify-center p-2 mb-2 text-sm'>
				<p className='text-muted-foreground'>Crafted by</p>&nbsp;
				<Link
					href='https://zenetralabs.com'
					target='_blank'
					className='font-medium text-slate-700 underline-offset-2 hover:text-indigo-500 hover:underline'
				>
					Zenetra Labs
				</Link>
			</div>
		</footer>
	)
}
