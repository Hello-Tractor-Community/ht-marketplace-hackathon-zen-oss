import Image from 'next/image'
import { toast } from 'sonner'
import { useState } from 'react'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/user-store'
import { useGoogleLogin } from '@react-oauth/google'

interface GoogleLoginBtnProps {
	isSignup?: boolean
}

const GoogleLoginBtn = ({ isSignup = false }: GoogleLoginBtnProps) => {
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
			role: 'buyer',
			phone: ''
		})

		router.push('/')
	}

	const handleLogin = () => {
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
