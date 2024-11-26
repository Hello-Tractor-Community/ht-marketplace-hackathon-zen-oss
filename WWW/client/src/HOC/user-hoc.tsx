import { useRouter } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'
import { Loader } from 'lucide-react'
import { useUserStore } from '@/store/user-store'

const withUserAuthRequired = (ChildComponent: React.ComponentType<any>) => {
	return (props: any) => {
		const { isLoggedIn, setDetails } = useUserStore((state) => state)
		const [isLoading, setIsLoading] = useState<boolean>(true)
		const router = useRouter()

		async function fetchUserDetails() {
			let response: any

			if (!response) {
				setIsLoading(false)
				return router.push('/flow/login')
			}

			const { name, email, inviteData, image, membership, balance } =
				response.data.user

			// Set global user state
			setDetails({
				name: name,
				email: email,
				image: image,
                role: 'buyer',
			})

			setIsLoading(false)
		}

		useLayoutEffect(() => {
			if (!isLoggedIn) {
				fetchUserDetails()
			} else {
				setIsLoading(false)
			}
		}, [])

		if (isLoading) {
			return (
				<div className='absolute bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-white'>
					<Loader className='animate-spin text-gray-300' size={32} />
					<p className='text-sm text-gray-600'>Loading...</p>
				</div>
			)
		}

		return <ChildComponent {...props} />
	}
}

export default withUserAuthRequired
