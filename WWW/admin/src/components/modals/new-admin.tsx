import {
	Credenza,
	CredenzaBody,
	CredenzaContent,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger,
    CredenzaDescription,
} from '@/components/ui/credenza'
import { toast } from 'sonner'
import { useState } from 'react'
import { createAdmin } from '@/apis/auth'
import { LoaderCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type UserModalProps = {
	children: React.ReactNode
	refetchData: () => void
}

function NewAdmin({ children, refetchData }: UserModalProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [adminData, setAdminData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	async function handleCreateAdmin() {
		if (
			adminData.name.length < 1 ||
			adminData.email.length < 1 ||
			adminData.password.length < 1 ||
			adminData.confirmPassword.length < 1
		) {
			return toast.error('Please fill in all fields')
		}

		if (adminData.password !== adminData.confirmPassword) {
			return toast.error('Passwords do not match')
		}

		setIsLoading(true)

		let response = await createAdmin({
			name: adminData.name,
			email: adminData.email,
			password: adminData.password
		})
		setIsLoading(false)

		if (!response) return

		setAdminData({
			name: '',
			email: '',
			password: '',
			confirmPassword: ''
		})

		toast.success(response.message)
		refetchData()
	}
	return (
		<Credenza>
			<CredenzaTrigger asChild>{children}</CredenzaTrigger>
			<CredenzaContent className='max-w-lg'>
				<CredenzaHeader>
					<CredenzaTitle className=''>New Admin</CredenzaTitle>
					<CredenzaDescription className='text-sm'>
						Create a new admin account
					</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody>
					<div className='flex flex-col items-center gap-2 md:flex-row'>
						<Input
							type='text'
							placeholder='Enter name'
							value={adminData.name}
							onChange={(e) =>
								setAdminData((state) => {
									return { ...state, name: e.target.value }
								})
							}
							className='mt-2 focus-visible:ring-gray-200'
						/>

						<Input
							type='email'
							value={adminData.email}
							placeholder='Enter email'
							onChange={(e) =>
								setAdminData((state) => {
									return {
										...state,
										email: e.target.value
									}
								})
							}
							className='mt-2 focus-visible:ring-gray-200'
						/>
					</div>

					<Input
						type='text'
						placeholder='Enter password'
						value={adminData.password}
						minLength={6}
						onChange={(e) =>
							setAdminData((state) => {
								return {
									...state,
									password: e.target.value
								}
							})
						}
						className='mt-2 focus-visible:ring-gray-200'
					/>

					<Input
						type='text'
						placeholder='Confirm password'
						value={adminData.confirmPassword}
						minLength={6}
						onChange={(e) =>
							setAdminData((state) => {
								return {
									...state,
									confirmPassword: e.target.value
								}
							})
						}
						className='mt-2 focus-visible:ring-gray-200'
					/>

				</CredenzaBody>
				<CredenzaFooter>
					<Button
						onClick={handleCreateAdmin}
						className='mt-2 w-full py-2'
					>
						{isLoading ? (
							<LoaderCircle className='animate-spin' />
						) : (
							'Create Admin'
						)}
					</Button>
				</CredenzaFooter>
			</CredenzaContent>
		</Credenza>
	)
}

export default NewAdmin
