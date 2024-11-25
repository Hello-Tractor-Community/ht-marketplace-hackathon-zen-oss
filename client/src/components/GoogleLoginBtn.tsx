import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { useUserStore } from '@/store/store'

interface GoogleLoginBtnProps {
	requiresInvite?: boolean
	inviteCode?: string
	isSignup?: boolean
	isValidInvite?: boolean
}

const GoogleLoginBtn = ({
	requiresInvite = false,
	isSignup = false,
	inviteCode = '',
	isValidInvite = false
}: GoogleLoginBtnProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const { setDetails } = useUserStore((state) => state)
	const router = useRouter()

	const login = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			handleUserLogin(tokenResponse.access_token)
		},
		onError: (error) => {
			console.log(error)
			setIsLoading(false)
		}
	})

	const handleUserLogin = async (token: string) => {
		let response: any
		setIsLoading(false)

		if (!response) return

		toast.success(response.message)

		setDetails({
			name: response.data.name,
			email: response.data.email,
			image: response.data.image,
			membership: response.data.membership,
			balance: response.data.balance,
			showPowerMode: response.data.settings.powerMode,
			chargeTokens: response.data.settings.chargeTokens,
			inviteCode: response.data.user.inviteData.myInvite.token,
			pdfSize: response.data.settings.pdfSize
		})

		router.push('/')
	}

	const handleLogin = () => {
		if (requiresInvite && isSignup && !isValidInvite) {
			return toast.error('Please enter an invite code')
		}

		setIsLoading(true)
		login()
	}

	return (
		<button
			type='button'
			onClick={handleLogin}
			disabled={isLoading}
			className='mx-4 flex w-full cursor-pointer items-center justify-center space-x-2 rounded-full border border-gray-200 p-2 transition-all duration-300 disabled:cursor-not-allowed'
		>
			{isLoading ? (
				<Loader
					size={24}
					className='animate-spin text-muted-foreground'
				/>
			) : (
				<>
					<Image
						src='/icons/google.svg'
						alt='Google logo'
						width={28}
						height={28}
					/>

					<span className='text-sm font-medium text-gray-700'>
						{isSignup ? 'Signup' : 'Login'} with google
					</span>
				</>
			)}
		</button>
	)
}

export default GoogleLoginBtn
