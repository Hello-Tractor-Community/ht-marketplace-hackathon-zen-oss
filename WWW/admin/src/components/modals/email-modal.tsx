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
import { toast } from 'sonner'
import { useState } from 'react'
import type { EmailType } from '@/types'
import { deleteEmail } from '@/apis/email'
import { getAvatarImg } from '@/lib/avatar'
import { cn, dateDistance } from '@/lib/utils'
import { Send, LoaderCircle, Mail, UserRound } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'

type UserModalProps = {
	children: React.ReactNode
	email: EmailType
}

function EmailModal({ children, email }: UserModalProps) {
	return (
		<Credenza>
			<CredenzaTrigger asChild>{children}</CredenzaTrigger>
			<CredenzaContent className='max-w-lg'>
				<CredenzaHeader>
					<CredenzaTitle className=''>Email</CredenzaTitle>
					<CredenzaDescription className='text-sm'>
						Details related to sent email
					</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody className=''>
					<div className='flex items-center gap-2.5 rounded-md'>
						<img
							src={getAvatarImg(email.recepient.split('@')[0])}
							alt='Recipient email'
							width={32}
							height={32}
							className='h-10 w-10'
						/>
						<div>
							<h3 className='font-medium'>{email.subject}</h3>
							<p className='text-sm text-muted-foreground'>
								{email.recepient}
							</p>
						</div>
					</div>
					<p className='mt-3 flex items-center gap-1 rounded-md border border-dashed p-3 text-sm text-gray-700'>
						<Mail
							size={30}
							className='rounded-full border bg-white p-1 text-emerald-500'
						/>
						&nbsp;
						{email.message}
					</p>
					<p className='mt-6 flex items-center gap-1 text-xs text-gray-600'>
						<Send
							size={24}
							className='rounded-lg border p-1 text-muted-foreground'
						/>
						&nbsp;
						{dateDistance(email.createdAt)}
					</p>
					<p className='mt-1 flex items-center gap-1 text-xs text-gray-600'>
						<UserRound
							size={24}
							className='rounded-lg border p-1 text-muted-foreground'
						/>
						&nbsp;
						{email.sender.email}
					</p>
				</CredenzaBody>
			</CredenzaContent>
		</Credenza>
	)
}

export default EmailModal

type UserDeleteProps = {
	emailId: string
	refreshEmails: () => void
}

export function ConfirmEmailDelete({
	emailId,
	refreshEmails
}: UserDeleteProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function handleDeleteEmail() {
		setIsLoading(true)
		const response = await deleteEmail(emailId)
		setIsLoading(false)

		if (!response) return
		refreshEmails()

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
						onClick={handleDeleteEmail}
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
