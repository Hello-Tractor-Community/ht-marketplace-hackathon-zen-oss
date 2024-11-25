import Image from 'next/image'
import Link from 'next/link'
import {
	MapPin,
	Mail,
	Phone,
	Facebook,
	Twitter,
	Instagram,
	Linkedin
} from 'lucide-react'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'

export default function Footer() {
	return (
		<footer className='hidden lg:flex bg-black py-16 mt-auto text-white'>
			<div className='container grid grid-cols-1 gap-12 px-4 md:grid-cols-2 lg:mx-20 lg:grid-cols-4'>
				{/* Contact Us Section */}
				<div className='w-fit space-y-6'>
					<h3 className='mb-6 text-xl  font-[500]'>CONTACT US</h3>

					<div className='flex items-start space-x-3 font-manrope'>
						<MapPin className='mt-1 h-7 w-7 flex-shrink-0' />
						<div className='text-sm text-gray-300'>
							<p className='mb-2'>
								Ground Floor, The Address, Muthangari Drive,
								Westlands, Nairobi, Kenya.
							</p>
							<p className='mb-2'>
								2nd Floor, 20A Gana Street, Maitama, Abuja,
								Nigeria
							</p>
							<p>
								Hello Tractor Uganda
								<br />
								Bukoto Mukalazi Road Kampala-Uganda
							</p>
						</div>
					</div>

					<div className='flex items-start space-x-3'>
						<Mail className='mt-1 h-7 w-7 flex-shrink-0' />
						<div className='text-sm text-gray-300'>
							<Link
								href='mailto:hello@hellotractor.com'
								className='transition-colors hover:text-white'
							>
								hello@hellotractor.com
							</Link>
							<p>We reply within 24 hours</p>
						</div>
					</div>

					<div className='flex items-start space-x-3'>
						<Phone className='mt-1 h-7 w-7 flex-shrink-0' />
						<div className='text-sm text-gray-300'>
							<p>+254 (0) 706 492 729</p>
							<p>+234 700 123 5355</p>
							<p>+256 757 000 004</p>
							<p>Mon-Fri, 9am until 5pm</p>
						</div>
					</div>
				</div>

				{/* Solutions Section */}
				<div className='w-fit'>
					<h3 className='mb-6 text-xl font-[500]'>SOLUTIONS</h3>
					<ul className='space-y-3 text-sm text-gray-300'>
						<li>
							<Link
								href='https://hellotractor.com/equipment-owners'
								className='transition-colors hover:text-white'
								target='_blank'
							>
								For Equipment Owners
							</Link>
							<ul className='ml-4 mt-2'>
								<li>
									<Link
										href='https://hellotractor.com/demo-request'
										className='transition-colors hover:text-white'
										target='_blank'
									>
										Buy Technology
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link
								href='https://hellotractor.com/dealer'
								className='transition-colors hover:text-white'
								target='_blank'
							>
								For Equipment Dealers
							</Link>
							<ul className='ml-4 mt-2'>
								<li>
									<Link
										href='https://hellotractor.com/dealer-pilot'
										target='_blank'
										className='transition-colors hover:text-white'
									>
										Dealer Pilot Program
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link
								href='https://hellotractor.com/farmer'
								target='_blank'
								className='transition-colors hover:text-white'
							>
								For Farmers
							</Link>
							<ul className='ml-4 mt-2'>
								<li>
									<Link
										href='https://hellotractor.com/booking-agent'
										target='_blank'
										className='transition-colors hover:text-white'
									>
										Become a Booking Agent
									</Link>
								</li>
							</ul>
						</li>
					</ul>
				</div>

				{/* Company Section */}
				<div className='w-fit'>
					<h3 className='mb-6 text-xl font-[500]'>COMPANY</h3>
					<ul className='space-y-3 text-sm text-gray-300'>
						<li>
							<Link
								href='https://hellotractor.com/team'
								className='transition-colors hover:text-white'
								target='_blank'
							>
								Team
							</Link>
						</li>
						<li>
							<Link
								href='https://hellotractor.com/blog'
								className='transition-colors hover:text-white'
								target='_blank'
							>
								Blog
							</Link>
						</li>
						<li>
							<Link
								href='https://hellotractor.com/press'
								className='transition-colors hover:text-white'
								target='_blank'
							>
								Press
							</Link>
						</li>
						<li>
							<Link
								href='https://hellotractor.com/knowledge-base'
								className='transition-colors hover:text-white'
								target='_blank'
							>
								Knowledge Base CA
							</Link>
						</li>
						<li>
							<Link
								href='https://hellotractor.com/careers'
								className='transition-colors hover:text-white'
								target='_blank'
							>
								Careers
							</Link>
						</li>
						<li>
							<Link
								href='https://hellotractor.com/contact'
								className='transition-colors hover:text-white'
								target='_blank'
							>
								Contact
							</Link>
						</li>
					</ul>
				</div>

				{/* Stay Connected Section */}
				<div className='w-fit space-y-8'>
					<div>
						<h3 className='mb-6 text-xl font-[500]'>
							STAY CONNECTED
						</h3>
						<div className='flex space-x-4'>
							<Link
								href='https://facebook.com/hellotractor'
								className='rounded-full bg-white p-2 transition-colors hover:bg-gray-200'
							>
								<Facebook className='h-5 w-5 text-black' />
							</Link>
							<Link
								href='https://twitter.com/hellotractor'
								className='rounded-full bg-white p-2 transition-colors hover:bg-gray-200'
							>
								<Twitter className='h-5 w-5 text-black' />
							</Link>
							<Link
								href='https://instagram.com/hellotractor'
								className='rounded-full bg-white p-2 transition-colors hover:bg-gray-200'
							>
								<Instagram className='h-5 w-5 text-black' />
							</Link>
							<Link
								href='https://linkedin.com/company/hello-tractor'
								className='rounded-full bg-white p-2 transition-colors hover:bg-gray-200'
							>
								<Linkedin className='h-5 w-5 text-black' />
							</Link>
						</div>
					</div>

					<div>
						<h3 className='mb-4 text-xl font-[500]'>
							DOWNLOAD OUR APP
						</h3>
						<Link href='https://play.google.com/store/apps/details?id=com.hellotractor.android.code'>
							<Image
								src='https://hellotractor.com/wp-content/uploads/2021/07/google-play-badge.png'
								alt='Get it on Google Play'
								width={180}
								height={53}
								className='transition-opacity hover:opacity-90'
							/>
						</Link>
					</div>

					<div>
						<h3 className='mb-4 text-xl font-[500]'>
							BOOK TRACTOR SERVICE
						</h3>
						<Link
							href='https://web.hellotractor.com/booknow'
                                className={cn(buttonVariants({ variant: 'default', size: 'lg' }),"w-[160px] lg:ml-3")}
						>
							Book Now
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
