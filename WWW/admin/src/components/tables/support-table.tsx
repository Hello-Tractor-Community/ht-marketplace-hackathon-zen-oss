import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
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
import Loader from '../loader'
import { toast } from 'sonner'
import { Copy, EllipsisVertical } from 'lucide-react'
import { deleteAdmin } from '@/apis/auth'
import { getAvatarImg } from '@/lib/avatar'
import { cn, copyToClipboard } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { SupportTicketType } from '@/types'
import TicketModal, { ConfirmDeleteTicket } from '../modals/support-modal'

type UsersTableProps = {
	tickets: SupportTicketType[]
	isLoading: boolean
	refreshData: () => void
}

export function SupportTable({
	tickets,
	isLoading,
	refreshData
}: UsersTableProps) {
	return (
		<Table className='rounded-lg border bg-white'>
			<TableHeader className=''>
				<TableRow className='divide-x'>
					<TableHead className='w-fit py-6'>User</TableHead>
					<TableHead className=''>Phone</TableHead>
					<TableHead className=''>Ticket Id</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Is User</TableHead>
					<TableHead className='text-center'>Action</TableHead>
				</TableRow>
			</TableHeader>

			{isLoading ? (
				<Loader />
			) : (
				<TableBody className={'text-gray-800'}>
					{tickets.map((ticket) => (
						<TableRow key={ticket._id} className='divide-x'>
							<TableCell className='flex gap-2.5'>
								<img
									src={getAvatarImg(ticket.name)}
									alt={ticket.name}
									width={32}
									height={32}
									className='h-10 w-10'
								/>
								<div className='flex flex-col gap-[1px]'>
									<span className='md:px-2'>
										{ticket.name}
									</span>
									<span className='w-fit rounded-xl bg-slate-50 px-2 text-xs text-gray-500'>
										{ticket.email}
									</span>
								</div>
							</TableCell>
							<TableCell className=''>{ticket.phone}</TableCell>
							<TableCell className=''>
								<span className='flex w-fit items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-gray-700'>
									{ticket._id}&nbsp;
									<Copy
										size={18}
										onClick={() =>
											copyToClipboard(ticket._id)
										}
										className='cursor-pointer hover:opacity-80 active:opacity-100'
									/>
								</span>
							</TableCell>
							<TableCell>
								<Badge
									variant={
										ticket.status == 'pending'
											? 'destructive'
											: 'secondary'
									}
								>
									{ticket.status}
								</Badge>
							</TableCell>

							<TableCell>
								<Badge>
									{ticket.isUser ? 'true' : 'false'}
								</Badge>
							</TableCell>
							<TableCell className='md:text-center'>
								<div className='flex h-full  items-center gap-2.5'>
									<ConfirmDeleteTicket
										ticketId={ticket._id}
										refreshTickets={refreshData}
									/>

									<TicketModal
										ticket={ticket}
										refreshTickets={refreshData}
									>
										<EllipsisVertical
											size={28}
											className='cursor-pointer rounded-full border p-1 hover:bg-slate-100 active:bg-white'
										/>
									</TicketModal>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			)}
		</Table>
	)
}

type AlertDialogProps = {
	name: string
	id: string
	refreshData: () => void
}
function ConfirmDeleteAdmin({ name, id, refreshData }: AlertDialogProps) {
	const handleDeleteAdmin = async () => {
		let response = await deleteAdmin(id)

		if (!response) return
		toast.success(response.message)
		refreshData()
	}
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant='destructive'> Delete </Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently
						delete {name}'s account and remove their data from our
						server
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteAdmin}
						className='bg-red-600 hover:bg-red-500 active:opacity-80'
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
