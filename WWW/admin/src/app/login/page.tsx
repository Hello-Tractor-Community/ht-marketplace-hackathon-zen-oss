'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import Image from 'next/image'
import { useState } from 'react'
import Lottie from 'lottie-react'
import { Loader } from 'lucide-react'
import { loginAdmin } from '@/apis/auth'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAdminStore } from '@/store/admin-store'
import heroAnimation from '../../components/lotties/login_animation.json'

function Page() {
	const [isLoading, setIsLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { setDetails } = useAdminStore((state) => state)
	const router = useRouter()

	const handleSubmit = async () => {
		if (!email || !password) {
			return toast.error('Please fill in all fields')
		}
		setIsLoading(true)

		let response = await loginAdmin({ email, password })
		setIsLoading(false)

		if (!response) return

		setDetails({
			email: response.data.email,
			name: response.data.name,
			role: response.data.role
		})

		toast.success(response.message)
		router.push('/admin')
	}

	return (
		<div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
			<div className='flex h-screen items-center justify-center py-12'>
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
							<div className='mx-auto grid w-[350px] gap-6'>
								<div className='grid gap-4'>
									<div className='grid gap-2'>
										<Label htmlFor='email'>Email</Label>
										<Input
											id='email'
											type='email'
											className='text-primary focus-visible:ring-primary/10'
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
											className='text-primary focus-visible:ring-primary/10'
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
								</div>
							</div>
						</div>
					</div>

					<div className='mx-auto mt-4 max-w-xs text-center  text-xs text-muted-foreground'>
						By logging in, you agree to our &nbsp;
						<Link
							href='/legal/privacy'
							className='font-semibold text-primary'
						>
							Terms of Service
						</Link>
						&nbsp; and&nbsp;
						<Link
							href='/legal/privacy'
							className='font-semibold text-primary'
						>
							Privacy Policy
						</Link>
					</div>
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
