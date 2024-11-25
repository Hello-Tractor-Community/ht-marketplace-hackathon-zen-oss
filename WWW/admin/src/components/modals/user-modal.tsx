import {
	Credenza,
	CredenzaBody,
	CredenzaContent,
	CredenzaDescription,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger
} from '@/components/ui/credenza'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { UserType } from '@/types'
import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { getAvatarImg } from '@/lib/avatar'
import { Input } from '@/components/ui/input'
import { deleteUser, updateUser } from '@/apis/user'
import { LoaderCircle, Mail, UserRound } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'

type UserModalProps = {
	children: React.ReactNode
	user: UserType
	refreshUsers: () => void
}

function UserModal({ children, user, refreshUsers }: UserModalProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [formData, setFormData] = useState({
		email: user.email,
		name: user.name
	})

	async function handleUpdateUser() {
		setIsLoading(true)
		let response = await updateUser(user._id, {
			email: formData.email,
			name: formData.name
		})
		setIsLoading(false)

		if (!response) return

		refreshUsers()
		toast.success(response.message)
	}
	return (
		<Credenza>
			<CredenzaTrigger asChild>{children}</CredenzaTrigger>
			<CredenzaContent className='max-w-lg'>
				<CredenzaHeader>
					<CredenzaTitle className=''>User</CredenzaTitle>
					<CredenzaDescription className='text-sm'>
						Update user's account details
					</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody>
					<div className='flex flex-row items-center gap-2.5 rounded-md border p-2'>
						<img
							src={getAvatarImg(user.name)}
							alt={user.name}
							width={32}
							height={32}
							className='h-10 w-10'
						/>
						<div>
							<p className='text-gray-800'>{user.name}</p>
							<p className='text-sm text-muted-foreground'>
								{user.email}
							</p>
						</div>
					</div>

					<div className='mt-4 flex flex-row items-center rounded-md border'>
						<div className='h-full border-r p-2'>
							<UserRound
								size={20}
								className='text-muted-foreground'
							/>
						</div>
						<Input
							type='text'
							value={formData.name}
							placeholder={'Enter name'}
							onChange={(e) =>
								setFormData({
									...formData,
									name: e.target.value
								})
							}
							className='rounded-l-none focus-visible:ring-gray-200 border-none bg-slate-50'
						/>
					</div>

					<div className='mt-4 flex flex-row items-center rounded-md border'>
						<div className='h-full border-r p-2'>
							<Mail size={20} className='text-muted-foreground' />
						</div>
						<Input
							type='email'
							value={formData.email}
                            disabled={true}
							placeholder={'Enter email'}
							onChange={(e) =>
								setFormData({
									...formData,
									email: e.target.value
								})
							}
							className='rounded-l-none focus-visible:ring-gray-200 border-none bg-slate-50'
						/>
					</div>

					<Button
						onClick={handleUpdateUser}
						className='mt-6 w-full py-2'
					>
						{isLoading ? (
							<LoaderCircle className='animate-spin' />
						) : (
							'Update'
						)}
					</Button>
				</CredenzaBody>
			</CredenzaContent>
		</Credenza>
	)
}

export default UserModal

type UserDeleteProps = {
	userId: string
	refreshUsers: () => void
}

export function ConfirmUserDelete({ userId, refreshUsers }: UserDeleteProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function handleDeleteUser() {
		setIsLoading(true)
		const response = await deleteUser(userId)
		setIsLoading(false)

		if (!response) return
		refreshUsers()

		toast.success(response.message)
	}
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant='destructive' size='sm' className=''>
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently
						delete your account and remove your data from our
						servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className='flex items-center '>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteUser}
						className={cn(
							buttonVariants({
								variant: 'destructive',
								size: 'sm'
							})
						)}
					>
						{isLoading ? (
							<LoaderCircle className='animate-spin' />
						) : (
							'Continue'
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
