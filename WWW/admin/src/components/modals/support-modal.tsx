import {
	Credenza,
	CredenzaBody,
	CredenzaClose,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger
} from '@/components/ui/credenza'
import {
	Copy,
	LoaderCircle,
	CircleDashed,
	CircleCheckBig,
	MessageSquareDot
} from 'lucide-react'
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
import { Label } from '../ui/label'
import { getAvatarImg } from '@/lib/avatar'
import { useEffect, useState } from 'react'
import { SupportStatus, SupportTicketType } from '@/types'
import { cn, copyToClipboard, formatDate } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { deleteTicket, updateTicketStatus } from '@/apis/support'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '../ui/separator'

type UserModalProps = {
	children: React.ReactNode
	ticket: SupportTicketType
	refreshTickets: () => void
}

function TicketModal({ children, refreshTickets, ticket }: UserModalProps) {
	const [ticketStatus, setTicketStatus] = useState<SupportStatus>(
		ticket.status
	)

	async function handleUpdateTicket() {
		let response = await updateTicketStatus(ticket._id, ticketStatus)
		if (!response) return
		toast.success(response.message)
		refreshTickets()
	}
	return (
		<Credenza>
			<CredenzaTrigger asChild>{children}</CredenzaTrigger>
			<CredenzaContent className='max-w-lg'>
				<CredenzaHeader>
					<CredenzaTitle className=''>
						Support Ticket Details
					</CredenzaTitle>
					<CredenzaDescription className='text-sm'>
						More details about the ticket
					</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody>
					<div>
						<div className='flex flex-row items-center rounded-md border p-2'>
							<div className='flex flex-1 flex-col'>
								<div className='flex flex-row gap-2.5'>
									<img
										src={getAvatarImg(ticket.name)}
										alt='Recipient ticket'
										width={32}
										height={32}
										className='h-10 w-10'
									/>
									<div>
										<p className=''>{ticket.name}</p>
										<p className='text-xs text-gray-600'>
											{ticket.email}
										</p>
									</div>
								</div>

								<p className='mt-4 px-2 text-xs text-muted-foreground'>
									{formatDate(ticket.createdAt)}
								</p>

								<p className='mt-1 flex w-fit items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs text-gray-700'>
									{ticket._id}&nbsp;
									<Copy
										size={18}
										onClick={() =>
											copyToClipboard(ticket._id)
										}
										className='cursor-pointer hover:opacity-80 active:opacity-100'
									/>
								</p>
							</div>

							<div className='flex flex-col items-center justify-center rounded-xl border p-2'>
								{ticket.status == 'pending' ? (
									<CircleDashed className='text-red-500' />
								) : (
									<CircleCheckBig className='text-green-500' />
								)}

								<p className='text-sm capitalize'>
									{ticket.status}
								</p>
							</div>
						</div>
					</div>

					<div className='my-4'>
						<p className='flex gap-1 rounded-md border border-dashed p-2 text-sm text-gray-700'>
							<div className='h-[30px] w-[30px]'>
								<MessageSquareDot
									size={30}
									className='rounded-full border bg-white p-1 text-emerald-500'
								/>
							</div>
							&nbsp;
							{ticket.message}
						</p>
					</div>

					<Separator className='my-4' />

					<div className='-mt-2'>
						<Label>Update Status</Label>

						<RadioGroup
							defaultValue={ticket.status}
							className='mt-1 flex'
							onValueChange={(value: SupportStatus) =>
								setTicketStatus(value)
							}
						>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='pending'
									id='option-one'
								/>
								<Label
									htmlFor='option-one'
									className='text-sm font-normal text-muted-foreground'
								>
									Pending
								</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='resolved'
									id='option-two'
								/>
								<Label
									htmlFor='option-two'
									className='text-sm font-normal text-muted-foreground'
								>
									Resolved
								</Label>
							</div>
						</RadioGroup>
						<Button onClick={handleUpdateTicket} className='mt-2'>
							Update
						</Button>
					</div>
				</CredenzaBody>
			</CredenzaContent>
		</Credenza>
	)
}

export default TicketModal

type UserDeleteProps = {
	ticketId: string
	refreshTickets: () => void
}

export function ConfirmDeleteTicket({
	ticketId,
	refreshTickets
}: UserDeleteProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function handleDeleteTicket() {
		setIsLoading(true)
		const response = await deleteTicket(ticketId)
		setIsLoading(false)

		if (!response) return
		refreshTickets()
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
						onClick={handleDeleteTicket}
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
