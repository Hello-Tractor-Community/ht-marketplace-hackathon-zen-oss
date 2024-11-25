import { useRouter } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'
import { Loader } from 'lucide-react'
import { useAdminStore } from '@/store/admin-store'
import { refreshAdmin } from '@/apis/auth'

const withAdminAuthRequired = (ChildComponent: React.ComponentType<any>) => {
	return (props:any) => {
		const isLoggedIn = useAdminStore((state) => state.isLoggedIn)
		const [isLoading, setIsLoading] = useState<boolean>(true)
		const router = useRouter()

		const setDetails = useAdminStore((state) => state.setDetails)

		async function fetchUserDetails() {

			let response = await refreshAdmin()

			if (!response) {
				setIsLoading(false)
				return router.push('/admin/login')
			}

			const { name, email, role } = response.data

			// Set global user state
			setDetails({
				name,
				email,
				role
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
				<div className='absolute bottom-0 left-0 right-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-white'>
					<Loader className='animate-spin text-gray-300' size={32} />
					<p className='text-sm text-gray-600'>Loading...</p>
				</div>
			)
		}

		return <ChildComponent {...props} />
	}
}

export default withAdminAuthRequired
