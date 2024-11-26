'use client'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { useState } from 'react'
import Lottie from 'lottie-react'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/user-store'
import GoogleLoginBtn from '@/components/GoogleLoginBtn'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import heroAnimation from '../../../../public/lotties/login_animation.json'
import { loginBuyer } from '@/apis/buyer/auth'
import { loginSeller } from '@/apis/seller/auth'

function Page() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const { setDetails } = useUserStore((state) => state)
	const [loginType, setLoginType] = useState<'seller' | 'buyer'>('buyer')

	const router = useRouter()

	const handleSubmit = async () => {
		if (!email || !password) {
			return toast.error('Please fill in all fields')
		}
		setIsLoading(true)
		let response: any

		if (loginType === 'buyer') {
			response = await loginBuyer({ email, password })

			setIsLoading(false)

			if (!response) return

			setDetails({
				email: response.data.user.userId.email,
				name: response.data.user.userId.name,
                role: 'buyer',
				image: ''
			})
		} else {
			response = await loginSeller({ email, password })

			setIsLoading(false)

			if (!response) return

			setDetails({
				email: response.data.seller.userId.email,
				name: response.data.seller.userId.name,
                role: 'seller',
				image: ''
			})
		}

		toast.success(response.message)
		router.push('/account')
	}

	return (
		<div className='w-full px-4 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
			<div className='flex h-screen  items-center justify-center py-12'>
				<div className='mx-auto grid max-w-lg gap-6'>
					<div className='grid gap-2 text-center'>
						<Link href='/' className='mx-auto'>
							<Image
								src='/HT_LOGO_CMYK_Orange.png'
								alt='logo'
								width={4142}
								height={1883}
								className='w-[250px]'
							/>
						</Link>
						<p className='text-balance text-muted-foreground'>
							Technology for smarter, better maintained and more
							profitable tractors.
						</p>
					</div>

					<div className='flex items-center justify-center'>
						<div className='flex items-center justify-center py-4'>
							<div className='mx-auto grid w-[350px] gap-6 md:w-[512px]'>
								<div className='grid gap-4'>
									<div className='grid gap-2'>
										<Label htmlFor='email'>Email</Label>
										<Input
											id='email'
											type='email'
											className='border-gray-200 text-primary focus-visible:ring-primary/10'
											onChange={(e) =>
												setEmail(e.target.value)
											}
										/>
									</div>
									<div className='grid gap-2'>
										<div className='flex items-center'>
											<Label htmlFor='password'>
												Password
											</Label>
										</div>
										<Input
											id='password'
											type='password'
											className='border-gray-200 text-primary focus-visible:ring-primary/10'
											onChange={(e) =>
												setPassword(e.target.value)
											}
										/>
									</div>
									<Button
										onClick={handleSubmit}
										className='w-full'
										disabled={isLoading}
									>
										{isLoading ? (
											<Loader className='animate-spin' />
										) : (
											'Login'
										)}
									</Button>

									<div className='mt-2'>
										<RadioGroup
											defaultValue='buyer'
											onValueChange={(
												value: 'seller' | 'buyer'
											) => {
												setLoginType(value)
											}}
											className='flex'
										>
											<div className='flex items-center space-x-2'>
												<RadioGroupItem
													value='buyer'
													id='buyer'
												/>
												<Label htmlFor='buyer'>
													Am a buyer
												</Label>
											</div>
											<div className='flex items-center space-x-2'>
												<RadioGroupItem
													value='seller'
													id='seller'
												/>
												<Label htmlFor='seller'>
													Am a seller
												</Label>
											</div>
										</RadioGroup>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='flex w-full items-center gap-2'>
						<div className='h-[2px] flex-1 bg-gray-100' />
						<p className='text-center text-sm text-muted-foreground'>
							Or
						</p>
						<div className='h-[2px] flex-1 bg-gray-100' />
					</div>

					<div className='pointer-events-none flex flex-col items-center justify-center gap-4 opacity-50'>
						<GoogleLoginBtn isSignup={false} />
					</div>

					<div className='mx-auto max-w-xs text-center  text-xs text-muted-foreground'>
						By signing up, you agree to our &nbsp;
						<Link
							href='#'
							className='font-semibold text-blue-500 hover:opacity-70'
						>
							Terms of Service
						</Link>
						&nbsp; and&nbsp;
						<Link
							href='#'
							className='font-semibold text-blue-500 hover:opacity-70'
						>
							Privacy Policy
						</Link>
					</div>

					<p className='mx-auto mt-2 text-sm text-muted-foreground'>
						Don't have an account?&nbsp;
						<Link
							href='/flow/signup'
							className='font-semibold text-blue-500 hover:opacity-70'
						>
							Sign Up
						</Link>
					</p>
				</div>
			</div>
			<div className="relative hidden items-center justify-center bg-[url('/HT_PATTERNS_CMYK-06.jpg')] bg-contain lg:flex">
				<div className='absolute bottom-0 left-0 right-0 top-0 z-10 bg-black/5' />
				<Lottie
					animationData={heroAnimation}
					height={600}
					width={600}
					className='z-20 w-[80%]'
				/>
			</div>
		</div>
	)
}

export default Page
