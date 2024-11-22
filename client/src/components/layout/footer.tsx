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

export default function Footer() {
	return (
		<footer className='bg-black py-16 text-white'>
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
								href='/equipment-owners'
								className='transition-colors hover:text-white'
							>
								For Equipment Owners
							</Link>
							<ul className='ml-4 mt-2'>
								<li>
									<Link
										href='/demo-request'
										className='transition-colors hover:text-white'
									>
										Buy Technology
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link
								href='/dealer'
								className='transition-colors hover:text-white'
							>
								For Equipment Dealers
							</Link>
							<ul className='ml-4 mt-2'>
								<li>
									<Link
										href='/dealer-pilot'
										className='transition-colors hover:text-white'
									>
										Dealer Pilot Program
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link
								href='/farmer'
								className='transition-colors hover:text-white'
							>
								For Farmers
							</Link>
							<ul className='ml-4 mt-2'>
								<li>
									<Link
										href='/booking-agent'
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
								href='/team'
								className='transition-colors hover:text-white'
							>
								Team
							</Link>
						</li>
						<li>
							<Link
								href='/blog'
								className='transition-colors hover:text-white'
							>
								Blog
							</Link>
						</li>
						<li>
							<Link
								href='/press'
								className='transition-colors hover:text-white'
							>
								Press
							</Link>
						</li>
						<li>
							<Link
								href='/knowledge-base'
								className='transition-colors hover:text-white'
							>
								Knowledge Base CA
							</Link>
						</li>
						<li>
							<Link
								href='/careers'
								className='transition-colors hover:text-white'
							>
								Careers
							</Link>
						</li>
						<li>
							<Link
								href='/contact'
								className='transition-colors hover:text-white'
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
								href='https://facebook.com'
								className='rounded-full bg-white p-2 transition-colors hover:bg-gray-200'
							>
								<Facebook className='h-5 w-5 text-black' />
							</Link>
							<Link
								href='https://twitter.com'
								className='rounded-full bg-white p-2 transition-colors hover:bg-gray-200'
							>
								<Twitter className='h-5 w-5 text-black' />
							</Link>
							<Link
								href='https://instagram.com'
								className='rounded-full bg-white p-2 transition-colors hover:bg-gray-200'
							>
								<Instagram className='h-5 w-5 text-black' />
							</Link>
							<Link
								href='https://linkedin.com'
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
							className='inline-block rounded-md bg-white px-6 py-2 font-medium text-black transition-colors hover:bg-gray-200'
						>
							Book Now
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
