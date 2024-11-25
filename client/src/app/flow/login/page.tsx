'use client'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import Lottie from 'lottie-react'
import { debounce } from 'lodash'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import GoogleLoginBtn from '@/components/GoogleLoginBtn'
import heroAnimation from '../../../../public/lotties/login_animation.json'

function Page() {
	const [inviteCode, setInviteCode] = useState('')
	const [isValidInvite, setIsValidInvite] = useState(true)
	const [signUpSettings, setSignUpSettings] = useState({
		allowSignup: true,
		requireInvites: false
	})

	const searchParams = useSearchParams()

	async function getSettings() {
		let response: any

		if (!response) return

		setSignUpSettings(response.data)
	}

	async function verifyInvite(code: string, requiresInvite = false) {
		if (code.length < 1) {
			// TODO transations
			return toast.error('Please enter an invite code')
		}

		if (requiresInvite) return

		let response: any

		if (!response) return

		if (response.data.isValid) {
			setIsValidInvite(true)
		} else {
			setIsValidInvite(false)
		}
	}

	useEffect(() => {
		getSettings()

		if (searchParams.has('invite')) {
			let inviteCode = searchParams.get('invite') as string
			setInviteCode(() => inviteCode)
			debouncedVerifyInvite(inviteCode, signUpSettings.requireInvites)
		}
	}, [])

	// Debounced version of verifyInvite
	const debouncedVerifyInvite = useCallback(
		debounce(
			(code, requireInvite) => verifyInvite(code, requireInvite),
			500
		),
		[]
	)

	// Handle invite code change
	const handleInviteCodeChange = (value: string) => {
		setInviteCode(value)
		debouncedVerifyInvite(inviteCode, signUpSettings.requireInvites)
	}

	return (
		<div className='w-full px-4 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
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

					<div className='flex flex-col items-center justify-center gap-4'>
						{signUpSettings.requireInvites && (
							<div className='w-full space-y-2'>
								<Input
									value={inviteCode}
									onChange={(e) =>
										handleInviteCodeChange(e.target.value)
									}
									placeholder='Invite code e.g xP7-vhT-B7s'
									className={cn(
										'rounded-full p-[23px]',
										isValidInvite
											? 'border border-green-500'
											: 'border border-red-500'
									)}
									maxLength={11}
								/>
								{!isValidInvite && (
									<p className='text-xs text-red-500'>
										Invalid invite code
									</p>
								)}
							</div>
						)}
						<GoogleLoginBtn
							requiresInvite={signUpSettings.requireInvites}
							inviteCode={inviteCode}
							isSignup={true}
							isValidInvite={isValidInvite}
						/>
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
